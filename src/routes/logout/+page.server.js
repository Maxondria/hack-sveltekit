import { redirect } from '@sveltejs/kit';

export const actions = {
  default: ({ cookies }) => {
    cookies.delete('loggedin', { path: '/' });
    throw redirect(303, '/');
  }
};
