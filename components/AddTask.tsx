import {
  Box,
  Button,
  FormControl,
  IconButton,
  OutlinedInput,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { GridAddIcon } from "@mui/x-data-grid";
import React from "react";

interface AddTaskProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleClick: () => void;
  inputVal: string;
  isEdited: boolean;
}

const AddTask: React.FC<AddTaskProps> = ({
  onChange,
  handleClick,
  inputVal,
  isEdited,
}) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const btnText = isEdited ? "Edit" : "Add";
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        mb: theme.spacing(2),
        gap: theme.spacing(2),
      }}
    >
      <FormControl fullWidth variant="outlined">
        <OutlinedInput
          size="small"
          id="add_task"
          placeholder="Task..."
          sx={{ flexGrow: 1 }}
          inputProps={{
            "aria-label": "add_task",
          }}
          value={inputVal}
          onChange={onChange}
        />
      </FormControl>
      {isSmallScreen ? (
        <IconButton onClick={handleClick} disabled={!inputVal}>
          <GridAddIcon />
        </IconButton>
      ) : (
        <Button
          variant="outlined"
          size="small"
          color="primary"
          startIcon={<GridAddIcon />}
          fullWidth={isSmallScreen}
          onClick={handleClick}
          disabled={!inputVal}
          sx={{
            color: "primary.main",
          }}
        >
          {btnText}
        </Button>
      )}
    </Box>
  );
};

export default AddTask;
