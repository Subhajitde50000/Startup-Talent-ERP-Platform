import { Suspense } from 'react';
import AuthScreen from '../AuthScreen';

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FAF8F4]" />}>
      <AuthScreen page="login" />
    </Suspense>
  );
}
