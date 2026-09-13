CREATE TABLE IF NOT EXISTS `observations` (
  `id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  `child_alias` text NOT NULL,
  `context` text NOT NULL,
  `original_text` text NOT NULL,
  `observations_json` text NOT NULL,
  `interpretations_json` text NOT NULL,
  `supports_json` text NOT NULL,
  `outcome` text NOT NULL,
  `uncertainties_json` text NOT NULL,
  `confirmed_at` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS `idx_observations_child_confirmed`
ON `observations` (`child_alias`, `confirmed_at`);
