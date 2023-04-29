<script lang="ts">
  // import { browser } from '$app/environment';
  import { page } from "$app/stores";
  import WeatherChart from "$lib/components/dashboard/WeatherChart.svelte";
  import { toast } from "$lib/components/Toast";
  import Dropzone from "svelte-file-dropzone/Dropzone.svelte";
  import { supabaseClient } from "$lib/supabase";
  import { getContext } from "svelte";

  /** @type {import('./$types').PageData} */
  export let data;

  console.log(data);

  const supabase = supabaseClient;
  const userId: string = $page.data.session?.user.id;

  const createToastSuccess = (message) => {
    toast.push(`${message}`, { classes: ["alert-success"] });
  };

  const createToastError = (message) => {
    toast.push(`${message}`, { classes: ["alert-error"] });
  };

  let uploadedFiles = [];

  let files = {
    accepted: [],
    rejected: []
  };

  function handleFilesSelect(e) {
    const { acceptedFiles, fileRejections } = e.detail;
    files.accepted = [...files.accepted, ...acceptedFiles];
    files.rejected = [...files.rejected, ...fileRejections];
  }

  // Upload file
  async function uploadFile(file) {
    const { data, error } = await supabase.storage
      .from("contracts")
      .upload(`${userId}/${file.name}`, file, {
        cacheControl: "3600",
        upsert: false
      });
    if (error) {
      let errorMessage;
      if (error.statusCode === "409") {
        errorMessage = "File already exists.";
      } else {
        errorMessage = error.message;
      }
      createToastError(errorMessage);
    } else {
      createToastSuccess("Upload Successful");
    }
  }
  // Upload all files on button press
  function uploadAllFiles() {
    for (const file of files.accepted) {
      uploadFile(file);
    }
  }
</script>

<svelte:head>
  <title>Dashboard</title>
</svelte:head>

<!-- {#if $page.data.session.user.app_metadata.role=='admin'}
ADMIN
	
{/if} -->

<Dropzone
  accept={["application/pdf"]}
  class="bg-transparent"
  on:drop={handleFilesSelect}
  ><button class="btn btn-primary">Upload or Drag Files Here</button></Dropzone
>
<ol>
  {#each files.accepted as item}
    <li>{item.name}</li>
  {/each}
</ol>

<button class="btn btn-secondary" on:click={uploadAllFiles}>Upload Files</button
>

<style></style>
