<script>
	import { beforeUpdate, onMount } from 'svelte';
	import auth from '$lib/services/auth';
	import { error, isAuthenticated, user, shouldLogout, auth0Client, a0ready} from '$lib/stores/auth';
	import { remoteModalOpen, remoteModalState } from '$lib/stores/nftglee';
	import RemoteModal from '$components/remoteInterface/remoteModal.svelte';
	import { updateModalState } from '$lib/services/nftglee';
	import '$lib/nftgleeStyle.scss';

	onMount(async ()=>{
		console.log("Buffer layout: ", Buffer);
		$a0ready = false;
		if(!$auth0Client){
			$auth0Client = await auth.createClient();
			console.log("created new client");
		}
		else
			console.log("got old client");
		isAuthenticated.set(await $auth0Client.isAuthenticated());
		user.set(await $auth0Client.getUser());
		console.log("logged: ", await $auth0Client.isAuthenticated());
		$a0ready = true;
	})
	
	export async function lfunc(){
		console.log("accesed layout function");
	}
</script>

<slot>

</slot>