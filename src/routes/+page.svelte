<script>
  import { enhance } from '$app/forms';
  import { fly, slide } from 'svelte/transition';

  export let data;
  export let form;

  /**
   * @type {number | undefined}
   */
  let number;

  let creating = false;

  let creatingApi = false;

  /**
   * @type {string[]}
   */
  let deleting = [];

  const roll = async () => {
    const response = await fetch('/roll');
    number = await response.json();
  };

  /**
   * @param {string} todoid
   * @param {boolean} done
   */
  const toggleTodoApi = async (todoid, done) => {
    await fetch(`/todo/${todoid}`, {
      method: 'PUT',
      body: JSON.stringify({ done }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  };

  /**
   * Delete a todo via API
   * @param {string} todoid - The todo id
   */
  const deleteTodoApi = async (todoid) => {
    await fetch(`/todo/${todoid}`, {
      method: 'DELETE'
    });

    data.todos = data.todos.filter((todo) => todo.id !== todoid);
  };

  /**
   * Add a todo via API
   * @param {KeyboardEvent} event - The keyboard event
   */
  const addTodoApi = async (event) => {
    if (event.key !== 'Enter') return;

    creatingApi = true;
    /**
     * @type {any}
     */
    const input = event.currentTarget;
    const description = input.value;

    const response = await fetch('/todo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ description })
    });

    creatingApi = false;

    const { id } = await response.json();
    data.todos = [...data.todos, { id, description, done: false }];

    input.value = '';
  };
</script>

<div class="centered">
  <h1>todos</h1>

  {#if form?.error}
    <p class="error">{form.error}</p>
  {/if}

  <form
    method="POST"
    action="?/create"
    use:enhance={() => {
      creating = true;

      return async ({ update }) => {
        await update();
        creating = false;
      };
    }}
  >
    <label>
      add a todo:
      <input name="description" autocomplete="off" value={form?.description ?? ''} disabled={creating} />
    </label>
  </form>

  <ul class="todos">
    {#each data.todos.filter((todo) => !deleting.includes(todo.id)) as todo (todo.id)}
      <li in:fly={{ y: 20 }} out:slide>
        <form
          action="?/delete"
          method="POST"
          use:enhance={() => {
            // optimistically, remove the todo by adding it to the  deleting list, so the UI updates!
            deleting = [...deleting, todo.id];

            return async ({ update }) => {
              await update();
              // todo is deleted on the server already, let's remove it from the deleting list
              deleting = deleting.filter((id) => id !== todo.id);
            };
          }}
        >
          <input type="hidden" name="id" value={todo.id} required />
          <span>{todo.description}</span>
          <button type="submit" class="button" aria-label="Delete Todo" />
        </form>
        <!-- Here we do it all with api -->
        <div>
          <label>
            <input
              type="checkbox"
              checked={todo.done}
              on:change={async (e) => {
                const done = e.currentTarget.checked;
                await toggleTodoApi(todo.id, done);
              }}
            />
            <button
              aria-label="Delete"
              on:click={async (e) => {
                await deleteTodoApi(todo.id);
              }}
            >
              🗑️
            </button>
          </label>
        </div>
      </li>
    {/each}
  </ul>

  {#if creating || creatingApi}
    <span class="saving">saving...</span>
  {/if}

  <button on:click={roll}>Roll The Dice</button>

  {#if number !== undefined}
    <p>you rolled a {number}</p>
  {/if}

  <hr />

  <label>
    add a todo using API:
    <input type="text" autocomplete="off" disabled={creatingApi} on:keydown={addTodoApi} />
  </label>
</div>

<style>
  .centered {
    max-width: 20em;
    margin: 0 auto;
  }

  label {
    width: 100%;
  }

  input {
    flex: 1;
  }

  span {
    flex: 1;
  }

  .button {
    border: none;
    background: url(./remove.svg) no-repeat 50% 50%;
    background-size: 1rem 1rem;
    cursor: pointer;
    height: 100%;
    aspect-ratio: 1;
    opacity: 0.5;
    transition: opacity 0.2s;
  }

  button:hover {
    opacity: 1;
  }

  .saving {
    opacity: 0.5;
  }
</style>
