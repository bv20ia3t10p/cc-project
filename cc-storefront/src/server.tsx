import express from 'express';
import { createServer } from 'vite';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import App from './App'; // Your root React component

const app = express();

app.all('*', async (_req, res) => {
  const vite = await createServer({
    server: { middlewareMode: true }, // Enables SSR mode
  });

  app.use(vite.middlewares); // Use Vite middlewares for dev

  // Render the React app to a string on the server side
  const appHtml = ReactDOMServer.renderToString(<App />);

  // Send back the full HTML
  res.status(200).set({ 'Content-Type': 'text/html' }).send(`
    <!DOCTYPE html>
    <html>
      <head><title>SSR React App</title></head>
      <body>
        <div id="app">${appHtml}</div>
        <script type="module" src="/assets/main.js"></script>
      </body>
    </html>
  `);
});

export default app;
