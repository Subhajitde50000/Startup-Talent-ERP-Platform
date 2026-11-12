'use client';

import React, { useState } from 'react';
import { X, UserPlus, ShieldCheck } from 'lucide-react';

export default function ConnectModal({
  targetUser,
  activePersona,
  onClose,
  onSuccess,
}) {
  const [note, setNote] = useState('');

  // Prohibit cold messages from founder/jobseeker to investors per specification
  const isBlockedFlow =
    (activePersona.roleKey === 'startup' || activePersona.roleKey === 'jobseeker') &&
    targetUser.roleKey === 'investor';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0F1B2D]/60 p-4 backdrop-blur-sm animate-in fade-in">
      <div className="w-full max-w-md rounded-2xl border border-[#E5E1D8] bg-white p-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-[#F2EFE9] pb-3">
          <h3 className="font-serif text-base font-bold text-[#0F1B2D] flex items-center gap-1.5">
            <UserPlus size={16} className="text-[#B8955A]" />
            Connect with {targetUser.name}
          </h3>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-[#7B8CA3] hover:bg-[#FAF8F4] hover:text-[#0F1B2D]"
          >
            <X size={18} />
          </button>
        </div>

        {isBlockedFlow ? (
          <div className="mt-4 rounded-xl border border-amber-300 bg-amber-50 p-4 text-xs text-amber-900 space-y-2">
            <p className="font-bold">Investor Outreach Safeguard</p>
            <p className="text-[11px] leading-relaxed">
              To protect investor inboxes from unsolicited solicitations, founders and candidates cannot send cold private connect requests in Community.
            </p>
            <p className="text-[11px] font-semibold text-[#0F1B2D]">
              Please request a warm introduction via <span className="underline">Discover Startups</span> or share your startup profile.
            </p>
            <div className="mt-4 flex justify-end">
              <button
                onClick={onClose}
                className="rounded-lg bg-[#0F1B2D] px-4 py-1.5 text-xs font-bold text-white"
              >
                Understood
              </button>
            </div>
          </div>
        ) : (
          <div className="mt-4 space-y-3 text-xs">
            <div className="rounded-lg bg-[#FAF8F4] p-3 text-xs border border-[#E5E1D8]">
              <p className="font-semibold text-[#0F1B2D]">{targetUser.name}</p>
              <p className="text-[11px] text-[#5A6E85]">{targetUser.role} • {targetUser.organization}</p>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#7B8CA3] mb-1">
                Personalized Note (Required, max 300 chars)
              </label>
              <textarea
                required
                maxLength={300}
                rows={4}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Hi, I saw your discussion on GST invoicing/tech architecture and would love to connect..."
                className="w-full rounded-lg border border-[#E5E1D8] p-2.5 text-xs text-[#0F1B2D] focus:border-[#0F1B2D] focus:outline-none"
              />
              <p className="text-right text-[10px] text-[#7B8CA3] mt-1">{note.length} / 300</p>
            </div>

            <div className="flex items-center gap-1.5 text-[10px] text-[#7B8CA3] pt-1">
              <ShieldCheck size={13} className="text-[#B8955A]" />
              <span>Connect requests open safe conversations in platform Messages.</span>
            </div>

            <div className="mt-5 flex items-center justify-end gap-2 border-t border-[#F2EFE9] pt-4">
              <button
                onClick={onClose}
                className="rounded-lg border border-[#E5E1D8] px-3.5 py-1.5 text-xs font-semibold text-[#5A6E85] hover:bg-[#FAF8F4]"
              >
                Cancel
              </button>
              <button
                disabled={!note.trim()}
                onClick={() => onSuccess(note)}
                className="rounded-lg bg-[#0F1B2D] px-4 py-1.5 text-xs font-bold text-white hover:bg-[#1C2B42] disabled:opacity-40"
              >
                Send Connect Request
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
