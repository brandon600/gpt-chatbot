import { useState, useCallback } from 'react';
import { useRouter } from 'next/router';


const GPT: React.FC = () => {
  // Define the state and its setter for the textarea content
  const [textAreaValue, setTextAreaValue] = useState<string>('');
  const [aiResponse, setAiResponse] = useState<string>('');

  const handleSubmit = useCallback((event: React.FormEvent) => {
    event.preventDefault();
    getMessages();
  }, [textAreaValue]);

  const handleTextAreaChange = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextAreaValue(event.target.value);
  }, []);

  const getMessages = async () => {

	const options = {
		method: "POST",
		body: JSON.stringify({
			message: textAreaValue
		}),
		headers: {
			"Content-Type": "application/json"
		}
	}
  try {
    const response = await fetch('http://localhost:8000/completions', options);
    const data = await response.json();

    if (data.choices && data.choices[0] && data.choices[0].message) {
      setAiResponse(data.choices[0].message.content);
    }
  } catch (error) {
    console.error(error);
  }
  }
  
  const renderAiResponse = () => {
    return aiResponse.split('\n').map((line, index) => (
      <div key={index}>{line}</div>
    ));
  };

  return (
    <div>
      <div>Hello it's GPT...</div>
      <form onSubmit={handleSubmit}>
        <textarea 
          value={textAreaValue}
          onChange={handleTextAreaChange}
          placeholder="Write something..."
        />
        <button type="submit">Submit</button>
      </form>
    <div>
       {renderAiResponse()}
    </div>
    </div>
  );
}

export default GPT;
