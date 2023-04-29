<script>
  export let username = "";
  export let message = "";
  export let isUser = false;
</script>

<div class={`message ${isUser ? "user" : "bot"}`}>
  <strong>{username}:</strong>
  {message}
</div>

<style>
  .message {
    margin-bottom: 0.5rem;
  }
  .message.user {
    color: #1a202c; /* You can customize the color for user messages */
  }
  .message.bot {
    color: #718096; /* You can customize the color for bot messages */
  }
</style>
