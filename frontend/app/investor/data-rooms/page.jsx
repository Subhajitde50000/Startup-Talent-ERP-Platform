'use client';
import { useState } from 'react';
import Link from 'next/link';
import { FolderLock, Plus, LockKeyhole } from 'lucide-react';
import { InvestorShell, Card, Button } from '@/components';
import { deals, InvestorDisclaimer } from '../investor-data';

export default function InvestorDataRoomsPage() {
  const [filter, setFilter] = useState('Access granted');

  return (
    <InvestorShell
      active="Data rooms"
      module="Deal flow"
      title="Data room access"
      description="Manage granted document access, pending founder approvals and NDA status."
      actions={
        <Link
          href="/investor/discover"
          className="inline-flex min-h-10 items-center rounded-lg border border-[#E5E1D8] bg-white px-4 text-xs font-semibold text-ink hover:bg-[#FAF8F4]"
        >
          Request new access
        </Link>
      }
    >
      {({ notify }) => (
        <>
          {/* Stat Strip */}
          <div className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {[
              ['Rooms open', '2'],
              ['NDAs to sign', '1'],
              ['Expiring in 7 days', '1'],
              ['New documents', '3'],
            ].map(([x, y]) => (
              <div key={x} className="rounded-xl border border-[#E5E1D8] bg-white p-5">
                <span className="text-xs font-medium text-[#4A5568]">{x}</span>
                <span className="serif mt-1 block text-3xl font-semibold text-ink">{y}</span>
              </div>
            ))}
          </div>

          {/* Sub Navigation Tabs */}
          <div className="mb-6 flex gap-2">
            {['Access granted', 'Requested', 'NDA pending', 'Expired and revoked'].map((x) => (
              <button
                key={x}
                type="button"
                onClick={() => setFilter(x)}
                className={`min-h-10 rounded-lg px-4 text-xs font-semibold transition ${
                  filter === x
                    ? 'bg-ink text-white'
                    : 'border border-[#E5E1D8] bg-white text-[#4A5568] hover:bg-[#FAF8F4] hover:text-ink'
                }`}
              >
                {x}
              </button>
            ))}
          </div>

          {/* Data room cards */}
          <div className="space-y-4">
            {deals.slice(0, 3).map((d) => (
              <Card
                key={d.id}
                title={
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-ink">{d.name}</span>
                    <span className="rounded-full bg-[#E7F3EC] px-2.5 py-0.5 text-xs font-semibold text-[#286749]">
                      {d.room}
                    </span>
                  </div>
                }
                action={<span className="text-xs text-[#4A5568]">Expires Nov 30, 2026</span>}
              >
                <div className="grid gap-4 sm:grid-cols-3 text-xs border-y border-[#E5E1D8] py-3.5 my-2">
                  <div>
                    <span className="block text-[#4A5568]">Approved scope</span>
                    <b className="mt-0.5 block font-semibold text-ink">Corporate · Financials · Pitch (8 docs)</b>
                  </div>
                  <div>
                    <span className="block text-[#4A5568]">NDA status</span>
                    <b className="mt-0.5 block font-semibold text-ink">
                      {d.id === 'greenledger' ? 'Pending signature' : 'Signed · Nov 01, 2026'}
                    </b>
                  </div>
                  <div>
                    <span className="block text-[#4A5568]">Access policy</span>
                    <b className="mt-0.5 block font-semibold text-ink">View only · 3 new updates</b>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-3">
                  {d.id === 'greenledger' ? (
                    <Link
                      href={`/investor/data-rooms/${d.id}/nda`}
                      className="inline-flex min-h-10 items-center rounded-lg bg-ink px-4 text-xs font-semibold text-white hover:bg-[#1C2B42]"
                    >
                      Sign NDA to open
                    </Link>
                  ) : (
                    <Link
                      href={`/investor/data-rooms/${d.id}`}
                      className="inline-flex min-h-10 items-center rounded-lg bg-ink px-4 text-xs font-semibold text-white hover:bg-[#1C2B42]"
                    >
                      Open data room
                    </Link>
                  )}

                  <button
                    type="button"
                    onClick={() => notify('Requested extension for data room scope.')}
                    className="rounded-lg border border-[#E5E1D8] bg-white px-3 py-2 text-xs font-medium text-ink hover:bg-[#FAF8F4]"
                  >
                    Request more access
                  </button>
                  <button
                    type="button"
                    onClick={() => notify(`Follow-up sent to ${d.name}.`)}
                    className="rounded-lg border border-[#E5E1D8] bg-white px-3 py-2 text-xs font-medium text-ink hover:bg-[#FAF8F4]"
                  >
                    Follow up
                  </button>
                </div>
              </Card>
            ))}
          </div>

          <InvestorDisclaimer onLearnMore={() => notify('Platform disclaimer opened.')} />
        </>
      )}
    </InvestorShell>
  );
}
