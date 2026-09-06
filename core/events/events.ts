import db from "../database/db.js";
import { randomUUID } from "node:crypto";

export function createEvent(
  type: string,
  source: string,
  payload: unknown
) {
  const id = randomUUID();

  db.prepare(`
    INSERT INTO events
    (id, type, source, payload, created_at)
    VALUES (?, ?, ?, ?, ?)
  `).run(
    id,
    type,
    source,
    JSON.stringify(payload),
    new Date().toISOString()
  );

  return id;
}

export function getPendingEvents() {
  return db
    .prepare(`
      SELECT * FROM events
      WHERE processed = 0
      ORDER BY created_at ASC
    `)
    .all();
}
