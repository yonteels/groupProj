import { createServer } from 'http';
import { renderModule } from '@angular/platform-server';
import { AppServerModule } from './src/app/app.server.module'  // Adjust the path as necessary
import { enableProdMode } from '@angular/core';

enableProdMode();  // Enable production mode for better performance

const server = createServer((req, res) => {
  renderModule(AppServerModule, {
    document: '<app-root></app-root>',  // Initial HTML document
    url: req.url,  // The URL for the request
  })
    .then((html) => {
      res.writeHead(200, { 'Content-Type': 'text/html' });  // Set response headers
      res.end(html);  // Send the rendered HTML back to the client
    })
    .catch((err) => {
      console.error(err);  // Log any errors
      res.writeHead(500);  // Send a 500 Internal Server Error response
      res.end('Internal Server Error');
    });
});

// Start the server
server.listen(4000, () => {
  console.log('Server running on http://localhost:4000');  // Log the server status
});
