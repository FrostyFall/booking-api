require('dotenv').config();
const express = require('express');
const passport = require('./config/passport');
const db = require('./config/dbConnection');
const AppError = require('./config/appError');
const globalErrorHandler = require('./api/middlewares/globalErrorHandler');
const passportAuth = require('./api/middlewares/passportAuth');
const authRouter = require('./api/routes/authRoutes');
const hotelsRouter = require('./api/routes/hotelsRoutes');
const roomsRouter = require('./api/routes/roomsRoutes');
const bookedRoomsRouter = require('./api/routes/bookedRoomsRoutes');
const usersRouter = require('./api/routes/usersRoutes');

const app = express();
const port = process.env.PORT ?? 3000;

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

app.use(globalErrorHandler);

db.sync().then(() => {
  app.listen(port, () => console.log(`Listening on port ${port}...`));
});
