require('dotenv').config();
const express = require('express');
const AppError = require('./config/appError');
const globalErrorHandler = require('./api/middlewares/globalErrorHandler');

const app = express();
const port = process.env.PORT ?? 3000;

app.use(express.json());

app.use((req, res, next) => {
  next(new AppError('Page Not Found', 404));
});

app.use(globalErrorHandler);

app.listen(port, () => console.log(`Listening on port ${port}...`));
