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

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="max-w-4xl w-full bg-gray-400 rounded-lg shadow-lg p-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">
          Encuesta
        </h1>
        <MultiStepForm />
      </div>
    </div>
  );
}
