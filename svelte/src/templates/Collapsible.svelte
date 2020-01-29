<script>
  import { Collapse, Button, CardBody, Card } from "sveltestrap";
  export let expanded = false;

  function expandHandler(event) {
    if (!hasSomeParentTheClass(event.toElement, "controls"))
      expanded = !expanded;
    console.log(event.toElement);
  }

  function hasSomeParentTheClass(element, classname) {
    if (
      element.className &&
      element.className.split(" ").indexOf(classname) >= 0
    )
      return true;
    return (
      element.parentNode && hasSomeParentTheClass(element.parentNode, classname)
    );
  }
</script>

<style type="text/sass" lang="sass">
  .collapsible {
    .header {
      display: flex;
      margin: -0.5rem;
      padding: 5px;
      background-color: #f1f1f1;
      &:hover {
        background-color: #ccc;
      }

      i {
        width: 2rem;
        padding-left: 0.5rem;
      }

      .controls {
        padding-right: 1rem;
        border-right: solid 1px #ccc;
      }

      .title {
        margin: 0 1rem;
      }
    }
  }

  .body {
    padding-top: 1rem;
  }
</style>

<div class="collapsible item">
  <div class="header" on:click="{expandHandler}">
    <div>
      <i class="fas {expanded ? 'fa-chevron-down' : 'fa-chevron-right'}"></i>
    </div>
    <div class="controls">
      <slot name="controls"> </slot>
    </div>
    <div class="title">
      <slot name="head">
        Header missing
      </slot>
    </div>
  </div>
  <Collapse isOpen="{expanded}">
    <div class="body">
      <slot name="body">
        Body missing
      </slot>
    </div>
  </Collapse>
</div>
