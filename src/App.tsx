import { Container, Heading } from "@chakra-ui/react";
import "./App.css";

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
        {/* ower container logic here*/}
      </Container>
    </>
  );
};

export default App;
