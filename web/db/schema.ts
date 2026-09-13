import { index, integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const observations = sqliteTable(
  'observations',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    childAlias: text('child_alias').notNull(),
    context: text('context').notNull(),
    originalText: text('original_text').notNull(),
    observationsJson: text('observations_json').notNull(),
    interpretationsJson: text('interpretations_json').notNull(),
    supportsJson: text('supports_json').notNull(),
    outcome: text('outcome').notNull(),
    uncertaintiesJson: text('uncertainties_json').notNull(),
    confirmedAt: integer('confirmed_at', { mode: 'timestamp_ms' }).notNull(),
  },
  (table) => [index('idx_observations_child_confirmed').on(table.childAlias, table.confirmedAt)],
);
