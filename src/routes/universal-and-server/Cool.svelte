<script>
  /**
   * @type {string}
   */
  export let message;
</script>

<div class="marquee">
  <h1>{message}</h1>
</div>

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
    font-family: 'Comic Sans MS';
    color: #e60073;
    white-space: nowrap;
    overflow: hidden;
    animation: marquee 5s linear infinite;
  }
</style>
