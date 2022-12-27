import { useDrop } from "react-dnd";
import { ColumnsType, DragItem, DropTaskPayload, ItemType } from "../types";

interface UseColumnDropParams {
  column: ColumnsType,
  handleDrop: (payload: DropTaskPayload) => void
}

export const useColumnDrop = ({ column, handleDrop }: UseColumnDropParams) => {
  const [{ isOver }, dropRef] = useDrop<DragItem, void, { isOver: boolean }>({
    accept: ItemType.TASK,
    drop: (dragItem) => {

      if (!dragItem || dragItem.from === column) {
        return;
      }
      handleDrop({
        id: dragItem.id,
        from: dragItem.from
      });
    },
    collect: (monitor) => ({
      isOver: monitor.isOver()
    })

  });

  return {
    isOver,
    dropRef
  };


};