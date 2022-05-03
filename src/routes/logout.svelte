<script>
    import { onMount } from 'svelte';
    import { error, isAuthenticated, user} from '$lib/stores/auth';
    import auth from '$lib/services/auth';
    import { goto } from '$app/navigation';

	onMount(async ()=>{
        let auth0Client = await auth.createClient();
        isAuthenticated.set(false);
        await auth.logout(auth0Client);
        goto("/");
    }) 
    
	
</script>
