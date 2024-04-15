const http = require('http');
   const proxy = require('./reverse-proxy');

   const server = http.createServer((req, res) => {
     proxy(req, res);
   });

   const port = 3001;
   server.listen(port, () => {
     console.log(`Sitecore pages reverse proxy is running on http://localhost:${port} to test it locally.`);
   });