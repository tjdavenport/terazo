const cors = require('cors');
const faker = require('faker');
const express = require('express');

const app = express();
const warehouse = warehouseId => ({
  warehouseId,
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
const warehouses = Array(10).fill()
  .reduce((map, empty, index) => map.set(index + 1, warehouse(index + 1)), new Map());

let resCount = 0;

const everyOtherFail = (req, res, next)  => {
  return next();

  resCount++;

  if (resCount === 1) {
    return next();
  }
  if (resCount === 2) {
    resCount = 0;
    return res.sendStatus(500);
  }
};

app.use(cors());
app.delete('/v1/warehouse/:warehouseId', everyOtherFail, (req, res) => {
  warehouses.delete(parseInt(req.params.warehouseId));
  return setTimeout(() => res.sendStatus(200), 1500);
});
app.get('/v1/warehouses', everyOtherFail, (req, res) => {
  return setTimeout(() => res.json(Array.from(warehouses, ([, elem]) => elem)), 1500);
  if (resCount === 2) {
    resCount = 0;
    return res.sendStatus(500);
  }
});

app.listen(1337, () => console.log('listening'));
