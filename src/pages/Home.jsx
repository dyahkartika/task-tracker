import React, { useState, useEffect } from "react";
import {
  Text,
  Box,
  Divider,
  Flex,
  Input,
  Button,
  Spacer,
  HStack,
  IconButton,
  useToast,
} from "@chakra-ui/react";
import { FaTrash, FaCheck } from "react-icons/fa";
import { nanoid } from "nanoid";
import { useSelector, useDispatch } from "react-redux";
import {
  addTodo,
  toComplete as toCompleteRedux,
  deleteTodo,
} from "../store/actions";

const Home = () => {
  const [input, setInput] = useState("");
  const [completed, setCompleted] = useState([]);
  const [toggle, setToggle] = useState(false);
  const todosRedux = useSelector((state) => state.todos);
  const dispatch = useDispatch();
  const toast = useToast();
  function handleOnChangeInput(event) {
    setInput(event.target.value);
  }

  function handleKeyPress(event) {
    if (event.key === "Enter") {
      handleAddTodo();
    }
  }

  function handleAddTodo() {
    if (input) {
      let newTodo = {
        id: nanoid(),
        title: input,
        completed: false,
      };
      dispatch(addTodo(newTodo));
      setInput("");
    } else {
      toast({
        title: "Please fill the blank form.",
        status: "warning",
        duration: 9000,
        isClosable: true,
        variant: "left-accent",
      });
    }
  }

  function handleDeleteTodo(id) {
    dispatch(deleteTodo(id));
  }

  function toComplete(id) {
    dispatch(toCompleteRedux(id));
  }

  useEffect(() => {
    setCompleted([...todosRedux].filter((t) => t.completed));
  }, [todosRedux]);

  return (
    <Box
      w={{ base: "80%", md: "60%", lg: "60%" }}
      bg="white"
      h="80%"
      borderRadius="xl"
      shadow="xl"
      pb="4"
    >
      <Flex direction="column" alignItems="center">
        <Text
          fontSize="3xl"
          fontWeight="bold"
          color="orange.500"
          textAlign="center"
          mt="4"
        >
          Task Tracker
        </Text>
        <Divider
          w="50%"
          borderWidth="medium"
          borderRadius="xl"
          mt="2"
          borderColor="orange.500"
        />
      </Flex>
      <Flex justify="center" mt="4">
        <Input
          variant="filled"
          placeholder="add task here ..."
          w="60%"
          mr="4"
          onChange={(e) => handleOnChangeInput(e)}
          onKeyPress={handleKeyPress}
          value={input}
        />
        <Button bgColor="orange.200" color="orange.500" onClick={handleAddTodo}>
          Add
        </Button>
      </Flex>
      <Flex
        alignItems="center"
        mt={4}
        direction="column"
        overflow="auto"
        height="70%"
        overflowX="hidden"
      >
        {!todosRedux.length ? (
          <Text color="orange.500">No Task</Text>) : toggle ? (
          completed.map((t) => (
            <HStack
              bgColor={t.completed ? "green.200" : "orange.200"}
              color={t.completed ? "green.500" : "orange.500"}
              w="90%"
              px={4}
              py={2}
              borderRadius="xl"
              my="1"
              key={t.id}
            >
              <Text fontWeight="bold">{t.title}</Text>
              <Spacer />
              <IconButton
                bgColor="white"
                icon={<FaCheck />}
                onClick={() => toComplete(t.id)}
              />
              <IconButton
                bgColor="white"
                icon={<FaTrash />}
                onClick={() => handleDeleteTodo(t.id)}
              />
            </HStack>
          ))
        ) : (
          todosRedux.map((t) => (
            <HStack
              bgColor={t.completed ? "green.200" : "orange.200"}
              color={t.completed ? "green.500" : "orange.500"}
              w="90%"
              px={4}
              py={2}
              borderRadius="xl"
              my="1"
              key={t.id}
            >
              <Text fontWeight="bold">{t.title}</Text>
              <Spacer />
              <IconButton
                bgColor="white"
                icon={<FaCheck />}
                onClick={() => toComplete(t.id)}
              />
              <IconButton
                bgColor="white"
                icon={<FaTrash />}
                onClick={() => handleDeleteTodo(t.id)}
              />
            </HStack>
          ))
        )}
      </Flex>
      <Flex justify="center">
        {!toggle ? (
          <Button
            bgColor="green.200"
            color="green.600"
            onClick={() => setToggle(!toggle)}
          >
            See Completed Only
          </Button>
        ) : (
          <Button
            bgColor="gray.200"
            color="gray.600"
            onClick={() => setToggle(!toggle)}
          >
            See All Tasks
          </Button>
        )}
      </Flex>
    </Box>
  );
};

export default Home;
