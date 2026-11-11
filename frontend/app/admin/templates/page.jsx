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
  FolderOpen,
  SlidersHorizontal,
  Copy,
  Code,
  Tag,
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
  initialTemplates,
  TEMPLATE_CATEGORIES,
  TEMPLATE_STATUSES,
  TEMPLATE_AUDIENCES,
} from './templates-data';

export default function AdminTemplatesDirectoryPage() {
  const router = useRouter();
  const [templates, setTemplates] = useState(initialTemplates);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      toast('Templates repository synchronized');
    }, 600);
  }, []);

  const categoryTabs = useMemo(() => {
    const list = [{ key: 'All', label: 'All Templates', count: templates.length }];
    TEMPLATE_CATEGORIES.forEach((cat) => {
      const count = templates.filter((t) => t.category === cat).length;
      list.push({ key: cat, label: cat, count });
    });
    return list;
  }, [templates]);

  const filteredTemplates = useMemo(() => {
    return templates.filter((t) => {
      if (activeCategory !== 'All' && t.category !== activeCategory) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = t.title.toLowerCase().includes(q);
        const matchesId = t.id.toLowerCase().includes(q);
        const matchesOwner = t.owner.toLowerCase().includes(q);
        const matchesTags = t.tags?.some((tag) => tag.toLowerCase().includes(q));
        if (!matchesTitle && !matchesId && !matchesOwner && !matchesTags) return false;
      }
      return true;
    });
  }, [templates, activeCategory, searchQuery]);

  return (
    <AdminShell active="Templates & Rubrics" onRefresh={handleRefresh}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6 border-b border-[#E5E1D8] pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#F3EBDD] text-[#8C6B32]">
              Hiring & Legal Toolkit
            </span>
            <span className="text-xs text-[#A0A7B4]">•</span>
            <span className="text-xs text-[#4A5568]">Standardized Contract Library</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-serif font-bold text-[#0F1B2D]">
            Hiring, Offer & Advisory Templates
          </h1>
          <p className="text-xs text-[#4A5568] mt-1 max-w-2xl">
            Central repository of vetted executive offer letters, ESOP vesting schedules, FAST advisory contracts, and bilateral NDAs with dynamic token replacement.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Btn small secondary icon={RefreshCcw} onClick={handleRefresh} title="Sync Templates">
            Sync
          </Btn>
          <Link
            href="/admin/content"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#E5E1D8] bg-white text-xs font-medium text-[#4A5568] hover:text-[#0F1B2D] hover:bg-[#FAF8F4] transition shadow-xs"
            title="Back to Content & Legal CMS"
          >
            <FileText size={13} />
            <span>Content CMS</span>
          </Link>
          <Btn
            small
            icon={Plus}
            onClick={() => router.push('/admin/templates/new')}
            title="Create New Template"
          >
            Create New Template
          </Btn>
        </div>
      </div>

      {/* KPI Overview */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        <MetricCard label="Active Templates" value={templates.length.toString()} sub="100% legal quorum approved" status="live" />
        <MetricCard label="Offer Letters" value={templates.filter((t) => t.category === 'Offer Letters').length.toString()} sub="Executive & Core team" status="verified" />
        <MetricCard label="Employment Contracts" value={templates.filter((t) => t.category === 'Employment Contracts').length.toString()} sub="Full-stack & Remote" status="standard" />
        <MetricCard label="Advisory & FAST" value={templates.filter((t) => t.category === 'Consulting & Advisory').length.toString()} sub="Standard vesting clauses" status="live" />
      </div>

      {/* Tabs */}
      <TabBar active={activeCategory} onChange={setActiveCategory} tabs={categoryTabs} />

      {/* Filters Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-[#E5E1D8] pb-3 mb-6">
        <div className="relative">
          <label htmlFor="template-search-input" className="sr-only">Search templates</label>
          <input
            id="template-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search template title, ID, tag, or owner…"
            className="h-9 rounded-lg border border-[#E5E1D8] bg-white px-3 text-xs w-64 sm:w-80 outline-none focus:border-[#B8955A] shadow-xs"
          />
        </div>
        <div className="text-xs text-[#4A5568] flex items-center gap-2">
          <span>Showing <strong>{filteredTemplates.length}</strong> of <strong>{templates.length}</strong> templates</span>
        </div>
      </div>

      {/* Table */}
      <Card title="Standardized Templates Repository" titleIcon={FolderOpen} padded={false}>
        <ResponsiveTable>
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#E5E1D8] bg-[#FAF8F4]/80">
                {['Template ID', 'Title & Category', 'Audience', 'Version', 'Owner / Quorum', 'Usage Count', 'Status', 'Last Modified', 'Action'].map((h) => (
                  <th key={h} className="p-3 text-xs font-semibold text-[#4A5568] whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredTemplates.map((t) => (
                <tr
                  key={t.id}
                  onClick={() => {
                    setSelectedTemplate(t);
                    setDrawerOpen(true);
                  }}
                  className="border-b border-[#E5E1D8]/60 last:border-0 hover:bg-[#FAF8F4] cursor-pointer transition"
                >
                  <td className="p-3 font-mono font-medium text-[#0F1B2D] whitespace-nowrap">{t.id}</td>
                  <td className="p-3 max-w-sm">
                    <div className="font-semibold text-[#0F1B2D] truncate" title={t.title}>
                      {t.title}
                    </div>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="text-[10px] text-[#B8955A] font-medium">{t.category}</span>
                      {t.tags?.slice(0, 2).map((tg) => (
                        <span key={tg} className="text-[9px] px-1.5 py-0.2 rounded bg-gray-100 text-[#4A5568]">
                          {tg}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="p-3 text-[#4A5568] whitespace-nowrap">{t.audience}</td>
                  <td className="p-3 font-mono text-[#4A5568] whitespace-nowrap">{t.version}</td>
                  <td className="p-3 text-[#4A5568] whitespace-nowrap">{t.owner}</td>
                  <td className="p-3 font-mono text-[#0F1B2D] whitespace-nowrap">{t.views} downloads</td>
                  <td className="p-3 whitespace-nowrap">
                    <StatChip status={t.status === 'published' ? 'resolved' : 'pending'} />
                  </td>
                  <td className="p-3 text-[#4A5568] whitespace-nowrap">{t.lastUpdated}</td>
                  <td className="p-3 whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                    <Link
                      href={`/admin/templates/${t.id}`}
                      className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#B8955A] hover:text-[#8C6B32] transition"
                    >
                      <span>Edit</span>
                      <ArrowRight size={11} />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </ResponsiveTable>
      </Card>

      {/* Drawer */}
      {drawerOpen && selectedTemplate && (
        <DetailDrawer
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          title={`Template: ${selectedTemplate.id}`}
        >
          <div className="space-y-4 text-xs">
            {/* Top Full-Page Navigation Banner */}
            <div className="flex items-center justify-between p-3 rounded-xl border border-[#B8955A]/40 bg-[#FAF8F4]">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#B8955A] block">
                  Dedicated Template Editor
                </span>
                <span className="font-mono text-xs font-semibold text-[#0F1B2D]">
                  /admin/templates/{selectedTemplate.id}
                </span>
              </div>
              <Link
                href={`/admin/templates/${selectedTemplate.id}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0F1B2D] text-white hover:bg-[#1A2B42] text-xs font-medium transition shadow-xs group"
                title={`Open full page editor for ${selectedTemplate.id}`}
              >
                <span>Open Full Page</span>
                <ExternalLink size={12} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>

            <div className="rounded-xl border border-[#E5E1D8] bg-[#FAF8F4] p-3 space-y-2">
              <div className="font-semibold text-sm text-[#0F1B2D]">{selectedTemplate.title}</div>
              <div className="text-[11px] text-[#4A5568]">
                Category: <strong>{selectedTemplate.category}</strong> • Version: <strong>{selectedTemplate.version}</strong>
              </div>
              <p className="text-[#4A5568] text-xs leading-relaxed">
                {selectedTemplate.description}
              </p>
            </div>

            <div>
              <span className="text-[#A0A7B4] block text-[11px] mb-1">Template Contract Preview</span>
              <div className="p-3 rounded-lg border border-[#E5E1D8] bg-white font-mono text-[11px] text-[#0F1B2D] max-h-48 overflow-y-auto whitespace-pre-wrap leading-relaxed">
                {selectedTemplate.contentBody}
              </div>
            </div>

            <div>
              <span className="text-[#A0A7B4] block text-[11px] mb-1">Metadata & Governance</span>
              <div className="p-3 rounded-lg border border-[#E5E1D8] bg-white space-y-1.5">
                <div>Owner Authority: <strong>{selectedTemplate.owner}</strong></div>
                <div>Target Audience: <strong>{selectedTemplate.audience}</strong></div>
                <div>User Feedback Score: <strong>{selectedTemplate.feedbackScore}</strong></div>
                <div>Published Status: <span className="font-mono font-medium text-[#286749]">{selectedTemplate.status}</span></div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 pt-2">
              <Link
                href={`/admin/templates/${selectedTemplate.id}`}
                className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-[#0F1B2D] text-white hover:bg-[#1A2B42] text-xs font-semibold transition text-center shadow-xs"
              >
                <span>Edit Full Template Document →</span>
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
