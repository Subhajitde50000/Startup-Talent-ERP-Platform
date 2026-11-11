'use client';

import React, { useState, useMemo, useCallback } from 'react';
import Link from 'next/link';
import {
  UserRound,
  Search,
  Filter,
  RefreshCcw,
  ShieldCheck,
  ShieldAlert,
  Download,
  Building,
  ChevronRight,
  UserX,
  UserCheck,
  ExternalLink,
  ArrowRight,
} from 'lucide-react';
import { AdminShell } from '@/components';
import {
  Card,
  Btn,
  StatChip,
  TabBar,
  ResponsiveTable,
  DetailDrawer,
  MetricCard,
  toast,
} from '@/components/admin-ui';
import {
  roleTabs,
  users,
} from './users-data';

export default function AdminUsersPage({ initialTab = 'all' }) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [userList, setUserList] = useState(users);
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      toast('User directory synchronized');
    }, 600);
  }, []);

  const filteredUsers = useMemo(() => {
    return userList.filter((u) => {
      const matchRole = activeTab === 'all' || u.roles.includes(activeTab);
      const matchStatus = statusFilter === 'all' || u.status === statusFilter;
      const matchSearch =
        !searchQuery ||
        u.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.org.toLowerCase().includes(searchQuery.toLowerCase());
      return matchRole && matchStatus && matchSearch;
    });
  }, [activeTab, statusFilter, searchQuery, userList]);

  const handleToggleSuspension = (userToToggle) => {
    const isSuspended = userToToggle.status === 'suspended';
    const newStatus = isSuspended ? 'active' : 'suspended';
    setUserList(
      userList.map((u) => (u.id === userToToggle.id ? { ...u, status: newStatus } : u))
    );
    toast(
      isSuspended
        ? `Account ${userToToggle.id} has been reactivated`
        : `Account ${userToToggle.id} suspended for security hold`
    );
    setDrawerOpen(false);
  };

  return (
    <AdminShell active="Users & Orgs" onRefresh={handleRefresh}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6 border-b border-[#E5E1D8] pb-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-serif font-bold text-[#0F1B2D]">User & Organization Directory</h1>
          <p className="text-xs text-[#4A5568] mt-1 max-w-2xl">
            Cross-role registry of all verified accounts, permissions, entity associations, and security flags.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Btn small secondary icon={RefreshCcw} onClick={handleRefresh} title="Sync user directory">
            Sync
          </Btn>
          <Btn
            small
            secondary
            icon={Download}
            onClick={() => toast('Exporting user directory audit file')}
            title="Export user directory"
          >
            Export
          </Btn>
        </div>
      </div>

      {/* KPI Overview */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        <MetricCard label="Total Platform Users" value="1,240" sub="84 signups this week" status="live" />
        <MetricCard label="Active Organizations" value="320" sub="Startups & Employers" status="verified" />
        <MetricCard label="2FA Adoption Rate" value="92.4%" sub="Enforced for privileged roles" status="resolved" />
        <MetricCard label="Suspended Accounts" value="4" sub="Trust & Safety holds" status="critical" />
      </div>

      {/* Role Tabs */}
      <TabBar active={activeTab} onChange={setActiveTab} tabs={roleTabs} />

      {/* Filters Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-[#E5E1D8] pb-3 mb-6">
        <div className="flex items-center gap-2">
          <div>
            <label htmlFor="user-status-filter" className="sr-only">Filter by account status</label>
            <select
              id="user-status-filter"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="h-9 rounded-lg border border-[#E5E1D8] bg-white px-2.5 text-xs text-[#0F1B2D] outline-none"
            >
              <option value="all">All Statuses</option>
              <option value="active">Active</option>
              <option value="limited">Limited</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="user-search-input" className="sr-only">Search users</label>
          <input
            id="user-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search user name, ID, organization…"
            className="h-9 rounded-lg border border-[#E5E1D8] bg-white px-3 text-xs w-64 sm:w-80 outline-none"
          />
        </div>
      </div>

      {/* User Directory Table */}
      <Card title="User Registry" titleIcon={UserRound} padded={false}>
        <ResponsiveTable>
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#E5E1D8] bg-[#FAF8F4]/80">
                {['User ID', 'Display Name', 'Active Roles', 'Organization', 'Plan Tier', '2FA', 'Verification', 'Status', 'Last Active', 'Action'].map((h) => (
                  <th key={h} className="p-3 text-xs font-semibold text-[#4A5568] whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((u) => (
                <tr
                  key={u.id}
                  onClick={() => {
                    setSelectedUser(u);
                    setDrawerOpen(true);
                  }}
                  className="border-b border-[#E5E1D8]/60 last:border-0 hover:bg-[#FAF8F4] cursor-pointer transition"
                >
                  <td className="p-3 font-mono font-medium text-[#0F1B2D] whitespace-nowrap">{u.id}</td>
                  <td className="p-3 font-medium text-[#0F1B2D] whitespace-nowrap">{u.displayName}</td>
                  <td className="p-3 whitespace-nowrap">
                    <div className="flex gap-1">
                      {u.roles.map((r) => (
                        <span key={r} className="rounded bg-[#FAF8F4] border border-[#E5E1D8] px-1.5 py-0.5 text-[10px] capitalize text-[#4A5568]">
                          {r}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="p-3 text-[#4A5568] whitespace-nowrap">{u.org}</td>
                  <td className="p-3 text-[#4A5568] whitespace-nowrap">{u.plan}</td>
                  <td className="p-3 whitespace-nowrap">
                    <span className={`font-mono text-xs ${u.twoFactor ? 'text-emerald-700 font-semibold' : 'text-gray-400'}`}>
                      {u.twoFactor ? 'ON' : 'OFF'}
                    </span>
                  </td>
                  <td className="p-3 whitespace-nowrap">
                    <StatChip status={u.verification.toLowerCase().includes('verified') ? 'resolved' : 'pending'} />
                  </td>
                  <td className="p-3 whitespace-nowrap">
                    <StatChip status={u.status === 'active' ? 'live' : u.status === 'suspended' ? 'critical' : 'medium'} />
                  </td>
                  <td className="p-3 text-[#4A5568] whitespace-nowrap">{u.lastActive}</td>
                  <td className="p-3 whitespace-nowrap">
                    <span className="text-xs font-medium text-[#B8955A] hover:underline flex items-center gap-1">
                      Inspect <ChevronRight size={13} />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </ResponsiveTable>
      </Card>

      {/* User Details Drawer */}
      {drawerOpen && selectedUser && (
        <DetailDrawer
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          title={`User: ${selectedUser.displayName} (${selectedUser.id})`}
        >
          <div className="space-y-4 text-xs">
            {/* Direct Link to User Detail Workspace */}
            <div className="rounded-xl border border-[#E5E1D8] bg-gradient-to-r from-[#FAF8F4] via-amber-50/40 to-[#FAF8F4] p-3.5 flex items-center justify-between gap-3 shadow-xs">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-lg bg-[#0F1B2D] text-[#B8955A] flex items-center justify-center shrink-0 shadow-xs">
                  <ExternalLink size={16} />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-xs text-[#0F1B2D]">Open Full User Workspace</span>
                    <span className="px-1.5 py-0.5 rounded font-mono text-[10px] font-semibold bg-[#B8955A]/15 text-[#8C6D37]">
                      /{selectedUser.id}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#718096] truncate mt-0.5">
                    Authentication keys, 2FA status, permission audit & entity links
                  </p>
                </div>
              </div>
              <Link
                href={`/admin/users/${selectedUser.id}`}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#0F1B2D] text-white hover:bg-[#1C2B42] text-xs font-semibold shrink-0 transition shadow-xs group"
                title={`Open /admin/users/${selectedUser.id}`}
              >
                <span>Open Profile</span>
                <ArrowRight size={13} className="text-[#B8955A] group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-3 rounded-xl bg-[#FAF8F4] border border-[#E5E1D8] p-3">
              <div>
                <span className="text-[#A0A7B4] block text-[11px]">Primary Organization</span>
                <span className="font-semibold text-xs text-[#0F1B2D]">{selectedUser.org}</span>
              </div>
              <div>
                <span className="text-[#A0A7B4] block text-[11px]">Location</span>
                <span className="text-xs text-[#0F1B2D]">{selectedUser.region}</span>
              </div>
              <div>
                <span className="text-[#A0A7B4] block text-[11px]">Account Status</span>
                <StatChip status={selectedUser.status === 'active' ? 'live' : 'critical'} />
              </div>
              <div>
                <span className="text-[#A0A7B4] block text-[11px]">Active Plan</span>
                <span className="font-medium text-[#0F1B2D]">{selectedUser.plan}</span>
              </div>
            </div>

            <div>
              <span className="text-[#A0A7B4] block text-[11px] mb-1">Administrative Actions</span>
              <div className="p-3 rounded-xl border border-[#E5E1D8] bg-white space-y-2">
                <p className="text-[#4A5568]">
                  Account suspensions immediately invalidate all active user JWT tokens and revoke API keys.
                </p>
                <Btn
                  destructive={selectedUser.status !== 'suspended'}
                  secondary={selectedUser.status === 'suspended'}
                  onClick={() => handleToggleSuspension(selectedUser)}
                  className="w-full"
                  icon={selectedUser.status === 'suspended' ? UserCheck : UserX}
                >
                  {selectedUser.status === 'suspended' ? 'Reactivate Account' : 'Suspend Account (Security Hold)'}
                </Btn>

                {/* <Btn onClick={() => setDrawerOpen(false)} secondary className="w-full">
                  Close Drawer
                </Btn> */}
              </div>
            </div>

            <div className="pt-2 border-t border-[#E5E1D8] space-y-2">
              {/* <Link
                href={`/admin/users/${selectedUser.id}`}
                className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-[#0F1B2D] px-4 py-2.5 text-xs font-semibold text-white hover:bg-[#1C2B42] transition shadow-xs group"
              >
                <span>Navigate to Dedicated User Page (/{selectedUser.id})</span>
                <ArrowRight size={14} className="text-[#B8955A] group-hover:translate-x-0.5 transition-transform" />
              </Link> */}
              <Btn onClick={() => setDrawerOpen(false)} secondary className="w-full">
                Close Drawer
              </Btn>
            </div>
          </div>
        </DetailDrawer>
      )}
    </AdminShell>
  );
}

export { AdminUsersPage };
