import { atom } from "jotai";
import { atomFamily, atomWithStorage } from "jotai/utils";
import { v4 as uuidv4 } from "uuid";
import { ColumColorScheme } from "../components";
import { taskModels } from "../mock";
import { ColumnsType, DropTaskPayload, ITask, SwapTaskPayload, TaskSet, UpdatePayload } from "../types";
import { LOCAL_TASKS, swap } from "../utils";

interface AddTasksProps {
  tasks: TaskSet,
  column: ColumnsType
}


const addTask = ({ tasks, column }: AddTasksProps) => {
  const columnTasks = tasks[column];
  const newColumnTask: ITask = {
    id: uuidv4(),
    text: "",
    column: column,
    color: ColumColorScheme[column].concat(".300")
  };
  return {
    ...tasks,
    [column]: [newColumnTask, ...columnTasks]
  };
};

interface UpdateTaskProps {
  tasks: ITask[];
  payload: UpdatePayload;
}

const updateTask = ({ tasks, payload }: UpdateTaskProps): ITask[] => {
  const { id, updatedTask } = payload;
  return tasks.map((task) => task.id === id ? { ...task, ...updatedTask } : task);
};


interface removeTasksProps {
  tasks: ITask[],
  id: string
}

const removeTask = ({ tasks, id }: removeTasksProps): ITask[] => tasks.filter((task) => task.id !== id);

export const TasksSet = atomWithStorage<TaskSet>(LOCAL_TASKS, taskModels);
export const tasksFamily = atomFamily((column: ColumnsType) => atom((get) => get(TasksSet)[column]));

export const setTasksFamily = atomFamily((column: ColumnsType) => atom(null, (get, set) => set(TasksSet, addTask({
  tasks: get(TasksSet),
  column: column
}))));

export const updateTaskFamily = atomFamily((column: ColumnsType) => atom(null, (
    get, set, update: UpdatePayload) => {
    set(TasksSet, (prev) => ({
      ...prev,
      [column]: updateTask({
        tasks: get(TasksSet)[column],
        payload: update
      })
    }));
  }
));
export const removeTaskFamily = atomFamily((column: ColumnsType) => atom(null,
  (get, set, id: string) => {
    set(TasksSet, (prev) => ({
      ...prev,
      [column]: removeTask({
        tasks: get(TasksSet)[column],
        id: id
      })
    }));
  }
));
export const dropTaskFrom = atomFamily((column: ColumnsType) => atom(null,
  (get, set, payload: DropTaskPayload) => {
    set(TasksSet, (prev) => {
      const { from, id } = payload;
      const movingTask = get(TasksSet)[from].find((task) => task.id === id);
      if (!movingTask) {
        return get(TasksSet);
      }

      return {
        ...prev,
        [from]: removeTask({
          tasks: get(TasksSet)[from],
          id: id
        }),
        [column]: [{ ...movingTask, column, color: ColumColorScheme[column].concat(".300") }, ...get(TasksSet)[column]]
      };

    });
  }
));

export const swapTaskFamily = atomFamily((column: ColumnsType) => atom(null,
  (get, set, payload: SwapTaskPayload) => {
    set(TasksSet, (prev) => ({
      ...prev,
      [column]: swap(get(TasksSet)[column], payload.i, payload.j)
    }));
  }));


