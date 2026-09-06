import "../core/database/db.js";
import { createEvent } from "../core/events/events.js";
import { processEvents } from "../core/orchestrator/router.js";

import "../agents/email/index.js";
import "../agents/study/index.js";
import "../agents/finance/index.js";

console.log("\n=== ORCHESTRATOR TEST ===\n");

createEvent(
  "email.received",
  "test",
  {
    subject: "Neue DHfPG Information",
    sender: "hochschule@example.de"
  }
);

createEvent(
  "study.information",
  "test",
  {
    type: "exam",
    module: "Medizinische Grundlagen"
  }
);

createEvent(
  "finance.information",
  "test",
  {
    type: "portfolio_update",
    source: "test"
  }
);

await processEvents();

console.log("\n=== ORCHESTRATOR TEST ENDE ===\n");
