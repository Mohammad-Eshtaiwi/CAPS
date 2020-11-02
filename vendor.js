mainEvent = require('./events');
require('dotenv').config;
const faker = require('faker');
const { pickUp } = require('./driver');
const store = process.env.STORE_NAME || 'random name';
setInterval(() => {
  const payload = {
    store: process.env.STORE_NAME,
    orderID: faker.random.uuid(),
    customer: faker.name.findName(),
    address: faker.address.streetAddress(),
  };
  mainEvent.emit('createPackage', payload);
  pickUp(payload);
}, 5000);
