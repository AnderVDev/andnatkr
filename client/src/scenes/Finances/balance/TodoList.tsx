import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Checkbox,
  IconButton,
  useTheme,
} from "@mui/material";
import { DeleteOutlineOutlined } from "@mui/icons-material";
import {
  useDeleteTodoMutation,
  useGetTodoQuery,
  useUpdateTodoMutation,
} from "../../../state/api";

const TodoList = () => {
  const theme = useTheme();
  const { data, isLoading } = useGetTodoQuery({});
  const filteredData = data
    ? data.filter((task) => task.type === "finances")
    : [];
  const [deleteTask] = useDeleteTodoMutation();
  const [updateTask] = useUpdateTodoMutation();

  const handleToggle = async (task) => {
    console.log(task);
    const updatedTask = { ...task, isChecked: !task.isChecked };
    updateTask({ id: task.id, data: updatedTask });
  };

  const handleDelete = async (taskId) => {
    deleteTask(taskId);
  };

  return (
    <List
      sx={{
        width: "100%",
        backgroundColor: theme.palette.background.paper,
      }}
    >
      {filteredData && filteredData.length > 0 ? (
        filteredData.map((task) => (
          <ListItem
            key={task.id}
            secondaryAction={
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => handleDelete(task.id)}
              >
                <DeleteOutlineOutlined />
              </IconButton>
            }
            disablePadding
          >
            <ListItemButton onClick={() => handleToggle(task)} dense>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={task.isChecked}
                  disableRipple
                  inputProps={{ "aria-labelledby": `taskID ${task.id}` }}
                />
              </ListItemIcon>
              <ListItemText
                id={`taskID ${task.id}`}
                primary={task.description}
              />
            </ListItemButton>
          </ListItem>
        ))
      ) : (
        <ListItem>
          <ListItemText primary="No tasks found" />
        </ListItem>
      )}
    </List>
  );
};

export default TodoList;
