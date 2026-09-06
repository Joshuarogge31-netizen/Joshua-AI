import { registerAgent } from "../../core/orchestrator/router.js";

registerAgent("finance.information", async (event) => {
  console.log(
    `[FINANCE AGENT] Finanzinformation verarbeitet:`,
    event.payload
  );
});
