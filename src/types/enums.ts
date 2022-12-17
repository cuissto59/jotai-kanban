export const Columns = {
  TODO: "Todo",
  IN_PROGRESS: "In Progress",
  BLOCKED: "Blocked",
  COMPLETED: "Completed"
};
export type ColumnsType = typeof Columns[keyof typeof Columns];