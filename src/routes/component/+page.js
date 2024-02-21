import component from './green.svelte';

export function load() {
  return {
    color: 'green',
    /**
     * The 'component' key is included here because the load function in this file ("+page.js")
     * runs on both the server and client-side navigation, making it universal.
     * If this code were written in "+page.server.js", it would not be serializable (JSON), which could lead to errors.
     */
    component
  };
}
