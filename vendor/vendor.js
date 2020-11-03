require('dotenv').config;
const faker = require('faker');
const net = require('net');
const store = process.env.STORE_NAME || 'random name';

const client = new net.Socket();
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 4000;
require('dotenv').config();

client.connect(PORT, HOST, () => {
  console.log('Client Connected');
  // 6
  client.on('data', bufferData => {
    const dataObj = JSON.parse(bufferData);
    if (dataObj.event === 'delivered') {
      console.log(`VENDOR: thank you for delivering ${dataObj.payload.orderID}`);
    }
  });
  setInterval(() => {
    const payload = {
      store: process.env.STORE_NAME,
      orderID: faker.random.uuid(),
      customer: faker.name.findName(),
      address: faker.address.streetAddress(),
    };
    const message = {
      event: 'new package',
      payload,
    };
    const stringifiedMessage = JSON.stringify(message);
    client.write(stringifiedMessage);
    client.on('error', err => console.log('Client Error', err.message));
  }, 5000);
});

// function makePackage() {}

// const message = `[${name}]: ${text}`; // [mahmoud]: hi
// const event = JSON.stringify({ event: 'message', payload: message });
// client.write(event); // 4
