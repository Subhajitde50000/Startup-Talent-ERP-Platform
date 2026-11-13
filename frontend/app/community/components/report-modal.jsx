'use client';

import React, { useState } from 'react';
import { X, Flag } from 'lucide-react';

export default function ReportModal({
  post,
  onClose,
  onSubmitReport,
}) {
  const [reason, setReason] = useState('UNSOLICITED_FUNDRAISING');
  const [notes, setNotes] = useState('');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0F1B2D]/60 p-4 backdrop-blur-sm animate-in fade-in">
      <div className="w-full max-w-md rounded-2xl border border-[#E5E1D8] bg-white p-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-[#F2EFE9] pb-3">
          <h3 className="font-serif text-base font-bold text-red-900 flex items-center gap-1.5">
            <Flag size={16} className="text-red-600" />
            Report to Trust & Safety
          </h3>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-[#7B8CA3] hover:bg-[#FAF8F4] hover:text-[#0F1B2D]"
          >
            <X size={18} />
          </button>
        </div>

        <div className="mt-4 space-y-3 text-xs">
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-[#7B8CA3] mb-1">
              Violation Category
            </label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full rounded-lg border border-[#E5E1D8] bg-white p-2 text-xs text-[#0F1B2D] focus:border-[#0F1B2D] focus:outline-none"
            >
              <option value="UNSOLICITED_FUNDRAISING">Unsolicited Securities Pitch / Public Fundraising</option>
              <option value="PII_HARVESTING">Sharing Personal Phone/PAN/Aadhaar/UPI PII</option>
              <option value="UPFRONT_FEE_SCAM">Job/Interview Upfront Fee Solicitation</option>
              <option value="SPAM_COMMERCIAL">Commercial Spam / Unaffiliated Affiliate Links</option>
              <option value="HARASSMENT_ABUSE">Harassment or Abusive Conduct</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-[#7B8CA3] mb-1">
              Additional Details for Moderators
            </label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Describe why this post violates community guidelines..."
              className="w-full rounded-lg border border-[#E5E1D8] p-2 text-xs text-[#0F1B2D] focus:border-[#0F1B2D] focus:outline-none"
            />
          </div>
        </div>

        <div className="mt-5 flex items-center justify-end gap-2 border-t border-[#F2EFE9] pt-4">
          <button
            onClick={onClose}
            className="rounded-lg border border-[#E5E1D8] px-3.5 py-1.5 text-xs font-semibold text-[#5A6E85] hover:bg-[#FAF8F4]"
          >
            Cancel
          </button>
          <button
            onClick={() => onSubmitReport(reason, notes)}
            className="rounded-lg bg-red-600 px-4 py-1.5 text-xs font-bold text-white hover:bg-red-700 transition"
          >
            Submit Report
          </button>
        </div>
      </div>
    </div>
  );
}
