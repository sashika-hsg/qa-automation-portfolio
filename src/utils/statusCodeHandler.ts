/**
 * StatusCodeHandler - maps HTTPS status codes to descriptions
 * and categories using a switch statement.
 *
 *Usage:
 const description = StatusCodeHandler.getDescription(200);
 const category = StatusCodeHandler.getCategory(404);
 const isSuccess = StatusCodeHandler.isSuccess(201);
 */
export class StatusCodeHandler {
  /**
   * Returns a human-readable description for a given HTTP status code.
   * @param statusCode - HTTP status code
   * @returns description string
   */
  static getDescription(statusCode: number): string {
    switch (statusCode) {
      case 200:
        return 'OK - request succeeded';
      case 201:
        return 'Created - resource successfully created';
      case 204:
        return 'No Content — request succeeded with no response body';
      case 400:
        return 'Bad Request — invalid request syntax or parameters';
      case 401:
        return 'Unauthorized — authentication required';
      case 403:
        return 'Forbidden — authenticated but not authorised';
      case 404:
        return 'Not Found — resource does not exist';
      case 409:
        return 'Conflict — resource already exists';
      case 422:
        return 'Unprocessable Entity — validation failed';
      case 500:
        return 'Internal Server Error — server-side failure';
      case 503:
        return 'Service Unavailable — server temporarily unavailable';
      default:
        return `Unknown status code: ${statusCode}`;
    }
  }
  /**
   * Returns the category of a status code.
   * Uses integer division to determine the category.
   * @param statusCode - HTTP status code
   * @returns category string
   */
  static getCategory(statusCode: number): string {
    switch (Math.floor(statusCode / 100)) {
      case 2:
        return 'success';
      case 3:
        return 'redirection';
      case 4:
        return 'client-error';
      case 5:
        return 'server-error';
      default:
        return 'unknown';
    }
  }

  /**
   * Returns true if the status code indicates success (2xx).
   * @param statusCode = HTTP status code
   */
  static isSuccess(statusCode: number): boolean {
    return StatusCodeHandler.getCategory(statusCode) === 'success';
  }

  /**
   * Returns true if the status code indicates a client error (4xx).
   * @param statusCode - HTTP status code
   */
  static isClientError(statusCode: number): boolean {
    return StatusCodeHandler.getCategory(statusCode) === 'client-error';
  }

  /**
   * Returns true if the status code indicates a server error
   * @param statusCode - HTTP status code
   */
  static isServerError(statusCode: number): boolean {
    return StatusCodeHandler.getCategory(statusCode) === 'server-error';
  }
}
