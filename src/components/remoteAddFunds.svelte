<script>
	import { browser } from '$app/env';

	import { checkFunds } from '$lib/services/nftglee';
	import { funds } from '$lib/stores/nftglee';
	import { btc } from '$lib/utils';
	import { onDestroy, onMount } from 'svelte';
import RemoteFund from './_remoteFund.svelte';

	let x = 0;
	let asset = btc;
	let interval;
	let balance;
	let pending;

	funds.subscribe(f => {if(f){
		balance = f['confirmed'] || 0;
		pending = f['pending'] || false;
	}})

	onMount(async () => {
		if (browser) {
			checkFunds();
			interval = setInterval(() => {
				checkFunds();
				x++;
			}, 5000);
		}
		return () => {
			clearInterval(interval);
		};
	});
	onDestroy(() => {
		clearInterval(interval);
	});

	let funding;
	let withdrawing;

	let toggleFunding = () => {
		funding = !funding;
		withdrawing = false;
	};

	let toggleWithdrawing = () => {
		withdrawing = !withdrawing;
		funding = false;
	};

	let assetLabel = (x) => "L-BTC";
</script>

<div class = "nftglee">
	<div class="dark-bg mb-2 pt-1 sm:rounded-lg">
		<div class="m-6">
			<div class="text-sm light-color">Balance</div>
			<div class="flex mt-3">
				<span class="text-4xl text-white mr-3">{balance}</span>
				<span class="text-gray-400 mt-auto"> L-BTC </span>
			</div>
		</div>
		{#if pending}
			<div class="m-6">
				<div class="text-sm light-color">Pending</div>
				<div class="flex mt-3">
					<span class="light-color mr-3">{pending}</span>
					<span class="text-gray-400">{assetLabel(asset)}</span>
				</div>
			</div>
		{/if}
		<!-- {#if $locked && $asset === btc}
			<div class="m-6">
				<div class="text-sm light-color">Locked in active transactions</div>
				<div class="flex mt-3">
					<span class="light-color mr-3">{val($asset, $locked)}</span>
					<span class="text-gray-400">{assetLabel($asset)}</span>
				</div>
			</div>
		{/if} -->
		<div class="flex justify-between p-6 pt-2">
			<button on:click={toggleFunding} class="button-trans-gray w-full mr-2">Fund</button>
		</div>
	</div>
	<div>
		<RemoteFund bind:funding />
	</div>
</div>
