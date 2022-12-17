const express = require('express');
const config = require('config');
const routes = require('./routes');

const app = express();

app.use(express.json());
app.use('/api', routes);

const PORT = config.get('port') || 5000;

app.listen(PORT, () => console.log(`App started on port${PORT}...`));
