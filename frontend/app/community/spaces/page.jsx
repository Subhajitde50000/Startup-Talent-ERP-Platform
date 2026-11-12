'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Layers,
  ArrowLeft,
  Search,
  CheckCircle2,
  Lock,
  ShieldCheck,
  Users,
  Compass,
  Lightbulb,
  Briefcase,
  UserCheck,
  Calendar,
  Bell,
  HelpCircle,
  TrendingUp,
  Sparkles,
  Wrench,
  ChevronRight,
  PlusCircle,
} from 'lucide-react';
import CommunityHeader from '../community-header';
import { COMMUNITY_PERSONAS, COMMUNITY_SPACES } from '../community-data';

export default function SpacesDirectoryPage() {
  const [activePersona, setActivePersona] = useState(COMMUNITY_PERSONAS[0]);
  const [spaces, setSpaces] = useState(COMMUNITY_SPACES);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 2700);
  };

  const handleToggleJoin = (spaceSlug) => {
    setSpaces((prev) =>
      prev.map((s) => {
        if (s.slug === spaceSlug) {
          const next = !s.isJoined;
          showToast(next ? `Joined #${s.name}` : `Left #${s.name}`);
          return {
            ...s,
            isJoined: next,
            memberCount: next ? s.memberCount + 1 : s.memberCount - 1,
          };
        }
        return s;
      })
    );
  };

  const canAccessSpace = (space) => {
    if (space.allowedRoles.includes('all')) return true;
    if (space.allowedRoles.includes(activePersona.roleKey)) return true;
    return false;
  };

  const filteredSpaces = spaces.filter((s) => {
    if (categoryFilter !== 'all' && s.categoryKey !== categoryFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        s.name.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-[#FAF8F4] text-[#0F1B2D]">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 rounded-xl bg-[#0F1B2D] text-[#FAF8F4] px-4 py-3 text-xs font-semibold shadow-2xl border border-[#B8955A] flex items-center gap-2">
          <CheckCircle2 size={16} className="text-[#B8955A]" />
          <span>{toastMessage}</span>
        </div>
      )}

      <CommunityHeader
        activePersona={activePersona}
        onSelectPersona={setActivePersona}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb & Title */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-[#E5E1D8] pb-5 mb-6">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#64748B] mb-1">
              <Link href="/community" className="hover:text-[#0F1B2D]">Community</Link>
              <span>/</span>
              <span className="font-semibold text-[#0F1B2D]">Spaces Directory</span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#0F1B2D]">
              Explore Community Spaces
            </h1>
            <p className="text-xs text-[#64748B] mt-1 max-w-2xl">
              Topic rooms, verified role lounges, and official announcement spaces designed to keep discussions structured, high-signal, and safe.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/community"
              className="inline-flex items-center gap-1.5 rounded-lg border border-[#E5E1D8] bg-white px-3.5 py-2 text-xs font-semibold text-[#0F1B2D] hover:bg-[#FAF8F4]"
            >
              <ArrowLeft size={14} />
              <span>Back to Feed</span>
            </Link>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-6 bg-white p-3 rounded-xl border border-[#E5E1D8] shadow-2xs">
          <div className="flex flex-wrap items-center gap-2">
            {[
              { key: 'all', label: 'All Spaces (' + spaces.length + ')' },
              { key: 'open', label: 'Open Topics' },
              { key: 'lounge', label: 'Role Lounges' },
              { key: 'official', label: 'Official & AMAs' },
            ].map((cat) => (
              <button
                key={cat.key}
                type="button"
                onClick={() => setCategoryFilter(cat.key)}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                  categoryFilter === cat.key
                    ? 'bg-[#0F1B2D] text-white'
                    : 'bg-[#FAF8F4] text-[#475569] hover:bg-[#E5E1D8] hover:text-[#0F1B2D]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <span className="text-xs text-[#64748B]">
            Viewing as: <strong>{activePersona.name}</strong> ({activePersona.role})
          </span>
        </div>

        {/* Spaces Cards Grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredSpaces.map((space) => {
            const hasAccess = canAccessSpace(space);
            return (
              <div
                key={space.id}
                className="flex flex-col justify-between rounded-xl border border-[#E5E1D8] bg-white p-5 shadow-2xs hover:border-[#B8955A] hover:shadow-md transition"
              >
                <div>
                  {/* Category Pill & Access Badge */}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="rounded bg-[#FAF8F4] border border-[#E5E1D8] px-2 py-0.5 text-[10px] font-mono text-[#64748B]">
                      {space.category}
                    </span>
                    {space.categoryKey === 'lounge' && (
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2 py-0.2 text-[9px] font-bold ${
                          hasAccess
                            ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                            : 'bg-slate-100 text-[#94A3B8] border border-slate-200'
                        }`}
                      >
                        {hasAccess ? <CheckCircle2 size={10} /> : <Lock size={10} />}
                        <span>{hasAccess ? 'Unlocked' : 'Role Restricted'}</span>
                      </span>
                    )}
                  </div>

                  <h3 className="font-serif text-base font-bold text-[#0F1B2D] flex items-center gap-2">
                    <span>#{space.name}</span>
                  </h3>

                  <p className="text-xs text-[#475569] mt-2 line-clamp-2 leading-relaxed">
                    {space.description}
                  </p>

                  {/* Rules preview */}
                  <div className="mt-3 rounded-lg bg-[#FAF8F4] border border-[#E5E1D8]/60 p-2 text-[10px] text-[#64748B] space-y-1">
                    <span className="font-bold text-[#0F1B2D] block">Key Rule:</span>
                    <p className="line-clamp-2">• {space.rules[0]}</p>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-[#E5E1D8] flex items-center justify-between text-xs">
                  <div className="text-[11px] text-[#64748B]">
                    <strong>{space.memberCount.toLocaleString()}</strong> members
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        if (hasAccess) {
                          handleToggleJoin(space.slug);
                        } else {
                          showToast(`Access restricted to verified ${space.audience}.`);
                        }
                      }}
                      className={`rounded-lg px-3 py-1.5 font-semibold text-xs transition ${
                        space.isJoined
                          ? 'border border-[#E5E1D8] bg-[#FAF8F4] text-[#64748B] hover:bg-rose-50 hover:text-rose-600'
                          : hasAccess
                          ? 'bg-[#0F1B2D] text-white hover:bg-[#1C2B42]'
                          : 'bg-slate-100 text-[#94A3B8] cursor-not-allowed'
                      }`}
                    >
                      {space.isJoined ? 'Joined' : 'Join'}
                    </button>

                    <Link
                      href={`/community/spaces/${space.slug}`}
                      className="rounded-lg border border-[#E5E1D8] p-1.5 text-[#0F1B2D] hover:border-[#B8955A] hover:text-[#B8955A]"
                      title="Open Space"
                    >
                      <ChevronRight size={15} />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
