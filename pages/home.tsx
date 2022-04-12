import { Button } from '@chakra-ui/button';
import { Box, Flex, Heading } from '@chakra-ui/layout';
import React, { FC, useEffect, useState } from 'react';

import mqtt from 'mqtt';
import MyMqtt, { mqttPublish } from '../components/mqtt';

const client = mqtt.connect('mqtt://broker.emqx.io:1883');

export const Home: FC = () => {
  const [cont, setCont] = useState(false);
  const [message, setMessage] = useState('initial message');

  return (
    <Flex alignContent="center" textAlign="center">
      <Contador setMessage={setMessage} />
      <MyMqtt messageSend={message} topic="presence/2/" />
    </Flex>
  );
};

const Contador = ({ setMessage }) => {
  const [contador, setContador] = useState(1);

  useEffect(() => {
    setMessage(contador.toString());
  }, [contador]);

  const adicionarContador = () => {
    0;
    setContador(contador + 1);

    //mqtt.read();
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
