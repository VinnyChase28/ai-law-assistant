<script>
  import ChatBox from "./ChatBox.svelte";
  import ChatInput from "./ChatInput.svelte";
  import { onMount } from "svelte";

  let messages = [
    {
      username: "Law Assistant",
      content: "Hi! How can I help you today?",
      isUser: false
    }
  ];

  async function handleKeyDown(e) {
    if (e.key === "Enter") {
      const input = e.currentTarget;
      const messageContent = input.value;
      input.value = "";
      messages = [
        ...messages,
        { username: "User", content: messageContent, isUser: true }
      ];

      try {
        const response = await fetch("/openai", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ messageContent })
        });
        const { chatGptResponse } = await response.json();
        console.log(chatGptResponse);

        if (chatGptResponse) {
          messages = [
            ...messages,
            { username: "ChatGPT", content: chatGptResponse, isUser: false }
          ];
        } else {
          console.error("No response received from the API.");
        }
      } catch (error) {
        console.error("Error sending message:", error);
      }

      input.value = "";
    }
  }
</script>

<div class="chat">
  <ChatBox {messages} />
  <div class="chat-input">
    <input
      type="text"
      autocomplete="off"
      placeholder="Type your message here..."
      on:keydown={handleKeyDown}
    />
  </div>
</div>

<style>
  .chat {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
  }
  .chat-input {
    padding: 1rem;
  }
  .chat-input input {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #e2e8f0;
    border-radius: 0.5rem;
  }
</style>
