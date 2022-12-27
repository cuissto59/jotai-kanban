import { Container, Heading, SimpleGrid } from "@chakra-ui/react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "./App.css";
import { Column } from "./components";
import { Columns } from "./types";

const App = () => {

  return (
    <>
      <Heading
        fontSize={{ base: "4xl", sm: "5xl", md: "6xl" }}
        fontWeight={"bold"}
        textAlign="center"
        bgClip="text"
        mt={4}
      >
        Jotai-Kanban Board
      </Heading>
      <Container maxWidth="container.lg" px={4} py={10}>
        <DndProvider backend={HTML5Backend}>
          <SimpleGrid columns={{ base: 1, md: 4 }} spacing={{ base: 16, md: 4 }}>
            <Column column={Columns.TODO} />
            <Column column={Columns.IN_PROGRESS} />
            <Column column={Columns.BLOCKED} />
            <Column column={Columns.COMPLETED} />
          </SimpleGrid>
        </DndProvider>
      </Container>
    </>
  );
};

export default App;
