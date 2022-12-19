import { DeleteIcon } from "@chakra-ui/icons";
import { Box, IconButton, Textarea } from "@chakra-ui/react";
import { ITask } from "../../types";

export interface TaskProps {
  index: number;
  task: ITask;
}

export const Task = ({ index, task }: TaskProps) => {
  return (
    <Box
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
      bgColor={task.color}>
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
      />
      <Textarea
        value={task.text}
        fontWeight="semibold"
        cursor="inherit"
        border="none"
        p={0}
        resize="none"
        minH={70}
        maxH={200}
        focusBorderColor="none"
      />
    </Box>
  );
};
