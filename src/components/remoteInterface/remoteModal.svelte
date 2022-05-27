<script>
import Modal from "$components/base/modal.svelte";
import {aTicket, remoteModalOpen, remoteModalState} from "$lib/stores/nftglee";
import RemoteLogin from "./remoteLogin.svelte";
import RemoteInitWallet from "./remoteInitWallet.svelte";
import RemoteRegister from "./remoteRegister.svelte";
import RemoteAddFunds from "./remoteAddFunds.svelte";
import RemoteBuyTicket from "./remoteBuyTicket.svelte";
import RemoteDone from "./remoteDone.svelte";
import { onMount } from "svelte";
import { browser } from "$app/env";
import { findNewTicket, watchChanges } from "$lib/services/nftglee";

const stateComponents = {
    "login": {component: RemoteLogin, message: "Log In to NFTglee"},
    "register": {component: RemoteRegister, message: "New NFTglee account"},
    "wallet": {component: RemoteInitWallet, message: "Initialise wallet"},
    "fund": {component: RemoteAddFunds, message: "Add Funds to your wallet"},
    "ticket": {component: RemoteBuyTicket, message: "Buy ticket"},
    "done": {component: RemoteDone, message: "All set!"},
}

console.log("component: ", stateComponents[$remoteModalState])
onMount(()=>{
    if(browser)
        watchChanges();
})
</script>

<Modal isOpen={$remoteModalOpen} close={()=>{remoteModalOpen.set(false)}}>
    <h2 slot="header">{stateComponents[$remoteModalState].message}</h2>
    <svelte:component slot="content" this={stateComponents[$remoteModalState].component} />
    <!-- <RemoteLogin/> -->
</Modal>