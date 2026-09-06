import db from "../database/db.js";
import { randomUUID } from "node:crypto";

export function setMemory(
  category: string,
  key: string,
  value: unknown,
  source = "system",
  confidence = 1.0
) {
  const now = new Date().toISOString();

  const existing = db
    .prepare(
      "SELECT id FROM memory WHERE category = ? AND key = ?"
    )
    .get(category, key) as { id: string } | undefined;

  if (existing) {
    db.prepare(`
      UPDATE memory
      SET value = ?, source = ?, confidence = ?, updated_at = ?
      WHERE id = ?
    `).run(
      JSON.stringify(value),
      source,
      confidence,
      now,
      existing.id
    );

    return existing.id;
  }

  const id = randomUUID();

  db.prepare(`
    INSERT INTO memory
    (id, category, key, value, source, confidence, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    id,
    category,
    key,
    JSON.stringify(value),
    source,
    confidence,
    now,
    now
  );

  return id;
}

export function getMemory(category: string, key: string) {
  const result = db
    .prepare(`
      SELECT * FROM memory
      WHERE category = ? AND key = ?
    `)
    .get(category, key) as any;

  if (!result) return null;

  return {
    ...result,
    value: JSON.parse(result.value)
  };
}

export function searchMemory(category?: string) {
  if (category) {
    return db
      .prepare(`
        SELECT * FROM memory
        WHERE category = ?
        ORDER BY updated_at DESC
      `)
      .all(category);
  }

  return db
    .prepare(`
      SELECT * FROM memory
      ORDER BY updated_at DESC
    `)
    .all();
}
