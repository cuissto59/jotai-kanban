import { RefObject, useRef } from "react";
import { useDrag } from "react-dnd";
import { DragItem, ITask, ItemType } from "../types";

interface UseTaskDragAndDropParams {
  task: ITask,
  index: number,
}

export const useTaskDragAndDrop = <T extends HTMLElement>({ task, index }: UseTaskDragAndDropParams) => {
  const ref = useRef<T>() as RefObject<T>;
  const [{ isDragging }, drag] = useDrag<DragItem, void, { isDragging: boolean }>({
    type: ItemType.TASK,
    item: { from: task.column, id: task.id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  });

  drag(ref);

  return {
    ref,
    isDragging
  };
};