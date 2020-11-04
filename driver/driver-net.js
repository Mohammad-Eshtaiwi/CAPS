require('dotenv').config;
const faker = require('faker');
const net = require('net');

const client = new net.Socket();
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 4000;
require('dotenv').config();

client.connect(PORT, HOST, () => {
  console.log('Client Connected');
  // 6
  client.on('data', bufferData => {
    const dataObj = JSON.parse(bufferData);
    if (dataObj.event === 'new package') {
      pickUp(dataObj.payload);
    }
  });
});

function pickUp(payload) {
  console.log(`DRIVER: picked up ${payload.orderID}`);
  setTimeout(() => {
    const message = {
      event: 'picked up',
      payload,
    };
    const stringifiedMessage = JSON.stringify(message);
    client.write(stringifiedMessage);
    client.on('error', err => console.log('Client Error', err.message));
  }, 1000);
  delivered(payload);
}

function delivered(payload) {
  setTimeout(() => {
    const message = {
      event: 'delivered',
      payload,
    };
    console.log(`Driver: delivered: ${payload.orderID}`);
    const stringifiedMessage = JSON.stringify(message);
    client.write(stringifiedMessage);
    client.on('error', err => console.log('Client Error', err.message));
  }, 3000);
}
