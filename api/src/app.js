const express = require('express');
const config = require('config');
const mongoose = require('mongoose');
const routes = require('./routes');

const app = express();

app.use(express.json());
app.use('/api', routes);

const PORT = config.get('port') || 5000;

async function start() {
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(config.get('mongoUri'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (e) {
    console.log('server error', e.message);
    process.exit(1);
  }
}
start();

app.listen(PORT, () => console.log(`App started on port${PORT}...`));
