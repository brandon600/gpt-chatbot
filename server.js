require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());

app.post('/completions', async (req, res) => {
    console.log(process.env.OPENAI_API_KEY);
    const userMessage = req.body.message;

    const options = {
        method: 'POST',
        headers: {
            "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: "gpt-4",
            messages: [{ role: "user", content: userMessage}],
            max_tokens: 100
        })
    }

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', options)
        const data = await response.json()
        res.send(data)
    } catch (error) {
        console.log(error);
    }
});


const PORT = 8000;

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});

