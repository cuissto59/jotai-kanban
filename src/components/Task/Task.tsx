import { DeleteIcon } from "@chakra-ui/icons";
import { Box, IconButton } from "@chakra-ui/react";
import React, { memo, useCallback } from "react";
import { useTaskDragAndDrop } from "../../hooks";
import { ITask, UpdatePayload } from "../../types";
import { AutoResizeTextArea } from "../AutoResizeTextArea";

export interface TaskProps {
  index: number;
  task: ITask;

  onUpdate: (payload: UpdatePayload) => void;
  onRemove: (id: string) => void;

  onDropHover: (i: number, j: number) => void;
}

export const Task = memo(({
                            index,
                            task,
                            onUpdate: handleUpdate,
                            onRemove: handleRemove,
                            onDropHover: handleDropHover
                          }: TaskProps) => {

  const { ref, isDragging } = useTaskDragAndDrop<HTMLDivElement>({
    task,
    index,
    handleDropHover
  });
  const handleTitleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newTitle = e.target.value;
    handleUpdate({
      id: task.id,
      updatedTask: { ...task, text: newTitle }
    });
  }, []);
  const handleDeleteClick = useCallback(() => {
    handleRemove(task.id);
  }, [task.id]);
  return (
    <Box
      ref={ref}
      as="div"
      role="group"
      position="relative"
      rounded="lg"
      pl={3}
      pr={7}
      pt={3}
      pb={1}
      boxShadow="xl"
      cursor="grab"
      bgColor={task.color}
      flexGrow={0}
      flexShrink={0}
      opacity={isDragging ? 0.5 : 1}
    >
      <IconButton
        aria-label={"delete-task"}
        position="absolute"
        top={0}
        right={0}
        zIndex={100}
        size="md"
        colorScheme="solid"
        color="gray.700"
        icon={<DeleteIcon />}
        opacity={0}
        _groupHover={{
          opacity: 1
        }}
        onClick={handleDeleteClick}
      />
      <AutoResizeTextArea
        value={task.text}
        fontWeight="semibold"
        cursor="inherit"
        border="none"
        p={0}
        resize="none"
        minH={70}
        maxH={200}
        focusBorderColor="none"
        onChange={handleTitleChange}
      />
    </Box>
  );
});
