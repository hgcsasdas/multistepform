import React, { useState } from 'react';
import { QUESTIONS } from '../lib/questions';
import Cookies from 'js-cookie';
import TextQuestion from './TextQuestion';
import RadioQuestion from './RadioQuestion';
import MatrixQuestion from './MatrixQuestion';

interface FormResponses {
  [key: string]: any;
}

const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [responses, setResponses] = useState<FormResponses>({});
  const [tempResponse, setTempResponse] = useState<{ [key: string]: any } | null>(null);

  const handleSaveResponse = () => {
    if (tempResponse !== null) {
      const updatedResponses = { ...responses, ...(typeof tempResponse === 'object' ? tempResponse : {}) };
  
      // Validación antes de guardar
      if (!validateResponse(updatedResponses)) {
        return; // Si no es válido, no avanzamos
      }
  
      // Guardar las respuestas en cookies
      console.log('Datos del formulario:', JSON.stringify(updatedResponses, null, 2));
  
      setResponses(updatedResponses);
      Cookies.set('survey_responses', JSON.stringify(updatedResponses), { expires: 7 });
      setTempResponse(null);
  
      // Evaluación de nextStep
      const currentQuestion = QUESTIONS.find((q) => q.id === currentStep);
      const nextStep = currentQuestion?.nextStep;
  
      console.log('nextStep:', nextStep);
  
      if (nextStep) {
        const nextStepValue = typeof nextStep === 'function'
          ? nextStep(updatedResponses[currentQuestion.field])
          : nextStep;
  
        console.log('nextStep value after update:', nextStepValue);
  
        // Avanzar al siguiente paso
        setCurrentStep(nextStepValue);
      }
    }
  };
  

  const validateResponse = (responses: FormResponses) => {
    const question = QUESTIONS.find((q) => q.id === currentStep);
    if (!question) return true;

    const response = responses[question.field];
    
    if (question.type === 'text') {
      if (question.field === 'age' && isNaN(Number(response))) {
        alert('Por favor, ingrese un número válido para la edad.');
        return false;
      }
    }

    return true;
  };

  const renderQuestion = () => {
    const question = QUESTIONS.find((q) => q.id === currentStep);

    if (!question) return <p>Gracias por completar el formulario.</p>;

    switch (question.type) {
      case 'text':
        return (
          <TextQuestion
            question={question}
            setTempResponse={(value: any) =>
              setTempResponse({ [question.field]: value })
            }
          />
        );
      case 'radio':
        return (
          <RadioQuestion
            question={question}
            setTempResponse={(value: any) =>
              setTempResponse({ [question.field]: value })
            }
          />
        );
      case 'matrix':
        return (
          <MatrixQuestion
            question={question}
            setTempResponse={(value) =>
              setTempResponse((prevResponses) => ({
                  ...prevResponses,
                  [question.field]: {
                    ...(prevResponses?.[question.field] || {}),
                    ...value,
                  },
                }))
            }
          />
        );
      default:
        return null;
    }
  };

  return (
    <div>
      {renderQuestion()}
      <button
        onClick={handleSaveResponse}
        className="bg-blue-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors mt-4"
      >
        Siguiente
      </button>
    </div>
  );
};

export default MultiStepForm;
