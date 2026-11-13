'use client';

import React from 'react';
import {
  Calendar,
  HelpCircle,
  Sparkles,
  ChevronRight,
} from 'lucide-react';
import { UPCOMING_AMAS, generateGoogleCalendarUrl } from '../community-data';

export default function CommunityRightRail({
  activePersona,
  roleHelpQuestions,
  spaces,
  rsvpedAmas,
  onToggleRsvp,
  onToggleJoinSpace,
  onOpenThread,
}) {
  return (
    <aside className="space-y-5">
      {/* Scheduled AMAs Card */}
      <div className="rounded-xl border border-[#E5E1D8] bg-white p-4 shadow-sm">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#0F1B2D] flex items-center gap-1.5">
            <Calendar size={14} className="text-[#B8955A]" />
            Scheduled AMAs
          </h3>
          <span className="rounded bg-rose-50 px-1.5 py-0.5 text-[9px] font-bold text-rose-700">
            Live
          </span>
        </div>

        <div className="space-y-3">
          {UPCOMING_AMAS.map((ama) => {
            const isRsvped = Boolean(rsvpedAmas[ama.id]);
            return (
              <div
                key={ama.id}
                className={`rounded-lg border p-3 text-xs space-y-1.5 transition ${
                  isRsvped
                    ? 'border-emerald-300 bg-emerald-50/30'
                    : 'border-[#E5E1D8] bg-[#FAF8F4]'
                }`}
              >
                <div className="flex items-start justify-between gap-1">
                  <p className="font-serif font-bold text-[#0F1B2D] leading-snug">
                    {ama.title}
                  </p>
                  {isRsvped && (
                    <span className="shrink-0 rounded bg-emerald-100 px-1.5 py-0.5 text-[9px] font-bold text-emerald-800">
                      Attending ✓
                    </span>
                  )}
                </div>
                <div className="text-[11px] text-[#5A6E85]">
                  <p className="font-semibold text-[#0F1B2D]">{ama.hostName}</p>
                  <p className="text-[#7B8CA3]">{ama.hostRole}</p>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-1 border-t border-[#E5E1D8] pt-2 text-[10px]">
                  <span className="text-[#5A6E85]">{ama.date}</span>
                  <div className="flex items-center gap-1.5">
                    {isRsvped && (
                      <a
                        href={generateGoogleCalendarUrl(ama)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] font-semibold text-[#B8955A] hover:underline"
                      >
                        Add to GCal
                      </a>
                    )}
                    <button
                      onClick={() => onToggleRsvp(ama)}
                      className={`rounded px-2 py-0.5 font-semibold transition ${
                        isRsvped
                          ? 'border border-emerald-400 bg-white text-emerald-800 hover:bg-emerald-100'
                          : 'border border-[#0F1B2D] bg-white text-[#0F1B2D] hover:bg-[#0F1B2D] hover:text-white'
                      }`}
                    >
                      {isRsvped ? 'Cancel' : 'RSVP'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Role-Aware Questions to Help With */}
      <div className="rounded-xl border border-[#E5E1D8] bg-white p-4 shadow-sm">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#0F1B2D] flex items-center gap-1.5">
            <HelpCircle size={14} className="text-[#B8955A]" />
            Questions to Help With
          </h3>
          <span className="text-[10px] font-semibold text-[#B8955A]">
            {activePersona.role?.split(' ')[0]} Match
          </span>
        </div>

        <div className="space-y-2.5">
          {roleHelpQuestions.length === 0 ? (
            <p className="text-xs text-[#7B8CA3] italic py-2 text-center">
              All relevant questions have accepted solutions!
            </p>
          ) : (
            roleHelpQuestions.map((q) => (
              <div
                key={q.id}
                onClick={() => onOpenThread(q)}
                className="cursor-pointer rounded-lg border border-[#F2EFE9] p-2.5 text-xs hover:border-[#B8955A] hover:bg-[#FAF8F4] transition"
              >
                <p className="font-medium text-[#0F1B2D] line-clamp-2 leading-snug">
                  {q.title}
                </p>
                <div className="mt-1.5 flex items-center justify-between text-[10px] text-[#7B8CA3]">
                  <span>#{q.spaceName}</span>
                  <span className="font-semibold text-amber-700">Needs Answer</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Suggested Spaces to Join */}
      <div className="rounded-xl border border-[#E5E1D8] bg-white p-4 shadow-sm">
        <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-[#0F1B2D]">
          Suggested Spaces for You
        </h3>
        <div className="space-y-2.5">
          {spaces
            .filter((s) => !s.isJoined && s.categoryKey === 'open')
            .slice(0, 3)
            .map((space) => (
              <div
                key={space.id}
                className="flex items-center justify-between text-xs rounded-lg border border-[#F2EFE9] p-2"
              >
                <div>
                  <p className="font-semibold text-[#0F1B2D]">#{space.name}</p>
                  <p className="text-[10px] text-[#7B8CA3]">{space.memberCount} members</p>
                </div>
                <button
                  onClick={() => onToggleJoinSpace(space.id)}
                  className="rounded border border-[#0F1B2D] px-2.5 py-1 text-[11px] font-semibold text-[#0F1B2D] hover:bg-[#0F1B2D] hover:text-white transition"
                >
                  Join
                </button>
              </div>
            ))}
        </div>
      </div>
    </aside>
  );
}
