var http = require('http');
var path = require('path');
var logger = require('morgan');
var express = require('express');
var app = express();

var swig = require('swig');
var fs = require('fs');
var revManifestFile = 'public/assets/rev-manifest.json';
swig.setFilter('revManifest', (input) => {
  var revManifest = JSON.parse(fs.readFileSync(revManifestFile, 'utf8'));

  return revManifest[input] || input;
});

app.set('port', process.env.PORT || 3000);
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));

var router = express.Router();
router.get('*', (req, res) => {
  res.send(swig.renderFile('views/index.html'));
});
app.use('/', router);

var server = http.createServer(app);
server.listen(app.get('port'), () => {
  console.info(`Express server listening on port ${app.get('port')}`);
});
