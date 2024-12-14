import React from "react";
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import TaskCard from "@/components/TaskCard";
import AddTask from "@/components/AddTask";
import { useSnack } from "@/providers/SnackProvider";
import { useTasks } from "@/providers/TaskProvider";

export default function HomeScreen() {
  const {
    tasks,
    inputVal,
    isEdited,
    setInputVal,
    handleClick,
    onDelete,
    handleDone,
    handleEdit,
  } = useTasks();

  const { openSnack } = useSnack();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputVal(e.target.value);
  };

  return (
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
      <AddTask
        inputVal={inputVal}
        onChange={onChange}
        handleClick={() => {
          handleClick();
          openSnack(
            "success",
            `Task ${isEdited ? "edited" : "added"} successfully`
          );
        }}
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
              handleDone={(id) => {
                handleDone(id);
                openSnack("success", "Task updated successfully");
              }}
              onDelete={(id) => {
                onDelete(id);
                openSnack("error", "Task deleted successfully");
              }}
              handleEdit={handleEdit}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
