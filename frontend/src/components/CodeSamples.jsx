const codeSamples = {
    htmlCssJs: [
        {
            title: 'Basic HTML/CSS/JavaScript Example',
            description: 'A basic web page using HTML, CSS, and JavaScript.',
            code: `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <style>
                        body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
                        button { padding: 10px 20px; background-color: blue; color: white; border: none; }
                    </style>
                </head>
                <body>
                    <h1>Hello, World!</h1>
                    <button onclick="alert('Hello from JavaScript!')">Click Me</button>
                </body>
                </html>
            `
        },
    ],
    react: [
        {
            title: 'React Component Example',
            description: 'A simple example of a React functional component using state.',
            code: `
                import React, { useState } from 'react';

                function Counter() {
                    const [count, setCount] = useState(0);

                    return (
                        <div className="flex items-center justify-center h-screen">
                            <p className="text-lg">You've clicked {count} times</p>
                            <button onClick={() => setCount(count + 1)} className="bg-blue-500 text-white px-4 py-2 rounded-lg">
                                Click me
                            </button>
                        </div>
                    );
                }

                export default Counter;
            `
        },
    ],
    aiApi: [
        {
            title: 'AI API Integration Example',
            description: 'A simple API call to OpenAI using React.',
            code: `
                import React, { useState } from 'react';

                function OpenAICall() {
                    const [response, setResponse] = useState(null);

                    const fetchResponse = async () => {
                        const res = await fetch('https://api.openai.com/v1/engines/davinci/completions', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': 'Bearer YOUR_API_KEY'
                            },
                            body: JSON.stringify({
                                prompt: "What is React?",
                                max_tokens: 50
                            })
                        });
                        const data = await res.json();
                        setResponse(data.choices[0].text);
                    };

                    return (
                        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
                            <button 
                                className="bg-blue-500 text-white px-4 py-2 rounded-lg mb-4"
                                onClick={fetchResponse}
                            >
                                Ask AI
                            </button>
                            {response && <p className="mt-4">{response}</p>}
                        </div>
                    );
                }

                export default OpenAICall;
            `
        },
    ]
};

export default codeSamples;
