const express = require('express');

const server = express();
server.use(express.static(`${__dirname}/build`));

const port = 8080;
server.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
