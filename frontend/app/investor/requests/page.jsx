'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Inbox, X, Send } from 'lucide-react';
import { InvestorShell, Card, Button } from '@/components';
import { InvestorDisclaimer } from '../investor-data';

export default function InvestorRequestsPage() {
  const [requestsTab, setRequestsTab] = useState('Received');
  const [modal, setModal] = useState('');
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [responseMsg, setResponseMsg] = useState('');

  const receivedRequests = [
    {
      id: 'acme',
      name: 'Acme Studio',
      date: '4 days ago',
      msg: 'We are building modern finance operations for growing businesses and would value a conversation regarding our seed round.',
      ask: 'Intro call & seed discussion',
    },
    {
      id: 'greenledger',
      name: 'GreenLedger',
      date: 'Yesterday',
      msg: 'We would appreciate your strategic feedback on our early climate measurement and reporting methodology.',
      ask: 'Feedback & advisory call',
    },
  ];

  return (
    <InvestorShell
      active="Intro requests"
      module="Deal flow"
      title="Intro requests"
      description="First contact stays respectful, verified and founder-controlled."
      actions={
        <Link
          href="/investor/discover"
          className="inline-flex min-h-10 items-center rounded-lg border border-[#E5E1D8] bg-white px-4 text-xs font-semibold text-ink hover:bg-[#FAF8F4]"
        >
          Discover startups
        </Link>
      }
    >
      {({ notify }) => (
        <>
          {/* Sub Navigation Tabs */}
          <div className="mb-6 flex gap-2">
            {['Received', 'Sent', 'Accepted', 'Declined and expired'].map((x) => (
              <button
                key={x}
                type="button"
                onClick={() => setRequestsTab(x)}
                className={`min-h-10 rounded-lg px-4 text-xs font-semibold transition ${
                  requestsTab === x
                    ? 'bg-ink text-white'
                    : 'border border-[#E5E1D8] bg-white text-[#4A5568] hover:bg-[#FAF8F4] hover:text-ink'
                }`}
              >
                {x}
                {x === 'Received' && (
                  <span className="ml-2 rounded-full bg-[#B8955A] px-2 py-0.5 text-xs font-bold text-ink">
                    2
                  </span>
                )}
              </button>
            ))}
          </div>

          {requestsTab === 'Received' && (
            <div className="space-y-4">
              {receivedRequests.map((req) => (
                <Card
                  key={req.id}
                  title={
                    <div className="flex items-center gap-2">
                      <span>{req.name}</span>
                      <span className="rounded-full bg-[#F3EBDD] px-2.5 py-0.5 text-xs font-semibold text-[#806236]">
                        Received
                      </span>
                    </div>
                  }
                  action={<span className="text-xs text-[#4A5568]">{req.date}</span>}
                >
                  <p className="text-xs font-medium text-[#4A5568]">
                    Requesting: <span className="text-ink">{req.ask}</span>
                  </p>
                  <blockquote className="mt-3 rounded-lg bg-[#FAF8F4] p-3 text-sm italic text-ink border-l-2 border-[#B8955A]">
                    “{req.msg}”
                  </blockquote>

                  <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-[#E5E1D8] pt-3">
                    <Button
                      onClick={() => {
                        setSelectedRequest(req);
                        setModal('accept');
                      }}
                    >
                      Accept introduction
                    </Button>
                    <Button
                      secondary
                      onClick={() => {
                        setSelectedRequest(req);
                        setModal('question');
                      }}
                    >
                      Ask a question
                    </Button>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedRequest(req);
                        setModal('decline');
                      }}
                      className="rounded-lg border border-red-200 px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50"
                    >
                      Decline
                    </button>
                    <Link
                      href={`/investor/startups/${req.id}`}
                      className="ml-auto text-xs font-semibold text-[#9A7A45] hover:underline"
                    >
                      View profile →
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {requestsTab === 'Sent' && (
            <Card title="Sent intro requests">
              <div className="space-y-3">
                {[
                  { name: 'OrbitPay', status: 'Viewed · expires in 8 days' },
                  { name: 'Acme Studio', status: 'Sent · expires in 12 days' },
                ].map((item) => (
                  <div
                    key={item.name}
                    className="flex items-center justify-between border-b border-[#E5E1D8] pb-3 last:border-0 last:pb-0"
                  >
                    <div>
                      <b className="block text-xs font-semibold text-ink">{item.name}</b>
                      <span className="text-xs text-[#4A5568]">{item.status}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => notify(`Withdrew request to ${item.name}.`)}
                      className="text-xs font-medium text-[#9A7A45] hover:underline"
                    >
                      Withdraw
                    </button>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {requestsTab === 'Accepted' && (
            <Card title="Accepted introductions">
              <p className="text-xs text-[#4A5568]">
                Accepted intros transition automatically into your messaging workspace and Pipeline.
              </p>
              <Link
                href="/investor/messages"
                className="mt-4 inline-block text-xs font-semibold text-[#9A7A45] hover:underline"
              >
                Go to Messages →
              </Link>
            </Card>
          )}

          {requestsTab === 'Declined and expired' && (
            <Card title="Declined & expired requests">
              <p className="text-xs text-[#4A5568]">No declined or expired intro requests on record.</p>
            </Card>
          )}

          <InvestorDisclaimer onLearnMore={() => notify('Platform disclaimer opened.')} />

          {/* Modal */}
          {modal && (
            <div className="fixed inset-0 z-50 grid place-items-center bg-ink/50 p-4 backdrop-blur-sm">
              <section
                role="dialog"
                aria-modal="true"
                className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
              >
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="serif text-xl font-bold text-ink">
                    {modal === 'accept'
                      ? 'Accept introduction'
                      : modal === 'question'
                      ? 'Ask a question'
                      : 'Decline introduction'}
                  </h2>
                  <button type="button" onClick={() => setModal('')}>
                    <X size={18} />
                  </button>
                </div>

                <p className="text-xs text-[#4A5568]">
                  Startup: <b>{selectedRequest?.name}</b>
                </p>

                <div className="mt-4">
                  <label htmlFor="req-resp-msg" className="block text-xs font-medium text-ink">
                    {modal === 'accept'
                      ? 'Optional note to founder'
                      : modal === 'question'
                      ? 'Question for the founder'
                      : 'Optional feedback / reason (private)'}
                  </label>
                  <textarea
                    id="req-resp-msg"
                    rows={4}
                    value={responseMsg}
                    onChange={(e) => setResponseMsg(e.target.value)}
                    placeholder="Type your message here..."
                    className="mt-1 w-full rounded-lg border border-[#E5E1D8] p-3 text-xs focus:border-ink focus:outline-none"
                  />
                </div>

                <div className="mt-6 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setModal('')}
                    className="rounded-lg border px-3 py-2 text-xs font-medium text-[#4A5568]"
                  >
                    Cancel
                  </button>
                  <Button
                    onClick={() => {
                      if (modal === 'accept') {
                        notify(`Accepted intro with ${selectedRequest?.name}. Conversation opened in Messages.`);
                      } else if (modal === 'question') {
                        notify(`Question sent to ${selectedRequest?.name}.`);
                      } else {
                        notify(`Declined intro request from ${selectedRequest?.name}.`);
                      }
                      setModal('');
                      setResponseMsg('');
                    }}
                  >
                    Confirm
                  </Button>
                </div>
              </section>
            </div>
          )}
        </>
      )}
    </InvestorShell>
  );
}
