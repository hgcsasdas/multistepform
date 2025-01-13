'use client';

import { useState } from 'react';
import { FormData, FormStep } from '../types';

const options = ['MUCHO', 'BASTANTE', 'MÁS O MENOS', 'CASI NADA', 'NADA'];

const questions = [
  {
    id: 'drogas',
    label: 'Drogas y consumo excesivo de alcohol'
  },
  {
    id: 'cambiosCuerpo',
    label: 'Cambios en el cuerpo (p.ej., menstruación, cambios de voz, etc.)'
  },
  {
    id: 'vih',
    label: 'VIH (sida) y otras ITS'
  },
  {
    id: 'embarazos',
    label: 'Embarazos no deseados'
  },
  {
    id: 'preservativo',
    label: 'Preservativo'
  },
  {
    id: 'anticonceptivos',
    label: 'Otros métodos anticonceptivos'
  },
  {
    id: 'relaciones',
    label: 'Cómo saber cuándo estás preparado/a para mantener relaciones sexuales'
  }
];

export default function StepForm() {
  const [formState, setFormState] = useState<FormStep>({
    currentStep: 1,
    sessionId: null,
    formData: {
      drogas: '',
      cambiosCuerpo: '',
      vih: '',
      embarazos: '',
      preservativo: '',
      anticonceptivos: '',
      relaciones: ''
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionId: formState.sessionId,
          step: formState.currentStep,
          data: formState.formData
        }),
      });

      const data = await response.json();
      
      if (!formState.sessionId) {
        setFormState(prev => ({
          ...prev,
          sessionId: data.sessionId
        }));
      }

      if (formState.currentStep < questions.length) {
        setFormState(prev => ({
          ...prev,
          currentStep: prev.currentStep + 1
        }));
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-xl rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-8 text-gray-900">
            Indica si has hablado en alguna ocasión con tus padres/tutor a cerca de los siguientes temas *
          </h2>
          
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <table className="min-w-full">
                <thead>
                  <tr>
                    <th className="w-1/3"></th>
                    {options.map((option) => (
                      <th key={option} className="text-center px-4 py-2">
                        {option}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {questions.map((question, index) => (
                    <tr key={question.id} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                      <td className="px-4 py-3">{question.label}</td>
                      {options.map((option) => (
                        <td key={`${question.id}-${option}`} className="text-center">
                          <input
                            type="radio"
                            name={question.id}
                            value={option}
                            onChange={(e) => {
                              setFormState(prev => ({
                                ...prev,
                                formData: {
                                  ...prev.formData,
                                  [question.id]: e.target.value
                                }
                              }));
                            }}
                            className="form-radio h-4 w-4 text-blue-600"
                            required
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-8 flex justify-end">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {formState.currentStep === questions.length ? 'Finalizar' : 'Siguiente'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}