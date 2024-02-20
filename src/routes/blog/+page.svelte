<script>
	export let data;
</script>

<h1>blog</h1>

<ul>
	{#each data.summaries as post (post.title)}
		<li><a href={`/blog/${post.slug}`}>{post.title}</a></li>
	{/each}
</ul>

<style>
</style>
