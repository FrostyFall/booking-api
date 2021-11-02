require('dotenv').config();
const express = require('express');
const authRouter = require('./api/routes/authRoutes');
const hotelsRouter = require('./api/routes/hotelsRoutes');
const roomsRouter = require('./api/routes/roomsRoutes');
const bookedRoomsRouter = require('./api/routes/bookedRoomsRoutes');
const usersRouter = require('./api/routes/usersRoutes');
const db = require('./config/DBConnection');
const AppError = require('./config/appError');
const globalErrorHandler = require('./api/middlewares/globalErrorHandler');

const app = express();
const port = process.env.PORT ?? 3000;

app.use(express.json());

app.use('/', authRouter);
app.use('/hotels', hotelsRouter);
app.use('/rooms', roomsRouter);
app.use('/booked-rooms', bookedRoomsRouter);
app.use('/users', usersRouter);

app.use((req, res, next) => {
  next(new AppError('Page Not Found', 404));
});

app.use(globalErrorHandler);

db.sync().then(() => {
  app.listen(port, () => console.log(`Listening on port ${port}...`));
});
