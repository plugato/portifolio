var mqtt = require('mqtt');
const { useState } = require('react');
var client = mqtt.connect('mqtt://test.mosquitto.org');
const message = 'qqqqqqqqqqqqqqqqqqqqqqqq';

client.on('connect', function () {
  client.subscribe('presence', function (err) {
    if (!err) {
      client.publish('presence', message);
    }
  });
});

client.on('message', function (topic, message) {
  // message is Buffer
  console.log(message.toString());
  client.end();
});
