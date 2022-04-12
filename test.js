const mqtt = require('mqtt');
const { resolveHref } = require('next/dist/next-server/lib/router/router');
const { useState } = require('react');
const client = mqtt.connect('mqtt://broker.hivemq.com');

var connected = false;
const TOPIC_DEFAULT = 'ancalagon/ar';
const creatConnection = (callbackConnection) => {
  client.on('connect', callbackConnection);

  client.on('message', callbackReceive);
};

const publish = (topic, message) => {
  console.log({ topic, message }, client.connected);
  if (client.connected) {
    console.log(`${TOPIC_DEFAULT}/${topic}`, message);
    client.publish(`${TOPIC_DEFAULT}/${topic}`, message);
  }
};

const callbackConnection = () => {
  // Inform controllers that garage is connected
  client.subscribe(`${TOPIC_DEFAULT}/#`);

  publish('connected', 'true');

  publish('work', 'working');
};

const callbackReceive = (topic, message) => {
  if ((topic = TOPIC_DEFAULT)) {
    console.log({ topic, message: message.toString() });
    connected = message.toString() == 'true';
  }
};

// const callbackResolv = (topic, message) => {
//   publish(topic, message);
// };

//client.on('connect', callbackConnection);
creatConnection(callbackConnection, callbackReceive);

setTimeout(() => {
  publish('promise', 'promise working');
}, 5000);
// while (!connected) {
//   console.log('not');
// }

console.log('yes');
//publish('foi', '123');
