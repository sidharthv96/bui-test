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
import { getNotificationsContext } from "svelte-notifications";
  const { addNotification } = getNotificationsContext();
  
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

  async function saveWebhook(){
    const id = await webhook.save();
    addNotification({
      text: "Webhook Saved",
      position: "top-right",
      removeAfter: 3000,
      type: "success"
    });
    webhook.id=id;
  }

  let name = getName(webhook.id);
</script>

<style></style>

{#if shown}
<div transition:slide="{{duration: 200}}">
  <!-- <pre>{JSON.stringify(webhook, undefined, 2)}</pre> -->
  <Collapsible {expanded}>
    <div slot="controls">
      <Button on:click="{saveWebhook}"><i class="fas fa-save"></i></Button>
      <Button on:click="{webhook.remove().then(()=>shown=false)}"><i class="fas fa-trash-alt"></i></Button>
    </div>
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
      
    </div>
  </Collapsible>
</div>
{/if}
