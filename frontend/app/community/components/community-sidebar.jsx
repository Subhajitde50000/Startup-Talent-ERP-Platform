'use client';

import React from 'react';
import Link from 'next/link';
import {
  Layers,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Lock,
  BookOpen,
  ChevronRight,
  HelpCircle,
  TrendingUp,
  Users,
  Briefcase,
  UserCheck,
  Compass,
  Globe,
  ArrowUpRight,
} from 'lucide-react';

export default function CommunitySidebar({
  activePersona,
  spaces,
  selectedSpaceSlug,
  onSelectSpace,
  postsCount,
  onShowToast,
  currentRole = 'startup',
}) {
  // Check access to a space
  const canAccessSpace = (space) => {
    if (activePersona.roleKey === 'admin') return true;
    if (space.allowedRoles.includes('all')) return true;
    return space.allowedRoles.includes(activePersona.roleKey);
  };

  return (
    <aside className="space-y-5">
      {/* Active User Persona Card */}
      <div className="rounded-xl border border-[#E5E1D8] bg-white p-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#0F1B2D] font-serif font-bold text-white text-sm">
            {activePersona.avatar}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <span className="truncate text-sm font-bold text-[#0F1B2D]">
                {activePersona.name}
              </span>
              {activePersona.verified && (
                <CheckCircle2 size={13} className="shrink-0 text-[#B8955A]" />
              )}
            </div>
            <p className="truncate text-xs text-[#5A6E85]">{activePersona.role}</p>
          </div>
        </div>

        {/* Persona Stats */}
        <div className="mt-3.5 grid grid-cols-2 gap-2 border-t border-[#F2EFE9] pt-3 text-center">
          <div className="rounded-lg bg-[#FAF8F4] p-2">
            <p className="text-base font-bold text-[#0F1B2D]">
              {activePersona.helpfulAnswersCount}
            </p>
            <p className="text-[10px] text-[#5A6E85]">Helpful Votes</p>
          </div>
          <div className="rounded-lg bg-[#FAF8F4] p-2">
            <p className="text-base font-bold text-emerald-800">
              {activePersona.acceptedAnswersCount}
            </p>
            <p className="text-[10px] text-[#5A6E85]">Accepted Solutions</p>
          </div>
        </div>
      </div>

      {/* Global Community Hub Card */}
      <div className="rounded-xl border border-[#E5E1D8] bg-white p-3 shadow-sm">
        <Link
          href="/community"
          className={`flex items-center justify-between rounded-lg p-2.5 text-xs font-medium transition ${
            currentRole === 'global'
              ? 'bg-[#0F1B2D] text-white shadow-xs'
              : 'border border-[#E5E1D8] bg-[#FAF8F4] text-[#0F1B2D] hover:bg-white hover:border-[#0F1B2D]'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                currentRole === 'global'
                  ? 'bg-[#1C2B42] text-[#B8955A]'
                  : 'bg-[#0F1B2D] text-[#B8955A]'
              }`}
            >
              <Globe size={16} />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-xs">Global Hub</span>
                {currentRole === 'global' ? (
                  <span className="rounded bg-[#B8955A]/20 px-1.5 py-0.2 text-[9px] font-bold text-[#B8955A]">
                    Active
                  </span>
                ) : (
                  <span className="rounded bg-emerald-50 px-1.5 py-0.2 text-[9px] font-bold text-emerald-800">
                    Open
                  </span>
                )}
              </div>
              <p
                className={`text-[10px] ${
                  currentRole === 'global' ? 'text-[#94A3B8]' : 'text-[#5A6E85]'
                }`}
              >
                All-role discussions & AMAs
              </p>
            </div>
          </div>
          {currentRole !== 'global' && (
            <ArrowUpRight size={14} className="text-[#7B8CA3]" />
          )}
        </Link>
      </div>

      {/* Topic Spaces Navigation */}
      <div className="rounded-xl border border-[#E5E1D8] bg-white p-4 shadow-sm">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#7B8CA3] flex items-center gap-1.5">
            <Layers size={14} className="text-[#B8955A]" />
            Topic Spaces
          </h3>
          <span className="text-[11px] font-semibold text-[#5A6E85]">Open</span>
        </div>

        <div className="space-y-1">
          <button
            onClick={() => onSelectSpace('all')}
            className={`w-full flex items-center justify-between rounded-lg px-2.5 py-2 text-left text-xs font-medium transition ${
              selectedSpaceSlug === 'all'
                ? 'bg-[#0F1B2D] text-white font-semibold'
                : 'text-[#0F1B2D] hover:bg-[#FAF8F4]'
            }`}
          >
            <span className="flex items-center gap-2">
              <Sparkles
                size={14}
                className={selectedSpaceSlug === 'all' ? 'text-[#B8955A]' : 'text-[#7B8CA3]'}
              />
              <span>All Open Feeds</span>
            </span>
            <span
              className={`text-[10px] rounded-full px-1.5 py-0.5 ${
                selectedSpaceSlug === 'all' ? 'bg-white/20 text-white' : 'text-[#7B8CA3]'
              }`}
            >
              {postsCount}
            </span>
          </button>

          {spaces
            .filter((s) => s.categoryKey === 'open')
            .map((space) => {
              const isSelected = selectedSpaceSlug === space.slug;
              return (
                <button
                  key={space.id}
                  onClick={() => onSelectSpace(space.slug)}
                  className={`w-full flex items-center justify-between rounded-lg px-2.5 py-2 text-left text-xs font-medium transition ${
                    isSelected
                      ? 'bg-[#0F1B2D] text-white font-semibold'
                      : 'text-[#5A6E85] hover:bg-[#FAF8F4] hover:text-[#0F1B2D]'
                  }`}
                >
                  <span className="truncate"># {space.name}</span>
                  {space.isJoined && (
                    <span className="h-1.5 w-1.5 rounded-full bg-[#B8955A]" />
                  )}
                </button>
              );
            })}
        </div>

        {/* Role Lounges Section */}
        <div className="mt-5 border-t border-[#F2EFE9] pt-4">
          <h3 className="mb-2.5 text-xs font-bold uppercase tracking-wider text-[#7B8CA3] flex items-center gap-1.5">
            <ShieldCheck size={14} className="text-[#B8955A]" />
            Role Lounges
          </h3>
          <div className="space-y-1">
            {spaces
              .filter((s) => s.categoryKey === 'lounge')
              .map((lounge) => {
                const hasAccess = canAccessSpace(lounge);
                const isSelected = selectedSpaceSlug === lounge.slug;

                return (
                  <button
                    key={lounge.id}
                    onClick={() => {
                      if (hasAccess) {
                        onSelectSpace(lounge.slug);
                      } else {
                        onShowToast(`Locked: ${lounge.audience}. Switch role to enter.`);
                      }
                    }}
                    className={`w-full flex items-center justify-between rounded-lg px-2.5 py-2 text-left text-xs font-medium transition ${
                      isSelected
                        ? 'bg-[#0F1B2D] text-white font-semibold'
                        : hasAccess
                        ? 'text-[#0F1B2D] hover:bg-[#FAF8F4]'
                        : 'text-[#A0AEC0] hover:bg-red-50/50 cursor-pointer'
                    }`}
                  >
                    <span className="flex items-center gap-2 truncate">
                      {!hasAccess && <Lock size={12} className="shrink-0 text-[#A0AEC0]" />}
                      <span className="truncate">{lounge.name}</span>
                    </span>
                    <span
                      className={`text-[9px] font-semibold uppercase px-1.5 py-0.5 rounded ${
                        hasAccess
                          ? 'bg-emerald-50 text-emerald-800'
                          : 'bg-[#F2EFE9] text-[#7B8CA3]'
                      }`}
                    >
                      {hasAccess ? 'Unlocked' : 'Locked'}
                    </span>
                  </button>
                );
              })}
          </div>
        </div>
      </div>

      {/* Community Code / Safety Rules Card */}
      <div className="rounded-xl border border-[#E5E1D8] bg-[#FAF8F4] p-4 text-xs text-[#5A6E85]">
        <div className="flex items-center gap-1.5 font-bold text-[#0F1B2D] mb-1.5">
          <BookOpen size={14} className="text-[#B8955A]" />
          <span>Community Code</span>
        </div>
        <p className="text-[11px] leading-relaxed mb-2.5">
          Zero tolerance for unsolicited fundraising pitches, fee fraud, or PII harvesting. Keep conversations constructive and helpful.
        </p>
        <div className="text-[11px] font-semibold text-[#B8955A] flex items-center gap-1">
          <span>Trust & Safety Protected</span>
          <ShieldCheck size={13} />
        </div>
      </div>
    </aside>
  );
}
