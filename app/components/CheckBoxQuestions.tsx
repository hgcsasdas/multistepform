import React from 'react';

interface CheckboxQuestionProps {
  question: {
    text: string;
    options: Array<{
      label: string;
      value: string;
    }>;
  };
  setTempResponse: (values: string[]) => void;
}

const CheckboxQuestion: React.FC<CheckboxQuestionProps> = ({ question, setTempResponse }) => {
  const [selectedValues, setSelectedValues] = React.useState<string[]>([]);

  const handleChange = (value: string) => {
    const newValues = selectedValues.includes(value)
      ? selectedValues.filter(v => v !== value)
      : [...selectedValues, value];
    
    setSelectedValues(newValues);
    setTempResponse(newValues);
  };

  return (
    <div className="mb-6">
      <label className="block text-lg font-medium text-gray-700 mb-4">
        {question.text}
      </label>
      {question.options.map((option) => (
        <div key={option.value} className="mb-2">
          <label className="flex items-center space-x-3 text-gray-700">
            <input
              type="checkbox"
              checked={selectedValues.includes(option.value)}
              onChange={() => handleChange(option.value)}
              className="text-blue-500 focus:ring-blue-400"
            />
            <span>{option.label}</span>
          </label>
        </div>
      ))}
    </div>
  );
};

export { CheckboxQuestion };
