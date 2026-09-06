import fs from "node:fs";
import path from "node:path";
import { google } from "googleapis";

const SCOPES = [
  "https://www.googleapis.com/auth/gmail.readonly"
];

const CREDENTIALS_PATH = path.join(
  process.cwd(),
  "secrets",
  "google-oauth.json"
);

const TOKEN_PATH = path.join(
  process.cwd(),
  "secrets",
  "gmail-token.json"
);

type OAuthCredentials = {
  installed?: {
    client_id: string;
    client_secret: string;
    redirect_uris: string[];
  };
  web?: {
    client_id: string;
    client_secret: string;
    redirect_uris: string[];
  };
};

export function createGmailClient() {
  if (!fs.existsSync(CREDENTIALS_PATH)) {
    throw new Error(
      `Google OAuth credentials not found: ${CREDENTIALS_PATH}`
    );
  }

  const credentials =
    JSON.parse(
      fs.readFileSync(CREDENTIALS_PATH, "utf-8")
    ) as OAuthCredentials;

  const config =
    credentials.installed ?? credentials.web;

  if (!config) {
    throw new Error(
      "Unsupported Google OAuth credentials format."
    );
  }

  const oauth2Client = new google.auth.OAuth2(
    config.client_id,
    config.client_secret,
    "http://localhost:3000/oauth2callback"
  );

  if (fs.existsSync(TOKEN_PATH)) {
    const token = JSON.parse(
      fs.readFileSync(TOKEN_PATH, "utf-8")
    );

    oauth2Client.setCredentials(token);
  }

  return oauth2Client;
}

export { SCOPES, TOKEN_PATH };
