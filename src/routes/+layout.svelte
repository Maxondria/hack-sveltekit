<script>
  import { navigating, page, updated } from '$app/stores';
</script>

<nav>
  <a href="/" aria-current={$page.url.pathname === '/'}>home</a>
  <a href="/blog" aria-current={$page.url.pathname === '/blog'}>blog</a>
</nav>

{#if $navigating}
  <p>Navigating to {$navigating.to?.url.pathname}</p>
{/if}

{#if $updated}
  <div class="toast">
    <p>A new version of the app is available</p>

    <button on:click={() => location.reload()}>Reload</button>
  </div>
{/if}

<slot />
