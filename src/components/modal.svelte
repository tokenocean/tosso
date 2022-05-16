<script>
	import { compute_rest_props } from 'svelte/internal';
	import IconButton from './iconButton.svelte';
	import { faXmark } from '@fortawesome/free-solid-svg-icons';

	export let isOpen = false;
	export let open = () => {
		isOpen = true;
	};
	export let close = () => {
		console.log('CLICK');
		isOpen = false;
	};

	function keydown(e) {
        console.log(e.key)
        if (e.key === 'Escape') {
            e.stopPropagation();
			close();
		}
	}
</script>

{#if isOpen}
	<div class={'modal ' + $$props.class} on:keydown={keydown} tabindex={0} autofocus>
		<div class="backdrop" on:click={close}/>
		<div class="content-wrapper">
			<div class="header">
				<slot name="header">
					<!-- fallback -->
					<div>
						<h1>Your Modal Heading Goes Here...</h1>
					</div>
				</slot>
				<IconButton icon={faXmark} class="closeButton" on:click={close} />
			</div>
			<div class="content">
				<slot name="content" />
			</div>

			<slot name="footer" />
		</div>
	</div>
{/if}

<style>
	div.modal {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100vh;

		display: flex;
		justify-content: center;
		align-items: center;
	}
	.modal .header {
		display: flex;
		justify-content: space-between;
		padding: 0em 1em 0em 1em;
		border-bottom: 1px solid #2d2d2d73;
	}
	.modal .header .closeButton {
	}
	div.backdrop {
		position: absolute;
		backdrop-filter: blur(2px);
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.6);
	}
	div.content-wrapper {
		z-index: 10;
		max-width: 70vw;
		border-radius: 0.3rem;
		background-color: white;
		overflow: hidden;
		width: 100%;
		max-width: 800px;
		min-height: 50vh;
		height: fit-content;
	}
	div.content {
		max-height: 90vh;
		overflow: auto;
	}
</style>
