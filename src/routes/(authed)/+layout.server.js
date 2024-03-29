import { redirect } from '@sveltejs/kit';

export function load({ cookies, url }) {
  if (!cookies.get('loggedin')) {
    throw redirect(303, `/login?redirectTo=${url.pathname}`);
  }
}
