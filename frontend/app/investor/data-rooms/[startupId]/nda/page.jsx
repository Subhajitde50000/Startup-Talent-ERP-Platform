'use client';
import { useState } from 'react';
import Link from 'next/link';
import { ShieldCheck, Download, Check } from 'lucide-react';
import { InvestorShell, Card, Button } from '@/components';
import { deals, InvestorDisclaimer } from '../../../investor-data';

export default function InvestorNDAPage({ params }) {
  const startupId = params?.startupId || 'acme';
  const deal = deals.find((d) => d.id === startupId) || deals[0];

  const [legalName, setLegalName] = useState('Arjun Mehta');
  const [agreed, setAgreed] = useState(false);
  const [purposeAgreed, setPurposeAgreed] = useState(false);
  const [signed, setSigned] = useState(false);

  return (
    <InvestorShell
      active="Data rooms"
      module="Deal flow"
      title={`Mutual NDA · ${deal.name}`}
      description="Review and execute confidentiality terms prior to inspecting proprietary data."
      backHref="/investor/data-rooms"
      backLabel="← Back to Data rooms"
    >
      {({ notify }) => (
        <div className="mx-auto max-w-3xl space-y-6">
          {/* Progress bar */}
          <div className="flex items-center justify-between text-xs font-semibold">
            {[
              '1. Review agreement',
              '2. Confirm identity',
              '3. Execute signature',
              '4. Access granted',
            ].map((step, idx) => (
              <span
                key={step}
                className={`rounded-full px-3 py-1.5 transition ${
                  idx <= 2
                    ? 'bg-[#F3EBDD] text-[#806236]'
                    : 'bg-[#F3F4F6] text-[#4A5568]'
                }`}
              >
                {step}
              </span>
            ))}
          </div>

          <Card title="Key terms & obligations">
            <ul className="space-y-2.5 text-xs leading-relaxed text-ink">
              <li className="flex items-start gap-2">
                <span className="text-[#806236]">•</span>
                <span>
                  <b>Confidential Information</b> includes non-public technology, financial models, customer registries, cap tables and roadmap data.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#806236]">•</span>
                <span>
                  <b>Purpose Limitation:</b> Information may be accessed solely for assessing a direct equity/SAFE investment in {deal.name}.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#806236]">•</span>
                <span>
                  <b>Watermarking & Audit:</b> All documents are dynamically stamped with the signer's identity and timestamp. Viewing logs are audited.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#806236]">•</span>
                <span>
                  <b>Term:</b> Confidentiality covenants remain binding for 3 years post-termination. Governing law: India.
                </span>
              </li>
            </ul>
          </Card>

          <Card
            title="Full Agreement · Version 2.1"
            action={
              <button
                type="button"
                onClick={() => notify('Downloaded copy of Mutual NDA.')}
                className="inline-flex items-center gap-1 text-xs font-semibold text-[#9A7A45] hover:underline"
              >
                <Download size={14} /> Download PDF
              </button>
            }
          >
            <div className="max-h-48 overflow-y-auto rounded-lg bg-[#FAF8F4] p-4 text-xs leading-relaxed text-[#4A5568] border border-[#E5E1D8]">
              This Non-Disclosure Agreement (the "Agreement") is entered into between {deal.name} Private Limited (the "Company")
              and Arjun Mehta, representing Forma Ventures (the "Receiving Party"). The Receiving Party agrees that all materials,
              including cap tables, forecasts, and architecture diagrams, constitute valuable proprietary information. The Receiving
              Party agrees to prevent unauthorized dissemination and to exercise standard commercial care.
            </div>
          </Card>

          <Card title="Signatory verification & execution">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!agreed || !purposeAgreed || !legalName) {
                  notify('Please accept all required acknowledgments.');
                  return;
                }
                setSigned(true);
                notify('NDA signed and recorded! Opening data room access...');
              }}
              className="space-y-4"
            >
              <div className="space-y-2">
                <label className="flex items-center gap-2.5 text-xs text-ink cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="h-4 w-4 rounded accent-ink"
                  />
                  <span>I have read, understood and agree to be bound by the terms of this Mutual NDA.</span>
                </label>

                <label className="flex items-center gap-2.5 text-xs text-ink cursor-pointer">
                  <input
                    type="checkbox"
                    checked={purposeAgreed}
                    onChange={(e) => setPurposeAgreed(e.target.checked)}
                    className="h-4 w-4 rounded accent-ink"
                  />
                  <span>I will use materials solely to evaluate an investment in {deal.name}.</span>
                </label>
              </div>

              <div>
                <label htmlFor="legal-name" className="block text-xs font-medium text-ink">
                  Type your full legal name to execute
                </label>
                <input
                  id="legal-name"
                  required
                  value={legalName}
                  onChange={(e) => setLegalName(e.target.value)}
                  className="mt-1 h-10 w-full rounded-lg border border-[#E5E1D8] px-3 text-xs focus:border-ink focus:outline-none"
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#E5E1D8] pt-4">
                <Link
                  href="/investor/data-rooms"
                  className="rounded-lg border border-[#E5E1D8] bg-white px-4 py-2 text-xs font-medium text-[#4A5568] hover:bg-[#FAF8F4]"
                >
                  Decline & return
                </Link>
                {signed ? (
                  <Link
                    href={`/investor/data-rooms/${deal.id}`}
                    className="inline-flex min-h-10 items-center gap-1.5 rounded-lg bg-[#286749] px-5 text-xs font-semibold text-white"
                  >
                    <Check size={16} /> Enter Data Room
                  </Link>
                ) : (
                  <Button type="submit">Sign & Continue to Data Room</Button>
                )}
              </div>
            </form>
          </Card>

          <InvestorDisclaimer onLearnMore={() => notify('Platform disclaimer opened.')} />
        </div>
      )}
    </InvestorShell>
  );
}
