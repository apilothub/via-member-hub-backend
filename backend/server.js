const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');

const challengeRoutes = require('./routes/challengeRoutes');
const userRouter = require('./routes/userRouter');
const eventRouter = require('./routes/event.routes.js');
const tokenRouter=require('./routes/tokenRouter.js')
const {notFound, errorHandler} = require('./middleware/error.middleware')


require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;

app.get('/', (req, res) => res.send('Hello World!'));

app.use('/api/challenges', challengeRoutes);
app.use('/api/users', userRouter);
app.use('/api/events', eventRouter);
app.use('/api/token', tokenRouter);


app.use(notFound)
app.use(errorHandler)

// Sync Sequelize models with database
sequelize.sync({ force: false }).then(() => {
  app.listen(port, () => console.log(`Server running on port ${port}`));
}).catch(err => console.error('Database sync error:', err));