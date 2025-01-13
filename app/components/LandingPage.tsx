'use client';

import { useRouter } from 'next/navigation';
import { ArrowRight } from 'lucide-react';

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col items-center justify-center p-4">
      <div className="max-w-2xl text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          Cuestionario sobre Educación Sexual
        </h1>
        
        <div className="bg-white rounded-lg shadow-xl p-6 mb-8">
          <p className="text-lg text-gray-700 mb-4">
            Bienvenido/a a nuestro cuestionario sobre educación sexual. Tu participación es completamente anónima y tus respuestas nos ayudarán a mejorar los programas educativos.
          </p>
          
          <div className="space-y-4 text-left text-gray-600">
            <p>✓ Todas las respuestas son anónimas</p>
            <p>✓ No podrás retroceder una vez avances</p>
            <p>✓ Toma tu tiempo para responder honestamente</p>
          </div>
        </div>

        <button
          onClick={() => router.push('/form')}
          className="bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold 
                   hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center gap-2"
        >
          Comenzar Cuestionario
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}