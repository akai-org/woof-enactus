CREATE EXTENSION IF NOT EXISTS pg_trgm;


CREATE INDEX IF NOT EXISTS partner_name_trgm_idx ON "Partner" USING gin (name gin_trgm_ops);