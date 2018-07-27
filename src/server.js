const express = require('express');
const path = require('path');

const app = express();
app.use(express.static(path.join(__dirname, 'build')));
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'), (err) => {
    if (err) {
      res.status(500).send(err);
    }
  });
});

const port = 8080;
app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
