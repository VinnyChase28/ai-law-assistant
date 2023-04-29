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
  }
</style>
