<script>
  import Rule from "../components/Rule.svelte";
  import { Comparator, Operator } from "helios-schemas";
  import { slide } from "svelte/transition";
  import { flip } from "svelte/animate";
  import { Button } from "sveltestrap";
  import Collapsible from "../templates/Collapsible.svelte";
  import { getNewFilter } from "../util.js";
  export let webhook;
  let rules = [];
  (async () => {
    rules = await webhook.getRules();
  })();

  function addRule() {
    const newRule = webhook.createRule();
    newRule.filter = getNewFilter();
    newRule.expanded = true;
    rules = [...rules, newRule];
  }
</script>

<div class="rules">
  <Collapsible>
    <div slot="head">
      Rules
    </div>
    <div slot="body">
      {#each rules as rule (rule.id)}
      <Rule {rule}></Rule>
      {/each}
      <Button on:click="{addRule}">
        <i class="fas fa-plus"></i> Add Rule</Button
      >
    </div>
  </Collapsible>
</div>
