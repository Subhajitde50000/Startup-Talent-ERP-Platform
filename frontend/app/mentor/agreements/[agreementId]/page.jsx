'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  Download,
  ArrowRight,
  Info,
  X,
} from 'lucide-react';
import MentorPageShell from '../../mentor-page-shell';
import { initialAgreements, Btn, Card } from '../../mentor-data';

export default function MentorAgreementDetailPage() {
  const params = useParams();
  const agreementId = params?.agreementId || 'agr-001';

  const [toast, setToast] = useState('');
  const [modal, setModal] = useState('');

  const notify = (x) => {
    setToast(x);
    setTimeout(() => setToast(''), 2700);
  };

  const agreement =
    initialAgreements.find((a) => a.id === agreementId) || initialAgreements[0];

  const triggerDownload = (filename, content = 'Forma Mentor Document Export', mime = 'text/plain') => {
    try {
      const blob = new Blob([content], { type: mime });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error('Download failed', e);
    }
  };

  const disclaimer = (
    <p className="mt-5 flex items-start gap-2 text-xs leading-4 text-[#4A5568]">
      <Info size={13} className="mt-0.5 shrink-0" />
      The platform records agreement terms and payment activity; it does not provide tax, legal or
      accounting advice. Confirm obligations with a qualified professional.
    </p>
  );

  return (
    <MentorPageShell
      active="Agreements"
      backHref="/mentor/agreements"
      backLabel="← Agreements"
      toast={toast}
      notify={notify}
    >
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm text-[#4A5568]">
            Mentor workspace <span className="mx-2 text-[#B8955A]">·</span> Money & agreements
          </p>
          <h1 className="serif mt-1 text-[30px] font-semibold text-[#0F1B2D]">
            {agreement.startup} · Agreement
          </h1>
          <p className="mt-1 text-sm text-[#4A5568]">
            {agreement.status} · Version 3 · Started {agreement.start}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/mentor/agreements"
            className="inline-flex min-h-10 items-center rounded-lg border border-[#E5E1D8] bg-white px-3 text-xs font-semibold text-[#0F1B2D] hover:bg-[#FAF8F4]"
          >
            ← Agreements
          </Link>
          <Btn
            secondary
            onClick={() =>
              triggerDownload(
                'agreement-' + agreement.id + '.txt',
                'Forma Mentorship Advisory Agreement\nID: ' +
                  agreement.id +
                  '\nStartup: ' +
                  agreement.startup +
                  '\nTerms: ' +
                  agreement.terms +
                  '\nStatus: ' +
                  agreement.status
              )
            }
          >
            <Download size={14} /> Download PDF
          </Btn>
          <Btn onClick={() => setModal('change')}>Propose change</Btn>
        </div>
      </div>

      <div className="grid items-start gap-5 xl:grid-cols-3">
        <div className="space-y-5 xl:col-span-2">
          <Card title="Agreement summary">
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                ['Status', agreement.status],
                ['Fee model', agreement.terms],
                ['Cadence', agreement.cadence],
                ['Duration', '6 months · review Jan 2027'],
                ['Equity / advisory share', agreement.equity],
                ['Cancellation', 'Free cancellation 24 hours before'],
              ].map(([x, y]) => (
                <div key={x} className="rounded-lg bg-[#FAF8F4] p-3">
                  <small className="text-xs text-[#4A5568]">{x}</small>
                  <b className="mt-1 block text-sm text-[#0F1B2D]">{y}</b>
                </div>
              ))}
            </div>
          </Card>

          <Card title="Fees and payments">
            <div className="divide-y divide-[#E5E1D8] text-xs">
              {[
                ['Session fee', '₹3,000'],
                ['Platform commission · 10%', '− ₹300'],
                ['Taxes', '₹0'],
                ['Net to mentor', '₹2,700'],
              ].map(([x, y]) => (
                <div key={x} className="flex justify-between py-3">
                  <span className="text-[#4A5568]">{x}</span>
                  <b className="text-[#0F1B2D]">{y}</b>
                </div>
              ))}
            </div>
            <p className="mt-3 text-xs text-[#4A5568]">
              From recorded agreement · Payment after session completion and release period.
            </p>
          </Card>

          <Card title="Scope & responsibilities">
            <p className="text-xs leading-5 text-[#0F1B2D]">
              Focus areas: go-to-market, pricing, customer discovery. Two sessions per month, 45
              minutes each. Expected outputs: written guidance and readiness review.
            </p>
          </Card>

          <Card title="Confidentiality & conduct">
            <p className="text-xs leading-5 text-[#4A5568]">
              Confidentiality applies to shared startup documents. Conflicts of interest must be
              disclosed. Sign-offs must be based on evidence reviewed and cannot be exchanged for
              benefits.
            </p>
          </Card>

          <Card title="Acceptance & version history">
            <p className="text-xs text-[#0F1B2D]">
              Version 3 · Accepted by Rhea Mukherjee · Oct 21, 2026
            </p>
            <p className="mt-2 text-xs text-[#4A5568]">
              Version 2 · Proposed by Acme Studio · Oct 18 · cadence updated
            </p>
            <p className="mt-2 text-xs text-[#4A5568]">Version 1 · Created Oct 10</p>
            <button
              type="button"
              onClick={() => notify('Version comparison opened.')}
              className="mt-3 text-xs font-semibold text-[#9A7A45]"
            >
              Compare versions
            </button>
          </Card>
        </div>

        <aside className="space-y-5">
          <Card title="Status & next action">
            <span className="rounded-full bg-[#E7F3EC] px-2 py-1 text-xs font-semibold text-[#286749]">
              {agreement.status}
            </span>
            <p className="mt-3 text-xs text-[#4A5568]">
              Current version active. Next review Jan 21, 2027.
            </p>
            <Link
              href="/mentor/startups/mentorship-01"
              className="mt-3 inline-block text-xs font-semibold text-[#9A7A45]"
            >
              Open mentorship workspace <ArrowRight className="inline" size={12} />
            </Link>
          </Card>

          <Card title="Linked records">
            <p className="text-xs text-[#0F1B2D]">6 sessions · ₹18,000 gross earnings</p>
            <Link
              href="/mentor/earnings"
              className="mt-3 inline-block text-xs font-semibold text-[#9A7A45]"
            >
              View earnings <ArrowRight className="inline" size={12} />
            </Link>
          </Card>

          <Card title="Need help?">
            <p className="text-xs text-[#4A5568]">
              Review equity terms with a lawyer. The platform records agreement terms and does not give
              legal advice.
            </p>
            <button
              type="button"
              onClick={() => notify('Agreement guide opened.')}
              className="mt-3 text-xs font-semibold text-[#9A7A45]"
            >
              Agreement guide
            </button>
          </Card>
        </aside>
      </div>

      {disclaimer}

      {/* Propose Change Modal */}
      {modal === 'change' && (
        <div className="fixed inset-0 z-40 grid place-items-center bg-[#0F1B2D]/45 p-4">
          <section
            role="dialog"
            aria-modal="true"
            className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl"
          >
            <div className="mb-5 flex items-center justify-between">
              <h2 className="serif text-2xl font-semibold text-[#0F1B2D]">
                Propose agreement change
              </h2>
              <button
                type="button"
                onClick={() => setModal('')}
                aria-label="Close"
                className="text-[#4A5568] hover:text-[#0F1B2D]"
              >
                <X size={18} />
              </button>
            </div>
            <label className="block text-sm font-medium text-[#0F1B2D]">
              Section to change
              <select className="mt-2 h-10 w-full rounded-lg border border-[#E5E1D8] bg-white px-3 focus:outline-none">
                <option>Fees</option>
                <option>Scope</option>
                <option>Duration</option>
                <option>Cadence</option>
              </select>
            </label>
            <label className="mt-3 block text-sm font-medium text-[#0F1B2D]">
              Reason (20–500 characters)
              <textarea
                minLength={20}
                rows={3}
                placeholder="Explain the proposed update"
                className="mt-2 w-full rounded-lg border border-[#E5E1D8] p-3 text-sm focus:outline-none"
              />
            </label>

            <div className="mt-6 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setModal('')}
                className="min-h-10 px-4 text-sm font-medium text-[#4A5568] hover:text-[#0F1B2D]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  notify('Change proposal sent to startup.');
                  setModal('');
                }}
                className="min-h-10 rounded-lg bg-[#0F1B2D] px-4 text-sm font-semibold text-white hover:bg-[#1C2B42]"
              >
                Send proposal
              </button>
            </div>
          </section>
        </div>
      )}
    </MentorPageShell>
  );
}
