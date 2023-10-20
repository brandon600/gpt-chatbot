import { useState, useCallback } from 'react';
import { useRouter } from 'next/router';

const GPT: React.FC = () => {
  // Define the state and its setter for the textarea content
  const [textAreaValue, setTextAreaValue] = useState<string>('');
  const [aiResponse, setAiResponse] = useState<string>('');


  // Define a callback function that handles form submission
  const handleSubmit = useCallback((event: React.FormEvent) => {
    event.preventDefault(); // Prevent the default form submit action
    console.log(textAreaValue); // Log the textarea content
    getMessages()
  }, [textAreaValue]);

  // Define a callback function that updates the state with the textarea content
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
		const response = await fetch ('http://localhost:8000/completions', options);
		const data = await response.json();
		console.log(data);
		
		// Check if the response contains the expected data and set the state
		if (data.choices && data.choices[0] && data.choices[0].message) {
		    setAiResponse(data.choices[0].message.content);
		}
	 } catch (error) {
		console.error(error);
	 }
  }

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
	 <div>{aiResponse}</div>
    </div>
  );
}

export default GPT;
