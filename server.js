require('dotenv').config();
const express = require('express');
const routes = require('./routes');
// Import sequelize connection
const sequelize = require('./config/connection.js'); // Adjust the path based on your project structure

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// Sync sequelize models to the database
sequelize.sync({ force: false }).then(() => {
  // Start the server after syncing models
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
  });
});
