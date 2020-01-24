<script>
  import Rules from "../views/Rules.svelte";
  import Collapsible from "../templates/Collapsible.svelte";
  import { getName, setName } from "../store.js";
  import { slide } from "svelte/transition";
  import {
    Button,
    CustomInput,
    Input,
    FormGroup,
    Label,
    Row,
    Col
  } from "sveltestrap";

  export let webhook;

  const expanded = webhook.expanded || false;
  let shown = true;

  let webhookEnabled = webhook.state === "enabled";

  function toggleState() {
    if (webhook.state !== "enabled") {
      webhook.state = "enabled";
      webhookEnabled = true;
    } else {
      webhook.state = "disabled";
      webhookEnabled = false;
    }
  }

  let name = getName(webhook.id);
</script>

<style></style>

{#if shown}
<div transition:slide="{{duration: 200}}">
  <!-- <pre>{JSON.stringify(webhook, undefined, 2)}</pre> -->
  <Collapsible {expanded}>
    <div class="name" slot="head">
      <span>{name}</span>
    </div>
    <div class="body" slot="body">
        <Row>
            <Col sm="4">
                <FormGroup>
                    <Label for="name" inline>Name</Label>
                    <Input
                            name="name"
                            bind:value="{name}"
                            on:keyup="{() => setName(webhook.id, name)}"
                            inline
                    />
                </FormGroup>
            </Col>
            <Col sm="6">
                <FormGroup>
                    <Label for="url">Endpoint</Label>
                    <Input type="url" name="url" bind:value="{webhook.url}"/>
                </FormGroup>

            </Col>
            <Col sm="2">
                <Label for="test">{webhook.state}</Label>

                <div class="custom-control custom-switch" on:click="{toggleState}">
                    <input
                            class="custom-control-input"
                            type="checkbox"
                            name="whState"
                            checked="{webhookEnabled}"
                    />

                    <label class="custom-control-label" for="whState"
                    ></label
                    >
                </div>
            </Col>

        </Row>

      {#if webhook.id}
      <Rules {webhook}></Rules>
      {/if}
      <Button on:click="{webhook.save()}">
        <i class="fas fa-save"></i> Save Webhook
      </Button>
      <Button on:click="{webhook.remove().then(()=>shown=false)}">
        <i class="fas fa-trash-alt"></i>
        Delete Webhook
      </Button>
    </div>
  </Collapsible>
</div>
{/if}
