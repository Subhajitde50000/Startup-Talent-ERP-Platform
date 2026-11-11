'use client';

import React, { useState, useCallback } from 'react';
import Link from 'next/link';
import {
  Shield,
  ShieldCheck,
  Key,
  Smartphone,
  Laptop,
  CheckCircle2,
  AlertTriangle,
  Lock,
  Download,
  ExternalLink,
  Save,
  RefreshCcw,
  Plus,
  Trash2,
} from 'lucide-react';
import { AdminShell } from '@/components';
import {
  Card,
  Btn,
  StatChip,
  TabBar,
  ResponsiveTable,
  DetailDrawer,
  ToggleSwitch,
  toast,
} from '@/components/admin-ui';
import {
  settingsSections,
  profileData,
  accessData,
  securityData,
  notificationPrefs,
} from './settings-data';

export default function AdminSettingsPage({ initialTab = 'security' }) {
  const [activeSection, setActiveSection] = useState(initialTab);
  const [prefs, setPrefs] = useState(notificationPrefs);
  const [sessions, setSessions] = useState(securityData.sessions);
  const [saving, setSaving] = useState(false);

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      toast('Administrative preferences successfully updated');
    }, 500);
  };

  const handleRevokeSession = (device) => {
    setSessions(sessions.filter((s) => s.device !== device));
    toast(`Revoked active session for ${device}`);
  };

  const tabs = settingsSections.slice(0, 5).map((s) => ({
    key: s.key,
    label: s.label,
  }));

  return (
    <AdminShell active="Settings">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6 border-b border-[#E5E1D8] pb-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-serif font-bold text-[#0F1B2D]">Security & Admin Settings</h1>
          <p className="text-xs text-[#4A5568] mt-1 max-w-2xl">
            Multi-factor authentication credentials, active administrative sessions, role privileges, and notification dispatch rules.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Btn onClick={handleSave} icon={Save} disabled={saving}>
            {saving ? 'Saving…' : 'Save Changes'}
          </Btn>
        </div>
      </div>

      {/* Tabs */}
      <TabBar active={activeSection} onChange={setActiveSection} tabs={tabs} />

      {/* Security & Auth Section */}
      {activeSection === 'security' && (
        <div className="space-y-6">
          {/* Hardware Keys / Passkeys */}
          <Card title="Hardware Security Keys & Passkeys" titleIcon={Key}>
            <p className="text-xs text-[#4A5568] mb-4">
              Forma requires FIDO2 WebAuthn hardware security keys or biometric passkeys for all administrative sessions.
            </p>
            <div className="space-y-3">
              {securityData.keys.map((k) => (
                <div
                  key={k.label}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 rounded-xl border border-[#E5E1D8] bg-[#FAF8F4] p-3 text-xs"
                >
                  <div className="flex items-center gap-3">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-white border border-[#E5E1D8] text-[#B8955A]">
                      <Key size={18} />
                    </span>
                    <div>
                      <div className="font-semibold text-[#0F1B2D]">{k.label}</div>
                      <div className="text-[11px] text-[#4A5568]">
                        {k.type} • Added: {k.added} • Last used: {k.lastUsed}
                      </div>
                    </div>
                  </div>
                  <StatChip status="verified" />
                </div>
              ))}
            </div>
            <div className="mt-4 pt-3 border-t border-[#E5E1D8]">
              <Btn
                small
                secondary
                icon={Plus}
                onClick={() => toast('Registering new FIDO2 WebAuthn security key…')}
              >
                Register Security Key
              </Btn>
            </div>
          </Card>

          {/* Active Sessions */}
          <Card title="Active Administrative Sessions" titleIcon={Laptop}>
            <ResponsiveTable>
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-[#E5E1D8] bg-[#FAF8F4]/80">
                    {['Device', 'Browser', 'Location', 'Last Active', 'Device Compliance', 'Action'].map((h) => (
                      <th key={h} className="p-3 text-xs font-semibold text-[#4A5568] whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sessions.map((s) => (
                    <tr key={s.device} className="border-b border-[#E5E1D8]/60 last:border-0 hover:bg-[#FAF8F4]">
                      <td className="p-3 font-medium text-[#0F1B2D] whitespace-nowrap">{s.device}</td>
                      <td className="p-3 text-[#4A5568] whitespace-nowrap">{s.browser}</td>
                      <td className="p-3 text-[#4A5568] whitespace-nowrap">{s.country}</td>
                      <td className="p-3 font-medium text-[#0F1B2D] whitespace-nowrap">{s.lastActive}</td>
                      <td className="p-3 whitespace-nowrap">
                        <StatChip status={s.managed ? 'verified' : 'critical'} />
                      </td>
                      <td className="p-3 whitespace-nowrap">
                        {s.lastActive === 'Active now' ? (
                          <span className="text-[11px] text-[#A0A7B4]">Current Session</span>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleRevokeSession(s.device)}
                            className="text-xs font-medium text-rose-600 hover:underline flex items-center gap-1"
                          >
                            <Trash2 size={12} /> Revoke
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </ResponsiveTable>
          </Card>
        </div>
      )}

      {/* Profile Section */}
      {activeSection === 'profile' && (
        <Card title="Administrator Identity Profile" titleIcon={ShieldCheck}>
          <div className="grid gap-4 sm:grid-cols-2 text-xs">
            <div className="rounded-lg bg-[#FAF8F4] p-3 border border-[#E5E1D8]">
              <span className="text-[11px] text-[#A0A7B4] block">Full Name</span>
              <span className="font-semibold text-sm text-[#0F1B2D]">{profileData.name}</span>
            </div>
            <div className="rounded-lg bg-[#FAF8F4] p-3 border border-[#E5E1D8]">
              <span className="text-[11px] text-[#A0A7B4] block">SSO Email</span>
              <span className="font-semibold text-sm text-[#0F1B2D] font-mono">{profileData.email}</span>
            </div>
            <div className="rounded-lg bg-[#FAF8F4] p-3 border border-[#E5E1D8]">
              <span className="text-[11px] text-[#A0A7B4] block">Assigned Team</span>
              <span className="font-medium text-[#0F1B2D]">{profileData.team}</span>
            </div>
            <div className="rounded-lg bg-[#FAF8F4] p-3 border border-[#E5E1D8]">
              <span className="text-[11px] text-[#A0A7B4] block">Operations Manager</span>
              <span className="font-medium text-[#0F1B2D]">{profileData.manager}</span>
            </div>
          </div>
        </Card>
      )}

      {/* Access Permissions Section */}
      {activeSection === 'access' && (
        <div className="space-y-4">
          <Card title="Assigned Role Privileges" titleIcon={Shield}>
            <div className="space-y-2 text-xs">
              {accessData.canDo.map((p, i) => (
                <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-[#FAF8F4] text-[#0F1B2D]">
                  <CheckCircle2 size={15} className="text-emerald-600 shrink-0" />
                  <span>{p}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card title="Privilege Elevation Logs" titleIcon={Lock}>
            <ResponsiveTable>
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-[#E5E1D8] bg-[#FAF8F4]/80">
                    {['Role Elevation', 'Business Justification', 'Case Reference', 'Approved By', 'Window', 'Status'].map((h) => (
                      <th key={h} className="p-3 text-xs font-semibold text-[#4A5568] whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {accessData.elevations.map((e) => (
                    <tr key={e.role} className="border-b border-[#E5E1D8]/60 last:border-0 hover:bg-[#FAF8F4]">
                      <td className="p-3 font-semibold text-[#0F1B2D] whitespace-nowrap">{e.role}</td>
                      <td className="p-3 text-[#4A5568] whitespace-nowrap">{e.reason}</td>
                      <td className="p-3 font-mono text-xs text-[#B8955A] whitespace-nowrap">{e.caseId}</td>
                      <td className="p-3 text-[#4A5568] whitespace-nowrap">{e.approver}</td>
                      <td className="p-3 text-[#4A5568] whitespace-nowrap">{e.start} – {e.end}</td>
                      <td className="p-3 whitespace-nowrap"><StatChip status={e.status === 'Active' ? 'resolved' : 'medium'} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </ResponsiveTable>
          </Card>
        </div>
      )}

      {/* Notifications Section */}
      {activeSection === 'notifications' && (
        <Card title="Emergency Dispatch & Notification Rules" titleIcon={ShieldCheck}>
          <div className="space-y-3">
            {prefs.map((p, i) => (
              <div
                key={p.category}
                className="flex items-center justify-between rounded-xl border border-[#E5E1D8] p-3 text-xs bg-[#FAF8F4]"
              >
                <div>
                  <div className="font-semibold text-[#0F1B2D]">{p.category}</div>
                  <div className="text-[11px] text-[#4A5568]">
                    In-app, verified email dispatch, and SMS paging
                  </div>
                </div>
                {p.locked ? (
                  <span className="rounded bg-gray-100 px-2 py-1 text-[10px] font-semibold text-gray-600">
                    Mandatory Policy
                  </span>
                ) : (
                  <ToggleSwitch
                    checked={p.in_app}
                    onChange={() => {
                      const updated = [...prefs];
                      updated[i].in_app = !updated[i].in_app;
                      setPrefs(updated);
                    }}
                    label={p.category}
                    id={`toggle-${i}`}
                  />
                )}
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Display & Accessibility */}
      {activeSection === 'display' && (
        <Card title="Display & Accessibility Configurations" titleIcon={Layout}>
          <div className="space-y-4 text-xs text-[#0F1B2D]">
            <div className="flex items-center justify-between border-b border-[#E5E1D8] pb-3">
              <div>
                <div className="font-semibold">High Contrast Borders</div>
                <div className="text-[#4A5568]">Enhances tabular contrast ratios for WCAG 2.1 compliance</div>
              </div>
              <ToggleSwitch checked={true} onChange={() => toast('High contrast enabled')} label="High Contrast" id="toggle-contrast" />
            </div>
            <div className="flex items-center justify-between border-b border-[#E5E1D8] pb-3">
              <div>
                <div className="font-semibold">Data Table Density</div>
                <div className="text-[#4A5568]">Optimize spacing between records for high-density operations</div>
              </div>
              <span className="rounded bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-800">
                Comfortable (Default)
              </span>
            </div>
          </div>
        </Card>
      )}

      {/* Fixed Documentation Links (Resolving ADMIN-ISSUE-010) */}
      <div className="mt-8 border-t border-[#E5E1D8] pt-4 flex flex-wrap items-center justify-between text-xs text-[#4A5568] gap-2">
        <span>Forma Enterprise Security • All policy modifications require multi-admin quorum</span>
        <div className="flex items-center gap-3">
          <Link href="/admin/help" className="hover:text-[#B8955A] hover:underline flex items-center gap-1">
            Admin Runbooks <ExternalLink size={12} />
          </Link>
          <Link href="/admin/audit" className="hover:text-[#B8955A] hover:underline flex items-center gap-1">
            Audit Trail <ExternalLink size={12} />
          </Link>
        </div>
      </div>
    </AdminShell>
  );
}

export { AdminSettingsPage };
