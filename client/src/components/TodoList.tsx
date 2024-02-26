import { useState } from "react";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Checkbox,
  IconButton,
  useTheme,
  Box,
  Divider,
} from "@mui/material";

import { DeleteOutlineOutlined } from "@mui/icons-material";

type Props = {};

const todoList = [
  { id: 1, description: "Buy groceries", isChecked: false },
  { id: 2, description: "Complete work assignment", isChecked: true },
  { id: 3, description: "Go for a run", isChecked: false },
  { id: 4, description: "Read a book", isChecked: true },
];

const TodoList = () => {
  const theme = useTheme();
  const [checked, setChecked] = useState(false);

  const handleToggle = (index: number) => () => {
    const isChecked = todoList[index].isChecked;
    setChecked(!isChecked);
  };
  return (
    <List
      sx={{
        width: "100%",
        backgroundColor: theme.palette.background.paper,
      }}
    >
      {todoList.map((task) => (
        <ListItem
        
          key={task.id}
          secondaryAction={
            <IconButton edge="end" aria-label="comments">
              <DeleteOutlineOutlined />
            </IconButton>
          }
          disablePadding
        >
          <ListItemButton
            onClick={handleToggle(task.id)}
            dense
          >
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={task.isChecked}
                // onChange={handleToggle(task.id)}
                tabIndex={-1}
                disableRipple
                inputProps={{ "aria-labelledby": task.description }}
              />
            </ListItemIcon>
            <ListItemText id={`taskID ${task.id}`} primary={task.description} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

export default TodoList;
