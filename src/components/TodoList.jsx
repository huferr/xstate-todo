import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";

export const TodoList = ({ todos, handleEditTodo, handleDeleteTodo }) => {
  const [editedValue, setEditedValue] = useState("");
  const [todoIdEdit, setTodoIdEdit] = useState("");

  const hasTodos = todos?.length > 0;

  const handleClickToEdit = (todo) => {
    setTodoIdEdit(todo.id);
    setEditedValue(todo.title);
  };

  const handleSaveEdit = (todo) => {
    handleEditTodo({ ...todo, title: editedValue });
    setTodoIdEdit("");
  };

  if (!hasTodos) {
    return <Box>You have no TODO. Create one!</Box>;
  }

  return (
    <Box width={500} display="flex" flexDirection="column" gap={1}>
      {todos.map((t) => (
        <Box
          key={t.id}
          border="1px solid #b4b4b4"
          borderRadius={1}
          padding={2}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          gap={1}
        >
          {todoIdEdit && todoIdEdit === t.id ? (
            <TextField
              fullWidth
              autoFocus
              value={editedValue}
              onChange={(e) => setEditedValue(e.target.value)}
            />
          ) : (
            <Typography>{t.title}</Typography>
          )}

          <Box display="flex" gap={1}>
            {todoIdEdit && todoIdEdit === t.id ? (
              <>
                <Button variant="contained" onClick={() => handleSaveEdit(t)}>
                  Edit
                </Button>

                <Button
                  variant="contained"
                  color="error"
                  onClick={() => setTodoIdEdit("")}
                >
                  Cancel
                </Button>
              </>
            ) : (
              <>
                <IconButton onClick={() => handleClickToEdit(t)}>
                  <EditIcon color="primary" />
                </IconButton>
                <IconButton onClick={() => handleDeleteTodo(t)}>
                  <DeleteIcon color="error" />
                </IconButton>
              </>
            )}
          </Box>
        </Box>
      ))}
    </Box>
  );
};
