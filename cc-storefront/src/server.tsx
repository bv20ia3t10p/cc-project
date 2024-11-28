import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer } from 'vite';

const isProd = process.env.NODE_ENV === 'production';

async function createViteServer() {
  const vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom',
  });
  const app = express();

  // Apply Vite's middleware in development
  app.use(vite.middlewares);

  app.get('*', async (req, res) => {
    const url = req.originalUrl;

    try {
      // Always serve the index.html for SSR
      let template;
      if (isProd) {
        template = fs.readFileSync(path.resolve(__dirname, 'dist/index.html'), 'utf-8');
      } else {
        template = await vite.transformIndexHtml(url, fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8'));
      }

      // Render the app here using React SSR logic
      const appHtml = `<div id="app">Your React App</div>`;

      // Inject the app HTML into the template
      const html = template.replace('<!--app-html-->', appHtml);
      res.status(200).set({ 'Content-Type': 'text/html' }).send(html);
    } catch (error) {
      // vite.ssrFixStacktrace(error);
      // res.status(500).send(error.message);
    }
  });

  return app;
}

createViteServer().then(app => {
  app.listen(3000, () => {
    console.log('Server is running at http://localhost:3000');
  });
});