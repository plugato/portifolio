import { Button } from '@chakra-ui/button';
import { Box, Flex, Heading } from '@chakra-ui/layout';
import { useState } from 'react';
import Header from '../components/Header';
const Home = () => {
  return (
    <Flex alignContent="center" textAlign="center">
      <Contador />
    </Flex>
  );
};

const Contador = () => {
  const [contador, setContador] = useState(1);
  const adicionarContador = () => {
    setContador(contador + 1);
  };

  return (
    <Box maxW="lg" borderWidth="2px" borderRadius="lg">
      <Flex
        w="500px"
        h="300px"
        padding="4rem"
        bg="gray.100"
        justifyContent="space-between"
        direction="column"
      >
        <Heading as="h2" size="3xl" isTruncated color="gray.500">
          {contador}
        </Heading>

        <Button
          colorScheme="purple"
          size="lg"
          w="full"
          onClick={adicionarContador}
        >
          Click
        </Button>
      </Flex>
    </Box>
  );
};
export default Home;
