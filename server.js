import express from 'express';
import { join } from 'path';

const app = express();
app.use(express.static(join(__dirname, 'build')));
app.get('/*', (req, res) => {
  res.sendFilePath(join(__dirname, 'build', 'index.html'));
});

const port = 8080;
app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
