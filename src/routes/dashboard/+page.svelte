<script>
	// import { browser } from '$app/environment';

	import WeatherChart from '$lib/components/dashboard/WeatherChart.svelte';
	import { toast } from '$lib/components/Toast';
	import Dropzone from 'svelte-file-dropzone/Dropzone.svelte';

	/** @type {import('./$types').PageData} */
	export let data;

	const action = () => {
		toast.push('TOAST!', { classes: ['alert-success'] });
	};

	//file drop logic
	let files = {
		accepted: [],
		rejected: []
	};

	function handleFilesSelect(e) {
		const { acceptedFiles, fileRejections } = e.detail;
		files.accepted = [...files.accepted, ...acceptedFiles];
		files.rejected = [...files.rejected, ...fileRejections];
	}
</script>

<svelte:head>
	<title>Dashboard</title>
</svelte:head>

<!-- {#if $page.data.session.user.app_metadata.role=='admin'}
ADMIN
	
{/if} -->

<Dropzone class="bg-black" on:drop={handleFilesSelect}
	><button class="btn btn-primary">Upload or Drag Files Here</button></Dropzone
>
<ol>
	{#each files.accepted as item}
		<li>{item.name}</li>
	{/each}
</ol>

<style></style>
