import express from "express";
import path from "path";
import fs from "fs";
import { createServer } from "vite";
import React from "react";
import ReactDOMServer from "react-dom/server";
import App from "./App"; // Replace with your actual React App component

const isProd = process.env.NODE_ENV === "production";

async function createViteServer() {
  const vite = await createServer({
    server: { middlewareMode: true },
    appType: "custom",
  });
  const app = express();

  // Apply Vite's middleware in development
  app.use(vite.middlewares);

  // Serve static assets in production
  app.use(express.static(path.resolve(__dirname, "dist")));

  app.get("*", async (req, res) => {
    const url = req.originalUrl;

    try {
      // Read the index.html template
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

      // Render the app using React SSR
      const appHtml = ReactDOMServer.renderToString(<App />);

      // Inject the app HTML into the template
      const html = template.replace("<!--app-html-->", appHtml);

      // Send the final HTML response
      res.status(200).set({ "Content-Type": "text/html" }).send(html);
    } catch (error) {
      console.error(error);
      res.status(500).send("500");
    }
  });

  return app;
}

createViteServer().then((app) => {
  app.listen(3000, () => {
    console.log("Server is running at http://localhost:3000");
  });
});
