'use client';

import { useEffect } from 'react';
import { clearFormData } from '../lib/cookies';

export default function CompletedPage() {
  useEffect(() => {
    // Clear form data when reaching the completed page
    clearFormData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center p-4">
      <div className="max-w-2xl text-center bg-white rounded-lg shadow-xl p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          ¡Gracias por completar el cuestionario!
        </h1>
        <p className="text-lg text-gray-700">
          Tus respuestas han sido registradas correctamente. Esta información nos ayudará a mejorar los programas educativos.
        </p>
      </div>
    </div>
  );
}