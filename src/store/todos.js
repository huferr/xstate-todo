import { createMachine, assign } from "xstate";

export const todosMachine = createMachine({
  id: "todos",
  predictableActionArguments: true,
  context: {
    todos: [],
  },
  on: {
    ADD: {
      actions: assign({
        todos: (context, event) => [...context.todos, event.todo],
      }),
    },
    EDIT: {
      actions: assign({
        todos: (context, event) =>
          context.todos.map((t) => {
            if (t.id !== event.todo.id) return t;

            return event.todo;
          }),
      }),
    },
    DELETE: {
      actions: assign({
        todos: (context, event) =>
          context.todos.filter((t) => t.id !== event.todo.id),
      }),
    },
  },
});