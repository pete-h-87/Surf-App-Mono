CREATE DATABASE surf_check_db;

CREATE TABLE forecast(
    journal_id SERIAL PRIMARY KEY,
  	date_recorded DATE NOT NULL,
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
    forecast_id INT REFERENCES forecast(journal_id),
    prediction VARCHAR,
    report VARCHAR
);

CREATE TABLE snapshot(
    snapshot_id SERIAL PRIMARY KEY,
    journal_id INT REFERENCES forecast(journal_id),
    picture1 BYTEA NOT NULL,
    picture2 BYTEA NOT NULL
); 

DELETE FROM forecast;

