/**
 *
 * This function will be invoked first, so it can pass it's return as "data"
 * for the universal load function
 */
export async function load() {
  return {
    message: 'this data came from the server',
    cool: true
  };
}
