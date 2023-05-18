<script>
  import { afterUpdate, onMount, onDestroy } from "svelte";

  let currentDocument;
  let container;
  let instance;
  let PSPDFKit;

  export let document;

  async function load() {
    currentDocument = document;
    instance = await PSPDFKit.load({
      baseUrl: `${window.location.protocol}//${window.location.host}/`,
      container: container,
      document: document
    });
  }

  function unload() {
    if (instance) {
      PSPDFKit.unload(instance);
      instance = null;
    }
  }

  onMount(async () => {
    const module = await import("pspdfkit");
    PSPDFKit = module.default;
    load(); // load the document once PSPDFKit has been imported
  });

  afterUpdate(() => {
    if (document !== currentDocument) {
      unload();
      load();
    }
  });

  onDestroy(() => {
    unload();
  });
</script>

<div bind:this={container} style="height: 100vh; width: 100vw;" />
