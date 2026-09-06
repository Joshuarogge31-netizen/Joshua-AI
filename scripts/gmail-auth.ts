import { authorizeGmail } from "../integrations/email/gmail/auth.js";

console.log("\n=== GMAIL OAUTH ===\n");

await authorizeGmail();

console.log("\n=== GMAIL OAUTH FERTIG ===\n");
