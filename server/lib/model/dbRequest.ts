import RequestStatus from './requestStatus';

export default interface DBRequest {
  schemaVersion: string,
  requestId: string,
  sender: string,
  foodStation: string,
  orderNumber: string,
  created: Date,
  status: RequestStatus,
  deliverer?: string
}
