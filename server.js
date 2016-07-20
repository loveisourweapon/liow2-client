'use strict';

const mapValues = require('lodash/mapValues');
const replace = require('lodash/replace');
const upperCase = require('lodash/upperCase');

const http = require('http');
const path = require('path');
const logger = require('morgan');
const express = require('express');

const isDevelopment = process.env.NODE_ENV === 'development';

// Get config and look for environment variable overrides
const config = mapValues(require('./config'), (value, key) => {
  let envVar = process.env[replace(upperCase(key), /\s/g, '_')];
  if (envVar) {
    return envVar;
  }

  return value;
});

const swig = require('swig');
const fs = require('fs');
const revManifestFile = 'public/bundles/manifest.json';
swig.setFilter('revManifest', input => {
  let revManifest = JSON.parse(fs.readFileSync(revManifestFile, 'utf8'));

  return revManifest[input] || input;
});

let app = express();
app.set('port', process.env.PORT || 3000);
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));

let router = express.Router();
router.get('/config.js', (req, res) => {
  res.type('.js').send(`var LIOW_CONFIG = ${JSON.stringify(config)}`);
});
router.get('*', (req, res) => {
  res.send(swig.renderFile('views/index.html', { isDevelopment }));
});
app.use('/', router);

let server = http.createServer(app);
server.listen(app.get('port'), () => {
  console.info(`Listening on port ${app.get('port')}`);
});
