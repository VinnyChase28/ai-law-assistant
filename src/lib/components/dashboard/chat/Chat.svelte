<script>
  import ChatBox from "./ChatBox.svelte";
  import ChatInput from "./ChatInput.svelte";
  import { onMount } from "svelte";

  let messages = [
    {
      username: "ChatGPT",
      content: "Hi! How can I help you today?",
      isUser: false
    }
  ];

  async function sendMessage(event) {
    const messageContent = event.detail.message;
    messages = [
      ...messages,
      { username: "User", content: messageContent, isUser: true }
    ];

    const requestBody = {
      messages: [{ role: "user", content: `${messageContent}` }],
      max_tokens: 100,
      temperature: 0.7,
      model: "gpt-3.5-turbo"
    };

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer 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`
      },
      body: JSON.stringify(requestBody)
    };

    try {
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        requestOptions
      );
      const data = await response.json();
      console.log(data);

      if (data.choices && data.choices.length > 0) {
        const chatGptResponse = data.choices[0].message.content;
        messages = [
          ...messages,
          { username: "ChatGPT", content: chatGptResponse, isUser: false }
        ];
      } else {
        console.error("No response received from the API.");
      }
    } catch (error) {
      console.error("Error fetching data from OpenAI API:", error);
    }
  }
</script>

<div class="chat">
  <ChatBox {messages} />
  <ChatInput on:submit={sendMessage} />
</div>

<style>
  .chat {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
  }
</style>
