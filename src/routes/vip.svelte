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
	<div class="vip-wrapper">
		<img src="vip-bg.jpg" class="bg">
		<div class="user-panel">
			<h2>Hey {$user.name}!</h2>
			{#if $user.picture}
				<img src={$user.picture} alt={user.name} />
			{:else}
				<img src="https://source.unsplash.com/random/400x300" alt="Random Photo" />
			{/if}
			<a href="logout"> LOGOUT </a>
		</div>
		<div class="content">
			<h1>Welcome to the VIP page!</h1>
		</div>
	</div>
{/if}
<style>
	.vip-wrapper>.bg{
		position: fixed;
		top: 0px;
		left: 0px;
		height: 100vh;
		width: 100vw;
		z-index: -5;
		object-fit: cover;
	}
	.user-panel{
		position: fixed;
		bottom: 50px;
		right: 50px;
		background-color: rgba(243, 243, 158, 0.733);
		padding: 20px;
		border-radius: 20px;
		z-index: 100;
	}
	.vip-wrapper>.content{
		position: fixed;
		bottom: 20px;
		right: 30px;
		height: 40%;
		width: 40%;
	}
	.vip-wrapper h1{
		font-size: 3em;
		color: white;
	}
</style>
