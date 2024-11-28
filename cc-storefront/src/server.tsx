import express from "express";
import path from "path";
import fs from "fs";
import { createServer } from "vite";
import { render } from "./server-entry";

const isProd = process.env.NODE_ENV === "production";

async function createViteServer() {
  const vite = await createServer({
    server: { middlewareMode: true },
    appType: "custom",
  });

  const app = express();

  // Middleware for Vite in development
  app.use(vite.middlewares);

  // Handle SSR: Serve HTML template with SSR content
  app.all("*", async (req, res) => {
    const url = req.originalUrl;
    try {
      let template;
      if (isProd) {
        // In production, use pre-built HTML template
        template = fs.readFileSync(
          path.resolve(__dirname, "dist/index.html"),
          "utf-8"
        );
      } else {
        // In development, transform HTML template using Vite
        template = await vite.transformIndexHtml(
          url,
          fs.readFileSync(path.resolve(__dirname, "index.html"), "utf-8")
        );
      }

      // Render the app for SSR
      const appHtml = render();

      // Inject the SSR content into the template
      const html = template.replace("<!--app-html-->", appHtml);

      // Send the rendered HTML response
      res.status(200).set({ "Content-Type": "text/html" }).send(html);
    } catch (error) {
      // vite.ssrFixStacktrace(error);
      // res.status(500).send(error.message);
    }
  });
  app.get("*", async (req, res) => {
    const url = req.originalUrl;
    let template;

    if (isProd) {
      template = fs.readFileSync(
        path.resolve(__dirname, "dist/index.html"),
        "utf-8"
      );
    } else {
      template = await vite.transformIndexHtml(
        url,
        fs.readFileSync(path.resolve(__dirname, "index.html"), "utf-8")
      );
    }

    // Render the app HTML here using SSR logic
    const appHtml = `<div id="app">Your SSR rendered React App</div>`;

    // Inject app HTML into template
    const html = template.replace("<!--app-html-->", appHtml);

    res.status(200).set({ "Content-Type": "text/html" }).send(html);
  });
  return app;
}

// Start the server
createViteServer().then((app) => {
  app.listen(3000, () => {
    console.log("Server is running at http://localhost:3000");
  });
});
