<script>
  export let filterTerm;
</script>
<input type="text" bind:value="{filterTerm.field}" />
{filterTerm.comparator}
<input type="text" bind:value="{filterTerm.value}" />
