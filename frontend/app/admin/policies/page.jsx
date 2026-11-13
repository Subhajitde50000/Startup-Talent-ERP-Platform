'use client';

import React, { useState } from 'react';
import {
  ShieldAlert,
  Sliders,
  ListFilter,
  Code,
  FileText,
  Plus,
  Search,
  CheckCircle2,
  AlertTriangle,
  Play,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { AdminShell } from '@/components';
import {
  Card,
  Btn,
  TabBar,
  ResponsiveTable,
  DetailDrawer,
  toast,
} from '@/components/admin-ui';
import {
  initialPolicies,
  initialRules,
  initialBlocklists,
} from './policies-data';

export default function AdminPoliciesPage() {
  const [activeTab, setActiveTab] = useState('policies');
  const [policies, setPolicies] = useState(initialPolicies);
  const [rules, setRules] = useState(initialRules);
  const [blocklists, setBlocklists] = useState(initialBlocklists);
  const [searchQuery, setSearchQuery] = useState('');
  const [testText, setTestText] = useState('');
  const [testResult, setTestResult] = useState(null);
  const [selectedPolicy, setSelectedPolicy] = useState(null);

  const tabs = [
    { key: 'policies', label: 'Policy Rules', count: policies.length },
    { key: 'rules', label: 'Automatic Checks', count: rules.length },
    { key: 'blocklists', label: 'Blocklists & Dictionaries', count: blocklists.length },
    { key: 'sandbox', label: 'Rule Test Sandbox' },
  ];

  const handleTestRule = (e) => {
    e.preventDefault();
    if (!testText.trim()) return;

    const lower = testText.toLowerCase();
    const hits = [];

    if (lower.includes('fee') || lower.includes('deposit') || lower.includes('pay ₹')) {
      hits.push({ rule: 'RUL-101 Fee Solicitation', action: 'BLOCK', reason: 'Explicit upfront fee detected' });
    }
    if (lower.includes('female only') || lower.includes('young') || lower.includes('age')) {
      hits.push({ rule: 'RUL-102 Protected Attributes', action: 'BLOCK', reason: 'Exclusionary demographic requirement' });
    }
    if (lower.includes('wa.me') || lower.includes('whatsapp') || lower.includes('telegram')) {
      hits.push({ rule: 'RUL-103 Off-Platform Contact', action: 'WARN', reason: 'Unverified external communication link' });
    }

    if (hits.length > 0) {
      setTestResult({ status: 'flagged', hits });
    } else {
      setTestResult({ status: 'clean', hits: [] });
    }
    toast('Sandbox rule evaluation completed');
  };

  const filteredPolicies = policies.filter((p) =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AdminShell active="Policies & Blocklists">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-[#E5E1D8] pb-5">
        <div>
          <h1 className="text-xl sm:text-2xl font-serif font-bold text-[#0F1B2D]">
            Policy Rules & Automated Enforcement
          </h1>
          <p className="text-xs text-[#4A5568] mt-1">
            Single source of truth for platform standards, automated content filters, and screening blocklists.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Btn icon={Plus} onClick={() => toast('Drafting new policy rule')}>
            Draft Rule
          </Btn>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <TabBar tabs={tabs} active={activeTab} onChange={setActiveTab} />
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Tab 1: Policies                                                    */}
      {/* ------------------------------------------------------------------ */}
      {activeTab === 'policies' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="relative w-full max-w-sm">
              <label htmlFor="policy-search" className="sr-only">Search Policies</label>
              <Search className="absolute left-3 top-2.5 text-[#A0A7B4]" size={15} />
              <input
                id="policy-search"
                type="text"
                placeholder="Search policies by title or ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-9 pl-9 pr-3 rounded-lg border border-[#E5E1D8] bg-white text-xs focus:outline-none focus:border-[#B8955A]"
              />
            </div>
            <span className="text-xs text-[#4A5568]">{filteredPolicies.length} published policies</span>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {filteredPolicies.map((pol) => (
              <div
                key={pol.id}
                className="rounded-xl border border-[#E5E1D8] bg-white p-4 shadow-xs hover:border-[#B8955A] transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-[11px] font-semibold text-[#B8955A] bg-[#F3EBDD] px-2 py-0.5 rounded">
                      {pol.id} · {pol.version}
                    </span>
                    <span className="text-[11px] text-[#4A5568]">Effective: {pol.effectiveDate}</span>
                  </div>
                  <h3 className="text-sm font-semibold text-[#0F1B2D] mb-1.5">{pol.title}</h3>
                  <p className="text-xs text-[#4A5568] leading-relaxed mb-3">{pol.summary}</p>

                  <div className="space-y-1.5 text-xs border-t border-[#FAF8F4] pt-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[#A0A7B4]">Surfaces:</span>
                      <span className="font-medium text-[#0F1B2D]">{pol.surfaces.join(', ')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[#A0A7B4]">Enforcement:</span>
                      <span className="text-[#B42318] font-medium">{pol.actions.join(' · ')}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-[#E5E1D8] flex items-center justify-between">
                  <span className="text-xs text-[#4A5568]">30d Hits: <b className="text-[#0F1B2D]">{pol.hitCount}</b></span>
                  <button
                    type="button"
                    onClick={() => setSelectedPolicy(pol)}
                    className="text-xs text-[#B8955A] hover:underline font-medium"
                  >
                    Inspect Full Policy →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* Tab 2: Automatic Checks                                            */}
      {/* ------------------------------------------------------------------ */}
      {activeTab === 'rules' && (
        <Card title="Automated Real-Time Rule Engines" titleIcon={Code}>
          <ResponsiveTable>
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAF8F4] text-[#4A5568] border-b border-[#E5E1D8]">
                <tr>
                  <th className="py-3 px-4 font-medium">Rule ID & Name</th>
                  <th className="py-3 px-4 font-medium">Policy</th>
                  <th className="py-3 px-4 font-medium">Surface</th>
                  <th className="py-3 px-4 font-medium">Type</th>
                  <th className="py-3 px-4 font-medium">Action</th>
                  <th className="py-3 px-4 font-medium">Precision</th>
                  <th className="py-3 px-4 font-medium">State</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E1D8]">
                {rules.map((r) => (
                  <tr key={r.id} className="hover:bg-[#FAF8F4]/50">
                    <td className="py-3 px-4 font-medium text-[#0F1B2D]">
                      <div>{r.name}</div>
                      <span className="font-mono text-[11px] text-[#A0A7B4]">{r.id}</span>
                    </td>
                    <td className="py-3 px-4 text-[#4A5568] font-mono">{r.policyId}</td>
                    <td className="py-3 px-4 text-[#0F1B2D]">{r.surface}</td>
                    <td className="py-3 px-4 text-[#4A5568]">{r.type}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded font-semibold ${
                        r.action === 'Block' ? 'bg-[#FBE9E7] text-[#B42318]' : 'bg-[#FDF3E0] text-[#9A6210]'
                      }`}>
                        {r.action}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-[#286749] font-medium">{r.precision}</td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center gap-1 text-[#286749]">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#2E7D5B]" />
                        {r.state}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </ResponsiveTable>
        </Card>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* Tab 3: Blocklists                                                  */}
      {/* ------------------------------------------------------------------ */}
      {activeTab === 'blocklists' && (
        <div className="grid gap-4 sm:grid-cols-3">
          {blocklists.map((blk) => (
            <Card key={blk.id} title={blk.name} titleIcon={ListFilter}>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-[#4A5568]">
                  <span>{blk.entriesCount} Active Entries</span>
                  <span>Updated: {blk.lastUpdated}</span>
                </div>
                <div className="p-3 rounded-lg bg-[#FAF8F4] border border-[#E5E1D8] space-y-1.5">
                  <span className="text-[11px] font-medium text-[#A0A7B4] block uppercase">Sample Matches:</span>
                  <div className="flex flex-wrap gap-1">
                    {blk.examples.map((ex, i) => (
                      <span key={i} className="rounded bg-white border border-[#E5E1D8] px-2 py-0.5 text-[11px] text-[#0F1B2D]">
                        "{ex}"
                      </span>
                    ))}
                  </div>
                </div>
                <Btn small secondary className="w-full justify-center" onClick={() => toast(`Editing dictionary: ${blk.name}`)}>
                  Manage Dictionary Entries
                </Btn>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* Tab 4: Rule Test Sandbox                                           */}
      {/* ------------------------------------------------------------------ */}
      {activeTab === 'sandbox' && (
        <Card title="Interactive Policy Evaluation Sandbox" titleIcon={Play}>
          <form onSubmit={handleTestRule} className="space-y-4">
            <div>
              <label htmlFor="sandbox-text" className="block text-xs font-medium text-[#0F1B2D] mb-1.5">
                Input Content Simulation (Job Description, Screening Question, or Message)
              </label>
              <textarea
                id="sandbox-text"
                rows={4}
                value={testText}
                onChange={(e) => setTestText(e.target.value)}
                placeholder="Paste candidate screening question, draft job description, or message to simulate automatic policy evaluation..."
                className="w-full p-3 rounded-lg border border-[#E5E1D8] bg-white text-xs focus:outline-none focus:border-[#B8955A]"
              />
            </div>

            <div className="flex items-center gap-2">
              <Btn type="submit" icon={Play}>
                Run Policy Evaluation
              </Btn>
              <Btn
                secondary
                icon={RotateCcw}
                onClick={() => {
                  setTestText('');
                  setTestResult(null);
                }}
              >
                Clear
              </Btn>
            </div>

            {testResult && (
              <div className="mt-4 p-4 rounded-xl border border-[#E5E1D8] bg-[#FAF8F4]">
                <h4 className="text-xs font-semibold text-[#0F1B2D] mb-2 flex items-center gap-1.5">
                  {testResult.status === 'clean' ? (
                    <>
                      <CheckCircle2 size={16} className="text-[#2E7D5B]" />
                      <span>Compliant — No Active Rule Violations Detected</span>
                    </>
                  ) : (
                    <>
                      <AlertTriangle size={16} className="text-[#B42318]" />
                      <span>Violations Triggered ({testResult.hits.length})</span>
                    </>
                  )}
                </h4>

                {testResult.hits.length > 0 && (
                  <div className="space-y-2 mt-2">
                    {testResult.hits.map((h, i) => (
                      <div key={i} className="flex items-center justify-between p-2.5 rounded-lg bg-white border border-[#E5E1D8] text-xs">
                        <div>
                          <span className="font-semibold text-[#0F1B2D]">{h.rule}</span>
                          <p className="text-[11px] text-[#4A5568]">{h.reason}</p>
                        </div>
                        <span className="px-2 py-0.5 rounded font-bold bg-[#FBE9E7] text-[#B42318]">
                          {h.action}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </form>
        </Card>
      )}

      {/* Policy Drawer */}
      <DetailDrawer
        open={Boolean(selectedPolicy)}
        onClose={() => setSelectedPolicy(null)}
        title={selectedPolicy ? `${selectedPolicy.id} Policy Detail` : 'Policy'}
      >
        {selectedPolicy && (
          <div className="space-y-4 text-xs">
            <div className="p-3 rounded-lg bg-[#FAF8F4] border border-[#E5E1D8]">
              <span className="text-[11px] font-mono text-[#B8955A]">{selectedPolicy.id}</span>
              <h3 className="text-sm font-semibold text-[#0F1B2D]">{selectedPolicy.title}</h3>
              <p className="text-xs text-[#4A5568] mt-1">{selectedPolicy.summary}</p>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between py-1.5 border-b border-[#E5E1D8]">
                <span className="text-[#4A5568]">Category</span>
                <span className="font-medium text-[#0F1B2D]">{selectedPolicy.category}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#E5E1D8]">
                <span className="text-[#4A5568]">Version</span>
                <span className="font-medium text-[#0F1B2D]">{selectedPolicy.version}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#E5E1D8]">
                <span className="text-[#4A5568]">Owner</span>
                <span className="font-medium text-[#0F1B2D]">{selectedPolicy.owner}</span>
              </div>
            </div>
            <Btn className="w-full justify-center" onClick={() => toast('Exporting rule specifications')}>
              Export Rule Artifact
            </Btn>
          </div>
        )}
      </DetailDrawer>
    </AdminShell>
  );
}
