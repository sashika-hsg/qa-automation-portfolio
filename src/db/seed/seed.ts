import { DbClient } from '@db/client';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Seed script- runss migrations and inserts test data.
 * Called via: npm run db:seed
 *
 * Why we seed:
 * -Tests need a known, preditacble database state
 * - Seeding ensures the same data exists before every test run
 */
async function seed() {
  const db = await DbClient.getInstance();

  console.log('Running migrations...');

  //Read and execure the SQL migration file
  const migrationPath = path.join(
    __dirname,
    '../migrations/001_create_users.sql'
  );
  const migration = fs.readFileSync(migrationPath, 'utf-8');
  await db.query(migration);

  console.log('Migratons complete');
  console.log('Seeding users...');

  //Clar existing data so seeds are idempotent
  //(safe to run multiple times without duplicate data)
  await db.query('DELETE FROM users');

  //Insert test users
  await db.query(`
    INSERT INTO users (name, job) VALUES
    ('Jane Doe', 'QA Engineer'),
    ('John Smith', 'Software Engineer'),
    ('Alice Brown', 'Product Manager')
  `);

  console.log('Seeding complete. 3 users inserted.');
  await DbClient.disconnect();
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
