<script>
  import Rule from "../components/Rule.svelte";
  import { Comparator, Operator } from "helios-schemas";

  export let webhook;
  let rules = [];
  (async () => {
    rules = await webhook.getRules();
  })();

  function addRule() {
    const newRule = webhook.createRule();
    newRule.filter = {
      filterTerm: {
        comparator: Comparator[Comparator.equals],
        field: "",
        value: ""
      },
      operator: Operator[Operator.none]
    };
    rules = [...rules, newRule];
  }
</script>

{#each rules as rule (rule.id)}
<Rule {rule}></Rule>
{/each}

<br />
<button on:click="{addRule}">Add Rule</button>
