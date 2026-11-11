'use client';

import React, { useState, useMemo, useCallback } from 'react';
import Link from 'next/link';
import {
  MessageCircle,
  Search,
  Filter,
  RefreshCcw,
  AlertTriangle,
  UserCheck,
  Clock,
  ArrowRight,
  Send,
  X,
  CheckCircle,
  ShieldAlert,
  ExternalLink,
  ChevronRight,
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
  supportTabs,
  ticketCategories,
  tickets,
} from './support-data';

export default function AdminSupportPage({ initialTab = 'queue' }) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      toast('Support ticket queue synchronized');
    }, 600);
  }, []);

  const filteredTickets = useMemo(() => {
    return tickets.filter((t) => {
      if (activeTab === 'mine' && t.assignedTo !== 'Alex Kumar') return false;
      if (activeTab === 'waiting-for-requester' && t.status !== 'waiting-for-requester') return false;
      if (activeTab === 'escalated' && t.status !== 'escalated') return false;
      if (activeTab === 'resolved' && t.status !== 'resolved') return false;
      if (categoryFilter !== 'all' && t.category !== categoryFilter) return false;
      if (priorityFilter !== 'all' && t.priority !== priorityFilter) return false;
      if (
        searchQuery &&
        !t.id.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !t.subject.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !t.requester.displayName.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }
      return true;
    });
  }, [activeTab, categoryFilter, priorityFilter, searchQuery]);

  const handleSendReply = () => {
    if (!replyText.trim()) return;
    toast(`Reply sent to ${selectedTicket.requester.displayName} on ${selectedTicket.id}`);
    setReplyText('');
    setDrawerOpen(false);
  };

  return (
    <AdminShell active="Support" onRefresh={handleRefresh}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6 border-b border-[#E5E1D8] pb-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-serif font-bold text-[#0F1B2D]">Customer Support Desk</h1>
          <p className="text-xs text-[#4A5568] mt-1 max-w-2xl">
            Unified operations support desk for Startups, Mentors, Investors, Job Seekers, and Employers.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Btn small secondary icon={RefreshCcw} onClick={handleRefresh} title="Sync support tickets">
            Sync
          </Btn>
          <Btn
            small
            onClick={() => {
              const unclaimed = tickets.find((t) => !t.assignedTo);
              if (unclaimed) {
                setSelectedTicket(unclaimed);
                setDrawerOpen(true);
                toast(`Assigned ${unclaimed.id} to your active queue`);
              } else {
                toast('No unclaimed tickets available');
              }
            }}
            title="Claim next urgent ticket"
          >
            Claim Next
          </Btn>
        </div>
      </div>

      {/* KPI Overview */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        <MetricCard label="Open Tickets" value="12" sub="8 unassigned" status="pending" />
        <MetricCard label="SLA Breached" value="2" sub="Escalated to management" status="critical" />
        <MetricCard label="Avg First Response" value="18m" sub="Target: < 30m" status="resolved" />
        <MetricCard label="Customer Satisfaction" value="98.2%" sub="Based on 140 ratings" status="live" />
      </div>

      {/* Tabs */}
      <TabBar active={activeTab} onChange={setActiveTab} tabs={supportTabs} />

      {/* Filters Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-[#E5E1D8] pb-3 mb-6">
        <div className="flex flex-wrap items-center gap-2">
          <div>
            <label htmlFor="support-category-select" className="sr-only">Filter by category</label>
            <select
              id="support-category-select"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="h-9 rounded-lg border border-[#E5E1D8] bg-white px-2.5 text-xs text-[#0F1B2D] outline-none"
            >
              {ticketCategories.map((c) => (
                <option key={c.key} value={c.key}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="support-priority-select" className="sr-only">Filter by priority</label>
            <select
              id="support-priority-select"
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="h-9 rounded-lg border border-[#E5E1D8] bg-white px-2.5 text-xs text-[#0F1B2D] outline-none"
            >
              <option value="all">All Priorities</option>
              <option value="urgent">Urgent</option>
              <option value="high">High</option>
              <option value="normal">Normal</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="support-search-input" className="sr-only">Search tickets</label>
          <input
            id="support-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search ticket ID, requester, subject…"
            className="h-9 rounded-lg border border-[#E5E1D8] bg-white px-3 text-xs w-60 sm:w-72 outline-none"
          />
        </div>
      </div>

      {/* Tickets Table */}
      <Card title="Active Queue" titleIcon={MessageCircle} padded={false}>
        <ResponsiveTable>
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#E5E1D8] bg-[#FAF8F4]/80">
                {['Ticket ID', 'Requester', 'Subject', 'Category', 'Priority', 'SLA Clock', 'Status', 'Assignee', 'Action'].map((h) => (
                  <th key={h} className="p-3 text-xs font-semibold text-[#4A5568] whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredTickets.map((t) => (
                <tr
                  key={t.id}
                  onClick={() => {
                    setSelectedTicket(t);
                    setDrawerOpen(true);
                  }}
                  className="border-b border-[#E5E1D8]/60 last:border-0 hover:bg-[#FAF8F4] cursor-pointer transition"
                >
                  <td className="p-3 font-mono font-medium text-[#0F1B2D] whitespace-nowrap">{t.id}</td>
                  <td className="p-3 whitespace-nowrap">
                    <span className="font-medium text-[#0F1B2D]">{t.requester.displayName}</span>
                    <span className="text-[11px] text-[#A0A7B4] ml-1 capitalize">({t.requester.role})</span>
                  </td>
                  <td className="p-3 font-medium text-[#0F1B2D] max-w-xs truncate" title={t.subject}>
                    {t.subject}
                  </td>
                  <td className="p-3 text-[#4A5568] whitespace-nowrap">{t.categoryLabel}</td>
                  <td className="p-3 whitespace-nowrap">
                    <StatChip status={t.priority === 'urgent' ? 'critical' : t.priority === 'high' ? 'medium' : 'low'} />
                  </td>
                  <td className="p-3 whitespace-nowrap">
                    <span
                      className={`font-medium ${
                        t.sla.state === 'breached'
                          ? 'text-rose-700'
                          : t.sla.state === 'at_risk'
                          ? 'text-amber-700'
                          : 'text-emerald-700'
                      }`}
                    >
                      {t.sla.state.replace(/_/g, ' ')}
                    </span>
                  </td>
                  <td className="p-3 whitespace-nowrap">
                    <StatChip status={t.status === 'open' ? 'pending' : t.status === 'escalated' ? 'critical' : 'live'} />
                  </td>
                  <td className="p-3 text-[#4A5568] whitespace-nowrap">{t.assignedTo || 'Unassigned'}</td>
                  <td className="p-3 whitespace-nowrap">
                    <span className="text-xs font-medium text-[#B8955A] hover:underline flex items-center gap-1">
                      Reply <ChevronRight size={13} />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </ResponsiveTable>
      </Card>

      {/* Ticket Reply Drawer */}
      {drawerOpen && selectedTicket && (
        <DetailDrawer
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          title={`Ticket ${selectedTicket.id}`}
        >
          <div className="space-y-4 text-xs">
            {/* Direct Link to Ticket Detail Workspace */}
            <div className="rounded-xl border border-[#E5E1D8] bg-gradient-to-r from-[#FAF8F4] via-amber-50/40 to-[#FAF8F4] p-3.5 flex items-center justify-between gap-3 shadow-xs">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-lg bg-[#0F1B2D] text-[#B8955A] flex items-center justify-center shrink-0 shadow-xs">
                  <ExternalLink size={16} />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-xs text-[#0F1B2D]">Open Full Ticket Workspace</span>
                    <span className="px-1.5 py-0.5 rounded font-mono text-[10px] font-semibold bg-[#B8955A]/15 text-[#8C6D37]">
                      /{selectedTicket.id}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#718096] truncate mt-0.5">
                    Full conversation thread, internal notes & audit timeline
                  </p>
                </div>
              </div>
              <Link
                href={`/admin/support/${selectedTicket.id}`}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#0F1B2D] text-white hover:bg-[#1C2B42] text-xs font-semibold shrink-0 transition shadow-xs group"
                title={`Open /admin/support/${selectedTicket.id}`}
              >
                <span>Open</span>
                <ArrowRight size={13} className="text-[#B8955A] group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>

            <div className="rounded-xl border border-[#E5E1D8] bg-[#FAF8F4] p-3 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-sm text-[#0F1B2D]">{selectedTicket.subject}</span>
                <StatChip status={selectedTicket.priority === 'urgent' ? 'critical' : 'medium'} />
              </div>
              <div className="text-[#4A5568] flex items-center gap-2">
                <span>From: <strong>{selectedTicket.requester.displayName}</strong></span>
                <span>• Role: <strong>{selectedTicket.requester.role}</strong></span>
              </div>
            </div>

            <div>
              <span className="text-[#A0A7B4] block text-[11px] mb-1">Requester Inbound Message</span>
              <div className="rounded-xl border border-[#E5E1D8] bg-white p-3.5 text-[#0F1B2D] leading-relaxed">
                {selectedTicket.firstMessage}
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <label htmlFor="ticket-reply-textarea" className="font-semibold text-[#0F1B2D] block">
                Official Staff Response
              </label>
              <textarea
                id="ticket-reply-textarea"
                rows={4}
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Type your official administrative resolution or request for information…"
                className="w-full rounded-xl border border-[#E5E1D8] p-3 text-xs text-[#0F1B2D] outline-none focus:border-[#B8955A]"
              />
            </div>

            <div className="pt-2 border-t border-[#E5E1D8] space-y-2">
              <div className="flex gap-2">
                <Btn onClick={handleSendReply} className="flex-1" icon={Send}>
                  Send Response
                </Btn>
                <Btn
                  secondary
                  onClick={() => {
                    toast(`Escalated ${selectedTicket.id} to Trust & Safety`);
                    setDrawerOpen(false);
                  }}
                  className="flex-1"
                  icon={ShieldAlert}
                >
                  Escalate
                </Btn>
              </div>
              <Link
                href={`/admin/support/${selectedTicket.id}`}
                className="w-full inline-flex items-center justify-center gap-2 rounded-lg border border-[#E5E1D8] bg-white px-3.5 py-2.5 text-xs font-semibold text-[#0F1B2D] hover:bg-[#FAF8F4] hover:border-[#B8955A] transition shadow-xs group"
              >
                <span>Navigate to Dedicated Ticket Page (/{selectedTicket.id})</span>
                <ArrowRight size={13} className="text-[#B8955A] group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </DetailDrawer>
      )}
    </AdminShell>
  );
}

export { AdminSupportPage };
