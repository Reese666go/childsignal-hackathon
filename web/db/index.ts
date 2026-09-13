import { env } from 'cloudflare:workers';
import { drizzle } from 'drizzle-orm/d1';
import * as schema from './schema';

export function getDb() {
  if (!env.DB) {
    throw new Error(
      'Cloudflare D1 binding `DB` is unavailable. Set the `d1` field in .openai/hosting.json to `DB` or let your control plane inject the real binding values before using the database.',
    );
  }

  return drizzle(env.DB, { schema });
}

export async function ensureDbSchema() {
  if (!env.DB) throw new Error('Cloudflare D1 binding `DB` is unavailable.');
  await env.DB.batch([
    env.DB.prepare(`CREATE TABLE IF NOT EXISTS observations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      child_alias TEXT NOT NULL,
      context TEXT NOT NULL,
      original_text TEXT NOT NULL,
      observations_json TEXT NOT NULL,
      interpretations_json TEXT NOT NULL,
      supports_json TEXT NOT NULL,
      outcome TEXT NOT NULL,
      uncertainties_json TEXT NOT NULL,
      confirmed_at INTEGER NOT NULL
    )`),
    env.DB.prepare(`CREATE INDEX IF NOT EXISTS idx_observations_child_confirmed
      ON observations(child_alias, confirmed_at)`),
  ]);
  await env.DB.prepare('PRAGMA optimize').run();
}
