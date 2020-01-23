<script>
  import FilterTerm from "./FilterTerm.svelte";
  export let filter;
</script>

<pre>{JSON.stringify(filter, undefined, 2)}</pre>

{#if filter.operator === 'none'}
<FilterTerm bind:filterTerm="{filter.filterTerm}"></FilterTerm>
{:else} {#each filter.children as childFilter}
<svelte:self bind:filter="{childFilter}"></svelte:self>
{/each} {/if}
