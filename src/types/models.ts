import { ColumnsType } from "./enums";


export interface ITask {
  id: number,
  text: string,
  column: ColumnsType,
  color: string,
}