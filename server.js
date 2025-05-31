// Main server set up file
const express = require('express');
const sequelize = require('./config/db');
const Contact = require('./models/Contact');
const identifyRoute = require('./routes/identify');

require('dotenv').config();

const app = express();
app.use(express.json());

app.use('/', identifyRoute);

const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error('Unable to connect to DB:', err);
});
