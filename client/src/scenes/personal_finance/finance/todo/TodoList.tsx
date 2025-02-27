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
} from "../../../../state/api";
import { CustomTheme } from "../../../../theme";
import { useSelector } from "react-redux";
import { RootState } from "../../../../state/store";

interface Task {
  id: string;
  isChecked: boolean;
  description: string;
  type: string;
  user: {
    id: string;
  };
}

const TodoList = () => {
  const theme = useTheme<CustomTheme>();
  const { data } = useGetTodoQuery({});
  const persisted = useSelector((state: RootState) => state.persisted);
  const { user } = persisted;
  const id = user ? user.id : "";
  const filteredData =
    data && id
      ? data.filter(
          (task: Task) => task.type === "personal" && task.user.id === id
        )
      : [];
  const [deleteTask] = useDeleteTodoMutation();
  const [updateTask] = useUpdateTodoMutation();

  const handleToggle = async (task: Task) => {
    const updatedTask = { ...task, isChecked: !task.isChecked };
    await updateTask({ id: task.id, data: updatedTask });
  };

  const handleDelete = async (taskId: string) => {
    await deleteTask(taskId);
  };

  return (
    <List
      sx={{
        width: "100%",
        backgroundColor: theme.palette.background.paper,
      }}
    >
      {filteredData && filteredData.length > 0 ? (
        filteredData.map((task: Task) => (
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
