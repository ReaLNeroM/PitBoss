import DBAccount from '../model/dbAccount';
import DBRequest from '../model/dbRequest';

export default interface DB {
  findUserById(userId: string): Promise<DBAccount | Error>;
  findUserByEmail(email: string): Promise<DBAccount | Error>;
  existsUserWithEmail(email: string): Promise<boolean | Error>;
  insertAccount(account: DBAccount): Promise<Error | undefined>;
  getRequests(): Promise<Array<DBRequest> | Error>;
  insertRequest(request: DBRequest): Promise<Error | undefined>;
}
