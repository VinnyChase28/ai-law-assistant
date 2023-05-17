<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  let message = "";

  function submitMessage() {
    if (message.trim().length > 0) {
      dispatch("submit", message.trim()); // Pass the message directly
      message = "";
    }
  }
</script>

<div class="chat-input">
  <input
    type="text"
    bind:value={message}
    placeholder="Type your message here..."
    on:keydown={(e) => e.key === "Enter" && submitMessage()}
  />
  <button on:click={submitMessage}>Send</button>
</div>

<style>
  .chat-input {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
  }
  .chat-input input {
    flex-grow: 1;
    padding: 0.5rem;
    margin-right: 1rem;
    border: 1px solid #e2e8f0;
    border-radius: 0.5rem;
  }
  .chat-input button {
    padding: 0.5rem 1rem;
    background-color: #1a202c;
    color: white;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
  }
  .chat-input button:hover {
    background-color: #2d3748;
  }
</style>
