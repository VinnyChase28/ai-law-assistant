<script>
	import UserTableSimple from '$lib/components/dashboard/UserTableSimple.svelte';
	/** @type {import('./$types').PageData} */
	export let data;
</script>

<div class="card flex-col lg:flex-row bg-base-300 shadow-xl">
	<div class="overflow-x-auto w-full scrollbar-thin scrollbar-thumb-gray-400 overflow-y-scroll">
		<UserTableSimple users={data.users} />
		<!-- <UserTableAdvanced users={data.users} /> -->
	</div>
</div>
