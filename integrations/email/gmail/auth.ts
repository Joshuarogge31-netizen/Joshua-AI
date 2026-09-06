import fs from "node:fs";
import http from "node:http";
import { exec } from "node:child_process";
import { google } from "googleapis";
import {
  createGmailClient,
  SCOPES,
  TOKEN_PATH
} from "./client.js";

export async function authorizeGmail() {
  const oauth2Client = createGmailClient();

  if (fs.existsSync(TOKEN_PATH)) {
    console.log("Gmail OAuth token bereits vorhanden.");
    return oauth2Client;
  }

  const authUrl = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
    prompt: "consent"
  });

  const server = http.createServer(async (req, res) => {
    if (!req.url?.startsWith("/oauth2callback")) {
      res.writeHead(404);
      res.end();
      return;
    }

    const url = new URL(
      req.url,
      "http://localhost:3000"
    );

    const code = url.searchParams.get("code");

    if (!code) {
      res.writeHead(400);
      res.end("Authorization code missing.");
      return;
    }

    try {
      const { tokens } =
        await oauth2Client.getToken(code);

      oauth2Client.setCredentials(tokens);

      fs.writeFileSync(
        TOKEN_PATH,
        JSON.stringify(tokens, null, 2),
        { mode: 0o600 }
      );

      res.writeHead(200, {
        "Content-Type": "text/html; charset=utf-8"
      });

      res.end(`
        <html>
          <body>
            <h2>Joshua AI OS – Gmail verbunden</h2>
            <p>Du kannst dieses Fenster schließen.</p>
          </body>
        </html>
      `);

      console.log(
        "\nGmail OAuth erfolgreich abgeschlossen."
      );

      setTimeout(() => {
        server.close();
      }, 500);
    } catch (error) {
      console.error(
        "OAuth Fehler:",
        error
      );

      res.writeHead(500);
      res.end("OAuth authorization failed.");
    }
  });

  await new Promise<void>((resolve) => {
    server.listen(3000, "127.0.0.1", () => {
      resolve();
    });
  });

  console.log("\nÖffne Google OAuth...");
  console.log(authUrl);

  exec(`open "${authUrl}"`);

  await new Promise<void>((resolve) => {
    server.on("close", () => resolve());
  });

  return oauth2Client;
}
