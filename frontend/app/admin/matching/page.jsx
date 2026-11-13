'use client';

import React, { useState, useMemo, useCallback } from 'react';
import {
  Sliders,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Target,
  Search,
  Plus,
  RefreshCw,
  RotateCcw,
  Save,
  SlidersHorizontal,
  Info,
  TrendingUp,
  AlertTriangle,
  History,
  X,
  ExternalLink,
  ChevronRight,
} from 'lucide-react';
import { AdminShell } from '@/components';
import {
  Card,
  Btn,
  ResponsiveTable,
  DetailDrawer,
  MetricCard,
  toast,
} from '@/components/admin-ui';
import {
  initialMatchingRules,
  initialFairnessMetrics,
} from './matching-data';

export default function AdminMatchingPage() {
  const [rules, setRules] = useState(initialMatchingRules);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRule, setSelectedRule] = useState(null);

  // Calibration Drawer / Modal state
  const [isCalibrating, setIsCalibrating] = useState(false);
  const [isSavingCalibration, setIsSavingCalibration] = useState(false);
  const [testMode, setTestMode] = useState('production'); // production | sandbox_test
  const [lastCalibrationTime, setLastCalibrationTime] = useState('11 Nov 2026, 14:15 IST');

  // Interactive weight values for calibration (keyed by rule ID as integer percentages)
  const [weights, setWeights] = useState({
    'MAT-001': 35,
    'MAT-002': 40,
    'MAT-003': 50,
    'MAT-004': 20,
  });

  // Fairness constraint toggle
  const [enforceStrictFairness, setEnforceStrictFairness] = useState(true);
  const [penalizeStaleVectors, setPenalizeStaleVectors] = useState(true);

  // Total weight index calculation
  const totalWeightScore = useMemo(() => {
    return Object.values(weights).reduce((acc, curr) => acc + Number(curr || 0), 0);
  }, [weights]);

  // Open calibration drawer
  const handleOpenCalibration = useCallback(() => {
    setIsCalibrating(true);
  }, []);

  // Update specific slider weight
  const handleWeightChange = (ruleId, val) => {
    setWeights((prev) => ({
      ...prev,
      [ruleId]: Number(val),
    }));
  };

  // Reset to default weights
  const handleResetDefaults = () => {
    setWeights({
      'MAT-001': 35,
      'MAT-002': 40,
      'MAT-003': 50,
      'MAT-004': 20,
    });
    toast('Weights reset to baseline algorithm constants');
  };

  // Run dry run simulation
  const handleSimulateRun = () => {
    toast('Simulated 10,000 matches: Zero bias detected across Tier-2/3 founders');
  };

  // Commit and apply weights
  const handleApplyCalibration = (e) => {
    e?.preventDefault();
    setIsSavingCalibration(true);

    setTimeout(() => {
      // Update rules table with the calibrated weights
      setRules((prev) =>
        prev.map((r) => {
          if (weights[r.id] !== undefined) {
            return {
              ...r,
              weight: r.id === 'MAT-004' ? `Fixed ${weights[r.id]}% Max` : `${weights[r.id]}%`,
            };
          }
          return r;
        })
      );

      const timestamp = new Date().toLocaleString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
      setLastCalibrationTime(`${timestamp} IST`);
      setIsSavingCalibration(false);
      setIsCalibrating(false);
      toast('Algorithm weights successfully calibrated and deployed to live matching runtime!');
    }, 600);
  };

  // Filtered rules for search
  const filteredRules = useMemo(() => {
    if (!searchQuery.trim()) return rules;
    const q = searchQuery.toLowerCase();
    return rules.filter(
      (r) =>
        r.name.toLowerCase().includes(q) ||
        r.id.toLowerCase().includes(q) ||
        r.surface.toLowerCase().includes(q)
    );
  }, [rules, searchQuery]);

  return (
    <AdminShell active="Matching & Search">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-[#E5E1D8] pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#F3EBDD] text-[#8C6B32]">
              AI Engine v4.2
            </span>
            <span className="text-xs text-[#A0A7B4]">•</span>
            <span className="text-xs text-[#4A5568]">Vector Matching & Ranking</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-serif font-bold text-[#0F1B2D]">
            Matching, Ranking & Search Algorithms
          </h1>
          <p className="text-xs text-[#4A5568] mt-1 max-w-2xl">
            Configuration of candidate-job fit, mentor discovery, investor dealflow prioritization, and fairness guardrails.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <Btn
            icon={Sliders}
            onClick={handleOpenCalibration}
            title="Open algorithm weight recalibration suite"
          >
            Calibrate Weights
          </Btn>
        </div>
      </div>

      {/* KPI & Calibration Status Bar */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        <MetricCard
          label="Active Ranking Engines"
          value={rules.length.toString()}
          sub="All 4 live in production"
          status="live"
        />
        <MetricCard
          label="Fairness Compliance"
          value="100%"
          sub="Zero proxy violations"
          status="verified"
        />
        <MetricCard
          label="Average Match Latency"
          value="48ms"
          sub="Vector dot-product search"
          status="standard"
        />
        <MetricCard
          label="Last Recalibration"
          value="Today"
          sub={lastCalibrationTime}
          status="live"
        />
      </div>

      {/* Fairness Ribbon */}
      <Card title="Algorithm Fairness & Exposure Guardrails" titleIcon={ShieldCheck} className="mb-6">
        <div className="grid gap-3 sm:grid-cols-3 text-xs">
          {initialFairnessMetrics.map((fm, idx) => (
            <div key={idx} className="p-3.5 rounded-xl border border-[#E5E1D8] bg-[#FAF8F4]">
              <span className="text-[11px] text-[#4A5568] block mb-1">{fm.metric}</span>
              <span className="font-semibold text-[#0F1B2D] flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-[#2E7D5B]" />
                {fm.status}
              </span>
            </div>
          ))}
        </div>
      </Card>

      {/* Matching Rules Table */}
      <Card
        title="Active Ranking & Recommendation Engines"
        titleIcon={Target}
        headerAction={
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search engine or ID..."
              className="h-8 rounded-lg border border-[#E5E1D8] bg-white px-2.5 text-xs w-48 outline-none focus:border-[#B8955A]"
            />
          </div>
        }
      >
        <ResponsiveTable>
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF8F4] text-[#4A5568] border-b border-[#E5E1D8]">
              <tr>
                <th className="py-3 px-4 font-medium">Rule Name & ID</th>
                <th className="py-3 px-4 font-medium">Surface</th>
                <th className="py-3 px-4 font-medium">Influence Weight</th>
                <th className="py-3 px-4 font-medium">Description</th>
                <th className="py-3 px-4 font-medium">Fairness Audit</th>
                <th className="py-3 px-4 font-medium">Status</th>
                <th className="py-3 px-4 font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E1D8]">
              {filteredRules.map((r) => (
                <tr
                  key={r.id}
                  onClick={() => setSelectedRule(r)}
                  className="hover:bg-[#FAF8F4]/50 cursor-pointer transition"
                >
                  <td className="py-3 px-4 font-medium text-[#0F1B2D]">
                    <div>{r.name}</div>
                    <span className="font-mono text-[11px] text-[#A0A7B4]">{r.id}</span>
                  </td>
                  <td className="py-3 px-4 text-[#0F1B2D] whitespace-nowrap">{r.surface}</td>
                  <td className="py-3 px-4 font-mono font-bold text-[#B8955A] whitespace-nowrap">{r.weight}</td>
                  <td className="py-3 px-4 text-[#4A5568] max-w-sm">{r.description}</td>
                  <td className="py-3 px-4 text-[#286749] font-medium whitespace-nowrap">{r.fairnessCheck}</td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1 text-[#286749] font-medium">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#2E7D5B]" />
                      {r.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                    <button
                      type="button"
                      onClick={() => handleOpenCalibration()}
                      className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#B8955A] hover:text-[#8C6B32] transition"
                    >
                      <span>Adjust</span>
                      <ChevronRight size={12} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </ResponsiveTable>
      </Card>

      {/* =========================================================================
          CALIBRATE WEIGHTS INTERACTIVE DRAWER
         ========================================================================= */}
      {isCalibrating && (
        <DetailDrawer
          open={isCalibrating}
          onClose={() => setIsCalibrating(false)}
          title="Algorithm Weight Calibration Suite"
        >
          <div className="space-y-5 text-xs">
            {/* Header Banner */}
            <div className="p-3.5 rounded-xl border border-[#B8955A]/50 bg-[#FAF8F4] space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#B8955A]">
                  Real-time Hyperparameter Tuning
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 text-emerald-800">
                  Model v4.2 Active
                </span>
              </div>
              <p className="text-[#4A5568] text-xs leading-relaxed">
                Tune the coefficients applied across vector dot-product scoring models. Changes take effect across live discovery slates immediately upon deployment.
              </p>
            </div>

            {/* Target Runtime Selector */}
            <div>
              <span className="text-[#A0A7B4] block text-[11px] mb-1 font-semibold uppercase tracking-wider">
                Deployment Target
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setTestMode('production')}
                  className={`p-2.5 rounded-lg border text-left transition ${
                    testMode === 'production'
                      ? 'border-[#B8955A] bg-[#F3EBDD] font-bold text-[#0F1B2D]'
                      : 'border-[#E5E1D8] bg-white text-[#4A5568] hover:border-gray-300'
                  }`}
                >
                  <div className="text-xs">Live Production</div>
                  <div className="text-[10px] text-[#A0A7B4]">Affects all user queries</div>
                </button>
                <button
                  type="button"
                  onClick={() => setTestMode('sandbox_test')}
                  className={`p-2.5 rounded-lg border text-left transition ${
                    testMode === 'sandbox_test'
                      ? 'border-[#B8955A] bg-[#F3EBDD] font-bold text-[#0F1B2D]'
                      : 'border-[#E5E1D8] bg-white text-[#4A5568] hover:border-gray-300'
                  }`}
                >
                  <div className="text-xs">Staging Sandbox</div>
                  <div className="text-[10px] text-[#A0A7B4]">Dry run simulation pool</div>
                </button>
              </div>
            </div>

            {/* Interactive Weight Sliders */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[#0F1B2D] font-semibold text-xs flex items-center gap-1.5">
                  <SlidersHorizontal size={13} className="text-[#B8955A]" />
                  <span>Individual Surface Weights</span>
                </span>
                <button
                  type="button"
                  onClick={handleResetDefaults}
                  className="inline-flex items-center gap-1 text-[11px] text-[#B8955A] hover:underline"
                >
                  <RotateCcw size={10} />
                  <span>Reset to defaults</span>
                </button>
              </div>

              {rules.map((rule) => {
                const currentVal = weights[rule.id] ?? 20;
                return (
                  <div
                    key={rule.id}
                    className="p-3 rounded-xl border border-[#E5E1D8] bg-white hover:border-[#B8955A]/50 transition space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-[#0F1B2D] text-xs">{rule.name}</div>
                        <div className="text-[10px] font-mono text-[#A0A7B4]">{rule.id} • {rule.surface}</div>
                      </div>
                      <span className="font-mono font-bold text-sm text-[#B8955A] bg-[#FAF8F4] px-2 py-0.5 rounded border border-[#E5E1D8]">
                        {currentVal}%
                      </span>
                    </div>

                    {/* Range slider */}
                    <input
                      type="range"
                      min={0}
                      max={100}
                      step={5}
                      value={currentVal}
                      onChange={(e) => handleWeightChange(rule.id, e.target.value)}
                      className="w-full accent-[#B8955A] cursor-pointer"
                    />

                    <div className="flex justify-between text-[10px] text-[#A0A7B4]">
                      <span>0% (Disabled)</span>
                      <span>50% (Standard)</span>
                      <span>100% (Strict Filter)</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Guardrails Checkboxes */}
            <div className="p-3 rounded-xl border border-[#E5E1D8] bg-[#FAF8F4] space-y-2">
              <span className="text-[#0F1B2D] font-semibold text-xs block">
                Algorithmic Guardrails
              </span>
              <label className="flex items-center gap-2 cursor-pointer text-xs text-[#0F1B2D]">
                <input
                  type="checkbox"
                  checked={enforceStrictFairness}
                  onChange={(e) => setEnforceStrictFairness(e.target.checked)}
                  className="rounded accent-[#B8955A]"
                />
                <span>Enforce DPDP & Demographic Blindness Filter (Zero PII vectors)</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-xs text-[#0F1B2D]">
                <input
                  type="checkbox"
                  checked={penalizeStaleVectors}
                  onChange={(e) => setPenalizeStaleVectors(e.target.checked)}
                  className="rounded accent-[#B8955A]"
                />
                <span>Penalize profiles without active verification updates within 90 days</span>
              </label>
            </div>

            {/* Simulation Preview & Actions */}
            <div className="pt-2 space-y-2">
              <div className="flex gap-2">
                <Btn
                  fullWidth
                  secondary
                  icon={Sparkles}
                  onClick={handleSimulateRun}
                >
                  Run Dry Simulation
                </Btn>
                <Btn
                  fullWidth
                  icon={Save}
                  onClick={handleApplyCalibration}
                  disabled={isSavingCalibration}
                >
                  {isSavingCalibration ? 'Deploying...' : 'Deploy Calibration'}
                </Btn>
              </div>
              <Btn
                fullWidth
                secondary
                onClick={() => setIsCalibrating(false)}
              >
                Cancel
              </Btn>
            </div>
          </div>
        </DetailDrawer>
      )}

      {/* =========================================================================
          RULE DETAILS DRAWER
         ========================================================================= */}
      {selectedRule && !isCalibrating && (
        <DetailDrawer
          open={!!selectedRule}
          onClose={() => setSelectedRule(null)}
          title={`Algorithm Rule: ${selectedRule.id}`}
        >
          <div className="space-y-4 text-xs">
            <div className="p-3 rounded-xl border border-[#E5E1D8] bg-[#FAF8F4] space-y-1">
              <div className="font-semibold text-sm text-[#0F1B2D]">{selectedRule.name}</div>
              <div className="text-[11px] text-[#4A5568]">
                Surface: <strong>{selectedRule.surface}</strong> • Influence Weight: <strong className="font-mono text-[#B8955A]">{selectedRule.weight}</strong>
              </div>
            </div>

            <div>
              <span className="text-[#A0A7B4] block text-[11px] mb-1">Rule Logic Description</span>
              <div className="p-3 rounded-lg border border-[#E5E1D8] bg-white text-[#4A5568] leading-relaxed">
                {selectedRule.description}
              </div>
            </div>

            <div>
              <span className="text-[#A0A7B4] block text-[11px] mb-1">Fairness Audit Log</span>
              <div className="p-3 rounded-lg border border-[#E5E1D8] bg-white space-y-1.5">
                <div className="flex items-center gap-1.5 text-[#286749] font-medium">
                  <CheckCircle2 size={13} />
                  <span>{selectedRule.fairnessCheck}</span>
                </div>
                <div className="text-[11px] text-[#A0A7B4]">
                  Audited by Autonomous Ethics Linter on last model check.
                </div>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <Btn
                className="flex-1"
                icon={Sliders}
                onClick={() => {
                  setSelectedRule(null);
                  setIsCalibrating(true);
                }}
              >
                Calibrate This Engine
              </Btn>
              <Btn secondary onClick={() => setSelectedRule(null)} className="w-24">
                Close
              </Btn>
            </div>
          </div>
        </DetailDrawer>
      )}
    </AdminShell>
  );
}
