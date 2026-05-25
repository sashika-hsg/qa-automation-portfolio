/**
 * @fileoverview Test result models for the QA Automation Portfolio.
 * Used for Allure reporting, CloudWatch metrics, and test analytics.
 */

/**
 * Represents the status of a test execution.
 * Used across all test types — UI, API, and DB.
 */
export enum TestStatus {
  PASSED = 'passed',
  FAILED = 'failed',
  SKIPPED = 'skipped',
  PENDING = 'pending',
}

/**
 * Represents the severity of a test case.
 * Maps directly to Allure severity levels.
 */
export enum TestSeverity {
  BLOCKER = 'blocker',
  CRITICAL = 'critical',
  NORMAL = 'normal',
  MINOR = 'minor',
  TRIVIAL = 'trivial',
}

/**
 * Represents the category of a test.
 * Used for filtering and reporting.
 */
export enum TestCategory {
  UI = 'ui',
  API = 'api',
  DATABASE = 'database',
  SECURITY = 'security',
  PERFORMANCE = 'performance',
  GRAPHQL = 'graphql',
}

/**
 * Represents a single test result.
 * Captured after each test execution.
 * Used for Allure reporting and CloudWatch metrics.
 */
export interface TestResult {
  testName: string;
  status: TestStatus;
  duration: number;
  category: TestCategory;
  severity: TestSeverity;
  errorMessage?: string;
  stackTrace?: string;
  runDate: Date;
}

/**
 * Represents a full test suite run result.
 * Aggregates all individual test results.
 * Used for CloudWatch dashboard metrics.
 */
export interface TestSuiteResult {
  suiteName: string;
  totalTests: number;
  passed: number;
  failed: number;
  skipped: number;
  duration: number;
  passRate: number;
  runDate: Date;
  results: TestResult[];
}

/**
 * Represents CloudWatch metric data for a test run.
 * Sent to AWS CloudWatch after each CI pipeline run.
 */
export interface CloudWatchMetric {
  metricName: string;
  value: number;
  unit: 'Count' | 'Milliseconds' | 'Percent';
  dimensions: Record<string, string>;
}
