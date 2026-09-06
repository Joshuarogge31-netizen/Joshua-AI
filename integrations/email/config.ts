import "dotenv/config";

export const emailConfig = {
  microsoft: {
    email: process.env.MICROSOFT_EMAIL ?? "",
    tenantId: process.env.MICROSOFT_TENANT_ID ?? "",
    clientId: process.env.MICROSOFT_CLIENT_ID ?? "",
  },

  gmail: {
    email: process.env.GMAIL_EMAIL ?? "",
    clientId: process.env.GMAIL_CLIENT_ID ?? "",
  },
};
