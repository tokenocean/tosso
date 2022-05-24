<script>
    import { api } from "$lib/services/nftglee";
    import { aTicket, funds } from "$lib/stores/nftglee";

    const nftglee_public="https://bid.nftglee.com/api/public/";

    async function submitBuy(e){

    }

</script>

<div class="remoteBuyContainer nftglee p-6 flex flex-col items-center justify-center gap-6">
    <div class = "artwork">
        <div class="flex flex-col items-center justify-center gap-6">
            <object title={$aTicket.title} data={nftglee_public+$aTicket.filename+".mp4"} type={$aTicket.filetype}>
            </object>
            <h4>{$aTicket.title}</h4>
        </div>
        <br>
    </div>
    <div class = "balance">
        <span>Available funds: </span>
        <span class="values">{$funds["confirmed"]} / {$funds["required"]}</span>
    </div>
    <button class="secondary-btn w-full" on:click={submitBuy}>Aquire Ticket now</button>
</div>

<style>
    .artwork object{
        object-fit: cover;
        height: 300px;
    }
</style>