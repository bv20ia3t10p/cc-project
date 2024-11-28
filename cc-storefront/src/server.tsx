import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './App'; // Import your App component

const app = express();

// Serve static files from 'dist' (where Vite builds assets)
app.use(express.static('dist'));

// Handle all routes (so React Router can handle them)
app.get('*', (req, res) => {
  const appHtml = renderToString(<App />); // Render App to HTML string
  const html = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>React SSR App</title>
      </head>
      <body>
        <div id="root">${appHtml}</div> <!-- Inject the rendered HTML here -->
        <script src="/main.js"></script> <!-- Reference to your Vite build output -->
      </body>
    </html>
  `;
  res.status(200).send(html); // Send the rendered HTML to the client
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
