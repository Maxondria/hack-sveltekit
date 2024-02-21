<script>
  import { navigating, page, updated } from '$app/stores';

  const colors = ['ff3e00', '676779', '42b4ff', 'invalid'];
</script>

<nav>
  <a href="/" aria-current={$page.url.pathname === '/'}>home</a>
  <a href="/blog" aria-current={$page.url.pathname === '/blog'}>blog</a>
  <a href="/about" aria-current={$page.url.pathname === '/about'}>about</a>
  <a href="/account" aria-current={$page.url.pathname === '/account'}>account</a>
  <a href="/app" aria-current={$page.url.pathname === '/app'}>app</a>
</nav>

<h1>Color URLs</h1>

<nav class="color">
  {#each colors as color}
    <a href="/colors/{color}" style="--color: #{color}">#{color}</a>
  {/each}
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

<style>
  .color a {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .color a::before {
    content: '';
    width: 2em;
    height: 2em;
    background: var(--color);
  }
</style>
