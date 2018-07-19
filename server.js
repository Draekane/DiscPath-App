const express = require('express');
const path = require('path');

const app = express();
app.use(express.static(path.join(__dirname, 'build')));
app.get('/*', (req, res) => {
  res.sendFilePath(path.join(__dirname, 'build', 'index.html'));
});

const port = 8080;
app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
