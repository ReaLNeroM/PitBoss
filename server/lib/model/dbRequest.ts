import RequestStatus from './requestStatus';

export interface DBRequest {
  schemaVersion: string,
  requestId: string,
  sender: string,
  foodStation: string,
  orderNumber: string,
  created: Date,
  status: RequestStatus,
  lastUpdate: Date,

  deliverer?: string,
  timeDelivererFound?: Date,

  timePickup?: Date,

  timeDropoff?: Date,

  timeAcknowledged?: Date,

  timeFailed?: Date,
  failReason?: string
}

export default DBRequest;
