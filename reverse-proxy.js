const { createProxyMiddleware } = require('http-proxy-middleware');

console.log("Sitecore Pages reverse proxy started.");

module.exports = (req, res) => {
    const proxy = createProxyMiddleware({
        target: 'http://localhost:3000',
        changeOrigin: true,
        onError: (err, req, res) => {
            res.writeHead(503, {
                'Content-Type': 'text/plain',
            });
            res.end('Service Unavailable');
        },
        onProxyReq: (proxyReq, req, res) => {
            proxyReq.setHeader('X-Forwarded-Host', req.headers.host);
        },
        onProxyRes: (proxyRes, req, res) => {
            if (proxyRes.statusCode === 404) {
                res.writeHead(404, {
                    'Content-Type': 'text/html',
                });
                res.end(`
                        <html>
                            <head>
                            <title>No editing host</title>
                            <style>
                                body {
                                background-color: #f0f0f0;
                                font-family: Arial, sans-serif;
                                text-align: center;
                                padding-top: 50px;
                                }
                                h1 {
                                color: #333;
                                }
                            </style>
                            </head>
                            <body>
                            <h1>No editing host</h1>
                            <p>
                                There is no editing host available on http://localhost:3000. 
                                Start your Sitecore JSS project on http://localhost:3000 and try again.
                            </p>
                            </body>
                        </html>
                        `);
            }
        },
    });

    proxy(req, res);
};