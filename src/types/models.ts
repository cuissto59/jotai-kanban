import { ColumnsType } from "./enums";


export interface ITask {
  id: string,
  text: string,
  column: ColumnsType,
  color: string,
}

export type TaskSet = {
  [key in ColumnsType]: ITask[];
}


export interface UpdatePayload {
  id: string,
  updatedTask: Omit<Partial<ITask>, "id">
}


