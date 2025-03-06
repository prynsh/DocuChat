'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSignIn } from '@clerk/nextjs';

export default function SSOCallback() {
  const router = useRouter();
  const { isLoaded } = useSignIn();

  useEffect(() => {
    if (isLoaded) {
      router.push('/');
    }
  }, [isLoaded, router]);

  return <div>Signing In...</div>;
}
