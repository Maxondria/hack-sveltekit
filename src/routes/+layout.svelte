<script>
  import { navigating, page, updated } from '$app/stores';
  const colors = ['ff3e00', '676779', '42b4ff', 'invalid'];
</script>

<!-- 
  As this is the top-level layout, we always have access to the current page data through the $page store.
  The same data is also available in the "$page" store in the current page component.
  While setting the export "let data" in the route +page.svelte files is not required, 
  it does enhance code completion and type checking.

  For example, to render the component returned from the load function of the "component" route, we can use:

  {#if $page.data.component}
    <svelte:component this={$page.data.component} />
  {/if}
 -->

<nav>
  <a href="/" aria-current={$page.url.pathname === '/'}>home</a>
  <a href="/blog" aria-current={$page.url.pathname === '/blog'}>blog</a>
  <a href="/about" aria-current={$page.url.pathname === '/about'}>about</a>
  <a href="/account" aria-current={$page.url.pathname === '/account'}>account</a>
  <a href="/app" aria-current={$page.url.pathname === '/app'}>app</a>
  <a href="/component" aria-current={$page.url.pathname === '/component'}>component</a>
  <a href="/universal-and-server" aria-current={$page.url.pathname === '/universal-and-server'}>universal-and-server</a>
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
