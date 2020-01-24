<script>
  import { Comparator, Operator } from "helios-schemas";
  import { createEventDispatcher } from "svelte";
  import { Button } from "sveltestrap";
  export let filterTerm;
  export let fields;
  let selectedField;
  filterTerm.field = Object.keys(fields)[0];
  filterTerm = filterTerm;
  $: fieldNames = Object.keys(fields);
  $: field = fields[filterTerm.field];

  const comparators = [
    Comparator[Comparator.equals],
    Comparator[Comparator.notEquals]
  ];

  const dispatch = createEventDispatcher();

  function remove() {
    dispatch("remove", {
      term: filterTerm
    });
  }
</script>

<div class="filterTerm">
  <pre style="display: block;">{JSON.stringify(filterTerm, undefined, 2)}</pre>

  <select name="field" bind:value="{filterTerm.field}">
    {#each fieldNames as field}
    <option value="{field}">
      {field}
    </option>
    {/each}
  </select>
  <select name="comparator" bind:value="{filterTerm.comparator}">
    {#each comparators as comparator}
    <option value="{comparator}">
      {comparator}
    </option>
    {/each}
  </select>
  {#if field} {#if field.type==="custom"}
  <input type="text" bind:value="{filterTerm.value}" />
  {:else}
  <select name="value" bind:value="{filterTerm.value}">
    {#each field.values as val}
    <option value="{val}">
      {val}
    </option>
    {/each}
  </select>
  {/if} {/if}
  <Button on:click="{remove}"><i class="fas fa-trash-alt"></i></Button>
</div>
