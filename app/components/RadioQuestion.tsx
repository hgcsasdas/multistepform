interface Option {
  value: string;
  label: string;
}

interface Question {
  text: string;
  field: string;
  options?: Option[];
}

interface RadioQuestionProps {
  question: Question;
  setTempResponse: (value: string | number) => void;
}

const RadioQuestion = ({ question, setTempResponse }: RadioQuestionProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setTempResponse(value);

    // Si el valor es "other", habilitar un campo de texto adicional
    if (value === "other") {
      setTempResponse(""); // Limpiar el valor del campo si es "other"
    }
  };

  return (
    <div>
      <p>{question.text}</p>
      {question.options?.map((option) => (
        <div key={option.value}>
          <label>
            <input
              type="radio"
              name={question.field}
              value={option.value}
              onChange={handleChange}
            />
            {option.label}
          </label>
        </div>
      ))}
      {question.options?.some((option) => option.value === "other") && (
        <div>
          <label>
            Especifica:
            <input
              type="text"
              onChange={(e) => setTempResponse(e.target.value)}
              placeholder="Especifica..."
            />
          </label>
        </div>
      )}
    </div>
  );
};

export default RadioQuestion;
