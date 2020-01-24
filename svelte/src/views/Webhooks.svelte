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
      try {
        return sdk.getWebhooks();
      } catch {
        return [];
      }
    })();
    webhooks = await whPromise;
  })();

  function addWebhook() {
    const webhook = sdk.createWebhook();
    webhook.expanded = true;
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
{:then} {#each webhooks as webhook (webhook.id)}
<Webhook bind:webhook="{webhook}"></Webhook>
{/each}
<Button on:click="{addWebhook}">
  <i class="fas fa-plus"></i>
  Add Webhook
</Button>
{/await}
