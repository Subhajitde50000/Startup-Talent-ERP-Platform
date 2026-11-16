import { Suspense } from 'react';
import AuthScreen from '../AuthScreen';

export default function RegisterPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FAF8F4]" />}>
      <AuthScreen page="register" />
    </Suspense>
  );
}
