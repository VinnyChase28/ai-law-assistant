<script>
  import Pspdfkit from "$lib/components/dashboard/PdfViewer.svelte";
  import { goto } from "$app/navigation";
  import { supabaseClient } from "$lib/supabase";
  import { toast } from "$lib/components/Toast";
  import { documentUrl } from "../../../routes/dashboard/+page.svelte";

  export let document;

  const supabase = supabaseClient;

  function goBack() {
    goto("/"); // replace '/' with the path of the page to go back to
  }

  async function savePdf() {
   
    const { data, error } = await supabase.from("pdfs").insert([{ document }]);
    if (error) {
      toast.push(`Error saving PDF: ${error.message}`, {
        classes: ["alert-error"],
      });
    } else {
      toast.push(`PDF saved successfully`, { classes: ["alert-success"] });
    }
  }
</script>

<button on:click={goBack}>Back</button>
<button on:click={savePdf}>Save</button>

<Pspdfkit {document} />

<style>
  /* add your styles to make the page full screen */
  body,
  html {
    height: 100%;
    margin: 0;
    padding: 0;
    overflow: auto;
  }

  /* style the buttons */
  button {
    position: fixed;
    top: 10px;
    left: 10px;
  }

  /* style the PDF viewer to take up the full screen */
  Pspdfkit {
    width: 100%;
    height: 100%;
  }
</style>
