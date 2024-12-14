import { Alert, Box } from "@mui/material";
import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid2";
import TaskCard from "../components/TaskCard";
import AddTask from "../components/AddTask";
import { Task } from "../models/Task";
import Snackbar, { SnackbarOrigin } from "@mui/material/Snackbar";

export default function HomeScreen() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [inputVal, setInputVal] = useState<string>("");
  const [isEdited, setIsEdited] = useState(false);
  const [editedId, setEditedId] = useState<number | null>(null);

  const [snack, setSnack] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response) => response.json())
      .then((data) => setTasks(data.slice(0, 10))) // Limit to 10 tasks
      .catch((error) => console.error(error));
  }, []);

  const handleOpenSnack =
    (message: string, severity: "success" | "error" | "info" | "warning") =>
    () => {
      setSnack({ message, open: true, severity });
    };

  const handleCloseSnack = () => {
    setSnack({ ...snack, open: false });
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputVal(e.target.value);
  };

  const handleClick = () => {
    if (!isEdited) {
      setTasks([
        ...tasks,
        { title: inputVal, completed: false, id: new Date().getTime() },
      ]);
    } else {
      setTasks([
        ...tasks,
        {
          title: inputVal,
          completed: false,
          id: editedId || new Date().getTime(),
        },
      ]);
    }
    setInputVal("");
    handleOpenSnack(
      `Task ${isEdited ? "edited" : "added"} successfully`,
      "success"
    )();
    setIsEdited(false);
  };

  const onDelete = (id: number) => {
    const newTasks = tasks.filter((todo) => todo.id !== id);
    setTasks(newTasks);
    handleOpenSnack("Task deleted successfully", "error")();
  };

  const handleDone = (id: number) => {
    const updated = tasks.map((task) => {
      if (task.id === id) {
        task.completed = !task.completed;
      }
      return task;
    });
    setTasks(updated);
    handleOpenSnack("Task updated successfully", "success")();
  };

  const handleEdit = (id: number) => {
    const newTasks = tasks.filter((task) => task.id !== id);
    const editVal = tasks.find((task) => task.id === id);
    if (!editVal) return;
    setEditedId(editVal.id);
    setInputVal(editVal.title);
    setTasks(newTasks);
    setIsEdited(true);
  };

  return (
    <Layout>
      <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
        <AddTask
          inputVal={inputVal}
          onChange={onChange}
          handleClick={handleClick}
          isEdited={isEdited}
        />
        <Grid
          container
          spacing={2}
          columns={12}
          sx={{ mb: (theme) => theme.spacing(2) }}
        >
          {tasks.map((task, index) => (
            <Grid key={index} size={{ xs: 12, sm: 6, lg: 3 }}>
              <TaskCard
                task={task}
                handleDone={handleDone}
                onDelete={onDelete}
                handleEdit={handleEdit}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
      <Snackbar
        open={snack.open}
        autoHideDuration={2000}
        onClose={handleCloseSnack}
        // message={snack.message}
        key={snack.message + new Date().getTime()}
      >
        <Alert
          onClose={handleCloseSnack}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snack.message}
        </Alert>
      </Snackbar>
    </Layout>
  );
}
