import { DbClient } from '@db/client';
import { DbUser } from '@builders/UserBuilder';

/**
 * User repository - Repository patter.
 *
 * WHy Repository pattern here:
 * -Separates database query logic from test logic
 * _Tests call repository methods, not raw SQL
 * - If the schema changes , it is fixed here- not in every test file
 *
 * Usage:
 * const users = await UserRepositoy.getAll();
 * const user - await UserRepository.getName('Jabe Doe');
 */
export class UserRepository {
  /**
   * Get all users fromdatabase
   */
  static async getAll(): Promise<DbUser[]> {
    const db = await DbClient.getInstance();
    const result = await db.query('SELECT * FROM users ORDER BY id ASC');
    return result.rows;
  }
  /**
   * Get total count of users in the database.
   */
  static async getCount(): Promise<number> {
    const db = await DbClient.getInstance();
    const result = await db.query('SELECT COUNT(*) as count FROM users');
    return Number(result.rows[0].count);
  }

  /**
   * Generic query method - executes many sql and returns typed results.
   * Why generic constrain <T extends object>:
   * - <T> alone accepts anything - string, number, boolean, object
   * - <T extend object> - constraints T to object types only
   * - Database row aer always objects- primitives don't make sense here
   * - Typescritp will reject calls like query<string>() at compile time
   *
   * Usage:
   * const users await UserRepository.query<{name: string}>('SELECT name FROM users');
   *
   * @param sql 0 SQL query string
   * @param param - optional paramerterized query values
   */
  static async query<T extends object>(
    sql: string,
    params: unknown[] = []
  ): Promise<T[]> {
    const db = await DbClient.getInstance();
    const result = await db.query(sql, params);
    return result.rows as T[];
  }

  /**
   * Get a single user by name.
   */
  static async getByName(name: string): Promise<DbUser | null> {
    const db = await DbClient.getInstance();
    const result = await db.query('SELECT * FROM users WHERE name = $1', [
      name,
    ]);
    return result.rows[0] ?? null;
  }

  /**
   * Insert a new user and return the created record.
   */
  static async create(name: string, job: string): Promise<DbUser> {
    const db = await DbClient.getInstance();
    const result = await db.query(
      'INSERT INTO users(name, job) VALUES ($1, $2) RETURNING *',
      [name, job]
    );
    return result.rows[0];
  }

  /**
   * Delete a user by name. User for test cleanup
   */
  static async deleteByName(name: string): Promise<void> {
    const db = await DbClient.getInstance();
    await db.query('DELETE FROM users WHERE name =$1', [name]);
  }
}
