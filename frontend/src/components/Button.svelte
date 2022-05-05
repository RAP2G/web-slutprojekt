<script lang="ts">
  export let text = "";
  export let onClick: (...a: any) => any;
  export let type = "";
</script>

<button class="button" {type} on:click|preventDefault={onClick}>{text}</button>

<style>
  .button {
    background-color: #ff6734;
    color: white;
    border: none;
  }
</style>
