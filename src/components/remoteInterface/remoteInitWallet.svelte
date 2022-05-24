<script>
    import {initWallet, getArt} from '$lib/services/nftglee'
    import { getMnemonic } from '$lib/services/nftgleeWallet';
    import {username, password, user} from '$lib/stores/nftglee'
    import { onMount } from 'svelte';

    let mnemonic = ".";
    onMount(()=>{
        mnemonic = getMnemonic($user["mnemonic"], $password)
    })
    async function testArtQuery(){
        let dat = getArt();
        console.log(dat);
    }
</script>

<div class="flex flex-col h-full justify-around gap-10">
    <h1>Write down for backup:</h1>
    <p> {mnemonic} </p>
    <div class="grow"/>
    <button class="primary-btn w-full align-self-end	" on:click={initWallet}>Initialise Wallet</button>
    <button class="primary-btn w-full align-self-end	" on:click={testArtQuery}>get art</button>
    <br>
</div>