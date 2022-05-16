<script>
	import { onMount } from 'svelte';
	import auth from '$lib/services/auth';
	import { error, isAuthenticated, user, shouldLogout, auth0Client } from '$lib/stores/auth';
	import { remoteModalOpen, remoteModalState } from '$lib/stores/nftglee';
	import RemoteModal from '$components/remoteModal.svelte';
	import { updateModalState } from '$lib/services/nftglee';
	import '$lib/nftgleeStyle.scss';
	import { goto } from '$app/navigation';
	import { faDownLeftAndUpRightToCenter } from '@fortawesome/free-solid-svg-icons';

	import {checkLogin} from '$lib/services/nftglee'
import { browser } from '$app/env';


onMount(async () => {
	initBackground();
	console.log("Buffer index: ", Buffer);
	});

	async function enterVip() {
		if (!$isAuthenticated) {
			await login();
			if ($isAuthenticated) goto('/vip');
		} else goto('/vip');
	}

	async function openNFTGlee() {
		updateModalState();
		console.log('modal state: ', $remoteModalState);
		remoteModalOpen.set(true);
	}

	async function login() {
		shouldLogout.set(false);
		await auth.loginWithPopup($auth0Client);
	}

	async function logout() {
		await auth.logout($auth0Client);
	}

	function initBackground() {
		console.log(VANTA);
		VANTA.BIRDS({
			el: '#splashbg',
			mouseControls: true,
			touchControls: true,
			gyroControls: false,
			minHeight: 200.0,
			minWidth: 200.0,
			scale: 1.0,
			scaleMobile: 1.0
		});
	}
</script>

<div class="background" />
<div class="splash">
	<div id="splashbg" class="background" />
	<div class="titlebox">
		<img src="logo.png" alt="Logo" />
		<h1>Your Title here</h1>
		<h2>Isn't it just aweome?</h2>
	</div>
	<div class="authbox">
		<img src="" />
		<div class="enter" on:click={enterVip}>
			<div class="message">Enter with your NFT Ticket</div>
		</div>
		<div class="register" on:click={openNFTGlee}>Get your NFT ticket on NFTglee</div>
	</div>
</div>
<div class="wrapper">
	<h2>Here you can have more info about the event / website etc.</h2>
</div>

<RemoteModal />

{#if $isAuthenticated}
	<h2>Hey {$user.name}!</h2>
	{#if $user.picture}
		<img src={$user.picture} alt={user.name} />
	{:else}
		<img src="https://source.unsplash.com/random/400x300" alt="Random Photo" />
	{/if}
	<button on:click={logout}>Logout</button>
{:else if $error == 'NFT'}
	<h2>You do not own the required nft ticket!</h2>
	<button on:click={login}>Check again</button>
	<button on:click={logout}>Logout</button>
	<button
		on:click={() => {
			logout();
			login();
		}}>Log in other account</button
	>

{/if}

<style>
	@import '../app.css';

	.titlebox img {
		margin: auto;
		height: 5em;
		pointer-events: none;
	}
</style>
