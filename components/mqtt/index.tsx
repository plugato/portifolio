import { Connector } from 'mqtt-react-hooks';
import { useEffect, useState } from 'react';
import Connection from './Connection';
import Receiver from './Receiver';
import mqtt from 'mqtt';
import { Button } from '@chakra-ui/button';

const MyMqtt = ({ messageSend, topic }) => {
  const [client, setClient] = useState(null);
  const [isSubed, setIsSub] = useState(false);
  const [payload, setPayload] = useState({});
  const [connectStatus, setConnectStatus] = useState('Connect');

  const mqttConnect = (host, mqttOption) => {
    setConnectStatus('Connecting');
    setClient(mqtt.connect(host, mqttOption));
  };
  const onFinish = (values) => {
    const { host, clientId, port, username, password } = {
      host: 'broker.hivemq.com',
      port: 8000,
      clientId: 'anc1883',
    };

    const url = `ws://${host}:${port}`;
    const options = {
      keepalive: 30,
      protocolId: 'WS',
      protocolVersion: 4,
      clean: false,
      reconnectPeriod: 1000,
      connectTimeout: 30 * 1000,
      will: {
        topic: 'WillMsg',
        payload: 'Connection Closed abnormally..!',
        qos: 2,
        retain: false,
      },
      rejectUnauthorized: false,
    };
    options.clientId = clientId;
    options.username = username;
    options.password = password;
    mqttConnect(url, options);
  };

  useEffect(() => {
    if (client) {
      client.on('connect', () => {
        setConnectStatus('Connected');
      });
      client.on('error', (err) => {
        console.error('Connection error: ', err);
        client.end();
      });
      client.on('reconnect', () => {
        setConnectStatus('Reconnecting');
      });
      client.on('message', (topic, message) => {
        const payload = { topic, message: message.toString() };
        setPayload(payload);
      });
    }
  }, [client]);

  useEffect(() => {
    onFinish({});
    mqttPublish({
      topic: topic,
      qos: 2,
      payload: messageSend,
    });
  }, [messageSend]);

  const mqttDisconnect = () => {
    if (client) {
      client.end(() => {
        setConnectStatus('Connect');
      });
    }
  };

  const mqttPublish = (context) => {
    if (client) {
      const { topic, qos, payload } = context;
      client.publish(topic, payload, { qos }, (error) => {
        if (error) {
          console.log('Publish error: ', error);
        }
      });
    }
  };
  const mqttSub = (subscription) => {
    if (client) {
      const { topic, qos } = subscription;
      client.subscribe(topic, { qos }, (error) => {
        if (error) {
          console.log('Subscribe to topics error', error);
          return;
        }
        setIsSub(true);
      });
    }
  };

  const mqttUnSub = (subscription) => {
    if (client) {
      const { topic } = subscription;
      client.unsubscribe(topic, (error) => {
        if (error) {
          console.log('Unsubscribe error', error);
          return;
        }
        setIsSub(false);
      });
    }
  };
  return (
    <>
      {/* <Connection
        connect={mqttConnect}
        disconnect={mqttDisconnect}
        connectBtn={connectStatus}
      /> */}

      {/* <Button
        onClick={() =>
          mqttPublish({
            topic: 'presence',
            qos: 0,
            payload: messageSend,
          })
        }
      >
        publish
      </Button> */}

      {/* <Receiver payload={payload} /> */}
    </>
  );
};

export default MyMqtt;
