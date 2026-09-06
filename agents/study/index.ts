import { registerAgent } from "../../core/orchestrator/router.js";

registerAgent("study.information", async (event) => {
  console.log(
    `[STUDY AGENT] Studieninformation verarbeitet:`,
    event.payload
  );
});
