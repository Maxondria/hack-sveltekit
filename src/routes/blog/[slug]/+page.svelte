<script>
  import { message } from '$lib';

  export let data;
</script>

{#if data.post}
  <h1>{data.post.title}</h1>
  <div>{@html data.post.content}</div>
{/if}

<p>Message: {message}</p>
