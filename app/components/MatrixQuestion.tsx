import React, { useState, useEffect } from 'react';

interface MatrixOption {
  label: string;
  value: string;
}

interface Question {
  id: number;
  text: string;
  type: string;
  field: string;
  topics?: string[]; // Lista de temas de la matriz
  levels?: string[]; // Lista de niveles de la matriz
  nextStep: number | ((responses: string) => number);
}

interface MatrixQuestionProps {
  question: Question;
  setTempResponse: (field: string, value: Record<string, any>) => void;
  savedResponse?: Record<string, any>; // Respuestas guardadas
}

const MatrixQuestion: React.FC<MatrixQuestionProps> = ({
  question,
  setTempResponse,
  savedResponse = {},
}) => {
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>(
    savedResponse || {}
  );

  const handleMatrixChange = (topic: string, value: string) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [topic]: value, // Guardamos el valor seleccionado para el tema
    }));
  };

  // Guardar las respuestas en el paso actual
  useEffect(() => {
    setTempResponse(question.field, selectedOptions);
  }, [selectedOptions, question.field, setTempResponse]);

  return (
    <div>
      <label className="block text-lg font-medium text-gray-700 mb-4">
        {question.text}
      </label>
      <table className="w-full border-collapse border border-gray-200 text-sm">
        <thead className="bg-gray-50">
          <tr>
            <th className="border border-gray-300 p-2 text-left">Tema</th>
            {question.levels?.map((level) => (
              <th key={level} className="border border-gray-300 p-2">
                {level}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {question.topics?.map((topic, index) => (
            <tr key={index} className="even:bg-gray-50">
              <td className="border border-gray-300 p-2">{topic}</td>
              {question.levels?.map((level, levelIndex) => (
                <td
                  key={levelIndex}
                  className="border border-gray-300 text-center"
                >
                  <input
                    type="radio"
                    name={`${question.field}_${topic}`} // Cambié el nombre del input para que sea único por tema
                    value={level}
                    checked={selectedOptions[topic] === level}
                    className="text-blue-500 focus:ring-blue-400"
                    onChange={() => handleMatrixChange(topic, level)} // Guardar el valor con el nombre del tema
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MatrixQuestion;
