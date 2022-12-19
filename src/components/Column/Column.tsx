import { AddIcon } from "@chakra-ui/icons";
import { Badge, Box, Heading, IconButton, Stack, useColorModeValue } from "@chakra-ui/react";
import { useAtom } from "jotai";
import { Tasks } from "../../models";
import { ColumnsType } from "../../types";
import { Task } from "../Task";
import { ColumColorScheme } from "./types";

export interface ColumnProps {
  column: ColumnsType;
}

export const Column = ({ column }: ColumnProps) => {
  const [tasks] = useAtom(Tasks);

  return (
    <Box>
      <Heading fontSize="md" mb={4} letterSpacing="wide">
        <Badge
          px={2}
          py={1}
          rounded="lg"
          colorScheme={ColumColorScheme[column]}
        >
          {column}
        </Badge>
      </Heading>
      <IconButton
        size="xs"
        w="full"
        color={useColorModeValue("gray.500", "gray.400")}
        bgColor={useColorModeValue("gray.1OO", "gray.700")}
        _hover={{ bgColor: useColorModeValue("gray.200", "gray.600") }}
        py={2}
        variant="solid"
        colorScheme="black"
        icon={<AddIcon />}
        aria-label="add-task"
      />
      <Stack
        direction={{ base: "row", md: "column" }}
        h={{ base: 300, md: 600 }}
        p={4}
        mt={2}
        spacing={4}
        bgColor={useColorModeValue("gray.50", "gray.900")}
        rounded="lg"
        boxShadow="md"
        overflow="auto"
      >
        {tasks.map((task, index) => (<Task key={task.id} task={task} index={index} />))}
      </Stack>
    </Box>
  );
};
