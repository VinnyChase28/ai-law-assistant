<script>
  import Message from "./Message.svelte";
  export let messages = [];
</script>

<div class="chat-box">
  {#each messages as message}
    <Message
      username={message.username}
      message={message.content}
      isUser={message.isUser}
    />
  {/each}
</div>

<style>
  .chat-box {
    max-height: 80vh;
    overflow-y: auto;
    padding: 1rem;
    border: 1px solid #e2e8f0;
    border-radius: 0.5rem;
    background-color: transparent;
  }
  .chat-box::-webkit-scrollbar {
    width: 0.5rem;
  }
  .chat-box::-webkit-scrollbar-track {
    background-color: #e2e8f0;
    border-radius: 0.25rem;
  }
  .chat-box::-webkit-scrollbar-thumb {
    background-color: #a0aec0;
    border-radius: 0.25rem;
  }
</style>
