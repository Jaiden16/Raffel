DROP DATABASE IF EXISTS raffelapi;
-- DROP TABLE IF EXISTS users;
-- DROP TABLE IF EXISTS raffles;

CREATE DATABASE raffelapi;

\c raffelapi;

SET timezone ='America/New_York';


CREATE TABLE raffles(
    id SERIAL PRIMARY KEY,
    name VARCHAR,
    secret_token VARCHAR,
    created_at TIMESTAMPTZ,
    raffled_at TIMESTAMPTZ UNIQUE,
    winner_id INT UNIQUE
);

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    raffle_id INT REFERENCES raffles(id),
    firstname VARCHAR,
    lastname VARCHAR,
    email VARCHAR UNIQUE,
    phone VARCHAR,
    registered_at TIMESTAMPTZ 

);
