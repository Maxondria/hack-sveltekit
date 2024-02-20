const db = new Map();

/**
 * @typedef {Object} Todo
 * @property {string} id - The ID of the todo.
 * @property {string} description - The description of the todo.
 * @property {boolean} done - Indicates if the todo is done.
 */

/**
 * Retrieves todos for a specific user.
 * @param {string} userid - The user ID.
 * @returns {Array<Todo>} The todos for the user.
 */
export function getTodos(userid) {
	if (!db.get(userid)) {
		db.set(userid, [
			{
				id: crypto.randomUUID(),
				description: 'Learn SvelteKit',
				done: false
			}
		]);
	}

	return db.get(userid);
}

/**
 * Creates a new todo for a user.
 * @param {string} userid - The user ID.
 * @param {string} description - The description of the todo.
 */
/**
 * Creates a new todo for a user.
 * @param {string} userid - The user ID.
 * @param {string} description - The description of the todo.
 * @returns {Todo} The newly created todo object.
 */
export function createTodo(userid, description) {
	const todos = db.get(userid);

	if (!userid || !description) {
		throw new Error('User ID and description are required.');
	}
	const existingTodos = getTodos(userid);
	const isDuplicate = existingTodos.some((todo) => todo.description === description);

	if (isDuplicate) {
		throw new Error('Todos must be unique.');
	}

	const todo = {
		id: crypto.randomUUID(),
		description,
		done: false
	};

	todos.push(todo);

	return todo;
}

/**
 * Deletes a todo for a user.
 * @param {string} userid - The user ID.
 * @param {string} todoid - The ID of the todo to delete.
 */
export function deleteTodo(userid, todoid) {
	if (!userid || !todoid) {
		throw new Error('User ID and todo ID are required.');
	}
	/**
	 * @type {Array<Todo>}
	 */
	const todos = db.get(userid);

	const index = todos.findIndex((todo) => todo.id === todoid);

	if (index !== -1) {
		todos.splice(index, 1);
	}
}

/**
 * Marks a todo as completed for a user.
 * @param {string} userid - The user ID.
 * @param {string} todoid - The ID of the todo to mark as completed.
 * @param {boolean} done - Indicates if the todo is done.
 */
export function toggleTodo(userid, todoid, done) {
	/**
	 * @type {Array<Todo>}
	 */
	const todos = db.get(userid);

	const todo = todos.find((todo) => todo.id === todoid);

	if (todo) {
		todo.done = done;
	}
}
