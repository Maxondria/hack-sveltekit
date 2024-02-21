<!-- 
    Let's imagine that we need this component preloaded, eg, it has an image
    that we need rendered before, etc, we will pretend that we need to preload
    this component, in the load function in "component/+page.js", we importing it
    and returning it. 

    Because it is +page.js, it will run both on the server, and client side!
 -->
<div class="marquee">hello from green.svelte</div>

<style>
  @keyframes marquee {
    0% {
      transform: translateX(100%);
    }
    100% {
      transform: translateX(-100%);
    }
  }

  .marquee {
    white-space: nowrap;
    overflow: hidden;
    animation: marquee 5s linear infinite;
  }
</style>
