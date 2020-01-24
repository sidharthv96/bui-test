<script>
  import { Collapse, Button, CardBody, Card } from "sveltestrap";
  export let expanded = false;
</script>

<style type="text/sass" lang="sass">
  .collapsible {
    .header {
      margin: -0.5rem;
      padding: 5px;
      background-color: #f1f1f1;
      &:hover {
        background-color: #ccc;
      }
    }
  }

  .body {
    padding-top: 1rem;
  }
</style>

<div class="collapsible item">
  <div class="header" on:click="{() => expanded = !expanded}">
    <slot name="head">
      Header missing
    </slot>
  </div>
  <Collapse isOpen="{expanded}">
    <div class="body">
      <slot name="body">
        Body missing
      </slot>
    </div>
  </Collapse>
</div>
