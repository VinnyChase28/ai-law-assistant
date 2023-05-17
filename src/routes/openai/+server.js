import { json } from "@sveltejs/kit";
import { openaiKey } from "../../lib/server/openai";

export async function POST({ request }) {
  const { messageContent } = await request.json();

  const requestBody = {
    messages: [{ role: "user", content: messageContent }],
    max_tokens: 2000,
    temperature: 0.7,
    model: "gpt-3.5-turbo",
  };

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${openaiKey}`,
    },
    body: JSON.stringify(requestBody),
  };

  try {
    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      requestOptions
    );
    const data = await response.json();

    if (data.choices && data.choices.length > 0) {
      const chatGptResponse = data.choices[0].message.content;
      return json({ chatGptResponse }, { status: 200 });
    } else {
      return json(
        { error: "No response received from the API." },
        { status: 500 }
      );
    }
  } catch (error) {
    return json(
      { error: `Error fetching data from OpenAI API: ${error}` },
      { status: 500 }
    );
  }
}
