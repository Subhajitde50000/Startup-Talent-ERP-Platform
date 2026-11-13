'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Plus,
  Info,
  X,
} from 'lucide-react';
import MentorPageShell from '../mentor-page-shell';
import { initialAgreements, Btn, Card } from '../mentor-data';

export default function MentorAgreementsPage() {
  const [toast, setToast] = useState('');
  const [agreementTab, setAgreementTab] = useState('Active');
  const [modal, setModal] = useState('');
  const [selected, setSelected] = useState(null);
  const [agStatus, setAgStatus] = useState(initialAgreements.map((a) => a.status));

  const notify = (x) => {
    setToast(x);
    setTimeout(() => setToast(''), 2700);
  };

  const disclaimer = (
    <p className="mt-5 flex items-start gap-2 text-xs leading-4 text-[#4A5568]">
      <Info size={13} className="mt-0.5 shrink-0" />
      The platform records agreement terms and payment activity; it does not provide tax, legal or
      accounting advice. Confirm obligations with a qualified professional.
    </p>
  );

  return (
    <MentorPageShell active="Agreements" toast={toast} notify={notify}>
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm text-[#4A5568]">
            Mentor workspace <span className="mx-2 text-[#B8955A]">·</span> Money & agreements
          </p>
          <h1 className="serif mt-1 text-[30px] font-semibold text-[#0F1B2D]">
            Agreements
          </h1>
          <p className="mt-1 text-sm text-[#4A5568]">
            Review the written terms for each mentorship.
          </p>
        </div>
        <Btn secondary onClick={() => setModal('template')}>
          <Plus size={14} /> Agreement template
        </Btn>
      </div>

      <div className="mb-4 flex gap-2 overflow-x-auto pb-1">
        {['Active', 'Awaiting you', 'Proposed by you', 'Ended', 'All'].map((x) => (
          <button
            type="button"
            key={x}
            onClick={() => setAgreementTab(x)}
            className={`min-h-10 shrink-0 rounded-lg px-3 text-xs font-medium transition-colors ${
              agreementTab === x
                ? 'bg-[#0F1B2D] text-white'
                : 'border border-[#E5E1D8] bg-white text-[#4A5568] hover:bg-[#FAF8F4]'
            }`}
          >
            {x}
          </button>
        ))}
      </div>

      <Card title={`${agreementTab} agreements`}>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[780px] text-left text-xs">
            <thead className="border-b border-[#E5E1D8] text-[#4A5568]">
              <tr>
                {[
                  'Startup',
                  'Agreement type',
                  'Key terms',
                  'Equity / advisory',
                  'Start date',
                  'Status',
                  'Last updated',
                  '',
                ].map((x) => (
                  <th key={x} className="py-3 font-medium">
                    {x}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {initialAgreements
                .filter(
                  (a) =>
                    agreementTab === 'All' ||
                    (agreementTab === 'Active' && a.status === 'Active') ||
                    (agreementTab === 'Awaiting you' && a.status === 'Proposed') ||
                    (agreementTab === 'Proposed by you' && a.status === 'Proposed') ||
                    (agreementTab === 'Ended' && a.status === 'Ended')
                )
                .map((a, i) => (
                  <tr key={a.id} className="border-b border-[#E5E1D8]">
                    <td className="py-4 font-semibold text-[#0F1B2D]">{a.startup}</td>
                    <td className="text-[#4A5568]">{a.type}</td>
                    <td className="text-[#0F1B2D]">{a.terms}</td>
                    <td className="text-[#4A5568]">{a.equity}</td>
                    <td className="text-[#4A5568]">{a.start}</td>
                    <td>
                      <span
                        className={`rounded-full px-2 py-1 text-xs font-medium ${
                          a.status === 'Active'
                            ? 'bg-[#E7F3EC] text-[#286749]'
                            : 'bg-[#FFF3D6] text-[#8A5700]'
                        }`}
                      >
                        {agStatus[i] || a.status}
                      </span>
                    </td>
                    <td className="text-[#4A5568]">Nov 04</td>
                    <td className="flex items-center gap-2 py-4">
                      <Link
                        href={`/mentor/agreements/${a.id}`}
                        className="font-semibold text-[#9A7A45]"
                      >
                        Open
                      </Link>
                      {a.status === 'Proposed' && (
                        <button
                          type="button"
                          onClick={() => {
                            setSelected(a);
                            setModal('accept-agreement');
                          }}
                          className="font-semibold text-[#0F1B2D] hover:underline"
                        >
                          Accept
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </Card>

      {disclaimer}

      {/* Modals */}
      {modal && (
        <div className="fixed inset-0 z-40 grid place-items-center bg-[#0F1B2D]/45 p-4">
          <section
            role="dialog"
            aria-modal="true"
            className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl"
          >
            <div className="mb-5 flex items-center justify-between">
              <h2 className="serif text-2xl font-semibold text-[#0F1B2D]">
                {modal === 'template'
                  ? 'Agreement template preview'
                  : modal === 'accept-agreement'
                  ? 'Accept agreement'
                  : 'Action'}
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

            {modal === 'template' ? (
              <div className="space-y-3 text-xs leading-5 text-[#4A5568]">
                <p>Standard Forma Mentorship Agreement template v3.0:</p>
                <ul className="list-disc pl-4 space-y-1 text-[#0F1B2D]">
                  <li>Scope: Bi-weekly advisory and readiness milestone tracking.</li>
                  <li>Session fee released after verified attendance.</li>
                  <li>Optional equity clauses require separate legal review.</li>
                  <li>No exclusivity or restrictive non-compete.</li>
                </ul>
              </div>
            ) : modal === 'accept-agreement' ? (
              <div className="space-y-4 text-sm">
                <p className="text-[#0F1B2D]">
                  Startup: <b>{selected?.startup}</b>
                </p>
                <p className="text-[#4A5568]">Fee: ₹3,500 per session · Monthly cadence · 3 months.</p>
                <label className="flex items-center gap-2 text-xs text-[#4A5568]">
                  <input aria-label="Toggle option" type="checkbox" className="accent-[#0F1B2D]" />
                  I have read and understand the agreement terms.
                </label>
                <label className="flex items-center gap-2 text-xs text-[#4A5568]">
                  <input aria-label="Toggle option" type="checkbox" className="accent-[#0F1B2D]" />
                  I understand equity terms should be reviewed with a lawyer.
                </label>
                <p className="text-xs text-[#4A5568]">
                  Sensitive acceptance requires re-authentication in the production system.
                </p>
              </div>
            ) : null}

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
                  if (modal === 'accept-agreement') {
                    setAgStatus(agStatus.map((s, i) => (i === 2 ? 'Active' : s)));
                    notify('Agreement accepted and recorded.');
                  } else {
                    notify('Template downloaded.');
                  }
                  setModal('');
                }}
                className="min-h-10 rounded-lg bg-[#0F1B2D] px-4 text-sm font-semibold text-white hover:bg-[#1C2B42]"
              >
                {modal === 'accept-agreement' ? 'Accept agreement' : 'Close'}
              </button>
            </div>
          </section>
        </div>
      )}
    </MentorPageShell>
  );
}
