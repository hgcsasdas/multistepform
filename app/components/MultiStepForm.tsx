'use client';

import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  FormStep,
  FormData,
  COURSES,
  FREQUENCY_OPTIONS,
  CONSULT_SOURCES,
} from '../types';
import { saveFormData, getFormData, clearFormData } from '../lib/cookies';

export default function MultiStepForm() {
  const router = useRouter();
  const [formState, setFormState] = useState<FormStep>({
    currentStep: 1,
    sessionId: null,
    formData: {},
    completed: false,
  });

  useEffect(() => {
    // Check if form was already completed
    const completed = Cookies.get('formCompleted');
    if (completed) {
      router.push('/completed');
      return;
    }

    // Load saved form data
    const savedData = getFormData();
    if (savedData) {
      setFormState(savedData);
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // If it's the last step, submit all data
      if (isLastStep()) {
        const response = await fetch('/api/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            sessionId: formState.sessionId,
            data: formState.formData,
          }),
        });

        if (response.ok) {
          // Clear form data and mark as completed
          clearFormData();
          Cookies.set('formCompleted', 'true', { expires: 30 }); // Expires in 30 days
          router.push('/completed');
          return;
        }
      }

      // Handle branching logic
      let nextStep = formState.currentStep + 1;

      if (formState.currentStep === 4) {
        // After consult source question
        if (!formState.formData.consultSource?.includes('other')) {
          nextStep = 6; // Skip the "specify other" question
        }
      }

      if (formState.currentStep === 9) {
        // After pornography question
        if (!formState.formData.seenPornography) {
          nextStep = 11; // Skip the age question
        }
      }

      // Update form state and save to cookie
      const newState = {
        ...formState,
        currentStep: nextStep,
      };
      setFormState(newState);
      saveFormData(newState);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const isLastStep = () => {
    return formState.currentStep === 26;
  };

  const updateFormData = (field: string, value: any) => {
    const newState = {
      ...formState,
      formData: {
        ...formState.formData,
        [field]: value,
      },
    };
    setFormState(newState);
    saveFormData(newState);
  };

  // Rest of the component remains the same...
}
