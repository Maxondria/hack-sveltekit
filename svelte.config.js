import adapter from '@sveltejs/adapter-auto';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    // adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
    // If your environment is not supported or you settled on a specific environment, switch out the adapter.
    // See https://kit.svelte.dev/docs/adapters for more information about adapters.
    adapter: adapter(),

    version: {
      // ideally, this should be something deterministic
      // like the output of `git rev-parse HEAD`
      name: Date.now().toString(),

      // if undefined, no polling will occur
      pollInterval: 5000
    }
  }
};

export default config;
