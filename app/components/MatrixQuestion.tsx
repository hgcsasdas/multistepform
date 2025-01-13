interface Question {
  id: number;

  text: string;

  type: string;

  field: string;

  nextStep: number | ((responses: string) => number);

  options?: { label: string; value: string }[];

  topics?: string[];

  levels?: string[];
}

interface MatrixQuestionProps {
  question: Question;
  setTempResponse: (response: Record<string, any>) => void;
}
const MatrixQuestion: React.FC<MatrixQuestionProps> = ({
  question,
  setTempResponse,
}) => {
  const handleMatrixChange = (topic: string, value: string) => {
    // Actualizamos las respuestas de la matriz, combinando las anteriores respuestas con la nueva
    setTempResponse((prevResponses: { [x: string]: any }) => {
      const updatedFieldResponses = {
        ...(prevResponses[question.field] || {}),
        [topic]: value, // Guardamos el valor seleccionado para el tema
      };
        console.log(prevResponses);
      return {
        ...prevResponses,
        [question.field]: updatedFieldResponses,
      };
    });
  };

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
                    name={`${question.field}_${index}`}
                    value={level}
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
