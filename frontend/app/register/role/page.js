import { Suspense } from 'react';
import AuthScreen from '../../AuthScreen';

export default function RolePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FAF8F4]" />}>
      <AuthScreen page="role" />
    </Suspense>
  );
}
