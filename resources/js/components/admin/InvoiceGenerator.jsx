import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import { Globe, Phone, Mail, MapPin, Landmark, CreditCard, FileText, Handshake, ArrowLeft, Save } from 'lucide-react';

const toInputDate = (value) => {
  if (!value) return '';
  const d = new Date(value);
  if (isNaN(d.getTime())) return typeof value === 'string' ? value.slice(0, 10) : '';
  return d.toISOString().slice(0, 10);
};

const formatDisplayDate = (value) => {
  if (!value) return '';
  const d = new Date(value);
  if (isNaN(d.getTime())) return value;
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
};

export default function InvoiceGenerator({ invoice = null, customers = [], settings, onBack }) {
  const buildInitialState = () => {
    if (invoice) {
      return {
        customerId: invoice.customer_id || invoice.customer?.id || '',
        toName: invoice.customer?.name || '',
        toEmail: invoice.customer?.email || '',
        toMobile: invoice.customer?.phone || '',
        toAddress: invoice.customer?.address || '',
        invoiceNumber: invoice.invoice_number || '',
        invoiceDate: toInputDate(invoice.invoice_date),
        paymentDue: toInputDate(invoice.due_date),
        items: (invoice.items || []).map((item, idx) => ({ id: item.id || idx + 1, description: item.description || '', amount: item.amount ?? 0 })),
        status: invoice.status || 'Unpaid',
        advance: invoice.advance || 0,
        accountName: invoice.account_name || 'SK Home Solutions',
        accountNumber: invoice.account_number || '',
        sortCode: invoice.sort_code || '',
        paymentMethod: invoice.payment_method || 'BACS or FPS Payment Only',
        paymentTerm: invoice.payment_term || '7 Days from Invoice Date'
      };
    }
    const today = new Date();
    const due = new Date();
    due.setDate(due.getDate() + 7);
    return {
      customerId: '',
      toName: '',
      toEmail: '',
      toMobile: '',
      toAddress: '',
      invoiceNumber: '(auto-generated)',
      invoiceDate: today.toISOString().slice(0, 10),
      paymentDue: due.toISOString().slice(0, 10),
      items: [{ id: 1, description: '', amount: 0 }],
      status: 'Unpaid',
      advance: 0,
      accountName: 'SK Home Solutions',
      accountNumber: '',
      sortCode: '',
      paymentMethod: 'BACS or FPS Payment Only',
      paymentTerm: '7 Days from Invoice Date'
    };
  };

  const [invoiceData, setInvoiceData] = useState(buildInitialState);
  const [saving, setSaving] = useState(false);
  const [savedMessage, setSavedMessage] = useState('');

  const handlePrint = () => {
    window.print();
  };

  const handleCustomerSelect = (id) => {
    const customer = customers.find(c => String(c.id) === String(id));
    setInvoiceData({
      ...invoiceData,
      customerId: id,
      toName: customer?.name || invoiceData.toName,
      toEmail: customer?.email || invoiceData.toEmail,
      toMobile: customer?.phone || invoiceData.toMobile,
      toAddress: customer?.address || invoiceData.toAddress
    });
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...invoiceData.items];
    newItems[index][field] = value;
    setInvoiceData({ ...invoiceData, items: newItems });
  };

  const addItem = () => {
    setInvoiceData({
      ...invoiceData,
      items: [...invoiceData.items, { id: Date.now(), description: '', amount: 0 }]
    });
  };

  const removeItem = (index) => {
    const newItems = invoiceData.items.filter((_, i) => i !== index);
    setInvoiceData({ ...invoiceData, items: newItems });
  };

  const calculateTotal = () => {
    return invoiceData.items.reduce((total, item) => total + parseFloat(item.amount || 0), 0);
  };

  const total = calculateTotal();
  const advance = parseFloat(invoiceData.advance || 0);
  const due = total - advance;

  const handleSave = () => {
    if (!invoiceData.customerId) {
      alert('Please link this invoice to a customer before saving.');
      return;
    }
    if (invoiceData.items.filter(i => i.description).length === 0) {
      alert('Please add at least one line item with a description.');
      return;
    }

    const payload = {
      customer_id: invoiceData.customerId,
      quote_id: invoice?.quote_id || null,
      items: invoiceData.items.map(i => ({ description: i.description, amount: parseFloat(i.amount || 0) })),
      advance: parseFloat(invoiceData.advance || 0),
      invoice_date: invoiceData.invoiceDate,
      due_date: invoiceData.paymentDue,
      status: invoiceData.status || 'Unpaid',
      account_name: invoiceData.accountName,
      account_number: invoiceData.accountNumber,
      sort_code: invoiceData.sortCode,
      payment_method: invoiceData.paymentMethod,
      payment_term: invoiceData.paymentTerm
    };

    setSaving(true);
    const url = invoice?.id ? `/dashboard/invoices/${invoice.id}` : '/dashboard/invoices';
    router.post(url, payload, {
      preserveScroll: true,
      onSuccess: () => {
        setSaving(false);
        setSavedMessage('Saved!');
        setTimeout(() => setSavedMessage(''), 2500);
      },
      onError: () => {
        setSaving(false);
        alert('Could not save invoice. Please check the fields and try again.');
      }
    });
  };

  // Pad items to a minimum of 3 rows, just so a near-empty invoice doesn't look broken
  const paddedItems = [...invoiceData.items];
  while (paddedItems.length < 3) {
    paddedItems.push({ id: `empty-${paddedItems.length}`, description: '', amount: '' });
  }

  return (
    <div className="invoice-generator-container" style={{ display: 'flex', gap: '30px', padding: '20px', height: 'calc(100vh - 40px)' }}>

      {/* LEFT SIDE: CONTROLS (Hidden on Print) */}
      <div className="invoice-controls no-print" style={{ flex: 1, backgroundColor: '#FFF', borderRadius: '16px', padding: '24px', overflowY: 'auto', border: '1px solid #E2E8F0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {onBack && (
              <button onClick={onBack} style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'none', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '8px 12px', cursor: 'pointer', color: '#64748B', fontWeight: '700', fontSize: '13px' }}>
                <ArrowLeft size={15} /> Back
              </button>
            )}
            <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#0F172A', margin: 0 }}>{invoice ? 'Edit Invoice' : 'New Invoice'}</h2>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {savedMessage && <span style={{ color: '#22C55E', fontWeight: '700', fontSize: '13px' }}>{savedMessage}</span>}
            <button onClick={handleSave} disabled={saving} style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: 'var(--color-secondary)', color: '#FFF', border: 'none', padding: '10px 18px', borderRadius: '8px', fontWeight: '700', cursor: saving ? 'default' : 'pointer', opacity: saving ? 0.7 : 1 }}>
              <Save size={16} /> {saving ? 'Saving...' : 'Save Invoice'}
            </button>
            <button onClick={handlePrint} style={{ backgroundColor: 'var(--color-primary)', color: '#FFF', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: '700', cursor: 'pointer' }}>
              Print / Save as PDF
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

          <div style={{ padding: '16px', backgroundColor: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
            <h3 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '12px' }}>Link to Existing Customer</h3>
            <select
              value={invoiceData.customerId}
              onChange={e => handleCustomerSelect(e.target.value)}
              style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #CBD5E1', outline: 'none', backgroundColor: '#FFF' }}
            >
              <option value="">-- Select a customer --</option>
              {customers.map(c => (
                <option key={c.id} value={c.id}>{c.name}{c.email ? ` (${c.email})` : ''}</option>
              ))}
            </select>
          </div>

          <div style={{ padding: '16px', backgroundColor: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
            <h3 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '12px' }}>Client Details (To)</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <input type="text" value={invoiceData.toName} onChange={e => setInvoiceData({...invoiceData, toName: e.target.value})} placeholder="Client Name" style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #CBD5E1', outline: 'none' }} />
              <input type="email" value={invoiceData.toEmail} onChange={e => setInvoiceData({...invoiceData, toEmail: e.target.value})} placeholder="Client Email" style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #CBD5E1', outline: 'none' }} />
              <input type="text" value={invoiceData.toMobile} onChange={e => setInvoiceData({...invoiceData, toMobile: e.target.value})} placeholder="Client Mobile" style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #CBD5E1', outline: 'none' }} />
              <input type="text" value={invoiceData.toAddress} onChange={e => setInvoiceData({...invoiceData, toAddress: e.target.value})} placeholder="Client Address" style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #CBD5E1', outline: 'none' }} />
            </div>
          </div>

          <div style={{ padding: '16px', backgroundColor: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: '700', gridColumn: 'span 2', marginBottom: '4px' }}>Invoice Details</h3>
            <div>
              <label style={{ fontSize: '12px', color: '#64748B' }}>Invoice Number</label>
              <input type="text" value={invoiceData.invoiceNumber} disabled style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #CBD5E1', outline: 'none', backgroundColor: '#F1F5F9', color: '#64748B' }} />
            </div>
            <div>
              <label style={{ fontSize: '12px', color: '#64748B' }}>Invoice Date</label>
              <input type="date" value={invoiceData.invoiceDate} onChange={e => setInvoiceData({...invoiceData, invoiceDate: e.target.value})} style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #CBD5E1', outline: 'none' }} />
            </div>
            <div>
              <label style={{ fontSize: '12px', color: '#64748B' }}>Payment Due Date</label>
              <input type="date" value={invoiceData.paymentDue} onChange={e => setInvoiceData({...invoiceData, paymentDue: e.target.value})} style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #CBD5E1', outline: 'none' }} />
            </div>
            <div>
              <label style={{ fontSize: '12px', color: '#64748B' }}>Status</label>
              <select value={invoiceData.status} onChange={e => setInvoiceData({...invoiceData, status: e.target.value})} style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #CBD5E1', outline: 'none', backgroundColor: '#FFF' }}>
                <option value="Unpaid">Unpaid</option>
                <option value="Paid">Paid</option>
                <option value="Partially Paid">Partially Paid</option>
              </select>
            </div>
          </div>

          <div style={{ padding: '16px', backgroundColor: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
               <h3 style={{ fontSize: '14px', fontWeight: '700' }}>Line Items</h3>
               <button onClick={addItem} style={{ fontSize: '12px', fontWeight: '700', color: 'var(--color-primary)', background: 'none', border: 'none', cursor: 'pointer' }}>+ Add Item</button>
            </div>
            {invoiceData.items.map((item, index) => (
              <div key={item.id} style={{ display: 'grid', gridTemplateColumns: '1fr 100px auto', gap: '8px', marginBottom: '8px', alignItems: 'center' }}>
                <input type="text" placeholder="Description" value={item.description} onChange={e => handleItemChange(index, 'description', e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '13px' }} />
                <input type="number" placeholder="Amount (£)" value={item.amount} onChange={e => handleItemChange(index, 'amount', e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '13px' }} />
                <button onClick={() => removeItem(index)} style={{ padding: '6px', color: '#EF4444', background: 'none', border: 'none', cursor: 'pointer', fontWeight: '800' }}>X</button>
              </div>
            ))}
            <div style={{ marginTop: '16px', borderTop: '1px solid #E2E8F0', paddingTop: '16px' }}>
               <label style={{ fontSize: '12px', color: '#64748B', display: 'block', marginBottom: '4px' }}>Advance Payment Received (£)</label>
               <input type="number" value={invoiceData.advance} onChange={e => setInvoiceData({...invoiceData, advance: e.target.value})} style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #CBD5E1', outline: 'none' }} />
            </div>
          </div>

          <div style={{ padding: '16px', backgroundColor: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
            <h3 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '12px' }}>Payment Instructions</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '8px' }}>
              <input type="text" placeholder="Account Name" value={invoiceData.accountName} onChange={e => setInvoiceData({...invoiceData, accountName: e.target.value})} style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #CBD5E1', outline: 'none' }} />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                 <input type="text" placeholder="Account Number" value={invoiceData.accountNumber} onChange={e => setInvoiceData({...invoiceData, accountNumber: e.target.value})} style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #CBD5E1', outline: 'none' }} />
                 <input type="text" placeholder="Sort Code" value={invoiceData.sortCode} onChange={e => setInvoiceData({...invoiceData, sortCode: e.target.value})} style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #CBD5E1', outline: 'none' }} />
              </div>
              <input type="text" placeholder="Payment Method" value={invoiceData.paymentMethod} onChange={e => setInvoiceData({...invoiceData, paymentMethod: e.target.value})} style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #CBD5E1', outline: 'none' }} />
              <input type="text" placeholder="Payment Term" value={invoiceData.paymentTerm} onChange={e => setInvoiceData({...invoiceData, paymentTerm: e.target.value})} style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #CBD5E1', outline: 'none' }} />
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE: PRINT PREVIEW */}
      <div className="invoice-preview-wrapper" style={{ flex: 1.5, overflowY: 'auto', backgroundColor: '#F1F5F9', borderRadius: '16px', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', padding: '20px' }}>
        <div className="invoice-a4-page" style={{
            boxSizing: 'border-box',
            width: '210mm',
            minHeight: '297mm',
            backgroundColor: '#FFF',
            padding: '12mm 14mm',
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
            position: 'relative',
            color: '#1F295B',
            fontFamily: "'Inter', sans-serif"
          }}>

          {/* Top accent bar */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '6px', background: 'linear-gradient(90deg, #1F295B 0%, #3B82F6 55%, #93C5FD 100%)' }} />

          {/* COMPACT HEADER */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
              {settings?.logo ? (
                <img src={settings.logo} style={{ width: '46px', height: '46px', objectFit: 'contain', display: 'block' }} alt="Logo" />
              ) : (
                <div style={{ width: '40px', height: '40px', backgroundColor: '#F37021', borderRadius: '50%', flexShrink: 0 }}></div>
              )}
              <div>
                <h1 style={{ fontSize: '19px', fontWeight: '900', color: '#1F295B', margin: 0, letterSpacing: '0.3px' }}>SK HOME SOLUTIONS LIMITED</h1>
                <p style={{ fontSize: '10px', fontWeight: '600', fontStyle: 'italic', color: '#475569', margin: '2px 0 0 0' }}>Painting &amp; Decorating | Carpentry &amp; Joinery</p>
              </div>
            </div>
            <div style={{ width: '100%', borderBottom: '1px solid #CBD5E1', margin: '10px 0 8px 0' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', fontSize: '12px', fontWeight: '700' }}>
              <span>Invoice : {invoiceData.invoiceNumber}</span>
              <span>Date : {formatDisplayDate(invoiceData.invoiceDate)}</span>
              <span>Due : {formatDisplayDate(invoiceData.paymentDue)}</span>
            </div>
          </div>

          {/* CUSTOMER DETAILS */}
          <div style={{ marginBottom: '10px' }}>
            <h3 style={{ fontSize: '13px', fontWeight: '800', color: '#1F295B', marginBottom: '8px' }}>CUSTOMER DETAILS</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 40px', fontSize: '13px', fontWeight: '700' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '80px 15px 1fr', alignItems: 'center' }}>
                <span>Name</span><span>:</span><span style={{ fontWeight: '500' }}>{invoiceData.toName}</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '80px 15px 1fr', alignItems: 'center' }}>
                <span>Email</span><span>:</span><span style={{ fontWeight: '500' }}>{invoiceData.toEmail}</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '80px 15px 1fr', alignItems: 'flex-start' }}>
                <span>Mobile</span><span>:</span><span style={{ fontWeight: '500' }}>{invoiceData.toMobile}</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '80px 15px 1fr', alignItems: 'flex-start' }}>
                <span>Address</span><span>:</span><span style={{ fontWeight: '500', whiteSpace: 'pre-wrap' }}>{invoiceData.toAddress}</span>
              </div>
            </div>
          </div>

          {/* TABLE */}
          <div style={{ border: '1px solid #8492A6', marginBottom: '10px' }}>
            {/* Header */}
            <div style={{ display: 'grid', gridTemplateColumns: '50px 1fr 120px', borderBottom: '1px solid #8492A6', fontWeight: '800', fontSize: '12px', textAlign: 'center' }}>
              <div style={{ padding: '7px' }}>NO.</div>
              <div style={{ padding: '7px', borderLeft: '1px solid #8492A6', borderRight: '1px solid #8492A6' }}>DESCRIPTION</div>
              <div style={{ padding: '7px' }}>AMOUNT</div>
            </div>
            {/* Rows */}
            {paddedItems.map((item, idx) => (
              <div key={item.id} style={{ display: 'grid', gridTemplateColumns: '50px 1fr 120px', borderBottom: '1px solid #DDE2E8', fontSize: '12px', pageBreakInside: 'avoid' }}>
                <div style={{ padding: '6px 4px', textAlign: 'center', fontWeight: '700' }}>{item.description ? (idx + 1) : ''}</div>
                <div style={{ padding: '6px 10px', borderLeft: '1px solid #DDE2E8', borderRight: '1px solid #DDE2E8' }}>{item.description}</div>
                <div style={{ padding: '6px', textAlign: 'center', fontWeight: '600' }}>{item.amount ? `£${parseFloat(item.amount).toFixed(2)}` : ''}</div>
              </div>
            ))}
            {/* Table Footer (Status & Totals) */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 240px', borderTop: '1px solid #8492A6', pageBreakInside: 'avoid' }}>
              <div style={{ padding: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid #8492A6' }}>
                <span style={{ fontSize: '20px', fontWeight: '800', color: '#1F295B' }}>{invoiceData.status}</span>
              </div>
              <div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 15px 90px', padding: '6px 12px', borderBottom: '1px solid #DDE2E8', fontSize: '12px', fontWeight: '800' }}>
                  <span>TOTAL</span><span>:</span><span style={{ textAlign: 'right' }}>£{total.toFixed(2)}</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 15px 90px', padding: '6px 12px', borderBottom: '1px solid #DDE2E8', fontSize: '12px', fontWeight: '800' }}>
                  <span>ADVANCE</span><span>:</span><span style={{ textAlign: 'right' }}>£{advance.toFixed(2)}</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 15px 90px', padding: '6px 12px', fontSize: '12px', fontWeight: '800' }}>
                  <span>DUE</span><span>:</span><span style={{ textAlign: 'right' }}>£{due.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* FOOTER */}
          <h3 style={{ fontSize: '13px', fontWeight: '800', color: '#1F295B', marginBottom: '8px' }}>HOW TO PAY THIS INVOICE</h3>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'stretch', pageBreakInside: 'avoid' }}>
            {/* Payment Details */}
            <div style={{ flex: 1, paddingRight: '30px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center', borderBottom: '1px solid #E2E8F0', paddingBottom: '8px' }}>
                <div style={{ backgroundColor: '#1F295B', color: '#FFF', borderRadius: '50%', width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Landmark size={15} />
                </div>
                <div style={{ fontSize: '11px', fontWeight: '700', flex: 1 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '110px 10px 1fr' }}>
                    <span>Account Name</span><span>:</span><span style={{ fontWeight: '500' }}>{invoiceData.accountName}</span>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '110px 10px 1fr', marginTop: '3px' }}>
                    <span>Account Number</span><span>:</span><span style={{ fontWeight: '500' }}>{invoiceData.accountNumber}</span>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '110px 10px 1fr', marginTop: '3px' }}>
                    <span>Sort Code</span><span>:</span><span style={{ fontWeight: '500' }}>{invoiceData.sortCode}</span>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px', alignItems: 'center', borderBottom: '1px solid #E2E8F0', paddingBottom: '8px' }}>
                <div style={{ backgroundColor: '#1F295B', color: '#FFF', borderRadius: '50%', width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <CreditCard size={15} />
                </div>
                <div style={{ fontSize: '11px', fontWeight: '700', flex: 1 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '110px 10px 1fr' }}>
                    <span>Payment Method</span><span>:</span><span style={{ fontWeight: '500' }}>{invoiceData.paymentMethod}</span>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <div style={{ backgroundColor: '#1F295B', color: '#FFF', borderRadius: '50%', width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <FileText size={15} />
                </div>
                <div style={{ fontSize: '11px', fontWeight: '700', flex: 1 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '110px 10px 1fr' }}>
                    <span>Payment Term</span><span>:</span><span style={{ fontWeight: '500' }}>{invoiceData.paymentTerm}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Thank You Box */}
            <div style={{ flex: '0 0 220px', border: '1px solid #1F295B', borderRadius: '12px', padding: '14px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start' }}>
               <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '10px' }}>
                 <Handshake size={28} color="#1F295B" style={{ flexShrink: 0 }} />
                 <div style={{ fontSize: '10px', fontWeight: '500', borderLeft: '1px solid #1F295B', paddingLeft: '10px', lineHeight: '1.4' }}>
                   If you have any questions about this invoice, please contact us.
                 </div>
               </div>
               <div style={{ fontSize: '16px', fontWeight: '900', color: '#1F295B', width: '100%', textAlign: 'center' }}>
                 Thank you!
               </div>
            </div>
          </div>

          {/* Contact strip */}
          <div style={{ marginTop: '12px', paddingTop: '8px', borderTop: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '6px', fontSize: '9px', fontWeight: '600', color: '#64748B' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Globe size={10} /> www.skhome-solutions.co.uk</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Mail size={10} /> info@skhome-solutions.co.uk</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Phone size={10} /> +44 1792 923232</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><MapPin size={10} /> Liverpool, United Kingdom</span>
          </div>

        </div>
      </div>
      <style>{`
        @media print {
          @page {
            size: A4;
            margin: 0;
          }
          body, html {
            margin: 0 !important;
            padding: 0 !important;
            background-color: white !important;
          }
          body * {
            visibility: hidden;
          }
          .invoice-a4-page, .invoice-a4-page * {
            visibility: visible;
          }
          .invoice-a4-page {
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            margin: 0 !important;
            padding: 15mm !important;
            width: 210mm !important;
            height: 297mm !important;
            box-sizing: border-box !important;
            box-shadow: none !important;
            transform: scale(0.97) !important;
            transform-origin: top center !important;
            page-break-after: avoid !important;
            page-break-before: avoid !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
