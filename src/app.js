require('dotenv').config();
const express = require('express');
const hotelsRouter = require('./api/routes/hotelsRoutes');
const roomsRouter = require('./api/routes/roomsRoutes');
const db = require('./config/DBConnection');
const AppError = require('./config/appError');
const globalErrorHandler = require('./api/middlewares/globalErrorHandler');

const app = express();
const port = process.env.PORT ?? 3000;

app.use(express.json());

app.use('/hotels', hotelsRouter);
app.use('/rooms', roomsRouter);

app.use((req, res, next) => {
  next(new AppError('Page Not Found', 404));
});

app.use(globalErrorHandler);

db.sync().then(() => {
  app.listen(port, () => console.log(`Listening on port ${port}...`));
});
