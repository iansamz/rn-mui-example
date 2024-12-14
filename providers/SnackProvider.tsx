import React, { createContext, useContext, useState, ReactNode } from "react";
import { Snackbar, Alert } from "@mui/material";

export type SnackContextType = {
  openSnack: (
    severity: "success" | "error" | "info" | "warning",
    message: string
  ) => void;
};

export const SnackContext = createContext<SnackContextType | undefined>(
  undefined
);

export const SnackProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [snack, setSnack] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error" | "info" | "warning";
  }>({
    open: false,
    message: "",
    severity: "success",
  });

  const openSnack = (
    severity: "success" | "error" | "info" | "warning",
    message: string
  ) => {
    setSnack({ message, open: true, severity });
  };

  const handleCloseSnack = () => {
    setSnack({ ...snack, open: false });
  };

  return (
    <SnackContext.Provider value={{ openSnack }}>
      {children}
      <Snackbar
        open={snack.open}
        autoHideDuration={2000}
        onClose={handleCloseSnack}
        key={snack.message + new Date().getTime()}
      >
        <Alert
          onClose={handleCloseSnack}
          severity={snack.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snack.message}
        </Alert>
      </Snackbar>
    </SnackContext.Provider>
  );
};

export const useSnack = (): SnackContextType => {
  const context = useContext(SnackContext);
  if (!context) {
    throw new Error("useSnack must be used within a SnackProvider");
  }
  return context;
};
