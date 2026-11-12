'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Search,
  PlusCircle,
  ShieldCheck,
  ChevronDown,
  Layers,
  BookOpen,
  ArrowLeft,
  Sparkles,
  UserCheck,
  Check,
  Bell,
  Menu,
  X,
} from 'lucide-react';
import { COMMUNITY_PERSONAS } from './community-data';

export default function CommunityHeader({
  activePersona,
  onSelectPersona,
  onOpenCompose,
  searchQuery,
  onSearchChange,
  unreadCount = 2,
}) {
  const [personaOpen, setPersonaOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Determine back link based on active persona
  const getWorkspaceBackUrl = () => {
    if (!activePersona) return '/startup/dashboard';
    switch (activePersona.roleKey) {
      case 'mentor':
        return '/mentor/dashboard';
      case 'investor':
        return '/investor/dashboard';
      case 'employer':
        return '/employer/dashboard';
      case 'jobseeker':
        return '/jobseeker/dashboard';
      default:
        return '/startup/dashboard';
    }
  };

  return (
    <header className="sticky top-0 z-30 border-b border-[#E5E1D8] bg-[#FAF8F4]/95 backdrop-blur-md transition">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand & Breadcrumb */}
        <div className="flex items-center gap-3">
          <Link
            href={getWorkspaceBackUrl()}
            className="flex items-center gap-1.5 text-xs text-[#64748B] hover:text-[#0F1B2D] transition border border-[#E5E1D8] bg-white rounded-lg px-2.5 py-1.5 shadow-2xs"
            title="Return to your primary Workspace"
          >
            <ArrowLeft size={13} />
            <span className="hidden sm:inline">Workspace</span>
          </Link>

          <Link href="/community" className="flex items-baseline gap-2">
            <span className="font-serif text-lg font-bold text-[#0F1B2D] tracking-tight">forma</span>
            <span className="rounded bg-[#0F1B2D] px-2 py-0.5 text-[10px] font-mono font-bold tracking-wider text-[#FAF8F4]">
              COMMUNITY
            </span>
          </Link>

          {/* Guidelines Shortcut */}
          <Link
            href="/community/guidelines"
            className="hidden md:flex items-center gap-1 text-[11px] font-semibold text-[#64748B] hover:text-[#B8955A] transition ml-2"
          >
            <ShieldCheck size={13} className="text-[#B8955A]" />
            <span>Rules & Safety</span>
          </Link>
        </div>

        {/* Global Search Bar */}
        <div className="hidden lg:block relative w-72">
          <Search size={15} className="absolute left-3 top-2.5 text-[#94A3B8]" />
          <input
            type="search"
            value={searchQuery || ''}
            onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
            placeholder="Search Q&A, topics, people…"
            className="h-9 w-full rounded-lg border border-[#E5E1D8] bg-white pl-9 pr-3 text-xs text-[#0F1B2D] placeholder-[#94A3B8] outline-none focus:border-[#B8955A] focus:bg-white transition"
          />
        </div>

        {/* Actions & Persona Selector */}
        <div className="flex items-center gap-2.5">
          {/* Compose Post CTA */}
          <button
            type="button"
            onClick={onOpenCompose}
            className="inline-flex items-center gap-1.5 rounded-lg bg-[#0F1B2D] px-3.5 py-2 text-xs font-semibold text-white shadow-xs hover:bg-[#1C2B42] hover:shadow transition"
          >
            <PlusCircle size={14} className="text-[#B8955A]" />
            <span>Start a Post</span>
          </button>

          {/* Active Persona Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setPersonaOpen(!personaOpen)}
              className="flex items-center gap-2 rounded-lg border border-[#E5E1D8] bg-white p-1.5 text-xs text-[#0F1B2D] shadow-2xs hover:border-[#B8955A] transition"
              aria-label="Switch active persona to test roles"
              aria-expanded={personaOpen}
            >
              <span className="grid h-7 w-7 place-items-center rounded-full bg-[#0F1B2D] text-[11px] font-bold text-[#FAF8F4]">
                {activePersona?.avatar || 'AK'}
              </span>
              <div className="hidden sm:block text-left">
                <span className="block font-semibold text-xs leading-tight truncate max-w-[120px]">
                  {activePersona?.name}
                </span>
                <span className="block text-[10px] text-[#B8955A] font-medium leading-tight">
                  {activePersona?.role}
                </span>
              </div>
              <ChevronDown size={14} className="text-[#64748B]" />
            </button>

            {personaOpen && (
              <div className="absolute right-0 top-12 z-40 w-72 rounded-xl border border-[#E5E1D8] bg-white p-2.5 shadow-xl text-xs">
                <div className="border-b border-[#E5E1D8] pb-2 mb-2 px-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#0F1B2D] text-xs">Switch Active Persona</span>
                    <span className="rounded bg-[#FAF8F4] px-1.5 py-0.5 text-[9px] font-mono text-[#64748B]">
                      Role Simulation
                    </span>
                  </div>
                  <p className="text-[10px] text-[#64748B] mt-0.5 leading-snug">
                    Experience role-gated lounges, Expert Answer badges, and connect rules across different user types.
                  </p>
                </div>

                <div className="space-y-1">
                  {COMMUNITY_PERSONAS.map((persona) => {
                    const isSelected = activePersona?.id === persona.id;
                    return (
                      <button
                        key={persona.id}
                        type="button"
                        onClick={() => {
                          onSelectPersona(persona);
                          setPersonaOpen(false);
                        }}
                        className={`w-full flex items-center justify-between rounded-lg p-2 text-left transition ${
                          isSelected ? 'bg-[#FAF8F4] border border-[#B8955A]/50 text-[#0F1B2D]' : 'hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#0F1B2D] text-[10px] font-bold text-white">
                            {persona.avatar}
                          </span>
                          <div>
                            <span className="block font-semibold text-xs leading-snug">{persona.name}</span>
                            <span className="block text-[10px] text-[#64748B] leading-snug">{persona.role}</span>
                          </div>
                        </div>
                        {isSelected && <Check size={14} className="text-[#B8955A] shrink-0" />}
                      </button>
                    );
                  })}
                </div>

                <div className="border-t border-[#E5E1D8] pt-2 mt-2 px-1 text-[11px] flex justify-between">
                  <Link
                    href="/community/guidelines"
                    onClick={() => setPersonaOpen(false)}
                    className="text-[#64748B] hover:text-[#0F1B2D]"
                  >
                    Community Guidelines
                  </Link>
                  <Link
                    href={getWorkspaceBackUrl()}
                    onClick={() => setPersonaOpen(false)}
                    className="text-[#B8955A] font-semibold hover:underline"
                  >
                    Exit to Workspace →
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
