import * as monk from 'monk';
import DB from './db';
import DBAccount from '../model/dbAccount';
import DBRequest from '../model/dbRequest';
import { tempMyDelivery, tempMyRequest } from '../model/historyEntry';

export class MongoDB implements DB {
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
      }).catch((error) => error);
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
      }).catch((error) => error);
  }

  existsUserWithEmail(email: string): Promise<boolean | Error> {
    return this.accounts
      .find({ email })
      .then((obtainedAccounts: Array<DBAccount>) => {
        if (obtainedAccounts.length > 1) {
          return new Error('More than one user with the same email. Please report this bug!');
        }

        return obtainedAccounts.length === 1;
      }).catch((error) => error);
  }

  insertAccount(account: DBAccount): Promise<Error | undefined> {
    return this.accounts.insert(account).catch((error) => error);
  }

  getOpenRequests(): Promise<Array<DBRequest> | Error> {
    return this.requests.find().catch((error) => error);
  }

  getRequestById(requestId: string): Promise<DBRequest | Error> {
    return this.requests
      .find({ requestId })
      .then((obtainedRequests: Array<DBRequest>) => {
        if (obtainedRequests.length === 0) {
          return new Error('No such request found.');
        } if (obtainedRequests.length > 1) {
          return new Error('More than one request with the same id. Please report this bug!');
        }

        return obtainedRequests[0];
      }).catch((error) => error);
  }

  async getDeliveriesFromUser(userId: string): Promise<Array<tempMyDelivery> | Error> {
    const deliveries: Array<DBRequest> = await this.requests.find({ deliverer: userId });

    const senders: Array<DBAccount | Error> = await Promise.all(
      deliveries.map((delivery: DBRequest) => this.findUserById(delivery.sender)),
    );

    const result: Array<tempMyDelivery> = [];
    for (let i = 0; i < deliveries.length; i += 1) {
      if (senders[i] instanceof Error) {
        return senders[i] as Error;
      }
      result.push({
        request: deliveries[i],
        sender: senders[i],
      } as tempMyDelivery);
    }

    return result;
  }

  async getRequestsFromUser(userId: string): Promise<Array<tempMyRequest> | Error> {
    const requests: Array<DBRequest> = await this.requests.find({ sender: userId });

    const deliverers: Array<DBAccount | null | Error> = await Promise.all(
      requests.map((request: DBRequest) => {
        if (request.deliverer) {
          return this.findUserById(request.deliverer);
        }

        return null;
      }),
    );

    const result: Array<tempMyRequest> = [];
    for (let i = 0; i < requests.length; i += 1) {
      if (deliverers[i] instanceof Error) {
        return deliverers[i] as Error;
      }
      if (deliverers[i]) {
        result.push({
          request: requests[i],
          deliverer: deliverers[i],
        } as tempMyRequest);
      } else {
        result.push({
          request: requests[i],
        } as tempMyRequest);
      }
    }

    return result;
  }

  insertRequest(request: DBRequest): Promise<Error | undefined> {
    return this.requests.insert(request).catch((error) => error);
  }

  updateRequest(request: DBRequest): Promise<Error | undefined> {
    return this.requests.remove(
      { requestId: request.requestId },
      { justOne: true },
    )
      .then(() => this.requests.insert(request))
      .catch((error) => error);
  }
}

export default MongoDB;
