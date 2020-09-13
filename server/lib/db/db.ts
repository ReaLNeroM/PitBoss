import DBAccount from '../model/dbAccount';
import DBRequest from '../model/dbRequest';
import { tempMyRequest, tempMyDelivery } from '../model/historyEntry';

export interface DB {
  findUserById(userId: string): Promise<DBAccount | Error>;
  findUserByEmail(email: string): Promise<DBAccount | Error>;
  existsUserWithEmail(email: string): Promise<boolean | Error>;
  insertAccount(account: DBAccount): Promise<Error | undefined>;
  getOpenRequests(): Promise<Array<DBRequest> | Error>;
  getRequestById(requestId: string): Promise<DBRequest | Error>;
  getDeliveriesFromUser(userId: string): Promise<Array<tempMyDelivery> | Error>;
  getRequestsFromUser(userId: string): Promise<Array<tempMyRequest> | Error>;
  insertRequest(request: DBRequest): Promise<Error | undefined>;
  updateRequest(request: DBRequest): Promise<Error | undefined>;
}

export default DB;
