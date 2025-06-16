import type { Express } from "express";
import { join } from "path";

export function serveEmbedScript(app: Express) {
  // Serve the embed.js file for easy integration
  app.get('/embed.js', (req, res) => {
    res.setHeader('Content-Type', 'application/javascript');
    res.sendFile(join(process.cwd(), 'client', 'public', 'embed.js'));
  });

  // Serve demo page showing external integration
  app.get('/demo', (req, res) => {
    res.sendFile(join(process.cwd(), 'client', 'public', 'demo.html'));
  });
}