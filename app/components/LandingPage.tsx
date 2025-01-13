'use client';

import { useRouter } from 'next/navigation';
import { ArrowRight } from 'lucide-react';

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-50 flex flex-col items-center justify-center p-6">
      <div className="max-w-2xl text-center">
        <h1 className="text-5xl font-bold text-gray-800 mb-8">
          Cuestionario sobre Educación Sexual
        </h1>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-10">
          <p className="text-xl text-gray-700 mb-6">
            Bienvenido/a a nuestro cuestionario sobre educación sexual. Tu participación es completamente anónima y tus respuestas nos ayudarán a mejorar los programas educativos.
          </p>

          <div className="space-y-3 text-left text-gray-600">
            <p>✓ Todas las respuestas son anónimas</p>
            <p>✓ No podrás retroceder una vez avances</p>
            <p>✓ Toma tu tiempo para responder honestamente</p>
          </div>
        </div>

        <button
          onClick={() => router.push('/form')}
          className="bg-blue-500 text-white px-8 py-3 rounded-lg text-lg font-semibold shadow-md
                     hover:bg-blue-600 focus:ring-2 focus:ring-blue-300 focus:outline-none flex items-center justify-center gap-2 transition-transform duration-150 transform hover:scale-105"
        >
          Comenzar Cuestionario
          <ArrowRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
