import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { Task } from "../models/Task";

type TaskContextType = {
  tasks: Task[];
  inputVal: string;
  isEdited: boolean;
  editedId: number | null;
  setInputVal: (val: string) => void;
  handleClick: () => void;
  onDelete: (id: number) => void;
  handleDone: (id: number) => void;
  handleEdit: (id: number) => void;
};

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState<{
    tasks: Task[];
    inputVal: string;
    isEdited: boolean;
    editedId: number | null;
  }>({
    tasks: [],
    inputVal: "",
    isEdited: false,
    editedId: null,
  });

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response) => response.json())
      .then((data) =>
        setState((prevState) => ({ ...prevState, tasks: data.slice(0, 10) }))
      ) // Limit to 10 tasks
      .catch((error) => console.error(error));
  }, []);

  const setInputVal = (val: string) => {
    setState((prevState) => ({ ...prevState, inputVal: val }));
  };

  const handleClick = () => {
    if (!state.isEdited) {
      setState((prevState) => ({
        ...prevState,
        tasks: [
          ...prevState.tasks,
          { title: state.inputVal, completed: false, id: new Date().getTime() },
        ],
        inputVal: "",
        isEdited: false,
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        tasks: [
          ...prevState.tasks,
          {
            title: state.inputVal,
            completed: false,
            id: state.editedId || new Date().getTime(),
          },
        ],
        inputVal: "",
        isEdited: false,
      }));
    }
  };

  const onDelete = (id: number) => {
    setState((prevState) => ({
      ...prevState,
      tasks: prevState.tasks.filter((todo) => todo.id !== id),
    }));
  };

  const handleDone = (id: number) => {
    setState((prevState) => ({
      ...prevState,
      tasks: prevState.tasks.map((task) => {
        if (task.id === id) {
          task.completed = !task.completed;
        }
        return task;
      }),
    }));
  };

  const handleEdit = (id: number) => {
    const editVal = state.tasks.find((task) => task.id === id);
    if (!editVal) return;
    setState((prevState) => ({
      ...prevState,
      tasks: prevState.tasks.filter((task) => task.id !== id),
      inputVal: editVal.title,
      editedId: editVal.id,
      isEdited: true,
    }));
  };

  return (
    <TaskContext.Provider
      value={{
        tasks: state.tasks,
        inputVal: state.inputVal,
        isEdited: state.isEdited,
        editedId: state.editedId,
        setInputVal,
        handleClick,
        onDelete,
        handleDone,
        handleEdit,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = (): TaskContextType => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTasks must be used within a TaskProvider");
  }
  return context;
};
