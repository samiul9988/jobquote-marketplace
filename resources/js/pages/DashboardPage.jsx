import React, { useState, useEffect } from 'react';
import { Link, router, useForm, usePage } from '@inertiajs/react';
import {
  Hammer,
  PaintRoller,
  LayoutDashboard,
  Home as HomeIcon,
  Info,
  Wrench,
  Image as ImageIcon,
  Briefcase,
  Settings,
  Inbox,
  LogOut,
  Menu,
  MoreVertical,
  Plus,
  Save,
  CheckCircle2,
  FolderKanban,
  FileText,
  Users,
  User,
  Eye,
  TrendingUp,
  PieChart,
  MessageSquare,
  Bell,
  Edit,
  Edit2,
  Trash2,
  Power,
  X,
  Star,
  UserPlus,
  Phone,
  Mail,
  MapPin,
  StickyNote,
  FileCheck,
  Search,
  ShieldCheck,
  CreditCard,
  EyeOff,
  Radar,
  Activity,
  Wifi,
  ChevronUp,
  ChevronDown,
  ChevronRight,
  Download,
  Wallet,
  Clock,
  Upload,
  History,
  Printer
} from 'lucide-react';
import Logo from '../components/common/Logo';
import InvoiceGenerator from '../components/admin/InvoiceGenerator';

function PageHeader({ eyebrow, title, subtitle, action }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
      <div>
        <div style={{ fontSize: '12px', fontWeight: '800', color: 'var(--color-secondary)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px' }}>
          {eyebrow}
        </div>
        <h2 style={{ fontSize: '26px', fontWeight: '800', color: '#0F172A', margin: 0, letterSpacing: '-0.5px' }}>{title}</h2>
        {subtitle ? <p style={{ fontSize: '14px', color: '#64748B', margin: '6px 0 0 0' }}>{subtitle}</p> : null}
      </div>
      {action ? <div>{action}</div> : null}
    </div>
  );
}

export default function DashboardPage({ quotes = [], messages = [], jobPosts = [], reviews = [], projects = [], services = [], heroImages = [], faqs = [], customers = [], invoices = [], accounts = [], workProjects = [], transactions = [], timeEntries = [], staffAdvances = [], salaryPayments = [], staffList = [], customerLogs = [], financeAccounts = [], suppliers = [], paymentAccounts = [] }) {
  const navigate = router.visit;
  const [activeTab, setActiveTab] = useState(() => {
    return localStorage.getItem('adminDashboardTab') || 'overview';
  });

  useEffect(() => {
    localStorage.setItem('adminDashboardTab', activeTab);
  }, [activeTab]);

  const [liveStats, setLiveStats] = useState(null);
  const [recentEvents, setRecentEvents] = useState([]);
  const [pageBreakdown, setPageBreakdown] = useState([]);
  const [clickBreakdown, setClickBreakdown] = useState([]);

  useEffect(() => {
    if (activeTab !== 'tracking' && activeTab !== 'overview') return undefined;

    let cancelled = false;
    const fetchLive = () => {
      fetch('/dashboard/tracking/live', { headers: { Accept: 'application/json' } })
        .then(res => res.ok ? res.json() : null)
        .then(data => {
          if (!cancelled && data) {
            setLiveStats(data.stats);
            setRecentEvents(data.recent || []);
            setPageBreakdown(data.pages || []);
            setClickBreakdown(data.clicks || []);
          }
        })
        .catch(() => {});
    };

    fetchLive();
    const interval = setInterval(fetchLive, 8000);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [activeTab]);
  const { settings = {}, auth } = usePage().props;
  const [faviconPreview, setFaviconPreview] = useState(settings.site_favicon || null);
  const settingsForm = useForm({
    phone: settings.phone || '',
    whatsapp: settings.whatsapp || '',
    email: settings.email || '',
    location: settings.location || '',
    address: settings.address || '',
    facebook: settings.facebook || '',
      youtube: settings.youtube || '',
      instagram: settings.instagram || '',
      twitter: settings.twitter || '',
      linkedin: settings.linkedin || '',
    footer_text: settings.footer_text || '',
    logo: null,
    site_favicon: null
  });

  const handleSettingsSubmit = (e) => {
    e.preventDefault();
    settingsForm.post('/dashboard/settings', { preserveScroll: true });
  };

  const trackingForm = useForm({
    tracking_enabled: settings.tracking_enabled === '1' || settings.tracking_enabled === true,
    meta_pixel_id: settings.meta_pixel_id || '',
    ga4_measurement_id: settings.ga4_measurement_id || '',
    gtm_container_id: settings.gtm_container_id || '',
    cookie_consent_enabled: settings.cookie_consent_enabled === '1' || settings.cookie_consent_enabled === true,
    cookie_banner_text: settings.cookie_banner_text || ''
  });

  const handleTrackingSubmit = (e) => {
    e.preventDefault();
    trackingForm.post('/dashboard/settings/tracking', { preserveScroll: true });
  };

  const paymentSettingsForm = useForm({
    bkash_enabled: settings.bkash_enabled === '1' || settings.bkash_enabled === true,
    bkash_merchant_number: settings.bkash_merchant_number || '',
    bkash_app_key: '',
    bkash_app_secret: '',
    bkash_username: settings.bkash_username || '',
    bkash_password: '',
    bkash_mode: settings.bkash_mode || 'sandbox',
    sslcommerz_enabled: settings.sslcommerz_enabled === '1' || settings.sslcommerz_enabled === true,
    sslcommerz_store_id: settings.sslcommerz_store_id || '',
    sslcommerz_store_password: '',
    sslcommerz_mode: settings.sslcommerz_mode || 'sandbox'
  });

  const [showSecrets, setShowSecrets] = useState({
    bkash_app_secret: false,
    bkash_password: false,
    sslcommerz_store_password: false
  });

  const toggleShowSecret = (field) => {
    setShowSecrets(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const handlePaymentSettingsSubmit = (e) => {
    e.preventDefault();
    paymentSettingsForm.post('/dashboard/payment-settings', { preserveScroll: true });
  };

  const [saveMessage, setSaveMessage] = useState('');
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [inboxSubTab, setInboxSubTab] = useState('quotes');
  const [selectedQuoteId, setSelectedQuoteId] = useState(null);
  const [selectedMessageId, setSelectedMessageId] = useState(null);

  const [isJobModalOpen, setIsJobModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState(null);

  // --- Customer Management State ---
  const [customerSearch, setCustomerSearch] = useState('');
  const [customerStatusFilter, setCustomerStatusFilter] = useState('All');
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const [customerSortKey, setCustomerSortKey] = useState('name');
  const [customerSortDir, setCustomerSortDir] = useState('asc');
  const [isCustomerModalOpen, setIsCustomerModalOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [noteText, setNoteText] = useState('');
  const [customerImportFile, setCustomerImportFile] = useState(null);
  const [customerLogSearch, setCustomerLogSearch] = useState('');
  const [invoiceView, setInvoiceView] = useState('list');
  const [activeInvoiceId, setActiveInvoiceId] = useState(null);
  const [invoiceSearch, setInvoiceSearch] = useState('');
  const [invoiceStatusFilter, setInvoiceStatusFilter] = useState('All');

  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [editingAccount, setEditingAccount] = useState(null);

  const accountForm = useForm({
    name: '',
    email: '',
    password: '',
    role: 'staff',
    hourly_rate: ''
  });

  const openAddAccountModal = () => {
    setEditingAccount(null);
    accountForm.reset();
    accountForm.clearErrors();
    accountForm.setData({ name: '', email: '', password: '', role: 'staff', hourly_rate: '' });
    setIsAccountModalOpen(true);
  };

  const openEditAccountModal = (account) => {
    setEditingAccount(account);
    accountForm.clearErrors();
    accountForm.setData({
      name: account.name || '',
      email: account.email || '',
      password: '',
      role: account.role || 'staff',
      hourly_rate: account.hourly_rate || ''
    });
    setIsAccountModalOpen(true);
  };

  const handleAccountSubmit = (e) => {
    e.preventDefault();
    if (editingAccount) {
      accountForm.post(`/dashboard/accounts/${editingAccount.id}`, {
        preserveScroll: true,
        onSuccess: () => {
          setIsAccountModalOpen(false);
          accountForm.reset();
        }
      });
    } else {
      accountForm.post('/dashboard/accounts', {
        preserveScroll: true,
        onSuccess: () => {
          setIsAccountModalOpen(false);
          accountForm.reset();
        }
      });
    }
  };

  const deleteAccount = (id) => {
    if (confirm('Delete this account? This cannot be undone.')) {
      router.delete(`/dashboard/accounts/${id}`, { preserveScroll: true });
    }
  };

  const toggleAccountStatus = (id) => {
    router.post(`/dashboard/accounts/${id}/toggle`, {}, { preserveScroll: true });
  };

  const customerForm = useForm({
    name: '',
    email: '',
    phone: '',
    address: '',
    status: 'Lead',
    credit_limit: 0
  });

  const customerImportForm = useForm({
    file: null
  });

  const handleCustomerImportSubmit = (e) => {
    e.preventDefault();
    if (!customerImportForm.data.file) return;
    customerImportForm.post('/dashboard/customers/import', {
      preserveScroll: true,
      forceFormData: true,
      onSuccess: () => {
        customerImportForm.reset();
        setCustomerImportFile(null);
      }
    });
  };

  const downloadSampleCustomerCsv = () => {
    const headers = ['name', 'email', 'phone', 'address', 'status'];
    const rows = [
      ['John Smith', 'john.smith@example.com', '07700900123', '12 High Street, London', 'Lead'],
      ['Jane Doe', 'jane.doe@example.com', '07700900456', '4 Park Lane, Manchester', 'Active'],
    ];
    const csvEscapeSample = (val) => {
      const str = String(val ?? '');
      return /[",\n]/.test(str) ? '"' + str.replace(/"/g, '""') + '"' : str;
    };
    const csvContent = [headers, ...rows].map(row => row.map(csvEscapeSample).join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'customers-sample.csv');
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const openAddCustomerModal = () => {
    setEditingCustomer(null);
    customerForm.reset();
    customerForm.setData({ name: '', email: '', phone: '', address: '', status: 'Lead', credit_limit: 0 });
    setIsCustomerModalOpen(true);
  };

  const openEditCustomerModal = (customer) => {
    setEditingCustomer(customer);
    customerForm.setData({
      name: customer.name || '',
      email: customer.email || '',
      phone: customer.phone || '',
      address: customer.address || '',
      status: customer.status || 'Lead',
      credit_limit: customer.credit_limit || 0
    });
    setIsCustomerModalOpen(true);
  };

  const handleCustomerSubmit = (e) => {
    e.preventDefault();
    if (editingCustomer) {
      customerForm.post(`/dashboard/customers/${editingCustomer.id}`, {
        preserveScroll: true,
        onSuccess: () => {
          setIsCustomerModalOpen(false);
          customerForm.reset();
        }
      });
    } else {
      customerForm.post('/dashboard/customers', {
        preserveScroll: true,
        onSuccess: () => {
          setIsCustomerModalOpen(false);
          customerForm.reset();
        }
      });
    }
  };

  const deleteCustomer = (id) => {
    if (confirm('Delete this customer? This cannot be undone.')) {
      router.delete(`/dashboard/customers/${id}`, {
        preserveScroll: true,
        onSuccess: () => {
          if (selectedCustomerId === id) setSelectedCustomerId(null);
        }
      });
    }
  };

  const updateCustomerStatus = (id, status) => {
    router.post(`/dashboard/customers/${id}/status`, { status }, { preserveScroll: true });
  };

  const submitCustomerNote = (id) => {
    if (!noteText.trim()) return;
    router.post(`/dashboard/customers/${id}/note`, { note: noteText }, {
      preserveScroll: true,
      onSuccess: () => setNoteText('')
    });
  };
  
  // --- WORK PROJECTS (Projects) state/forms ---
  const [selectedWorkProjectId, setSelectedWorkProjectId] = useState(null);
  const [isWorkProjectModalOpen, setIsWorkProjectModalOpen] = useState(false);
  const [editingWorkProject, setEditingWorkProject] = useState(null);
  const workProjectForm = useForm({
    title: '',
    customer_id: '',
    quote_id: '',
    status: 'Active',
    started_at: '',
    notes: ''
  });

  const openAddWorkProjectModal = () => {
    setEditingWorkProject(null);
    workProjectForm.reset();
    workProjectForm.setData({ title: '', customer_id: '', quote_id: '', status: 'Active', started_at: '', notes: '' });
    setIsWorkProjectModalOpen(true);
  };

  const openEditWorkProjectModal = (wp) => {
    setEditingWorkProject(wp);
    workProjectForm.setData({
      title: wp.title || '',
      customer_id: wp.customer_id || '',
      quote_id: wp.quote_id || '',
      status: wp.status || 'Active',
      started_at: wp.started_at ? String(wp.started_at).slice(0, 10) : '',
      notes: wp.notes || ''
    });
    setIsWorkProjectModalOpen(true);
  };

  const handleWorkProjectSubmit = (e) => {
    e.preventDefault();
    if (editingWorkProject) {
      workProjectForm.post(`/dashboard/work-projects/${editingWorkProject.id}`, {
        preserveScroll: true,
        onSuccess: () => { setIsWorkProjectModalOpen(false); workProjectForm.reset(); }
      });
    } else {
      workProjectForm.post('/dashboard/work-projects', {
        preserveScroll: true,
        onSuccess: () => { setIsWorkProjectModalOpen(false); workProjectForm.reset(); }
      });
    }
  };

  const deleteWorkProject = (id) => {
    if (confirm('Delete this project? This cannot be undone.')) {
      router.delete(`/dashboard/work-projects/${id}`, {
        preserveScroll: true,
        onSuccess: () => { if (selectedWorkProjectId === id) setSelectedWorkProjectId(null); }
      });
    }
  };

  const updateWorkProjectStatus = (id, status) => {
    router.post(`/dashboard/work-projects/${id}/status`, { status }, { preserveScroll: true });
  };

  // --- INCOME & EXPENSES (Transactions) state/forms ---
  const [transactionSearch, setTransactionSearch] = useState('');
  const [transactionTypeFilter, setTransactionTypeFilter] = useState('All');
  const [transactionProjectFilter, setTransactionProjectFilter] = useState('All');
  const [transactionDateFrom, setTransactionDateFrom] = useState('');
  const [transactionDateTo, setTransactionDateTo] = useState('');
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);
  const transactionForm = useForm({
    type: 'expense',
    amount: '',
    category: '',
    description: '',
    work_project_id: '',
    finance_account_id: '',
    supplier_id: '',
    date: new Date().toISOString().slice(0, 10)
  });

  const openAddTransactionModal = () => {
    transactionForm.reset();
    transactionForm.setData({
      type: 'expense', amount: '', category: '', description: '', work_project_id: '',
      finance_account_id: '', supplier_id: '',
      date: new Date().toISOString().slice(0, 10)
    });
    setIsTransactionModalOpen(true);
  };

  // --- Finance Accounts (Cash / Bank Management) ---
  const [isFinanceAccountModalOpen, setIsFinanceAccountModalOpen] = useState(false);
  const [editingFinanceAccount, setEditingFinanceAccount] = useState(null);
  const financeAccountForm = useForm({ name: '', type: 'cash', account_number: '', opening_balance: 0, status: 'Active' });

  const openAddFinanceAccountModal = () => {
    setEditingFinanceAccount(null);
    financeAccountForm.reset();
    financeAccountForm.setData({ name: '', type: 'cash', account_number: '', opening_balance: 0, status: 'Active' });
    setIsFinanceAccountModalOpen(true);
  };

  const openEditFinanceAccountModal = (account) => {
    setEditingFinanceAccount(account);
    financeAccountForm.setData({
      name: account.name || '', type: account.type || 'cash', account_number: account.account_number || '',
      opening_balance: account.opening_balance || 0, status: account.status || 'Active'
    });
    setIsFinanceAccountModalOpen(true);
  };

  const handleFinanceAccountSubmit = (e) => {
    e.preventDefault();
    const url = editingFinanceAccount ? `/dashboard/finance-accounts/${editingFinanceAccount.id}` : '/dashboard/finance-accounts';
    financeAccountForm.post(url, {
      preserveScroll: true,
      onSuccess: () => { setIsFinanceAccountModalOpen(false); financeAccountForm.reset(); }
    });
  };

  const deleteFinanceAccount = (id) => {
    if (confirm('Delete this account? This cannot be undone.')) {
      router.delete(`/dashboard/finance-accounts/${id}`, { preserveScroll: true });
    }
  };

  // --- Suppliers (Supplier Payable) ---
  const [isSupplierModalOpen, setIsSupplierModalOpen] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState(null);
  const [supplierSearch, setSupplierSearch] = useState('');
  const supplierForm = useForm({ name: '', phone: '', email: '', address: '', opening_balance: 0, status: 'Active' });

  const openAddSupplierModal = () => {
    setEditingSupplier(null);
    supplierForm.reset();
    supplierForm.setData({ name: '', phone: '', email: '', address: '', opening_balance: 0, status: 'Active' });
    setIsSupplierModalOpen(true);
  };

  const openEditSupplierModal = (supplier) => {
    setEditingSupplier(supplier);
    supplierForm.setData({
      name: supplier.name || '', phone: supplier.phone || '', email: supplier.email || '',
      address: supplier.address || '', opening_balance: supplier.opening_balance || 0, status: supplier.status || 'Active'
    });
    setIsSupplierModalOpen(true);
  };

  const handleSupplierSubmit = (e) => {
    e.preventDefault();
    const url = editingSupplier ? `/dashboard/suppliers/${editingSupplier.id}` : '/dashboard/suppliers';
    supplierForm.post(url, {
      preserveScroll: true,
      onSuccess: () => { setIsSupplierModalOpen(false); supplierForm.reset(); }
    });
  };

  const deleteSupplier = (id) => {
    if (confirm('Delete this supplier? This cannot be undone.')) {
      router.delete(`/dashboard/suppliers/${id}`, { preserveScroll: true });
    }
  };

  // --- Payment Accounts (receiving accounts shown on public /payment-info page) ---
  const [isPaymentAccountModalOpen, setIsPaymentAccountModalOpen] = useState(false);
  const [editingPaymentAccount, setEditingPaymentAccount] = useState(null);
  const paymentAccountForm = useForm({
    label: '', type: 'bank', account_name: '', account_number: '', bank_name: '',
    sort_code: '', iban: '', swift_code: '', instructions: '', order: 0, status: 'Active'
  });

  const blankPaymentAccount = { label: '', type: 'bank', account_name: '', account_number: '', bank_name: '', sort_code: '', iban: '', swift_code: '', instructions: '', order: 0, status: 'Active' };

  const openAddPaymentAccountModal = () => {
    setEditingPaymentAccount(null);
    paymentAccountForm.reset();
    paymentAccountForm.setData(blankPaymentAccount);
    setIsPaymentAccountModalOpen(true);
  };

  const openEditPaymentAccountModal = (account) => {
    setEditingPaymentAccount(account);
    paymentAccountForm.setData({
      label: account.label || '', type: account.type || 'bank', account_name: account.account_name || '',
      account_number: account.account_number || '', bank_name: account.bank_name || '', sort_code: account.sort_code || '',
      iban: account.iban || '', swift_code: account.swift_code || '', instructions: account.instructions || '',
      order: account.order || 0, status: account.status || 'Active'
    });
    setIsPaymentAccountModalOpen(true);
  };

  const handlePaymentAccountSubmit = (e) => {
    e.preventDefault();
    const url = editingPaymentAccount ? `/dashboard/payment-accounts/${editingPaymentAccount.id}` : '/dashboard/payment-accounts';
    paymentAccountForm.post(url, {
      preserveScroll: true,
      onSuccess: () => { setIsPaymentAccountModalOpen(false); paymentAccountForm.reset(); }
    });
  };

  const deletePaymentAccount = (id) => {
    if (confirm('Delete this payment account? This cannot be undone.')) {
      router.delete(`/dashboard/payment-accounts/${id}`, { preserveScroll: true });
    }
  };

  const handleTransactionSubmit = (e) => {
    e.preventDefault();
    transactionForm.post('/dashboard/transactions', {
      preserveScroll: true,
      onSuccess: () => { setIsTransactionModalOpen(false); transactionForm.reset(); }
    });
  };

  const deleteTransaction = (id) => {
    if (confirm('Delete this transaction? This cannot be undone.')) {
      router.delete(`/dashboard/transactions/${id}`, { preserveScroll: true });
    }
  };

  // --- TIME CLOCK (self-service) ---
  const [clockProjectId, setClockProjectId] = useState('');

  const clockIn = () => {
    router.post('/dashboard/time-entries/clock-in', { work_project_id: clockProjectId || null }, { preserveScroll: true });
  };

  const clockOut = () => {
    router.post('/dashboard/time-entries/clock-out', {}, { preserveScroll: true });
  };

  // --- TIME ENTRIES (admin manual corrections) ---
  const [isTimeEntryModalOpen, setIsTimeEntryModalOpen] = useState(false);
  const [editingTimeEntry, setEditingTimeEntry] = useState(null);
  const timeEntryForm = useForm({
    user_id: '',
    work_project_id: '',
    clock_in: '',
    clock_out: '',
    notes: ''
  });

  const openAddTimeEntryModal = () => {
    setEditingTimeEntry(null);
    timeEntryForm.reset();
    timeEntryForm.clearErrors();
    timeEntryForm.setData({ user_id: '', work_project_id: '', clock_in: '', clock_out: '', notes: '' });
    setIsTimeEntryModalOpen(true);
  };

  const openEditTimeEntryModal = (entry) => {
    setEditingTimeEntry(entry);
    timeEntryForm.clearErrors();
    timeEntryForm.setData({
      user_id: entry.user_id || '',
      work_project_id: entry.work_project_id || '',
      clock_in: entry.clock_in ? String(entry.clock_in).slice(0, 16) : '',
      clock_out: entry.clock_out ? String(entry.clock_out).slice(0, 16) : '',
      notes: entry.notes || ''
    });
    setIsTimeEntryModalOpen(true);
  };

  const handleTimeEntrySubmit = (e) => {
    e.preventDefault();
    if (editingTimeEntry) {
      timeEntryForm.post(`/dashboard/time-entries/${editingTimeEntry.id}`, {
        preserveScroll: true,
        onSuccess: () => { setIsTimeEntryModalOpen(false); timeEntryForm.reset(); }
      });
    } else {
      timeEntryForm.post('/dashboard/time-entries', {
        preserveScroll: true,
        onSuccess: () => { setIsTimeEntryModalOpen(false); timeEntryForm.reset(); }
      });
    }
  };

  const deleteTimeEntry = (id) => {
    if (confirm('Delete this time entry? This cannot be undone.')) {
      router.delete(`/dashboard/time-entries/${id}`, { preserveScroll: true });
    }
  };

  // --- STAFF ADVANCES ---
  const [isAdvanceModalOpen, setIsAdvanceModalOpen] = useState(false);
  const advanceForm = useForm({
    user_id: '',
    amount: '',
    date: new Date().toISOString().slice(0, 10),
    note: ''
  });

  const openAddAdvanceModal = () => {
    advanceForm.reset();
    advanceForm.clearErrors();
    advanceForm.setData({ user_id: '', amount: '', date: new Date().toISOString().slice(0, 10), note: '' });
    setIsAdvanceModalOpen(true);
  };

  const handleAdvanceSubmit = (e) => {
    e.preventDefault();
    advanceForm.post('/dashboard/advances', {
      preserveScroll: true,
      onSuccess: () => { setIsAdvanceModalOpen(false); advanceForm.reset(); }
    });
  };

  const deleteAdvance = (id) => {
    if (confirm('Delete this advance? This cannot be undone.')) {
      router.delete(`/dashboard/advances/${id}`, { preserveScroll: true });
    }
  };

  // --- PAYROLL ---
  const [isPayrollModalOpen, setIsPayrollModalOpen] = useState(false);
  const payrollForm = useForm({
    user_id: '',
    period_start: '',
    period_end: ''
  });

  const openGeneratePayrollModal = () => {
    payrollForm.reset();
    payrollForm.clearErrors();
    payrollForm.setData({ user_id: '', period_start: '', period_end: '' });
    setIsPayrollModalOpen(true);
  };

  const handlePayrollSubmit = (e) => {
    e.preventDefault();
    payrollForm.post('/dashboard/payroll/generate', {
      preserveScroll: true,
      onSuccess: () => { setIsPayrollModalOpen(false); payrollForm.reset(); }
    });
  };

  const markPayrollPaid = (id) => {
    if (confirm('Mark this salary payment as paid? This will post it to the ledger and cannot be undone.')) {
      router.post(`/dashboard/payroll/${id}/pay`, {}, { preserveScroll: true });
    }
  };

  const deletePayroll = (id) => {
    if (confirm('Delete this salary record? This cannot be undone.')) {
      router.delete(`/dashboard/payroll/${id}`, { preserveScroll: true });
    }
  };

  const jobForm = useForm({
    title: '',
    type: 'Full-Time / Subcontract',
    location: 'Liverpool & Merseyside',
    rate: '',
    icon: 'Paintbrush',
    description: '',
    requirements: ['']
  });

  const openAddJobModal = () => {
    setEditingJob(null);
    jobForm.setData({
      title: '',
      type: 'Full-Time / Subcontract',
      location: 'Liverpool & Merseyside',
      rate: '',
      icon: 'Paintbrush',
      description: '',
      requirements: ['']
    });
    setIsJobModalOpen(true);
  };

  const openEditJobModal = (job) => {
    setEditingJob(job);
    jobForm.setData({
      title: job.title,
      type: job.type,
      location: job.location,
      rate: job.rate,
      icon: job.icon,
      description: job.description,
      requirements: job.requirements || ['']
    });
    setIsJobModalOpen(true);
  };

  const handleJobSubmit = (e) => {
    e.preventDefault();
    if (editingJob) {
      jobForm.post(`/dashboard/jobs/${editingJob.id}`, {
        preserveScroll: true,
        onSuccess: () => {
          setIsJobModalOpen(false);
          setEditingJob(null);
          jobForm.reset();
        }
      });
    } else {
      jobForm.post('/dashboard/jobs', {
        preserveScroll: true,
        onSuccess: () => {
          setIsJobModalOpen(false);
          jobForm.reset();
        }
      });
    }
  };

  const deleteJob = (id) => {
    if (confirm('Are you sure you want to delete this job post?')) {
      router.delete(`/dashboard/jobs/${id}`, { preserveScroll: true });
    }
  };

  const toggleJobStatus = (id) => {
    router.post(`/dashboard/jobs/${id}/toggle`, {}, { preserveScroll: true });
  };

  const approveReview = (id) => {
    router.post(`/dashboard/reviews/${id}/approve`, {}, { preserveScroll: true });
  };

  const rejectReview = (id) => {
    router.post(`/dashboard/reviews/${id}/reject`, {}, { preserveScroll: true });
  };

  const deleteReview = (id) => {
    if (confirm('Are you sure you want to delete this review?')) {
      router.delete(`/dashboard/reviews/${id}`, { preserveScroll: true });
    }
  };

  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  
  const galleryForm = useForm({
    title: '',
    category: 'Painting & Decorating',
    categoryKey: 'painting',
    location: '',
    tag: '',
    image: null,
    description: ''
  });

  
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [featureInputs, setFeatureInputs] = useState(['']);
  
  const serviceForm = useForm({
    title: '',
    icon: '',
    short_description: '',
    description: '',
    features: [],
    image: null
  });
  const [serviceImagePreview, setServiceImagePreview] = useState(null);

  const handleFeatureChange = (index, value) => {
    const newFeatures = [...featureInputs];
    newFeatures[index] = value;
    setFeatureInputs(newFeatures);
    serviceForm.setData('features', newFeatures.filter(f => f.trim() !== ''));
  };

  const addFeatureInput = () => setFeatureInputs([...featureInputs, '']);
  const removeFeatureInput = (index) => {
    const newFeatures = featureInputs.filter((_, i) => i !== index);
    setFeatureInputs(newFeatures.length ? newFeatures : ['']);
    serviceForm.setData('features', newFeatures.filter(f => f.trim() !== ''));
  };

  const openAddServiceModal = () => {
    setEditingService(null);
    setFeatureInputs(['']);
    serviceForm.setData({ title: '', icon: '', short_description: '', description: '', features: [], image: null });
    setServiceImagePreview(null);
    setIsServiceModalOpen(true);
  };

  const openEditServiceModal = (service) => {
    setEditingService(service);
    setFeatureInputs(service.features && service.features.length > 0 ? service.features : ['']);
    serviceForm.setData({
      title: service.title,
      icon: service.icon || '',
      short_description: service.short_description || '',
      description: service.description || '',
      features: service.features || [],
      image: null
    });
    setServiceImagePreview(service.image || null);
    setIsServiceModalOpen(true);
  };

  const handleServiceSubmit = (e) => {
    e.preventDefault();
    if (editingService) {
      serviceForm.post(`/dashboard/services/${editingService.id}`, {
        preserveScroll: true,
        onSuccess: () => setIsServiceModalOpen(false)
      });
    } else {
      serviceForm.post('/dashboard/services', {
        preserveScroll: true,
        onSuccess: () => {
          setIsServiceModalOpen(false);
          serviceForm.reset();
        }
      });
    }
  };

  const deleteService = (id) => {
    if(confirm('Are you sure you want to delete this service?')) {
      router.delete(`/dashboard/services/${id}`, { preserveScroll: true });
    }
  };

  const toggleServiceStatus = (id) => {
    router.put(`/dashboard/services/${id}/toggle`, {}, { preserveScroll: true });
  };

  const openAddProjectModal = () => {
    setEditingProject(null);
    galleryForm.setData({
      title: '', category: 'Painting & Decorating', categoryKey: 'painting', location: '', tag: '', image: null, description: ''
    });
    setIsGalleryModalOpen(true);
  };

  const openEditProjectModal = (project) => {
    setEditingProject(project);
    galleryForm.setData({
      title: project.title,
      category: project.category,
      categoryKey: project.categoryKey,
      location: project.location || '',
      tag: project.tag || '',
      image: null,
      description: project.description || ''
    });
    setIsGalleryModalOpen(true);
  };

  const handleProjectSubmit = (e) => {
    e.preventDefault();
    if (editingProject) {
      galleryForm.post(`/dashboard/gallery/${editingProject.id}`, {
        preserveScroll: true,
        onSuccess: () => setIsGalleryModalOpen(false)
      });
    } else {
      galleryForm.post('/dashboard/gallery', {
        preserveScroll: true,
        onSuccess: () => {
          setIsGalleryModalOpen(false);
          galleryForm.reset();
        }
      });
    }
  };

  const deleteProject = (id) => {
    if(confirm('Are you sure you want to delete this project?')) {
      router.delete(`/dashboard/gallery/${id}`, { preserveScroll: true });
    }
  };

  const toggleProjectStatus = (id) => {
    router.put(`/dashboard/gallery/${id}/toggle`, {}, { preserveScroll: true });
  };



  // ========== Hero Slider & FAQ CMS ==========
  const [isEditingFaq, setIsEditingFaq] = useState(false);
  const [editingFaq, setEditingFaq] = useState(null);
  const faqForm = useForm({ question: '', answer: '' });

  const openAddFaqModal = () => {
    setEditingFaq(null);
    faqForm.setData({ question: '', answer: '' });
    setIsEditingFaq(true);
  };
  const openEditFaqModal = (faq) => {
    setEditingFaq(faq);
    faqForm.setData({ question: faq.question, answer: faq.answer });
    setIsEditingFaq(true);
  };
  const handleFaqSubmit = (e) => {
    e.preventDefault();
    if (editingFaq) {
      faqForm.post(`/dashboard/faqs/${editingFaq.id}`, { preserveScroll: true, onSuccess: () => setIsEditingFaq(false) });
    } else {
      faqForm.post('/dashboard/faqs', { preserveScroll: true, onSuccess: () => { setIsEditingFaq(false); faqForm.reset(); } });
    }
  };
  const deleteFaq = (id) => { if(confirm('Delete this FAQ?')) router.delete(`/dashboard/faqs/${id}`, { preserveScroll: true }); };
  const toggleFaq = (id) => router.put(`/dashboard/faqs/${id}/toggle`, {}, { preserveScroll: true });

  const heroUploadForm = useForm({ images: null });
  const handleHeroUpload = (e) => {
    e.preventDefault();
    heroUploadForm.post('/dashboard/hero-images', { preserveScroll: true, onSuccess: () => heroUploadForm.reset() });
  };
  const deleteHeroImage = (id) => { if(confirm('Delete this hero image?')) router.delete(`/dashboard/hero-images/${id}`, { preserveScroll: true }); };
  const toggleHeroImage = (id) => router.put(`/dashboard/hero-images/${id}/toggle`, {}, { preserveScroll: true });

  // ========== Home Page CMS ==========
  const homeForm = useForm({
    home_hero_headline: settings.home_hero_headline || '',
    home_hero_subtitle: settings.home_hero_subtitle || '',
    home_hero_btn1: settings.home_hero_btn1 || '',
    home_hero_btn2: settings.home_hero_btn2 || '',
    home_feature1_icon: settings.home_feature1_icon || '', home_feature1_title: settings.home_feature1_title || '', home_feature1_desc: settings.home_feature1_desc || '',
    home_feature2_icon: settings.home_feature2_icon || '', home_feature2_title: settings.home_feature2_title || '', home_feature2_desc: settings.home_feature2_desc || '',
    home_feature3_icon: settings.home_feature3_icon || '', home_feature3_title: settings.home_feature3_title || '', home_feature3_desc: settings.home_feature3_desc || '',
    home_feature4_icon: settings.home_feature4_icon || '', home_feature4_title: settings.home_feature4_title || '', home_feature4_desc: settings.home_feature4_desc || '',
    home_about_badge: settings.home_about_badge || '', home_about_title: settings.home_about_title || '', home_about_desc: settings.home_about_desc || '',
    home_about_commit1: settings.home_about_commit1 || '', home_about_commit2: settings.home_about_commit2 || '',
    home_about_commit3: settings.home_about_commit3 || '', home_about_commit4: settings.home_about_commit4 || '',
    home_why1_icon: settings.home_why1_icon || '', home_why1_title: settings.home_why1_title || '', home_why1_desc: settings.home_why1_desc || '',
    home_why2_icon: settings.home_why2_icon || '', home_why2_title: settings.home_why2_title || '', home_why2_desc: settings.home_why2_desc || '',
    home_why3_icon: settings.home_why3_icon || '', home_why3_title: settings.home_why3_title || '', home_why3_desc: settings.home_why3_desc || '',
    home_why4_icon: settings.home_why4_icon || '', home_why4_title: settings.home_why4_title || '', home_why4_desc: settings.home_why4_desc || '',
    home_why5_icon: settings.home_why5_icon || '', home_why5_title: settings.home_why5_title || '', home_why5_desc: settings.home_why5_desc || '',
    home_why6_icon: settings.home_why6_icon || '', home_why6_title: settings.home_why6_title || '', home_why6_desc: settings.home_why6_desc || '',
    home_step1_num: settings.home_step1_num || '01', home_step1_title: settings.home_step1_title || '', home_step1_desc: settings.home_step1_desc || '',
    home_step2_num: settings.home_step2_num || '02', home_step2_title: settings.home_step2_title || '', home_step2_desc: settings.home_step2_desc || '',
    home_step3_num: settings.home_step3_num || '03', home_step3_title: settings.home_step3_title || '', home_step3_desc: settings.home_step3_desc || '',
    service_area_title: settings.service_area_title || 'Proudly Serving Liverpool & Surrounding Districts',
    service_area_desc: settings.service_area_desc || 'Based at 21 Alexander Road, Liverpool (L22 1RJ), we provide prompt, reliable home improvement and property services across:',
    service_area_locations: settings.service_area_locations || 'Liverpool City Centre, Crosby & Waterloo, Formby & Southport, Allerton & Aigburth, Bootle & Sefton, Wirral & Surrounding Areas',
    service_area_card_title: settings.service_area_card_title || 'Local Liverpool Trades',
    service_area_card_desc: settings.service_area_card_desc || 'Fast response times, local know-how, and dependable scheduling for homeowners and landlords.',
    service_area_card_pin: settings.service_area_card_pin || 'L22 1RJ, Liverpool, UK',
    home_step4_num: settings.home_step4_num || '04', home_step4_title: settings.home_step4_title || '', home_step4_desc: settings.home_step4_desc || '',
    home_faq1_q: settings.home_faq1_q || '', home_faq1_a: settings.home_faq1_a || '',
    home_faq2_q: settings.home_faq2_q || '', home_faq2_a: settings.home_faq2_a || '',
    home_faq3_q: settings.home_faq3_q || '', home_faq3_a: settings.home_faq3_a || '',
    home_faq4_q: settings.home_faq4_q || '', home_faq4_a: settings.home_faq4_a || '',
  });
  const handleHomeSubmit = (e) => {
    e.preventDefault();
    homeForm.post('/dashboard/home', { preserveScroll: true });
  };

  // ========== About Page CMS ==========
  const [aboutImgPreviews, setAboutImgPreviews] = useState({
    about_hero_bg: settings.about_hero_bg || null,
    about_main_image: settings.about_main_image || null,
    about_secondary_image: settings.about_secondary_image || null,
  });
  const aboutForm = useForm({
    about_hero_title: settings.about_hero_title || '',
    about_hero_subtitle: settings.about_hero_subtitle || '',
    about_who_heading: settings.about_who_heading || '',
    about_who_para1: settings.about_who_para1 || '',
    about_who_para2: settings.about_who_para2 || '',
    about_who_highlight1: settings.about_who_highlight1 || '',
    about_who_highlight2: settings.about_who_highlight2 || '',
    about_who_highlight3: settings.about_who_highlight3 || '',
    about_who_highlight4: settings.about_who_highlight4 || '',
    about_mission_title: settings.about_mission_title || '',
    about_mission_text: settings.about_mission_text || '',
    about_vision_title: settings.about_vision_title || '',
    about_vision_text: settings.about_vision_text || '',
    about_value1_title: settings.about_value1_title || '', about_value1_desc: settings.about_value1_desc || '',
    about_value2_title: settings.about_value2_title || '', about_value2_desc: settings.about_value2_desc || '',
    about_value3_title: settings.about_value3_title || '', about_value3_desc: settings.about_value3_desc || '',
    about_value4_title: settings.about_value4_title || '', about_value4_desc: settings.about_value4_desc || '',
    about_approach1_title: settings.about_approach1_title || '', about_approach1_desc: settings.about_approach1_desc || '',
    about_approach2_title: settings.about_approach2_title || '', about_approach2_desc: settings.about_approach2_desc || '',
    about_approach3_title: settings.about_approach3_title || '', about_approach3_desc: settings.about_approach3_desc || '',
    about_approach4_title: settings.about_approach4_title || '', about_approach4_desc: settings.about_approach4_desc || '',
    about_quality1_title: settings.about_quality1_title || '', about_quality1_desc: settings.about_quality1_desc || '',
    about_quality2_title: settings.about_quality2_title || '', about_quality2_desc: settings.about_quality2_desc || '',
    about_quality3_title: settings.about_quality3_title || '', about_quality3_desc: settings.about_quality3_desc || '',
    about_quality4_title: settings.about_quality4_title || '', about_quality4_desc: settings.about_quality4_desc || '',
    about_hero_bg: null,
    about_main_image: null,
    about_secondary_image: null,
  });
  const handleAboutSubmit = (e) => {
    e.preventDefault();
    aboutForm.post('/dashboard/about', { preserveScroll: true });
  };
  const handleAboutImage = (key, file) => {
    aboutForm.setData(key, file);
    setAboutImgPreviews(prev => ({ ...prev, [key]: URL.createObjectURL(file) }));
  };



  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (quotes.length > 0 && selectedQuoteId === null) {
      setSelectedQuoteId(quotes[0].id);
    }
    if (messages.length > 0 && selectedMessageId === null) {
      setSelectedMessageId(messages[0].id);
    }
  }, [quotes, messages]);

  useEffect(() => {
    if (activeTab === 'inbox') {
      if (inboxSubTab === 'quotes' && selectedQuoteId) {
        const selectedQuote = quotes.find(q => q.id === selectedQuoteId);
        if (selectedQuote && selectedQuote.status === 'Pending') {
          router.post(`/quotes/${selectedQuoteId}/read`, {}, { preserveScroll: true });
        }
      } else if (inboxSubTab === 'messages' && selectedMessageId) {
        const selectedMsg = messages.find(m => m.id === selectedMessageId);
        if (selectedMsg && selectedMsg.status === 'Unread') {
          router.post(`/contact/${selectedMessageId}/read`, {}, { preserveScroll: true });
        }
      }
    }
  }, [selectedQuoteId, selectedMessageId, inboxSubTab, activeTab, quotes, messages]);

  const unreadQuotesCount = quotes.filter(q => q.status === 'Pending').length;
  const unreadMessagesCount = messages.filter(m => m.status === 'Unread').length;
  const totalUnreadCount = unreadQuotesCount + unreadMessagesCount;

  const unreadNotifications = [
    ...quotes.filter(q => q.status === 'Pending').map(q => ({ ...q, type: 'quote' })),
    ...messages.filter(m => m.status === 'Unread').map(m => ({ ...m, type: 'message' }))
  ].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  const handleNotificationClick = (item) => {
    setActiveTab('inbox');
    setInboxSubTab(item.type === 'quote' ? 'quotes' : 'messages');
    if (item.type === 'quote') {
      setSelectedQuoteId(item.id);
    } else {
      setSelectedMessageId(item.id);
    }
    setIsNotificationOpen(false);
  };


  const handleLogout = () => {
    router.post('/logout');
  };

  const handleSave = () => {
    setSaveMessage('Settings saved successfully!');
    setTimeout(() => setSaveMessage(''), 3000);
  };

  const navGroups = [
    { type: 'single', id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { type: 'single', id: 'timeclock', label: 'Time Clock', icon: Clock },
    {
      type: 'group', id: 'crm', label: 'Customers & Leads', icon: Users,
      children: [
        { id: 'customers_list', label: 'Customer List', icon: Users },
        { id: 'customers_add', label: 'Add Customer', icon: UserPlus },
        { id: 'customers_import', label: 'Customer Import', icon: Upload },
        { id: 'customers_logs', label: 'Customer Logs', icon: History },
        { id: 'inbox', label: 'Inbox & Quotes', icon: Inbox },
        { id: 'reviews_cms', label: 'Reviews CMS', icon: Star },
      ]
    },
    {
      type: 'group', id: 'sales', label: 'Sales & Projects', icon: Briefcase,
      children: [
        { id: 'invoices', label: 'Invoices', icon: FileText },
        { id: 'projects', label: 'Projects', icon: FolderKanban },
      ]
    },
    {
      type: 'group', id: 'finance', label: 'Account Management', icon: Wallet,
      children: [
        { id: 'finance', label: 'Income & Expenses', icon: Wallet },
        { id: 'finance_accounts', label: 'Cash & Bank Accounts', icon: Wallet },
        { id: 'finance_suppliers', label: 'Suppliers & Payable', icon: Briefcase },
        { id: 'finance_receivables', label: 'Customer Receivable', icon: Users },
        { id: 'finance_reports', label: 'Financial Reports', icon: FileText },
        ...(auth?.user?.role === 'admin' ? [{ id: 'payroll', label: 'Payroll', icon: Wallet }] : []),
      ]
    },
    {
      type: 'group', id: 'website', label: 'Website Content', icon: HomeIcon,
      children: [
        { id: 'home', label: 'Home Page CMS', icon: HomeIcon },
        { id: 'about', label: 'About Us CMS', icon: Info },
        { id: 'services', label: 'Services CMS', icon: Wrench },
        { id: 'gallery', label: 'Gallery CMS', icon: ImageIcon },
        { id: 'careers', label: 'Careers CMS', icon: Briefcase },
      ]
    },
    {
      type: 'group', id: 'system', label: 'Settings & System', icon: Settings,
      children: [
        { id: 'settings', label: 'Global Settings', icon: Settings },
        { id: 'tracking', label: 'Tracking & Pixels', icon: Radar },
        { id: 'payments', label: 'Payment Gateway Setup', icon: CreditCard },
        { id: 'payment_accounts', label: 'Payment Receiving Accounts', icon: Wallet },
        ...(auth?.user?.role === 'admin' ? [{ id: 'accounts', label: 'Account Management', icon: ShieldCheck }] : []),
      ]
    },
  ];

  // Build a lookup of childId -> parentGroupId, so we can auto-expand the right group
  const childToGroupMap = {};
  navGroups.forEach(g => {
    if (g.type === 'group') {
      g.children.forEach(c => { childToGroupMap[c.id] = g.id; });
    }
  });

  const [expandedGroups, setExpandedGroups] = useState(() => {
    try {
      const saved = localStorage.getItem('adminSidebarExpandedGroups');
      const parsed = saved ? JSON.parse(saved) : [];
      const initial = new Set(Array.isArray(parsed) ? parsed : []);
      const activeGroup = childToGroupMap[activeTab];
      if (activeGroup) initial.add(activeGroup);
      return initial;
    } catch (e) {
      const activeGroup = childToGroupMap[activeTab];
      return new Set(activeGroup ? [activeGroup] : []);
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('adminSidebarExpandedGroups', JSON.stringify(Array.from(expandedGroups)));
    } catch (e) {
      // ignore storage errors
    }
  }, [expandedGroups]);

  // Whenever activeTab changes (including via setActiveTab calls elsewhere, e.g. the
  // Overview page's "View Full Tracking Dashboard" button, or a stale localStorage tab
  // on load), make sure the group containing it is expanded.
  useEffect(() => {
    const activeGroup = childToGroupMap[activeTab];
    if (activeGroup) {
      setExpandedGroups(prev => {
        if (prev.has(activeGroup)) return prev;
        const next = new Set(prev);
        next.add(activeGroup);
        return next;
      });
    }
  }, [activeTab]);

  const toggleGroup = (groupId) => {
    setExpandedGroups(prev => {
      const next = new Set(prev);
      if (next.has(groupId)) {
        next.delete(groupId);
      } else {
        next.add(groupId);
      }
      return next;
    });
  };

  // --- MOCK CHARTS ---
  const BarChartMock = () => (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '15px', height: '180px', marginTop: '20px', borderBottom: '1px solid #E5E7EB', paddingBottom: '10px' }}>
      {[12, 18, 25, 14, 30, 22, 10, 28, 20, 35, 25, 15].map((val, i) => (
        <div key={i} style={{ flex: 1, backgroundColor: i === 9 ? 'var(--color-secondary)' : 'var(--color-primary)', height: `${val * 2.5}%`, borderRadius: '4px', opacity: i === 9 ? 1 : 0.8 }}></div>
      ))}
    </div>
  );

  const WaveChartMock = () => (
    <div style={{ position: 'relative', height: '140px', overflow: 'hidden', marginTop: '20px' }}>
      <svg viewBox="0 0 500 150" preserveAspectRatio="none" style={{ height: '100%', width: '100%' }}>
        <path d="M0.00,49.98 C150.00,150.00 349.20,-50.00 500.00,49.98 L500.00,150.00 L0.00,150.00 Z" style={{ stroke: 'none', fill: 'url(#grad1)' }}></path>
        <path d="M0.00,49.98 C150.00,150.00 349.20,-50.00 500.00,49.98" style={{ stroke: 'var(--color-secondary)', strokeWidth: '3', fill: 'none' }}></path>
        <path d="M0.00,90.00 C150.00,10.00 300.00,150.00 500.00,70.00 L500.00,150.00 L0.00,150.00 Z" style={{ stroke: 'none', fill: 'url(#grad2)' }}></path>
        <path d="M0.00,90.00 C150.00,10.00 300.00,150.00 500.00,70.00" style={{ stroke: 'var(--color-primary)', strokeWidth: '3', fill: 'none' }}></path>
        
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#F26522', stopOpacity: 0.2 }} />
            <stop offset="100%" style={{ stopColor: '#FFFFFF', stopOpacity: 0 }} />
          </linearGradient>
          <linearGradient id="grad2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#242D8A', stopOpacity: 0.15 }} />
            <stop offset="100%" style={{ stopColor: '#FFFFFF', stopOpacity: 0 }} />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );

  const DonutChartMock = () => (
    <div style={{ position: 'relative', width: '160px', height: '160px', margin: '0 auto' }}>
      <svg viewBox="0 0 36 36" style={{ width: '100%', height: '100%' }}>
        <path
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          fill="none"
          stroke="var(--color-light)"
          strokeWidth="4"
        />
        <path
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          fill="none"
          stroke="var(--color-primary)"
          strokeWidth="4"
          strokeDasharray="65, 100"
        />
        <path
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          fill="none"
          stroke="var(--color-secondary)"
          strokeWidth="4"
          strokeDasharray="25, 100"
          strokeDashoffset="-65"
        />
      </svg>
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontSize: '26px', fontWeight: '800', color: 'var(--color-primary)', lineHeight: '1' }}>65%</span>
        <span style={{ fontSize: '11px', color: '#64748B', fontWeight: '600' }}>Conversion</span>
      </div>
    </div>
  );

  const LIVE_EVENT_COLORS = {
    pageview: '#64748B',
    pixel_fired: '#1877F2',
    ga4_fired: '#E37400',
    gtm_fired: '#7C3AED'
  };
  const LIVE_EVENT_LABELS = {
    pageview: 'Pageviews',
    pixel_fired: 'Meta Pixel',
    ga4_fired: 'GA4',
    gtm_fired: 'GTM'
  };

  const LiveTrackingPieChart = ({ eventsByType = {} }) => {
    const types = ['pageview', 'pixel_fired', 'ga4_fired', 'gtm_fired'];
    const total = types.reduce((sum, t) => sum + (eventsByType[t] || 0), 0);

    if (total === 0) {
      return (
        <div style={{ position: 'relative', width: '160px', height: '160px', margin: '0 auto' }}>
          <svg viewBox="0 0 36 36" style={{ width: '100%', height: '100%' }}>
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#E2E8F0"
              strokeWidth="4"
            />
          </svg>
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 12px' }}>
            <span style={{ fontSize: '12px', color: '#94A3B8', fontWeight: '600' }}>No activity yet today</span>
          </div>
        </div>
      );
    }

    let cumulative = 0;
    const segments = types
      .filter(t => (eventsByType[t] || 0) > 0)
      .map(t => {
        const count = eventsByType[t] || 0;
        const pct = (count / total) * 100;
        const offset = -cumulative;
        cumulative += pct;
        return { type: t, count, pct, offset };
      });

    return (
      <div style={{ position: 'relative', width: '160px', height: '160px', margin: '0 auto' }}>
        <svg viewBox="0 0 36 36" style={{ width: '100%', height: '100%' }}>
          <path
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="var(--color-light)"
            strokeWidth="4"
          />
          {segments.map(seg => (
            <path
              key={seg.type}
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke={LIVE_EVENT_COLORS[seg.type]}
              strokeWidth="4"
              strokeDasharray={`${seg.pct}, 100`}
              strokeDashoffset={seg.offset}
            />
          ))}
        </svg>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontSize: '24px', fontWeight: '800', color: '#0F172A', lineHeight: '1' }}>{total}</span>
          <span style={{ fontSize: '11px', color: '#64748B', fontWeight: '600' }}>Events Today</span>
        </div>
      </div>
    );
  };

  // --- RENDER TABS ---

  const profileForm = useForm({
    name: usePage().props.auth.user.name,
    email: usePage().props.auth.user.email,
    avatar: null,
  });
  const userAvatar = usePage().props.auth.user.avatar;

  const passwordForm = useForm({
    current_password: '',
    password: '',
    password_confirmation: '',
  });

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    profileForm.post('/dashboard/profile', { preserveScroll: true });
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    passwordForm.post('/dashboard/profile/password', {
      preserveScroll: true,
      onSuccess: () => passwordForm.reset(),
    });
  };

  const renderProfile = () => (
    <div className="admin-panel-section">
      <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#0F172A', marginBottom: '24px' }}>Admin Profile</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '32px' }}>
        {/* Profile Info Form */}
        <div style={{ backgroundColor: '#FFFFFF', padding: '32px', borderRadius: '16px', border: '1px solid #E2E8F0', height: 'fit-content' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '24px', color: 'var(--color-primary)' }}>Account Information</h3>
          <form onSubmit={handleProfileSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '700', marginBottom: '8px', color: '#0F172A' }}>Profile Picture</label>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                {userAvatar && (
                  <img src={userAvatar} alt="Profile" style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }} />
                )}
                <input type="file" accept="image/*" onChange={e => profileForm.setData('avatar', e.target.files[0])} style={{ padding: '8px', border: '1px solid #E2E8F0', borderRadius: '8px', fontSize: '13px', width: '100%' }} />
              </div>
              {profileForm.errors.avatar && <div style={{ color: '#EF4444', fontSize: '12px', marginTop: '4px', fontWeight: '600' }}>{profileForm.errors.avatar}</div>}
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '700', marginBottom: '8px', color: '#0F172A' }}>Full Name</label>
              <input type="text" required value={profileForm.data.name} onChange={e => profileForm.setData('name', e.target.value)} style={{ width: '100%', padding: '14px', borderRadius: '10px', border: '1px solid #E2E8F0', fontSize: '15px' }} />
              {profileForm.errors.name && <div style={{ color: '#EF4444', fontSize: '12px', marginTop: '4px', fontWeight: '600' }}>{profileForm.errors.name}</div>}
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '700', marginBottom: '8px', color: '#0F172A' }}>Email Address</label>
              <input type="email" required value={profileForm.data.email} onChange={e => profileForm.setData('email', e.target.value)} style={{ width: '100%', padding: '14px', borderRadius: '10px', border: '1px solid #E2E8F0', fontSize: '15px' }} />
              {profileForm.errors.email && <div style={{ color: '#EF4444', fontSize: '12px', marginTop: '4px', fontWeight: '600' }}>{profileForm.errors.email}</div>}
            </div>
            <button type="submit" disabled={profileForm.processing} style={{ marginTop: '12px', padding: '14px 24px', backgroundColor: 'var(--color-primary)', color: '#FFF', borderRadius: '10px', border: 'none', cursor: 'pointer', fontWeight: '700', fontSize: '15px', transition: 'all 0.2s' }}>
              {profileForm.processing ? 'Saving...' : 'Update Information'}
            </button>
            {profileForm.recentlySuccessful && <p style={{ color: '#10B981', fontSize: '14px', margin: 0, fontWeight: '600' }}>✓ Profile information updated successfully.</p>}
          </form>
        </div>

        {/* Password Form */}
        <div style={{ backgroundColor: '#FFFFFF', padding: '32px', borderRadius: '16px', border: '1px solid #E2E8F0', height: 'fit-content' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '24px', color: 'var(--color-primary)' }}>Change Password</h3>
          <form onSubmit={handlePasswordSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '700', marginBottom: '8px', color: '#0F172A' }}>Current Password</label>
              <input type="password" required value={passwordForm.data.current_password} onChange={e => passwordForm.setData('current_password', e.target.value)} style={{ width: '100%', padding: '14px', borderRadius: '10px', border: '1px solid #E2E8F0', fontSize: '15px' }} />
              {passwordForm.errors.current_password && <div style={{ color: '#EF4444', fontSize: '12px', marginTop: '4px', fontWeight: '600' }}>{passwordForm.errors.current_password}</div>}
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '700', marginBottom: '8px', color: '#0F172A' }}>New Password</label>
              <input type="password" required value={passwordForm.data.password} onChange={e => passwordForm.setData('password', e.target.value)} style={{ width: '100%', padding: '14px', borderRadius: '10px', border: '1px solid #E2E8F0', fontSize: '15px' }} />
              {passwordForm.errors.password && <div style={{ color: '#EF4444', fontSize: '12px', marginTop: '4px', fontWeight: '600' }}>{passwordForm.errors.password}</div>}
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '700', marginBottom: '8px', color: '#0F172A' }}>Confirm New Password</label>
              <input type="password" required value={passwordForm.data.password_confirmation} onChange={e => passwordForm.setData('password_confirmation', e.target.value)} style={{ width: '100%', padding: '14px', borderRadius: '10px', border: '1px solid #E2E8F0', fontSize: '15px' }} />
            </div>
            <button type="submit" disabled={passwordForm.processing} style={{ marginTop: '12px', padding: '14px 24px', backgroundColor: 'var(--color-secondary)', color: '#FFF', borderRadius: '10px', border: 'none', cursor: 'pointer', fontWeight: '700', fontSize: '15px', transition: 'all 0.2s' }}>
              {passwordForm.processing ? 'Saving...' : 'Update Password'}
            </button>
            {passwordForm.recentlySuccessful && <p style={{ color: '#10B981', fontSize: '14px', margin: 0, fontWeight: '600' }}>✓ Password changed successfully.</p>}
          </form>
        </div>
      </div>
    </div>
  );

  const renderOverview = () => (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#0F172A', margin: 0 }}>Dashboard Overview</h2>
        <button style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', padding: '8px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: '600', color: '#64748B', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>Last 30 Days ▾</button>
      </div>

      {/* 4 Stat Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px', marginBottom: '32px' }}>
        
        {/* Card 1 */}
        <div style={{ backgroundColor: 'var(--color-primary)', color: '#FFF', padding: '24px', borderRadius: '16px', boxShadow: '0 10px 25px rgba(36, 45, 138, 0.2)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
            <span style={{ fontSize: '14px', fontWeight: '600', opacity: 0.9 }}>Total Quote Requests</span>
            <div style={{ width: '32px', height: '32px', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><FileText size={18} /></div>
          </div>
          <h2 style={{ fontSize: '36px', margin: 0, fontWeight: '800' }}>124</h2>
          <p style={{ fontSize: '12px', margin: '8px 0 0 0', color: '#E0E7FF' }}>+14% from last month</p>
        </div>

        {/* Card 2 */}
        <div style={{ backgroundColor: '#FFFFFF', padding: '24px', borderRadius: '16px', border: '1px solid #E2E8F0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
            <span style={{ fontSize: '14px', fontWeight: '600', color: '#64748B' }}>Active Projects</span>
            <div style={{ width: '32px', height: '32px', backgroundColor: 'rgba(242, 101, 34, 0.1)', color: 'var(--color-secondary)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><FolderKanban size={18} /></div>
          </div>
          <h2 style={{ fontSize: '36px', margin: 0, fontWeight: '800', color: '#0F172A' }}>12</h2>
          <p style={{ fontSize: '12px', margin: '8px 0 0 0', color: '#10B981', fontWeight: '600' }}>4 completing this week</p>
        </div>

        {/* Card 3 */}
        <div style={{ backgroundColor: '#FFFFFF', padding: '24px', borderRadius: '16px', border: '1px solid #E2E8F0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
            <span style={{ fontSize: '14px', fontWeight: '600', color: '#64748B' }}>Website Visitors</span>
            <div style={{ width: '32px', height: '32px', backgroundColor: 'rgba(36, 45, 138, 0.1)', color: 'var(--color-primary)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Eye size={18} /></div>
          </div>
          <h2 style={{ fontSize: '36px', margin: 0, fontWeight: '800', color: '#0F172A' }}>4,205</h2>
          <p style={{ fontSize: '12px', margin: '8px 0 0 0', color: '#64748B' }}>Avg. 140 visits / day</p>
        </div>

        {/* Card 4 */}
        <div style={{ backgroundColor: '#FFFFFF', padding: '24px', borderRadius: '16px', border: '1px solid #E2E8F0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
            <span style={{ fontSize: '14px', fontWeight: '600', color: '#64748B' }}>New Messages</span>
            <div style={{ width: '32px', height: '32px', backgroundColor: 'rgba(16, 185, 129, 0.1)', color: '#10B981', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><MessageSquare size={18} /></div>
          </div>
          <h2 style={{ fontSize: '36px', margin: 0, fontWeight: '800', color: '#0F172A' }}>28</h2>
          <p style={{ fontSize: '12px', margin: '8px 0 0 0', color: '#64748B' }}>In the last 7 days</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1fr', gap: '24px' }}>
        
        {/* Left Column Charts */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Quote Requests Bar Chart */}
          <div style={{ backgroundColor: '#FFFFFF', padding: '24px', borderRadius: '16px', border: '1px solid #E2E8F0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ fontSize: '16px', color: '#0F172A', fontWeight: '800', margin: '0 0 4px 0' }}>Quote Requests (Monthly)</h3>
                <span style={{ fontSize: '13px', color: '#64748B' }}>Volume of service inquiries</span>
              </div>
              <button style={{ backgroundColor: 'var(--color-primary-light)', color: 'var(--color-primary)', border: 'none', padding: '6px 14px', borderRadius: '8px', fontSize: '12px', fontWeight: '700' }}>View Report</button>
            </div>
            <BarChartMock />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px', color: '#9CA3AF', fontSize: '11px', textTransform: 'uppercase', paddingLeft: '8px', fontWeight: '600' }}>
              <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
            </div>
          </div>

          {/* Traffic Wave Chart */}
          <div style={{ backgroundColor: '#FFFFFF', padding: '24px', borderRadius: '16px', border: '1px solid #E2E8F0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '24px', left: '24px', zIndex: 10 }}>
               <h3 style={{ fontSize: '16px', color: '#0F172A', fontWeight: '800', margin: '0 0 12px 0' }}>Website Traffic</h3>
              <div style={{ display: 'flex', gap: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#64748B', fontWeight: '600' }}><span style={{ width: '10px', height: '10px', borderRadius: '3px', backgroundColor: 'var(--color-primary)' }}></span>Organic Search</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#64748B', fontWeight: '600' }}><span style={{ width: '10px', height: '10px', borderRadius: '3px', backgroundColor: 'var(--color-secondary)' }}></span>Direct / Social</div>
              </div>
            </div>
            <div style={{ marginTop: '50px' }}>
              <WaveChartMock />
            </div>
          </div>
        </div>

        {/* Right Column Donut & Leads */}
        <div style={{ backgroundColor: '#FFFFFF', padding: '32px 24px', borderRadius: '16px', border: '1px solid #E2E8F0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ fontSize: '16px', color: '#0F172A', fontWeight: '800', margin: '0 0 8px 0', textAlign: 'center' }}>Quote Conversion Rate</h3>
          <p style={{ fontSize: '13px', color: '#64748B', textAlign: 'center', marginBottom: '32px' }}>Quotes vs Completed Jobs</p>
          
          <DonutChartMock />
          
          <div style={{ width: '100%', marginTop: '36px', borderTop: '1px solid #F1F5F9' }}>
            <div style={{ padding: '16px 0', borderBottom: '1px solid #F1F5F9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#64748B', fontSize: '14px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '12px', height: '12px', backgroundColor: 'var(--color-primary)', borderRadius: '4px' }}></span> Successful Quotes
              </span>
              <span style={{ fontWeight: '800', color: '#0F172A' }}>65%</span>
            </div>
            <div style={{ padding: '16px 0', borderBottom: '1px solid #F1F5F9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#64748B', fontSize: '14px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '12px', height: '12px', backgroundColor: 'var(--color-secondary)', borderRadius: '4px' }}></span> Pending / Follow Up
              </span>
              <span style={{ fontWeight: '800', color: '#0F172A' }}>25%</span>
            </div>
            <div style={{ padding: '16px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#64748B', fontSize: '14px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '12px', height: '12px', backgroundColor: 'var(--color-light)', borderRadius: '4px' }}></span> Declined
              </span>
              <span style={{ fontWeight: '800', color: '#0F172A' }}>10%</span>
            </div>
          </div>

          <button style={{ backgroundColor: 'var(--color-primary)', color: '#FFF', border: 'none', padding: '14px', borderRadius: '8px', fontSize: '14px', fontWeight: '700', marginTop: 'auto', width: '100%', cursor: 'pointer' }}>View Sales Report</button>
        </div>

      </div>

      {/* Live Pixel Tracking */}
      <style>{`@keyframes overviewPulse { 0% { box-shadow: 0 0 0 0 rgba(16,185,129,0.5); } 70% { box-shadow: 0 0 0 6px rgba(16,185,129,0); } 100% { box-shadow: 0 0 0 0 rgba(16,185,129,0); } }`}</style>
      <div style={{ backgroundColor: '#FFFFFF', padding: '24px', borderRadius: '16px', border: '1px solid #E2E8F0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)', marginTop: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '20px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
              <h3 style={{ fontSize: '16px', color: '#0F172A', fontWeight: '800', margin: 0 }}>Live Pixel Tracking</h3>
              <span style={{ display: 'flex', alignItems: 'center', gap: '5px', backgroundColor: '#ECFDF5', color: '#059669', fontSize: '11px', fontWeight: '700', padding: '3px 10px', borderRadius: '999px' }}>
                <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#10B981', animation: 'overviewPulse 1.5s infinite' }}></span>
                Live
              </span>
            </div>
            <span style={{ fontSize: '13px', color: '#64748B' }}>Real-time site activity, updated every 8s</span>
          </div>
          <button
            onClick={() => setActiveTab('tracking')}
            style={{ backgroundColor: 'var(--color-primary-light)', color: 'var(--color-primary)', border: 'none', padding: '8px 16px', borderRadius: '8px', fontSize: '12px', fontWeight: '700', cursor: 'pointer', whiteSpace: 'nowrap' }}
          >
            View Full Tracking Dashboard →
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 220px', gap: '32px', alignItems: 'center' }}>
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '16px', marginBottom: '8px' }}>
              <div style={{ backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '16px' }}>
                <span style={{ fontSize: '11px', fontWeight: '700', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.03em' }}>Pageviews Today</span>
                <p style={{ fontSize: '24px', fontWeight: '800', color: '#0F172A', margin: '6px 0 0 0' }}>{liveStats ? liveStats.today_pageviews : '—'}</p>
              </div>
              <div style={{ backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '16px' }}>
                <span style={{ fontSize: '11px', fontWeight: '700', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.03em' }}>Unique Visitors</span>
                <p style={{ fontSize: '24px', fontWeight: '800', color: '#0F172A', margin: '6px 0 0 0' }}>{liveStats ? liveStats.today_unique_sessions : '—'}</p>
              </div>
              <div style={{ backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '16px' }}>
                <span style={{ fontSize: '11px', fontWeight: '700', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.03em' }}>Events (5 min)</span>
                <p style={{ fontSize: '24px', fontWeight: '800', color: '#0F172A', margin: '6px 0 0 0' }}>{liveStats ? liveStats.last_5_min_events : '—'}</p>
              </div>
              <div style={{ backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '16px' }}>
                <span style={{ fontSize: '11px', fontWeight: '700', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.03em' }}>Active Trackers</span>
                <p style={{ fontSize: '24px', fontWeight: '800', color: '#0F172A', margin: '6px 0 0 0' }}>
                  {liveStats ? ['pixel_fired', 'ga4_fired', 'gtm_fired'].filter(k => ((liveStats.today_events_by_type || {})[k] || 0) > 0).length : '—'}
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginTop: '16px' }}>
              {['pageview', 'pixel_fired', 'ga4_fired', 'gtm_fired'].filter(t => ((liveStats?.today_events_by_type || {})[t] || 0) > 0).map(t => {
                const eventsByType = liveStats?.today_events_by_type || {};
                const total = Object.values(eventsByType).reduce((a, b) => a + b, 0) || 1;
                const pct = Math.round((eventsByType[t] / total) * 100);
                return (
                  <span key={t} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#334155', fontWeight: '600' }}>
                    <span style={{ width: '10px', height: '10px', borderRadius: '3px', backgroundColor: LIVE_EVENT_COLORS[t] }}></span>
                    {LIVE_EVENT_LABELS[t]} <span style={{ color: '#0F172A', fontWeight: '800' }}>{pct}%</span>
                  </span>
                );
              })}
            </div>
          </div>

          <LiveTrackingPieChart eventsByType={liveStats?.today_events_by_type || {}} />
        </div>
      </div>
    </div>
  );


  // --- OTHER CMS TABS (MOCKED) ---
  const renderHomeControl = () => (
    <div className="admin-panel-section">
      <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#0F172A', marginBottom: '24px' }}>Home Page CMS</h2>
      
      <div style={{ backgroundColor: '#FFFFFF', padding: '32px', borderRadius: '16px', border: '1px solid #E2E8F0', marginBottom: '24px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '20px', color: 'var(--color-primary)' }}>Hero Section Slider</h3>
        <div style={{ display: 'grid', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '700', marginBottom: '8px', color: '#334155' }}>Slider Heading</label>
            <input type="text" defaultValue="Premium Home Improvements in Liverpool" style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '15px' }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '700', marginBottom: '8px', color: '#334155' }}>Slider Background Image</label>
            <div style={{ border: '1px dashed #CBD5E1', padding: '20px', borderRadius: '8px', textAlign: 'center', backgroundColor: '#F8FAFC' }}>
              <input type="file" accept="image/*" style={{ display: 'none' }} id="hero-image-upload" />
              <label htmlFor="hero-image-upload" style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                <ImageIcon size={24} color="#64748B" />
                <span style={{ fontSize: '14px', color: '#64748B', fontWeight: '600' }}>Click to upload new image</span>
                <span style={{ fontSize: '12px', color: '#94A3B8' }}>PNG, JPG up to 5MB</span>
              </label>
            </div>
          </div>
        </div>
        <button onClick={handleSave} style={{ marginTop: '24px', padding: '12px 24px', backgroundColor: 'var(--color-secondary)', color: '#FFF', borderRadius: '8px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '700' }}>
          <Save size={18} /> Update Hero Section
        </button>
      </div>

      <div style={{ backgroundColor: '#FFFFFF', padding: '32px', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--color-primary)' }}>FAQ Section</h3>
          <button style={{ padding: '10px 20px', backgroundColor: 'var(--color-primary)', color: '#FFF', borderRadius: '8px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', fontWeight: '700' }}>
            <Plus size={18} /> Add New FAQ
          </button>
        </div>
        
        <div style={{ border: '1px solid #E2E8F0', borderRadius: '8px', overflow: 'hidden' }}>
          <div style={{ padding: '16px 20px', backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ margin: '0 0 4px 0', fontSize: '14px', fontWeight: '700', color: '#0F172A' }}>Q: Do you provide free quotes?</p>
              <p style={{ margin: 0, fontSize: '13px', color: '#64748B' }}>A: Yes, all our initial quotes and property visits are completely free...</p>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button style={{ background: 'var(--color-primary-light)', padding: '6px 10px', borderRadius: '6px', border: 'none', color: 'var(--color-primary)', cursor: 'pointer', fontWeight: '600', fontSize: '12px' }}>Edit</button>
              <button style={{ background: '#FEE2E2', padding: '6px 10px', borderRadius: '6px', border: 'none', color: '#EF4444', cursor: 'pointer', fontWeight: '600', fontSize: '12px' }}>Delete</button>
            </div>
          </div>
          <div style={{ padding: '16px 20px', backgroundColor: '#FFFFFF', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ margin: '0 0 4px 0', fontSize: '14px', fontWeight: '700', color: '#0F172A' }}>Q: How long does a standard painting job take?</p>
              <p style={{ margin: 0, fontSize: '13px', color: '#64748B' }}>A: A typical room takes about 2 days including prep work and drying time...</p>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button style={{ background: 'var(--color-primary-light)', padding: '6px 10px', borderRadius: '6px', border: 'none', color: 'var(--color-primary)', cursor: 'pointer', fontWeight: '600', fontSize: '12px' }}>Edit</button>
              <button style={{ background: '#FEE2E2', padding: '6px 10px', borderRadius: '6px', border: 'none', color: '#EF4444', cursor: 'pointer', fontWeight: '600', fontSize: '12px' }}>Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAboutControl = () => (
    <div className="admin-panel-section">
      <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#0F172A', marginBottom: '24px' }}>About Us CMS</h2>
      
      <div style={{ backgroundColor: '#FFFFFF', padding: '32px', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
        <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '20px', color: 'var(--color-primary)' }}>"How We Deliver" Section</h3>
        <textarea rows={6} defaultValue="SK Home Solutions provides..." style={{ width: '100%', padding: '16px', borderRadius: '8px', border: '1px solid #CBD5E1', resize: 'vertical', fontSize: '15px' }}></textarea>
        <button onClick={handleSave} style={{ marginTop: '24px', padding: '12px 24px', backgroundColor: 'var(--color-secondary)', color: '#FFF', borderRadius: '8px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '700' }}>
          <Save size={18} /> Update Content
        </button>
      </div>
    </div>
  );

  const renderServicesControl = () => (
    <div className="admin-panel-section">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#0F172A' }}>Services Management</h2>
        <button style={{ padding: '10px 20px', backgroundColor: 'var(--color-secondary)', color: '#FFF', borderRadius: '8px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '700' }}>
          <Plus size={18} /> Add New Service
        </button>
      </div>
      
      <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
              <th style={{ padding: '20px 24px', fontSize: '13px', color: '#64748B', fontWeight: '700', textTransform: 'uppercase' }}>Image</th>
              <th style={{ padding: '20px 24px', fontSize: '13px', color: '#64748B', fontWeight: '700', textTransform: 'uppercase' }}>Service Title</th>
              <th style={{ padding: '20px 24px', fontSize: '13px', color: '#64748B', fontWeight: '700', textTransform: 'uppercase' }}>Category</th>
              <th style={{ padding: '20px 24px', fontSize: '13px', color: '#64748B', fontWeight: '700', textTransform: 'uppercase', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
              <td style={{ padding: '20px 24px' }}><div style={{ width: '70px', height: '46px', backgroundColor: '#E2E8F0', borderRadius: '6px' }}></div></td>
              <td style={{ padding: '20px 24px', fontWeight: '700', fontSize: '15px', color: '#0F172A' }}>Painting & Decorating</td>
              <td style={{ padding: '20px 24px', fontSize: '14px', color: '#64748B' }}>Painting</td>
              <td style={{ padding: '20px 24px', textAlign: 'right' }}>
                <button style={{ background: 'var(--color-primary-light)', padding: '8px 12px', borderRadius: '6px', border: 'none', color: 'var(--color-primary)', cursor: 'pointer', marginRight: '12px', fontWeight: '600' }}>Edit</button>
                <button style={{ background: '#FEE2E2', padding: '8px 12px', borderRadius: '6px', border: 'none', color: '#EF4444', cursor: 'pointer', fontWeight: '600' }}>Delete</button>
              </td>
            </tr>
            <tr>
              <td style={{ padding: '20px 24px' }}><div style={{ width: '70px', height: '46px', backgroundColor: '#E2E8F0', borderRadius: '6px' }}></div></td>
              <td style={{ padding: '20px 24px', fontWeight: '700', fontSize: '15px', color: '#0F172A' }}>Carpentry & Joinery</td>
              <td style={{ padding: '20px 24px', fontSize: '14px', color: '#64748B' }}>Carpentry</td>
              <td style={{ padding: '20px 24px', textAlign: 'right' }}>
                <button style={{ background: 'var(--color-primary-light)', padding: '8px 12px', borderRadius: '6px', border: 'none', color: 'var(--color-primary)', cursor: 'pointer', marginRight: '12px', fontWeight: '600' }}>Edit</button>
                <button style={{ background: '#FEE2E2', padding: '8px 12px', borderRadius: '6px', border: 'none', color: '#EF4444', cursor: 'pointer', fontWeight: '600' }}>Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderGalleryControl = () => (
    <div className="admin-panel-section">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#0F172A' }}>Gallery Management</h2>
        <button style={{ padding: '10px 20px', backgroundColor: 'var(--color-primary)', color: '#FFF', borderRadius: '8px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '700' }}>
          <Plus size={18} /> Upload Image
        </button>
      </div>
      <p style={{ color: '#64748B', fontSize: '15px', padding: '30px', backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0', textAlign: 'center' }}>Gallery grid CMS will appear here.</p>
    </div>
  );

  const renderCareersControl = () => (
    <div className="admin-panel-section">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#0F172A', margin: 0 }}>Careers (Job Posts)</h2>
        <button
          onClick={openAddJobModal}
          style={{ padding: '10px 20px', backgroundColor: 'var(--color-secondary)', color: '#FFF', borderRadius: '8px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '700' }}
        >
          <Plus size={18} /> Add Job Post
        </button>
      </div>
      
      {jobPosts.length === 0 ? (
        <div style={{ backgroundColor: '#FEF2F2', padding: '40px', borderRadius: '16px', border: '1px dashed #FCA5A5', textAlign: 'center', color: '#EF4444' }}>
          <Briefcase size={48} style={{ margin: '0 auto 16px auto', opacity: 0.5 }} />
          <p style={{ fontWeight: '800', fontSize: '20px' }}>No Job Posts Available</p>
          <p style={{ fontSize: '15px', marginTop: '8px', color: '#B91C1C' }}>Currently there are no active job openings. The frontend will display "No jobs available".</p>
        </div>
      ) : (
        <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #E2E8F0', backgroundColor: '#F8FAFC' }}>
                <th style={{ padding: '16px 24px', fontSize: '13px', fontWeight: '700', color: '#64748B' }}>Job Title</th>
                <th style={{ padding: '16px 24px', fontSize: '13px', fontWeight: '700', color: '#64748B' }}>Type</th>
                <th style={{ padding: '16px 24px', fontSize: '13px', fontWeight: '700', color: '#64748B' }}>Location</th>
                <th style={{ padding: '16px 24px', fontSize: '13px', fontWeight: '700', color: '#64748B' }}>Rate</th>
                <th style={{ padding: '16px 24px', fontSize: '13px', fontWeight: '700', color: '#64748B' }}>Status</th>
                <th style={{ padding: '16px 24px', fontSize: '13px', fontWeight: '700', color: '#64748B', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobPosts.map(job => (
                <tr key={job.id} style={{ borderBottom: '1px solid #E2E8F0', transition: 'background-color 0.2s' }}>
                  <td style={{ padding: '16px 24px', fontSize: '14px', fontWeight: '700', color: '#0F172A' }}>{job.title}</td>
                  <td style={{ padding: '16px 24px', fontSize: '13px', color: '#475569' }}>{job.type}</td>
                  <td style={{ padding: '16px 24px', fontSize: '13px', color: '#475569' }}>{job.location}</td>
                  <td style={{ padding: '16px 24px', fontSize: '13px', color: '#475569' }}>{job.rate}</td>
                  <td style={{ padding: '16px 24px' }}>
                    <span style={{
                      fontSize: '11px',
                      padding: '4px 8px',
                      borderRadius: '12px',
                      fontWeight: '700',
                      backgroundColor: job.status === 'Active' ? '#F0FDF4' : '#F1F5F9',
                      color: job.status === 'Active' ? '#22C55E' : '#64748B'
                    }}>
                      {job.status}
                    </span>
                  </td>
                  <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                      <button
                        onClick={() => toggleJobStatus(job.id)}
                        title="Toggle Status"
                        style={{ padding: '6px', border: '1px solid #E2E8F0', borderRadius: '6px', backgroundColor: '#FFFFFF', cursor: 'pointer', color: '#475569' }}
                      >
                        <Power size={14} />
                      </button>
                      <button
                        onClick={() => openEditJobModal(job)}
                        title="Edit Job"
                        style={{ padding: '6px', border: '1px solid #E2E8F0', borderRadius: '6px', backgroundColor: '#FFFFFF', cursor: 'pointer', color: '#3B82F6' }}
                      >
                        <Edit size={14} />
                      </button>
                      <button
                        onClick={() => deleteJob(job.id)}
                        title="Delete Job"
                        style={{ padding: '6px', border: '1px solid #E2E8F0', borderRadius: '6px', backgroundColor: '#FFFFFF', cursor: 'pointer', color: '#EF4444' }}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );

    const renderReviewsControl = () => {
    const starColor = 'var(--color-secondary)';
    return (
      <div className="admin-panel-section">
        <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#0F172A', marginBottom: '24px' }}>Reviews Moderation & CMS</h2>
        
        {reviews.length === 0 ? (
          <div style={{ backgroundColor: '#F8FAFC', padding: '40px', borderRadius: '16px', border: '1px dashed #CBD5E1', textAlign: 'center', color: '#64748B' }}>
            <Star size={48} style={{ margin: '0 auto 16px auto', opacity: 0.5 }} />
            <p style={{ fontWeight: '800', fontSize: '20px' }}>No Reviews Submitted</p>
            <p style={{ fontSize: '15px', marginTop: '8px' }}>Submitted customer reviews will appear here for moderation.</p>
          </div>
        ) : (
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #E2E8F0', backgroundColor: '#F8FAFC' }}>
                  <th style={{ padding: '16px 24px', fontSize: '13px', fontWeight: '700', color: '#64748B' }}>Client</th>
                  <th style={{ padding: '16px 24px', fontSize: '13px', fontWeight: '700', color: '#64748B' }}>Service / Project</th>
                  <th style={{ padding: '16px 24px', fontSize: '13px', fontWeight: '700', color: '#64748B' }}>Rating</th>
                  <th style={{ padding: '16px 24px', fontSize: '13px', fontWeight: '700', color: '#64748B' }}>Review Comment</th>
                  <th style={{ padding: '16px 24px', fontSize: '13px', fontWeight: '700', color: '#64748B' }}>Status</th>
                  <th style={{ padding: '16px 24px', fontSize: '13px', fontWeight: '700', color: '#64748B', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {reviews.map(rev => (
                  <tr key={rev.id} style={{ borderBottom: '1px solid #E2E8F0', transition: 'background-color 0.2s' }}>
                    <td style={{ padding: '16px 24px', fontSize: '14px', fontWeight: '700', color: '#0F172A' }}>
                      {rev.name}
                      <span style={{ display: 'block', fontSize: '11px', fontWeight: '400', color: '#64748B', marginTop: '4px' }}>{rev.location || 'N/A'}</span>
                    </td>
                    <td style={{ padding: '16px 24px', fontSize: '13px', color: '#475569' }}>{rev.service || 'N/A'}</td>
                    <td style={{ padding: '16px 24px' }}>
                      <div style={{ display: 'flex', gap: '2px' }}>
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={14} fill={i < rev.rating ? starColor : 'none'} stroke={i < rev.rating ? starColor : '#CBD5E1'} />
                        ))}
                      </div>
                    </td>
                    <td style={{ padding: '16px 24px', fontSize: '13px', color: '#334155', maxWidth: '350px', whiteSpace: 'normal', wordBreak: 'break-word', lineHeight: '1.5' }}>
                      {rev.comment}
                    </td>
                    <td style={{ padding: '16px 24px' }}>
                      <span style={{
                        fontSize: '11px',
                        padding: '4px 8px',
                        borderRadius: '12px',
                        fontWeight: '700',
                        backgroundColor: rev.status === 'Approved' ? '#F0FDF4' : (rev.status === 'Pending' ? '#FFFBEB' : '#FEF2F2'),
                        color: rev.status === 'Approved' ? '#22C55E' : (rev.status === 'Pending' ? '#D97706' : '#EF4444')
                      }}>
                        {rev.status}
                      </span>
                    </td>
                    <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                        {rev.status !== 'Approved' && (
                          <button
                            onClick={() => approveReview(rev.id)}
                            title="Approve Review"
                            style={{ padding: '6px 12px', border: '1px solid #BBF7D0', borderRadius: '6px', backgroundColor: '#F0FDF4', color: '#166534', cursor: 'pointer', fontSize: '12px', fontWeight: '700' }}
                          >
                            Approve
                          </button>
                        )}
                        {rev.status !== 'Rejected' && (
                          <button
                            onClick={() => rejectReview(rev.id)}
                            title="Reject Review"
                            style={{ padding: '6px 12px', border: '1px solid #FEE2E2', borderRadius: '6px', backgroundColor: '#FEF2F2', color: '#991B1B', cursor: 'pointer', fontSize: '12px', fontWeight: '700' }}
                          >
                            Reject
                          </button>
                        )}
                        <button
                          onClick={() => deleteReview(rev.id)}
                          title="Delete Review"
                          style={{ padding: '6px', border: '1px solid #E2E8F0', borderRadius: '6px', backgroundColor: '#FFFFFF', cursor: 'pointer', color: '#EF4444' }}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  };


  const renderGlobalSettings = () => (
    <div className="admin-panel-section">
      <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#0F172A', marginBottom: '24px' }}>Global Settings</h2>
      
      <form onSubmit={handleSettingsSubmit} style={{ backgroundColor: '#FFFFFF', padding: '40px', borderRadius: '16px', border: '1px solid #E2E8F0', display: 'grid', gap: '24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '700', marginBottom: '8px', color: '#334155' }}>Contact Number</label>
            <input type="text" value={settingsForm.data.phone} onChange={e => settingsForm.setData('phone', e.target.value)} required style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '15px' }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '700', marginBottom: '8px', color: '#334155' }}>WhatsApp Number</label>
            <input type="text" value={settingsForm.data.whatsapp} onChange={e => settingsForm.setData('whatsapp', e.target.value)} required style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '15px' }} />
          </div>
        </div>
        
        <div>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: '700', marginBottom: '8px', color: '#334155' }}>Email Address</label>
          <input type="email" value={settingsForm.data.email} onChange={e => settingsForm.setData('email', e.target.value)} required style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '15px' }} />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: '700', marginBottom: '8px', color: '#334155' }}>Location / Service Area</label>
          <input type="text" value={settingsForm.data.location} onChange={e => settingsForm.setData('location', e.target.value)} required style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '15px' }} />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: '700', marginBottom: '8px', color: '#334155' }}>Footer Description Text</label>
          <textarea value={settingsForm.data.footer_text} onChange={e => settingsForm.setData('footer_text', e.target.value)} rows="3" style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '15px', resize: 'vertical' }} placeholder="Built on Trust..."></textarea>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: '700', marginBottom: '8px', color: '#334155' }}>Full Address (For Contact/Footer)</label>
          <textarea value={settingsForm.data.address} onChange={e => settingsForm.setData('address', e.target.value)} rows="3" style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '15px', resize: 'vertical' }} placeholder="21 Alexander Road..."></textarea>
        </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '700', marginBottom: '8px', color: '#334155' }}>Facebook Link</label>
            <input type="url" value={settingsForm.data.facebook} onChange={e => settingsForm.setData('facebook', e.target.value)} style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '15px' }} placeholder="https://facebook.com/..." />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '700', marginBottom: '8px', color: '#334155' }}>YouTube Link</label>
            <input type="url" value={settingsForm.data.youtube} onChange={e => settingsForm.setData('youtube', e.target.value)} style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '15px' }} placeholder="https://youtube.com/..." />
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '700', marginBottom: '8px', color: '#334155' }}>Instagram Link</label>
            <input type="url" value={settingsForm.data.instagram} onChange={e => settingsForm.setData('instagram', e.target.value)} style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '15px' }} placeholder="https://instagram.com/..." />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '700', marginBottom: '8px', color: '#334155' }}>X (Twitter) Link</label>
            <input type="url" value={settingsForm.data.twitter} onChange={e => settingsForm.setData('twitter', e.target.value)} style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '15px' }} placeholder="https://x.com/..." />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '700', marginBottom: '8px', color: '#334155' }}>LinkedIn Link</label>
            <input type="url" value={settingsForm.data.linkedin} onChange={e => settingsForm.setData('linkedin', e.target.value)} style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '15px' }} placeholder="https://linkedin.com/in/..." />
          </div>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: '700', marginBottom: '8px', color: '#334155' }}>Main Logo</label>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            {settings.logo && (
              <img src={settings.logo} alt="Current Logo" style={{ height: '48px', objectFit: 'contain', backgroundColor: '#0F172A', padding: '8px', borderRadius: '8px' }} />
            )}
            <div style={{ flex: 1, border: '1px dashed #CBD5E1', padding: '16px', borderRadius: '8px', textAlign: 'center', backgroundColor: '#F8FAFC' }}>
              <input type="file" accept="image/*" onChange={e => settingsForm.setData('logo', e.target.files[0])} id="main-logo-upload" style={{ display: 'none' }} />
              <label htmlFor="main-logo-upload" style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#64748B' }}>
                <ImageIcon size={24} style={{ marginBottom: '8px' }} />
                <span style={{ fontSize: '13px', fontWeight: '600' }}>{settingsForm.data.logo ? settingsForm.data.logo.name : 'Click to upload new logo (PNG, SVG)'}</span>
              </label>
            </div>
          </div>
        </div>

        
        <div>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: '700', marginBottom: '8px', color: '#334155' }}>Site Favicon</label>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <div onClick={() => document.getElementById('favicon-upload').click()} style={{ width: '80px', height: '80px', border: '2px dashed #CBD5E1', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', backgroundColor: '#F8FAFC', overflow: 'hidden' }}>
              {faviconPreview ? (
                <img src={faviconPreview} alt="Favicon preview" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              ) : (
                <div style={{ color: '#94A3B8', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <ImageIcon size={20} />
                  <span style={{ fontSize: '11px', marginTop: '4px' }}>Favicon</span>
                </div>
              )}
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: '13px', color: '#64748B', marginBottom: '12px' }}>Upload your site favicon (ideal size: 32x32 or 64x64 pixels, PNG or ICO format).</p>
              <button type="button" onClick={() => document.getElementById('favicon-upload').click()} style={{ padding: '8px 16px', backgroundColor: '#F1F5F9', color: '#475569', border: 'none', borderRadius: '8px', fontWeight: '700', fontSize: '13px', cursor: 'pointer' }}>Choose File</button>
            </div>
          </div>
          <input type="file" id="favicon-upload" accept="image/png, image/x-icon, image/jpeg" style={{ display: 'none' }} onChange={e => {
            const file = e.target.files[0];
            if (file) {
              settingsForm.setData('site_favicon', file);
              setFaviconPreview(URL.createObjectURL(file));
            }
          }} />
        </div>



        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
          <button type="submit" disabled={settingsForm.processing} style={{ padding: '12px 24px', backgroundColor: 'var(--color-primary)', color: '#FFF', borderRadius: '8px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '700', fontSize: '15px' }}>
            <Save size={18} /> {settingsForm.processing ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </form>
    </div>
  );

  const renderPaymentSettings = () => {
    const labelStyle = { display: 'block', fontSize: '14px', fontWeight: '700', marginBottom: '8px', color: '#334155' };
    const inputStyle = { width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '15px' };
    const hintStyle = { fontSize: '12px', color: '#94A3B8', marginTop: '6px' };
    const errorStyle = { color: '#EF4444', fontSize: '12px', marginTop: '4px', fontWeight: '600' };

    const secretField = (field, label, placeholder = '') => (
      <div>
        <label style={labelStyle}>{label}</label>
        <div style={{ position: 'relative' }}>
          <input
            type={showSecrets[field] ? 'text' : 'password'}
            value={paymentSettingsForm.data[field]}
            onChange={e => paymentSettingsForm.setData(field, e.target.value)}
            style={{ ...inputStyle, paddingRight: '44px' }}
            placeholder={settings[`${field}_set`] ? '•••••••• (saved)' : placeholder}
          />
          <button
            type="button"
            onClick={() => toggleShowSecret(field)}
            style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8', padding: '4px' }}
            title={showSecrets[field] ? 'Hide' : 'Show'}
          >
            {showSecrets[field] ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
        {settings[`${field}_set`] && (
          <p style={hintStyle}>Already saved — leave blank to keep unchanged.</p>
        )}
        {paymentSettingsForm.errors[field] && <div style={errorStyle}>{paymentSettingsForm.errors[field]}</div>}
      </div>
    );

    const toggleRow = (field, label) => (
      <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '14px', fontWeight: '700', color: '#334155' }}>
        <input
          type="checkbox"
          checked={paymentSettingsForm.data[field]}
          onChange={e => paymentSettingsForm.setData(field, e.target.checked)}
          style={{ width: '18px', height: '18px', cursor: 'pointer' }}
        />
        {label}
      </label>
    );

    return (
      <div className="admin-panel-section" style={{ animation: 'fadeIn 0.3s ease-out' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#0F172A', marginBottom: '8px' }}>Payment Accounts</h2>
        <p style={{ color: '#64748B', fontSize: '14px', marginBottom: '20px' }}>Configure payment account details used across the site.</p>

        <div style={{ backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '16px 20px', marginBottom: '24px', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
          <CreditCard size={18} style={{ color: '#64748B', marginTop: '2px', flexShrink: 0 }} />
          <p style={{ fontSize: '13px', color: '#64748B', lineHeight: '1.5', margin: 0 }}>
            These credentials configure payment account details for bKash and SSLCommerz. Connect them to your checkout flow separately when ready.
          </p>
        </div>

        <form onSubmit={handlePaymentSettingsSubmit} style={{ display: 'grid', gap: '24px' }}>
          <div style={{ backgroundColor: '#FFFFFF', padding: '32px', borderRadius: '16px', border: '1px solid #E2E8F0', borderTop: '4px solid #E2136E', display: 'grid', gap: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#0F172A' }}>bKash</h3>
              {toggleRow('bkash_enabled', 'Enabled')}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div>
                <label style={labelStyle}>Mode</label>
                <select value={paymentSettingsForm.data.bkash_mode} onChange={e => paymentSettingsForm.setData('bkash_mode', e.target.value)} style={inputStyle}>
                  <option value="sandbox">Sandbox</option>
                  <option value="live">Live</option>
                </select>
              </div>
              <div>
                <label style={labelStyle}>Merchant Number</label>
                <input type="text" value={paymentSettingsForm.data.bkash_merchant_number} onChange={e => paymentSettingsForm.setData('bkash_merchant_number', e.target.value)} style={inputStyle} placeholder="01XXXXXXXXX" />
                {paymentSettingsForm.errors.bkash_merchant_number && <div style={errorStyle}>{paymentSettingsForm.errors.bkash_merchant_number}</div>}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              {secretField('bkash_app_key', 'App Key')}
              {secretField('bkash_app_secret', 'App Secret')}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div>
                <label style={labelStyle}>Username</label>
                <input type="text" value={paymentSettingsForm.data.bkash_username} onChange={e => paymentSettingsForm.setData('bkash_username', e.target.value)} style={inputStyle} />
                {paymentSettingsForm.errors.bkash_username && <div style={errorStyle}>{paymentSettingsForm.errors.bkash_username}</div>}
              </div>
              {secretField('bkash_password', 'Password')}
            </div>
          </div>

          <div style={{ backgroundColor: '#FFFFFF', padding: '32px', borderRadius: '16px', border: '1px solid #E2E8F0', borderTop: '4px solid #0F172A', display: 'grid', gap: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#0F172A' }}>SSLCommerz</h3>
              {toggleRow('sslcommerz_enabled', 'Enabled')}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div>
                <label style={labelStyle}>Mode</label>
                <select value={paymentSettingsForm.data.sslcommerz_mode} onChange={e => paymentSettingsForm.setData('sslcommerz_mode', e.target.value)} style={inputStyle}>
                  <option value="sandbox">Sandbox</option>
                  <option value="live">Live</option>
                </select>
              </div>
              <div>
                <label style={labelStyle}>Store ID</label>
                <input type="text" value={paymentSettingsForm.data.sslcommerz_store_id} onChange={e => paymentSettingsForm.setData('sslcommerz_store_id', e.target.value)} style={inputStyle} />
                {paymentSettingsForm.errors.sslcommerz_store_id && <div style={errorStyle}>{paymentSettingsForm.errors.sslcommerz_store_id}</div>}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              {secretField('sslcommerz_store_password', 'Store Password')}
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button type="submit" disabled={paymentSettingsForm.processing} style={{ padding: '12px 24px', backgroundColor: 'var(--color-primary)', color: '#FFF', borderRadius: '8px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '700', fontSize: '15px' }}>
              <Save size={18} /> {paymentSettingsForm.processing ? 'Saving...' : 'Save Payment Settings'}
            </button>
          </div>
        </form>
      </div>
    );
  };

  const paymentAccountTypeLabels = { bank: 'Bank Transfer', bkash: 'bKash', nagad: 'Nagad', paypal: 'PayPal', other: 'Other' };

  const renderPaymentAccountsPage = () => {
    return (
      <div style={{ animation: 'fadeIn 0.3s ease-out' }}>
        <PageHeader
          eyebrow="SETTINGS & SYSTEM"
          title="Payment Receiving Accounts"
          subtitle="These accounts are shown to customers on the public 'Make a Payment' page, linked from the homepage banner."
          action={
            <button onClick={openAddPaymentAccountModal} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', background: 'linear-gradient(135deg, var(--color-secondary) 0%, #EC4899 100%)', color: '#FFF', border: 'none', borderRadius: '10px', fontWeight: '700', fontSize: '14px', cursor: 'pointer' }}>
              <Plus size={18} /> Add Account
            </button>
          }
        />

        <div style={{ padding: '14px 18px', backgroundColor: '#EFF6FF', border: '1px solid #DBEAFE', borderRadius: '12px', marginBottom: '20px', fontSize: '13px', color: '#1D4ED8' }}>
          Public page: <a href="/payment-info" target="_blank" rel="noreferrer" style={{ color: '#1D4ED8', fontWeight: '700' }}>skhomesolutions.test/payment-info</a>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
          {paymentAccounts.length === 0 ? (
            <div style={{ gridColumn: '1 / -1', padding: '40px', textAlign: 'center', color: '#94A3B8', backgroundColor: '#FFF', borderRadius: '14px', border: '1px solid #E2E8F0' }}>
              No payment accounts yet. Add your bank, bKash, or other receiving accounts so customers can pay you.
            </div>
          ) : paymentAccounts.map(account => (
            <div key={account.id} style={{ padding: '20px', backgroundColor: '#FFFFFF', borderRadius: '14px', border: '1px solid #E2E8F0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                <div>
                  <span style={{ fontSize: '10px', padding: '2px 8px', borderRadius: '10px', fontWeight: '700', backgroundColor: '#F1F5F9', color: '#64748B' }}>
                    {paymentAccountTypeLabels[account.type] || account.type}
                  </span>
                  <div style={{ fontSize: '15px', fontWeight: '800', color: '#0F172A', marginTop: '6px' }}>{account.label}</div>
                </div>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <button onClick={() => openEditPaymentAccountModal(account)} style={{ padding: '6px', backgroundColor: '#F1F5F9', color: '#3B82F6', border: 'none', borderRadius: '6px', cursor: 'pointer' }}><Edit2 size={14} /></button>
                  <button onClick={() => deletePaymentAccount(account.id)} style={{ padding: '6px', backgroundColor: '#FEF2F2', color: '#EF4444', border: 'none', borderRadius: '6px', cursor: 'pointer' }}><Trash2 size={14} /></button>
                </div>
              </div>
              <div style={{ fontSize: '13px', color: '#64748B', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {account.account_name && <div><strong style={{ color: '#334155' }}>Name:</strong> {account.account_name}</div>}
                {account.account_number && <div><strong style={{ color: '#334155' }}>No:</strong> {account.account_number}</div>}
                {account.bank_name && <div><strong style={{ color: '#334155' }}>Bank:</strong> {account.bank_name}</div>}
              </div>
              <span style={{ display: 'inline-block', marginTop: '12px', fontSize: '10px', padding: '2px 8px', borderRadius: '10px', fontWeight: '700', backgroundColor: account.status === 'Active' ? '#F0FDF4' : '#F1F5F9', color: account.status === 'Active' ? '#22C55E' : '#64748B' }}>
                {account.status}
              </span>
            </div>
          ))}
        </div>

        {isPaymentAccountModalOpen && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '20px' }}>
            <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', width: '100%', maxWidth: '560px', overflow: 'hidden', display: 'flex', flexDirection: 'column', maxHeight: '90vh' }}>
              <div style={{ padding: '20px 24px', borderBottom: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '800', color: '#0F172A' }}>{editingPaymentAccount ? 'Edit Payment Account' : 'Add Payment Account'}</h3>
                <button onClick={() => setIsPaymentAccountModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748B' }}><X size={20} /></button>
              </div>
              <form onSubmit={handlePaymentAccountSubmit} style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
                <div style={{ padding: '24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>Label *</label>
                      <input type="text" required placeholder="e.g. Barclays Business Account" value={paymentAccountForm.data.label} onChange={(e) => paymentAccountForm.setData('label', e.target.value)}
                        style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '14px', outline: 'none' }} />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>Type</label>
                      <select value={paymentAccountForm.data.type} onChange={(e) => paymentAccountForm.setData('type', e.target.value)}
                        style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '14px', outline: 'none', backgroundColor: '#FFF' }}>
                        <option value="bank">Bank Transfer</option>
                        <option value="bkash">bKash</option>
                        <option value="nagad">Nagad</option>
                        <option value="paypal">PayPal</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>Account Name</label>
                      <input type="text" value={paymentAccountForm.data.account_name} onChange={(e) => paymentAccountForm.setData('account_name', e.target.value)}
                        style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '14px', outline: 'none' }} />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>Account Number</label>
                      <input type="text" value={paymentAccountForm.data.account_number} onChange={(e) => paymentAccountForm.setData('account_number', e.target.value)}
                        style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '14px', outline: 'none' }} />
                    </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>Bank Name</label>
                      <input type="text" value={paymentAccountForm.data.bank_name} onChange={(e) => paymentAccountForm.setData('bank_name', e.target.value)}
                        style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '14px', outline: 'none' }} />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>Sort Code</label>
                      <input type="text" value={paymentAccountForm.data.sort_code} onChange={(e) => paymentAccountForm.setData('sort_code', e.target.value)}
                        style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '14px', outline: 'none' }} />
                    </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>IBAN</label>
                      <input type="text" value={paymentAccountForm.data.iban} onChange={(e) => paymentAccountForm.setData('iban', e.target.value)}
                        style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '14px', outline: 'none' }} />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>SWIFT / BIC</label>
                      <input type="text" value={paymentAccountForm.data.swift_code} onChange={(e) => paymentAccountForm.setData('swift_code', e.target.value)}
                        style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '14px', outline: 'none' }} />
                    </div>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>Instructions (shown to customers)</label>
                    <textarea rows={3} value={paymentAccountForm.data.instructions} onChange={(e) => paymentAccountForm.setData('instructions', e.target.value)}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '14px', outline: 'none', resize: 'vertical', fontFamily: 'inherit' }} />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>Display Order</label>
                      <input type="number" value={paymentAccountForm.data.order} onChange={(e) => paymentAccountForm.setData('order', e.target.value)}
                        style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '14px', outline: 'none' }} />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>Status</label>
                      <select value={paymentAccountForm.data.status} onChange={(e) => paymentAccountForm.setData('status', e.target.value)}
                        style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '14px', outline: 'none', backgroundColor: '#FFF' }}>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div style={{ padding: '16px 24px', borderTop: '1px solid #E2E8F0', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                  <button type="button" onClick={() => setIsPaymentAccountModalOpen(false)} style={{ padding: '10px 20px', backgroundColor: '#F1F5F9', color: '#475569', border: 'none', borderRadius: '8px', fontWeight: '700', fontSize: '14px', cursor: 'pointer' }}>Cancel</button>
                  <button type="submit" disabled={paymentAccountForm.processing} style={{ padding: '10px 20px', backgroundColor: 'var(--color-primary)', color: '#FFF', border: 'none', borderRadius: '8px', fontWeight: '700', fontSize: '14px', cursor: 'pointer' }}>
                    {paymentAccountForm.processing ? 'Saving...' : 'Save Account'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderTrackingSettings = () => {
    const toggleStyle = (checked) => ({
      width: '44px',
      height: '24px',
      borderRadius: '12px',
      backgroundColor: checked ? 'var(--color-primary)' : '#CBD5E1',
      position: 'relative',
      cursor: 'pointer',
      transition: 'background-color 0.2s ease',
      flexShrink: 0
    });
    const knobStyle = (checked) => ({
      position: 'absolute',
      top: '2px',
      left: checked ? '22px' : '2px',
      width: '20px',
      height: '20px',
      borderRadius: '50%',
      backgroundColor: '#FFFFFF',
      boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
      transition: 'left 0.2s ease'
    });

    const Toggle = ({ checked, onChange, label, hint }) => (
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px', padding: '16px 0', borderBottom: '1px solid #F1F5F9' }}>
        <div>
          <p style={{ fontSize: '14px', fontWeight: '700', color: '#334155', margin: '0 0 4px 0' }}>{label}</p>
          {hint && <p style={{ fontSize: '12px', color: '#94A3B8', margin: 0 }}>{hint}</p>}
        </div>
        <div style={toggleStyle(checked)} onClick={() => onChange(!checked)}>
          <div style={knobStyle(checked)}></div>
        </div>
      </div>
    );

    const relativeTime = (dateStr) => {
      const diffMs = Date.now() - new Date(dateStr).getTime();
      const diffSec = Math.max(0, Math.floor(diffMs / 1000));
      if (diffSec < 60) return `${diffSec}s ago`;
      const diffMin = Math.floor(diffSec / 60);
      if (diffMin < 60) return `${diffMin}m ago`;
      const diffHr = Math.floor(diffMin / 60);
      if (diffHr < 24) return `${diffHr}h ago`;
      return `${Math.floor(diffHr / 24)}d ago`;
    };

    const eventBadge = (type) => {
      const map = {
        pageview: { bg: '#F1F5F9', color: '#334155', label: 'Pageview' },
        pixel_fired: { bg: '#E7F0FE', color: '#1877F2', label: 'Meta Pixel' },
        ga4_fired: { bg: '#FDEEDB', color: '#E37400', label: 'GA4' },
        gtm_fired: { bg: '#F1E9FB', color: '#7C3AED', label: 'GTM' }
      };
      const cfg = map[type] || { bg: '#F1F5F9', color: '#64748B', label: type };
      return (
        <span style={{ display: 'inline-block', padding: '3px 10px', borderRadius: '999px', backgroundColor: cfg.bg, color: cfg.color, fontSize: '11px', fontWeight: '700', whiteSpace: 'nowrap' }}>
          {cfg.label}
        </span>
      );
    };

    const eventsByType = liveStats?.today_events_by_type || {};
    const activeTrackers = ['pixel_fired', 'ga4_fired', 'gtm_fired'].filter(k => (eventsByType[k] || 0) > 0).length;

    const StatCard = ({ label, value, icon, live }) => (
      <div style={{ backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '20px', flex: '1 1 200px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span style={{ fontSize: '12px', fontWeight: '700', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.03em' }}>{label}</span>
          {live ? (
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10B981', boxShadow: '0 0 0 rgba(16,185,129,0.4)', animation: 'pulse 1.5s infinite' }}></span>
          ) : icon}
        </div>
        <p style={{ fontSize: '28px', fontWeight: '800', color: '#0F172A', margin: 0 }}>{value}</p>
      </div>
    );

    return (
      <div className="admin-panel-section">
        <style>{`@keyframes pulse { 0% { box-shadow: 0 0 0 0 rgba(16,185,129,0.5); } 70% { box-shadow: 0 0 0 6px rgba(16,185,129,0); } 100% { box-shadow: 0 0 0 0 rgba(16,185,129,0); } }`}</style>
        <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#0F172A', marginBottom: '24px' }}>Tracking & Pixels</h2>

        <div style={{ backgroundColor: '#FFFFFF', padding: '32px', borderRadius: '16px', border: '1px solid #E2E8F0', marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
            <Activity size={20} color="var(--color-primary)" />
            <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#0F172A', margin: 0 }}>Live Site Activity</h3>
          </div>
          <p style={{ fontSize: '13px', color: '#94A3B8', margin: '4px 0 20px 0' }}>
            Real-time visits and tracker fires captured from your own site. This is independent of Meta/Google's own ad reporting dashboards.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
            <StatCard
              label="Carpentry / Joinery Visitors"
              value={liveStats ? (pageBreakdown.find(p => p.page_url?.includes('trade=carpentry'))?.visitors || 0) : '—'}
              icon={<Hammer size={16} color="#94A3B8" />}
            />
            <StatCard
              label="Painting & Decorating Visitors"
              value={liveStats ? (pageBreakdown.find(p => p.page_url?.includes('trade=painting'))?.visitors || 0) : '—'}
              icon={<PaintRoller size={16} color="#94A3B8" />}
            />
            <StatCard label="Today's Pageviews" value={liveStats ? liveStats.today_pageviews : '—'} icon={<Eye size={16} color="#94A3B8" />} />
            <StatCard label="Unique Visitors Today" value={liveStats ? liveStats.today_unique_sessions : '—'} icon={<Wifi size={16} color="#94A3B8" />} />
            <StatCard label="Events (Last 5 min)" value={liveStats ? liveStats.last_5_min_events : '—'} live />
            <StatCard label="Active Trackers" value={liveStats ? activeTrackers : '—'} icon={<Radar size={16} color="#94A3B8" />} />
          </div>

          <div style={{ border: '1px solid #E2E8F0', borderRadius: '12px', overflow: 'hidden' }}>
            <div style={{ padding: '12px 16px', backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0', fontSize: '13px', fontWeight: '700', color: '#334155' }}>
              Recent Activity
            </div>
            <div style={{ maxHeight: '340px', overflowY: 'auto' }}>
              {recentEvents.length === 0 ? (
                <div style={{ padding: '32px', textAlign: 'center', color: '#94A3B8', fontSize: '13px' }}>
                  No activity recorded yet.
                </div>
              ) : (
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                  <tbody>
                    {recentEvents.map(ev => (
                      <tr key={ev.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                        <td style={{ padding: '10px 16px', color: '#94A3B8', whiteSpace: 'nowrap', width: '90px' }}>{relativeTime(ev.created_at)}</td>
                        <td style={{ padding: '10px 16px', width: '110px' }}>{eventBadge(ev.event_type)}</td>
                        <td style={{ padding: '10px 16px', color: '#334155', fontWeight: '600', maxWidth: '260px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{ev.page_url}</td>
                        <td style={{ padding: '10px 16px', color: '#64748B', maxWidth: '220px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{ev.referrer || 'Direct'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>

          {/* Per-page views breakdown, e.g. /find-tradesperson?trade=carpentry vs ?trade=painting */}
          <div style={{ border: '1px solid #E2E8F0', borderRadius: '12px', overflow: 'hidden', marginTop: '20px' }}>
            <div style={{ padding: '12px 16px', backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0', fontSize: '13px', fontWeight: '700', color: '#334155' }}>
              Page Performance Today (Views &amp; Unique Visitors)
            </div>
            <div style={{ maxHeight: '320px', overflowY: 'auto' }}>
              {pageBreakdown.length === 0 ? (
                <div style={{ padding: '32px', textAlign: 'center', color: '#94A3B8', fontSize: '13px' }}>
                  No pageviews recorded today yet.
                </div>
              ) : (
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#F8FAFC' }}>
                      {['Page', 'Views', 'Unique Visitors'].map(h => (
                        <th key={h} style={{ textAlign: 'left', padding: '10px 16px', fontSize: '11px', fontWeight: '800', color: '#64748B', textTransform: 'uppercase', borderBottom: '1px solid #E2E8F0' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {pageBreakdown.map((p, idx) => (
                      <tr key={idx} style={{ borderBottom: '1px solid #F1F5F9' }}>
                        <td style={{ padding: '10px 16px', color: '#334155', fontWeight: '600', maxWidth: '320px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.page_url}</td>
                        <td style={{ padding: '10px 16px', color: '#0F172A', fontWeight: '800' }}>{p.views}</td>
                        <td style={{ padding: '10px 16px', color: '#64748B' }}>{p.visitors}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>

          {/* Clicks on the Carpentry / Painting trade-selection buttons */}
          <div style={{ border: '1px solid #E2E8F0', borderRadius: '12px', overflow: 'hidden', marginTop: '20px' }}>
            <div style={{ padding: '12px 16px', backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0', fontSize: '13px', fontWeight: '700', color: '#334155' }}>
              Trade Interest Clicks Today (Carpentry vs Painting)
            </div>
            <div style={{ maxHeight: '240px', overflowY: 'auto' }}>
              {clickBreakdown.length === 0 ? (
                <div style={{ padding: '32px', textAlign: 'center', color: '#94A3B8', fontSize: '13px' }}>
                  No trade button clicks recorded today yet.
                </div>
              ) : (
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#F8FAFC' }}>
                      {['Link Clicked', 'Clicks', 'Unique Visitors'].map(h => (
                        <th key={h} style={{ textAlign: 'left', padding: '10px 16px', fontSize: '11px', fontWeight: '800', color: '#64748B', textTransform: 'uppercase', borderBottom: '1px solid #E2E8F0' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {clickBreakdown.map((c, idx) => (
                      <tr key={idx} style={{ borderBottom: '1px solid #F1F5F9' }}>
                        <td style={{ padding: '10px 16px', color: '#334155', fontWeight: '600', maxWidth: '320px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.page_url}</td>
                        <td style={{ padding: '10px 16px', color: '#0F172A', fontWeight: '800' }}>{c.clicks}</td>
                        <td style={{ padding: '10px 16px', color: '#64748B' }}>{c.visitors}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>

        <form onSubmit={handleTrackingSubmit} style={{ backgroundColor: '#FFFFFF', padding: '40px', borderRadius: '16px', border: '1px solid #E2E8F0', display: 'grid', gap: '24px' }}>
          <Toggle
            checked={trackingForm.data.tracking_enabled}
            onChange={(val) => trackingForm.setData('tracking_enabled', val)}
            label="Enable Tracking"
            hint="Master switch. When off, no pixel/analytics scripts will load on the public site regardless of the fields below."
          />

          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '700', marginBottom: '8px', color: '#334155' }}>Meta (Facebook) Pixel ID</label>
            <input type="text" value={trackingForm.data.meta_pixel_id} onChange={e => trackingForm.setData('meta_pixel_id', e.target.value)} style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '15px' }} placeholder="e.g. 123456789012345" />
            <p style={{ fontSize: '12px', color: '#94A3B8', marginTop: '6px' }}>Find this in Meta Events Manager &gt; Data Sources.</p>
            {trackingForm.errors.meta_pixel_id && <p style={{ color: '#EF4444', fontSize: '12px', marginTop: '4px' }}>{trackingForm.errors.meta_pixel_id}</p>}
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '700', marginBottom: '8px', color: '#334155' }}>Google Analytics (GA4) Measurement ID</label>
            <input type="text" value={trackingForm.data.ga4_measurement_id} onChange={e => trackingForm.setData('ga4_measurement_id', e.target.value)} style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '15px' }} placeholder="e.g. G-XXXXXXXXXX" />
            <p style={{ fontSize: '12px', color: '#94A3B8', marginTop: '6px' }}>Find this in Google Analytics &gt; Admin &gt; Data Streams.</p>
            {trackingForm.errors.ga4_measurement_id && <p style={{ color: '#EF4444', fontSize: '12px', marginTop: '4px' }}>{trackingForm.errors.ga4_measurement_id}</p>}
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '700', marginBottom: '8px', color: '#334155' }}>Google Tag Manager Container ID</label>
            <input type="text" value={trackingForm.data.gtm_container_id} onChange={e => trackingForm.setData('gtm_container_id', e.target.value)} style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '15px' }} placeholder="e.g. GTM-XXXXXXX" />
            <p style={{ fontSize: '12px', color: '#94A3B8', marginTop: '6px' }}>Find this in Google Tag Manager &gt; Container ID.</p>
            {trackingForm.errors.gtm_container_id && <p style={{ color: '#EF4444', fontSize: '12px', marginTop: '4px' }}>{trackingForm.errors.gtm_container_id}</p>}
          </div>

          <Toggle
            checked={trackingForm.data.cookie_consent_enabled}
            onChange={(val) => trackingForm.setData('cookie_consent_enabled', val)}
            label="Show Cookie Consent Banner"
            hint="If enabled, visitors are asked to accept cookies before tracking scripts fire. If disabled, tracking scripts fire immediately for all visitors."
          />

          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '700', marginBottom: '8px', color: '#334155' }}>Custom Cookie Banner Text (optional)</label>
            <textarea value={trackingForm.data.cookie_banner_text} onChange={e => trackingForm.setData('cookie_banner_text', e.target.value)} rows="3" style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '15px', resize: 'vertical' }} placeholder="We use cookies to improve your experience and for analytics. By continuing, you agree to our use of cookies."></textarea>
            <p style={{ fontSize: '12px', color: '#94A3B8', marginTop: '6px' }}>Leave blank to use the default message.</p>
          </div>

          {trackingForm.recentlySuccessful && (
            <p style={{ color: '#10B981', fontSize: '14px', margin: 0, fontWeight: '600' }}>✓ Tracking & Pixel settings updated successfully.</p>
          )}

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
            <button type="submit" disabled={trackingForm.processing} style={{ padding: '12px 24px', backgroundColor: 'var(--color-primary)', color: '#FFF', borderRadius: '8px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '700', fontSize: '15px' }}>
              <Save size={18} /> {trackingForm.processing ? 'Saving...' : 'Save Tracking Settings'}
            </button>
          </div>
        </form>
      </div>
    );
  };

  const renderInbox = () => {
    const generalMessages = messages.filter(m => !m.message?.startsWith('[CAREER APPLICATION]'));
    const careerMessages = messages.filter(m => m.message?.startsWith('[CAREER APPLICATION]'));

    let activeList = quotes;
    if (inboxSubTab === 'messages') activeList = generalMessages;
    else if (inboxSubTab === 'careers') activeList = careerMessages;

    const selectedId = inboxSubTab === 'quotes' ? selectedQuoteId : selectedMessageId;
    const setSelectedId = inboxSubTab === 'quotes' ? setSelectedQuoteId : setSelectedMessageId;
    const selectedItem = activeList.find(item => item.id === selectedId) || activeList[0];

    const getInitials = (name) => {
      if (!name) return 'U';
      return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
    };

    return (
      <div className="admin-panel-section" style={{ height: 'calc(100vh - 120px)', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexShrink: 0 }}>
          <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#0F172A', margin: 0 }}>Inbox & Project Leads</h2>
          
          {/* Sub-tab toggles */}
          <div style={{ display: 'flex', backgroundColor: '#E2E8F0', padding: '4px', borderRadius: '8px' }}>
            <button
              onClick={() => setInboxSubTab('quotes')}
              style={{
                padding: '8px 16px',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: '700',
                fontSize: '13px',
                backgroundColor: inboxSubTab === 'quotes' ? '#FFFFFF' : 'transparent',
                color: inboxSubTab === 'quotes' ? 'var(--color-secondary)' : '#64748B',
                boxShadow: inboxSubTab === 'quotes' ? '0 2px 4px rgba(0,0,0,0.05)' : 'none',
                transition: 'all 0.2s'
              }}
            >
              Quotes ({quotes.length})
            </button>
            <button
              onClick={() => setInboxSubTab('messages')}
              style={{
                padding: '8px 16px',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: '700',
                fontSize: '13px',
                backgroundColor: inboxSubTab === 'messages' ? '#FFFFFF' : 'transparent',
                color: inboxSubTab === 'messages' ? 'var(--color-primary)' : '#64748B',
                boxShadow: inboxSubTab === 'messages' ? '0 2px 4px rgba(0,0,0,0.05)' : 'none',
                transition: 'all 0.2s'
              }}
            >
              General Contact ({generalMessages.length})
            </button>
            <button
              onClick={() => setInboxSubTab('careers')}
              style={{
                padding: '8px 16px',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: '700',
                fontSize: '13px',
                backgroundColor: inboxSubTab === 'careers' ? '#FFFFFF' : 'transparent',
                color: inboxSubTab === 'careers' ? '#059669' : '#64748B',
                boxShadow: inboxSubTab === 'careers' ? '0 2px 4px rgba(0,0,0,0.05)' : 'none',
                transition: 'all 0.2s'
              }}
            >
              Career Applications ({careerMessages.length})
            </button>
          </div>
        </div>

        {/* Split Pane Container */}
        <div style={{ display: 'flex', flex: 1, backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0', overflow: 'hidden', minHeight: 0 }}>
          
          {/* Left Panel: List view */}
          <div style={{ width: '360px', borderRight: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', backgroundColor: '#F8FAFC' }}>
            <div style={{ padding: '16px', borderBottom: '1px solid #E2E8F0', backgroundColor: '#FFFFFF' }}>
              <input
                type="text"
                placeholder="Search by sender or email..."
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  border: '1px solid #E2E8F0',
                  fontSize: '13px',
                  outline: 'none'
                }}
              />
            </div>

            <div style={{ flex: 1, overflowY: 'auto' }}>
              {activeList.length === 0 ? (
                <div style={{ padding: '40px 20px', textAlign: 'center', color: '#94A3B8' }}>
                  No submissions found.
                </div>
              ) : (
                activeList.map(item => {
                  const isActive = item.id === selectedId;
                  return (
                    <div
                      key={item.id}
                      onClick={() => setSelectedId(item.id)}
                      style={{
                        padding: '18px 16px',
                        borderBottom: '1px solid #E2E8F0',
                        cursor: 'pointer',
                        backgroundColor: isActive ? '#FFFFFF' : 'transparent',
                        borderLeft: isActive ? `4px solid ${inboxSubTab === 'quotes' ? 'var(--color-secondary)' : inboxSubTab === 'careers' ? '#059669' : 'var(--color-primary)'}` : '4px solid transparent',
                        transition: 'all 0.15s ease'
                      }}
                      onMouseOver={(e) => { if (!isActive) e.currentTarget.style.backgroundColor = '#F1F5F9'; }}
                      onMouseOut={(e) => { if (!isActive) e.currentTarget.style.backgroundColor = 'transparent'; }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                        <span style={{ fontWeight: '800', fontSize: '14px', color: '#0F172A' }}>{item.name}</span>
                        <span style={{ fontSize: '11px', color: '#94A3B8' }}>{new Date(item.created_at).toLocaleDateString()}</span>
                      </div>
                      
                      <div style={{ fontSize: '12px', color: '#64748B', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', marginBottom: '8px' }}>
                        {(inboxSubTab === 'quotes' || inboxSubTab === 'careers') ? item.service : (item.subject || 'General Inquiry')}
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '11px', color: '#94A3B8' }}>{item.email}</span>
                        <span style={{
                          fontSize: '10px',
                          padding: '2px 8px',
                          borderRadius: '10px',
                          fontWeight: '700',
                          backgroundColor: item.status === 'Pending' || item.status === 'Unread' ? '#FEF2F2' : '#F0FDF4',
                          color: item.status === 'Pending' || item.status === 'Unread' ? '#EF4444' : '#22C55E'
                        }}>
                          {item.status}
                        </span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Right Panel: Detail view */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', backgroundColor: '#FFFFFF' }}>
            {selectedItem ? (
              <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                {/* Detail Header */}
                <div style={{ padding: '24px 32px', borderBottom: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      backgroundColor: inboxSubTab === 'quotes' ? 'var(--color-secondary-light)' : inboxSubTab === 'careers' ? '#D1FAE5' : 'var(--color-primary-light)',
                      color: inboxSubTab === 'quotes' ? 'var(--color-secondary)' : inboxSubTab === 'careers' ? '#059669' : 'var(--color-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: '800',
                      fontSize: '18px'
                    }}>
                      {getInitials(selectedItem.name)}
                    </div>
                    <div>
                      <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#0F172A', margin: '0 0 4px 0' }}>{selectedItem.name}</h3>
                      <div style={{ fontSize: '13px', color: '#64748B' }}>
                        Submitted on {new Date(selectedItem.created_at).toLocaleString()}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    {inboxSubTab === 'quotes' && selectedItem.status !== 'Accepted' && (
                      <button
                        onClick={() => {
                          router.post(`/dashboard/quotes/${selectedItem.id}/generate-invoice`, {}, {
                            preserveScroll: true,
                            onSuccess: () => {
                              setActiveTab('invoices');
                              setInvoiceView('list');
                            }
                          });
                        }}
                        style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px', backgroundColor: 'var(--color-secondary)', color: '#FFF', border: 'none', borderRadius: '8px', fontWeight: '700', fontSize: '13px', cursor: 'pointer' }}
                      >
                        <FileCheck size={15} /> Accept & Generate Invoice
                      </button>
                    )}
                    <span style={{
                      fontSize: '12px',
                      padding: '6px 12px',
                      borderRadius: '12px',
                      fontWeight: '700',
                      backgroundColor: selectedItem.status === 'Pending' || selectedItem.status === 'Unread' ? '#FEF2F2' : '#F0FDF4',
                      color: selectedItem.status === 'Pending' || selectedItem.status === 'Unread' ? '#EF4444' : '#22C55E'
                    }}>
                      Status: {selectedItem.status}
                    </span>
                  </div>
                </div>

                {/* Detail Body */}
                <div style={{ flex: 1, padding: '32px', overflowY: 'auto' }}>
                  {/* Lead Metadata Info Cards */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
                    <div style={{ padding: '16px', border: '1px solid #E2E8F0', borderRadius: '10px', backgroundColor: '#F8FAFC' }}>
                      <span style={{ fontSize: '11px', color: '#94A3B8', display: 'block', textTransform: 'uppercase', fontWeight: '700', marginBottom: '4px' }}>Email Address</span>
                      {selectedItem.email ? (
                        <a href={"mailto:" + selectedItem.email} style={{ fontSize: '14px', fontWeight: '700', color: 'var(--color-primary)', textDecoration: 'none' }}>{selectedItem.email}</a>
                      ) : (
                        <span style={{ fontSize: '14px', fontWeight: '700', color: '#0F172A' }}>N/A</span>
                      )}
                    </div>
                    <div style={{ padding: '16px', border: '1px solid #E2E8F0', borderRadius: '10px', backgroundColor: '#F8FAFC' }}>
                      <span style={{ fontSize: '11px', color: '#94A3B8', display: 'block', textTransform: 'uppercase', fontWeight: '700', marginBottom: '4px' }}>Phone Number</span>
                      <a href={"tel:" + selectedItem.phone} style={{ fontSize: '14px', fontWeight: '700', color: '#0F172A', textDecoration: 'none' }}>{selectedItem.phone || 'N/A'}</a>
                    </div>
                    {inboxSubTab === 'quotes' && selectedItem.details && (selectedItem.address || selectedItem.postcode) && (
                      <div style={{ padding: '16px', border: '1px solid #E2E8F0', borderRadius: '10px', backgroundColor: '#F8FAFC' }}>
                        <span style={{ fontSize: '11px', color: '#94A3B8', display: 'block', textTransform: 'uppercase', fontWeight: '700', marginBottom: '4px' }}>Address / Postcode</span>
                        <span style={{ fontSize: '14px', fontWeight: '700', color: '#0F172A' }}>{[selectedItem.address, selectedItem.postcode].filter(Boolean).join(', ') || 'N/A'}</span>
                      </div>
                    )}

                    {inboxSubTab === 'quotes' && selectedItem.details ? (
                      <>
                        <div style={{ padding: '16px', border: '1px solid #E2E8F0', borderRadius: '10px', backgroundColor: '#F8FAFC' }}>
                          <span style={{ fontSize: '11px', color: '#94A3B8', display: 'block', textTransform: 'uppercase', fontWeight: '700', marginBottom: '4px' }}>Trade Category</span>
                          <span style={{ fontSize: '14px', fontWeight: '700', color: '#0F172A' }}>{selectedItem.service}</span>
                        </div>
                        <div style={{ padding: '16px', border: '1px solid #E2E8F0', borderRadius: '10px', backgroundColor: '#F8FAFC' }}>
                          <span style={{ fontSize: '11px', color: '#94A3B8', display: 'block', textTransform: 'uppercase', fontWeight: '700', marginBottom: '4px' }}>Work Type</span>
                          <span style={{ fontSize: '14px', fontWeight: '700', color: '#0F172A' }}>{String(Object.values(selectedItem.details)[0] ?? 'N/A')}</span>
                        </div>
                        <div style={{ padding: '16px', border: '1px solid #E2E8F0', borderRadius: '10px', backgroundColor: '#F8FAFC' }}>
                          <span style={{ fontSize: '11px', color: '#94A3B8', display: 'block', textTransform: 'uppercase', fontWeight: '700', marginBottom: '4px' }}>Steps / Photos</span>
                          <span style={{ fontSize: '14px', fontWeight: '700', color: '#0F172A' }}>{Object.keys(selectedItem.details).length} steps · {(selectedItem.photos || []).length} photos</span>
                        </div>
                      </>
                    ) : inboxSubTab === 'quotes' ? (
                      <>
                        <div style={{ padding: '16px', border: '1px solid #E2E8F0', borderRadius: '10px', backgroundColor: '#F8FAFC' }}>
                          <span style={{ fontSize: '11px', color: '#94A3B8', display: 'block', textTransform: 'uppercase', fontWeight: '700', marginBottom: '4px' }}>Service Requested</span>
                          <span style={{ fontSize: '14px', fontWeight: '700', color: '#0F172A' }}>{selectedItem.service}</span>
                        </div>
                        <div style={{ padding: '16px', border: '1px solid #E2E8F0', borderRadius: '10px', backgroundColor: '#F8FAFC' }}>
                          <span style={{ fontSize: '11px', color: '#94A3B8', display: 'block', textTransform: 'uppercase', fontWeight: '700', marginBottom: '4px' }}>Property Scope</span>
                          <span style={{ fontSize: '14px', fontWeight: '700', color: '#0F172A' }}>{selectedItem.project_size} ({selectedItem.property_type || 'Residential'})</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div style={{ padding: '16px', border: '1px solid #E2E8F0', borderRadius: '10px', backgroundColor: '#F8FAFC' }}>
                          <span style={{ fontSize: '11px', color: '#94A3B8', display: 'block', textTransform: 'uppercase', fontWeight: '700', marginBottom: '4px' }}>Service Interest</span>
                          <span style={{ fontSize: '14px', fontWeight: '700', color: '#0F172A' }}>{selectedItem.service || 'N/A'}</span>
                        </div>
                        <div style={{ padding: '16px', border: '1px solid #E2E8F0', borderRadius: '10px', backgroundColor: '#F8FAFC' }}>
                          <span style={{ fontSize: '11px', color: '#94A3B8', display: 'block', textTransform: 'uppercase', fontWeight: '700', marginBottom: '4px' }}>Timeline Preferred</span>
                          <span style={{ fontSize: '14px', fontWeight: '700', color: '#0F172A' }}>{selectedItem.timeline || 'Flexible'}</span>
                        </div>
                        <div style={{ padding: '16px', border: '1px solid #E2E8F0', borderRadius: '10px', backgroundColor: '#F8FAFC' }}>
                          <span style={{ fontSize: '11px', color: '#94A3B8', display: 'block', textTransform: 'uppercase', fontWeight: '700', marginBottom: '4px' }}>Postcode / Area</span>
                          <span style={{ fontSize: '14px', fontWeight: '700', color: '#0F172A' }}>{selectedItem.postcode || 'N/A'}</span>
                        </div>
                      </>
                    )}
                  </div>

                  {inboxSubTab === 'quotes' && selectedItem.details ? (
                    <div>
                      <h4 style={{ fontSize: '13px', color: '#94A3B8', textTransform: 'uppercase', fontWeight: '700', marginBottom: '12px', borderBottom: '1px solid #F1F5F9', paddingBottom: '8px' }}>
                        Step-by-Step Answers
                      </h4>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '28px' }}>
                        {Object.entries(selectedItem.details).map(([q, ans], i) => (
                          <div key={q} style={{ display: 'flex', gap: '14px', padding: '14px 16px', border: '1px solid #E2E8F0', borderRadius: '10px', backgroundColor: '#FFF' }}>
                            <span style={{ width: '26px', height: '26px', borderRadius: '50%', backgroundColor: 'var(--color-secondary)', color: '#FFF', fontSize: '12px', fontWeight: '800', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{i + 1}</span>
                            <div>
                              <div style={{ fontSize: '12px', color: '#64748B', fontWeight: '600', marginBottom: '4px' }}>{q}</div>
                              <div style={{ fontSize: '14px', color: '#0F172A', fontWeight: '700' }}>{Array.isArray(ans) ? ans.join(', ') : String(ans)}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <h4 style={{ fontSize: '13px', color: '#94A3B8', textTransform: 'uppercase', fontWeight: '700', marginBottom: '12px', borderBottom: '1px solid #F1F5F9', paddingBottom: '8px' }}>
                        Job Description
                      </h4>
                      <div style={{ fontSize: '15px', color: '#334155', lineHeight: '1.7', whiteSpace: 'pre-wrap', backgroundColor: '#FAFAFA', padding: '20px', borderRadius: '12px', border: '1px solid #F1F5F9', marginBottom: '28px' }}>
                        {(selectedItem.message || '').split('\nDetails: ')[1] || (selectedItem.message || '').match(/^Details: ([\s\S]*)$/)?.[1] || 'No description provided.'}
                      </div>
                      <h4 style={{ fontSize: '13px', color: '#94A3B8', textTransform: 'uppercase', fontWeight: '700', marginBottom: '12px', borderBottom: '1px solid #F1F5F9', paddingBottom: '8px' }}>
                        Photos ({(selectedItem.photos || []).length})
                      </h4>
                      {(selectedItem.photos || []).length ? (
                        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                          {selectedItem.photos.map((src) => (
                            <a key={src} href={src} target="_blank" rel="noreferrer">
                              <img src={src} alt="Customer upload" style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: '10px', border: '1px solid #E2E8F0' }} />
                            </a>
                          ))}
                        </div>
                      ) : (
                        <div style={{ fontSize: '14px', color: '#94A3B8' }}>No photos uploaded.</div>
                      )}
                    </div>
                  ) : (
                  <div>
                    <h4 style={{ fontSize: '13px', color: '#94A3B8', textTransform: 'uppercase', fontWeight: '700', marginBottom: '12px', borderBottom: '1px solid #F1F5F9', paddingBottom: '8px' }}>
                      Message Details
                    </h4>
                    <div style={{ fontSize: '15px', color: '#334155', lineHeight: '1.7', whiteSpace: 'pre-wrap', backgroundColor: '#FAFAFA', padding: '24px', borderRadius: '12px', border: '1px solid #F1F5F9' }}>
                      {selectedItem.message || 'No additional notes provided by sender.'}
                    </div>
                  </div>
                  )}
                </div>
              </div>
            ) : (
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#94A3B8' }}>
                Select a message or quote request to view the full details.
              </div>
            )}
          </div>

        </div>
      </div>
    );
  };  
  
  const customerStatusColors = {
    Lead: { bg: '#FFFBEB', color: '#D97706' },
    Active: { bg: '#F0FDF4', color: '#22C55E' },
    Inactive: { bg: '#F1F5F9', color: '#64748B' }
  };

  const renderCustomerListPage = () => {
    const getInitials = (name) => {
      if (!name) return 'U';
      return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
    };

    const getLastActivity = (c) => {
      const dates = [...(c.quotes || []).map(q => q.created_at), c.updated_at, c.created_at].filter(Boolean).map(d => new Date(d).getTime());
      if (dates.length === 0) return null;
      return new Date(Math.max(...dates));
    };

    const filteredCustomers = customers.filter(c => {
      const matchesSearch = !customerSearch || [c.name, c.email, c.phone].filter(Boolean).some(v => v.toLowerCase().includes(customerSearch.toLowerCase()));
      const matchesStatus = customerStatusFilter === 'All' || c.status === customerStatusFilter;
      return matchesSearch && matchesStatus;
    });

    const sortedCustomers = [...filteredCustomers].sort((a, b) => {
      let aVal, bVal;
      switch (customerSortKey) {
        case 'customer_code': aVal = a.customer_code || ''; bVal = b.customer_code || ''; break;
        case 'email': aVal = a.email || ''; bVal = b.email || ''; break;
        case 'phone': aVal = a.phone || ''; bVal = b.phone || ''; break;
        case 'address': aVal = a.address || ''; bVal = b.address || ''; break;
        case 'status': aVal = a.status || ''; bVal = b.status || ''; break;
        case 'due': aVal = Number(a.total_due || 0); bVal = Number(b.total_due || 0); break;
        case 'quotes': aVal = (a.quotes || []).length; bVal = (b.quotes || []).length; break;
        case 'lastActivity': {
          const ad = getLastActivity(a); const bd = getLastActivity(b);
          aVal = ad ? ad.getTime() : 0; bVal = bd ? bd.getTime() : 0;
          break;
        }
        case 'name':
        default: aVal = a.name || ''; bVal = b.name || ''; break;
      }
      if (typeof aVal === 'string') {
        const cmp = aVal.toLowerCase().localeCompare(bVal.toLowerCase());
        return customerSortDir === 'asc' ? cmp : -cmp;
      }
      const cmp = aVal - bVal;
      return customerSortDir === 'asc' ? cmp : -cmp;
    });

    const toggleCustomerSort = (key) => {
      if (customerSortKey === key) {
        setCustomerSortDir(customerSortDir === 'asc' ? 'desc' : 'asc');
      } else {
        setCustomerSortKey(key);
        setCustomerSortDir('asc');
      }
    };

    const csvEscape = (val) => {
      const str = (val === null || val === undefined) ? '' : String(val);
      if (/[",\n]/.test(str)) {
        return '"' + str.replace(/"/g, '""') + '"';
      }
      return str;
    };

    const exportCustomersToCsv = () => {
      const headers = ['Customer ID', 'Name', 'Email', 'Phone', 'Address', 'Status', 'Source', 'Quote Count', 'Total Purchased', 'Total Paid', 'Due Balance', 'Credit Limit', 'Created At'];
      const rows = filteredCustomers.map(c => [
        c.customer_code || '',
        c.name || '',
        c.email || '',
        c.phone || '',
        c.address || '',
        c.status || '',
        c.source || '',
        (c.quotes || []).length,
        Number(c.total_purchased || 0).toFixed(2),
        Number(c.total_paid || 0).toFixed(2),
        Number(c.total_due || 0).toFixed(2),
        Number(c.credit_limit || 0).toFixed(2),
        c.created_at ? new Date(c.created_at).toLocaleDateString() : ''
      ]);
      const csvContent = [headers, ...rows].map(row => row.map(csvEscape).join(',')).join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      const dateStr = new Date().toISOString().slice(0, 10);
      link.setAttribute('href', url);
      link.setAttribute('download', `customers-export-${dateStr}.csv`);
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    };

    const columns = [
      { key: 'customer_code', label: 'ID' },
      { key: 'name', label: 'Name' },
      { key: 'email', label: 'Email' },
      { key: 'phone', label: 'Phone' },
      { key: 'address', label: 'Address' },
      { key: 'status', label: 'Status' },
      { key: 'due', label: 'Due Balance' },
    ];

    const selectedCustomer = customers.find(c => c.id === selectedCustomerId);

    const totalCustomers = customers.length;
    const activeCount = customers.filter(c => c.status === 'Active').length;
    const leadCount = customers.filter(c => c.status === 'Lead').length;
    const now = new Date();
    const newThisMonth = customers.filter(c => {
      const d = new Date(c.created_at);
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    }).length;

    const resetCustomerFilters = () => {
      setCustomerSearch('');
      setCustomerStatusFilter('All');
    };

    const statCard = (label, value, color) => (
      <div style={{ flex: 1, padding: '18px 20px', backgroundColor: '#FFFFFF', borderRadius: '14px', border: '1px solid #E2E8F0', borderTop: '3px solid var(--color-secondary)' }}>
        <div style={{ fontSize: '12px', color: '#64748B', fontWeight: '700', textTransform: 'uppercase', marginBottom: '6px' }}>{label}</div>
        <div style={{ fontSize: '26px', fontWeight: '800', color: color || '#0F172A' }}>{value}</div>
      </div>
    );

    return (
      <div className="admin-panel-section" style={{ height: 'calc(100vh - 120px)', display: 'flex', flexDirection: 'column' }}>
        <PageHeader
          eyebrow="CUSTOMERS"
          title="Customer List"
          subtitle="View, search, and manage every customer in one place."
          action={
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={exportCustomersToCsv} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', backgroundColor: '#FFFFFF', color: 'var(--color-primary)', border: '1px solid #E2E8F0', borderRadius: '8px', fontWeight: '700', fontSize: '14px', cursor: 'pointer', transition: '0.2s' }}>
                <Download size={18} /> Export to Excel
              </button>
              <button onClick={() => setActiveTab('customers_add')} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', background: 'linear-gradient(135deg, var(--color-secondary) 0%, #EC4899 100%)', color: '#FFF', border: 'none', borderRadius: '10px', fontWeight: '700', fontSize: '14px', cursor: 'pointer', transition: '0.2s', boxShadow: '0 4px 12px rgba(236,72,153,0.3)' }}>
                <UserPlus size={18} /> Add Customer
              </button>
            </div>
          }
        />

        {/* Stats row */}
        <div style={{ display: 'flex', gap: '16px', marginBottom: '20px', flexShrink: 0 }}>
          {statCard('Total Customers', totalCustomers)}
          {statCard('Active', activeCount, '#22C55E')}
          {statCard('Leads', leadCount, '#D97706')}
          {statCard('New This Month', newThisMonth, 'var(--color-secondary)')}
        </div>

        {/* Search / Filter panel */}
        <div style={{ padding: '14px 16px', border: '1px solid #E2E8F0', borderRadius: '12px', backgroundColor: '#FFFFFF', marginBottom: '16px', flexShrink: 0, display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
          <input
            type="text"
            placeholder="Search by name, email or phone..."
            value={customerSearch}
            onChange={(e) => setCustomerSearch(e.target.value)}
            style={{ flex: '1 1 260px', padding: '10px 14px', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '13px', outline: 'none' }}
          />
          <select
            value={customerStatusFilter}
            onChange={(e) => setCustomerStatusFilter(e.target.value)}
            style={{ padding: '9px 12px', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '13px', outline: 'none', backgroundColor: '#FFF', color: '#334155' }}
          >
            <option value="All">All Statuses</option>
            <option value="Lead">Lead</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          <button
            type="button"
            onClick={resetCustomerFilters}
            style={{ padding: '8px 14px', backgroundColor: '#FFFFFF', color: '#475569', border: '1px solid #E2E8F0', borderRadius: '8px', fontWeight: '700', fontSize: '12px', cursor: 'pointer' }}
          >
            Reset
          </button>
        </div>

        {/* Full-width table */}
        <div style={{ flex: 1, backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0', overflow: 'hidden', minHeight: 0, display: 'flex', flexDirection: 'column' }}>
            <div style={{ flex: 1, overflowY: 'auto', overflowX: 'auto', maxHeight: '100%' }}>
              {sortedCustomers.length === 0 ? (
                <div style={{ padding: '40px 20px', textAlign: 'center', color: '#94A3B8', fontSize: '13px' }}>
                  No customers found.
                </div>
              ) : (
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '12px' }}>
                  <thead>
                    <tr>
                      {columns.map(col => {
                        const isSorted = customerSortKey === col.key;
                        return (
                          <th
                            key={col.key}
                            onClick={() => toggleCustomerSort(col.key)}
                            style={{
                              position: 'sticky', top: 0, zIndex: 1,
                              padding: '10px 12px', fontSize: '11px', fontWeight: '700', color: '#64748B',
                              backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0', borderRight: '1px solid #E2E8F0',
                              cursor: 'pointer', userSelect: 'none', whiteSpace: 'nowrap'
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                              {col.label}
                              {isSorted && (customerSortDir === 'asc' ? <ChevronUp size={12} /> : <ChevronDown size={12} />)}
                            </div>
                          </th>
                        );
                      })}
                      <th style={{
                        position: 'sticky', top: 0, right: 0, zIndex: 2,
                        padding: '10px 12px', fontSize: '11px', fontWeight: '700', color: '#64748B',
                        backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0', borderLeft: '1px solid #E2E8F0',
                        whiteSpace: 'nowrap', textAlign: 'right'
                      }}>
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedCustomers.map((customer, idx) => {
                      const statusStyle = customerStatusColors[customer.status] || customerStatusColors.Lead;
                      const baseBg = idx % 2 === 0 ? '#FFFFFF' : '#F8FAFC';
                      return (
                        <tr
                          key={customer.id}
                          onClick={() => setSelectedCustomerId(customer.id)}
                          style={{
                            cursor: 'pointer',
                            backgroundColor: baseBg,
                            borderLeft: '4px solid transparent',
                            transition: 'background-color 0.15s ease'
                          }}
                          onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#EEF2F7'; }}
                          onMouseOut={(e) => { e.currentTarget.style.backgroundColor = baseBg; }}
                        >
                          <td style={{ padding: '10px 12px', borderBottom: '1px solid #E2E8F0', borderRight: '1px solid #E2E8F0', color: '#475569', whiteSpace: 'nowrap', fontSize: '11px', fontWeight: '700' }}>
                            {customer.customer_code || '—'}
                          </td>
                          <td style={{ padding: '10px 12px', borderBottom: '1px solid #E2E8F0', borderRight: '1px solid #E2E8F0', fontWeight: '700', color: '#0F172A', whiteSpace: 'nowrap' }}>
                            {customer.name || 'Unnamed'}
                          </td>
                          <td title={customer.email || ''} style={{ padding: '10px 12px', borderBottom: '1px solid #E2E8F0', borderRight: '1px solid #E2E8F0', color: '#475569', maxWidth: '140px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {customer.email || '—'}
                          </td>
                          <td style={{ padding: '10px 12px', borderBottom: '1px solid #E2E8F0', borderRight: '1px solid #E2E8F0', color: '#475569', whiteSpace: 'nowrap' }}>
                            {customer.phone || '—'}
                          </td>
                          <td title={customer.address || ''} style={{ padding: '10px 12px', borderBottom: '1px solid #E2E8F0', borderRight: '1px solid #E2E8F0', color: '#475569', maxWidth: '120px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {customer.address || '—'}
                          </td>
                          <td style={{ padding: '10px 12px', borderBottom: '1px solid #E2E8F0', borderRight: '1px solid #E2E8F0' }}>
                            <span style={{ fontSize: '10px', padding: '2px 8px', borderRadius: '10px', fontWeight: '700', backgroundColor: statusStyle.bg, color: statusStyle.color, whiteSpace: 'nowrap' }}>
                              {customer.status}
                            </span>
                          </td>
                          <td style={{ padding: '10px 12px', borderBottom: '1px solid #E2E8F0', borderRight: '1px solid #E2E8F0', color: Number(customer.total_due || 0) > 0 ? '#EF4444' : '#475569', fontWeight: '700', whiteSpace: 'nowrap' }}>
                            £{Number(customer.total_due || 0).toFixed(2)}
                          </td>
                          <td style={{
                            position: 'sticky', right: 0, zIndex: 1,
                            padding: '8px 12px', borderBottom: '1px solid #E2E8F0', borderLeft: '1px solid #E2E8F0',
                            backgroundColor: baseBg, whiteSpace: 'nowrap', textAlign: 'right'
                          }}>
                            <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
                              <button
                                onClick={(e) => { e.stopPropagation(); setSelectedCustomerId(customer.id); }}
                                style={{ padding: '6px', backgroundColor: '#F1F5F9', color: '#64748B', border: 'none', borderRadius: '6px', cursor: 'pointer', display: 'flex' }}
                                title="View"
                              >
                                <Eye size={14} />
                              </button>
                              <button
                                onClick={(e) => { e.stopPropagation(); setSelectedCustomerId(customer.id); setTimeout(() => window.print(), 250); }}
                                style={{ padding: '6px', backgroundColor: '#F1F5F9', color: '#475569', border: 'none', borderRadius: '6px', cursor: 'pointer', display: 'flex' }}
                                title="Print"
                              >
                                <Printer size={14} />
                              </button>
                              <button
                                onClick={(e) => { e.stopPropagation(); setInvoiceSearch(customer.name || ''); setActiveTab('invoices'); }}
                                style={{ padding: '6px', backgroundColor: '#F1F5F9', color: '#0EA5E9', border: 'none', borderRadius: '6px', cursor: 'pointer', display: 'flex' }}
                                title="View Invoices"
                              >
                                <FileText size={14} />
                              </button>
                              <button
                                onClick={(e) => { e.stopPropagation(); openEditCustomerModal(customer); }}
                                style={{ padding: '6px', backgroundColor: '#F1F5F9', color: '#3B82F6', border: 'none', borderRadius: '6px', cursor: 'pointer', display: 'flex' }}
                                title="Edit"
                              >
                                <Edit2 size={14} />
                              </button>
                              <button
                                onClick={(e) => { e.stopPropagation(); deleteCustomer(customer.id); }}
                                style={{ padding: '6px', backgroundColor: '#FEF2F2', color: '#EF4444', border: 'none', borderRadius: '6px', cursor: 'pointer', display: 'flex' }}
                                title="Delete"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>
        </div>

        {/* Customer View/Print Modal */}
        {selectedCustomer && (
          <div className="no-print" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '20px' }}>
            <div className="print-area" style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', width: '100%', maxWidth: '760px', maxHeight: '90vh', overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)' }}>
              {/* Detail Header */}
              <div className="no-print" style={{ padding: '24px 32px', borderBottom: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{
                    width: '48px', height: '48px', borderRadius: '50%',
                    backgroundColor: 'var(--color-secondary-light)', color: 'var(--color-secondary)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '18px'
                  }}>
                    {getInitials(selectedCustomer.name)}
                  </div>
                  <div>
                    <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#0F172A', margin: '0 0 4px 0' }}>
                      {selectedCustomer.name}
                      {selectedCustomer.customer_code && (
                        <span style={{ marginLeft: '10px', fontSize: '11px', fontWeight: '800', color: 'var(--color-primary)', backgroundColor: '#EFF6FF', padding: '3px 9px', borderRadius: '8px', verticalAlign: 'middle' }}>
                          {selectedCustomer.customer_code}
                        </span>
                      )}
                    </h3>
                    <div style={{ fontSize: '13px', color: '#64748B' }}>
                      Customer since {new Date(selectedCustomer.created_at).toLocaleDateString()} · Source: {selectedCustomer.source || 'Manual'}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <select
                    value={selectedCustomer.status}
                    onChange={(e) => updateCustomerStatus(selectedCustomer.id, e.target.value)}
                    style={{
                      fontSize: '12px', padding: '8px 12px', borderRadius: '10px', fontWeight: '700',
                      backgroundColor: (customerStatusColors[selectedCustomer.status] || customerStatusColors.Lead).bg,
                      color: (customerStatusColors[selectedCustomer.status] || customerStatusColors.Lead).color,
                      border: 'none', cursor: 'pointer', outline: 'none'
                    }}
                  >
                    <option value="Lead">Lead</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                  <button onClick={() => window.print()} style={{ padding: '8px', backgroundColor: '#F1F5F9', color: '#475569', border: 'none', borderRadius: '8px', cursor: 'pointer' }} title="Print"><Printer size={16} /></button>
                  <button onClick={() => openEditCustomerModal(selectedCustomer)} style={{ padding: '8px', backgroundColor: '#F1F5F9', color: '#3B82F6', border: 'none', borderRadius: '8px', cursor: 'pointer' }} title="Edit"><Edit2 size={16} /></button>
                  <button onClick={() => deleteCustomer(selectedCustomer.id)} style={{ padding: '8px', backgroundColor: '#FEF2F2', color: '#EF4444', border: 'none', borderRadius: '8px', cursor: 'pointer' }} title="Delete"><Trash2 size={16} /></button>
                  <button onClick={() => setSelectedCustomerId(null)} style={{ padding: '8px', backgroundColor: '#F1F5F9', color: '#64748B', border: 'none', borderRadius: '8px', cursor: 'pointer' }} title="Close"><X size={16} /></button>
                </div>
              </div>

              {/* Detail Body */}
              <div style={{ flex: 1, padding: '32px', overflowY: 'auto' }}>
                <h2 style={{ display: 'none' }} className="print-only-heading">{selectedCustomer.name}</h2>
                {/* Contact Info Cards */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '28px' }}>
                  <div style={{ padding: '16px', border: '1px solid #E2E8F0', borderRadius: '10px', backgroundColor: '#F8FAFC' }}>
                    <span style={{ fontSize: '11px', color: '#94A3B8', display: 'flex', alignItems: 'center', gap: '6px', textTransform: 'uppercase', fontWeight: '700', marginBottom: '4px' }}><Mail size={12} /> Email</span>
                    {selectedCustomer.email ? (
                      <a href={"mailto:" + selectedCustomer.email} style={{ fontSize: '14px', fontWeight: '700', color: 'var(--color-primary)', textDecoration: 'none' }}>{selectedCustomer.email}</a>
                    ) : <span style={{ fontSize: '14px', color: '#94A3B8' }}>N/A</span>}
                  </div>
                  <div style={{ padding: '16px', border: '1px solid #E2E8F0', borderRadius: '10px', backgroundColor: '#F8FAFC' }}>
                    <span style={{ fontSize: '11px', color: '#94A3B8', display: 'flex', alignItems: 'center', gap: '6px', textTransform: 'uppercase', fontWeight: '700', marginBottom: '4px' }}><Phone size={12} /> Phone</span>
                    {selectedCustomer.phone ? (
                      <a href={"tel:" + selectedCustomer.phone} style={{ fontSize: '14px', fontWeight: '700', color: '#0F172A', textDecoration: 'none' }}>{selectedCustomer.phone}</a>
                    ) : <span style={{ fontSize: '14px', color: '#94A3B8' }}>N/A</span>}
                  </div>
                  <div style={{ padding: '16px', border: '1px solid #E2E8F0', borderRadius: '10px', backgroundColor: '#F8FAFC' }}>
                    <span style={{ fontSize: '11px', color: '#94A3B8', display: 'flex', alignItems: 'center', gap: '6px', textTransform: 'uppercase', fontWeight: '700', marginBottom: '4px' }}><MapPin size={12} /> Address</span>
                    <span style={{ fontSize: '14px', fontWeight: '700', color: '#0F172A' }}>{selectedCustomer.address || 'N/A'}</span>
                  </div>
                </div>

                {/* Purchase & Credit Summary */}
                <h4 style={{ fontSize: '13px', color: '#94A3B8', textTransform: 'uppercase', fontWeight: '700', marginBottom: '12px', borderBottom: '1px solid #F1F5F9', paddingBottom: '8px' }}>
                  Purchase &amp; Credit Summary
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '14px', marginBottom: '28px' }}>
                  <div style={{ padding: '14px', border: '1px solid #E2E8F0', borderRadius: '10px', backgroundColor: '#F8FAFC' }}>
                    <div style={{ fontSize: '11px', color: '#94A3B8', fontWeight: '700', textTransform: 'uppercase', marginBottom: '4px' }}>Total Purchased</div>
                    <div style={{ fontSize: '16px', fontWeight: '800', color: '#0F172A' }}>£{Number(selectedCustomer.total_purchased || 0).toFixed(2)}</div>
                  </div>
                  <div style={{ padding: '14px', border: '1px solid #E2E8F0', borderRadius: '10px', backgroundColor: '#F0FDF4' }}>
                    <div style={{ fontSize: '11px', color: '#94A3B8', fontWeight: '700', textTransform: 'uppercase', marginBottom: '4px' }}>Total Paid</div>
                    <div style={{ fontSize: '16px', fontWeight: '800', color: '#22C55E' }}>£{Number(selectedCustomer.total_paid || 0).toFixed(2)}</div>
                  </div>
                  <div style={{ padding: '14px', border: '1px solid #E2E8F0', borderRadius: '10px', backgroundColor: '#FEF2F2' }}>
                    <div style={{ fontSize: '11px', color: '#94A3B8', fontWeight: '700', textTransform: 'uppercase', marginBottom: '4px' }}>Due Balance</div>
                    <div style={{ fontSize: '16px', fontWeight: '800', color: '#EF4444' }}>£{Number(selectedCustomer.total_due || 0).toFixed(2)}</div>
                  </div>
                  <div style={{ padding: '14px', border: '1px solid #E2E8F0', borderRadius: '10px', backgroundColor: '#FFFBEB' }}>
                    <div style={{ fontSize: '11px', color: '#94A3B8', fontWeight: '700', textTransform: 'uppercase', marginBottom: '4px' }}>Credit Limit</div>
                    <div style={{ fontSize: '16px', fontWeight: '800', color: '#D97706' }}>£{Number(selectedCustomer.credit_limit || 0).toFixed(2)}</div>
                  </div>
                </div>

                {/* Customer-wise Transaction History */}
                <h4 style={{ fontSize: '13px', color: '#94A3B8', textTransform: 'uppercase', fontWeight: '700', marginBottom: '12px', borderBottom: '1px solid #F1F5F9', paddingBottom: '8px' }}>
                  Transaction History ({(selectedCustomer.invoices || []).length})
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '28px' }}>
                  {(selectedCustomer.invoices || []).length === 0 ? (
                    <div style={{ fontSize: '14px', color: '#94A3B8' }}>No invoices yet.</div>
                  ) : (
                    selectedCustomer.invoices.map(inv => (
                      <div key={inv.id} style={{ padding: '14px 16px', border: '1px solid #E2E8F0', borderRadius: '10px', backgroundColor: '#FFF', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <div style={{ fontSize: '14px', fontWeight: '700', color: '#0F172A' }}>{inv.invoice_number}</div>
                          <div style={{ fontSize: '12px', color: '#64748B' }}>{inv.invoice_date ? new Date(inv.invoice_date).toLocaleDateString() : ''}</div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <div style={{ fontSize: '14px', fontWeight: '800', color: '#0F172A' }}>£{Number(inv.total || 0).toFixed(2)}</div>
                          <span style={{
                            fontSize: '10px', padding: '2px 8px', borderRadius: '10px', fontWeight: '700',
                            backgroundColor: inv.status === 'Paid' ? '#F0FDF4' : '#FEF2F2',
                            color: inv.status === 'Paid' ? '#22C55E' : '#EF4444'
                          }}>
                            {inv.status}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Quote / Order History */}
                <h4 style={{ fontSize: '13px', color: '#94A3B8', textTransform: 'uppercase', fontWeight: '700', marginBottom: '12px', borderBottom: '1px solid #F1F5F9', paddingBottom: '8px' }}>
                  Quote / Order History ({(selectedCustomer.quotes || []).length})
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '28px' }}>
                  {(selectedCustomer.quotes || []).length === 0 ? (
                    <div style={{ fontSize: '14px', color: '#94A3B8' }}>No quotes submitted yet.</div>
                  ) : (
                    selectedCustomer.quotes.map(q => (
                      <div key={q.id} style={{ padding: '14px 16px', border: '1px solid #E2E8F0', borderRadius: '10px', backgroundColor: '#FFF' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                          <span style={{ fontSize: '14px', fontWeight: '700', color: '#0F172A' }}>{q.service || 'General Enquiry'}</span>
                          <span style={{
                            fontSize: '10px', padding: '2px 8px', borderRadius: '10px', fontWeight: '700',
                            backgroundColor: q.status === 'Pending' ? '#FEF2F2' : '#F0FDF4',
                            color: q.status === 'Pending' ? '#EF4444' : '#22C55E'
                          }}>
                            {q.status}
                          </span>
                        </div>
                        <div style={{ fontSize: '12px', color: '#64748B', marginBottom: '6px' }}>{new Date(q.created_at).toLocaleString()}</div>
                        {q.message && (
                          <div style={{ fontSize: '13px', color: '#334155', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                            {q.message}
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>

                {/* Notes */}
                <h4 style={{ fontSize: '13px', color: '#94A3B8', textTransform: 'uppercase', fontWeight: '700', marginBottom: '12px', borderBottom: '1px solid #F1F5F9', paddingBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <StickyNote size={14} /> Notes
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
                  {(selectedCustomer.notes || []).length === 0 ? (
                    <div style={{ fontSize: '14px', color: '#94A3B8' }}>No notes yet.</div>
                  ) : (
                    [...selectedCustomer.notes].reverse().map((note, idx) => (
                      <div key={idx} style={{ padding: '12px 14px', backgroundColor: '#FAFAFA', borderRadius: '10px', border: '1px solid #F1F5F9' }}>
                        <div style={{ fontSize: '11px', color: '#94A3B8', fontWeight: '700', marginBottom: '4px' }}>{new Date(note.created_at).toLocaleString()}</div>
                        <div style={{ fontSize: '14px', color: '#334155', lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>{note.text}</div>
                      </div>
                    ))
                  )}
                </div>
                <div className="no-print" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <textarea
                    value={noteText}
                    onChange={(e) => setNoteText(e.target.value)}
                    placeholder="Add a note about this customer..."
                    rows={3}
                    style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1px solid #E2E8F0', fontSize: '14px', outline: 'none', resize: 'vertical', fontFamily: 'inherit' }}
                  />
                  <button
                    onClick={() => submitCustomerNote(selectedCustomer.id)}
                    style={{ alignSelf: 'flex-end', padding: '10px 20px', backgroundColor: 'var(--color-primary)', color: '#FFF', border: 'none', borderRadius: '8px', fontWeight: '700', fontSize: '13px', cursor: 'pointer' }}
                  >
                    Add Note
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <style>{`
          @media print {
            body * {
              visibility: hidden;
            }
            .print-area, .print-area * {
              visibility: visible;
            }
            .print-area {
              position: fixed !important;
              top: 0 !important;
              left: 0 !important;
              width: 100% !important;
              max-width: 100% !important;
              max-height: none !important;
              box-shadow: none !important;
              border-radius: 0 !important;
            }
            .no-print {
              display: none !important;
            }
          }
        `}</style>
      </div>
    );
  };

  const renderCustomerAddPage = () => {
    const handleAddSubmit = (e) => {
      e.preventDefault();
      customerForm.post('/dashboard/customers', {
        preserveScroll: true,
        onSuccess: () => {
          customerForm.reset();
          setActiveTab('customers_list');
        }
      });
    };

    return (
      <div style={{ animation: 'fadeIn 0.3s ease-out' }}>
        <PageHeader
          eyebrow="CUSTOMERS"
          title="Add New Customer"
          subtitle="Create a new customer record — they'll appear in your Customer List immediately."
        />
        <div style={{ maxWidth: '880px', backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0', borderTop: '4px solid var(--color-secondary)', padding: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px', paddingBottom: '16px', borderBottom: '1px solid #F1F5F9' }}>
            <span style={{ width: '4px', height: '18px', backgroundColor: 'var(--color-secondary)', borderRadius: '2px', display: 'inline-block', marginRight: '8px' }} />
            <span style={{ fontSize: '15px', fontWeight: '800', color: '#0F172A' }}>Customer Information</span>
          </div>
          <form onSubmit={handleAddSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="Enter full name"
                  value={customerForm.data.name}
                  onChange={(e) => customerForm.setData('name', e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '14px', outline: 'none' }}
                />
                {customerForm.errors.name && <div style={{ color: '#EF4444', fontSize: '12px', marginTop: '4px' }}>{customerForm.errors.name}</div>}
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>Email</label>
                <input
                  type="email"
                  placeholder="Enter email address"
                  value={customerForm.data.email}
                  onChange={(e) => customerForm.setData('email', e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '14px', outline: 'none' }}
                />
                {customerForm.errors.email && <div style={{ color: '#EF4444', fontSize: '12px', marginTop: '4px' }}>{customerForm.errors.email}</div>}
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>Phone</label>
                <input
                  type="text"
                  placeholder="Enter phone number"
                  value={customerForm.data.phone}
                  onChange={(e) => customerForm.setData('phone', e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '14px', outline: 'none' }}
                />
                {customerForm.errors.phone && <div style={{ color: '#EF4444', fontSize: '12px', marginTop: '4px' }}>{customerForm.errors.phone}</div>}
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>Status</label>
                <select
                  value={customerForm.data.status}
                  onChange={(e) => customerForm.setData('status', e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '14px', outline: 'none', backgroundColor: '#FFF' }}
                >
                  <option value="Lead">Lead</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>Credit Limit (£)</label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  value={customerForm.data.credit_limit}
                  onChange={(e) => customerForm.setData('credit_limit', e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '14px', outline: 'none' }}
                />
                {customerForm.errors.credit_limit && <div style={{ color: '#EF4444', fontSize: '12px', marginTop: '4px' }}>{customerForm.errors.credit_limit}</div>}
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>Address</label>
                <textarea
                  rows={3}
                  placeholder="Enter address"
                  value={customerForm.data.address}
                  onChange={(e) => customerForm.setData('address', e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '14px', outline: 'none', resize: 'vertical', fontFamily: 'inherit' }}
                />
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '8px' }}>
              <button
                type="button"
                onClick={() => { customerForm.reset(); setActiveTab('customers_list'); }}
                style={{ padding: '10px 20px', backgroundColor: '#F1F5F9', color: '#475569', border: 'none', borderRadius: '8px', fontWeight: '700', fontSize: '14px', cursor: 'pointer' }}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={customerForm.processing}
                style={{ padding: '10px 24px', background: 'linear-gradient(135deg, var(--color-secondary) 0%, #EC4899 100%)', color: '#FFF', border: 'none', borderRadius: '8px', fontWeight: '700', fontSize: '14px', cursor: 'pointer' }}
              >
                {customerForm.processing ? 'Saving...' : 'Save Customer'}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const renderCustomerImportPage = () => {
    const { flash } = usePage().props;
    const importResult = flash?.import_result;

    return (
      <div style={{ animation: 'fadeIn 0.3s ease-out' }}>
        <PageHeader eyebrow="CUSTOMERS" title="Import Customers" />

        <div style={{ maxWidth: '720px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0', borderTop: '3px solid var(--color-secondary)', padding: '24px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: '800', color: '#0F172A', margin: '0 0 10px 0' }}>Expected CSV Format</h3>
            <p style={{ fontSize: '13px', color: '#64748B', lineHeight: '1.6', margin: '0 0 14px 0' }}>
              The first row must be a header row. Required column: <strong>name</strong>. Optional columns: <strong>email</strong>, <strong>phone</strong>, <strong>address</strong>, <strong>status</strong> (Lead, Active or Inactive — defaults to Lead). Column order does not matter. Rows matching an existing customer's email or phone will be skipped as duplicates.
            </p>
            <button
              onClick={downloadSampleCustomerCsv}
              style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '9px 16px', backgroundColor: '#FFFFFF', color: 'var(--color-primary)', border: '1px solid #E2E8F0', borderRadius: '8px', fontWeight: '700', fontSize: '13px', cursor: 'pointer' }}
            >
              <Download size={16} /> Download Sample CSV
            </button>
          </div>

          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0', borderTop: '3px solid var(--color-secondary)', padding: '24px' }}>
            <form onSubmit={handleCustomerImportSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>CSV File</label>
                <input
                  type="file"
                  accept=".csv,text/csv"
                  onChange={(e) => {
                    const file = e.target.files?.[0] || null;
                    setCustomerImportFile(file);
                    customerImportForm.setData('file', file);
                  }}
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '13px' }}
                />
                {customerImportForm.errors.file && <div style={{ color: '#EF4444', fontSize: '12px', marginTop: '4px' }}>{customerImportForm.errors.file}</div>}
              </div>
              <div>
                <button
                  type="submit"
                  disabled={!customerImportFile || customerImportForm.processing}
                  style={{ padding: '10px 24px', background: 'linear-gradient(135deg, var(--color-secondary) 0%, #EC4899 100%)', color: '#FFF', border: 'none', borderRadius: '8px', fontWeight: '700', fontSize: '14px', cursor: (!customerImportFile || customerImportForm.processing) ? 'not-allowed' : 'pointer', opacity: (!customerImportFile || customerImportForm.processing) ? 0.6 : 1 }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Upload size={16} /> {customerImportForm.processing ? 'Importing...' : 'Upload & Import'}</span>
                </button>
              </div>
            </form>
          </div>

          {importResult && (
            <div style={{ backgroundColor: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: '16px', padding: '20px' }}>
              <h3 style={{ fontSize: '15px', fontWeight: '800', color: '#166534', margin: '0 0 8px 0' }}>Import Complete</h3>
              <p style={{ fontSize: '14px', color: '#166534', margin: 0 }}>
                {importResult.imported} customer(s) imported, {importResult.skipped} skipped as duplicates, {(importResult.errors || []).length} row(s) had errors.
              </p>
              {(importResult.errors || []).length > 0 && (
                <ul style={{ marginTop: '10px', paddingLeft: '20px', color: '#B45309', fontSize: '13px' }}>
                  {importResult.errors.map((err, idx) => <li key={idx}>{err}</li>)}
                </ul>
              )}
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderCustomerLogsPage = () => {
    const filteredLogs = customerLogs.filter(log => {
      if (!customerLogSearch) return true;
      const name = log.customer?.name || '';
      return name.toLowerCase().includes(customerLogSearch.toLowerCase());
    });

    const actionBadge = (action) => {
      const map = {
        created: { bg: '#F0FDF4', color: '#16A34A', label: 'Created' },
        updated: { bg: '#EFF6FF', color: '#2563EB', label: 'Updated' },
        status_changed: { bg: '#FFFBEB', color: '#D97706', label: 'Status Changed' },
        note_added: { bg: '#F1F5F9', color: '#475569', label: 'Note Added' },
        imported: { bg: '#F5F3FF', color: '#7C3AED', label: 'Imported' },
      };
      return map[action] || { bg: '#F1F5F9', color: '#475569', label: action };
    };

    const timeAgo = (dateStr) => {
      if (!dateStr) return '';
      const diffMs = Date.now() - new Date(dateStr).getTime();
      const mins = Math.floor(diffMs / 60000);
      if (mins < 1) return 'just now';
      if (mins < 60) return `${mins}m ago`;
      const hrs = Math.floor(mins / 60);
      if (hrs < 24) return `${hrs}h ago`;
      const days = Math.floor(hrs / 24);
      if (days < 30) return `${days}d ago`;
      return new Date(dateStr).toLocaleDateString();
    };

    return (
      <div style={{ animation: 'fadeIn 0.3s ease-out' }}>
        <PageHeader eyebrow="CUSTOMERS" title="Customer Activity Logs" />

        <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0', borderTop: '3px solid var(--color-secondary)', overflow: 'hidden' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid #E2E8F0' }}>
            <input
              type="text"
              placeholder="Search by customer name..."
              value={customerLogSearch}
              onChange={(e) => setCustomerLogSearch(e.target.value)}
              style={{ width: '100%', maxWidth: '360px', padding: '10px 14px', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '13px', outline: 'none' }}
            />
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #E2E8F0', backgroundColor: '#F8FAFC' }}>
                  <th style={{ padding: '14px 20px', fontSize: '12px', fontWeight: '700', color: '#64748B' }}>Time</th>
                  <th style={{ padding: '14px 20px', fontSize: '12px', fontWeight: '700', color: '#64748B' }}>Customer</th>
                  <th style={{ padding: '14px 20px', fontSize: '12px', fontWeight: '700', color: '#64748B' }}>Action</th>
                  <th style={{ padding: '14px 20px', fontSize: '12px', fontWeight: '700', color: '#64748B' }}>Description</th>
                  <th style={{ padding: '14px 20px', fontSize: '12px', fontWeight: '700', color: '#64748B' }}>By</th>
                </tr>
              </thead>
              <tbody>
                {filteredLogs.length === 0 ? (
                  <tr>
                    <td colSpan="5" style={{ padding: '48px', textAlign: 'center', color: '#64748B', fontSize: '14px' }}>No activity logged yet.</td>
                  </tr>
                ) : filteredLogs.map(log => {
                  const badge = actionBadge(log.action);
                  return (
                    <tr key={log.id} style={{ borderBottom: '1px solid #E2E8F0' }}>
                      <td style={{ padding: '14px 20px', fontSize: '13px', color: '#64748B', whiteSpace: 'nowrap' }}>{timeAgo(log.created_at)}</td>
                      <td style={{ padding: '14px 20px', fontSize: '13px' }}>
                        {log.customer ? (
                          <button
                            onClick={() => { setSelectedCustomerId(log.customer.id); setActiveTab('customers_list'); }}
                            style={{ background: 'none', border: 'none', padding: 0, color: 'var(--color-primary)', fontWeight: '700', cursor: 'pointer', fontSize: '13px', textAlign: 'left' }}
                          >
                            {log.customer.name}
                          </button>
                        ) : <span style={{ color: '#94A3B8' }}>—</span>}
                      </td>
                      <td style={{ padding: '14px 20px' }}>
                        <span style={{ fontSize: '10px', padding: '3px 9px', borderRadius: '10px', fontWeight: '700', backgroundColor: badge.bg, color: badge.color, whiteSpace: 'nowrap' }}>
                          {badge.label}
                        </span>
                      </td>
                      <td style={{ padding: '14px 20px', fontSize: '13px', color: '#334155' }}>{log.description}</td>
                      <td style={{ padding: '14px 20px', fontSize: '13px', color: '#64748B' }}>{log.user?.name || 'System'}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  const renderAccountsCMS = () => {
    if (auth?.user?.role !== 'admin') {
      return (
        <div style={{ padding: '48px', textAlign: 'center', color: '#64748B', fontSize: '14px', backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
          Access restricted to administrators.
        </div>
      );
    }

    const roleBadgeStyle = (role) => role === 'admin'
      ? { bg: '#EDE9FE', color: '#7C3AED' }
      : { bg: '#DBEAFE', color: '#2563EB' };

    const activeAdminCount = accounts.filter(a => a.role === 'admin').length;

    return (
      <div style={{ animation: 'fadeIn 0.3s ease-out' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div>
            <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#0F172A', letterSpacing: '-0.5px' }}>Account Management</h2>
            <p style={{ color: '#64748B', fontSize: '14px', marginTop: '4px' }}>Manage admin and staff accounts with access to this dashboard.</p>
          </div>
          <button onClick={openAddAccountModal} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', backgroundColor: 'var(--color-secondary)', color: '#FFF', border: 'none', borderRadius: '8px', fontWeight: '700', fontSize: '14px', cursor: 'pointer', transition: '0.2s', boxShadow: 'var(--shadow-sm)' }}>
            <UserPlus size={18} /> Add Account
          </button>
        </div>

        <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0', overflow: 'hidden' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #E2E8F0', backgroundColor: '#F8FAFC' }}>
                  <th style={{ padding: '16px 24px', fontSize: '13px', fontWeight: '700', color: '#64748B' }}>Name</th>
                  <th style={{ padding: '16px 24px', fontSize: '13px', fontWeight: '700', color: '#64748B' }}>Email</th>
                  <th style={{ padding: '16px 24px', fontSize: '13px', fontWeight: '700', color: '#64748B' }}>Role</th>
                  <th style={{ padding: '16px 24px', fontSize: '13px', fontWeight: '700', color: '#64748B' }}>Status</th>
                  <th style={{ padding: '16px 24px', fontSize: '13px', fontWeight: '700', color: '#64748B', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {accounts.map(account => {
                  const isSelf = auth?.user?.id === account.id;
                  const isLastAdmin = account.role === 'admin' && activeAdminCount <= 1;
                  const roleStyle = roleBadgeStyle(account.role);
                  return (
                    <tr key={account.id} style={{ borderBottom: '1px solid #E2E8F0' }}>
                      <td style={{ padding: '16px 24px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontSize: '14px', fontWeight: '700', color: '#0F172A' }}>{account.name}</span>
                          {isSelf && (
                            <span style={{ fontSize: '10px', padding: '2px 8px', borderRadius: '10px', fontWeight: '700', backgroundColor: '#F1F5F9', color: '#64748B' }}>You</span>
                          )}
                        </div>
                      </td>
                      <td style={{ padding: '16px 24px', fontSize: '13px', color: '#475569' }}>{account.email}</td>
                      <td style={{ padding: '16px 24px' }}>
                        <span style={{ fontSize: '11px', padding: '4px 8px', borderRadius: '12px', fontWeight: '700', backgroundColor: roleStyle.bg, color: roleStyle.color, textTransform: 'capitalize' }}>
                          {account.role}
                        </span>
                      </td>
                      <td style={{ padding: '16px 24px' }}>
                        <span style={{ fontSize: '11px', padding: '4px 8px', borderRadius: '12px', fontWeight: '700', backgroundColor: account.is_active ? '#F0FDF4' : '#F1F5F9', color: account.is_active ? '#22C55E' : '#64748B' }}>
                          {account.is_active ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                        <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                          <button onClick={() => openEditAccountModal(account)} style={{ padding: '6px', backgroundColor: '#F1F5F9', color: '#3B82F6', border: 'none', borderRadius: '6px', cursor: 'pointer' }} title="Edit"><Edit2 size={16} /></button>
                          <button
                            onClick={() => !isSelf && toggleAccountStatus(account.id)}
                            disabled={isSelf}
                            style={{ padding: '6px', backgroundColor: '#F1F5F9', color: isSelf ? '#CBD5E1' : '#D97706', border: 'none', borderRadius: '6px', cursor: isSelf ? 'not-allowed' : 'pointer' }}
                            title={isSelf ? 'You cannot deactivate your own account' : (account.is_active ? 'Deactivate' : 'Activate')}
                          >
                            <Power size={16} />
                          </button>
                          <button
                            onClick={() => (!isSelf && !isLastAdmin) && deleteAccount(account.id)}
                            disabled={isSelf || isLastAdmin}
                            style={{ padding: '6px', backgroundColor: '#FEF2F2', color: (isSelf || isLastAdmin) ? '#FCA5A5' : '#EF4444', border: 'none', borderRadius: '6px', cursor: (isSelf || isLastAdmin) ? 'not-allowed' : 'pointer' }}
                            title={isSelf ? 'You cannot delete your own account' : (isLastAdmin ? 'You cannot delete the last remaining admin' : 'Delete')}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
                {accounts.length === 0 && (
                  <tr>
                    <td colSpan="5" style={{ padding: '48px', textAlign: 'center', color: '#64748B', fontSize: '14px' }}>
                      No admin/staff accounts found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  const renderServicesCMS = () => (
    <div style={{ animation: 'fadeIn 0.3s ease-out' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#0F172A', letterSpacing: '-0.5px' }}>Our Services</h2>
          <p style={{ color: '#64748B', fontSize: '14px', marginTop: '4px' }}>Manage the services displayed on the homepage and services page.</p>
        </div>
        <button onClick={openAddServiceModal} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', backgroundColor: 'var(--color-secondary)', color: '#FFF', border: 'none', borderRadius: '8px', fontWeight: '700', fontSize: '14px', cursor: 'pointer', transition: '0.2s', boxShadow: 'var(--shadow-sm)' }}>
          <Plus size={18} /> Add Service
        </button>
      </div>

      <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #E2E8F0', backgroundColor: '#F8FAFC' }}>
              <th style={{ padding: '16px 24px', fontSize: '13px', fontWeight: '700', color: '#64748B' }}>Service Title</th>
              <th style={{ padding: '16px 24px', fontSize: '13px', fontWeight: '700', color: '#64748B' }}>Icon</th>
              <th style={{ padding: '16px 24px', fontSize: '13px', fontWeight: '700', color: '#64748B' }}>Status</th>
              <th style={{ padding: '16px 24px', fontSize: '13px', fontWeight: '700', color: '#64748B', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map(srv => (
              <tr key={srv.id} style={{ borderBottom: '1px solid #E2E8F0' }}>
                <td style={{ padding: '16px 24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  {srv.image ? (
                    <img src={srv.image} alt={srv.title} style={{ width: '56px', height: '40px', objectFit: 'cover', borderRadius: '6px', border: '1px solid #E2E8F0', flexShrink: 0 }} />
                  ) : (
                    <div style={{ width: '56px', height: '40px', borderRadius: '6px', backgroundColor: '#F1F5F9', border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <ImageIcon size={16} color="#94A3B8" />
                    </div>
                  )}
                  <span style={{ fontSize: '14px', fontWeight: '700', color: '#0F172A' }}>{srv.title}</span>
                </div>
              </td>
                <td style={{ padding: '16px 24px', fontSize: '13px', color: '#475569' }}>{srv.icon}</td>
                <td style={{ padding: '16px 24px' }}>
                  <button onClick={() => toggleServiceStatus(srv.id)} style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: 0 }}>
                    <span style={{ fontSize: '11px', padding: '4px 8px', borderRadius: '12px', fontWeight: '700', backgroundColor: srv.status === 'Active' ? '#F0FDF4' : '#FEF2F2', color: srv.status === 'Active' ? '#22C55E' : '#EF4444' }}>
                      {srv.status}
                    </span>
                  </button>
                </td>
                <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                  <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                    <button onClick={() => openEditServiceModal(srv)} style={{ padding: '6px', backgroundColor: '#F1F5F9', color: '#3B82F6', border: 'none', borderRadius: '6px', cursor: 'pointer' }}><Edit2 size={16} /></button>
                    <button onClick={() => deleteService(srv.id)} style={{ padding: '6px', backgroundColor: '#FEF2F2', color: '#EF4444', border: 'none', borderRadius: '6px', cursor: 'pointer' }}><Trash2 size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderGalleryCMS = () => (
    <div style={{ animation: 'fadeIn 0.3s ease-out' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#0F172A', letterSpacing: '-0.5px' }}>Gallery Projects</h2>
          <p style={{ color: '#64748B', fontSize: '14px', marginTop: '4px' }}>Manage portfolio projects shown on the Gallery page.</p>
        </div>
        <button onClick={openAddProjectModal} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', backgroundColor: 'var(--color-secondary)', color: '#FFF', border: 'none', borderRadius: '8px', fontWeight: '700', fontSize: '14px', cursor: 'pointer', transition: '0.2s', boxShadow: 'var(--shadow-sm)' }}>
          <Plus size={18} /> Add Project
        </button>
      </div>

      <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0', overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #E2E8F0', backgroundColor: '#F8FAFC' }}>
                <th style={{ padding: '16px 24px', fontSize: '13px', fontWeight: '700', color: '#64748B' }}>Project</th>
                <th style={{ padding: '16px 24px', fontSize: '13px', fontWeight: '700', color: '#64748B' }}>Category</th>
                <th style={{ padding: '16px 24px', fontSize: '13px', fontWeight: '700', color: '#64748B' }}>Location</th>
                <th style={{ padding: '16px 24px', fontSize: '13px', fontWeight: '700', color: '#64748B' }}>Status</th>
                <th style={{ padding: '16px 24px', fontSize: '13px', fontWeight: '700', color: '#64748B', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map(proj => (
                <tr key={proj.id} style={{ borderBottom: '1px solid #E2E8F0', transition: 'background-color 0.2s' }}>
                  <td style={{ padding: '16px 24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <img src={proj.image} alt={proj.title} style={{ width: '60px', height: '40px', objectFit: 'cover', borderRadius: '6px', border: '1px solid #E2E8F0' }} />
                      <div>
                        <div style={{ fontSize: '14px', fontWeight: '700', color: '#0F172A' }}>{proj.title}</div>
                        <div style={{ fontSize: '11px', color: '#64748B', marginTop: '2px' }}>{proj.tag || 'No Tag'}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '16px 24px', fontSize: '13px', color: '#475569' }}>{proj.category}</td>
                  <td style={{ padding: '16px 24px', fontSize: '13px', color: '#475569' }}>{proj.location || '-'}</td>
                  <td style={{ padding: '16px 24px' }}>
                    <button
                      onClick={() => toggleProjectStatus(proj.id)}
                      style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: 0 }}
                    >
                      <span style={{ fontSize: '11px', padding: '4px 8px', borderRadius: '12px', fontWeight: '700', backgroundColor: proj.status === 'Active' ? '#F0FDF4' : '#FEF2F2', color: proj.status === 'Active' ? '#22C55E' : '#EF4444' }}>
                        {proj.status}
                      </span>
                    </button>
                  </td>
                  <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                      <button onClick={() => openEditProjectModal(proj)} style={{ padding: '6px', backgroundColor: '#F1F5F9', color: '#3B82F6', border: 'none', borderRadius: '6px', cursor: 'pointer', transition: '0.2s' }} title="Edit"><Edit2 size={16} /></button>
                      <button onClick={() => deleteProject(proj.id)} style={{ padding: '6px', backgroundColor: '#FEF2F2', color: '#EF4444', border: 'none', borderRadius: '6px', cursor: 'pointer', transition: '0.2s' }} title="Delete"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {projects.length === 0 && (
                <tr>
                  <td colSpan="5" style={{ padding: '48px', textAlign: 'center', color: '#64748B', fontSize: '14px' }}>
                    No gallery projects found. Click "Add Project" to create one.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  

  

  const renderHomeCMS = () => {
    const hf = (label, key, multiline = false, rows = 2) => (
      <div>
        <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#334155', marginBottom: '5px' }}>{label}</label>
        {multiline
          ? <textarea rows={rows} value={homeForm.data[key]} onChange={e => homeForm.setData(key, e.target.value)} style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px', resize: 'vertical', outline: 'none', fontFamily: 'inherit' }} />
          : <input type="text" value={homeForm.data[key]} onChange={e => homeForm.setData(key, e.target.value)} style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px', outline: 'none' }} />
        }
      </div>
    );
    const card = (title, children) => (
      <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0', padding: '24px', marginBottom: '20px' }}>
        <h3 style={{ fontSize: '15px', fontWeight: '800', color: '#0F172A', marginBottom: '18px', paddingBottom: '10px', borderBottom: '1px solid #F1F5F9' }}>{title}</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>{children}</div>
      </div>
    );
    const rowItem = (n, prefix, label) => (
      <div key={n} style={{ padding: '14px', backgroundColor: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <span style={{ fontSize: '12px', fontWeight: '800', color: '#64748B' }}>{label} {n}</span>
        <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr 2fr', gap: '10px' }}>
          {hf('Icon Name', `${prefix}${n}_icon`)}
          {hf('Title', `${prefix}${n}_title`)}
          {hf('Description', `${prefix}${n}_desc`, true, 2)}
        </div>
      </div>
    );

    return (
      <div style={{ animation: 'fadeIn 0.3s ease-out', maxWidth: '920px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
          <div>
            <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#0F172A', letterSpacing: '-0.5px' }}>Home Page Editor</h2>
            <p style={{ color: '#64748B', fontSize: '14px', marginTop: '4px' }}>Edit every section of your homepage. Services, Gallery & Reviews are managed in their own CMS tabs.</p>
          </div>
          {homeForm.recentlySuccessful && (
            <span style={{ fontSize: '13px', color: '#22C55E', fontWeight: '700', backgroundColor: '#F0FDF4', padding: '8px 16px', borderRadius: '8px', border: '1px solid #BBF7D0' }}>Saved!</span>
          )}
        </div>

        {/* Hero Slider Images */}
        <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0', padding: '24px', marginBottom: '20px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: '800', color: '#0F172A', marginBottom: '18px', paddingBottom: '10px', borderBottom: '1px solid #F1F5F9' }}>
            Hero Background Slider Images
          </h3>
          <form onSubmit={handleHeroUpload}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#334155', marginBottom: '8px' }}>Upload Images (select multiple at once)</label>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={e => heroUploadForm.setData('images', e.target.files)}
                style={{ flex: 1, padding: '9px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px' }}
              />
              <button type="submit" disabled={heroUploadForm.processing || !heroUploadForm.data.images} style={{ padding: '9px 18px', backgroundColor: 'var(--color-secondary)', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: '700', fontSize: '13px', cursor: 'pointer', whiteSpace: 'nowrap' }}>
                Upload
              </button>
            </div>
          </form>
          {heroImages.length === 0 && <p style={{ color: '#94A3B8', fontSize: '13px', marginTop: '16px', textAlign: 'center' }}>No slider images yet. Upload your first one above!</p>}
          {heroImages.length > 0 && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '12px', marginTop: '20px' }}>
              {heroImages.map((img, idx) => (
                <div key={img.id} style={{ position: 'relative', borderRadius: '10px', overflow: 'hidden', border: '2px solid #E2E8F0' }}>
                  <img src={img.image} alt="Hero slide" style={{ width: '100%', height: '110px', objectFit: 'cover', display: 'block' }} />
                  <div style={{ position: 'absolute', top: '4px', right: '4px', display: 'flex', gap: '4px' }}>
                    <button onClick={() => toggleHeroImage(img.id)} style={{ width: '24px', height: '24px', borderRadius: '50%', border: 'none', cursor: 'pointer', backgroundColor: img.status === 'Active' ? '#22C55E' : '#94A3B8', fontSize: '10px', color: '#fff', fontWeight: '700' }}>{img.status === 'Active' ? '?' : '?'}</button>
                    <button onClick={() => deleteHeroImage(img.id)} style={{ width: '24px', height: '24px', borderRadius: '50%', border: 'none', cursor: 'pointer', backgroundColor: '#EF4444', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><X size={12} /></button>
                  </div>
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: 'rgba(0,0,0,0.55)', color: '#fff', fontSize: '11px', fontWeight: '700', padding: '4px 8px' }}>
                    #{idx + 1} {img.status === 'Inactive' ? '(Hidden)' : ''}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <form onSubmit={handleHomeSubmit}>
          {/* Hero Section */}
          {card('Section 1 � Hero Banner', <>
            {hf('Headline (Main Heading)', 'home_hero_headline')}
            {hf('Subtitle', 'home_hero_subtitle', true, 2)}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {hf('Primary Button Text', 'home_hero_btn1')}
              {hf('Secondary Button Text', 'home_hero_btn2')}
            </div>

          </>)}

          {/* Trust Features Bar (4 cards) */}
          {card('Section 2 � Trust Features Bar (4 Cards)', <>
            {[1,2,3,4].map(n => rowItem(n, 'home_feature', 'Feature Card'))}
          </>)}

          {/* About Intro */}
          {card('Section 3 � About Intro Section', <>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '12px' }}>
              {hf('Badge Text', 'home_about_badge')}
              {hf('Section Title', 'home_about_title')}
            </div>
            {hf('Description', 'home_about_desc', true, 3)}
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#64748B', marginBottom: '8px' }}>4 Commitment Checkmarks</label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                {hf('Commitment 1', 'home_about_commit1')}
                {hf('Commitment 2', 'home_about_commit2')}
                {hf('Commitment 3', 'home_about_commit3')}
                {hf('Commitment 4', 'home_about_commit4')}
              </div>
            </div>
          </>)}

          {/* Why Choose Us (6 points) */}
          {card('Section 4 � Why Choose Us (6 Points)', <>
            {[1,2,3,4,5,6].map(n => rowItem(n, 'home_why', 'Point'))}
          </>)}

          {/* Process Steps (4) */}
          {card('Section 5 � Our 4-Step Process', <>
            {[1,2,3,4].map(n => (
              <div key={n} style={{ padding: '14px', backgroundColor: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0', display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'var(--color-secondary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900', fontSize: '13px', flexShrink: 0 }}>{n < 10 ? '0' + n : n}</div>
                <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '10px' }}>
                  {hf('Step Title', `home_step${n}_title`)}
                  {hf('Step Description', `home_step${n}_desc`, true, 2)}
                </div>
              </div>
            ))}
          </>)}

          {/* Service Area Section */}
          {card('Section 5.5 - Service Area', <>
            <div style={{ display: 'grid', gap: '16px' }}>
              {hf('Section Title', 'service_area_title')}
              {hf('Section Description', 'service_area_desc', true, 3)}
              {hf('Coverage Locations (Comma Separated)', 'service_area_locations')}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                {hf('Blue Card Title', 'service_area_card_title')}
                {hf('Blue Card Location Pin', 'service_area_card_pin')}
              </div>
              {hf('Blue Card Description', 'service_area_card_desc', true, 2)}
            </div>
          </>)}

          {/* FAQs (4) */}
          {card('Section 6 � FAQs (4 Questions)', <>
            {[1,2,3,4].map(n => (
              <div key={n} style={{ padding: '14px', backgroundColor: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <span style={{ fontSize: '12px', fontWeight: '800', color: '#64748B' }}>FAQ {n}</span>
                {hf('Question', `home_faq${n}_q`)}
                {hf('Answer', `home_faq${n}_a`, true, 3)}
              </div>
            ))}
          </>)}

          <div style={{ position: 'sticky', bottom: 0, backgroundColor: '#F8FAFC', borderTop: '1px solid #E2E8F0', padding: '16px 0', display: 'flex', justifyContent: 'flex-end' }}>
            <button type="submit" disabled={homeForm.processing} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 28px', backgroundColor: 'var(--color-primary)', color: '#FFF', border: 'none', borderRadius: '10px', fontWeight: '800', fontSize: '15px', cursor: 'pointer', boxShadow: 'var(--shadow-primary)' }}>
              <Save size={18} />
              {homeForm.processing ? 'Saving...' : 'Save All Changes'}
            </button>
          </div>
        </form>
      </div>
    );
  };

  const renderAboutCMS = () => {
    const imgBox = (key, label) => (
      <div>
        <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#334155', marginBottom: '8px' }}>{label}</label>
        <div
          onClick={() => document.getElementById('about-img-' + key).click()}
          style={{ border: '2px dashed #CBD5E1', borderRadius: '10px', overflow: 'hidden', cursor: 'pointer', backgroundColor: '#F8FAFC' }}
        >
          {aboutImgPreviews[key] ? (
            <div style={{ position: 'relative' }}>
              <img src={aboutImgPreviews[key]} alt={label} style={{ width: '100%', height: '160px', objectFit: 'cover', display: 'block' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0, transition: '0.2s' }}
                   onMouseOver={e => e.currentTarget.style.opacity = 1} onMouseOut={e => e.currentTarget.style.opacity = 0}>
                <span style={{ color: '#fff', fontWeight: '700', fontSize: '13px', background: 'rgba(0,0,0,0.5)', padding: '6px 14px', borderRadius: '6px' }}>Change Image</span>
              </div>
            </div>
          ) : (
            <div style={{ padding: '28px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', color: '#94A3B8' }}>
              <ImageIcon size={28} />
              <span style={{ fontSize: '13px', fontWeight: '600' }}>Click to upload</span>
            </div>
          )}
        </div>
        <input type="file" id={'about-img-' + key} accept="image/*" style={{ display: 'none' }} onChange={e => e.target.files[0] && handleAboutImage(key, e.target.files[0])} />
      </div>
    );

    const field = (label, key, multiline = false, rows = 2) => (
      <div>
        <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#334155', marginBottom: '5px' }}>{label}</label>
        {multiline
          ? <textarea rows={rows} value={aboutForm.data[key]} onChange={e => aboutForm.setData(key, e.target.value)} style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px', resize: 'vertical', outline: 'none', fontFamily: 'inherit' }} />
          : <input type="text" value={aboutForm.data[key]} onChange={e => aboutForm.setData(key, e.target.value)} style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px', outline: 'none' }} />
        }
      </div>
    );

    const sectionCard = (title, children) => (
      <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0', padding: '28px', marginBottom: '24px' }}>
        <h3 style={{ fontSize: '15px', fontWeight: '800', color: '#0F172A', marginBottom: '20px', paddingBottom: '12px', borderBottom: '1px solid #F1F5F9' }}>{title}</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>{children}</div>
      </div>
    );

    return (
      <div style={{ animation: 'fadeIn 0.3s ease-out', maxWidth: '900px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
          <div>
            <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#0F172A', letterSpacing: '-0.5px' }}>About Page Editor</h2>
            <p style={{ color: '#64748B', fontSize: '14px', marginTop: '4px' }}>Edit every section of your About page from here.</p>
          </div>
          {aboutForm.recentlySuccessful && (
            <span style={{ fontSize: '13px', color: '#22C55E', fontWeight: '700', backgroundColor: '#F0FDF4', padding: '8px 16px', borderRadius: '8px', border: '1px solid #BBF7D0' }}>Saved!</span>
          )}
        </div>

        <form onSubmit={handleAboutSubmit}>
          {sectionCard('Section 1 - Hero Banner', <>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              {field('Hero Title', 'about_hero_title')}
              {field('Hero Subtitle', 'about_hero_subtitle')}
            </div>
            {imgBox('about_hero_bg', 'Hero Background Image')}
          </>)}

          {sectionCard('Section 2 - Who We Are', <>
            {field('Section Heading', 'about_who_heading')}
            {field('Paragraph 1', 'about_who_para1', true, 3)}
            {field('Paragraph 2', 'about_who_para2', true, 3)}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {field('Highlight Pill 1', 'about_who_highlight1')}
              {field('Highlight Pill 2', 'about_who_highlight2')}
              {field('Highlight Pill 3', 'about_who_highlight3')}
              {field('Highlight Pill 4', 'about_who_highlight4')}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              {imgBox('about_main_image', 'Main Image (left large)')}
              {imgBox('about_secondary_image', 'Secondary Image (overlapping)')}
            </div>
          </>)}

          {sectionCard('Section 3 - Mission & Vision', <>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {field('Mission Title', 'about_mission_title')}
                {field('Mission Text', 'about_mission_text', true, 4)}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {field('Vision Title', 'about_vision_title')}
                {field('Vision Text', 'about_vision_text', true, 4)}
              </div>
            </div>
          </>)}

          {sectionCard('Section 4 - Core Values (4 Cards)', <>
            {[1,2,3,4].map(n => (
              <div key={n} style={{ padding: '16px', backgroundColor: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <span style={{ fontSize: '12px', fontWeight: '800', color: '#64748B' }}>Value Card {n}</span>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '12px' }}>
                  {field(`Title`, `about_value${n}_title`)}
                  {field(`Description`, `about_value${n}_desc`, true, 2)}
                </div>
              </div>
            ))}
          </>)}

          {sectionCard('Section 5 - Our Approach (4 Steps)', <>
            {[1,2,3,4].map(n => (
              <div key={n} style={{ padding: '16px', backgroundColor: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0', display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'var(--color-primary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: '900', flexShrink: 0 }}>0{n}</div>
                <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '12px' }}>
                  {field(`Title`, `about_approach${n}_title`)}
                  {field(`Description`, `about_approach${n}_desc`, true, 2)}
                </div>
              </div>
            ))}
          </>)}

          {sectionCard('Section 6 - Quality Commitments (4 Items)', <>
            {[1,2,3,4].map(n => (
              <div key={n} style={{ padding: '16px', backgroundColor: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <span style={{ fontSize: '12px', fontWeight: '800', color: '#64748B' }}>Quality Item {n}</span>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '12px' }}>
                  {field(`Title`, `about_quality${n}_title`)}
                  {field(`Description`, `about_quality${n}_desc`, true, 2)}
                </div>
              </div>
            ))}
          </>)}

          <div style={{ position: 'sticky', bottom: 0, backgroundColor: '#F8FAFC', borderTop: '1px solid #E2E8F0', padding: '16px 0', display: 'flex', justifyContent: 'flex-end' }}>
            <button type="submit" disabled={aboutForm.processing} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 28px', backgroundColor: 'var(--color-primary)', color: '#FFF', border: 'none', borderRadius: '10px', fontWeight: '800', fontSize: '15px', cursor: 'pointer', boxShadow: 'var(--shadow-primary)' }}>
              <Save size={18} />
              {aboutForm.processing ? 'Saving...' : 'Save All Changes'}
            </button>
          </div>
        </form>
      </div>
    );
  };

  const invoiceStatusColors = {
    Unpaid: { bg: '#FFFBEB', color: '#D97706' },
    Paid: { bg: '#F0FDF4', color: '#22C55E' },
    'Partially Paid': { bg: '#EFF6FF', color: '#2563EB' },
    Overdue: { bg: '#FEF2F2', color: '#EF4444' }
  };

  const isInvoiceOverdue = (invoice) => {
    if (!invoice.due_date || invoice.status === 'Paid') return false;
    return new Date(invoice.due_date) < new Date(new Date().toDateString());
  };

  const getInvoiceDisplayStatus = (invoice) => isInvoiceOverdue(invoice) ? 'Overdue' : (invoice.status || 'Unpaid');

  const renderInvoicesCMS = () => {
    if (invoiceView === 'edit') {
      const activeInvoice = invoices.find(i => i.id === activeInvoiceId) || null;
      return (
        <InvoiceGenerator
          invoice={activeInvoice}
          customers={customers}
          settings={settings}
          onBack={() => { setInvoiceView('list'); setActiveInvoiceId(null); }}
        />
      );
    }

    const filteredInvoices = invoices.filter(inv => {
      const matchesSearch = !invoiceSearch || [inv.invoice_number, inv.customer?.name].filter(Boolean).some(v => v.toLowerCase().includes(invoiceSearch.toLowerCase()));
      const displayStatus = getInvoiceDisplayStatus(inv);
      const matchesStatus = invoiceStatusFilter === 'All' || displayStatus === invoiceStatusFilter;
      return matchesSearch && matchesStatus;
    });

    const totalInvoices = invoices.length;
    const unpaidInvoices = invoices.filter(i => getInvoiceDisplayStatus(i) === 'Unpaid');
    const paidInvoices = invoices.filter(i => getInvoiceDisplayStatus(i) === 'Paid');
    const overdueInvoices = invoices.filter(i => getInvoiceDisplayStatus(i) === 'Overdue');
    const unpaidSum = unpaidInvoices.reduce((s, i) => s + parseFloat(i.due || 0), 0);
    const paidSum = paidInvoices.reduce((s, i) => s + parseFloat(i.total || 0), 0);

    const statCard = (label, value, sub, color) => (
      <div style={{ flex: 1, padding: '18px 20px', backgroundColor: '#FFFFFF', borderRadius: '14px', border: '1px solid #E2E8F0' }}>
        <div style={{ fontSize: '12px', color: '#64748B', fontWeight: '700', textTransform: 'uppercase', marginBottom: '6px' }}>{label}</div>
        <div style={{ fontSize: '26px', fontWeight: '800', color: color || '#0F172A' }}>{value}</div>
        {sub && <div style={{ fontSize: '12px', color: '#94A3B8', fontWeight: '600', marginTop: '4px' }}>{sub}</div>}
      </div>
    );

    const handleDelete = (id) => {
      if (confirm('Are you sure you want to delete this invoice? This cannot be undone.')) {
        router.delete(`/dashboard/invoices/${id}`, { preserveScroll: true });
      }
    };

    const handleMarkPaid = (id) => {
      router.post(`/dashboard/invoices/${id}/status`, { status: 'Paid' }, { preserveScroll: true });
    };

    return (
      <div className="admin-panel-section" style={{ height: 'calc(100vh - 120px)', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexShrink: 0 }}>
          <div>
            <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#0F172A', margin: 0 }}>Invoices</h2>
            <p style={{ color: '#64748B', fontSize: '14px', marginTop: '4px' }}>Create, track and manage customer invoices.</p>
          </div>
          <button
            onClick={() => { setActiveInvoiceId(null); setInvoiceView('edit'); }}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', backgroundColor: 'var(--color-secondary)', color: '#FFF', border: 'none', borderRadius: '8px', fontWeight: '700', fontSize: '14px', cursor: 'pointer', transition: '0.2s', boxShadow: 'var(--shadow-sm)' }}
          >
            <Plus size={18} /> New Invoice
          </button>
        </div>

        {/* Stats row */}
        <div style={{ display: 'flex', gap: '16px', marginBottom: '20px', flexShrink: 0 }}>
          {statCard('Total Invoices', totalInvoices)}
          {statCard('Unpaid', unpaidInvoices.length, `£${unpaidSum.toFixed(2)} due`, '#D97706')}
          {statCard('Paid', paidInvoices.length, `£${paidSum.toFixed(2)} collected`, '#22C55E')}
          {statCard('Overdue', overdueInvoices.length, null, '#EF4444')}
        </div>

        <div style={{ flex: 1, backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0', overflow: 'hidden', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
          <div style={{ padding: '16px', borderBottom: '1px solid #E2E8F0', display: 'flex', gap: '10px' }}>
            <div style={{ position: 'relative', flex: 1 }}>
              <Search size={15} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
              <input
                type="text"
                placeholder="Search by invoice number or customer name..."
                value={invoiceSearch}
                onChange={(e) => setInvoiceSearch(e.target.value)}
                style={{ width: '100%', padding: '10px 14px 10px 36px', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '13px', outline: 'none' }}
              />
            </div>
            <select
              value={invoiceStatusFilter}
              onChange={(e) => setInvoiceStatusFilter(e.target.value)}
              style={{ padding: '9px 12px', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '13px', outline: 'none', backgroundColor: '#FFF', color: '#334155' }}
            >
              <option value="All">All Statuses</option>
              <option value="Unpaid">Unpaid</option>
              <option value="Paid">Paid</option>
              <option value="Partially Paid">Partially Paid</option>
              <option value="Overdue">Overdue</option>
            </select>
          </div>

          <div style={{ flex: 1, overflowY: 'auto' }}>
            {filteredInvoices.length === 0 ? (
              <div style={{ padding: '60px 20px', textAlign: 'center', color: '#94A3B8', fontSize: '13px' }}>
                No invoices found.
              </div>
            ) : (
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
                    {['Invoice #', 'Customer', 'Date', 'Due Date', 'Total', 'Status', ''].map(h => (
                      <th key={h} style={{ textAlign: 'left', padding: '12px 16px', fontSize: '11px', fontWeight: '800', color: '#64748B', textTransform: 'uppercase' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredInvoices.map(inv => {
                    const displayStatus = getInvoiceDisplayStatus(inv);
                    const statusStyle = invoiceStatusColors[displayStatus] || invoiceStatusColors.Unpaid;
                    return (
                      <tr
                        key={inv.id}
                        onClick={() => { setActiveInvoiceId(inv.id); setInvoiceView('edit'); }}
                        style={{ borderBottom: '1px solid #F1F5F9', cursor: 'pointer' }}
                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#F8FAFC'}
                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                      >
                        <td style={{ padding: '14px 16px', fontSize: '13px', fontWeight: '800', color: '#0F172A' }}>{inv.invoice_number}</td>
                        <td style={{ padding: '14px 16px', fontSize: '13px', color: '#334155' }}>{inv.customer?.name || 'N/A'}</td>
                        <td style={{ padding: '14px 16px', fontSize: '13px', color: '#64748B' }}>{inv.invoice_date ? new Date(inv.invoice_date).toLocaleDateString('en-GB') : '-'}</td>
                        <td style={{ padding: '14px 16px', fontSize: '13px', color: '#64748B' }}>{inv.due_date ? new Date(inv.due_date).toLocaleDateString('en-GB') : '-'}</td>
                        <td style={{ padding: '14px 16px', fontSize: '13px', fontWeight: '700', color: '#0F172A' }}>£{parseFloat(inv.total || 0).toFixed(2)}</td>
                        <td style={{ padding: '14px 16px' }}>
                          <span style={{ fontSize: '11px', padding: '5px 10px', borderRadius: '10px', fontWeight: '700', backgroundColor: statusStyle.bg, color: statusStyle.color }}>
                            {displayStatus}
                          </span>
                        </td>
                        <td style={{ padding: '14px 16px', textAlign: 'right' }} onClick={(e) => e.stopPropagation()}>
                          <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                            {displayStatus !== 'Paid' && (
                              <button
                                onClick={() => handleMarkPaid(inv.id)}
                                title="Mark as Paid"
                                style={{ padding: '6px 10px', fontSize: '11px', fontWeight: '700', color: '#22C55E', backgroundColor: '#F0FDF4', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
                              >
                                Mark Paid
                              </button>
                            )}
                            <button
                              onClick={() => handleDelete(inv.id)}
                              title="Delete"
                              style={{ padding: '6px', color: '#EF4444', backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    );
  };

  const workProjectStatusColors = {
    Active: { bg: '#EFF6FF', color: '#3B82F6' },
    Completed: { bg: '#F0FDF4', color: '#22C55E' },
    'On Hold': { bg: '#FFFBEB', color: '#D97706' },
  };

  const renderWorkProjectsCMS = () => {
    const selectedWorkProject = workProjects.find(p => p.id === selectedWorkProjectId) || null;

    const totalProjects = workProjects.length;
    const activeProjects = workProjects.filter(p => p.status === 'Active').length;
    const completedProjects = workProjects.filter(p => p.status === 'Completed').length;
    const totalNetProfit = workProjects.reduce((s, p) => s + parseFloat(p.net_profit || 0), 0);

    const statCard = (label, value, color) => (
      <div style={{ flex: 1, padding: '18px 20px', backgroundColor: '#FFFFFF', borderRadius: '14px', border: '1px solid #E2E8F0' }}>
        <div style={{ fontSize: '12px', color: '#64748B', fontWeight: '700', textTransform: 'uppercase', marginBottom: '6px' }}>{label}</div>
        <div style={{ fontSize: '26px', fontWeight: '800', color: color || '#0F172A' }}>{value}</div>
      </div>
    );

    return (
      <div className="admin-panel-section" style={{ height: 'calc(100vh - 120px)', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexShrink: 0 }}>
          <div>
            <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#0F172A', margin: 0 }}>Projects</h2>
            <p style={{ color: '#64748B', fontSize: '14px', marginTop: '4px' }}>Track jobs from accepted quotes through completion, with income &amp; expense rollups.</p>
          </div>
          <button
            onClick={openAddWorkProjectModal}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', backgroundColor: 'var(--color-secondary)', color: '#FFF', border: 'none', borderRadius: '8px', fontWeight: '700', fontSize: '14px', cursor: 'pointer', transition: '0.2s', boxShadow: 'var(--shadow-sm)' }}
          >
            <Plus size={18} /> New Project
          </button>
        </div>

        {/* Stats row */}
        <div style={{ display: 'flex', gap: '16px', marginBottom: '20px', flexShrink: 0 }}>
          {statCard('Total Projects', totalProjects)}
          {statCard('Active', activeProjects, '#3B82F6')}
          {statCard('Completed', completedProjects, '#22C55E')}
          {statCard('Total Net Profit', `£${totalNetProfit.toFixed(2)}`, totalNetProfit >= 0 ? '#22C55E' : '#EF4444')}
        </div>

        <div style={{ flex: 1, backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0', overflow: 'hidden', minHeight: 0, display: 'flex', flexDirection: 'column' }}>
          <div style={{ flex: 1, overflowY: 'auto' }}>
            {workProjects.length === 0 ? (
              <div style={{ padding: '40px 20px', textAlign: 'center', color: '#94A3B8', fontSize: '13px' }}>
                No projects yet. Projects are created automatically when an invoice is generated from an accepted quote, or you can add one manually.
              </div>
            ) : (
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '12px' }}>
                <thead>
                  <tr>
                    {['Title', 'Customer', 'Status', 'Net Profit', ''].map(h => (
                      <th key={h} style={{ position: 'sticky', top: 0, zIndex: 1, padding: '10px 12px', fontSize: '11px', fontWeight: '700', color: '#64748B', backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0', borderRight: '1px solid #E2E8F0', whiteSpace: 'nowrap' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {workProjects.map((wp, idx) => {
                    const statusStyle = workProjectStatusColors[wp.status] || workProjectStatusColors.Active;
                    const baseBg = idx % 2 === 0 ? '#FFFFFF' : '#F8FAFC';
                    const netProfit = parseFloat(wp.net_profit || 0);
                    return (
                      <tr
                        key={wp.id}
                        onClick={() => setSelectedWorkProjectId(wp.id)}
                        style={{ cursor: 'pointer', backgroundColor: baseBg, borderLeft: '4px solid transparent' }}
                        onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#EEF2F7'; }}
                        onMouseOut={(e) => { e.currentTarget.style.backgroundColor = baseBg; }}
                      >
                        <td style={{ padding: '10px 12px', borderBottom: '1px solid #E2E8F0', borderRight: '1px solid #E2E8F0', fontWeight: '700', color: '#0F172A', maxWidth: '180px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {wp.title}
                        </td>
                        <td style={{ padding: '10px 12px', borderBottom: '1px solid #E2E8F0', borderRight: '1px solid #E2E8F0', color: '#475569', whiteSpace: 'nowrap' }}>
                          {wp.customer?.name || '—'}
                        </td>
                        <td style={{ padding: '10px 12px', borderBottom: '1px solid #E2E8F0', borderRight: '1px solid #E2E8F0' }}>
                          <select
                            value={wp.status}
                            onClick={(e) => e.stopPropagation()}
                            onChange={(e) => updateWorkProjectStatus(wp.id, e.target.value)}
                            style={{ fontSize: '10px', padding: '3px 6px', borderRadius: '8px', fontWeight: '700', backgroundColor: statusStyle.bg, color: statusStyle.color, border: 'none', cursor: 'pointer', outline: 'none' }}
                          >
                            <option value="Active">Active</option>
                            <option value="Completed">Completed</option>
                            <option value="On Hold">On Hold</option>
                          </select>
                        </td>
                        <td style={{ padding: '10px 12px', borderBottom: '1px solid #E2E8F0', borderRight: '1px solid #E2E8F0', fontWeight: '800', color: netProfit >= 0 ? '#22C55E' : '#EF4444', whiteSpace: 'nowrap' }}>
                          £{netProfit.toFixed(2)}
                        </td>
                        <td style={{ padding: '8px 12px', borderBottom: '1px solid #E2E8F0', whiteSpace: 'nowrap', textAlign: 'right' }} onClick={(e) => e.stopPropagation()}>
                          <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
                            <button onClick={() => setSelectedWorkProjectId(wp.id)} style={{ padding: '6px', backgroundColor: '#F1F5F9', color: '#64748B', border: 'none', borderRadius: '6px', cursor: 'pointer', display: 'flex' }} title="View"><Eye size={14} /></button>
                            <button onClick={() => { setSelectedWorkProjectId(wp.id); setTimeout(() => window.print(), 250); }} style={{ padding: '6px', backgroundColor: '#F1F5F9', color: '#475569', border: 'none', borderRadius: '6px', cursor: 'pointer', display: 'flex' }} title="Print"><Printer size={14} /></button>
                            <button onClick={() => openEditWorkProjectModal(wp)} style={{ padding: '6px', backgroundColor: '#F1F5F9', color: '#3B82F6', border: 'none', borderRadius: '6px', cursor: 'pointer', display: 'flex' }} title="Edit"><Edit2 size={14} /></button>
                            <button onClick={() => deleteWorkProject(wp.id)} style={{ padding: '6px', backgroundColor: '#FEF2F2', color: '#EF4444', border: 'none', borderRadius: '6px', cursor: 'pointer', display: 'flex' }} title="Delete"><Trash2 size={14} /></button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Project View/Print Modal */}
        {selectedWorkProject && (
          <div className="no-print" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '20px' }}>
            <div className="print-area" style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', width: '100%', maxWidth: '760px', maxHeight: '90vh', overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)' }}>
              <div style={{ padding: '24px 32px', overflowY: 'auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                  <div>
                    <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#0F172A', margin: '0 0 4px 0' }}>{selectedWorkProject.title}</h3>
                    <div style={{ fontSize: '13px', color: '#64748B' }}>
                      {selectedWorkProject.customer?.name || 'No customer'} · Started {selectedWorkProject.started_at ? new Date(selectedWorkProject.started_at).toLocaleDateString('en-GB') : '—'}
                    </div>
                  </div>
                  <div className="no-print" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '11px', padding: '5px 10px', borderRadius: '10px', fontWeight: '700', backgroundColor: (workProjectStatusColors[selectedWorkProject.status] || workProjectStatusColors.Active).bg, color: (workProjectStatusColors[selectedWorkProject.status] || workProjectStatusColors.Active).color }}>
                      {selectedWorkProject.status}
                    </span>
                    <button onClick={() => window.print()} style={{ padding: '8px', backgroundColor: '#F1F5F9', color: '#475569', border: 'none', borderRadius: '8px', cursor: 'pointer' }} title="Print"><Printer size={16} /></button>
                    <button onClick={() => openEditWorkProjectModal(selectedWorkProject)} style={{ padding: '8px', backgroundColor: '#F1F5F9', color: '#3B82F6', border: 'none', borderRadius: '8px', cursor: 'pointer' }} title="Edit"><Edit2 size={16} /></button>
                    <button onClick={() => setSelectedWorkProjectId(null)} style={{ padding: '8px', backgroundColor: '#F1F5F9', color: '#64748B', border: 'none', borderRadius: '8px', cursor: 'pointer' }} title="Close"><X size={16} /></button>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '28px' }}>
                  <div style={{ padding: '16px', border: '1px solid #E2E8F0', borderRadius: '10px', backgroundColor: '#F8FAFC' }}>
                    <span style={{ fontSize: '11px', color: '#94A3B8', textTransform: 'uppercase', fontWeight: '700' }}>Income</span>
                    <div style={{ fontSize: '18px', fontWeight: '800', color: '#22C55E' }}>£{parseFloat(selectedWorkProject.total_income || 0).toFixed(2)}</div>
                  </div>
                  <div style={{ padding: '16px', border: '1px solid #E2E8F0', borderRadius: '10px', backgroundColor: '#F8FAFC' }}>
                    <span style={{ fontSize: '11px', color: '#94A3B8', textTransform: 'uppercase', fontWeight: '700' }}>Expense</span>
                    <div style={{ fontSize: '18px', fontWeight: '800', color: '#EF4444' }}>£{parseFloat(selectedWorkProject.total_expense || 0).toFixed(2)}</div>
                  </div>
                  <div style={{ padding: '16px', border: '1px solid #E2E8F0', borderRadius: '10px', backgroundColor: '#F8FAFC' }}>
                    <span style={{ fontSize: '11px', color: '#94A3B8', textTransform: 'uppercase', fontWeight: '700' }}>Net Profit</span>
                    <div style={{ fontSize: '18px', fontWeight: '800', color: parseFloat(selectedWorkProject.net_profit || 0) >= 0 ? '#22C55E' : '#EF4444' }}>£{parseFloat(selectedWorkProject.net_profit || 0).toFixed(2)}</div>
                  </div>
                </div>

                {selectedWorkProject.notes && (
                  <div style={{ marginBottom: '28px', fontSize: '14px', color: '#334155', whiteSpace: 'pre-wrap', backgroundColor: '#FAFAFA', border: '1px solid #F1F5F9', borderRadius: '10px', padding: '12px 14px' }}>
                    {selectedWorkProject.notes}
                  </div>
                )}

                <h4 style={{ fontSize: '13px', color: '#94A3B8', textTransform: 'uppercase', fontWeight: '700', marginBottom: '12px', borderBottom: '1px solid #F1F5F9', paddingBottom: '8px' }}>
                  Invoices ({(selectedWorkProject.invoices || []).length})
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '28px' }}>
                  {(selectedWorkProject.invoices || []).length === 0 ? (
                    <div style={{ fontSize: '14px', color: '#94A3B8' }}>No invoices linked yet.</div>
                  ) : (
                    selectedWorkProject.invoices.map(inv => (
                      <div key={inv.id} style={{ padding: '12px 14px', border: '1px solid #E2E8F0', borderRadius: '10px', backgroundColor: '#FFF', display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ fontSize: '13px', fontWeight: '700', color: '#0F172A' }}>{inv.invoice_number}</span>
                        <span style={{ fontSize: '12px', color: '#64748B' }}>{inv.status}</span>
                        <span style={{ fontSize: '13px', fontWeight: '700', color: '#0F172A' }}>£{parseFloat(inv.total || 0).toFixed(2)}</span>
                      </div>
                    ))
                  )}
                </div>

                <h4 style={{ fontSize: '13px', color: '#94A3B8', textTransform: 'uppercase', fontWeight: '700', marginBottom: '12px', borderBottom: '1px solid #F1F5F9', paddingBottom: '8px' }}>
                  Transactions ({(selectedWorkProject.transactions || []).length})
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {(selectedWorkProject.transactions || []).length === 0 ? (
                    <div style={{ fontSize: '14px', color: '#94A3B8' }}>No transactions linked yet.</div>
                  ) : (
                    selectedWorkProject.transactions.map(t => (
                      <div key={t.id} style={{ padding: '12px 14px', border: '1px solid #E2E8F0', borderRadius: '10px', backgroundColor: '#FFF', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '12px', color: '#64748B' }}>{t.date ? new Date(t.date).toLocaleDateString('en-GB') : ''}</span>
                        <span style={{ fontSize: '12px', color: '#334155' }}>{t.category}</span>
                        <span style={{ fontSize: '13px', fontWeight: '700', color: t.type === 'income' ? '#22C55E' : '#EF4444' }}>
                          {t.type === 'income' ? '+' : '-'}£{parseFloat(t.amount || 0).toFixed(2)}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        <style>{`
          @media print {
            body * {
              visibility: hidden;
            }
            .print-area, .print-area * {
              visibility: visible;
            }
            .print-area {
              position: fixed !important;
              top: 0 !important;
              left: 0 !important;
              width: 100% !important;
              max-width: 100% !important;
              max-height: none !important;
              box-shadow: none !important;
              border-radius: 0 !important;
            }
            .no-print {
              display: none !important;
            }
          }
        `}</style>

        {/* Work Project Modal */}
        {isWorkProjectModalOpen && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '20px' }}>
            <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', width: '100%', maxWidth: '520px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)', overflow: 'hidden', display: 'flex', flexDirection: 'column', maxHeight: '90vh' }}>
              <div style={{ padding: '20px 24px', borderBottom: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '800', color: '#0F172A' }}>{editingWorkProject ? 'Edit Project' : 'New Project'}</h3>
                <button onClick={() => setIsWorkProjectModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748B' }}><X size={20} /></button>
              </div>
              <form onSubmit={handleWorkProjectSubmit} style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
                <div style={{ padding: '24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>Title *</label>
                    <input type="text" required value={workProjectForm.data.title} onChange={(e) => workProjectForm.setData('title', e.target.value)}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '14px', outline: 'none' }} />
                    {workProjectForm.errors.title && <div style={{ color: '#EF4444', fontSize: '12px', marginTop: '4px' }}>{workProjectForm.errors.title}</div>}
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>Customer *</label>
                    <select required value={workProjectForm.data.customer_id} onChange={(e) => workProjectForm.setData('customer_id', e.target.value)}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '14px', outline: 'none', backgroundColor: '#FFF' }}>
                      <option value="">Select a customer...</option>
                      {customers.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                    {workProjectForm.errors.customer_id && <div style={{ color: '#EF4444', fontSize: '12px', marginTop: '4px' }}>{workProjectForm.errors.customer_id}</div>}
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>Status</label>
                      <select value={workProjectForm.data.status} onChange={(e) => workProjectForm.setData('status', e.target.value)}
                        style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '14px', outline: 'none', backgroundColor: '#FFF' }}>
                        <option value="Active">Active</option>
                        <option value="Completed">Completed</option>
                        <option value="On Hold">On Hold</option>
                      </select>
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>Started</label>
                      <input type="date" value={workProjectForm.data.started_at} onChange={(e) => workProjectForm.setData('started_at', e.target.value)}
                        style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '14px', outline: 'none' }} />
                    </div>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>Notes</label>
                    <textarea rows={3} value={workProjectForm.data.notes} onChange={(e) => workProjectForm.setData('notes', e.target.value)}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '14px', outline: 'none', resize: 'vertical', fontFamily: 'inherit' }} />
                  </div>
                </div>
                <div style={{ padding: '16px 24px', borderTop: '1px solid #E2E8F0', display: 'flex', justifyContent: 'flex-end', gap: '12px', flexShrink: 0 }}>
                  <button type="button" onClick={() => setIsWorkProjectModalOpen(false)} style={{ padding: '10px 20px', backgroundColor: '#F1F5F9', color: '#475569', border: 'none', borderRadius: '8px', fontWeight: '700', fontSize: '14px', cursor: 'pointer' }}>Cancel</button>
                  <button type="submit" disabled={workProjectForm.processing} style={{ padding: '10px 20px', backgroundColor: 'var(--color-primary)', color: '#FFF', border: 'none', borderRadius: '8px', fontWeight: '700', fontSize: '14px', cursor: 'pointer', boxShadow: 'var(--shadow-primary)' }}>
                    {workProjectForm.processing ? 'Saving...' : 'Save Project'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderFinanceCMS = () => {
    const now = new Date();
    const isThisMonth = (d) => {
      const dd = new Date(d);
      return dd.getMonth() === now.getMonth() && dd.getFullYear() === now.getFullYear();
    };
    const monthTransactions = transactions.filter(t => isThisMonth(t.date));
    const monthIncome = monthTransactions.filter(t => t.type === 'income').reduce((s, t) => s + parseFloat(t.amount || 0), 0);
    const monthExpense = monthTransactions.filter(t => t.type === 'expense').reduce((s, t) => s + parseFloat(t.amount || 0), 0);
    const allTimeIncome = transactions.filter(t => t.type === 'income').reduce((s, t) => s + parseFloat(t.amount || 0), 0);
    const allTimeExpense = transactions.filter(t => t.type === 'expense').reduce((s, t) => s + parseFloat(t.amount || 0), 0);

    const filteredTransactions = transactions.filter(t => {
      const matchesSearch = !transactionSearch || [t.category, t.description, t.workProject?.title].filter(Boolean).some(v => v.toLowerCase().includes(transactionSearch.toLowerCase()));
      const matchesType = transactionTypeFilter === 'All' || t.type === transactionTypeFilter.toLowerCase();
      const matchesProject = transactionProjectFilter === 'All' || String(t.work_project_id) === String(transactionProjectFilter);
      const tDate = t.date ? new Date(t.date) : null;
      const matchesFrom = !transactionDateFrom || (tDate && tDate >= new Date(transactionDateFrom));
      const matchesTo = !transactionDateTo || (tDate && tDate <= new Date(transactionDateTo));
      return matchesSearch && matchesType && matchesProject && matchesFrom && matchesTo;
    });

    const sourceLabel = (t) => {
      if (t.source_type === 'manual') return 'Manual';
      if (t.source_type === 'invoice') return 'Invoice Payment';
      if (t.source_type === 'payroll') return 'Payroll';
      return t.source_type || '—';
    };

    const statCard = (label, value, color) => (
      <div style={{ flex: 1, padding: '18px 20px', backgroundColor: '#FFFFFF', borderRadius: '14px', border: '1px solid #E2E8F0' }}>
        <div style={{ fontSize: '12px', color: '#64748B', fontWeight: '700', textTransform: 'uppercase', marginBottom: '6px' }}>{label}</div>
        <div style={{ fontSize: '26px', fontWeight: '800', color: color || '#0F172A' }}>{value}</div>
      </div>
    );

    const categoryOptions = ['Materials', 'Labour', 'Transport', 'Tools', 'Marketing', 'Utilities', 'Invoice Payment', 'Payroll', 'Other'];

    return (
      <div className="admin-panel-section" style={{ height: 'calc(100vh - 120px)', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexShrink: 0 }}>
          <div>
            <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#0F172A', margin: 0 }}>Income &amp; Expenses</h2>
            <p style={{ color: '#64748B', fontSize: '14px', marginTop: '4px' }}>Track income and log business expenses, optionally linked to a project.</p>
          </div>
          <button onClick={openAddTransactionModal} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', backgroundColor: 'var(--color-secondary)', color: '#FFF', border: 'none', borderRadius: '8px', fontWeight: '700', fontSize: '14px', cursor: 'pointer', transition: '0.2s', boxShadow: 'var(--shadow-sm)' }}>
            <Plus size={18} /> Add Expense
          </button>
        </div>

        <div style={{ display: 'flex', gap: '16px', marginBottom: '20px', flexShrink: 0 }}>
          {statCard("This Month's Income", `£${monthIncome.toFixed(2)}`, '#22C55E')}
          {statCard("This Month's Expense", `£${monthExpense.toFixed(2)}`, '#EF4444')}
          {statCard("This Month's Net Profit", `£${(monthIncome - monthExpense).toFixed(2)}`, (monthIncome - monthExpense) >= 0 ? '#22C55E' : '#EF4444')}
          {statCard('All-Time Net Profit', `£${(allTimeIncome - allTimeExpense).toFixed(2)}`, (allTimeIncome - allTimeExpense) >= 0 ? '#22C55E' : '#EF4444')}
        </div>

        <div style={{ flex: 1, backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0', overflow: 'hidden', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
          <div style={{ padding: '16px', borderBottom: '1px solid #E2E8F0', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <div style={{ position: 'relative', flex: 1, minWidth: '200px' }}>
              <Search size={15} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
              <input type="text" placeholder="Search category, description, project..." value={transactionSearch} onChange={(e) => setTransactionSearch(e.target.value)}
                style={{ width: '100%', padding: '10px 14px 10px 36px', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '13px', outline: 'none' }} />
            </div>
            <select value={transactionTypeFilter} onChange={(e) => setTransactionTypeFilter(e.target.value)}
              style={{ padding: '9px 12px', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '13px', outline: 'none', backgroundColor: '#FFF', color: '#334155' }}>
              <option value="All">All Types</option>
              <option value="Income">Income</option>
              <option value="Expense">Expense</option>
            </select>
            <select value={transactionProjectFilter} onChange={(e) => setTransactionProjectFilter(e.target.value)}
              style={{ padding: '9px 12px', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '13px', outline: 'none', backgroundColor: '#FFF', color: '#334155' }}>
              <option value="All">All Projects</option>
              {workProjects.map(p => <option key={p.id} value={p.id}>{p.title}</option>)}
            </select>
            <input type="date" value={transactionDateFrom} onChange={(e) => setTransactionDateFrom(e.target.value)}
              style={{ padding: '9px 12px', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '13px', outline: 'none' }} />
            <input type="date" value={transactionDateTo} onChange={(e) => setTransactionDateTo(e.target.value)}
              style={{ padding: '9px 12px', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '13px', outline: 'none' }} />
          </div>

          <div style={{ flex: 1, overflowY: 'auto' }}>
            {filteredTransactions.length === 0 ? (
              <div style={{ padding: '60px 20px', textAlign: 'center', color: '#94A3B8', fontSize: '13px' }}>
                No transactions found.
              </div>
            ) : (
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
                    {['Date', 'Type', 'Category', 'Description', 'Project', 'Amount', 'Source', ''].map(h => (
                      <th key={h} style={{ textAlign: 'left', padding: '12px 16px', fontSize: '11px', fontWeight: '800', color: '#64748B', textTransform: 'uppercase' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredTransactions.map(t => {
                    const isManual = t.source_type === 'manual';
                    return (
                      <tr key={t.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                        <td style={{ padding: '14px 16px', fontSize: '13px', color: '#64748B' }}>{t.date ? new Date(t.date).toLocaleDateString('en-GB') : '-'}</td>
                        <td style={{ padding: '14px 16px' }}>
                          <span style={{ fontSize: '11px', padding: '5px 10px', borderRadius: '10px', fontWeight: '700', backgroundColor: t.type === 'income' ? '#F0FDF4' : '#FEF2F2', color: t.type === 'income' ? '#22C55E' : '#EF4444' }}>
                            {t.type === 'income' ? 'Income' : 'Expense'}
                          </span>
                        </td>
                        <td style={{ padding: '14px 16px', fontSize: '13px', color: '#334155' }}>{t.category}</td>
                        <td title={t.description || ''} style={{ padding: '14px 16px', fontSize: '13px', color: '#64748B', maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{t.description || '—'}</td>
                        <td style={{ padding: '14px 16px', fontSize: '13px', color: '#64748B' }}>{t.workProject?.title || '—'}</td>
                        <td style={{ padding: '14px 16px', fontSize: '13px', fontWeight: '800', color: t.type === 'income' ? '#22C55E' : '#EF4444' }}>
                          {t.type === 'income' ? '+' : '-'}£{parseFloat(t.amount || 0).toFixed(2)}
                        </td>
                        <td style={{ padding: '14px 16px' }}>
                          <span style={{ fontSize: '10px', padding: '3px 8px', borderRadius: '8px', fontWeight: '700', backgroundColor: '#F1F5F9', color: '#64748B' }}>{sourceLabel(t)}</span>
                        </td>
                        <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                          <button
                            onClick={() => isManual && deleteTransaction(t.id)}
                            disabled={!isManual}
                            title={isManual ? 'Delete' : 'Automatically generated transactions cannot be deleted directly.'}
                            style={{ padding: '6px', color: isManual ? '#EF4444' : '#CBD5E1', backgroundColor: 'transparent', border: 'none', cursor: isManual ? 'pointer' : 'not-allowed' }}
                          >
                            <Trash2 size={15} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Transaction Modal */}
        {isTransactionModalOpen && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '20px' }}>
            <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', width: '100%', maxWidth: '520px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)', overflow: 'hidden', display: 'flex', flexDirection: 'column', maxHeight: '90vh' }}>
              <div style={{ padding: '20px 24px', borderBottom: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '800', color: '#0F172A' }}>Add Transaction</h3>
                <button onClick={() => setIsTransactionModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748B' }}><X size={20} /></button>
              </div>
              <form onSubmit={handleTransactionSubmit} style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
                <div style={{ padding: '24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>Type</label>
                      <select value={transactionForm.data.type} onChange={(e) => transactionForm.setData('type', e.target.value)}
                        style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '14px', outline: 'none', backgroundColor: '#FFF' }}>
                        <option value="expense">Expense</option>
                        <option value="income">Income</option>
                      </select>
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>Amount (£) *</label>
                      <input type="number" step="0.01" min="0.01" required value={transactionForm.data.amount} onChange={(e) => transactionForm.setData('amount', e.target.value)}
                        style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '14px', outline: 'none' }} />
                      {transactionForm.errors.amount && <div style={{ color: '#EF4444', fontSize: '12px', marginTop: '4px' }}>{transactionForm.errors.amount}</div>}
                    </div>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>Category *</label>
                    <input list="tx-categories" required value={transactionForm.data.category} onChange={(e) => transactionForm.setData('category', e.target.value)}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '14px', outline: 'none' }} />
                    <datalist id="tx-categories">
                      {categoryOptions.map(c => <option key={c} value={c} />)}
                    </datalist>
                    {transactionForm.errors.category && <div style={{ color: '#EF4444', fontSize: '12px', marginTop: '4px' }}>{transactionForm.errors.category}</div>}
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>Description</label>
                    <textarea rows={2} value={transactionForm.data.description} onChange={(e) => transactionForm.setData('description', e.target.value)}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '14px', outline: 'none', resize: 'vertical', fontFamily: 'inherit' }} />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>Project</label>
                      <select value={transactionForm.data.work_project_id} onChange={(e) => transactionForm.setData('work_project_id', e.target.value)}
                        style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '14px', outline: 'none', backgroundColor: '#FFF' }}>
                        <option value="">None</option>
                        {workProjects.map(p => <option key={p.id} value={p.id}>{p.title}</option>)}
                      </select>
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>Date *</label>
                      <input type="date" required value={transactionForm.data.date} onChange={(e) => transactionForm.setData('date', e.target.value)}
                        style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '14px', outline: 'none' }} />
                    </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>Account (Cash/Bank)</label>
                      <select value={transactionForm.data.finance_account_id} onChange={(e) => transactionForm.setData('finance_account_id', e.target.value)}
                        style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '14px', outline: 'none', backgroundColor: '#FFF' }}>
                        <option value="">None</option>
                        {financeAccounts.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
                      </select>
                    </div>
                    {transactionForm.data.type === 'expense' && (
                      <div>
                        <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>Supplier (Payable)</label>
                        <select value={transactionForm.data.supplier_id} onChange={(e) => transactionForm.setData('supplier_id', e.target.value)}
                          style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '14px', outline: 'none', backgroundColor: '#FFF' }}>
                          <option value="">None</option>
                          {suppliers.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                        </select>
                      </div>
                    )}
                  </div>
                </div>
                <div style={{ padding: '16px 24px', borderTop: '1px solid #E2E8F0', display: 'flex', justifyContent: 'flex-end', gap: '12px', flexShrink: 0 }}>
                  <button type="button" onClick={() => setIsTransactionModalOpen(false)} style={{ padding: '10px 20px', backgroundColor: '#F1F5F9', color: '#475569', border: 'none', borderRadius: '8px', fontWeight: '700', fontSize: '14px', cursor: 'pointer' }}>Cancel</button>
                  <button type="submit" disabled={transactionForm.processing} style={{ padding: '10px 20px', backgroundColor: 'var(--color-primary)', color: '#FFF', border: 'none', borderRadius: '8px', fontWeight: '700', fontSize: '14px', cursor: 'pointer', boxShadow: 'var(--shadow-primary)' }}>
                    {transactionForm.processing ? 'Saving...' : 'Save Transaction'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  };

  const financeAccountTypeLabels = { cash: 'Cash', bank: 'Bank', mobile: 'Mobile Banking' };

  const renderFinanceAccountsPage = () => {
    const totalBalance = financeAccounts.reduce((s, a) => s + Number(a.current_balance || 0), 0);

    return (
      <div style={{ animation: 'fadeIn 0.3s ease-out' }}>
        <PageHeader
          eyebrow="ACCOUNT MANAGEMENT"
          title="Cash & Bank Accounts"
          subtitle="Manage your cash drawers and bank accounts, and see account-wise balances."
          action={
            <button onClick={openAddFinanceAccountModal} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', background: 'linear-gradient(135deg, var(--color-secondary) 0%, #EC4899 100%)', color: '#FFF', border: 'none', borderRadius: '10px', fontWeight: '700', fontSize: '14px', cursor: 'pointer' }}>
              <Plus size={18} /> Add Account
            </button>
          }
        />

        <div style={{ display: 'flex', gap: '16px', marginBottom: '20px' }}>
          <div style={{ flex: 1, padding: '18px 20px', backgroundColor: '#FFFFFF', borderRadius: '14px', border: '1px solid #E2E8F0' }}>
            <div style={{ fontSize: '12px', color: '#64748B', fontWeight: '700', textTransform: 'uppercase', marginBottom: '6px' }}>Total Balance (All Accounts)</div>
            <div style={{ fontSize: '26px', fontWeight: '800', color: totalBalance >= 0 ? '#22C55E' : '#EF4444' }}>£{totalBalance.toFixed(2)}</div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '16px' }}>
          {financeAccounts.length === 0 ? (
            <div style={{ gridColumn: '1 / -1', padding: '40px', textAlign: 'center', color: '#94A3B8', backgroundColor: '#FFF', borderRadius: '14px', border: '1px solid #E2E8F0' }}>No accounts yet. Add your first cash or bank account.</div>
          ) : financeAccounts.map(account => (
            <div key={account.id} style={{ padding: '20px', backgroundColor: '#FFFFFF', borderRadius: '14px', border: '1px solid #E2E8F0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                <div>
                  <div style={{ fontSize: '15px', fontWeight: '800', color: '#0F172A' }}>{account.name}</div>
                  <span style={{ fontSize: '10px', padding: '2px 8px', borderRadius: '10px', fontWeight: '700', backgroundColor: '#F1F5F9', color: '#64748B' }}>
                    {financeAccountTypeLabels[account.type] || account.type} {account.status === 'Inactive' ? '· Inactive' : ''}
                  </span>
                </div>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <button onClick={() => openEditFinanceAccountModal(account)} style={{ padding: '6px', backgroundColor: '#F1F5F9', color: '#3B82F6', border: 'none', borderRadius: '6px', cursor: 'pointer' }}><Edit2 size={14} /></button>
                  <button onClick={() => deleteFinanceAccount(account.id)} style={{ padding: '6px', backgroundColor: '#FEF2F2', color: '#EF4444', border: 'none', borderRadius: '6px', cursor: 'pointer' }}><Trash2 size={14} /></button>
                </div>
              </div>
              {account.account_number && <div style={{ fontSize: '12px', color: '#64748B', marginBottom: '10px' }}>A/C: {account.account_number}</div>}
              <div style={{ fontSize: '11px', color: '#94A3B8', fontWeight: '700', textTransform: 'uppercase' }}>Current Balance</div>
              <div style={{ fontSize: '20px', fontWeight: '800', color: Number(account.current_balance || 0) >= 0 ? '#0F172A' : '#EF4444' }}>£{Number(account.current_balance || 0).toFixed(2)}</div>
            </div>
          ))}
        </div>

        {isFinanceAccountModalOpen && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '20px' }}>
            <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', width: '100%', maxWidth: '480px', overflow: 'hidden', display: 'flex', flexDirection: 'column', maxHeight: '90vh' }}>
              <div style={{ padding: '20px 24px', borderBottom: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '800', color: '#0F172A' }}>{editingFinanceAccount ? 'Edit Account' : 'Add Account'}</h3>
                <button onClick={() => setIsFinanceAccountModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748B' }}><X size={20} /></button>
              </div>
              <form onSubmit={handleFinanceAccountSubmit} style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
                <div style={{ padding: '24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>Account Name *</label>
                    <input type="text" required value={financeAccountForm.data.name} onChange={(e) => financeAccountForm.setData('name', e.target.value)}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '14px', outline: 'none' }} />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>Type</label>
                      <select value={financeAccountForm.data.type} onChange={(e) => financeAccountForm.setData('type', e.target.value)}
                        style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '14px', outline: 'none', backgroundColor: '#FFF' }}>
                        <option value="cash">Cash</option>
                        <option value="bank">Bank</option>
                        <option value="mobile">Mobile Banking</option>
                      </select>
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>Opening Balance (£)</label>
                      <input type="number" step="0.01" value={financeAccountForm.data.opening_balance} onChange={(e) => financeAccountForm.setData('opening_balance', e.target.value)}
                        style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '14px', outline: 'none' }} />
                    </div>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>Account Number</label>
                    <input type="text" value={financeAccountForm.data.account_number} onChange={(e) => financeAccountForm.setData('account_number', e.target.value)}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '14px', outline: 'none' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>Status</label>
                    <select value={financeAccountForm.data.status} onChange={(e) => financeAccountForm.setData('status', e.target.value)}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '14px', outline: 'none', backgroundColor: '#FFF' }}>
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                </div>
                <div style={{ padding: '16px 24px', borderTop: '1px solid #E2E8F0', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                  <button type="button" onClick={() => setIsFinanceAccountModalOpen(false)} style={{ padding: '10px 20px', backgroundColor: '#F1F5F9', color: '#475569', border: 'none', borderRadius: '8px', fontWeight: '700', fontSize: '14px', cursor: 'pointer' }}>Cancel</button>
                  <button type="submit" disabled={financeAccountForm.processing} style={{ padding: '10px 20px', backgroundColor: 'var(--color-primary)', color: '#FFF', border: 'none', borderRadius: '8px', fontWeight: '700', fontSize: '14px', cursor: 'pointer' }}>
                    {financeAccountForm.processing ? 'Saving...' : 'Save Account'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderSuppliersPage = () => {
    const filteredSuppliers = suppliers.filter(s => !supplierSearch || [s.name, s.phone, s.email].filter(Boolean).some(v => v.toLowerCase().includes(supplierSearch.toLowerCase())));
    const totalPayable = suppliers.reduce((s, sup) => s + Number(sup.payable_balance || 0), 0);

    return (
      <div style={{ animation: 'fadeIn 0.3s ease-out' }}>
        <PageHeader
          eyebrow="ACCOUNT MANAGEMENT"
          title="Suppliers & Payable"
          subtitle="Track suppliers and how much you owe them."
          action={
            <button onClick={openAddSupplierModal} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', background: 'linear-gradient(135deg, var(--color-secondary) 0%, #EC4899 100%)', color: '#FFF', border: 'none', borderRadius: '10px', fontWeight: '700', fontSize: '14px', cursor: 'pointer' }}>
              <Plus size={18} /> Add Supplier
            </button>
          }
        />

        <div style={{ display: 'flex', gap: '16px', marginBottom: '20px' }}>
          <div style={{ flex: 1, padding: '18px 20px', backgroundColor: '#FFFFFF', borderRadius: '14px', border: '1px solid #E2E8F0' }}>
            <div style={{ fontSize: '12px', color: '#64748B', fontWeight: '700', textTransform: 'uppercase', marginBottom: '6px' }}>Total Supplier Payable</div>
            <div style={{ fontSize: '26px', fontWeight: '800', color: totalPayable > 0 ? '#EF4444' : '#22C55E' }}>£{totalPayable.toFixed(2)}</div>
          </div>
        </div>

        <div style={{ marginBottom: '16px' }}>
          <input type="text" placeholder="Search suppliers..." value={supplierSearch} onChange={(e) => setSupplierSearch(e.target.value)}
            style={{ width: '100%', maxWidth: '320px', padding: '10px 14px', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '13px', outline: 'none' }} />
        </div>

        <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
            <thead>
              <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
                {['Name', 'Phone', 'Email', 'Opening Balance', 'Paid', 'Payable', 'Status', ''].map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '12px 16px', fontSize: '11px', fontWeight: '800', color: '#64748B', textTransform: 'uppercase' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredSuppliers.length === 0 ? (
                <tr><td colSpan={8} style={{ padding: '40px', textAlign: 'center', color: '#94A3B8' }}>No suppliers found.</td></tr>
              ) : filteredSuppliers.map(s => (
                <tr key={s.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                  <td style={{ padding: '12px 16px', fontWeight: '700', color: '#0F172A' }}>{s.name}</td>
                  <td style={{ padding: '12px 16px', color: '#64748B' }}>{s.phone || '—'}</td>
                  <td style={{ padding: '12px 16px', color: '#64748B' }}>{s.email || '—'}</td>
                  <td style={{ padding: '12px 16px', color: '#64748B' }}>£{Number(s.opening_balance || 0).toFixed(2)}</td>
                  <td style={{ padding: '12px 16px', color: '#22C55E', fontWeight: '700' }}>£{Number(s.total_paid || 0).toFixed(2)}</td>
                  <td style={{ padding: '12px 16px', color: Number(s.payable_balance || 0) > 0 ? '#EF4444' : '#64748B', fontWeight: '800' }}>£{Number(s.payable_balance || 0).toFixed(2)}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{ fontSize: '10px', padding: '2px 8px', borderRadius: '10px', fontWeight: '700', backgroundColor: s.status === 'Active' ? '#F0FDF4' : '#F1F5F9', color: s.status === 'Active' ? '#22C55E' : '#64748B' }}>{s.status}</span>
                  </td>
                  <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
                      <button onClick={() => openEditSupplierModal(s)} style={{ padding: '6px', backgroundColor: '#F1F5F9', color: '#3B82F6', border: 'none', borderRadius: '6px', cursor: 'pointer' }}><Edit2 size={14} /></button>
                      <button onClick={() => deleteSupplier(s.id)} style={{ padding: '6px', backgroundColor: '#FEF2F2', color: '#EF4444', border: 'none', borderRadius: '6px', cursor: 'pointer' }}><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {isSupplierModalOpen && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '20px' }}>
            <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', width: '100%', maxWidth: '480px', overflow: 'hidden', display: 'flex', flexDirection: 'column', maxHeight: '90vh' }}>
              <div style={{ padding: '20px 24px', borderBottom: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '800', color: '#0F172A' }}>{editingSupplier ? 'Edit Supplier' : 'Add Supplier'}</h3>
                <button onClick={() => setIsSupplierModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748B' }}><X size={20} /></button>
              </div>
              <form onSubmit={handleSupplierSubmit} style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
                <div style={{ padding: '24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>Supplier Name *</label>
                    <input type="text" required value={supplierForm.data.name} onChange={(e) => supplierForm.setData('name', e.target.value)}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '14px', outline: 'none' }} />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>Phone</label>
                      <input type="text" value={supplierForm.data.phone} onChange={(e) => supplierForm.setData('phone', e.target.value)}
                        style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '14px', outline: 'none' }} />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>Email</label>
                      <input type="email" value={supplierForm.data.email} onChange={(e) => supplierForm.setData('email', e.target.value)}
                        style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '14px', outline: 'none' }} />
                    </div>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>Address</label>
                    <input type="text" value={supplierForm.data.address} onChange={(e) => supplierForm.setData('address', e.target.value)}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '14px', outline: 'none' }} />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>Opening Balance Owed (£)</label>
                      <input type="number" step="0.01" value={supplierForm.data.opening_balance} onChange={(e) => supplierForm.setData('opening_balance', e.target.value)}
                        style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '14px', outline: 'none' }} />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>Status</label>
                      <select value={supplierForm.data.status} onChange={(e) => supplierForm.setData('status', e.target.value)}
                        style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '14px', outline: 'none', backgroundColor: '#FFF' }}>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div style={{ padding: '16px 24px', borderTop: '1px solid #E2E8F0', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                  <button type="button" onClick={() => setIsSupplierModalOpen(false)} style={{ padding: '10px 20px', backgroundColor: '#F1F5F9', color: '#475569', border: 'none', borderRadius: '8px', fontWeight: '700', fontSize: '14px', cursor: 'pointer' }}>Cancel</button>
                  <button type="submit" disabled={supplierForm.processing} style={{ padding: '10px 20px', backgroundColor: 'var(--color-primary)', color: '#FFF', border: 'none', borderRadius: '8px', fontWeight: '700', fontSize: '14px', cursor: 'pointer' }}>
                    {supplierForm.processing ? 'Saving...' : 'Save Supplier'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderReceivablesPage = () => {
    const withDue = customers.filter(c => Number(c.total_due || 0) > 0).sort((a, b) => Number(b.total_due || 0) - Number(a.total_due || 0));
    const totalReceivable = customers.reduce((s, c) => s + Number(c.total_due || 0), 0);

    return (
      <div style={{ animation: 'fadeIn 0.3s ease-out' }}>
        <PageHeader eyebrow="ACCOUNT MANAGEMENT" title="Customer Receivable" subtitle="Customers who currently owe you money, from unpaid or partially paid invoices." />

        <div style={{ display: 'flex', gap: '16px', marginBottom: '20px' }}>
          <div style={{ flex: 1, padding: '18px 20px', backgroundColor: '#FFFFFF', borderRadius: '14px', border: '1px solid #E2E8F0' }}>
            <div style={{ fontSize: '12px', color: '#64748B', fontWeight: '700', textTransform: 'uppercase', marginBottom: '6px' }}>Total Receivable</div>
            <div style={{ fontSize: '26px', fontWeight: '800', color: totalReceivable > 0 ? '#EF4444' : '#22C55E' }}>£{totalReceivable.toFixed(2)}</div>
          </div>
          <div style={{ flex: 1, padding: '18px 20px', backgroundColor: '#FFFFFF', borderRadius: '14px', border: '1px solid #E2E8F0' }}>
            <div style={{ fontSize: '12px', color: '#64748B', fontWeight: '700', textTransform: 'uppercase', marginBottom: '6px' }}>Customers With Due Balance</div>
            <div style={{ fontSize: '26px', fontWeight: '800', color: '#0F172A' }}>{withDue.length}</div>
          </div>
        </div>

        <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
            <thead>
              <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
                {['Customer ID', 'Name', 'Phone', 'Total Purchased', 'Total Paid', 'Due Balance', ''].map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '12px 16px', fontSize: '11px', fontWeight: '800', color: '#64748B', textTransform: 'uppercase' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {withDue.length === 0 ? (
                <tr><td colSpan={7} style={{ padding: '40px', textAlign: 'center', color: '#94A3B8' }}>No outstanding receivables. All customers are settled.</td></tr>
              ) : withDue.map(c => (
                <tr key={c.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                  <td style={{ padding: '12px 16px', color: '#64748B', fontWeight: '700' }}>{c.customer_code || '—'}</td>
                  <td style={{ padding: '12px 16px', fontWeight: '700', color: '#0F172A' }}>{c.name}</td>
                  <td style={{ padding: '12px 16px', color: '#64748B' }}>{c.phone || '—'}</td>
                  <td style={{ padding: '12px 16px', color: '#64748B' }}>£{Number(c.total_purchased || 0).toFixed(2)}</td>
                  <td style={{ padding: '12px 16px', color: '#22C55E' }}>£{Number(c.total_paid || 0).toFixed(2)}</td>
                  <td style={{ padding: '12px 16px', color: '#EF4444', fontWeight: '800' }}>£{Number(c.total_due || 0).toFixed(2)}</td>
                  <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                    <button onClick={() => { setInvoiceSearch(c.name || ''); setActiveTab('invoices'); }} style={{ padding: '6px 12px', backgroundColor: '#F1F5F9', color: '#0EA5E9', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: '700' }}>View Invoices</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const renderFinancialReportsPage = () => {
    const parseAmt = (t) => Number(t.amount || 0);
    const dayKey = (d) => new Date(d).toISOString().slice(0, 10);
    const monthKey = (d) => new Date(d).toISOString().slice(0, 7);
    const yearKey = (d) => String(new Date(d).getFullYear());

    const buildBuckets = (keyFn) => {
      const map = {};
      transactions.forEach(t => {
        if (!t.date) return;
        const key = keyFn(t.date);
        if (!map[key]) map[key] = { key, income: 0, expense: 0 };
        if (t.type === 'income') map[key].income += parseAmt(t);
        else map[key].expense += parseAmt(t);
      });
      return Object.values(map).sort((a, b) => a.key < b.key ? 1 : -1);
    };

    const dailyBuckets = buildBuckets(dayKey).slice(0, 30);
    const monthlyBuckets = buildBuckets(monthKey);
    const yearlyBuckets = buildBuckets(yearKey);

    const totalIncome = transactions.filter(t => t.type === 'income').reduce((s, t) => s + parseAmt(t), 0);
    const totalExpense = transactions.filter(t => t.type === 'expense').reduce((s, t) => s + parseAmt(t), 0);
    const netProfit = totalIncome - totalExpense;

    // Cash flow: running balance over sorted-ascending dates
    const sortedAsc = [...transactions].filter(t => t.date).sort((a, b) => new Date(a.date) - new Date(b.date));
    let running = 0;
    const cashFlow = sortedAsc.map(t => {
      running += t.type === 'income' ? parseAmt(t) : -parseAmt(t);
      return { date: t.date, change: t.type === 'income' ? parseAmt(t) : -parseAmt(t), balance: running };
    }).slice(-20);

    const categoryBreakdown = (type) => {
      const map = {};
      transactions.filter(t => t.type === type).forEach(t => {
        map[t.category] = (map[t.category] || 0) + parseAmt(t);
      });
      return Object.entries(map).sort((a, b) => b[1] - a[1]);
    };

    const exportReportCsv = () => {
      const headers = ['Date', 'Type', 'Category', 'Description', 'Project', 'Account', 'Supplier', 'Amount'];
      const rows = transactions.map(t => [
        t.date ? new Date(t.date).toLocaleDateString() : '',
        t.type,
        t.category || '',
        t.description || '',
        t.workProject?.title || '',
        t.financeAccount?.name || '',
        t.supplier?.name || '',
        Number(t.amount || 0).toFixed(2)
      ]);
      const esc = (v) => { const s = String(v ?? ''); return /[",\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s; };
      const csv = [headers, ...rows].map(r => r.map(esc).join(',')).join('\n');
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `financial-report-${new Date().toISOString().slice(0, 10)}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    };

    const sectionTitle = (title) => (
      <h4 style={{ fontSize: '13px', color: '#94A3B8', textTransform: 'uppercase', fontWeight: '700', margin: '28px 0 12px', borderBottom: '1px solid #F1F5F9', paddingBottom: '8px' }}>{title}</h4>
    );

    const bucketTable = (buckets, label) => (
      <div style={{ backgroundColor: '#FFFFFF', borderRadius: '14px', border: '1px solid #E2E8F0', overflow: 'hidden', marginBottom: '8px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
          <thead>
            <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
              {[label, 'Income', 'Expense', 'Net'].map(h => <th key={h} style={{ textAlign: 'left', padding: '10px 14px', fontSize: '11px', fontWeight: '800', color: '#64748B', textTransform: 'uppercase' }}>{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {buckets.length === 0 ? (
              <tr><td colSpan={4} style={{ padding: '24px', textAlign: 'center', color: '#94A3B8' }}>No data.</td></tr>
            ) : buckets.map(b => (
              <tr key={b.key} style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td style={{ padding: '10px 14px', fontWeight: '700', color: '#0F172A' }}>{b.key}</td>
                <td style={{ padding: '10px 14px', color: '#22C55E' }}>£{b.income.toFixed(2)}</td>
                <td style={{ padding: '10px 14px', color: '#EF4444' }}>£{b.expense.toFixed(2)}</td>
                <td style={{ padding: '10px 14px', fontWeight: '800', color: (b.income - b.expense) >= 0 ? '#22C55E' : '#EF4444' }}>£{(b.income - b.expense).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );

    return (
      <div style={{ animation: 'fadeIn 0.3s ease-out' }}>
        <PageHeader
          eyebrow="ACCOUNT MANAGEMENT"
          title="Financial Reports"
          subtitle="Profit & loss, cash flow, and date-wise income/expense reports."
          action={
            <button onClick={exportReportCsv} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', backgroundColor: '#FFFFFF', color: 'var(--color-primary)', border: '1px solid #E2E8F0', borderRadius: '8px', fontWeight: '700', fontSize: '14px', cursor: 'pointer' }}>
              <Download size={18} /> Export Report
            </button>
          }
        />

        {/* Profit & Loss Summary */}
        <div style={{ display: 'flex', gap: '16px', marginBottom: '8px' }}>
          <div style={{ flex: 1, padding: '18px 20px', backgroundColor: '#FFFFFF', borderRadius: '14px', border: '1px solid #E2E8F0' }}>
            <div style={{ fontSize: '12px', color: '#64748B', fontWeight: '700', textTransform: 'uppercase', marginBottom: '6px' }}>Total Income</div>
            <div style={{ fontSize: '22px', fontWeight: '800', color: '#22C55E' }}>£{totalIncome.toFixed(2)}</div>
          </div>
          <div style={{ flex: 1, padding: '18px 20px', backgroundColor: '#FFFFFF', borderRadius: '14px', border: '1px solid #E2E8F0' }}>
            <div style={{ fontSize: '12px', color: '#64748B', fontWeight: '700', textTransform: 'uppercase', marginBottom: '6px' }}>Total Expense</div>
            <div style={{ fontSize: '22px', fontWeight: '800', color: '#EF4444' }}>£{totalExpense.toFixed(2)}</div>
          </div>
          <div style={{ flex: 1, padding: '18px 20px', backgroundColor: '#FFFFFF', borderRadius: '14px', border: '1px solid #E2E8F0' }}>
            <div style={{ fontSize: '12px', color: '#64748B', fontWeight: '700', textTransform: 'uppercase', marginBottom: '6px' }}>Net Profit / Loss</div>
            <div style={{ fontSize: '22px', fontWeight: '800', color: netProfit >= 0 ? '#22C55E' : '#EF4444' }}>£{netProfit.toFixed(2)}</div>
          </div>
        </div>

        {sectionTitle('Yearly Accounts')}
        {bucketTable(yearlyBuckets, 'Year')}

        {sectionTitle('Monthly Accounts')}
        {bucketTable(monthlyBuckets, 'Month')}

        {sectionTitle('Daily Accounts (Last 30 Days)')}
        {bucketTable(dailyBuckets, 'Date')}

        {sectionTitle('Cash Flow (Last 20 Transactions)')}
        <div style={{ backgroundColor: '#FFFFFF', borderRadius: '14px', border: '1px solid #E2E8F0', overflow: 'hidden', marginBottom: '8px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
            <thead>
              <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
                {['Date', 'Change', 'Running Balance'].map(h => <th key={h} style={{ textAlign: 'left', padding: '10px 14px', fontSize: '11px', fontWeight: '800', color: '#64748B', textTransform: 'uppercase' }}>{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {cashFlow.length === 0 ? (
                <tr><td colSpan={3} style={{ padding: '24px', textAlign: 'center', color: '#94A3B8' }}>No data.</td></tr>
              ) : cashFlow.map((c, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid #F1F5F9' }}>
                  <td style={{ padding: '10px 14px', color: '#64748B' }}>{new Date(c.date).toLocaleDateString()}</td>
                  <td style={{ padding: '10px 14px', fontWeight: '700', color: c.change >= 0 ? '#22C55E' : '#EF4444' }}>{c.change >= 0 ? '+' : ''}£{c.change.toFixed(2)}</td>
                  <td style={{ padding: '10px 14px', fontWeight: '800', color: '#0F172A' }}>£{c.balance.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {sectionTitle('Account-wise Balances')}
        <div style={{ backgroundColor: '#FFFFFF', borderRadius: '14px', border: '1px solid #E2E8F0', overflow: 'hidden', marginBottom: '8px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
            <thead>
              <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
                {['Account', 'Type', 'Balance'].map(h => <th key={h} style={{ textAlign: 'left', padding: '10px 14px', fontSize: '11px', fontWeight: '800', color: '#64748B', textTransform: 'uppercase' }}>{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {financeAccounts.length === 0 ? (
                <tr><td colSpan={3} style={{ padding: '24px', textAlign: 'center', color: '#94A3B8' }}>No accounts yet.</td></tr>
              ) : financeAccounts.map(a => (
                <tr key={a.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                  <td style={{ padding: '10px 14px', fontWeight: '700', color: '#0F172A' }}>{a.name}</td>
                  <td style={{ padding: '10px 14px', color: '#64748B' }}>{financeAccountTypeLabels[a.type] || a.type}</td>
                  <td style={{ padding: '10px 14px', fontWeight: '800', color: Number(a.current_balance || 0) >= 0 ? '#0F172A' : '#EF4444' }}>£{Number(a.current_balance || 0).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {sectionTitle('Income by Category')}
        <div style={{ backgroundColor: '#FFFFFF', borderRadius: '14px', border: '1px solid #E2E8F0', overflow: 'hidden', marginBottom: '8px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
            <tbody>
              {categoryBreakdown('income').length === 0 ? (
                <tr><td style={{ padding: '24px', textAlign: 'center', color: '#94A3B8' }}>No income recorded.</td></tr>
              ) : categoryBreakdown('income').map(([cat, amt]) => (
                <tr key={cat} style={{ borderBottom: '1px solid #F1F5F9' }}>
                  <td style={{ padding: '10px 14px', color: '#334155' }}>{cat}</td>
                  <td style={{ padding: '10px 14px', textAlign: 'right', fontWeight: '700', color: '#22C55E' }}>£{amt.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {sectionTitle('Expense by Category')}
        <div style={{ backgroundColor: '#FFFFFF', borderRadius: '14px', border: '1px solid #E2E8F0', overflow: 'hidden', marginBottom: '8px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
            <tbody>
              {categoryBreakdown('expense').length === 0 ? (
                <tr><td style={{ padding: '24px', textAlign: 'center', color: '#94A3B8' }}>No expenses recorded.</td></tr>
              ) : categoryBreakdown('expense').map(([cat, amt]) => (
                <tr key={cat} style={{ borderBottom: '1px solid #F1F5F9' }}>
                  <td style={{ padding: '10px 14px', color: '#334155' }}>{cat}</td>
                  <td style={{ padding: '10px 14px', textAlign: 'right', fontWeight: '700', color: '#EF4444' }}>£{amt.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const renderTimeClock = () => {
    const myEntries = timeEntries.filter(e => e.user_id === auth?.user?.id);
    const openEntry = myEntries.find(e => !e.clock_out);

    const startOfWeek = (() => {
      const d = new Date();
      const day = d.getDay();
      const diff = d.getDate() - day + (day === 0 ? -6 : 1);
      const sow = new Date(d.setDate(diff));
      sow.setHours(0, 0, 0, 0);
      return sow;
    })();

    const now = new Date();
    const isToday = (d) => {
      const dd = new Date(d);
      return dd.toDateString() === now.toDateString();
    };
    const isThisWeek = (d) => new Date(d) >= startOfWeek;
    const isThisMonth = (d) => {
      const dd = new Date(d);
      return dd.getMonth() === now.getMonth() && dd.getFullYear() === now.getFullYear();
    };

    const sumHours = (filterFn) => myEntries
      .filter(e => e.hours !== null && filterFn(e.clock_in))
      .reduce((s, e) => s + parseFloat(e.hours || 0), 0);

    const todayHours = sumHours(isToday);
    const weekHours = sumHours(isThisWeek);
    const monthHours = sumHours(isThisMonth);

    const statCard = (label, value) => (
      <div style={{ flex: 1, padding: '18px 20px', backgroundColor: '#FFFFFF', borderRadius: '14px', border: '1px solid #E2E8F0' }}>
        <div style={{ fontSize: '12px', color: '#64748B', fontWeight: '700', textTransform: 'uppercase', marginBottom: '6px' }}>{label}</div>
        <div style={{ fontSize: '26px', fontWeight: '800', color: '#0F172A' }}>{value.toFixed(2)}h</div>
      </div>
    );

    const recent = [...myEntries].sort((a, b) => new Date(b.clock_in) - new Date(a.clock_in)).slice(0, 20);

    return (
      <div style={{ animation: 'fadeIn 0.3s ease-out' }}>
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#0F172A', letterSpacing: '-0.5px' }}>Time Clock</h2>
          <p style={{ color: '#64748B', fontSize: '14px', marginTop: '4px' }}>Clock in and out of your shifts.</p>
        </div>

        <div style={{
          padding: '28px',
          borderRadius: '16px',
          border: `1px solid ${openEntry ? '#BBF7D0' : '#E2E8F0'}`,
          backgroundColor: openEntry ? '#F0FDF4' : '#FFFFFF',
          marginBottom: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <div>
            <div style={{ fontSize: '13px', fontWeight: '700', color: openEntry ? '#22C55E' : '#64748B', textTransform: 'uppercase', marginBottom: '6px' }}>
              {openEntry ? 'Currently Clocked In' : 'Clocked Out'}
            </div>
            <div style={{ fontSize: '20px', fontWeight: '800', color: '#0F172A' }}>
              {openEntry
                ? `Since ${new Date(openEntry.clock_in).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}${openEntry.workProject ? ` · ${openEntry.workProject.title}` : ''}`
                : 'You are not currently clocked in.'}
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {!openEntry && (
              <select value={clockProjectId} onChange={(e) => setClockProjectId(e.target.value)}
                style={{ padding: '10px 14px', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '13px', outline: 'none', backgroundColor: '#FFF' }}>
                <option value="">No project</option>
                {workProjects.map(p => <option key={p.id} value={p.id}>{p.title}</option>)}
              </select>
            )}
            <button
              onClick={openEntry ? clockOut : clockIn}
              style={{
                display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 28px',
                backgroundColor: openEntry ? '#EF4444' : 'var(--color-secondary)',
                color: '#FFF', border: 'none', borderRadius: '10px', fontWeight: '800', fontSize: '15px',
                cursor: 'pointer', boxShadow: 'var(--shadow-sm)'
              }}
            >
              <Clock size={18} /> {openEntry ? 'Clock Out' : 'Clock In'}
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
          {statCard("Today", todayHours)}
          {statCard("This Week", weekHours)}
          {statCard("This Month", monthHours)}
        </div>

        <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0', overflow: 'hidden' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #E2E8F0', backgroundColor: '#F8FAFC' }}>
                  {['Date', 'Clock In', 'Clock Out', 'Hours', 'Project', 'Notes'].map(h => (
                    <th key={h} style={{ padding: '14px 20px', fontSize: '12px', fontWeight: '800', color: '#64748B', textTransform: 'uppercase' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recent.map(entry => (
                  <tr key={entry.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                    <td style={{ padding: '14px 20px', fontSize: '13px', color: '#334155' }}>{new Date(entry.clock_in).toLocaleDateString('en-GB')}</td>
                    <td style={{ padding: '14px 20px', fontSize: '13px', color: '#64748B' }}>{new Date(entry.clock_in).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}</td>
                    <td style={{ padding: '14px 20px', fontSize: '13px', color: '#64748B' }}>
                      {entry.clock_out
                        ? new Date(entry.clock_out).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
                        : <span style={{ fontSize: '11px', padding: '3px 8px', borderRadius: '8px', fontWeight: '700', backgroundColor: '#F0FDF4', color: '#22C55E' }}>In Progress</span>}
                    </td>
                    <td style={{ padding: '14px 20px', fontSize: '13px', fontWeight: '700', color: '#0F172A' }}>{entry.hours !== null ? `${parseFloat(entry.hours).toFixed(2)}h` : '—'}</td>
                    <td style={{ padding: '14px 20px', fontSize: '13px', color: '#64748B' }}>{entry.workProject?.title || '—'}</td>
                    <td style={{ padding: '14px 20px', fontSize: '13px', color: '#64748B' }}>{entry.notes || '—'}</td>
                  </tr>
                ))}
                {recent.length === 0 && (
                  <tr>
                    <td colSpan="6" style={{ padding: '48px', textAlign: 'center', color: '#64748B', fontSize: '14px' }}>
                      No time entries yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  const renderPayrollCMS = () => {
    if (auth?.user?.role !== 'admin') {
      return (
        <div style={{ padding: '48px', textAlign: 'center', color: '#64748B', fontSize: '14px', backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
          Access restricted to administrators.
        </div>
      );
    }

    const statusBadge = (status) => status === 'Paid'
      ? { bg: '#F0FDF4', color: '#22C55E' }
      : { bg: '#FFFBEB', color: '#D97706' };

    const sectionCard = (title, action, children) => (
      <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0', overflow: 'hidden', marginBottom: '24px' }}>
        <div style={{ padding: '18px 24px', borderBottom: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '800', color: '#0F172A' }}>{title}</h3>
          {action}
        </div>
        {children}
      </div>
    );

    const smallBtn = (label, onClick, icon) => (
      <button onClick={onClick} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px', backgroundColor: 'var(--color-secondary)', color: '#FFF', border: 'none', borderRadius: '8px', fontWeight: '700', fontSize: '13px', cursor: 'pointer' }}>
        {icon}{label}
      </button>
    );

    return (
      <div style={{ animation: 'fadeIn 0.3s ease-out' }}>
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#0F172A', letterSpacing: '-0.5px' }}>Payroll</h2>
          <p style={{ color: '#64748B', fontSize: '14px', marginTop: '4px' }}>Manage staff time tracking, advances, and salary payments.</p>
        </div>

        {payrollForm.errors.payroll && (
          <div style={{ padding: '12px 16px', backgroundColor: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '8px', color: '#EF4444', fontSize: '13px', fontWeight: '600', marginBottom: '20px' }}>
            {payrollForm.errors.payroll}
          </div>
        )}

        {/* Staff Overview */}
        {sectionCard('Staff Overview', null, (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
                  {['Name', 'Role', 'Hourly Rate'].map(h => (
                    <th key={h} style={{ padding: '12px 24px', fontSize: '11px', fontWeight: '800', color: '#64748B', textTransform: 'uppercase' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {staffList.map(s => (
                  <tr key={s.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                    <td style={{ padding: '12px 24px', fontSize: '13px', fontWeight: '700', color: '#0F172A' }}>{s.name}</td>
                    <td style={{ padding: '12px 24px', fontSize: '13px', color: '#64748B', textTransform: 'capitalize' }}>{s.role}</td>
                    <td style={{ padding: '12px 24px', fontSize: '13px', color: '#334155' }}>
                      {s.hourly_rate ? `£${parseFloat(s.hourly_rate).toFixed(2)}/hr` : <span style={{ color: '#94A3B8' }}>Not set — edit in Account Management</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}

        {/* Time Tracking */}
        {sectionCard('Time Tracking (All Staff)', smallBtn('+ Add Manual Entry', openAddTimeEntryModal, <Plus size={14} />), (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
                  {['Staff', 'Date', 'Clock In', 'Clock Out', 'Hours', 'Project', ''].map(h => (
                    <th key={h} style={{ padding: '12px 24px', fontSize: '11px', fontWeight: '800', color: '#64748B', textTransform: 'uppercase' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {timeEntries.map(entry => (
                  <tr key={entry.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                    <td style={{ padding: '12px 24px', fontSize: '13px', fontWeight: '700', color: '#0F172A' }}>{entry.user?.name || '—'}</td>
                    <td style={{ padding: '12px 24px', fontSize: '13px', color: '#64748B' }}>{new Date(entry.clock_in).toLocaleDateString('en-GB')}</td>
                    <td style={{ padding: '12px 24px', fontSize: '13px', color: '#64748B' }}>{new Date(entry.clock_in).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}</td>
                    <td style={{ padding: '12px 24px', fontSize: '13px', color: '#64748B' }}>
                      {entry.clock_out
                        ? new Date(entry.clock_out).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
                        : <span style={{ fontSize: '11px', padding: '3px 8px', borderRadius: '8px', fontWeight: '700', backgroundColor: '#F0FDF4', color: '#22C55E' }}>In Progress</span>}
                    </td>
                    <td style={{ padding: '12px 24px', fontSize: '13px', fontWeight: '700', color: '#0F172A' }}>{entry.hours !== null ? `${parseFloat(entry.hours).toFixed(2)}h` : '—'}</td>
                    <td style={{ padding: '12px 24px', fontSize: '13px', color: '#64748B' }}>{entry.workProject?.title || '—'}</td>
                    <td style={{ padding: '12px 24px', textAlign: 'right' }}>
                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                        <button onClick={() => openEditTimeEntryModal(entry)} style={{ padding: '6px', backgroundColor: '#F1F5F9', color: '#3B82F6', border: 'none', borderRadius: '6px', cursor: 'pointer' }} title="Edit"><Edit2 size={15} /></button>
                        <button onClick={() => deleteTimeEntry(entry.id)} style={{ padding: '6px', backgroundColor: '#FEF2F2', color: '#EF4444', border: 'none', borderRadius: '6px', cursor: 'pointer' }} title="Delete"><Trash2 size={15} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
                {timeEntries.length === 0 && (
                  <tr>
                    <td colSpan="7" style={{ padding: '40px', textAlign: 'center', color: '#64748B', fontSize: '14px' }}>No time entries recorded.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        ))}

        {/* Advances */}
        {sectionCard('Staff Advances', smallBtn('+ Give Advance', openAddAdvanceModal, <Plus size={14} />), (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
                  {['Staff', 'Amount', 'Date', 'Note', 'Status', ''].map(h => (
                    <th key={h} style={{ padding: '12px 24px', fontSize: '11px', fontWeight: '800', color: '#64748B', textTransform: 'uppercase' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {staffAdvances.map(adv => {
                  const badge = adv.deducted ? statusBadge('Paid') : statusBadge('Pending');
                  return (
                    <tr key={adv.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                      <td style={{ padding: '12px 24px', fontSize: '13px', fontWeight: '700', color: '#0F172A' }}>{adv.user?.name || '—'}</td>
                      <td style={{ padding: '12px 24px', fontSize: '13px', fontWeight: '800', color: '#EF4444' }}>£{parseFloat(adv.amount || 0).toFixed(2)}</td>
                      <td style={{ padding: '12px 24px', fontSize: '13px', color: '#64748B' }}>{adv.date ? new Date(adv.date).toLocaleDateString('en-GB') : '—'}</td>
                      <td style={{ padding: '12px 24px', fontSize: '13px', color: '#64748B' }}>{adv.note || '—'}</td>
                      <td style={{ padding: '12px 24px' }}>
                        <span style={{ fontSize: '11px', padding: '4px 8px', borderRadius: '12px', fontWeight: '700', backgroundColor: badge.bg, color: badge.color }}>
                          {adv.deducted ? 'Deducted' : 'Pending'}
                        </span>
                      </td>
                      <td style={{ padding: '12px 24px', textAlign: 'right' }}>
                        <button
                          onClick={() => !adv.deducted && deleteAdvance(adv.id)}
                          disabled={adv.deducted}
                          title={adv.deducted ? 'Already applied to a paid salary and cannot be deleted' : 'Delete'}
                          style={{ padding: '6px', backgroundColor: adv.deducted ? '#F1F5F9' : '#FEF2F2', color: adv.deducted ? '#CBD5E1' : '#EF4444', border: 'none', borderRadius: '6px', cursor: adv.deducted ? 'not-allowed' : 'pointer' }}
                        >
                          <Trash2 size={15} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
                {staffAdvances.length === 0 && (
                  <tr>
                    <td colSpan="6" style={{ padding: '40px', textAlign: 'center', color: '#64748B', fontSize: '14px' }}>No advances recorded.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        ))}

        {/* Salary Payments */}
        {sectionCard('Salary Payments', smallBtn('+ Generate Salary', openGeneratePayrollModal, <Plus size={14} />), (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
                  {['Staff', 'Period', 'Hours', 'Rate', 'Gross', 'Advances', 'Net', 'Status', ''].map(h => (
                    <th key={h} style={{ padding: '12px 24px', fontSize: '11px', fontWeight: '800', color: '#64748B', textTransform: 'uppercase' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {salaryPayments.map(sp => {
                  const badge = statusBadge(sp.status);
                  return (
                    <tr key={sp.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                      <td style={{ padding: '12px 24px', fontSize: '13px', fontWeight: '700', color: '#0F172A' }}>{sp.user?.name || '—'}</td>
                      <td style={{ padding: '12px 24px', fontSize: '13px', color: '#64748B' }}>
                        {new Date(sp.period_start).toLocaleDateString('en-GB')} – {new Date(sp.period_end).toLocaleDateString('en-GB')}
                      </td>
                      <td style={{ padding: '12px 24px', fontSize: '13px', color: '#334155' }}>{parseFloat(sp.hours_worked).toFixed(2)}h</td>
                      <td style={{ padding: '12px 24px', fontSize: '13px', color: '#334155' }}>£{parseFloat(sp.hourly_rate).toFixed(2)}</td>
                      <td style={{ padding: '12px 24px', fontSize: '13px', color: '#334155' }}>£{parseFloat(sp.gross_amount).toFixed(2)}</td>
                      <td style={{ padding: '12px 24px', fontSize: '13px', color: '#EF4444' }}>£{parseFloat(sp.advances_deducted).toFixed(2)}</td>
                      <td style={{ padding: '12px 24px', fontSize: '14px', fontWeight: '800', color: parseFloat(sp.net_amount) >= 0 ? '#22C55E' : '#EF4444' }}>£{parseFloat(sp.net_amount).toFixed(2)}</td>
                      <td style={{ padding: '12px 24px' }}>
                        <span style={{ fontSize: '11px', padding: '4px 8px', borderRadius: '12px', fontWeight: '700', backgroundColor: badge.bg, color: badge.color }}>
                          {sp.status}
                        </span>
                      </td>
                      <td style={{ padding: '12px 24px', textAlign: 'right' }}>
                        <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                          {sp.status === 'Pending' && (
                            <button onClick={() => markPayrollPaid(sp.id)} style={{ padding: '6px 10px', backgroundColor: '#F0FDF4', color: '#22C55E', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: '700' }} title="Mark Paid">
                              Mark Paid
                            </button>
                          )}
                          {sp.status === 'Pending' && (
                            <button onClick={() => deletePayroll(sp.id)} style={{ padding: '6px', backgroundColor: '#FEF2F2', color: '#EF4444', border: 'none', borderRadius: '6px', cursor: 'pointer' }} title="Delete"><Trash2 size={15} /></button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
                {salaryPayments.length === 0 && (
                  <tr>
                    <td colSpan="9" style={{ padding: '40px', textAlign: 'center', color: '#64748B', fontSize: '14px' }}>No salary payments generated.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        ))}

        {/* Manual Time Entry Modal */}
        {isTimeEntryModalOpen && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '20px' }}>
            <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', width: '100%', maxWidth: '520px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)', overflow: 'hidden', display: 'flex', flexDirection: 'column', maxHeight: '90vh' }}>
              <div style={{ padding: '20px 24px', borderBottom: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '800', color: '#0F172A' }}>{editingTimeEntry ? 'Edit Time Entry' : 'Add Manual Time Entry'}</h3>
                <button onClick={() => setIsTimeEntryModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748B' }}><X size={20} /></button>
              </div>
              <form onSubmit={handleTimeEntrySubmit} style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
                <div style={{ padding: '24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>Staff *</label>
                    <select required value={timeEntryForm.data.user_id} onChange={(e) => timeEntryForm.setData('user_id', e.target.value)}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '14px', outline: 'none', backgroundColor: '#FFF' }}>
                      <option value="">Select staff member</option>
                      {staffList.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                    </select>
                    {timeEntryForm.errors.user_id && <div style={{ color: '#EF4444', fontSize: '12px', marginTop: '4px' }}>{timeEntryForm.errors.user_id}</div>}
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>Project</label>
                    <select value={timeEntryForm.data.work_project_id} onChange={(e) => timeEntryForm.setData('work_project_id', e.target.value)}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '14px', outline: 'none', backgroundColor: '#FFF' }}>
                      <option value="">None</option>
                      {workProjects.map(p => <option key={p.id} value={p.id}>{p.title}</option>)}
                    </select>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>Clock In *</label>
                      <input type="datetime-local" required value={timeEntryForm.data.clock_in} onChange={(e) => timeEntryForm.setData('clock_in', e.target.value)}
                        style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '14px', outline: 'none' }} />
                      {timeEntryForm.errors.clock_in && <div style={{ color: '#EF4444', fontSize: '12px', marginTop: '4px' }}>{timeEntryForm.errors.clock_in}</div>}
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>Clock Out</label>
                      <input type="datetime-local" value={timeEntryForm.data.clock_out} onChange={(e) => timeEntryForm.setData('clock_out', e.target.value)}
                        style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '14px', outline: 'none' }} />
                      {timeEntryForm.errors.clock_out && <div style={{ color: '#EF4444', fontSize: '12px', marginTop: '4px' }}>{timeEntryForm.errors.clock_out}</div>}
                    </div>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>Notes</label>
                    <textarea rows={2} value={timeEntryForm.data.notes} onChange={(e) => timeEntryForm.setData('notes', e.target.value)}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '14px', outline: 'none', resize: 'vertical', fontFamily: 'inherit' }} />
                  </div>
                </div>
                <div style={{ padding: '16px 24px', borderTop: '1px solid #E2E8F0', display: 'flex', justifyContent: 'flex-end', gap: '12px', flexShrink: 0 }}>
                  <button type="button" onClick={() => setIsTimeEntryModalOpen(false)} style={{ padding: '10px 20px', backgroundColor: '#F1F5F9', color: '#475569', border: 'none', borderRadius: '8px', fontWeight: '700', fontSize: '14px', cursor: 'pointer' }}>Cancel</button>
                  <button type="submit" disabled={timeEntryForm.processing} style={{ padding: '10px 20px', backgroundColor: 'var(--color-primary)', color: '#FFF', border: 'none', borderRadius: '8px', fontWeight: '700', fontSize: '14px', cursor: 'pointer', boxShadow: 'var(--shadow-primary)' }}>
                    {timeEntryForm.processing ? 'Saving...' : 'Save Entry'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Advance Modal */}
        {isAdvanceModalOpen && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '20px' }}>
            <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', width: '100%', maxWidth: '480px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)', overflow: 'hidden', display: 'flex', flexDirection: 'column', maxHeight: '90vh' }}>
              <div style={{ padding: '20px 24px', borderBottom: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '800', color: '#0F172A' }}>Give Advance</h3>
                <button onClick={() => setIsAdvanceModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748B' }}><X size={20} /></button>
              </div>
              <form onSubmit={handleAdvanceSubmit} style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
                <div style={{ padding: '24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>Staff *</label>
                    <select required value={advanceForm.data.user_id} onChange={(e) => advanceForm.setData('user_id', e.target.value)}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '14px', outline: 'none', backgroundColor: '#FFF' }}>
                      <option value="">Select staff member</option>
                      {staffList.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                    </select>
                    {advanceForm.errors.user_id && <div style={{ color: '#EF4444', fontSize: '12px', marginTop: '4px' }}>{advanceForm.errors.user_id}</div>}
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>Amount (£) *</label>
                      <input type="number" step="0.01" min="0.01" required value={advanceForm.data.amount} onChange={(e) => advanceForm.setData('amount', e.target.value)}
                        style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '14px', outline: 'none' }} />
                      {advanceForm.errors.amount && <div style={{ color: '#EF4444', fontSize: '12px', marginTop: '4px' }}>{advanceForm.errors.amount}</div>}
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>Date *</label>
                      <input type="date" required value={advanceForm.data.date} onChange={(e) => advanceForm.setData('date', e.target.value)}
                        style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '14px', outline: 'none' }} />
                      {advanceForm.errors.date && <div style={{ color: '#EF4444', fontSize: '12px', marginTop: '4px' }}>{advanceForm.errors.date}</div>}
                    </div>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>Note</label>
                    <textarea rows={2} value={advanceForm.data.note} onChange={(e) => advanceForm.setData('note', e.target.value)}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '14px', outline: 'none', resize: 'vertical', fontFamily: 'inherit' }} />
                  </div>
                </div>
                <div style={{ padding: '16px 24px', borderTop: '1px solid #E2E8F0', display: 'flex', justifyContent: 'flex-end', gap: '12px', flexShrink: 0 }}>
                  <button type="button" onClick={() => setIsAdvanceModalOpen(false)} style={{ padding: '10px 20px', backgroundColor: '#F1F5F9', color: '#475569', border: 'none', borderRadius: '8px', fontWeight: '700', fontSize: '14px', cursor: 'pointer' }}>Cancel</button>
                  <button type="submit" disabled={advanceForm.processing} style={{ padding: '10px 20px', backgroundColor: 'var(--color-primary)', color: '#FFF', border: 'none', borderRadius: '8px', fontWeight: '700', fontSize: '14px', cursor: 'pointer', boxShadow: 'var(--shadow-primary)' }}>
                    {advanceForm.processing ? 'Saving...' : 'Give Advance'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Generate Payroll Modal */}
        {isPayrollModalOpen && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '20px' }}>
            <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', width: '100%', maxWidth: '480px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)', overflow: 'hidden', display: 'flex', flexDirection: 'column', maxHeight: '90vh' }}>
              <div style={{ padding: '20px 24px', borderBottom: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '800', color: '#0F172A' }}>Generate Salary</h3>
                <button onClick={() => setIsPayrollModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748B' }}><X size={20} /></button>
              </div>
              <form onSubmit={handlePayrollSubmit} style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
                <div style={{ padding: '24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>Staff *</label>
                    <select required value={payrollForm.data.user_id} onChange={(e) => payrollForm.setData('user_id', e.target.value)}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '14px', outline: 'none', backgroundColor: '#FFF' }}>
                      <option value="">Select staff member</option>
                      {staffList.map(s => <option key={s.id} value={s.id}>{s.name}{s.hourly_rate ? ` (£${parseFloat(s.hourly_rate).toFixed(2)}/hr)` : ' (no rate set)'}</option>)}
                    </select>
                    {payrollForm.errors.user_id && <div style={{ color: '#EF4444', fontSize: '12px', marginTop: '4px' }}>{payrollForm.errors.user_id}</div>}
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>Period Start *</label>
                      <input type="date" required value={payrollForm.data.period_start} onChange={(e) => payrollForm.setData('period_start', e.target.value)}
                        style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '14px', outline: 'none' }} />
                      {payrollForm.errors.period_start && <div style={{ color: '#EF4444', fontSize: '12px', marginTop: '4px' }}>{payrollForm.errors.period_start}</div>}
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>Period End *</label>
                      <input type="date" required value={payrollForm.data.period_end} onChange={(e) => payrollForm.setData('period_end', e.target.value)}
                        style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '14px', outline: 'none' }} />
                      {payrollForm.errors.period_end && <div style={{ color: '#EF4444', fontSize: '12px', marginTop: '4px' }}>{payrollForm.errors.period_end}</div>}
                    </div>
                  </div>
                </div>
                <div style={{ padding: '16px 24px', borderTop: '1px solid #E2E8F0', display: 'flex', justifyContent: 'flex-end', gap: '12px', flexShrink: 0 }}>
                  <button type="button" onClick={() => setIsPayrollModalOpen(false)} style={{ padding: '10px 20px', backgroundColor: '#F1F5F9', color: '#475569', border: 'none', borderRadius: '8px', fontWeight: '700', fontSize: '14px', cursor: 'pointer' }}>Cancel</button>
                  <button type="submit" disabled={payrollForm.processing} style={{ padding: '10px 20px', backgroundColor: 'var(--color-primary)', color: '#FFF', border: 'none', borderRadius: '8px', fontWeight: '700', fontSize: '14px', cursor: 'pointer', boxShadow: 'var(--shadow-primary)' }}>
                    {payrollForm.processing ? 'Generating...' : 'Generate Salary'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'overview': return renderOverview();
      case 'timeclock': return renderTimeClock();
      case 'payroll': return renderPayrollCMS();
      case 'profile': return renderProfile();
      case 'home': return renderHomeCMS();
      case 'about': return renderAboutCMS();
      case 'services': return renderServicesCMS();
      
      case 'careers': return renderCareersControl();
      case 'settings': return renderGlobalSettings();
      case 'tracking': return renderTrackingSettings();
      case 'gallery': return renderGalleryCMS();
      case 'inbox': return renderInbox();
      case 'customers_list': return renderCustomerListPage();
      case 'customers_add': return renderCustomerAddPage();
      case 'customers_import': return renderCustomerImportPage();
      case 'customers_logs': return renderCustomerLogsPage();
      case 'reviews_cms': return renderReviewsControl();
      case 'invoices': return renderInvoicesCMS();
      case 'projects': return renderWorkProjectsCMS();
      case 'finance': return renderFinanceCMS();
      case 'finance_accounts': return renderFinanceAccountsPage();
      case 'finance_suppliers': return renderSuppliersPage();
      case 'finance_receivables': return renderReceivablesPage();
      case 'finance_reports': return renderFinancialReportsPage();
      case 'accounts': return renderAccountsCMS();
      case 'payments': return renderPaymentSettings();
      case 'payment_accounts': return renderPaymentAccountsPage();
      default: return renderOverview();
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#F8FAFC', fontFamily: 'Inter, sans-serif' }}>
      
      {/* --- SIDEBAR (Dark Navy Aesthetic) --- */}
      <aside
        style={{
          width: '280px',
          background: 'linear-gradient(180deg, #1a1f4d 0%, #141833 100%)',
          borderRight: '1px solid rgba(255,255,255,0.06)',
          display: 'flex',
          flexDirection: 'column',
          position: 'fixed',
          top: 0,
          bottom: 0,
          left: 0,
          zIndex: 40,
          boxShadow: '2px 0 16px rgba(0,0,0,0.25)'
        }}
      >
        {/* Brand Logo Area */}
        <div style={{ padding: '30px 24px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <Logo />
        </div>

        {/* Navigation */}
        <nav style={{ flex: 1, padding: '24px 16px', display: 'flex', flexDirection: 'column', gap: '4px', overflowY: 'auto' }}>
          <style>{`
            .sb-item { transition: background-color 0.15s ease, color 0.15s ease; }
            .sb-item:hover { background-color: rgba(255,255,255,0.06); color: #FFFFFF; }
            .sb-item.sb-active:hover { background-color: rgba(255,255,255,0.06); }
            .sb-chevron { transition: transform 0.2s ease; }
          `}</style>
          <p style={{ fontSize: '11px', fontWeight: '800', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px', paddingLeft: '12px' }}>Admin Controls</p>

          {navGroups.map((entry) => {
            if (entry.type === 'single') {
              const isActive = activeTab === entry.id;
              return (
                <button
                  key={entry.id}
                  onClick={() => setActiveTab(entry.id)}
                  className={`sb-item${isActive ? ' sb-active' : ''}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    width: '100%',
                    padding: '14px 16px',
                    borderRadius: '12px',
                    background: isActive ? 'linear-gradient(135deg, var(--color-secondary) 0%, #EC4899 100%)' : 'transparent',
                    color: isActive ? '#FFFFFF' : '#CBD5E1',
                    fontSize: '14px',
                    fontWeight: isActive ? '800' : '600',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                    boxShadow: isActive ? '0 6px 16px rgba(236,72,153,0.35)' : 'none'
                  }}
                >
                  <entry.icon size={20} />
                  <span>{entry.label}</span>
                </button>
              );
            }

            // Group with children
            const isExpanded = expandedGroups.has(entry.id);
            const hasActiveChild = entry.children.some(c => c.id === activeTab);

            return (
              <div key={entry.id} style={{ display: 'flex', flexDirection: 'column' }}>
                <button
                  onClick={() => toggleGroup(entry.id)}
                  className="sb-item"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    width: '100%',
                    padding: '14px 16px',
                    borderRadius: '12px',
                    background: hasActiveChild ? 'linear-gradient(135deg, var(--color-secondary) 0%, #EC4899 100%)' : 'transparent',
                    color: hasActiveChild ? '#FFFFFF' : '#E2E8F0',
                    fontSize: '14px',
                    fontWeight: '800',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                    boxShadow: hasActiveChild ? '0 6px 16px rgba(236,72,153,0.35)' : 'none'
                  }}
                >
                  <entry.icon size={20} />
                  <span style={{ flex: 1 }}>{entry.label}</span>
                  <ChevronRight
                    size={16}
                    className="sb-chevron"
                    style={{ transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)', flexShrink: 0 }}
                  />
                </button>

                {isExpanded && (
                  <div style={{
                    display: 'flex', flexDirection: 'column', gap: '2px', marginTop: hasActiveChild ? '-6px' : '2px',
                    marginLeft: '12px', paddingLeft: '14px', paddingTop: hasActiveChild ? '10px' : '0',
                    paddingBottom: hasActiveChild ? '10px' : '0',
                    borderLeft: hasActiveChild ? 'none' : '1px solid rgba(255,255,255,0.08)',
                    background: hasActiveChild ? 'rgba(236,72,153,0.08)' : 'transparent',
                    borderRadius: hasActiveChild ? '0 0 12px 12px' : '0'
                  }}>
                    {entry.children.map((child) => {
                      const isActive = activeTab === child.id;
                      return (
                        <button
                          key={child.id}
                          onClick={() => setActiveTab(child.id)}
                          className={`sb-item${isActive ? ' sb-active' : ''}`}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            width: '100%',
                            padding: '11px 14px',
                            borderRadius: '10px',
                            backgroundColor: isActive ? 'rgba(255,255,255,0.1)' : 'transparent',
                            color: isActive ? '#FFFFFF' : '#94A3B8',
                            fontSize: '13px',
                            fontWeight: isActive ? '800' : '600',
                            border: 'none',
                            borderLeft: isActive ? '3px solid #FFFFFF' : '3px solid transparent',
                            cursor: 'pointer',
                            textAlign: 'left'
                          }}
                        >
                          <child.icon size={16} />
                          <span>{child.label}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Logout Bottom */}
        <div style={{ padding: '24px 16px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <button
            onClick={handleLogout}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              width: '100%',
              padding: '14px 16px',
              borderRadius: '12px',
              backgroundColor: 'transparent',
              color: '#F87171',
              fontSize: '14px',
              fontWeight: '700',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(239,68,68,0.15)'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <LogOut size={20} />
            <span>Secure Sign Out</span>
          </button>
        </div>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main
        style={{
          flex: 1,
          marginLeft: '280px',
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          backgroundColor: '#F8FAFC'
        }}
      >
        {/* Top Header */}
        <header
          style={{
            height: '80px',
            backgroundColor: '#FFFFFF',
            borderBottom: '1px solid #E2E8F0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            padding: '0 40px',
            position: 'sticky',
            top: 0,
            zIndex: 30
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
            {/* Notification Bell with Popup */}
            <div style={{ position: 'relative' }}>
              <button 
                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', position: 'relative', color: '#64748B' }}
              >
                <Bell size={22} />
                {totalUnreadCount > 0 && (
                  <span style={{
                    position: 'absolute',
                    top: '-4px',
                    right: '-4px',
                    backgroundColor: '#EF4444',
                    color: '#FFF',
                    borderRadius: '50%',
                    fontSize: '9px',
                    fontWeight: '800',
                    width: '16px',
                    height: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid #FFF'
                  }}>
                    {totalUnreadCount}
                  </span>
                )}
              </button>

              {/* Popup Panel */}
              {isNotificationOpen && (
                <div style={{
                  position: 'absolute',
                  top: '40px',
                  right: '-10px',
                  width: '320px',
                  backgroundColor: '#FFFFFF',
                  borderRadius: '12px',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                  border: '1px solid #E2E8F0',
                  zIndex: 50,
                  overflow: 'hidden'
                }}>
                  <div style={{ padding: '16px 20px', borderBottom: '1px solid #F1F5F9', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#F8FAFC' }}>
                    <h4 style={{ margin: 0, fontSize: '15px', fontWeight: '800', color: '#0F172A' }}>Notifications ({totalUnreadCount})</h4>
                  </div>
                  
                  <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                    {unreadNotifications.length === 0 ? (
                      <div style={{ padding: '24px 20px', textAlign: 'center', color: '#94A3B8', fontSize: '13px' }}>
                        No new notifications.
                      </div>
                    ) : (
                      unreadNotifications.map(item => (
                        <div
                          key={item.id + '-' + item.type}
                          onClick={() => handleNotificationClick(item)}
                          style={{ padding: '16px 20px', borderBottom: '1px solid #F1F5F9', cursor: 'pointer', backgroundColor: '#F0FDF4', transition: 'background-color 0.2s' }}
                          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#E6FBEB'}
                          onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#F0FDF4'}
                        >
                          <p style={{ margin: '0 0 4px 0', fontSize: '13px', fontWeight: '800', color: '#0F172A' }}>
                            {item.type === 'quote' ? 'New Quote Request!' : 'New Contact Message!'}
                          </p>
                          <p style={{ margin: 0, fontSize: '12px', color: '#64748B' }}>
                            {item.name} {item.type === 'quote' ? `requested a quote for ${item.service}` : `sent a message about ${item.service || 'general interest'}`}
                          </p>
                          <span style={{ fontSize: '10px', color: '#9CA3AF', marginTop: '6px', display: 'block' }}>
                            {new Date(item.created_at).toLocaleString()}
                          </span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            <div 
              style={{ display: 'flex', alignItems: 'center', gap: '15px', cursor: 'pointer' }}
              onClick={() => setActiveTab('profile')}
            >
              {usePage().props.auth.user.avatar ? (
                <img src={usePage().props.auth.user.avatar} alt="Admin" style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
              ) : (
                <div style={{ width: '40px', height: '40px', backgroundColor: '#242D8A', color: '#FFFFFF', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontSize: '14px' }}>
                  AD
                </div>
              )}

              <div>
                <p style={{ fontSize: '14px', fontWeight: '800', color: '#0F172A', margin: '0 0 2px 0' }}>Admin Portal</p>
                <p style={{ fontSize: '12px', color: '#64748B', margin: 0, fontWeight: '600' }}>Manager Access</p>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Dynamic Content */}
        <div style={{ padding: '40px', flex: 1, maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
          
          {saveMessage && (
            <div style={{ backgroundColor: '#ECFDF5', border: '1px solid #10B981', color: '#047857', padding: '16px 20px', borderRadius: '12px', marginBottom: '30px', display: 'flex', alignItems: 'center', gap: '12px', fontSize: '15px', fontWeight: '700', animation: 'fade-in 0.3s ease', boxShadow: '0 4px 6px rgba(16, 185, 129, 0.1)' }}>
              <CheckCircle2 size={22} />
              {saveMessage}
            </div>
          )}

          {renderContent()}

        </div>
      
      {/* Customer Add/Edit Modal Overlay */}
      {isCustomerModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.6)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 100,
          padding: '20px'
        }}>
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            width: '100%',
            maxWidth: '520px',
            boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            maxHeight: '90vh'
          }}>
            {/* Modal Header */}
            <div style={{ padding: '20px 24px', borderBottom: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '800', color: '#0F172A' }}>
                {editingCustomer ? 'Edit Customer' : 'Add New Customer'}
              </h3>
              <button
                onClick={() => setIsCustomerModalOpen(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748B' }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleCustomerSubmit} style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
              <div style={{ padding: '24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>Full Name *</label>
                  <input
                    type="text"
                    required
                    value={customerForm.data.name}
                    onChange={(e) => customerForm.setData('name', e.target.value)}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '14px', outline: 'none' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>Email</label>
                    <input
                      type="email"
                      value={customerForm.data.email}
                      onChange={(e) => customerForm.setData('email', e.target.value)}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '14px', outline: 'none' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>Phone</label>
                    <input
                      type="text"
                      value={customerForm.data.phone}
                      onChange={(e) => customerForm.setData('phone', e.target.value)}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '14px', outline: 'none' }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>Address</label>
                  <input
                    type="text"
                    value={customerForm.data.address}
                    onChange={(e) => customerForm.setData('address', e.target.value)}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '14px', outline: 'none' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>Status</label>
                    <select
                      value={customerForm.data.status}
                      onChange={(e) => customerForm.setData('status', e.target.value)}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '14px', outline: 'none', backgroundColor: '#FFF' }}
                    >
                      <option value="Lead">Lead</option>
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>Credit Limit (£)</label>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={customerForm.data.credit_limit}
                      onChange={(e) => customerForm.setData('credit_limit', e.target.value)}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '14px', outline: 'none' }}
                    />
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div style={{ padding: '16px 24px', borderTop: '1px solid #E2E8F0', display: 'flex', justifyContent: 'flex-end', gap: '12px', flexShrink: 0 }}>
                <button
                  type="button"
                  onClick={() => setIsCustomerModalOpen(false)}
                  style={{ padding: '10px 20px', backgroundColor: '#F1F5F9', color: '#475569', border: 'none', borderRadius: '8px', fontWeight: '700', fontSize: '14px', cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={customerForm.processing}
                  style={{ padding: '10px 20px', backgroundColor: 'var(--color-primary)', color: '#FFF', border: 'none', borderRadius: '8px', fontWeight: '700', fontSize: '14px', cursor: 'pointer', boxShadow: 'var(--shadow-primary)' }}
                >
                  {customerForm.processing ? 'Saving...' : 'Save Customer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Account Management Modal Overlay */}
      {isAccountModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.6)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 100,
          padding: '20px'
        }}>
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            width: '100%',
            maxWidth: '520px',
            boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            maxHeight: '90vh'
          }}>
            <div style={{ padding: '20px 24px', borderBottom: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '800', color: '#0F172A' }}>
                {editingAccount ? 'Edit Account' : 'Add New Account'}
              </h3>
              <button
                onClick={() => setIsAccountModalOpen(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748B' }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAccountSubmit} style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
              <div style={{ padding: '24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>Full Name *</label>
                  <input
                    type="text"
                    required
                    value={accountForm.data.name}
                    onChange={(e) => accountForm.setData('name', e.target.value)}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '14px', outline: 'none' }}
                  />
                  {accountForm.errors.name && <div style={{ color: '#EF4444', fontSize: '12px', marginTop: '4px', fontWeight: '600' }}>{accountForm.errors.name}</div>}
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>Email *</label>
                  <input
                    type="email"
                    required
                    value={accountForm.data.email}
                    onChange={(e) => accountForm.setData('email', e.target.value)}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '14px', outline: 'none' }}
                  />
                  {accountForm.errors.email && <div style={{ color: '#EF4444', fontSize: '12px', marginTop: '4px', fontWeight: '600' }}>{accountForm.errors.email}</div>}
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>Role *</label>
                  <select
                    value={accountForm.data.role}
                    onChange={(e) => accountForm.setData('role', e.target.value)}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '14px', outline: 'none', backgroundColor: '#FFF' }}
                  >
                    <option value="staff">Staff</option>
                    <option value="admin">Admin</option>
                  </select>
                  {accountForm.errors.role && <div style={{ color: '#EF4444', fontSize: '12px', marginTop: '4px', fontWeight: '600' }}>{accountForm.errors.role}</div>}
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>Hourly Rate (£)</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={accountForm.data.hourly_rate}
                    onChange={(e) => accountForm.setData('hourly_rate', e.target.value)}
                    placeholder="e.g. 15.50"
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '14px', outline: 'none' }}
                  />
                  {accountForm.errors.hourly_rate && <div style={{ color: '#EF4444', fontSize: '12px', marginTop: '4px', fontWeight: '600' }}>{accountForm.errors.hourly_rate}</div>}
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>
                    {editingAccount ? 'New Password (leave blank to keep current)' : 'Password *'}
                  </label>
                  <input
                    type="password"
                    required={!editingAccount}
                    value={accountForm.data.password}
                    onChange={(e) => accountForm.setData('password', e.target.value)}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '14px', outline: 'none' }}
                  />
                  {accountForm.errors.password && <div style={{ color: '#EF4444', fontSize: '12px', marginTop: '4px', fontWeight: '600' }}>{accountForm.errors.password}</div>}
                </div>
              </div>

              <div style={{ padding: '16px 24px', borderTop: '1px solid #E2E8F0', display: 'flex', justifyContent: 'flex-end', gap: '12px', flexShrink: 0 }}>
                <button
                  type="button"
                  onClick={() => setIsAccountModalOpen(false)}
                  style={{ padding: '10px 20px', backgroundColor: '#F1F5F9', color: '#475569', border: 'none', borderRadius: '8px', fontWeight: '700', fontSize: '14px', cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={accountForm.processing}
                  style={{ padding: '10px 20px', backgroundColor: 'var(--color-primary)', color: '#FFF', border: 'none', borderRadius: '8px', fontWeight: '700', fontSize: '14px', cursor: 'pointer', boxShadow: 'var(--shadow-primary)' }}
                >
                  {accountForm.processing ? 'Saving...' : 'Save Account'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Careers Job Post Modal Overlay */}
      {isJobModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.6)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 100,
          padding: '20px'
        }}>
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            width: '100%',
            maxWidth: '650px',
            boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            maxHeight: '90vh'
          }}>
            {/* Modal Header */}
            <div style={{ padding: '20px 24px', borderBottom: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '800', color: '#0F172A' }}>
                {editingJob ? 'Edit Job Post' : 'Add New Job Post'}
              </h3>
              <button
                onClick={() => setIsJobModalOpen(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748B' }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleJobSubmit} style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
              <div style={{ padding: '24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                
                {/* Row 1: Title & Type */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>Job Title *</label>
                    <input
                      type="text"
                      required
                      value={jobForm.data.title}
                      onChange={(e) => jobForm.setData('title', e.target.value)}
                      placeholder="e.g. Skilled Carpenter & Joiner"
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '14px', outline: 'none' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>Job Type *</label>
                    <input
                      type="text"
                      required
                      value={jobForm.data.type}
                      onChange={(e) => jobForm.setData('type', e.target.value)}
                      placeholder="e.g. Full-Time / Subcontract"
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '14px', outline: 'none' }}
                    />
                  </div>
                </div>

                {/* Row 2: Location & Rate */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>Location *</label>
                    <input
                      type="text"
                      required
                      value={jobForm.data.location}
                      onChange={(e) => jobForm.setData('location', e.target.value)}
                      placeholder="e.g. Liverpool & Merseyside"
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '14px', outline: 'none' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>Day Rate / Salary *</label>
                    <input
                      type="text"
                      required
                      value={jobForm.data.rate}
                      onChange={(e) => jobForm.setData('rate', e.target.value)}
                      placeholder="e.g. Competitive (�160 - �220 / day)"
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '14px', outline: 'none' }}
                    />
                  </div>
                </div>

                {/* Row 3: Icon Selection */}
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>Category Icon *</label>
                  <select
                    value={jobForm.data.icon}
                    onChange={(e) => jobForm.setData('icon', e.target.value)}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '14px', outline: 'none', backgroundColor: '#FFFFFF' }}
                  >
                    <option value="Paintbrush">Paintbrush (Decorators)</option>
                    <option value="Hammer">Hammer (Carpenters/Joiners)</option>
                    <option value="Layers">Layers (Plasterers/Multi-trade)</option>
                  </select>
                </div>

                {/* Description */}
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>Description *</label>
                  <textarea
                    required
                    rows="3"
                    value={jobForm.data.description}
                    onChange={(e) => jobForm.setData('description', e.target.value)}
                    placeholder="Provide a brief summary of the role..."
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '14px', outline: 'none', resize: 'vertical' }}
                  />
                </div>

                {/* Requirements list */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#334155' }}>Key Requirements *</label>
                    <button
                      type="button"
                      onClick={() => jobForm.setData('requirements', [...jobForm.data.requirements, ''])}
                      style={{ padding: '4px 8px', backgroundColor: '#F1F5F9', border: 'none', borderRadius: '6px', fontSize: '12px', fontWeight: '700', color: 'var(--color-primary)', cursor: 'pointer' }}
                    >
                      + Add Requirement
                    </button>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {jobForm.data.requirements.map((req, idx) => (
                      <div key={idx} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <input
                          type="text"
                          required
                          value={req}
                          onChange={(e) => {
                            const newReqs = jobForm.data.requirements.map((r, i) => i === idx ? e.target.value : r);
                            jobForm.setData('requirements', newReqs);
                          }}
                          placeholder="e.g. Minimum 3+ years experience"
                          style={{ flex: 1, padding: '10px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px', outline: 'none' }}
                        />
                        {jobForm.data.requirements.length > 1 && (
                          <button
                            type="button"
                            onClick={() => {
                              const newReqs = jobForm.data.requirements.filter((_, i) => i !== idx);
                              jobForm.setData('requirements', newReqs);
                            }}
                            style={{ padding: '10px', backgroundColor: '#FEF2F2', border: 'none', borderRadius: '8px', color: '#EF4444', cursor: 'pointer' }}
                          >
                            <Trash2 size={14} />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Modal Footer */}
              <div style={{ padding: '16px 24px', borderTop: '1px solid #E2E8F0', backgroundColor: '#F8FAFC', display: 'flex', justifyContent: 'flex-end', gap: '12px', flexShrink: 0 }}>
                <button
                  type="button"
                  onClick={() => setIsJobModalOpen(false)}
                  style={{ padding: '10px 16px', border: '1px solid #CBD5E1', borderRadius: '8px', backgroundColor: '#FFFFFF', fontSize: '14px', fontWeight: '700', color: '#475569', cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={jobForm.processing}
                  style={{ padding: '10px 20px', backgroundColor: 'var(--color-primary)', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '700', color: '#FFFFFF', cursor: 'pointer' }}
                >
                  {jobForm.processing ? 'Saving...' : 'Save Job Post'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      </main>

    
      {/* Gallery Project Modal */}
      {isGalleryModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15, 23, 42, 0.75)', zIndex: 999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', backdropFilter: 'blur(4px)' }}>
          <div style={{ backgroundColor: '#FFF', borderRadius: '24px', width: '100%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto', padding: '32px', boxShadow: 'var(--shadow-xl)', position: 'relative' }}>
            <button onClick={() => setIsGalleryModalOpen(false)} style={{ position: 'absolute', top: '24px', right: '24px', background: 'transparent', border: 'none', cursor: 'pointer', color: '#64748B' }}>
              <X size={24} />
            </button>
            <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#0F172A', marginBottom: '24px' }}>
              {editingProject ? 'Edit Project' : 'Add New Project'}
            </h3>

            <form onSubmit={handleProjectSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>Project Title *</label>
                <input type="text" required value={galleryForm.data.title} onChange={(e) => galleryForm.setData('title', e.target.value)} style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '14px', outline: 'none' }} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>Category *</label>
                  <select value={galleryForm.data.category} onChange={(e) => {
                      const val = e.target.value;
                      galleryForm.setData('category', val);
                      if (val === 'Painting & Decorating') galleryForm.setData('categoryKey', 'painting');
                      if (val === 'Carpentry & Joinery') galleryForm.setData('categoryKey', 'carpentry');
                      if (val === 'Wallpapering & Murals') galleryForm.setData('categoryKey', 'wallpaper');
                      if (val === 'TV Media Walls & Mounting') galleryForm.setData('categoryKey', 'media-wall');
                      if (val === 'Property Refurbishment') galleryForm.setData('categoryKey', 'refurbishment');
                  }} style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '14px', outline: 'none', backgroundColor: '#FFF' }}>
                    <option value="Painting & Decorating">Painting & Decorating</option>
                    <option value="Carpentry & Joinery">Carpentry & Joinery</option>
                    <option value="Wallpapering & Murals">Wallpapering & Murals</option>
                    <option value="TV Media Walls & Mounting">TV Media Walls & Mounting</option>
                    <option value="Property Refurbishment">Property Refurbishment</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>Tag (e.g., Feature Wall)</label>
                  <input type="text" value={galleryForm.data.tag} onChange={(e) => galleryForm.setData('tag', e.target.value)} style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '14px', outline: 'none' }} />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>Location</label>
                <input type="text" value={galleryForm.data.location} onChange={(e) => galleryForm.setData('location', e.target.value)} style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '14px', outline: 'none' }} />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>Project Image {editingProject ? '' : '*'}</label>
                <div style={{ border: '1px dashed #CBD5E1', padding: '16px', borderRadius: '8px', textAlign: 'center', backgroundColor: '#F8FAFC' }}>
                  <input type="file" accept="image/*" onChange={e => galleryForm.setData('image', e.target.files[0])} id="project-img-upload" style={{ display: 'none' }} />
                  <label htmlFor="project-img-upload" style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#64748B' }}>
                    <ImageIcon size={24} style={{ marginBottom: '8px' }} />
                    <span style={{ fontSize: '13px', fontWeight: '600' }}>
                      {galleryForm.data.image ? galleryForm.data.image.name : editingProject ? 'Click to replace image' : 'Click to upload image'}
                    </span>
                  </label>
                </div>
                {galleryForm.errors.image && <div style={{ color: '#EF4444', fontSize: '12px', marginTop: '4px' }}>{galleryForm.errors.image}</div>}
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>Description</label>
                <textarea rows="3" value={galleryForm.data.description} onChange={(e) => galleryForm.setData('description', e.target.value)} style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '14px', outline: 'none', resize: 'vertical' }}></textarea>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '8px' }}>
                <button type="button" onClick={() => setIsGalleryModalOpen(false)} style={{ padding: '10px 20px', backgroundColor: '#F1F5F9', color: '#475569', border: 'none', borderRadius: '8px', fontWeight: '700', fontSize: '14px', cursor: 'pointer' }}>Cancel</button>
                <button type="submit" disabled={galleryForm.processing} style={{ padding: '10px 24px', backgroundColor: 'var(--color-primary)', color: '#FFF', border: 'none', borderRadius: '8px', fontWeight: '700', fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {galleryForm.processing ? 'Saving...' : editingProject ? 'Update Project' : 'Save Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    
      {/* Service Modal */}
      {isServiceModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15, 23, 42, 0.75)', zIndex: 999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', backdropFilter: 'blur(4px)' }}>
          <div style={{ backgroundColor: '#FFF', borderRadius: '24px', width: '100%', maxWidth: '650px', maxHeight: '90vh', overflowY: 'auto', padding: '32px', position: 'relative' }}>
            <button onClick={() => setIsServiceModalOpen(false)} style={{ position: 'absolute', top: '24px', right: '24px', background: 'transparent', border: 'none', cursor: 'pointer', color: '#64748B' }}><X size={24} /></button>
            <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#0F172A', marginBottom: '24px' }}>
              {editingService ? 'Edit Service' : 'Add New Service'}
            </h3>

            <form onSubmit={handleServiceSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', marginBottom: '6px' }}>Service Title *</label>
                  <input type="text" required value={serviceForm.data.title} onChange={(e) => serviceForm.setData('title', e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #CBD5E1' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', marginBottom: '6px' }}>Icon Name (Lucide) *</label>
                  <input type="text" required value={serviceForm.data.icon} onChange={(e) => serviceForm.setData('icon', e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #CBD5E1' }} placeholder="e.g. Paintbrush, Hammer" />
                </div>
              </div>

              {/* Image Upload with Preview */}
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', marginBottom: '6px', color: '#334155' }}>Service Image</label>
                <div
                  style={{ border: '2px dashed #CBD5E1', borderRadius: '12px', overflow: 'hidden', backgroundColor: '#F8FAFC', cursor: 'pointer', position: 'relative' }}
                  onClick={() => document.getElementById('service-img-upload').click()}
                >
                  {serviceImagePreview ? (
                    <div style={{ position: 'relative' }}>
                      <img
                        src={serviceImagePreview}
                        alt="Preview"
                        style={{ width: '100%', height: '200px', objectFit: 'cover', display: 'block' }}
                      />
                      <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0, transition: '0.2s' }}
                           onMouseOver={e => e.currentTarget.style.opacity = 1}
                           onMouseOut={e => e.currentTarget.style.opacity = 0}
                      >
                        <span style={{ color: '#FFF', fontWeight: '700', fontSize: '14px', background: 'rgba(0,0,0,0.5)', padding: '8px 16px', borderRadius: '8px' }}>
                          Click to change image
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', color: '#94A3B8' }}>
                      <ImageIcon size={32} />
                      <span style={{ fontSize: '14px', fontWeight: '600' }}>Click to upload service image</span>
                      <span style={{ fontSize: '12px' }}>JPG, PNG, WEBP (max 4MB)</span>
                    </div>
                  )}
                </div>
                <input
                  type="file"
                  id="service-img-upload"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={e => {
                    const file = e.target.files[0];
                    if (file) {
                      serviceForm.setData('image', file);
                      setServiceImagePreview(URL.createObjectURL(file));
                    }
                  }}
                />
                {serviceForm.errors.image && <p style={{ color: '#EF4444', fontSize: '12px', marginTop: '4px' }}>{serviceForm.errors.image}</p>}
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', marginBottom: '6px' }}>Short Description *</label>
                <textarea rows="2" required value={serviceForm.data.short_description} onChange={(e) => serviceForm.setData('short_description', e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #CBD5E1' }}></textarea>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', marginBottom: '6px' }}>Long Description *</label>
                <textarea rows="4" required value={serviceForm.data.description} onChange={(e) => serviceForm.setData('description', e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #CBD5E1' }}></textarea>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', marginBottom: '6px' }}>Features</label>
                {featureInputs.map((feat, index) => (
                  <div key={index} style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                    <input type="text" value={feat} onChange={(e) => handleFeatureChange(index, e.target.value)} style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid #CBD5E1' }} placeholder="Feature detail..." />
                    <button type="button" onClick={() => removeFeatureInput(index)} style={{ padding: '10px', backgroundColor: '#FEF2F2', color: '#EF4444', borderRadius: '8px', border: 'none', cursor: 'pointer' }}><X size={16} /></button>
                  </div>
                ))}
                <button type="button" onClick={addFeatureInput} style={{ marginTop: '4px', fontSize: '13px', fontWeight: '600', color: 'var(--color-primary)', background: 'transparent', border: 'none', cursor: 'pointer', padding: 0 }}>+ Add another feature</button>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '16px' }}>
                <button type="button" onClick={() => setIsServiceModalOpen(false)} style={{ padding: '10px 20px', backgroundColor: '#F1F5F9', color: '#475569', border: 'none', borderRadius: '8px', fontWeight: '700', cursor: 'pointer' }}>Cancel</button>
                <button type="submit" disabled={serviceForm.processing} style={{ padding: '10px 24px', backgroundColor: 'var(--color-primary)', color: '#FFF', border: 'none', borderRadius: '8px', fontWeight: '700', cursor: 'pointer' }}>
                  {serviceForm.processing ? 'Saving...' : 'Save Service'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}


      {/* FAQ Modal */}
      {isEditingFaq && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(15,23,42,0.75)', zIndex: 999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', backdropFilter: 'blur(4px)' }}>
          <div style={{ backgroundColor: '#FFF', borderRadius: '20px', width: '100%', maxWidth: '560px', padding: '28px', position: 'relative' }}>
            <button onClick={() => setIsEditingFaq(false)} style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', cursor: 'pointer', color: '#64748B' }}><X size={22} /></button>
            <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#0F172A', marginBottom: '20px' }}>{editingFaq ? 'Edit FAQ' : 'Add New FAQ'}</h3>
            <form onSubmit={handleFaqSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>Question *</label>
                <input type="text" required value={faqForm.data.question} onChange={e => faqForm.setData('question', e.target.value)} style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '14px', outline: 'none' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>Answer *</label>
                <textarea rows={4} required value={faqForm.data.answer} onChange={e => faqForm.setData('answer', e.target.value)} style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '14px', outline: 'none', resize: 'vertical', fontFamily: 'inherit' }} />
              </div>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                <button type="button" onClick={() => setIsEditingFaq(false)} style={{ padding: '10px 20px', backgroundColor: '#F1F5F9', color: '#475569', border: 'none', borderRadius: '8px', fontWeight: '700', cursor: 'pointer' }}>Cancel</button>
                <button type="submit" disabled={faqForm.processing} style={{ padding: '10px 24px', backgroundColor: 'var(--color-primary)', color: '#FFF', border: 'none', borderRadius: '8px', fontWeight: '700', cursor: 'pointer' }}>
                  {faqForm.processing ? 'Saving...' : editingFaq ? 'Update FAQ' : 'Add FAQ'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
</div>
  );
}
