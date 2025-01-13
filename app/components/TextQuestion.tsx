interface Question {
  text: string;
  field: string;
  options?: Option[];
}

interface Option {
  value: string;
  label: string;
}

interface TextQuestionProps {
  question: Question;
  setTempResponse: (response: string) => void;
}

const TextQuestion = ({ question, setTempResponse }: TextQuestionProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempResponse(e.target.value);
    
    // Validación para que solo se permita un número si el campo es "edad"
    if (question.field === 'age' && isNaN(Number(e.target.value))) {
      alert('Por favor, ingrese un número válido para la edad.');
    }
  };

  return (
    <div className="mb-6">
      <label className="block text-lg font-medium text-gray-700 mb-2">
        {question.text}
      </label>
      <input
        type="text"
        className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
        onChange={handleChange}
      />
    </div>
  );
};

export default TextQuestion;
