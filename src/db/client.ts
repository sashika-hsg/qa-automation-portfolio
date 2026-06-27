import { Client } from 'pg';

export class DbClient {
  private static instance: Client | null = null;

  static async getInstance(): Promise<Client> {
    if (!DbClient.instance) {
      DbClient.instance = new Client({
        host: process.env.DB_HOST ?? 'localhost',
        port: Number(process.env.DB_PORT ?? 5432),
        user: process.env.DB_USER ?? 'qa_user',
        password: process.env.DB_PASSWORD ?? 'qa_password',
        database: process.env.DB_NAME ?? 'qa_db',
      });
      await DbClient.instance.connect();
    }
    return DbClient.instance;
  }

  static async disconnect(): Promise<void> {
    if (DbClient.instance) {
      await DbClient.instance.end();
      DbClient.instance = null;
    }
  }
}
