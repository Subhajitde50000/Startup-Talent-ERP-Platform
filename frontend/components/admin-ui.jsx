'use client';

import React from 'react';
import Link from 'next/link';
import {
  X,
  ChevronDown,
  ExternalLink,
} from 'lucide-react';

// ------------------------------------------------------------
// Design tokens (shared across all admin operations pages)
// ------------------------------------------------------------
export const INK = '#0F1B2D';
export const INK_SOFT = '#1C2B42';
export const IVORY = '#FAF8F4';
export const WHITE = '#FFFFFF';
export const GOLD = '#B8955A';
export const GOLD_DARK = '#9A7A45';
export const GOLD_TINT = '#F3EBDD';
export const STONE_700 = '#4A5568';
export const STONE_400 = '#A0A7B4';
export const STONE_200 = '#E5E1D8';
export const SUCCESS = '#2E7D5B';
export const SUCCESS_TINT = '#E7F3EC';
export const SUCCESS_DARK = '#286749';
export const WARNING = '#B7791F';
export const WARNING_TINT = '#FDF3E0';
export const WARNING_DARK = '#9A6210';
export const ERROR = '#B42318';
export const ERROR_TINT = '#FBE9E7';
export const ERROR_DARK = '#8E1A12';
export const INFO = '#2F5D8A';
export const INFO_TINT = '#E8F0F8';

export const RADIUS_CARD = 'rounded-xl';
export const RADIUS_CONTROL = 'rounded-lg';

export const user = {
  name: 'Alex Kumar',
  internalRole: 'On-call engineer',
  internalRoles: ['On-call engineer', 'SRE'],
  sessionExpiresAt: new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString(),
  idleTimeoutAt: new Date(Date.now() + 15 * 60 * 1000).toISOString(),
};

export const environment = 'production';

// ------------------------------------------------------------
// Toast (shared across admin pages)
// ------------------------------------------------------------
let toastListeners = [];
export function onToast(listener) {
  toastListeners.push(listener);
  return () => {
    toastListeners = toastListeners.filter((l) => l !== listener);
  };
}
export function toast(msg) {
  toastListeners.forEach((l) => l(msg));
}

// ------------------------------------------------------------
// Shared UI primitives
// ------------------------------------------------------------
export function Card({ title, titleIcon: TitleIcon, padded = true, className = '', children }) {
  const padding = padded ? 'p-4 sm:p-5' : 'p-0';
  return (
    <section className={`border border-[#E5E1D8] ${RADIUS_CARD} bg-white shadow-xs min-w-0 max-w-full ${className} ${padding}`}>
      {title && (
        <div className="flex items-center justify-between mb-4 border-b border-[#E5E1D8] pb-3">
          <div className="flex items-center gap-2">
            {TitleIcon && <TitleIcon size={16} className="text-[#4A5568]" />}
            <h3 className="text-sm font-semibold text-[#0F1B2D]">{title}</h3>
          </div>
        </div>
      )}
      <div className="min-w-0">{children}</div>
    </section>
  );
}

export function Btn({
  children,
  onClick,
  secondary,
  small,
  destructive,
  type = 'button',
  className = '',
  icon: IconComp,
  disabled = false,
  title,
}) {
  const handleClick = (e) => {
    if (disabled) return;
    if (onClick) onClick(e);
  };
  return (
    <button
      type={type}
      onClick={handleClick}
      disabled={disabled}
      title={title}
      className={`inline-flex items-center justify-center gap-2 ${RADIUS_CONTROL} border text-xs font-medium transition disabled:opacity-50 disabled:cursor-not-allowed ${
        secondary
          ? 'border-[#E5E1D8] text-[#4A5568] bg-[#FAF8F4] hover:bg-[#F3EBDD] hover:text-[#0F1B2D]'
          : destructive
          ? 'border-rose-200 text-rose-700 bg-white hover:bg-rose-50'
          : 'border-transparent bg-[#0F1B2D] text-white hover:bg-[#1C2B42]'
      } ${
        small ? 'px-2.5 py-1.5 text-xs min-w-[64px]' : 'px-3.5 py-2 text-xs min-w-[76px]'
      } ${className}`}
    >
      {IconComp && <span className="shrink-0"><IconComp size={small ? 13 : 15} /></span>}
      <span>{children}</span>
    </button>
  );
}

export function BtnIcon({ onClick, secondary, size, className = '', icon: IconComp, title, destructive, type = 'button' }) {
  const handleClick = (e) => {
    if (onClick) onClick(e);
  };
  return (
    <button
      type={type}
      onClick={handleClick}
      className={`inline-flex items-center justify-center ${RADIUS_CONTROL} border transition ${
        secondary
          ? 'border-[#E5E1D8] text-[#4A5568] bg-[#FAF8F4] hover:bg-[#F3EBDD]'
          : destructive
          ? 'border-rose-200 text-rose-700 bg-white hover:bg-rose-50'
          : 'border-transparent bg-[#0F1B2D] text-white hover:bg-[#1C2B42]'
      } ${size === 'small' ? 'h-8 w-8 p-0' : 'h-9 w-9 p-0'} ${className}`}
      aria-label={title}
      title={title}
    >
      <IconComp size={size === 'small' ? 14 : 16} />
    </button>
  );
}

export function StatChip({ status, count }) {
  const maps = {
    operational: 'border-emerald-200 bg-emerald-50 text-emerald-800',
    degraded: 'border-amber-200 bg-amber-50 text-amber-800',
    'partial-outage': 'border-rose-200 bg-rose-50 text-rose-800',
    'major-outage': 'border-rose-200 bg-rose-50 text-rose-800',
    maintenance: 'border-blue-200 bg-blue-50 text-blue-800',
    unknown: 'border-[#E5E1D8] bg-[#FAF8F4] text-[#4A5568]',
    SEV1: 'border-rose-300 bg-rose-100 text-rose-900 font-bold',
    SEV2: 'border-rose-200 bg-rose-50 text-rose-800 font-semibold',
    SEV3: 'border-amber-200 bg-amber-50 text-amber-800',
    SEV4: 'border-[#E5E1D8] bg-[#FAF8F4] text-[#4A5568]',
    resolved: 'border-emerald-200 bg-emerald-50 text-emerald-800',
    verified: 'border-emerald-200 bg-emerald-50 text-emerald-800',
    healthy: 'border-emerald-200 bg-emerald-50 text-emerald-800',
    success: 'border-emerald-200 bg-emerald-50 text-emerald-800',
    live: 'border-emerald-200 bg-emerald-50 text-emerald-800',
    pending: 'border-amber-200 bg-amber-50 text-amber-800',
    reviewing: 'border-amber-200 bg-amber-50 text-amber-800',
    flagged: 'border-rose-200 bg-rose-50 text-rose-800',
    blocked: 'border-rose-200 bg-rose-50 text-rose-800',
    failed: 'border-rose-200 bg-rose-50 text-rose-800',
    critical: 'border-rose-200 bg-rose-50 text-rose-800',
    high: 'border-rose-200 bg-rose-50 text-rose-800',
    medium: 'border-amber-200 bg-amber-50 text-amber-800',
    low: 'border-gray-200 bg-gray-50 text-gray-700',
  };

  const label = status ? status.replace(/-/g, ' ') : 'Status';
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium capitalize ${
        maps[status] || 'border-[#E5E1D8] bg-[#FAF8F4] text-[#4A5568]'
      }`}
    >
      {label} {count !== undefined && <span className="ml-1 opacity-75">({count})</span>}
    </span>
  );
}

export function SectionHead({ title, subtitle, children, className = '' }) {
  return (
    <div className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6 ${className}`}>
      <div>
        <h1 className="text-xl sm:text-2xl font-serif font-bold text-[#0F1B2D] tracking-tight">{title}</h1>
        {subtitle && <p className="text-xs text-[#4A5568] mt-1">{subtitle}</p>}
      </div>
      <div className="flex flex-wrap items-center gap-2">{children}</div>
    </div>
  );
}

export function EmptyState({ icon: Icon, title, subtitle, action, actionLabel }) {
  return (
    <div className="flex flex-col items-center gap-3 text-center py-12 px-4">
      <div className="grid h-14 w-14 place-items-center rounded-full bg-[#F3EBDD] text-[#806236]">
        <Icon size={24} />
      </div>
      <h3 className="text-sm font-semibold text-[#0F1B2D]">{title}</h3>
      <p className="text-xs text-[#4A5568] max-w-sm">{subtitle}</p>
      {action && (
        <Btn onClick={action} className="mt-2">
          {actionLabel}
        </Btn>
      )}
    </div>
  );
}

export function SkeletonCard({ className = '' }) {
  return <div className={`h-40 rounded-xl bg-[#E5E1D8]/60 animate-pulse ${className}`} />;
}

export function ToggleSwitch({ checked, onChange, label, id }) {
  return (
    <button
      type="button"
      id={id}
      onClick={onChange}
      role="switch"
      aria-checked={checked}
      aria-label={label}
      className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors ${
        checked ? 'bg-[#B8955A]' : 'bg-[#E5E1D8]'
      }`}
    >
      <span
        className={`block h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${
          checked ? 'translate-x-5' : 'translate-x-1'
        }`}
      />
    </button>
  );
}

export function DetailDrawer({ open, onClose, title, children, className = '' }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity" onClick={onClose} />
      <div className="relative ml-auto flex h-full w-full max-w-xl flex-col bg-white border-l border-[#E5E1D8] shadow-2xl z-10 animate-in slide-in-from-right duration-200">
        <div className="flex items-center justify-between border-b border-[#E5E1D8] px-5 py-4 bg-[#FAF8F4]">
          <h3 className="text-sm font-semibold text-[#0F1B2D]">{title}</h3>
          <BtnIcon size="small" secondary icon={X} title="Close" onClick={onClose} />
        </div>
        <div className="flex-1 overflow-y-auto p-5 space-y-4">{children}</div>
      </div>
    </div>
  );
}

export function MetricCard({ label, value, sub, status = 'live', icon: Icon }) {
  return (
    <Card padded className="border-[#E5E1D8]">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-medium text-[#4A5568]">{label}</span>
        {status && <StatChip status={status} />}
      </div>
      <div className="text-2xl sm:text-3xl font-serif font-bold text-[#0F1B2D] tabular-nums tracking-tight">
        {value}
      </div>
      {sub && <p className="text-xs text-[#4A5568] mt-1 truncate">{sub}</p>}
    </Card>
  );
}

export function TabBar({ active, onChange, tabs = [] }) {
  return (
    <div className="flex gap-1 overflow-x-auto pb-1 mb-4 border-b border-[#E5E1D8] min-w-0" role="tablist">
      {tabs.map((t) => {
        const isActive = active === t.key;
        return (
          <button
            key={t.key}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(t.key)}
            className={`whitespace-nowrap px-3.5 py-2.5 text-xs font-medium border-b-2 transition ${
              isActive
                ? 'border-[#B8955A] text-[#0F1B2D] font-semibold'
                : 'border-transparent text-[#4A5568] hover:text-[#0F1B2D] hover:border-gray-300'
            }`}
          >
            {t.label}
            {t.count !== undefined && (
              <span className="ml-1.5 rounded-full bg-[#FAF8F4] border border-[#E5E1D8] px-1.5 py-0.2 text-[10px] text-[#4A5568]">
                {t.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

export function RangeFilter({ active, onChange, filters = [] }) {
  return (
    <div className="flex gap-1.5 overflow-x-auto pb-1 mb-3">
      {filters.map((r) => {
        const isActive = active === r.key;
        return (
          <button
            key={r.key}
            type="button"
            onClick={() => onChange(r.key)}
            className={`whitespace-nowrap rounded-lg px-2.5 py-1 text-xs font-medium transition ${
              isActive
                ? 'bg-[#0F1B2D] text-white shadow-xs'
                : 'bg-white border border-[#E5E1D8] text-[#4A5568] hover:bg-[#FAF8F4] hover:text-[#0F1B2D]'
            }`}
          >
            {r.label}
          </button>
        );
      })}
    </div>
  );
}

/**
 * ResponsiveTable: Wraps data tables in an auto-scrolling container
 * Prevents horizontal body blowouts on mobile and tablet screens.
 */
export function ResponsiveTable({ children, className = '' }) {
  return (
    <div className={`w-full overflow-x-auto rounded-xl border border-[#E5E1D8] bg-white shadow-xs ${className}`}>
      {children}
    </div>
  );
}

export function formatAge(seconds) {
  const d = Math.floor(seconds / 86400);
  const h = Math.floor((seconds % 86400) / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  if (d > 0) return `${d}d ${h}h`;
  if (h > 0) return `${h}h ${m}m`;
  return `${m}m`;
}

export function relativeDate(iso) {
  const d = new Date(iso);
  const now = new Date();
  const days = Math.floor((now - d) / (1000 * 60 * 60 * 24));
  if (days === 0) return 'Today';
  if (days === 1) return 'Yesterday';
  if (days < 7) return `${days} days ago`;
  if (days < 30) return `${Math.floor(days / 7)}w ago`;
  return `${Math.floor(days / 30)}mo ago`;
}

export function EnvironmentStrip() {
  const isProd = environment === 'production';
  return (
    <div className="h-8 flex items-center justify-center border-b border-[#E5E1D8] bg-[#0F1B2D] text-white px-4 text-center">
      <span className={`px-2.5 py-0.5 rounded text-xs font-medium tracking-wide ${isProd ? 'bg-white text-[#0F1B2D]' : 'bg-[#F3EBDD] text-[#0F1B2D]'}`}>
        {environment.toUpperCase()}
      </span>
      {isProd ? (
        <span className="ml-3 text-xs text-white/70 hidden sm:inline">Internal team console · All actions logged</span>
      ) : (
        <span className="ml-3 text-xs text-[#FAF8F4] font-medium hidden sm:inline">Synthetic data only — no real user data</span>
      )}
    </div>
  );
}
