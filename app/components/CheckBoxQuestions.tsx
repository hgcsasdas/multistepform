import React, { useState, useEffect } from 'react';

interface CheckboxOption {
  label: string;
  value: string;
}

interface Question {
  id: number;
  text: string;
  type: string;
  field: string;
  options?: CheckboxOption[];
  nextStep: number | ((responses: string) => number);
}

interface CheckboxQuestionProps {
  question: Question;
  setTempResponse: (field: string, value: Record<string, boolean>) => void;
  savedResponse?: Record<string, boolean>; // Respuestas guardadas
}

const CheckboxQuestion: React.FC<CheckboxQuestionProps> = ({
  question,
  setTempResponse,
  savedResponse = {},
}) => {
  const [selectedOptions, setSelectedOptions] = useState<Record<string, boolean>>(
    savedResponse || {}
  );

  const handleRadioChange = (value: string, isTrue: boolean) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [value]: isTrue,
    }));
  };

  // Este componente ya no maneja el paso siguiente, lo hace el MultiStepForm
  useEffect(() => {
    // Guardar las respuestas en el paso actual
    setTempResponse(question.field, selectedOptions);
  }, [selectedOptions, question.field, setTempResponse]);

  return (
    <div className="checkbox-question">
      <h2 className="text-lg font-medium">{question.text}</h2>
      <table className="w-full table-auto border-collapse">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2 text-left">Opción</th>
            <th className="p-2 text-center">Verdadero</th>
            <th className="p-2 text-center">Falso</th>
          </tr>
        </thead>
        <tbody>
          {question.options?.map((option) => (
            <tr key={option.value}>
              <td className="border p-2">{option.label}</td>
              <td className="border p-2 text-center">
                <input
                  type="radio"
                  name={option.value}
                  checked={selectedOptions[option.value] === true}
                  onChange={() => handleRadioChange(option.value, true)}
                />
              </td>
              <td className="border p-2 text-center">
                <input
                  type="radio"
                  name={option.value}
                  checked={selectedOptions[option.value] === false}
                  onChange={() => handleRadioChange(option.value, false)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CheckboxQuestion;
