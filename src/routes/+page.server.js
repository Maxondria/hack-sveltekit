import * as db from '$lib/server/database';
import { fail } from '@sveltejs/kit';

export function load({ cookies }) {
  let id = cookies.get('userid');

  if (!id) {
    id = crypto.randomUUID();
    cookies.set('userid', id, { path: '/' });
  }

  return { todos: db.getTodos(id) };
}

export const actions = {
  create: async ({ request, cookies }) => {
    // simulate slow network
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const data = await request.formData();

    const userid = cookies.get('userid') || '';
    const description = data.get('description') || '';

    try {
      db.createTodo(userid, description.toString());
    } catch (error) {
      return fail(422, {
        description: description.toString(),
        // @ts-ignore
        error: error.message
      });
    }
  },
  delete: async ({ request, cookies }) => {
    // simulate slow network
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const data = await request.formData();

    const userid = cookies.get('userid') || '';
    /**
     * @type {any}
     */
    const todoid = data.get('id');

    try {
      db.deleteTodo(userid, todoid);
    } catch (error) {
      return fail(422, {
        todoid,
        // @ts-ignore
        error: error.message
      });
    }
  }
};
