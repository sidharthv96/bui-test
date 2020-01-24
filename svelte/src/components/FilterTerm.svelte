<script>
  import { Comparator, Operator } from "helios-schemas";
  import { createEventDispatcher, beforeUpdate, afterUpdate } from "svelte";
  import { Button } from "sveltestrap";

  export let filterTerm;
  export let fields;
  let selectedField;
  filterTerm = filterTerm;

  console.log(filterTerm);

  function shouldResetValue() {
    if (fields[filterTerm.field]) {
      const values = fields[filterTerm.field].values;
      if (values) {
        if (filterTerm.value && values.includes(filterTerm.value)) {
          return [false, null];
        }
        return [true, values[0]];
      } else {
        return [true && !filterTerm.value, ""];
      }
    }
    return [true, ""];
  }

  afterUpdate(() => {
    if (!filterTerm.field) {
      filterTerm.field = Object.keys(fields)[0];
    } else {
      if (!fields[filterTerm.field]) {
        remove();
      }
    }
    const [shouldReset, value] = shouldResetValue();
    if (shouldReset) {
      filterTerm.value = value;
    }
  });

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
