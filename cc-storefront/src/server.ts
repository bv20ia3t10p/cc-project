// server/server.ts
import express from 'express';
import path from 'path';
import fs from 'fs';
import { render } from '../src/server-entry';

const app = express();
const port = 3000;

// Serve static assets from Vite's build
app.use(express.static(path.resolve(__dirname, '../dist/client')));

app.get('*', (_req, res) => {
  const html = render();
  const template = fs.readFileSync(
    path.resolve(__dirname, '../dist/client/index.html'),
    'utf-8'
  );

  // Inject rendered HTML into the template
  const finalHtml = template.replace('<div id="app"></div>', `<div id="app">${html}</div>`);
  res.send(finalHtml);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
