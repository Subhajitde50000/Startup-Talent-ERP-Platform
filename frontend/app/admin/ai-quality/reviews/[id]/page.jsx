'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Brain,
  CheckCircle2,
  AlertTriangle,
  Eye,
  EyeOff,
  Scale,
  Sparkles,
  Save,
} from 'lucide-react';
import { AdminShell } from '@/components';
import {
  Card,
  Btn,
  toast,
} from '@/components/admin-ui';
import { initialAiReviews } from '../../ai-quality-data';

export default function AiBlindReviewPage({ params }) {
  const router = useRouter();
  const reviewId = params?.id || 'AI-REV-901';
  const item = initialAiReviews.find((r) => r.id === reviewId) || initialAiReviews[0];

  const [humanScore, setHumanScore] = useState(78);
  const [showAiScore, setShowAiScore] = useState(false);
  const [notes, setNotes] = useState('');
  const [actionDecision, setActionDecision] = useState('overturn'); // 'confirm' | 'overturn' | 'recalibrate'

  const handleSubmit = (e) => {
    e.preventDefault();
    toast(`Review for ${item.id} logged. Score adjusted to ${humanScore}/100.`);
    setTimeout(() => {
      router.push('/admin/ai-quality');
    }, 700);
  };

  return (
    <AdminShell active="AI Quality & Review">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-[#E5E1D8] pb-5">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/ai-quality"
            className="p-2 rounded-lg border border-[#E5E1D8] bg-white text-[#4A5568] hover:text-[#0F1B2D] transition"
            title="Back to AI Quality"
          >
            <ArrowLeft size={16} />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-[#B8955A]">{item.id}</span>
              <span className="px-2 py-0.2 rounded text-[10px] bg-[#FAF8F4] border border-[#E5E1D8] text-[#0F1B2D] font-medium">
                Blinded Candidate Evaluation
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-serif font-bold text-[#0F1B2D]">
              {item.category}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Btn icon={Save} onClick={handleSubmit}>
            Submit Human Determination
          </Btn>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left 2 Cols: Question & Candidate Answer */}
        <div className="lg:col-span-2 space-y-6">
          <Card title="Candidate Answer Transcript (Blinded)" titleIcon={Brain}>
            <div className="space-y-4 text-xs">
              <div className="p-3 rounded-lg bg-[#FAF8F4] border border-[#E5E1D8]">
                <span className="font-medium text-[#4A5568] block mb-1">Interview Question Prompt:</span>
                <p className="font-semibold text-[#0F1B2D]">
                  "Design a distributed rate-limiting service capable of handling 500,000 requests per second across 3 cloud regions with under 5ms latency."
                </p>
              </div>

              <div>
                <span className="font-medium text-[#4A5568] block mb-1.5">Candidate Transcript:</span>
                <div className="p-4 rounded-lg bg-white border border-[#E5E1D8] leading-relaxed text-[#0F1B2D] space-y-2 font-mono text-[11px]">
                  <p>
                    "For high-throughput rate limiting, a token bucket algorithm implemented in Redis Cluster with local in-memory token caching on API gateways provides the lowest latency..."
                  </p>
                  <p>
                    "To prevent cross-region network roundtrips from violating the 5ms SLA, each region maintains an autonomous Redis cluster with periodic asynchronous token synchronization over private VPC peering rather than synchronous 2-phase commit..."
                  </p>
                </div>
              </div>

              <div className="rounded-lg border border-[#F3EBDD] bg-[#FAF8F4] p-3 text-xs text-[#9A7A45]">
                <span className="font-semibold">Disputed Dimension:</span> {item.disputedDimension}. The candidate argues the AI penalised their choice of asynchronous synchronization without crediting the latency constraint.
              </div>
            </div>
          </Card>

          {/* Scoring Form */}
          <Card title="Human Senior Reviewer Evaluation" titleIcon={Scale}>
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label htmlFor="human-score" className="font-medium text-[#0F1B2D]">
                    Independent Blind Score (0 - 100)
                  </label>
                  <span className="font-bold text-base text-[#B8955A]">{humanScore} / 100</span>
                </div>
                <input
                  id="human-score"
                  type="range"
                  min="0"
                  max="100"
                  value={humanScore}
                  onChange={(e) => setHumanScore(Number(e.target.value))}
                  className="w-full h-2 bg-[#E5E1D8] rounded-lg appearance-none cursor-pointer accent-[#B8955A]"
                />
              </div>

              <div>
                <label htmlFor="review-notes" className="block font-medium text-[#0F1B2D] mb-1.5">
                  Justification & Feedback for Candidate
                </label>
                <textarea
                  id="review-notes"
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Explain why the score was revised or upheld in accordance with the published rubric..."
                  className="w-full p-2.5 rounded-lg border border-[#E5E1D8] bg-white text-xs focus:outline-none focus:border-[#B8955A]"
                />
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setShowAiScore(!showAiScore)}
                  className="inline-flex items-center gap-1.5 text-xs text-[#4A5568] hover:text-[#0F1B2D] border border-[#E5E1D8] rounded-lg px-3 py-1.5 bg-white"
                >
                  {showAiScore ? <EyeOff size={14} /> : <Eye size={14} />}
                  <span>{showAiScore ? 'Hide AI Baseline' : 'Reveal AI Baseline Score'}</span>
                </button>
              </div>
            </form>
          </Card>
        </div>

        {/* Sidebar Context */}
        <div className="space-y-4 text-xs">
          <Card title="AI Baseline Evaluation">
            {showAiScore ? (
              <div className="space-y-3">
                <div className="flex justify-between py-1.5 border-b border-[#E5E1D8]">
                  <span className="text-[#4A5568]">Model Generated Score</span>
                  <span className="font-mono font-bold text-[#B42318]">{item.aiScore} / 100</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-[#E5E1D8]">
                  <span className="text-[#4A5568]">Your Revised Score</span>
                  <span className="font-mono font-bold text-[#286749]">{humanScore} / 100</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-[#E5E1D8]">
                  <span className="text-[#4A5568]">Delta</span>
                  <span className="font-mono font-bold text-[#286749]">+{humanScore - item.aiScore} pts</span>
                </div>
                <p className="text-[#4A5568] leading-relaxed pt-1">
                  AI deduction reason: <i>"Penalized for lack of strong consistency guarantee across cloud boundaries."</i>
                </p>
              </div>
            ) : (
              <div className="py-6 text-center text-[#A0A7B4]">
                <Eye size={20} className="mx-auto mb-2 opacity-50" />
                <p>AI baseline hidden to prevent cognitive anchoring.</p>
              </div>
            )}
          </Card>

          <Card title="Governance Audit Safeguards">
            <div className="space-y-2 text-[#4A5568] leading-relaxed">
              <p>✓ Blinded evaluation (Candidate identity strictly shielded).</p>
              <p>✓ Both scores permanently recorded in immutable audit log.</p>
              <p>✓ Feeds into monthly AI calibration drift analysis.</p>
            </div>
          </Card>
        </div>
      </div>
    </AdminShell>
  );
}
