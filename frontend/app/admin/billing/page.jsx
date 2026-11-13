'use client';

import React, { useState, useMemo, useCallback } from 'react';
import {
  Banknote,
  Download,
  RefreshCcw,
  AlertTriangle,
  FileText,
  Search,
  Filter,
  CreditCard,
  ArrowUpRight,
  ChevronRight,
} from 'lucide-react';
import { AdminShell } from '@/components';
import {
  Card,
  Btn,
  StatChip,
  TabBar,
  RangeFilter,
  ResponsiveTable,
  DetailDrawer,
  MetricCard,
  toast,
} from '@/components/admin-ui';
import {
  moneyTabs,
  rangeFilters,
  kpis,
  alerts,
  payments,
  dunningQueue,
  reconciliation,
} from './billing-data';

export default function AdminMoneyPage({ initialTab = 'overview' }) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [activeRange, setActiveRange] = useState('7-days');
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      toast('Billing ledger and gateway settlements refreshed');
    }, 600);
  }, []);

  const filteredPayments = useMemo(() => {
    return payments.filter((p) => {
      const matchStatus = statusFilter === 'all' || p.status === statusFilter;
      const matchSearch =
        !searchQuery ||
        p.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.payerId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.item.toLowerCase().includes(searchQuery.toLowerCase());
      return matchStatus && matchSearch;
    });
  }, [statusFilter, searchQuery]);

  return (
    <AdminShell active="Billing & Ledger" onRefresh={handleRefresh}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6 border-b border-[#E5E1D8] pb-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-serif font-bold text-[#0F1B2D]">Financial Ledger & Billing</h1>
          <p className="text-xs text-[#4A5568] mt-1 max-w-2xl">
            Platform revenue, recurring subscriptions, payment gateway transactions, dunning recoveries, and tax invoicing.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Btn small secondary icon={RefreshCcw} onClick={handleRefresh} title="Refresh ledger">
            Refresh
          </Btn>
          <Btn
            small
            secondary
            icon={Download}
            onClick={() => toast('Exporting financial report (CSV/PDF)')}
            title="Export billing report"
          >
            Export
          </Btn>
        </div>
      </div>

      {/* Financial KPIs */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 mb-6">
        {kpis.map((kpi, i) => (
          <MetricCard key={i} label={kpi.label} value={kpi.value} sub={kpi.sub} status={kpi.change ? 'live' : 'standard'} />
        ))}
      </div>

      {/* Active Financial Alerts */}
      {alerts.length > 0 && (
        <div className="mb-6 space-y-2">
          {alerts.map((al) => (
            <div
              key={al.id}
              className="flex items-center justify-between rounded-xl border border-amber-200 bg-amber-50/70 p-3 text-xs text-amber-900"
            >
              <div className="flex items-center gap-2">
                <AlertTriangle size={15} className="text-amber-600 shrink-0" />
                <span className="font-medium">{al.text}</span>
              </div>
              <button
                type="button"
                onClick={() => toast(`Resolving financial alert ${al.id}`)}
                className="text-xs font-semibold text-amber-800 hover:underline shrink-0 ml-2"
              >
                Resolve &rarr;
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Tabs */}
      <TabBar active={activeTab} onChange={setActiveTab} tabs={moneyTabs} />

      {/* Tab Panels */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Filters Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-[#E5E1D8] pb-3">
            <RangeFilter active={activeRange} onChange={setActiveRange} filters={rangeFilters} />
            <div className="flex items-center gap-2">
              <div>
                <label htmlFor="billing-status-select" className="sr-only">Filter by payment status</label>
                <select
                  id="billing-status-select"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="h-9 rounded-lg border border-[#E5E1D8] bg-white px-2.5 text-xs text-[#0F1B2D] outline-none"
                >
                  <option value="all">All Statuses</option>
                  <option value="succeeded">Succeeded</option>
                  <option value="pending">Pending</option>
                  <option value="failed">Failed</option>
                  <option value="disputed">Disputed</option>
                </select>
              </div>
              <div>
                <label htmlFor="billing-search-input" className="sr-only">Search transactions</label>
                <input
                  id="billing-search-input"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search payment ID, org…"
                  className="h-9 rounded-lg border border-[#E5E1D8] bg-white px-3 text-xs w-48 sm:w-60 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Payment Transactions Table */}
          <Card title="Recent Transactions" titleIcon={Banknote} padded={false}>
            <ResponsiveTable>
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-[#E5E1D8] bg-[#FAF8F4]/80">
                    {['Payment ID', 'Timestamp', 'Role', 'Payer ID', 'Line Item', 'Amount', 'Tax', 'Method', 'Status', 'Invoice'].map((h) => (
                      <th key={h} className="p-3 text-xs font-semibold text-[#4A5568] whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredPayments.map((p) => (
                    <tr
                      key={p.id}
                      onClick={() => {
                        setSelectedPayment(p);
                        setDrawerOpen(true);
                      }}
                      className="border-b border-[#E5E1D8]/60 last:border-0 hover:bg-[#FAF8F4] cursor-pointer transition"
                    >
                      <td className="p-3 font-mono font-medium text-[#0F1B2D] whitespace-nowrap">{p.id}</td>
                      <td className="p-3 text-[#4A5568] whitespace-nowrap">
                        {new Date(p.time).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
                      </td>
                      <td className="p-3 capitalize text-[#4A5568] whitespace-nowrap">{p.role}</td>
                      <td className="p-3 font-mono text-[#0F1B2D] whitespace-nowrap">{p.payerId}</td>
                      <td className="p-3 font-medium text-[#0F1B2D] whitespace-nowrap">{p.item}</td>
                      <td className="p-3 font-semibold text-[#0F1B2D] whitespace-nowrap">{p.amount}</td>
                      <td className="p-3 text-[#4A5568] whitespace-nowrap">{p.tax}</td>
                      <td className="p-3 text-[#4A5568] whitespace-nowrap">{p.provider}</td>
                      <td className="p-3 whitespace-nowrap">
                        <StatChip status={p.status === 'succeeded' ? 'resolved' : p.status === 'failed' ? 'critical' : p.status === 'disputed' ? 'medium' : 'pending'} />
                      </td>
                      <td className="p-3 font-mono text-xs text-[#B8955A] whitespace-nowrap">
                        {p.invoice || '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </ResponsiveTable>
          </Card>

          {/* Dunning and Reconciliation Grids */}
          <div className="grid gap-4 lg:grid-cols-2">
            <Card title="Active Dunning Queue" titleIcon={CreditCard}>
              <ResponsiveTable>
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-[#E5E1D8] bg-[#FAF8F4]/80">
                      {['Account', 'Amount', 'Dunning Stage', 'Failure Reason', 'Action'].map((h) => (
                        <th key={h} className="p-2.5 text-xs font-semibold text-[#4A5568]">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {dunningQueue.map((d) => (
                      <tr key={d.account} className="border-b border-[#E5E1D8]/60 last:border-0 hover:bg-[#FAF8F4]">
                        <td className="p-2.5 font-mono font-medium text-[#0F1B2D]">{d.account}</td>
                        <td className="p-2.5 font-semibold text-[#0F1B2D]">{d.amount}</td>
                        <td className="p-2.5"><StatChip status="pending" count={d.stage} /></td>
                        <td className="p-2.5 text-[#4A5568] font-mono text-[11px]">{d.failureReason}</td>
                        <td className="p-2.5 font-medium text-[#B8955A]">{d.nextAction}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </ResponsiveTable>
            </Card>

            <Card title="Settlement Reconciliation" titleIcon={FileText}>
              <ResponsiveTable>
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-[#E5E1D8] bg-[#FAF8F4]/80">
                      {['Provider', 'Settlement ID', 'Expected', 'Received', 'Status'].map((h) => (
                        <th key={h} className="p-2.5 text-xs font-semibold text-[#4A5568]">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {reconciliation.map((r) => (
                      <tr key={r.settlement} className="border-b border-[#E5E1D8]/60 last:border-0 hover:bg-[#FAF8F4]">
                        <td className="p-2.5 font-medium text-[#0F1B2D]">{r.provider}</td>
                        <td className="p-2.5 font-mono text-[#4A5568]">{r.settlement}</td>
                        <td className="p-2.5 font-medium text-[#0F1B2D]">{r.expected}</td>
                        <td className="p-2.5 font-medium text-[#0F1B2D]">{r.received}</td>
                        <td className="p-2.5">
                          <StatChip status={r.status === 'matched' ? 'resolved' : r.status === 'mismatch' ? 'critical' : 'medium'} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </ResponsiveTable>
            </Card>
          </div>
        </div>
      )}

      {/* Fallback for other tabs */}
      {activeTab !== 'overview' && (
        <Card title={`${activeTab.replace(/-/g, ' ').toUpperCase()} Ledger View`} padded>
          <div className="text-xs text-[#4A5568] space-y-3">
            <p>Financial records, accounting export files, and gateway reconciliation logs for {activeTab.replace(/-/g, ' ')}.</p>
            <div className="rounded-lg bg-[#FAF8F4] border border-[#E5E1D8] p-4 text-xs font-mono">
              Status: Verified · GST e-invoices reconciled for current tax quarter.
            </div>
          </div>
        </Card>
      )}

      {/* Payment Drawer */}
      {drawerOpen && selectedPayment && (
        <DetailDrawer
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          title={`Transaction: ${selectedPayment.id}`}
        >
          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-3 rounded-lg bg-[#FAF8F4] border border-[#E5E1D8] p-3">
              <div>
                <span className="text-[#A0A7B4] block text-[11px]">Gross Amount</span>
                <span className="text-sm font-bold text-[#0F1B2D]">{selectedPayment.amount}</span>
              </div>
              <div>
                <span className="text-[#A0A7B4] block text-[11px]">GST / Tax</span>
                <span className="text-sm font-semibold text-[#4A5568]">{selectedPayment.tax}</span>
              </div>
              <div>
                <span className="text-[#A0A7B4] block text-[11px]">Status</span>
                <StatChip status={selectedPayment.status === 'succeeded' ? 'resolved' : 'critical'} />
              </div>
              <div>
                <span className="text-[#A0A7B4] block text-[11px]">Payment Method</span>
                <span className="font-medium text-[#0F1B2D]">{selectedPayment.provider}</span>
              </div>
            </div>
            <div>
              <span className="text-[#A0A7B4] block text-[11px] mb-1">Payer Account</span>
              <div className="p-2.5 rounded-lg border border-[#E5E1D8] bg-white font-mono text-[11px]">
                Account ID: {selectedPayment.payerId} | Role: {selectedPayment.role}
              </div>
            </div>
            <div>
              <span className="text-[#A0A7B4] block text-[11px] mb-1">Purchased Item</span>
              <div className="p-2.5 rounded-lg border border-[#E5E1D8] bg-white font-medium text-[#0F1B2D]">
                {selectedPayment.item}
              </div>
            </div>
            <div className="flex gap-2 pt-2">
              <Btn
                secondary
                onClick={() => toast(`Downloading invoice for ${selectedPayment.id}`)}
                className="flex-1"
              >
                Download Invoice
              </Btn>
              <Btn onClick={() => setDrawerOpen(false)} className="flex-1">
                Close
              </Btn>
            </div>
          </div>
        </DetailDrawer>
      )}
    </AdminShell>
  );
}

export { AdminMoneyPage };
