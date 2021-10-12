const cors = require('cors');
const faker = require('faker');
const express = require('express');

const app = express();
let resCount = 0;

app.use(cors());
app.get('/v1/warehouses', (req, res) => {
  let id = 1;
  const warehouse = () => ({
    warehouseId: id++,
    warehouseName: faker.company.companyName(),
    warehouseDescription: faker.lorem.paragraph(),
    warehouseAddress: {
      buildingName: faker.company.bsNoun(),
      streetLine1: faker.address.streetAddress(),
      streetLine2: faker.address.secondaryAddress(),
      city: faker.address.city(),
      stateProvince: faker.address.state(),
      zipPostalCode: faker.address.zipCode(),
      country: faker.address.country()
    }
  });

  resCount++;

  if (resCount === 1) {
    return setTimeout(() => res.json(Array(10).fill().map(() => warehouse())), 1500);
  }
  if (resCount === 2) {
    return res.json([]);
  }
  if (resCount === 3) {
    resCount = 0;
    return res.sendStatus(500);
  }
});

app.listen(1337, () => console.log('listening'));
