import { Button } from '@chakra-ui/button';
import { Flex } from '@chakra-ui/layout';
import React from 'react';

const Connection = ({ connect, disconnect, connectBtn }) => {
  // const [form] = useForm();
  const record = {
    host: 'broker.emqx.io',
    clientId: `mqttjs_ + ${Math.random().toString(16).substr(2, 8)}`,
    port: 8083,
  };
  const onFinish = (values) => {
    const { host, clientId, port, username, password } = {
      host: 'broker.emqx.io',
      port: 8083,
      clientId: 'anc1883',
    };

    const url = `ws://${host}:${port}/mqtt`;
    const options = {
      keepalive: 30,
      protocolId: 'MQTT',
      protocolVersion: 4,
      clean: true,
      reconnectPeriod: 1000,
      connectTimeout: 30 * 1000,
      will: {
        topic: 'WillMsg',
        payload: 'Connection Closed abnormally..!',
        qos: 0,
        retain: false,
      },
      rejectUnauthorized: false,
    };
    options.clientId = clientId;
    options.username = username;
    options.password = password;
    connect(url, options);
  };

  const handleConnect = () => {
    onFinish();
  };

  const handleDisconnect = () => {
    disconnect();
  };

  return (
    <Flex>
      <Button type="primary" onClick={handleConnect}>
        {connectBtn}
      </Button>
      ,
      <Button danger onClick={handleDisconnect}>
        Disconnect
      </Button>
      ,
    </Flex>
  );
};

export default Connection;
