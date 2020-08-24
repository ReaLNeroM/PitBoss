import DBAccount from '../model/dbAccount';
import DBRequest from '../model/dbRequest';
import PublicRequest from '../model/publicRequest';

export default interface DB {
  findUserById(userId: string): Promise<DBAccount | Error>;
  findUserByEmail(email: string): Promise<DBAccount | Error>;
  existsUserWithEmail(email: string): Promise<boolean | Error>;
  insertAccount(account: DBAccount): Promise<Error | undefined>;
  getOpenRequests(): Promise<Array<DBRequest> | Error>;
  getRequestById(requestId: string): Promise<DBRequest | Error>;
  getRequestsDeliveredById(userId: string): Promise<Array<PublicRequest> | Error>;
  getRequestsFromId(userId: string): Promise<Array<DBRequest> | Error>;
  insertRequest(request: DBRequest): Promise<Error | undefined>;
  updateRequest(request: DBRequest): Promise<Error | undefined>;
}
