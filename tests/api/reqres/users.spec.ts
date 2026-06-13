import { test, expect } from '@playwright/test';
import Ajv from 'ajv';
import { ReqResClient } from '@api/clients/ReqResClient';
import {
  userListSchema,
  singleUserSchema,
  createUserResponseSchema,
} from '../../../src/api/schemas/UserSchema';
import { STATUS_CODES } from '../../../src/utils/statusCodes';
import { REQRES_TEST_USER, REQRES_USERS } from '@utils/testData';

const ajv = new Ajv();

test.describe('ReqRes- Users API', () => {
  test('Get a list of users with valid schema @smoke @critical', async ({
    request,
  }) => {
    const client = new ReqResClient(request);
    const response = await client.getUsers(2);
    expect(response.status()).toBe(200);

    const responseBody = await response.json();
    const validateUserListSchema = ajv.compile(userListSchema);
    const isSchemaValid = validateUserListSchema(responseBody);

    expect(isSchemaValid, JSON.stringify(validateUserListSchema.errors)).toBe(
      true
    );
  });

  test('Get a single user by userId @smoke @critical', async ({ request }) => {
    const client = new ReqResClient(request);
    const response = await client.getUserById(2);
    expect(response.status()).toBe(STATUS_CODES.OK);

    const responseBody = await response.json();
    const validateUserListSchema = ajv.compile(singleUserSchema);
    const isSchemaValid = validateUserListSchema(responseBody);

    expect(isSchemaValid).toBe(true);
    expect(responseBody.data.id).toBe(REQRES_USERS.EXISTING_USER_ID);
  });

  test('A 404 is returned for a non existent user', async ({ request }) => {
    const client = new ReqResClient(request);
    const response = await client.getUserById(
      REQRES_USERS.NON_EXISTENT_USER_ID
    );
    expect(response.status()).toBe(STATUS_CODES.NOT_FOUND);
  });

  test('Create a new user @smoke @critical', async ({ request }) => {
    const client = new ReqResClient(request);
    const response = await client.createUser(
      REQRES_TEST_USER.NAME,
      REQRES_TEST_USER.JOB
    );
    expect(response.status()).toBe(STATUS_CODES.CREATED);

    const responseBody = await response.json();

    const validateCreateUserSchema = ajv.compile(createUserResponseSchema);
    const isSchemaValid = validateCreateUserSchema(responseBody);

    expect(isSchemaValid).toBe(true);
    expect(responseBody.name).toBe(REQRES_TEST_USER.NAME);
    expect(responseBody.job).toBe(REQRES_TEST_USER.JOB);
  });

  test('Update all details of a user with PUT request @regression', async ({
    request,
  }) => {
    const client = new ReqResClient(request);
    const response = await client.updateUser(
      REQRES_USERS.EXISTING_USER_ID,
      REQRES_TEST_USER.NAME,
      REQRES_TEST_USER.UPDATED_JOB_FULL
    );
    expect(response.status()).toBe(STATUS_CODES.OK);
    const responseBody = await response.json();

    expect(responseBody.name).toBe(REQRES_TEST_USER.NAME);
    expect(responseBody.job).toBe(REQRES_TEST_USER.UPDATED_JOB_FULL);
  });

  test('Update details partially with a patch request', async ({ request }) => {
    const client = new ReqResClient(request);
    const response = await client.updateUserJob(
      REQRES_USERS.EXISTING_USER_ID,
      REQRES_TEST_USER.UPDATED_JOB_PARTIAL
    );
    expect(response.status()).toBe(STATUS_CODES.OK);
    const responseBody = await response.json();
    expect(responseBody.job).toBe(REQRES_TEST_USER.UPDATED_JOB_PARTIAL);
  });

  test('Deletion of an existing user @regression @critical', async ({
    request,
  }) => {
    const client = new ReqResClient(request);
    const response = await client.deleteUser(REQRES_USERS.EXISTING_USER_ID);
    expect(response.status()).toBe(STATUS_CODES.OK);
  });
});
