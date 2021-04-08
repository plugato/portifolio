import { Flex, ListItem, OrderedList } from '@chakra-ui/layout';
import React, { useEffect, useState } from 'react';

const Receiver = ({ payload }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (payload.topic) {
      setMessages((messages) => [...messages, payload]);
    }
  }, [payload]);

  const renderListItem = (item) => (
    <ListItem>{`title=${item.topic} description=${item.message}`}</ListItem>
  );

  return (
    <Flex title="Receiver">
      <OrderedList>{renderListItem}</OrderedList>
    </Flex>
  );
};

export default Receiver;
