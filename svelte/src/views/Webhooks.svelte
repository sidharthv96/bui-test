<script>
  import { getSDK } from "../store.js";
  import Webhook from "../components/Webhook.svelte";

  let webhooks = [];
  let sdk;

  (async () => {
    sdk = await getSDK();
    webhooks = await sdk.getWebhooks();
  })();

  function addWebhook() {
    webhooks = [...webhooks, sdk.createWebhook()];
  }
</script>

{#each webhooks as webhook (webhook.id)}
<Webhook bind:webhook="{webhook}"></Webhook>
{/each}
<br />
<button on:click="{addWebhook}">Add Webhook</button>
