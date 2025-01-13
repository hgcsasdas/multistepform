'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import MultiStepForm from '../components/MultiStepForm';

export default function FormPage() {
  const router = useRouter();

  useEffect(() => {
    const hasCompletedForm = localStorage.getItem('formCompleted');
    if (hasCompletedForm) {
      router.push('/completed');
    }
  }, [router]);

  return <MultiStepForm />;
}