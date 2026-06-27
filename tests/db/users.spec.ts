import { test, expect } from '@playwright/test';
import { UserRepository } from '@db/repositories/userRepository';
import { DbClient } from '@db/client';
import { DB_USERS } from '@utils/testData';

/**
 * Database layer tests - users table.
 *
 * What this demonstrates:
 * -Drect database validation using the Repository patter.
 * -Cross validation : API response data matches database state
 * -Test data cleanup in afterEach to keep tests independent
 *
 */
test.describe('Database - Users Table', () => {
  //Close the DB connection after all tests finish
  //This prevents the tests from hanging for the connection to close

  test.afterAll(async () => {
    await DbClient.disconnect();
  });

  //---Read operations---

  test('Return all seeded users from the database @smoke @db', async () => {
    const users = await UserRepository.getAll();

    expect(users.length).toBeGreaterThanOrEqual(DB_USERS.SEEDED_COUNT);

    const names = users.map((u) => u.name);
    expect(names).toContain(DB_USERS.JANE.name);
    expect(names).toContain(DB_USERS.JOHN.name);
    expect(names).toContain(DB_USERS.ALICE.name);
  });

  test('Return correct user count from the database @smoke @db', async () => {
    const user = await UserRepository.getByName(DB_USERS.JANE.name);
    expect(user).not.toBeNull();
    expect(user.name).toBe(DB_USERS.JANE.name);
    expect(user.job).toBe(DB_USERS.JANE.job);
    expect(user.id).toBeTruthy();
    expect(user.created_at).toBeTruthy();
  });

  test('Return null for a non-existent user @negative @db', async () => {
    const user = await UserRepository.getByName(DB_USERS.NON_EXISTENT.name);
    expect(user).toBeNull();
  });

  //--Write operations--
  test('Insert a new record and return the created record @regression @db', async () => {
    const created = await UserRepository.create(
      DB_USERS.NEW_USER.name,
      DB_USERS.NEW_USER.job
    );
    expect(created.name).toBe(DB_USERS.NEW_USER.name);
    expect(created.job).toBe(DB_USERS.NEW_USER.job);
    expect(created.id).toBeTruthy();
    expect(created.created_at).toBeTruthy();

    const fromDb = await UserRepository.getByName(DB_USERS.NEW_USER.name);
    expect(fromDb).not.toBeNull();
    expect(fromDb.name).toBe(DB_USERS.NEW_USER.name);
    expect(fromDb.job).toBe(DB_USERS.NEW_USER.job);

    await UserRepository.deleteByName(DB_USERS.NEW_USER.name);
  });

  test('delete a user by name @regression @db', async () => {
    await UserRepository.create(
      DB_USERS.DELETE_USER.name,
      DB_USERS.DELETE_USER.job
    );
    const before = await UserRepository.getByName(DB_USERS.DELETE_USER.name);
    expect(before).not.toBeNull();

    await UserRepository.deleteByName(DB_USERS.DELETE_USER.name);
    const after = await UserRepository.getByName(DB_USERS.DELETE_USER.name);
    expect(after).toBeNull();
  });
  //---Schema Validation---
  test('Retunr users with all expected fields @regression @db', async () => {
    const users = await UserRepository.getAll();

    for (const user of users) {
      expect(user).toHaveProperty('id');
      expect(user).toHaveProperty('name');
      expect(user).toHaveProperty('job');
      expect(user).toHaveProperty('created_at');
      expect(typeof user.id).toBe('number');
      expect(typeof user.name).toBe('string');
      expect(typeof user.job).toBe('string');
    }
  });
});
