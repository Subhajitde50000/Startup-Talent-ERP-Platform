'use client';

import React, { useState, useMemo, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  FileText,
  Search,
  Filter,
  RefreshCcw,
  Plus,
  Eye,
  CheckCircle2,
  Clock,
  ChevronRight,
  ExternalLink,
  ArrowRight,
  FolderOpen,
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
  contentTabs,
  contentItems,
} from './content-data';

export default function AdminContentPage({ initialTab = 'articles' }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(initialTab);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      toast('Content CMS synchronized');
    }, 600);
  }, []);

  const filteredItems = useMemo(() => {
    return contentItems.filter((item) => {
      if (activeTab !== 'articles' && item.type !== activeTab) return false;
      if (
        searchQuery &&
        !item.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !item.id.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }
      return true;
    });
  }, [activeTab, searchQuery]);

  return (
    <AdminShell active="Content & Legal" onRefresh={handleRefresh}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6 border-b border-[#E5E1D8] pb-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-serif font-bold text-[#0F1B2D]">Content Management & Legal CMS</h1>
          <p className="text-xs text-[#4A5568] mt-1 max-w-2xl">
            Knowledge base articles, official terms of service, legal compliance notices, offer templates, and AI rubrics.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Btn small secondary icon={RefreshCcw} onClick={handleRefresh} title="Sync CMS">
            Sync
          </Btn>
          <Btn
            small
            icon={Plus}
            onClick={() => router.push('/admin/templates/new')}
            title="Create new template or content"
          >
            Create New
          </Btn>
        </div>
      </div>

      {/* KPI Overview */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        <MetricCard label="Published Articles" value="48" sub="100% indexed in search" status="live" />
        <MetricCard label="Active Legal Policies" value="8" sub="All quorum approved" status="verified" />
        <MetricCard label="Hiring Templates" value="12" sub="Standard contracts" status="standard" />
        <MetricCard label="AI Eval Rubrics" value="6" sub="Active across roles" status="live" />
      </div>

      {/* Tabs Bar with Templates Navigation Link */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 border-b border-[#E5E1D8]">
        <div className="flex-1 min-w-0">
          <TabBar active={activeTab} onChange={setActiveTab} tabs={contentTabs} />
        </div>
        <div className="shrink-0 pb-2 sm:pb-0">
          <Link
            href="/admin/templates"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#E5E1D8] bg-[#FAF8F4] text-xs font-semibold text-[#0F1B2D] hover:bg-[#F3EBDD] hover:border-[#B8955A] transition shadow-xs whitespace-nowrap group"
            title="Navigate to Dedicated Templates Management Console (/admin/templates)"
          >
            <FolderOpen size={13} className="text-[#B8955A]" />
            <span>Hiring & Offer Templates Console</span>
            <ExternalLink size={12} className="text-[#4A5568] group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-[#E5E1D8] pb-3 mb-6">
        <div>
          <label htmlFor="content-search-input" className="sr-only">Search content items</label>
          <input
            id="content-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search title, document ID…"
            className="h-9 rounded-lg border border-[#E5E1D8] bg-white px-3 text-xs w-64 sm:w-80 outline-none"
          />
        </div>
      </div>

      {/* Table */}
      <Card title="Published Documents & Policies" titleIcon={FileText} padded={false}>
        <ResponsiveTable>
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#E5E1D8] bg-[#FAF8F4]/80">
                {['Document ID', 'Title', 'Audience', 'Version', 'Owner / Authority', 'Views (30d)', 'Status', 'Last Updated'].map((h) => (
                  <th key={h} className="p-3 text-xs font-semibold text-[#4A5568] whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item) => (
                <tr
                  key={item.id}
                  onClick={() => {
                    setSelectedItem(item);
                    setDrawerOpen(true);
                  }}
                  className="border-b border-[#E5E1D8]/60 last:border-0 hover:bg-[#FAF8F4] cursor-pointer transition"
                >
                  <td className="p-3 font-mono font-medium text-[#0F1B2D] whitespace-nowrap">{item.id}</td>
                  <td className="p-3 font-medium text-[#0F1B2D] max-w-sm truncate" title={item.title}>
                    {item.title}
                  </td>
                  <td className="p-3 text-[#4A5568] whitespace-nowrap">{item.audience}</td>
                  <td className="p-3 font-mono text-[#4A5568] whitespace-nowrap">{item.version}</td>
                  <td className="p-3 text-[#4A5568] whitespace-nowrap">{item.owner}</td>
                  <td className="p-3 font-mono text-[#0F1B2D] whitespace-nowrap">{item.views}</td>
                  <td className="p-3 whitespace-nowrap">
                    <StatChip status={item.status === 'published' || item.status === 'approved' ? 'resolved' : 'pending'} />
                  </td>
                  <td className="p-3 text-[#4A5568] whitespace-nowrap">{item.lastUpdated}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </ResponsiveTable>
      </Card>

      {/* Content Drawer */}
      {drawerOpen && selectedItem && (
        <DetailDrawer
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          title={`Document: ${selectedItem.id}`}
        >
          <div className="space-y-4 text-xs">
            {/* Top Dedicated Full-Page Route Banner */}
            <div className="flex items-center justify-between p-3 rounded-xl border border-[#B8955A]/40 bg-[#FAF8F4]">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#B8955A] block">
                  Dedicated Template / Document Editor
                </span>
                <span className="font-mono text-xs font-semibold text-[#0F1B2D]">
                  /admin/templates/{selectedItem.id}
                </span>
              </div>
              <Link
                href={`/admin/templates/${selectedItem.id}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0F1B2D] text-white hover:bg-[#1A2B42] text-xs font-medium transition shadow-xs group"
                title={`Open full page editor for ${selectedItem.id}`}
              >
                <span>Open Full Page</span>
                <ExternalLink size={12} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>

            <div className="rounded-xl border border-[#E5E1D8] bg-[#FAF8F4] p-3 space-y-2">
              <div className="font-semibold text-sm text-[#0F1B2D]">{selectedItem.title}</div>
              <div className="text-[11px] text-[#4A5568]">
                Audience: {selectedItem.audience} • Current Version: {selectedItem.version}
              </div>
            </div>
            <div>
              <span className="text-[#A0A7B4] block text-[11px] mb-1">Document Status & Metadata</span>
              <div className="p-3 rounded-lg border border-[#E5E1D8] bg-white space-y-1.5">
                <div>Owner: <strong>{selectedItem.owner}</strong></div>
                <div>Helpfulness Rating: <strong>{selectedItem.feedbackScore}</strong></div>
                <div>Cryptographic Proof: <span className="font-mono text-[#B8955A]">0x4b78...90ef</span></div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 pt-2">
              <Link
                href={`/admin/templates/${selectedItem.id}`}
                className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-[#0F1B2D] text-white hover:bg-[#1A2B42] text-xs font-semibold transition text-center shadow-xs"
              >
                <span>Edit Document / Template →</span>
              </Link>
              <Btn onClick={() => setDrawerOpen(false)} secondary className="sm:w-24">
                Close
              </Btn>
            </div>
          </div>
        </DetailDrawer>
      )}
    </AdminShell>
  );
}

export { AdminContentPage };
