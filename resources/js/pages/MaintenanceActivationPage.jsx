import React from 'react';
import { usePage, router } from '@inertiajs/react';
import { CheckCircle2, AlertTriangle, Eye, BookmarkCheck } from 'lucide-react';

export default function MaintenanceActivationPage() {
  const { active, key, status, auth } = usePage().props;
  const isLoggedIn = !!auth?.user;

  const handleToggle = () => {
    router.post('/dashboard/activation/toggle', key ? { key } : {}, { preserveScroll: true });
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', backgroundColor: '#F8FAFC' }}>
      <div style={{ width: '100%', maxWidth: '560px', backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.08), 0 10px 10px -5px rgba(0,0,0,0.03)', padding: '36px' }}>
        {status && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: '#F0FDF4', color: '#22C55E', padding: '12px 16px', borderRadius: '10px', fontWeight: 700, fontSize: '14px', marginBottom: '24px' }}>
            <CheckCircle2 size={18} /> {status}
          </div>
        )}

        <h1 style={{ fontSize: '22px', fontWeight: 800, color: '#0F172A', margin: '0 0 6px' }}>Site Maintenance Mode</h1>
        <p style={{ fontSize: '14px', color: '#64748B', margin: '0 0 28px' }}>Control whether the live site is reachable by visitors.</p>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px', padding: '20px', backgroundColor: '#F8FAFC', borderRadius: '12px', border: '1px solid #E2E8F0', marginBottom: '20px' }}>
          <div>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 12px', borderRadius: '999px', fontSize: '12px', fontWeight: 800,
              backgroundColor: active ? '#FEF2F2' : '#F0FDF4', color: active ? '#EF4444' : '#22C55E'
            }}>
              {active ? <AlertTriangle size={13} /> : <CheckCircle2 size={13} />}
              {active ? 'Maintenance mode is ON' : 'Site is LIVE'}
            </span>
            <p style={{ fontSize: '13px', color: '#64748B', margin: '10px 0 0', lineHeight: 1.6, maxWidth: '320px' }}>
              {active
                ? 'Visitors currently see the maintenance page instead of the application. This screen and the login page stay reachable so you can always switch it back off.'
                : 'Everyone can use the site normally right now.'}
            </p>
          </div>

          <button
            type="button"
            onClick={handleToggle}
            aria-pressed={active}
            style={{
              flexShrink: 0, width: '56px', height: '30px', borderRadius: '999px', border: 'none', cursor: 'pointer', position: 'relative',
              backgroundColor: active ? '#EF4444' : '#CBD5E1', transition: 'background-color 0.2s ease'
            }}
          >
            <span style={{
              position: 'absolute', top: '3px', left: active ? '29px' : '3px', width: '24px', height: '24px', borderRadius: '50%',
              backgroundColor: '#FFF', boxShadow: '0 1px 3px rgba(0,0,0,0.3)', transition: 'left 0.2s ease'
            }} />
          </button>
        </div>

        <a
          href="/dashboard/activation/preview"
          target="_blank"
          rel="noreferrer"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '8px 14px', borderRadius: '8px', backgroundColor: '#F1F5F9', color: '#334155', fontSize: '13px', fontWeight: 700, textDecoration: 'none' }}
        >
          <Eye size={14} /> Preview the maintenance page
        </a>

        {!isLoggedIn && (
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginTop: '24px', padding: '14px 16px', backgroundColor: '#FFF7ED', border: '1px solid #FDBA74', borderRadius: '10px', fontSize: '13px', color: '#9A3412', lineHeight: 1.6 }}>
            <BookmarkCheck size={16} style={{ flexShrink: 0, marginTop: '1px' }} />
            <span>Bookmark this exact page URL (with the <code>?key=...</code> in it) — it's the only way back in without logging in.</span>
          </div>
        )}
      </div>
    </div>
  );
}
