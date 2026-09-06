import { getPendingEvents } from "../events/events.js";

type AgentHandler = (event: any) => Promise<void> | void;

const routes = new Map<string, AgentHandler>();

export function registerAgent(
  eventType: string,
  handler: AgentHandler
) {
  routes.set(eventType, handler);
}

export async function processEvents() {
  const events = getPendingEvents();

  for (const event of events) {
    const handler = routes.get(event.type);

    if (!handler) {
      console.log(
        `[ORCHESTRATOR] Kein Agent für Event: ${event.type}`
      );
      continue;
    }

    console.log(
      `[ORCHESTRATOR] Verarbeite: ${event.type}`
    );

    await handler({
      ...event,
      payload: JSON.parse(event.payload)
    });
  }
}
