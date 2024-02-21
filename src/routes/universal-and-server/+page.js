/**
 * This load function will be called on the server and the client, and since
 * we have "+page.server.js", it will run after the server load function
 * which is why we can use the data from the server load function here
 */
export async function load({ data }) {
  const module = data.cool ? await import('./Cool.svelte') : await import('./Boring.svelte');

  return {
    component: module.default,
    message: data.message
  };
}
