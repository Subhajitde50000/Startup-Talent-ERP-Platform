'use client';

import React, { useState, useMemo, useCallback } from 'react';
import Link from 'next/link';
import {
  Bell,
  RefreshCcw,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  Check,
} from 'lucide-react';
import { AdminShell } from '@/components';
import {
  Card,
  Btn,
  StatChip,
  TabBar,
  MetricCard,
  toast,
} from '@/components/admin-ui';
import {
  notificationTabs,
  notifications,
} from './notifications-data';

export default function AdminNotificationsPage({ initialTab = 'all' }) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [items, setItems] = useState(notifications);
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      toast('Notifications inbox synchronized');
    }, 600);
  }, []);

  const handleMarkAllRead = () => {
    setItems(items.map((n) => ({ ...n, unread: false })));
    toast('Marked all notifications as read');
  };

  const filtered = useMemo(() => {
    if (activeTab === 'all') return items;
    return items.filter((n) => n.category === activeTab);
  }, [activeTab, items]);

  return (
    <AdminShell active="Notifications" onRefresh={handleRefresh}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6 border-b border-[#E5E1D8] pb-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-serif font-bold text-[#0F1B2D]">Notifications & System Broadcasts</h1>
          <p className="text-xs text-[#4A5568] mt-1 max-w-2xl">
            Critical security alerts, dual-authorization requests, queue SLA warnings, and scheduled platform announcements.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Btn small secondary icon={RefreshCcw} onClick={handleRefresh} title="Sync notifications">
            Sync
          </Btn>
          <Btn small onClick={handleMarkAllRead} icon={Check} title="Mark all read">
            Mark All Read
          </Btn>
        </div>
      </div>

      {/* Tabs */}
      <TabBar active={activeTab} onChange={setActiveTab} tabs={notificationTabs} />

      {/* Notifications List */}
      <div className="space-y-2.5 max-w-3xl">
        {filtered.map((n) => (
          <div
            key={n.id}
            className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-xl border p-4 transition shadow-xs ${
              n.unread ? 'bg-white border-[#B8955A]/50' : 'bg-[#FAF8F4] border-[#E5E1D8]'
            }`}
          >
            <div className="flex items-start gap-3">
              <div
                className={`p-2 rounded-lg shrink-0 mt-0.5 ${
                  n.severity === 'critical'
                    ? 'bg-rose-50 text-rose-700'
                    : n.severity === 'medium'
                    ? 'bg-amber-50 text-amber-700'
                    : 'bg-blue-50 text-blue-700'
                }`}
              >
                {n.severity === 'critical' ? (
                  <AlertTriangle size={16} />
                ) : (
                  <Bell size={16} />
                )}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-xs text-[#0F1B2D]">{n.title}</span>
                  {n.unread && (
                    <span className="h-2 w-2 rounded-full bg-[#B8955A]" />
                  )}
                </div>
                <p className="text-xs text-[#4A5568] mt-1 leading-relaxed">{n.detail}</p>
                <span className="text-[11px] text-[#A0A7B4] mt-1.5 block">{n.time}</span>
              </div>
            </div>
            <Link
              href={n.link}
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#B8955A] hover:underline shrink-0 self-end sm:self-center"
            >
              <span>Take Action</span>
              <ArrowRight size={13} />
            </Link>
          </div>
        ))}
      </div>
    </AdminShell>
  );
}

export { AdminNotificationsPage };
