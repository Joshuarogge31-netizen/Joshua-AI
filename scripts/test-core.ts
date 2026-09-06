import "../core/database/db.js";
import {
  setMemory,
  getMemory,
  searchMemory
} from "../core/memory/memory.js";
import {
  createEvent,
  getPendingEvents
} from "../core/events/events.js";

console.log("\n=== JOSHUA AI OS CORE TEST ===\n");

setMemory(
  "system",
  "name",
  "Joshua",
  "initial_setup"
);

setMemory(
  "system",
  "project",
  "Joshua AI OS",
  "initial_setup"
);

const memory = getMemory("system", "name");

console.log("Memory:");
console.log(memory);

const eventId = createEvent(
  "system.test",
  "core",
  {
    message: "Joshua AI OS Core funktioniert."
  }
);

console.log("\nEvent erstellt:");
console.log(eventId);

console.log("\nPending Events:");
console.log(getPendingEvents());

console.log("\nGesamter Memory:");
console.log(searchMemory());

console.log("\n=== CORE TEST ERFOLGREICH ===\n");
