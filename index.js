const config = require('./config');
const express = require('express');

const app = express();

app.use(express.json(config.expressJsonBodyParserOptions));

app.listen(config.server.port, config.server.host, () => console.log(`Listening on: ${config.server.host}:${config.server.port}`));