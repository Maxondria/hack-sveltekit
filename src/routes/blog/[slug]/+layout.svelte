<script>
  export let data;
</script>

<div class="layout">
  <main>
    <slot />
  </main>

  <aside>
    <h2>More posts</h2>
    <ul>
      {#each data.summaries as post (post.slug)}
        <li>
          <a href={`/blog/${post.slug}`}>{post.title}</a>
        </li>
      {/each}
    </ul>
  </aside>
</div>

<style>
  @media (min-width: 640px) {
    .layout {
      display: grid;
      gap: 2em;
      grid-template-columns: 1fr 16em;
    }
  }
</style>
