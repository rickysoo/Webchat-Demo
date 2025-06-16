import type { Express } from "express";
import { join } from "path";

export function serveEmbedScript(app: Express) {
  // Serve the embed.js file for easy integration (dynamic endpoint)
  app.get('/embed.js', (req, res) => {
    res.setHeader('Content-Type', 'application/javascript');
    res.sendFile(join(process.cwd(), 'client', 'public', 'embed.js'));
  });

  // Serve the production embed.js file (hardcoded endpoint for deployment)
  app.get('/embed-production.js', (req, res) => {
    res.setHeader('Content-Type', 'application/javascript');
    res.sendFile(join(process.cwd(), 'client', 'public', 'embed-production.js'));
  });

  // Serve demo page showing external integration
  app.get('/demo', (req, res) => {
    res.sendFile(join(process.cwd(), 'client', 'public', 'demo.html'));
  });
}