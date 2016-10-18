const express = require('express');
const path = require('path');

const app = express();

app.set('port', 3000);
app.set('distdir', path.join(__dirname, '/../../dist'));

app.use('/', express.static(app.get('distdir')));

app.get('*', (req, res) => {
  if (!path.extname(req.path)) {
    res.sendFile('index.html', {root: app.get('distdir')});
  }
  else {
    res.status(404).end();
  }
});

app.listen(app.get('port'), () => {
  console.log('Node app running on port', app.get('port'));
});