import http from 'http';

import app from '../app.js';

const PORT = process.env.PORT || '5000';

app.set('port', PORT);

const server = http.createServer(app);

server.listen(PORT);

const listening = () => {
  const addr = server.address();
  console.log(`listening on port: ${addr.port}`);
};


server.on('listening', listening);