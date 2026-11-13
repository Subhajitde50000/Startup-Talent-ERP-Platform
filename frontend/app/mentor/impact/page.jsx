'use client';

import { useState } from 'react';
import {
  CheckCircle2,
  ArrowUpRight,
  X,
} from 'lucide-react';
import MentorPageShell from '../mentor-page-shell';
import { Card } from '../mentor-data';

export default function MentorImpactPage() {
  const [toast, setToast] = useState('');
  const [impactTab, setImpactTab] = useState('My impact');
  const [visibility, setVisibility] = useState(false);
  const [modal, setModal] = useState('');
  const [reply, setReply] = useState('');
  const [publicOutcomes, setPublicOutcomes] = useState({
    acme: true,
    green: false,
  });

  const notify = (x) => {
    setToast(x);
    setTimeout(() => setToast(''), 2700);
  };

  return (
    <MentorPageShell active="Impact & reviews" toast={toast} notify={notify}>
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm text-[#4A5568]">
            Mentor workspace <span className="mx-2 text-[#B8955A]">·</span> Impact
          </p>
          <h1 className="serif mt-1 text-[30px] font-semibold text-[#0F1B2D]">
            Impact and reviews
          </h1>
          <p className="mt-1 text-sm text-[#4A5568]">
            A verified record of your mentorship outcomes and feedback.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setModal('visibility')}
          className="min-h-10 rounded-lg border border-[#E5E1D8] bg-white px-3 text-xs font-semibold text-[#0F1B2D] hover:bg-[#FAF8F4]"
        >
          Public impact: {visibility ? 'Visible' : 'Hidden'} · Manage
        </button>
      </div>

      <div className="mb-4 flex gap-2 overflow-x-auto pb-1">
        {['My impact', 'Reviews', 'Public view'].map((x) => (
          <button
            type="button"
            key={x}
            onClick={() => setImpactTab(x)}
            className={`min-h-10 rounded-lg px-4 text-xs font-medium transition-colors ${
              impactTab === x
                ? 'bg-[#0F1B2D] text-white'
                : 'border border-[#E5E1D8] bg-white text-[#4A5568] hover:bg-[#FAF8F4]'
            }`}
          >
            {x}
          </button>
        ))}
      </div>

      {impactTab === 'My impact' ? (
        <>
          <div className="mb-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {[
              ['Startups mentored', '14', '4 active'],
              ['Sessions delivered', '96', 'Verified sessions'],
              ['Sign-offs granted', '38', 'Across 12 startups'],
              ['Investment Ready badges helped earn', '5', 'Platform verified'],
            ].map(([a, b, c]) => (
              <div key={a} className="rounded-xl border border-[#E5E1D8] bg-white p-4">
                <p className="text-xs text-[#4A5568]">{a}</p>
                <b className="serif mt-1 block text-2xl text-[#0F1B2D]">{b}</b>
                <small className="text-xs text-[#4A5568]">{c}</small>
              </div>
            ))}
          </div>

          <div className="grid items-start gap-5 xl:grid-cols-3">
            <div className="min-w-0 space-y-5 xl:col-span-2">
              <Card title="Startup outcomes">
                <p className="mb-3 text-xs text-[#4A5568]">
                  Named outcomes appear only when the startup has consented; all other outcomes are
                  aggregated.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[660px] text-left text-xs">
                    <thead className="border-b border-[#E5E1D8] text-[#4A5568]">
                      <tr>
                        {[
                          'Startup',
                          'Stage at start',
                          'Stage now',
                          'Readiness change',
                          'Badge',
                          'Public',
                        ].map((x) => (
                          <th key={x} className="py-3 font-medium">
                            {x}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['Acme Studio', 'Idea', 'Prototype', '+18', 'Not yet'],
                        ['GreenLedger', 'Idea', 'Idea', '+9', 'No'],
                        ['Anonymized startup', 'Prototype', 'Early revenue', '+22', 'Earned'],
                      ].map((r, i) => (
                        <tr key={r[0]} className="border-b border-[#E5E1D8]">
                          <td className="py-3 font-semibold text-[#0F1B2D]">{r[0]}</td>
                          {r.slice(1).map((x, j) => (
                            <td key={j} className="text-[#4A5568]">
                              {x}
                            </td>
                          ))}
                          <td>
                            {i === 0 || i === 2 ? (
                              <input
                                aria-label="Toggle option"
                                type="checkbox"
                                checked={!!publicOutcomes[i === 0 ? 'acme' : 'green']}
                                onChange={() =>
                                  setPublicOutcomes({
                                    ...publicOutcomes,
                                    [i === 0 ? 'acme' : 'green']:
                                      !publicOutcomes[i === 0 ? 'acme' : 'green'],
                                  })
                                }
                                className="accent-[#0F1B2D]"
                              />
                            ) : (
                              'Aggregated'
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="mt-3 text-xs text-[#4A5568]">
                  Outcomes reflect many factors and are not attributable to mentoring alone.
                </p>
              </Card>

              <Card title="Readiness progress">
                <p className="text-xs font-medium text-[#4A5568]">
                  Average readiness score rose 8 points over 90 days.
                </p>
                <div className="mt-5 flex h-36 items-end gap-4 border-b border-[#E5E1D8]">
                  {[35, 38, 43, 48, 46, 55, 62, 60, 73, 80, 77, 88].map((x, i) => (
                    <div
                      key={i}
                      className={`flex-1 rounded-t ${i === 11 ? 'bg-[#B8955A]' : 'bg-[#0F1B2D]'}`}
                      style={{ height: `${x}%` }}
                    />
                  ))}
                </div>
                <p className="mt-3 text-xs text-[#4A5568]">
                  Correlation, not proof of cause · Calculated from verified platform records.
                </p>
              </Card>

              <Card title="Expertise and milestones">
                <div className="flex flex-wrap gap-2">
                  {[
                    ['Unit economics', '12 sign-offs'],
                    ['Go-to-market', '9 sign-offs'],
                    ['First 10 sessions', 'Earned Oct 2025'],
                    ['5 Investment Ready startups', 'Earned Nov 2026'],
                  ].map(([x, y]) => (
                    <span
                      key={x}
                      className="rounded-full bg-[#F3EBDD] px-3 py-2 text-xs font-medium text-[#806236]"
                    >
                      <CheckCircle2 className="mr-1 inline" size={12} />
                      {x} · {y}
                    </span>
                  ))}
                </div>
              </Card>
            </div>

            <aside className="space-y-5">
              <Card title="Time & responsiveness">
                <div className="space-y-3 text-xs">
                  {[
                    ['Average response time', '1.4 days'],
                    ['Session attendance', '96%'],
                    ['Summaries on time', '91%'],
                    ['Deliverable review time', '1.8 days'],
                  ].map(([x, y]) => (
                    <p key={x} className="flex justify-between">
                      <span className="text-[#4A5568]">{x}</span>
                      <b className="text-[#0F1B2D]">{y}</b>
                    </p>
                  ))}
                </div>
                <p className="mt-3 text-xs text-[#4A5568]">
                  Facts from your platform activity; not a ranking.
                </p>
              </Card>

              <Card title="Testimonials">
                <blockquote className="text-xs leading-5 text-[#0F1B2D]">
                  “Each session ended with clear priorities and a plan we could act on.”
                  <small className="mt-2 block text-[#4A5568]">
                    Acme Studio · Verified session
                  </small>
                </blockquote>
                <button
                  type="button"
                  onClick={() => notify('Impact summary downloaded.')}
                  className="mt-4 w-full rounded-lg border border-[#E5E1D8] py-2 text-xs font-semibold text-[#0F1B2D] hover:bg-[#FAF8F4]"
                >
                  Download impact summary (PDF)
                </button>
              </Card>
            </aside>
          </div>
        </>
      ) : impactTab === 'Reviews' ? (
        <div className="grid items-start gap-5 xl:grid-cols-3">
          <div className="xl:col-span-2">
            <Card title="Reviews">
              <div className="mb-5 flex items-center gap-4">
                <b className="serif text-4xl text-[#0F1B2D]">4.9</b>
                <div>
                  <div className="text-[#B8955A]">★★★★★</div>
                  <p className="text-xs text-[#4A5568]">
                    28 verified reviews · average shown after 3 reviews
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                {[
                  [
                    '5',
                    '“Thoughtful and direct. We left every session with clear next steps.”',
                    'Acme Studio · Nov 01',
                  ],
                  [
                    '5',
                    '“Helped us focus our customer discovery on the right questions.”',
                    'GreenLedger · Oct 22',
                  ],
                  [
                    '4',
                    '“Practical advice and an excellent sounding board.”',
                    'Anonymous startup · Sep 17',
                  ],
                ].map(([r, quote, by]) => (
                  <article key={quote} className="border-t border-[#E5E1D8] pt-4">
                    <div className="flex justify-between">
                      <span className="text-[#B8955A]">{'★'.repeat(Number(r))}</span>
                      <small className="text-[#4A5568]">Verified session</small>
                    </div>
                    <p className="mt-2 text-sm text-[#0F1B2D]">{quote}</p>
                    <p className="mt-1 text-xs text-[#4A5568]">{by}</p>
                    <button
                      type="button"
                      onClick={() => setModal('reply')}
                      className="mt-2 text-xs font-semibold text-[#9A7A45]"
                    >
                      Reply publicly
                    </button>
                  </article>
                ))}
              </div>
            </Card>
          </div>
          <aside>
            <Card title="Private feedback">
              <p className="text-xs leading-5 text-[#4A5568]">
                Private feedback is visible only to you and never appears on the public record.
              </p>
              <p className="mt-3 rounded-lg bg-[#FAF8F4] p-3 text-xs text-[#0F1B2D]">
                “More examples on fundraising would be helpful.” · GreenLedger
              </p>
            </Card>
          </aside>
        </div>
      ) : (
        <div className="grid gap-5 lg:grid-cols-2">
          <Card title="Public impact preview">
            <div className="rounded-xl border border-[#E5E1D8] p-5">
              <div className="flex items-center gap-3">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-[#F3EBDD] font-semibold text-[#806236]">
                  RM
                </span>
                <div>
                  <b className="text-[#0F1B2D]">Rhea Mukherjee</b>
                  <p className="text-xs text-[#4A5568]">Verified mentor · Go-to-market, SaaS</p>
                </div>
              </div>
              <div className="mt-5 grid grid-cols-3 gap-2 text-center">
                {[
                  ['Startups', '14'],
                  ['Sessions', '96'],
                  ['Ready badges', '5'],
                ].map(([x, v]) => (
                  <div key={x} className="rounded bg-[#FAF8F4] p-2">
                    <b className="serif text-xl text-[#0F1B2D]">{v}</b>
                    <small className="block text-xs text-[#4A5568]">{x}</small>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-xs text-[#4A5568]">
                Verified by the platform · Data last updated Nov 05, 2026
              </p>
            </div>
            <button
              type="button"
              onClick={() => notify('Public mentor profile opened.')}
              className="mt-4 text-xs font-semibold text-[#9A7A45]"
            >
              Open public profile <ArrowUpRight className="inline" size={12} />
            </button>
          </Card>

          <Card title="Public visibility">
            <p className="text-sm text-[#0F1B2D]">
              Choose what appears on your profile. Startup outcomes require their consent.
            </p>
            <label className="mt-4 flex items-center justify-between text-xs text-[#0F1B2D]">
              Show aggregate impact numbers
              <input
                aria-label="Toggle option"
                type="checkbox"
                checked={visibility}
                onChange={() => setVisibility(!visibility)}
                className="accent-[#0F1B2D]"
              />
            </label>
            <label className="mt-3 flex items-center justify-between text-xs text-[#0F1B2D]">
              Show consented startup outcomes
              <input
                aria-label="Toggle option"
                type="checkbox"
                checked={visibility}
                onChange={() => setVisibility(!visibility)}
                className="accent-[#0F1B2D]"
              />
            </label>
            <button
              type="button"
              onClick={() => notify('Public impact preferences saved.')}
              className="mt-4 rounded-lg bg-[#0F1B2D] px-4 py-2 text-xs font-semibold text-white hover:bg-[#1C2B42]"
            >
              Save visibility
            </button>
          </Card>
        </div>
      )}

      {/* Reply or Visibility Modal */}
      {modal && (
        <div className="fixed inset-0 z-40 grid place-items-center bg-[#0F1B2D]/45 p-4">
          <section
            role="dialog"
            aria-modal="true"
            className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl"
          >
            <div className="mb-5 flex items-center justify-between">
              <h2 className="serif text-2xl font-semibold text-[#0F1B2D]">
                {modal === 'reply' ? 'Reply to review' : 'Public impact settings'}
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

            {modal === 'reply' ? (
              <textarea
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                maxLength={500}
                rows={4}
                placeholder="Write a polite public reply (up to 500 characters)"
                className="w-full rounded-lg border border-[#E5E1D8] p-3 text-sm focus:outline-none"
              />
            ) : (
              <p className="text-sm text-[#4A5568]">
                Adjust public visibility options to showcase verified mentorship achievements.
              </p>
            )}

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
                  notify('Saved and recorded.');
                  setModal('');
                }}
                className="min-h-10 rounded-lg bg-[#0F1B2D] px-4 text-sm font-semibold text-white hover:bg-[#1C2B42]"
              >
                Confirm
              </button>
            </div>
          </section>
        </div>
      )}
    </MentorPageShell>
  );
}
