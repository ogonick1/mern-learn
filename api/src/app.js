const express = require('express');
require('express-async-errors');
const config = require('config');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes');
const { errorCodes } = require('./errors/error-codes');
const { GeneralError } = require('./errors');

const app = express();

app.use(express.json());
app.use(cors());
app.use('/api', routes);

app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  if (err instanceof GeneralError) {
    res.status(err.getCode()).json({
      errorCode: err.errorCode,
      message: err.message,
      details: err.details,
    });
  } else {
    res.status(500).json({
      errorCode: err.errorCode || errorCodes.INTERNAL_SERVER_ERROR,
      message: err.message,
      details: err.details,
    });
  }
});

const PORT = config.get('port') || 5000;

async function start() {
  try {
    mongoose.set('strictQuery', false);

    await mongoose.connect(config.get('mongoUri'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    app.listen(PORT, () => console.log(`App started on port ${PORT}...`));
  } catch (e) {
    console.log('server error', e.message);
    process.exit(1);
  }
}

start();
