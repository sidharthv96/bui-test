<script>
  import FilterTerm from "./FilterTerm.svelte";
  import { Comparator, Operator } from "helios-schemas";
  import { slide } from "svelte/transition";
  import { flip } from "svelte/animate";
  import { Button } from "sveltestrap";

  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  export let filter;
  export let fields;
  const noneOperator = Operator[Operator.none];
  const orOperator = Operator[Operator.or];
  const andOperator = Operator[Operator.and];

  function addFilterTerm() {
    const created = {
      children: [],
      filterTerm: {
        comparator: Comparator[Comparator.equals],
        field: "",
        value: ""
      },
      operator: noneOperator
    };
    if (filter.operator === noneOperator) {
      const old = {
        children: [],
        filterTerm: filter.filterTerm,
        operator: noneOperator
      };

      filter.children = [old, created];
      filter.operator = andOperator;
      delete filter.filterTerm;
    } else {
      filter.children = [...filter.children, created];
    }
    filter = filter;
  }

  function changeOperator() {
    filter.operator =
      filter.operator === andOperator ? orOperator : andOperator;
  }

  function removeFilter(event) {
    if (filter.operator !== noneOperator) {
      const remaining = filter.children.filter(
        child => child != event.detail.filter
      );
      if (remaining.length > 1) {
        filter.children = remaining;
      } else {
        filter.children = [];
        filter.operator = noneOperator;
        filter.filterTerm = remaining[0].filterTerm;
      }
    } else {
      dispatch("remove", {
        filter
      });
    }
    filter = filter;
  }
</script>

<style>
  .item {
    margin-top: 0.5rem;
  }
  .andItem {
    border-color: #faa;
    border-width: 2px;
  }

  .orItem {
    border-color: #afa;
    border-width: 2px;
  }
</style>

<div
  class="item"
  class:andItem="{filter.operator === 'and'}"
  class:orItem="{filter.operator === 'or'}"
>
  <pre>{JSON.stringify(filter, undefined, 2)}</pre>

  {#if filter.operator === 'none'}
  <FilterTerm
    bind:filterTerm="{filter.filterTerm}"
    on:remove="{removeFilter}"
    {fields}
  ></FilterTerm>
  {:else}
  <Button on:click="{changeOperator}" block>{filter.operator}</Button>

  <div>
    {#each filter.children as childFilter (childFilter)}
    <div animate:flip="{{duration: 200}}">
      <svelte:self
        bind:filter="{childFilter}"
        on:remove="{removeFilter}"
        {fields}
      ></svelte:self>
      {filter.operator}
    </div>
    {/each}
  </div>
  <Button>
    <i class="fas fa-trash-alt"></i>
    Delete Filter
  </Button>
  {/if}
</div>
