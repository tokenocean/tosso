<script>
    import Fa from 'svelte-fa'
    // @ts-ignore
    import { faFlag } from '@fortawesome/free-solid-svg-icons'
    export let icon = faFlag
    export let circle = false;
</script>

<div on:click class={"iconButton " + $$props.class}>
    <Fa icon = {icon}></Fa>
</div>

<style>
    .iconButton{
        padding: 0.5em;
        font-size: 2em;
        font-weight: bolder;
        cursor: pointer;
        /* user-select: none; */
        opacity: 70%;
        display: inline-block;
        transition: transform 0.4s;
    }
    .iconButton:hover{
        transform: scale(1.12);
        opacity: 100%;
    }
</style>