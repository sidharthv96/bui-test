<script>
  import Filter from "./Filter.svelte";
  import Collapsible from "../templates/Collapsible.svelte";
  import { getName, setName } from "../store.js";
  import { slide } from "svelte/transition";
  import { Button, Form, FormGroup, FormText, Input, Label } from "sveltestrap";
  import { getNewFilter } from "../util.js";
  import { tick, afterUpdate } from "svelte";
  import { summarizeRule } from "../summary.js";
  import { getNotificationsContext } from "svelte-notifications";
  const { addNotification } = getNotificationsContext();

  export let rule;
  const expanded = rule.expanded || false;
  let shown = true;
  const events = [
    {
      id: "mercury.helios.ui55.event.incident-created",
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
      id: "mercury.helios.ui55.event.incident-updated",
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
    ruleSummary = summarizeRule(rule);
  }

  async function saveRule() {
    await rule.save();
    addNotification({
      text: "Rule Saved",
      position: "top-right",
      removeAfter: 3000,
      type: "success"
    });
  }
</script>

{#if shown}

<div transition:slide="{{duration: 200}}">
  <Collapsible {expanded}>
    <div slot="controls">
      <Button on:click="{saveRule}"><i class="fas fa-save"></i></Button>
      <Button on:click="{rule.remove().then(()=>shown=false)}"
        ><i class="fas fa-trash-alt"></i
      ></Button>
    </div>
    <div class="name" slot="head">
      <span>{name}</span>
    </div>
    <div slot="body">
      <div class="row">
        <div class="col-md-7">
          <div class="row">
            <div class="col">
              <FormGroup>
                <Label for="name">Name</Label>
                <Input
                  name="name"
                  bind:value="{name}"
                  on:keyup="{() => setName(rule.id, name)}"
                />
              </FormGroup>
            </div>
            <div class="col">
              <FormGroup>
                <Label for="eventID">Event</Label><br />
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
              </FormGroup>
            </div>
          </div>
          <Collapsible expanded="true">
            <div slot="head">
              Filter
            </div>
            <div slot="body">
              <Filter
                bind:filter="{rule.filter}"
                on:remove="{removeFilter}"
                {fields}
              ></Filter>
            </div>
          </Collapsible>
        </div>
        <div class="col-md-5">
          <Collapsible expanded="true">
            <div slot="head">
              Summary
            </div>
            <div slot="body">
              {@html summarizeRule(rule)}
            </div>
          </Collapsible>
          <!-- <pre style="display: block;">
{JSON.stringify(rule, undefined, 2)}
</pre> -->
        </div>
      </div>
    </div>
  </Collapsible>
</div>
{/if}
