import { registerAgent } from "../../core/orchestrator/router.js";

registerAgent("email.received", async (event) => {
  console.log(
    `[EMAIL AGENT] Neue E-Mail verarbeitet:`,
    event.payload
  );
});
