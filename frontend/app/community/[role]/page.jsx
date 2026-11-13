'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import CommunityShell from '../community-shell';

export default function DynamicRoleCommunityPage() {
  const params = useParams();
  const role = params?.role || 'startup';
  return <CommunityShell role={role} shellMode={role} />;
}
