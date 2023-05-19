<script lang="ts">
  // import { browser } from '$app/environment';

  import { page } from "$app/stores";
  import { toast } from "$lib/components/Toast";
  import { supabaseClient } from "$lib/supabase";
  import { getContext } from "svelte";
  import WeatherChart from "$lib/components/dashboard/WeatherChart.svelte";
  import Dropzone from "svelte-file-dropzone/Dropzone.svelte";
  import Card from "$lib/components/dashboard/Card.svelte";
  import Chat from "$lib/components/dashboard/chat/Chat.svelte";
  import Pspdfkit from "$lib/components/dashboard/PdfViewer.svelte";
  import PdfViewerPage from "$lib/components/dashboard/PdfViewerPage.svelte";
  /** @type {import('./$types').PageData} */

  export let data;

  let uploadedFiles = data.uploadedFiles;
  let dropzoneRef;
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
    rejected: [],
  };

  function clearFiles() {
    files.accepted = [];
    files.rejected = [];
    if (dropzoneRef?.fileInput) {
      dropzoneRef.fileInput.value = "";
    }
  }

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
        upsert: false,
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
          isDeleted: false,
        },
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
      clearFiles();
    }

    input.value = "";
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

  async function saveChanges() {
    // Export the updated PDF as a Blob
    const updatedPdf = await instance.exportPDF({ flattenAnnotations: true });

    // Upload the Blob to your server or file storage service
    const response = await supabase.storage
      .from("myBucket")
      .upload("path/to/document.pdf", updatedPdf);

    // Handle the response (e.g., check for errors, update the UI)
    if (response.error) {
      console.error(response.error);
    } else {
      console.log("File updated successfully");
    }
  }

  let showPage = false;
  let key = 0;

  const togglePage = () => {
    if (showPage) {
      // Increment the key to force Svelte to recreate the component
      key++;
    }
    showPage = !showPage;
  };
</script>

<svelte:head>
  <title>Dashboard</title>
</svelte:head>

<!-- {#if $page.data.session.user.app_metadata.role=='admin'}
ADMIN
	
{/if} -->

<button on:click={togglePage}>
  {showPage ? "Close PDF Viewer" : "Open PDF Viewer"}
</button>

{#if showPage}
  <PdfViewerPage {key} document="document.pdf" />
{/if}

<div class="dropzone-container mx-auto max-w-lg">
  <Dropzone
    accept={["application/pdf"]}
    on:drop={handleFilesSelect}
    bind:this={dropzoneRef}><h1>Upload or Drag Files Here</h1></Dropzone
  >
</div>

<ol>
  {#each files.accepted as item}
    <li>{item.name}</li>
  {/each}
</ol>

<div class="button-container flex justify-center">
  <button class="btn btn-secondary p-4" on:click={uploadAllFiles}
    >Upload Files</button
  >
</div>

<div class="card-grid flex flex-wrap justify-left gap-4 sm:justify-start">
  {#each uploadedFiles as uploadedFile}
    <Card
      description={uploadedFile.name}
      deleteFile={() => deleteFile(userId, uploadedFile.name, uploadedFile)}
    />
  {/each}
</div>

<style>
  .dropzone-container .svelte-file-dropzone {
    background-color: rgba(
      229,
      231,
      235
    ); /* Replace this with your desired color */
  }
</style>
