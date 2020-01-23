<script>
  import Filter from "./Filter.svelte";
  export let rule;
  let shown = true;
</script>

{#if shown}

<pre>{JSON.stringify(rule, undefined, 2)}</pre>

<input type="text" bind:value="{rule.event_id}" />
<Filter bind:filter="{rule.filter}"></Filter>
<button on:click="{rule.save()}">Save</button>
<button on:click="{rule.remove().then(()=>shown=false)}">Delete</button>

{/if}
