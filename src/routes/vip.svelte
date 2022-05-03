<script>
	import { goto } from '$app/navigation';

	import { a0ready, auth0Client, error, isAuthenticated, user} from '$lib/stores/auth';
	import { beforeUpdate, onMount } from 'svelte';
	import auth from '$lib/services/auth';

	var loading = false;
	onMount(async () => {
		if (!$a0ready) loading = true;
		else if ($isAuthenticated == false) goto('/');
	});
	beforeUpdate(async ()=>{
		if (!$a0ready) loading = true;
		else {
			console.log("ready");
			loading = false;
			console.log('vip check log: ', $isAuthenticated);
			if ($isAuthenticated == false){
				console.log("...redirecting");
				goto('/');
			}
		}
	})
</script>

{#if loading}
	Loading...
{:else if $isAuthenticated}
	<h2>Hey {$user.name}!</h2>
	<h1>Welcome to the VIP page!</h1>
	{#if $user.picture}
		<img src={$user.picture} alt={user.name} />
	{:else}
		<img src="https://source.unsplash.com/random/400x300" alt="Random Photo" />
	{/if}
	<a href="logout"> LOGOUT </a>
{/if}
