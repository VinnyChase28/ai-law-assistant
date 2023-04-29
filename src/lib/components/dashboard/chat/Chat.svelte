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

  async function sendMessage(messageContent) {
    messages = [
      ...messages,
      { username: "User", content: messageContent, isUser: true }
    ];

    // Add your ChatGPT API call here to get the response
    // ...
    // Example response from ChatGPT
    const chatGptResponse = "This is a sample response from ChatGPT.";

    messages = [
      ...messages,
      { username: "ChatGPT", content: chatGptResponse, isUser: false }
    ];
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
