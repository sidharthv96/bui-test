<script>
  import Filter from "./Filter.svelte";
  import Collapsible from "../templates/Collapsible.svelte";
  import { getName, setName } from "../store.js";
  import { slide } from "svelte/transition";
  import { Button, Form, FormGroup, FormText, Input, Label } from "sveltestrap";
  import { getNewFilter } from "../util.js";
  import { tick } from "svelte";

  export let rule;
  const expanded = rule.expanded || false;
  let shown = true;
  const events = [
    {
      id: "mercury.helios.ui55.event.chat-created",
      name: "Incident Create",
      fields: {
        severity: {
          type: "fixed",
          values: ["Low", "Medium", "High"]
        },
        productID: {
          type: "custom"
        }
      }
    },
    {
      id: "mercury.helios.ui55.event.chat-updated",
      name: "Incident Update",
      fields: {
        severity: {
          type: "fixed",
          values: ["Low", "Medium", "High"]
        },
        status: {
          type: "fixed",
          values: ["Resolved", "Escalated", "Unresolved"]
        }
      }
    }
  ];
  $: fields = events.filter(e => e.id === rule.event_id)[0].fields;

  if (!rule.event_id) {
    rule.event_id = events[0].id;
  }
  let name = getName(rule.id);

  let warned = false;
  warned = true;

  function eventFocusHandler() {
    console.log(rule.event_id);
    if (!warned) {
      window.confirm(
        "This will remove uncompatible Fields from the Filter. Do you want to continue?"
      );
      warned = true;
    }
  }

  async function changeEvent(e) {
    console.log(`C: ${rule.event_id}`);
  }

  async function removeFilter() {
    await tick();
    rule.filter = getNewFilter();
  }
</script>

{#if shown}

<div transition:slide="{{duration: 200}}">
  <pre>{JSON.stringify(rule, undefined, 2)}</pre>
  <Collapsible {expanded}>
    <div class="name" slot="head">
      <span>{name}</span>
    </div>
    <div slot="body">
      <FormGroup>
        <Label for="name">Name</Label>
        <Input
          name="name"
          bind:value="{name}"
          on:keyup="{() => setName(rule.id, name)}"
        />
      </FormGroup>
      <div class="preference">
        <label for="eventID">Event </label>
        <select
          name="eventID"
          bind:value="{rule.event_id}"
          on:change="{changeEvent}"
          on:focus="{eventFocusHandler}"
        >
          {#each events as event (event.id)}
          <option value="{event.id}">
            {event.name}
          </option>
          {/each}
        </select>
      </div>
      Filter
      <hr />
      <Filter
        bind:filter="{rule.filter}"
        on:remove="{removeFilter}"
        {fields}
      ></Filter>
      <Button on:click="{rule.save()}"
        ><i class="fas fa-save"></i> Save Rule</Button
      >
      <Button on:click="{rule.remove().then(()=>shown=false)}">
        <i class="fas fa-trash-alt"></i> Delete Rule
      </Button>
    </div>
  </Collapsible>
</div>
{/if}
