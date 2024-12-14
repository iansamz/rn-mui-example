import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";
import { Task } from "@/models/Task";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";

interface TaskCardProps {
  task: Task;
  handleDone: (id: number) => void;
  onDelete: (id: number) => void;
  handleEdit: (id: number) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({
  task,
  handleDone,
  onDelete,
  handleEdit,
}) => {
  const [completed, setCompleted] = React.useState(task.completed);

  const onDone = (complete: boolean) => {
    handleDone(task.id);
    setCompleted(complete);
  };
  return (
    <Card
      variant="outlined"
      sx={{
        height: "100%",
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardContent
        sx={{
          flexGrow: 1,
        }}
      >
        <Box>
          <Typography
            component="h2"
            variant="subtitle2"
            gutterBottom
            sx={{
              fontWeight: "600",
              textDecoration: completed ? "line-through" : "none",
            }}
          >
            {task.title}
          </Typography>
        </Box>
      </CardContent>
      <CardActions
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignSelf: "flex-end",
        }}
      >
        <Button
          variant={completed ? "contained" : "outlined"}
          size="small"
          color={completed ? "success" : "primary"}
          startIcon={completed ? <CheckIcon /> : null}
          onClick={() => onDone(!completed)}
          sx={{
            color: completed ? "white" : "inherit",
          }}
        >
          {completed ? "Completed" : "Mark as complete"}
        </Button>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: 1,
          }}
        >
          <IconButton size="small" onClick={() => handleEdit(task.id)}>
            <EditIcon />
          </IconButton>
          <IconButton size="small" onClick={() => onDelete(task.id)}>
            <DeleteIcon />
          </IconButton>
        </Box>
      </CardActions>
    </Card>
  );
};

export default TaskCard;
