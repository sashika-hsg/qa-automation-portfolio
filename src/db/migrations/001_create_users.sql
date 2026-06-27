-- Migration: 001_create_users
-- Creates the users table for storing test user data
-- Used to cross-validate API responses against database state

CREATE TABLE IF NOT EXISTS users (
  id          SERIAL PRIMARY KEY,
  name        VARCHAR(100) NOT NULL,
  job         VARCHAR(100) NOT NULL,
  created_at  TIMESTAMP DEFAULT NOW()
);