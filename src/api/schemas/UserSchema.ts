/**
 * JSON Schema for a single ReqRes user object.
 * Used with AJV to validate API response structure.
 *
 * Example user object from ReqRes:
 * {
 *   "id": 2,
 *   "email": "janet.weaver@reqres.in",
 *   "first_name": "Janet",
 *   "last_name": "Weaver",
 *   "avatar": "https://reqres.in/img/faces/2-image.jpg"
 * }
 */
export const userSchema = {
  type: 'object',
  properties: {
    id: { type: 'number' },
    email: { type: 'string' },
    first_name: { type: 'string' },
    last_name: { type: 'string' },
    avatar: { type: 'string' },
  },
  required: ['id', 'email', 'first_name', 'last_name', 'avatar'],
  additionalProperties: false,
} as const;

/**
 * JSON Schema for the GET /api/users (list) response.
 * Wraps userSchema in pagination metadata.
 */
export const userListSchema = {
  type: 'object',
  properties: {
    page: { type: 'number' },
    per_page: { type: 'number' },
    total: { type: 'number' },
    total_pages: { type: 'number' },
    data: {
      type: 'array',
      items: userSchema,
    },
  },
  required: ['page', 'per_page', 'total', 'total_pages', 'data'],
} as const;

/**
 * JSON Schema for GET /api/users/:id (single user) response.
 * ReqRes wraps the user object in a "data" key, with extra "support" info.
 */
export const singleUserSchema = {
  type: 'object',
  properties: {
    data: userSchema,
    support: {
      type: 'object',
      properties: {
        url: { type: 'string' },
        text: { type: 'string' },
      },
      required: ['url', 'text'],
    },
  },
  required: ['data', 'support'],
} as const;

/**
 * JSON Schema for POST /api/users (create) response.
 * ReqRes returns the submitted fields plus a generated id and createdAt.
 */
export const createUserResponseSchema = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    job: { type: 'string' },
    id: { type: 'string' },
    createdAt: { type: 'string' },
  },
  required: ['name', 'job', 'id', 'createdAt'],
} as const;
