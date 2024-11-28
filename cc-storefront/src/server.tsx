import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';

const app = express();

// Serve static files from 'dist' (Vite build output)
app.use(express.static('dist'));

// Handle all routes
app.get('*', (req, res) => {
  const appHtml = renderToString(<App />);
  const html = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>React SSR App</title>
      </head>
      <body>
        <div id="root">${appHtml}</div>
        <script src="/main.js"></script> <!-- Vite bundle -->
      </body>
    </html>
  `;
  res.status(200).send(html);
});

// Use the PORT environment variable provided by Vercel (or fallback to 3000 for local testing)
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
