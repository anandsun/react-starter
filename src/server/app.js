const express = require('express');

const app = express.Router();

app.get('/test', (req, res) => res.json({test: 'test is a go'}))

module.exports = app;