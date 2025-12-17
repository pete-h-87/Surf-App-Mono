CREATE DATABASE surf_check_db;

CREATE TABLE forecast(
    forecast_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
  	date_recorded VARCHAR NOT NULL,
    session_time VARCHAR NOT NULL,
    wind_speed DECIMAL(5, 2) NOT NULL,
    wind_direction DECIMAL(5, 2) NOT NULL,
    wave_height DECIMAL(5, 2) NOT NULL,
    wave_period DECIMAL(5, 2) NOT NULL,
  	wave_direction DECIMAL(5,2) NOT NULL,
    temperature DECIMAL(5, 2) NOT NULL
);

CREATE TABLE journal(
    journal_id SERIAL PRIMARY KEY,
    forecast_id INT REFERENCES forecast(forecast_id),
    prediction VARCHAR,
    report VARCHAR
);

CREATE TABLE snapshot(
    snapshot_id SERIAL PRIMARY KEY,
    journal_id INT REFERENCES forecast(forecast_id),
    picture1 BYTEA NOT NULL,
    picture2 BYTEA NOT NULL
);

CREATE TABLE users(
  user_id SERIAL PRIMARY KEY,
  user_name VARCHAR NOT NULL,
  user_password VARCHAR NOT NULL,
  user_email VARCHAR NOT NULL
);

DELETE FROM forecast;

-- corrections and insertions

ALTER TABLE forecast
ADD COLUMN user_id INT;

ALTER TABLE forecast
ADD CONSTRAINT fk_user
FOREIGN KEY (user_id)
REFERENCES users(user_id);

ALTER TABLE journal
ADD CONSTRAINT journal_forecast_id_fkey
FOREIGN KEY (forecast_id)
REFERENCES forecast(forecast_id);

ALTER TABLE users
ALTER COLUMN user_password TYPE VARCHAR;

-- for gitBash:
CREATE TABLE forecast(forecast_id SERIAL PRIMARY KEY, date_recorded VARCHAR NOT NULL, session_time VARCHAR NOT NULL, wind_speed DECIMAL(5, 2) NOT NULL, wind_direction DECIMAL(5, 2) NOT NULL, wave_height DECIMAL(5, 2) NOT NULL, wave_period DECIMAL(5, 2) NOT NULL, wave_direction DECIMAL(5,2) NOT NULL, temperature DECIMAL(5, 2) NOT NULL);

CREATE TABLE journal(journal_id SERIAL PRIMARY KEY, forecast_id INT REFERENCES forecast(journal_id), prediction VARCHAR, report VARCHAR);

-- for creating on Linux - needed because this environment is very secure, and needs special permissions/tables:
-- 1. Create the Session table for your login system
CREATE TABLE IF NOT EXISTS "session" (
  "sid" varchar NOT NULL COLLATE "default",
  "sess" json NOT NULL,
  "expire" timestamp(6) NOT NULL
) WITH (OIDS=FALSE);

-- 2. Add the primary key and index for performance
ALTER TABLE "session" DROP CONSTRAINT IF EXISTS "session_pkey";
ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;
CREATE INDEX IF NOT EXISTS "IDX_session_expire" ON "session" ("expire");

-- 3. Fix all permissions for your app user (pumpkinpsql)
GRANT ALL ON SCHEMA public TO pumpkinpsql;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO pumpkinpsql;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO pumpkinpsql;

-- 4. Ensure pumpkinpsql owns the specific tables
ALTER TABLE users OWNER TO pumpkinpsql;
ALTER TABLE "session" OWNER TO pumpkinpsql;

-- 5. Final check to see if tables are there
\dt