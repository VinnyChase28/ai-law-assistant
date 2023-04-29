<script lang="ts">
  // import { browser } from '$app/environment';
  import { page } from "$app/stores";
  import { toast } from "$lib/components/Toast";
  import { supabaseClient } from "$lib/supabase";
  import { getContext } from "svelte";
  import WeatherChart from "$lib/components/dashboard/WeatherChart.svelte";
  import Dropzone from "svelte-file-dropzone/Dropzone.svelte";
  import Card from "$lib/components/dashboard/Card.svelte";

  /** @type {import('./$types').PageData} */
  export let data;
  let uploadedFiles = data.uploadedFiles;

  const supabase = supabaseClient;
  const userId = $page.data.session?.user.id;

  const createToastSuccess = (message) => {
    toast.push(`${message}`, { classes: ["alert-success"] });
  };
  const createToastError = (message) => {
    toast.push(`${message}`, { classes: ["alert-error"] });
  };

  let files = {
    accepted: [],
    rejected: []
  };

  function handleFilesSelect(e) {
    const { acceptedFiles, fileRejections } = e.detail;
    files.accepted = [...files.accepted, ...acceptedFiles];
    files.rejected = [...files.rejected, ...fileRejections];
  }

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
      uploadedFiles = [
        ...uploadedFiles,
        {
          name: file.name,
          isDeleted: false
        }
      ];
    }
  }

  function uploadAllFiles() {
    if (files.accepted.length === 0) {
      createToastError("No files selected");
      return;
    }
    for (const file of files.accepted) {
      uploadFile(file);
    }
  }
  async function deleteFile(userId, fileName, item) {
    const { data, error } = await supabase.storage
      .from("contracts")
      .remove([`${userId}/${fileName}`]);

    if (!error) {
      uploadedFiles = uploadedFiles.filter((file) => file !== item);
      createToastSuccess("File Deleted");
    } else if (error) {
      createToastError(error.message);
    } else {
      createToastError("Something went wrong");
    }
  }
</script>

<svelte:head>
  <title>Dashboard</title>
</svelte:head>

<!-- {#if $page.data.session.user.app_metadata.role=='admin'}
ADMIN
	
{/if} -->

<Dropzone accept={["application/pdf"]} on:drop={handleFilesSelect}
  ><h1>Upload or Drag Files Here</h1></Dropzone
>
<ol>
  {#each files.accepted as item}
    <li>{item.name}</li>
  {/each}
</ol>

<button class="btn btn-secondary" on:click={uploadAllFiles}>Upload Files</button
>
{#each uploadedFiles as uploadedFile}
  <Card
    title="Document"
    description={uploadedFile.name}
    deleteFile={() => deleteFile(userId, uploadedFile.name, uploadedFile)}
  />
{/each}

<style></style>
