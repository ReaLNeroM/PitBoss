import * as monk from 'monk';
import DB from './db';
import DBAccount from '../model/dbAccount';
import DBRequest from '../model/dbRequest';
import PublicRequest from '../model/publicRequest';

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
      }).catch(error => {
        return error;
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
      }).catch(error => {
        return error;
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
      }).catch(error => {
        return error;
      });
  }

  insertAccount(account: DBAccount): Promise<Error | undefined> {
    return this.accounts.insert(account).catch(error => {
      return error;
    });
  }

  getOpenRequests(): Promise<Array<DBRequest> | Error> {
    return this.requests.find().catch(error => {
      return error;
    });
  }

  getRequestById(requestId: string): Promise<DBRequest | Error> {
    return this.requests
      .find({ requestId })
      .then((obtainedRequests: Array<DBRequest>) => {
        if(obtainedRequests.length === 0){
          return new Error('No such request found.');
        } else if(obtainedRequests.length > 1){
          return new Error('More than one request with the same id. Please report this bug!');
        }

        return obtainedRequests[0];
      }).catch(error => {
        return error;
      });
  }

  getRequestsDeliveredById(userId: string): Promise<Array<PublicRequest> | Error> {
    return this.requests
      .find({ deliverer: userId })
      .catch(error => {
        return error;
      })
  }

  getRequestsFromId(userId: string): Promise<Array<DBRequest> | Error> {
    return this.requests
      .find({ sender: userId })
      .catch(error => {
        return error;
      })
  }

  insertRequest(request: DBRequest): Promise<Error | undefined> {
    return this.requests.insert(request).catch(error => {
      return error
    });
  }

  updateRequest(request: DBRequest): Promise<Error | undefined> {
    return this.requests.remove(
      { requestId: request.requestId },
      { justOne: true }
    ).then(result => {
      console.log(result);
      return this.requests.insert(request);
    }).catch(error => {
      return error;
    });
  }
}
