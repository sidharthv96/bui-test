<script>
  import Rules from "../views/Rules.svelte";
  export let webhook;
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
  let shown = true;
</script>

{#if shown}

<!-- <pre>{JSON.stringify(webhook, undefined, 2)}</pre> -->
<input bind:value="{webhook.url}" />
<input on:click="{toggleState}" type="checkbox" checked="{webhookEnabled}" />
{#if webhook.id}
<Rules {webhook}></Rules>
{/if}
<br />
<button on:click="{webhook.save()}">Save</button>
<button on:click="{webhook.remove().then(()=>shown=false)}">Delete</button>

{/if}
