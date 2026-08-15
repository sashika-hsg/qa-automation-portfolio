import 'dotenv/config';
import { TestDataGenerator } from '@ai/TestDataGenerator';
import { logger } from '@utils/logger';

/**
 * CLI entry point for `npm run ai:generate-data`.
 * Generates a sample booking from a fixed scenario and prints it -
 * a quick manual smoke check that the Claude API wiring, schema
 * validation, and retry logic all work end to end.
 *
 * For actual test usage, call TestDataGenerator.generateBooking()
 * directly from test files rather than going through this CLI.
 */
async function main(): Promise<void> {
  const scenario = 'A weekend business trip booking with breakfast included';

  try {
    const booking = await TestDataGenerator.generateBooking(scenario);
    logger.info('Sample booking generated successfully', { booking });
  } catch (error) {
    logger.error('Failed to generate sample booking', {
      error: (error as Error).message,
    });
    process.exitCode = 1;
  }
}

main();
