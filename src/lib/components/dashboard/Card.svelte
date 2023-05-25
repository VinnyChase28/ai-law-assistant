<script>
  export let description, deleteFile;
</script>

<div class="card w-96 bg-base-100 shadow-xl">
  <figure />
  <div class="card-body">
    <p>{description}</p>
    <div class="card-actions justify-end">
      <button on:click={() => deleteFile()} class="btn btn-primary"
        >Delete</button
      >
    </div>
  </div>
</div>
