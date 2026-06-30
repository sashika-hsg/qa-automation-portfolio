import { DB_USERS } from '@utils/testData';

/**
 * User Buider - Builder pattern for constructing user test data.
 *
 * Why the patter is used:
 * -DB tests need users with differnt combinations of name and job
 * -Makes test intent explicit - see what the test is about
 * -Replaces passing raw strings to UserRepository.create()
 *
 * Usage:
 * const user = new UserBuilder().build();
 * const user = new UserBuilder().withName('John').withJob('Developer').build();
 * const user = new UserBuilder().asQAWngineer().build();
 */
export interface DbUser {
  id?: number;
  name: string;
  job: string;
  created_at?: Date;
}

export class UserBuilder {
  private name: string = DB_USERS.NEW_USER.name;
  private job: string = DB_USERS.NEW_USER.job;

  withName(name: string): this {
    this.name = name;
    return this;
  }
  withJob(job: string): this {
    this.job = job;
    return this;
  }
  /**
   * Present - a QA Engineer user.
   */
  asQAEngineer(): this {
    this.name = DB_USERS.JANE.name;
    this.job = DB_USERS.JANE.job;
    return this;
  }
  /**
   * Present - a temporary user for delete tests.
   */
  asTemporaryUser(): this {
    this.name = DB_USERS.DELETE_USER.name;
    this.job = DB_USERS.DELETE_USER.job;
    return this;
  }
  build(): DbUser {
    return {
      name: this.name,
      job: this.job,
    };
  }
}
