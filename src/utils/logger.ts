/**
 * Logger -structured loggin utility with level based verbosity control.
 *
 * Why this exists:
 *  - Replaces ad-hoc statements with consistent, leveled output
 *  - Verboeity contolled via LOG_LEVEL env var - no clode changes needed
 *  between local debugging and CI runs
 *  - Console-only by design - GitHub Actions already persistes stdout/stderr
 *  asthe job log, so a separate file-logging layer would duplicate
 *  somthing the CI environment provides for free
 *
 * @example
 * import  {logger } from '@utils/logger';
 * logger.debug('Fetching booking from DB', {bokingId});
 * logging.info('Test suite started');
 * logger.warn('Retrying after transient API error', {attempt, delay});
 * logger.error('Schema validation failed', {errors}');
 *
 * Verbosity (LOG_LEVEL env var):
 *  - debug - everything
 *  - info - info, warn, error(default)
 *  - warn - warn, error only (useful for quiet CI runs)
 *  - error - error only
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

/**
 * Numeric rank per level so "should this print" is a single comparison
 * rather than a branching if/else chain. Adding a new level later is a
 * one-line change here.
 */

const LEVEL_RANK: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

function resolveConfiguredLevel(): LogLevel {
  const raw = (process.env.LOG_LEVEL ?? 'info').toLowerCase();
  if (raw === 'debug' || raw === 'info' || raw === 'warn' || raw === 'error') {
    return raw;
  }

  //Invalid value in env - fall back safely rather than crashing test runs
  //eslint-disable-next-line no-console
  console.warn(
    `[logger] Unrecognised LOG_LEVEL "${raw}", defaulting to "info"`
  );
  return 'info';
}
const confgiguredLevel = resolveConfiguredLevel();

function shouldLog(level: LogLevel): boolean {
  return LEVEL_RANK[level] >= LEVEL_RANK[confgiguredLevel];
}
function timestamp(): string {
  return new Date().toISOString();
}

/**
 * Formats optional structured context as compact JSON.
 * Kept simple deliberately - no external dependency, no nested pretty-printing.
 */
function formatContext(context?: Record<string, unknown>): string {
  if (!context || Object.keys(context).length === 0) {
    return '';
  }
  try {
    return ' ' + JSON.stringify(context);
  } catch {
    return ' [unseriable context]';
  }
}

function log(
  level: LogLevel,
  message: string,
  context?: Record<string, unknown>
): void {
  if (!shouldLog(level)) {
    return;
  }
  const line = `[${timestamp()}] [${level.toUpperCase()}] ${message}${formatContext(context)}`;
  switch (level) {
    case 'error':
      //eslint-disable-next-line no-console
      console.error(line);
      break;
    case 'warn':
      //eslint-disable-next-line no-console
      console.warn(line);
      break;
    default:
      //eslint-disable-next-line no-console
      console.warn(line);
      break;
  }
}
export const logger = {
  debug: (message: string, context?: Record<string, unknown>): void =>
    log('debug', message, context),
  info: (message: string, context?: Record<string, unknown>): void =>
    log('info', message, context),
  warn: (message: string, context?: Record<string, unknown>): void =>
    log('warn', message, context),
  error: (message: string, context?: Record<string, unknown>): void =>
    log('error', message, context),
};
