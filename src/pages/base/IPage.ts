/**
 * IPage- interface contract for all page objects.
 *
 * Why this exists alongside BasePage:
 * - BasePage provides shared implementation (inheritence)
 * - IPage defines the contracts - what every page MUST expose
 * - Using 'implements makes the contract explicit and compiler-enforced
 * - If a page object forgets to implement a reqiured method,
 *   Typescript catches it at compile time - not at runtime.
 *
 * The difference between extends and implement a required method,
 * Typescript catches it at compile time = not at runtime.
 *
 * The difference between extends and implements:
 * - extends BasePage -> you GET the implementation for free
 * - implements IPage -> you PROMISE to provide the implementation yourself
 */
export interface IPage {
  /**
   * Navigate to this page.
   * Every page object must define its own URL and navigation logic.
   */
  navigate(): Promise<void>;

  /**
   * Get the current page title.
   */
  getTitle(): Promise<string>;

  /**
   * Get the current page URL
   */
  getCurrentUrl(): Promise<string>;
}
