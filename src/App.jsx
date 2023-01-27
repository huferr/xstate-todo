import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { TodoList } from "./components/TodoList";
import { v4 as uuidv4 } from "uuid";
import { useMachine } from "@xstate/react";
import { todosMachine } from "./store/todos";

export const App = () => {
  const [state, send] = useMachine(todosMachine);

  const [newTodo, setNewTodo] = useState("");

  // Todos list
  const todos = [...state.context.todos].reverse();

  // Features
  const handleAddNewTodo = () => {
    if (!newTodo) return;
    send("ADD", { todo: { id: uuidv4(), title: newTodo } });
    setNewTodo("");
  };

  const handleEditTodo = (todo) => send("EDIT", { todo });

  const handleDeleteTodo = (todo) => send("DELETE", { todo });

  return (
    <Box
      height="100vh"
      width="100%"
      display="flex"
      flexDirection="column"
      alignItems="center"
      paddingTop={4}
    >
      <Typography fontWeight={700} variant="h5">
        XState TODO List
      </Typography>

      <Box display="flex" paddingY={4} gap={2}>
        <TextField
          placeholder="Add a TODO"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <Button variant="contained" onClick={handleAddNewTodo}>
          Create
        </Button>
      </Box>

      <TodoList
        todos={todos}
        handleEditTodo={handleEditTodo}
        handleDeleteTodo={handleDeleteTodo}
      />
    </Box>
  );
};
