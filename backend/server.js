const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');

const eventRouter = require('./routes/event.routes.js');

require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;

app.get('/', (req, res) => res.send('Hello World!'));

app.use('/api/events', eventRouter);

// Sync Sequelize models with database
sequelize.sync({ force: false }).then(() => {
  app.listen(port, () => console.log(`Server running on port ${port}`));
}).catch(err => console.error('Database sync error:', err));