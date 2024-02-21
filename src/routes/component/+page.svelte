<script>
  import { page } from '$app/stores';

  export let data;

  $: console.log({ pageData: $page.data, data, sameAsPageData: data === $page.data });
</script>

<svelte:component this={$page.data.component} />
