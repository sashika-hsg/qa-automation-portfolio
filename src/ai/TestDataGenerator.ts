import Anthropic from '@anthropic-ai/sdk';
import Ajv from 'ajv';
import { Booking } from '@models/Booking';
import { logger } from '@utils/logger';

/**
 * AI-powered test data generator using Claude API.
 *
 * Why this exists:
 * - Static test data (hardcoded constants) is predictable and limited
 * - AI generates contextually appropriate, varied data per scenario
 * - AJV validation ensures generated data is always valid before use
 * - Demonstrates AI integration in a QA automation framework
 *
 * Flow:
 * Scenario description → Claude API (with retry) → Raw JSON →
 * defensive parsing → AJV validation → business-rule checks → Valid booking
 */

const client = new Anthropic({
  apiKey: process.env.CLAUDE_API_KEY,
});

const ajv = new Ajv();

// AJV schema matching Restful Booker booking structure
const bookingSchema = {
  type: 'object',
  properties: {
    firstname: { type: 'string', minLength: 1 },
    lastname: { type: 'string', minLength: 1 },
    totalprice: { type: 'number', minimum: 50, maximum: 500 },
    depositpaid: { type: 'boolean' },
    bookingdates: {
      type: 'object',
      properties: {
        checkin: { type: 'string', pattern: '^\\d{4}-\\d{2}-\\d{2}$' },
        checkout: { type: 'string', pattern: '^\\d{4}-\\d{2}-\\d{2}$' },
      },
      required: ['checkin', 'checkout'],
    },
    additionalneeds: {
      type: 'string',
      enum: ['Breakfast', 'Lunch', 'Dinner', 'None'],
    },
  },
  required: [
    'firstname',
    'lastname',
    'totalprice',
    'depositpaid',
    'bookingdates',
    'additionalneeds',
  ],
  additionalProperties: false,
};

const validate = ajv.compile(bookingSchema);

// Retry configuration
const MAX_RETRIES = 3;
const BASE_DELAY_MS = 1000;

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Determines whether an error is worth retrying.
 * - 429 (rate limit) and 5xx (server errors) are transient — retry
 * - 400/401/403 (bad request, auth) are not — fail fast
 */
function isRetryableError(error: unknown): boolean {
  if (error instanceof Anthropic.APIError) {
    return (
      error.status === 429 ||
      (error.status !== undefined && error.status >= 500)
    );
  }
  return false;
}

/**
 * Strips markdown code fences if Claude wraps the JSON despite instructions.
 * Never trust prompt-only formatting constraints in production code.
 */
function stripMarkdownFences(text: string): string {
  return text
    .trim()
    .replace(/^```(?:json)?\s*/i, '')
    .replace(/```\s*$/i, '')
    .trim();
}

export class TestDataGenerator {
  /**
   * Generate a booking using Claude AI, with retry on transient failures.
   * @param scenario - description of the booking scenario
   * @returns Valid booking object matching Restful Booker schema
   */
  static async generateBooking(scenario: string): Promise<Booking> {
    let lastError: unknown;

    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
      try {
        return await this.callClaudeAndValidate(scenario);
      } catch (error) {
        lastError = error;

        const retryable = isRetryableError(error);
        const isLastAttempt = attempt === MAX_RETRIES;

        if (!retryable || isLastAttempt) {
          throw error;
        }

        // Exponential backoff: 1s, 2s, 4s
        const delay = BASE_DELAY_MS * Math.pow(2, attempt - 1);
        logger.warn('Claude API call failed, retrying', {
          attempt,
          maxRetries: MAX_RETRIES,
          delayMs: delay,
          error: (error as Error).message,
        });
        await sleep(delay);
      }
    }

    // Unreachable, but keeps TypeScript happy
    throw lastError;
  }

  /**
   * Single attempt: call Claude, parse response, validate against schema
   * and business rules. Throws on any failure — caller handles retry.
   */
  private static async callClaudeAndValidate(
    scenario: string
  ): Promise<Booking> {
    const prompt = `Generate a Restful Booker hotel booking in JSON format.
Scenario: ${scenario}
Requirements:
- firstname and lastname must be realistic names
- totalprice must be a number between 50 and 500
- depositpaid must be true or false
- checkin must be a future date in YYYY-MM-DD format
- checkout must be after checkin by at least 1 day
- additionalneeds must be one of: Breakfast, Lunch, Dinner, None
Return ONLY valid JSON matching this exact schema. No explanation. No markdown. JSON only:
{
  "firstname": string,
  "lastname": string,
  "totalprice": number,
  "depositpaid": boolean,
  "bookingdates": {
    "checkin": string,
    "checkout": string
  },
  "additionalneeds": string
}`;

    logger.debug('Requesting booking from Claude', { scenario });

    const message = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 1024,
      messages: [{ role: 'user', content: prompt }],
    });

    const content = message.content[0];
    if (content.type !== 'text') {
      throw new Error('Unexpected response type from Claude API');
    }

    // Defensive parsing — strip markdown fences even though we asked Claude not to add them
    const jsonText = stripMarkdownFences(content.text);

    let booking: Booking;
    try {
      booking = JSON.parse(jsonText);
    } catch {
      throw new Error(`Claude returned invalid JSON: ${content.text}`);
    }

    // Schema validation (structure, types, enums)
    const valid = validate(booking);
    if (!valid) {
      throw new Error(
        `AI-generated booking failed schema validation: ${JSON.stringify(validate.errors)}`
      );
    }

    // Business-rule validation AJV can't express: checkout must be after checkin
    const checkin = new Date(booking.bookingdates.checkin);
    const checkout = new Date(booking.bookingdates.checkout);
    if (checkout <= checkin) {
      throw new Error(
        `Invalid date range: checkout (${booking.bookingdates.checkout}) ` +
          `must be after checkin (${booking.bookingdates.checkin})`
      );
    }

    // checkin must actually be in the future, not just before checkout —
    // Claude doesn't reliably know "today" from the prompt alone
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (checkin < today) {
      throw new Error(
        `Invalid checkin date: ${booking.bookingdates.checkin} is in the past ` +
          `(today is ${today.toISOString().split('T')[0]})`
      );
    }

    logger.info('Generated valid booking via Claude API', {
      firstname: booking.firstname,
      lastname: booking.lastname,
    });

    return booking;
  }
}
