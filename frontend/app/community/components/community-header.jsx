'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  MessageSquare,
  Search,
  Bell,
  CheckCircle2,
  ChevronDown,
  ShieldCheck,
  PlusCircle,
  ExternalLink,
  Globe,
} from 'lucide-react';
import { COMMUNITY_PERSONAS } from '../community-data';

export default function CommunityHeader({
  activePersona,
  onSelectPersona,
  onOpenCompose,
  searchQuery,
  onSearchChange,
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b border-[#E5E1D8] bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Brand & Title */}
        <div className="flex items-center gap-3">
          <Link
            href="/community"
            className="flex items-center gap-2 text-[#0F1B2D] transition hover:opacity-90"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#0F1B2D] text-white shadow-sm">
              <MessageSquare size={18} className="text-[#B8955A]" />
            </div>
            <div>
              <span className="font-serif text-lg font-bold tracking-tight text-[#0F1B2D]">
                Community
              </span>
              <span className="hidden text-[10px] font-medium uppercase tracking-wider text-[#7B8CA3] sm:inline-block sm:ml-2">
                Verified Exchange
              </span>
            </div>
          </Link>

          <Link
            href="/community"
            className="hidden lg:flex items-center gap-1.5 rounded-full border border-[#E5E1D8] bg-[#FAF8F4] px-2.5 py-1 text-[11px] font-semibold text-[#0F1B2D] hover:bg-white hover:border-[#0F1B2D] transition shadow-2xs"
            title="Go to Global Community Hub"
          >
            <Globe size={12} className="text-[#B8955A]" />
            <span>Global Hub</span>
          </Link>
        </div>

        {/* Global Search Bar */}
        <div className="mx-4 hidden max-w-md flex-1 md:block">
          <div className="relative">
            <Search
              size={15}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7B8CA3]"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search questions, discussions, milestones, and playbooks..."
              className="w-full rounded-full border border-[#E5E1D8] bg-[#FAF8F4] py-1.5 pl-9 pr-4 text-xs text-[#0F1B2D] placeholder:text-[#A0AEC0] focus:border-[#0F1B2D] focus:bg-white focus:outline-none transition"
            />
          </div>
        </div>

        {/* Actions & Role Persona Switcher */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onOpenCompose('Question')}
            className="flex items-center gap-1.5 rounded-lg bg-[#0F1B2D] px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-[#1C2B42] transition"
          >
            <PlusCircle size={14} className="text-[#B8955A]" />
            <span className="hidden sm:inline">Start Post</span>
          </button>

          {/* Role Persona Switcher Dropdown */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 rounded-lg border border-[#E5E1D8] bg-[#FAF8F4] p-1.5 pr-2.5 text-xs text-[#0F1B2D] hover:border-[#0F1B2D] transition"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#0F1B2D] text-[11px] font-bold text-white shrink-0">
                {activePersona.avatar}
              </span>
              <span className="hidden text-left sm:block">
                <span className="flex items-center gap-1">
                  <span className="font-bold text-[#0F1B2D] text-[11px]">{activePersona.name}</span>
                  {activePersona.verified && (
                    <CheckCircle2 size={11} className="text-[#B8955A]" />
                  )}
                </span>
                <span className="block text-[10px] text-[#5A6E85]">{activePersona.role}</span>
              </span>
              <ChevronDown size={13} className="text-[#7B8CA3]" />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 rounded-xl border border-[#E5E1D8] bg-white p-2 shadow-xl z-50 animate-in fade-in slide-in-from-top-1">
                <div className="px-2 py-1.5 border-b border-[#F2EFE9] mb-1">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[#7B8CA3]">
                    Switch Posting Identity
                  </p>
                </div>

                <div className="space-y-1">
                  {COMMUNITY_PERSONAS.map((persona) => {
                    const isSelected = persona.id === activePersona.id;
                    return (
                      <button
                        key={persona.id}
                        onClick={() => {
                          onSelectPersona(persona);
                          setDropdownOpen(false);
                        }}
                        className={`w-full flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-xs transition ${
                          isSelected
                            ? 'bg-[#0F1B2D] text-white font-semibold'
                            : 'text-[#0F1B2D] hover:bg-[#FAF8F4]'
                        }`}
                      >
                        <span
                          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${
                            isSelected ? 'bg-[#B8955A] text-white' : 'bg-[#0F1B2D] text-white'
                          }`}
                        >
                          {persona.avatar}
                        </span>
                        <span className="truncate">
                          <span className="flex items-center gap-1">
                            <span className="truncate">{persona.name}</span>
                            {persona.verified && (
                              <CheckCircle2
                                size={11}
                                className={isSelected ? 'text-[#B8955A]' : 'text-[#B8955A]'}
                              />
                            )}
                          </span>
                          <span
                            className={`block truncate text-[10px] ${
                              isSelected ? 'text-[#D6D0C4]' : 'text-[#7B8CA3]'
                            }`}
                          >
                            {persona.role}
                          </span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
