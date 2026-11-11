'use client';

import React, { useState, useMemo, useCallback } from 'react';
import Link from 'next/link';
import {
  HelpCircle,
  Search,
  Book,
  AlertTriangle,
  ArrowRight,
  ExternalLink,
  ChevronRight,
  RefreshCcw,
} from 'lucide-react';
import { AdminShell } from '@/components';
import {
  Card,
  Btn,
  StatChip,
  DetailDrawer,
  toast,
} from '@/components/admin-ui';
import {
  helpTopics,
  quickLinks,
  recentlyUpdated,
} from './help-data';

export default function AdminHelpPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const filteredTopics = useMemo(() => {
    if (!searchQuery) return helpTopics;
    const q = searchQuery.toLowerCase();
    return helpTopics.filter(
      (t) => t.label.toLowerCase().includes(q) || t.desc.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  return (
    <AdminShell active="Help & Runbooks">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6 border-b border-[#E5E1D8] pb-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-serif font-bold text-[#0F1B2D]">Administrative Runbooks & Guides</h1>
          <p className="text-xs text-[#4A5568] mt-1 max-w-2xl">
            Internal procedures, incident escalation playbooks, compliance guidelines, and operational checklists.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Btn small secondary onClick={() => toast('Runbooks updated')} icon={RefreshCcw}>
            Sync
          </Btn>
        </div>
      </div>

      {/* Quick Action Cards (Fixing ADMIN-ISSUE-010 dead links) */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        {quickLinks.map((ql) => {
          const Icon = ql.icon;
          return (
            <Link
              key={ql.label}
              href={ql.href}
              className="flex items-center justify-between rounded-xl border border-[#E5E1D8] bg-white p-3.5 shadow-xs hover:border-[#B8955A] transition group"
            >
              <div className="flex items-center gap-2.5">
                <Icon size={16} className="text-[#B8955A]" />
                <span className="text-xs font-semibold text-[#0F1B2D] group-hover:text-[#B8955A] transition">
                  {ql.label}
                </span>
              </div>
              <span className="rounded bg-[#FAF8F4] border border-[#E5E1D8] px-2 py-0.5 text-[10px] font-mono text-[#4A5568]">
                {ql.badge}
              </span>
            </Link>
          );
        })}
      </div>

      {/* Search Bar */}
      <div className="border-b border-[#E5E1D8] pb-3 mb-6">
        <label htmlFor="help-search-input" className="sr-only">Search runbooks</label>
        <input
          id="help-search-input"
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search runbooks, error codes, procedures…"
          className="h-10 rounded-xl border border-[#E5E1D8] bg-white px-3.5 text-xs w-full max-w-md outline-none focus:border-[#B8955A]"
        />
      </div>

      {/* Topics Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-8">
        {filteredTopics.map((topic) => {
          const Icon = topic.icon;
          return (
            <Card key={topic.key} padded className="hover:border-[#B8955A] transition cursor-pointer">
              <div
                onClick={() => {
                  setSelectedTopic(topic);
                  setDrawerOpen(true);
                }}
                className="space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="p-2 rounded-lg bg-[#FAF8F4] text-[#0F1B2D]">
                    <Icon size={18} />
                  </div>
                  <span className="rounded-full bg-[#FAF8F4] border border-[#E5E1D8] px-2 py-0.5 text-[11px] text-[#4A5568]">
                    {topic.count} Guides
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-[#0F1B2D]">{topic.label}</h3>
                  <p className="text-xs text-[#4A5568] mt-1 leading-relaxed">{topic.desc}</p>
                </div>
                <div className="pt-2 border-t border-[#E5E1D8] flex items-center justify-between text-xs font-semibold text-[#B8955A]">
                  <span>Open Topic</span>
                  <ChevronRight size={14} />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Recently Updated Guides */}
      <Card title="Recently Updated Operational Manuals" titleIcon={Book}>
        <div className="space-y-2 text-xs">
          {recentlyUpdated.map((guide) => (
            <div
              key={guide.title}
              className="flex items-center justify-between border-b border-[#E5E1D8]/60 pb-2 last:border-0"
            >
              <div>
                <span className="font-semibold text-[#0F1B2D]">{guide.title}</span>
                <span className="text-[11px] text-[#A0A7B4] ml-2">by {guide.author}</span>
              </div>
              <span className="text-[11px] text-[#4A5568]">{guide.updated}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Topic Detail Drawer */}
      {drawerOpen && selectedTopic && (
        <DetailDrawer
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          title={`Manual: ${selectedTopic.label}`}
        >
          <div className="space-y-4 text-xs">
            <p className="text-[#4A5568] leading-relaxed">{selectedTopic.desc}</p>
            <div className="rounded-xl border border-[#E5E1D8] bg-[#FAF8F4] p-3 text-xs space-y-2">
              <span className="font-semibold text-[#0F1B2D] block">Operational Checklist</span>
              <ul className="list-disc pl-4 space-y-1 text-[#4A5568]">
                <li>Confirm administrative role elevation before modifying live state.</li>
                <li>Verify quorum approval for all irreversible data actions.</li>
                <li>All executions cryptographically logged to the audit trail.</li>
              </ul>
            </div>
            <div className="pt-2">
              <Btn onClick={() => setDrawerOpen(false)} className="w-full">
                Close Runbook
              </Btn>
            </div>
          </div>
        </DetailDrawer>
      )}
    </AdminShell>
  );
}

export { AdminHelpPage };
