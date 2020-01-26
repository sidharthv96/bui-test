<script>
  import { getSDK } from "../store.js";
  import Webhook from "../components/Webhook.svelte";
  import { Button } from "sveltestrap";
  import { Spinner } from "sveltestrap";

  let webhooks = [];
  let sdk;
  let whPromise;

  (async () => {
    sdk = await getSDK();
    whPromise = (async () => {
      let hooks;
      try {
        hooks = await sdk.getWebhooks();
      } catch (e) {
        hooks = [];
      }
      return hooks;
    })();
    webhooks = await whPromise;
  })();

  function addWebhook() {
    const webhook = sdk.createWebhook();
    webhook.expanded = true;
    webhook.state = "enabled";
    webhooks = [...webhooks, webhook];
  }
</script>

<style>
  .center {
    position: absolute;
    left: 50vw;
    top: 50vh;
  }
</style>

{#await whPromise}
<div class="center">
  <Spinner></Spinner>
</div>
{:then} {#each webhooks as webhook}
<Webhook bind:webhook="{webhook}"></Webhook>
{/each}
<Button on:click="{addWebhook}">
  <i class="fas fa-plus"></i>
  Add Webhook
</Button>
{/await}
