require('dotenv').config();
const express = require('express');
const passport = require('./config/passport');
const db = require('./config/DBConnection');
const AppError = require('./utils/appError');
const globalErrorController = require('./api/controllers/globalErrorController');
const passportAuth = require('./api/middlewares/passportAuth');

const authRouter = require('./api/routes/authRoutes');
const hotelsRouter = require('./api/routes/hotelsRoutes');
const roomsRouter = require('./api/routes/roomsRoutes');
const bookedRoomsRouter = require('./api/routes/bookedRoomsRoutes');
const usersRouter = require('./api/routes/usersRoutes');

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(express.json());
app.use(passport.initialize());

app.use('/auth', authRouter);
app.use('/hotels', passportAuth, hotelsRouter);
app.use('/rooms', passportAuth, roomsRouter);
app.use('/booked-rooms', passportAuth, bookedRoomsRouter);
app.use('/users', passportAuth, usersRouter);

app.use((req, res, next) => {
  next(new AppError('Page Not Found', 404));
});

app.use(globalErrorController);

db.sync()
  .then(() => {
    app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
  })
  .catch((err) => {
    const { address, port } = err.original;

    console.log(
      `Failed to connect to the database on ${address}:${port}. Shutting down...`
    );

    process.exit(1);
  });
