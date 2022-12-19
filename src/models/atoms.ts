import { atom } from "jotai";
import { taskModels } from "../mock";
import { ITask } from "../types";


export const Tasks = atom<ITask[]>(taskModels);

