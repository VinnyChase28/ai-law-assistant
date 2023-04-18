<script>
	import ProductTable from '$lib/components/dashboard/ProductTable.svelte';
	import { Link2Icon } from 'svelte-feather-icons';

	/** @type {import('./$types').PageData} */
	export let data;
</script>

<ProductTable products={data.products} />
