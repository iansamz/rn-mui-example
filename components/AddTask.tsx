import {
  Box,
  Button,
  FormControl,
  OutlinedInput,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
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
  return (
    <Grid
      container
      spacing={2}
      columns={6}
      sx={{
        mb: (theme) => theme.spacing(2),
        display: "flex",
        alignItems: "center",
      }}
    >
      <Grid size={{ xs: 5 }}>
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
      </Grid>

      <Grid
        sx={{
          display: "flex",
          alignSelf: "center",
        }}
        size={{ xs: 1 }}
      >
        <Button
          variant={inputVal ? "contained" : "outlined"}
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
          {isEdited ? "Edit" : "Add"}
        </Button>
      </Grid>
    </Grid>
  );
};

export default AddTask;
