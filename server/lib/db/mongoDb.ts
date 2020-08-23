import * as monk from 'monk';
import DB from './db';
import DBAccount from '../model/dbAccount';
import DBRequest from '../model/dbRequest';

export default class MongoDB implements DB {
    requests: monk.ICollection

    accounts: monk.ICollection

    constructor(mongoInstance: monk.IMonkManager) {
      this.requests = mongoInstance.get('requests');
      this.accounts = mongoInstance.get('accounts');
    }

    findUserById(userId: string): Promise<DBAccount | Error> {
      return this.accounts
        .find({ userId })
        .then((obtainedAccounts: Array<DBAccount>) => {
          if (obtainedAccounts.length === 0) {
            return new Error('No such user found.');
          } if (obtainedAccounts.length !== 1) {
            return new Error('More than one user with the same ID. Please report this bug!');
          }

          return obtainedAccounts[0];
        });
    }

    findUserByEmail(email: string): Promise<DBAccount | Error> {
      return this.accounts
        .find({ email })
        .then((obtainedAccounts: Array<DBAccount>) => {
          if (obtainedAccounts.length === 0) {
            return new Error('No such user found.');
          } if (obtainedAccounts.length !== 1) {
            return new Error('More than one user with the same email. Please report this bug!');
          }

          return obtainedAccounts[0];
        });
    }

    existsUserWithEmail(email: string): Promise<boolean | Error> {
      return this.accounts
        .find({ email })
        .then((obtainedAccounts: Array<DBAccount>) => {
          if (obtainedAccounts.length > 1) {
            return new Error('More than one user with the same email. Please report this bug!');
          }

          return obtainedAccounts.length === 1;
        });
    }

    insertAccount(account: DBAccount): Promise<Error | undefined> {
      return this.accounts.insert(account);
    }

    getRequests(): Promise<Array<DBRequest> | Error> {
      return this.requests.find();
    }

    insertRequest(request: DBRequest): Promise<Error | undefined> {
      return this.requests.insert(request);
    }
}
