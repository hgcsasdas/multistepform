import React from 'react';

interface TrueFalseMatrixProps {
  question: {
    text: string;
    statements: string[];
  };
  setTempResponse: (values: Record<string, boolean>) => void;
}

const TrueFalseMatrix: React.FC<TrueFalseMatrixProps> = ({ question, setTempResponse }) => {
  const [responses, setResponses] = React.useState<Record<string, boolean>>({});

  const handleChange = (statement: string, value: boolean) => {
    const newResponses = { ...responses, [statement]: value };
    setResponses(newResponses);
    setTempResponse(newResponses);
  };

  return (
    <div className="mb-6">
      <h3 className="text-lg font-medium text-gray-700 mb-4">{question.text}</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Pregunta
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Verdadero
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Falso
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {question.statements.map((statement, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-normal text-sm text-gray-900">
                  {statement}
                </td>
                <td className="px-6 py-4 text-center">
                  <input
                    type="radio"
                    name={`statement-${index}`}
                    onChange={() => handleChange(statement, true)}
                    className="text-blue-500 focus:ring-blue-400"
                  />
                </td>
                <td className="px-6 py-4 text-center">
                  <input
                    type="radio"
                    name={`statement-${index}`}
                    onChange={() => handleChange(statement, false)}
                    className="text-blue-500 focus:ring-blue-400"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export { TrueFalseMatrix };