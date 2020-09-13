import RequestStatus from './requestStatus';
import DBRequest from './dbRequest';
import DBAccount from './dbAccount';

interface HasLastUpdateTime {
  updateTime: Date
}

export interface myRequestAtSubmit extends HasLastUpdateTime {
  requestId: string,
  foodStation: string,
  orderNumber: string,
  created: Date,
  status: RequestStatus,
  // time
}

export interface myRequestAtFoundVolunteer extends HasLastUpdateTime {
  requestId: string,
  foodStation: string,
  orderNumber: string,
  created: Date,
  status: RequestStatus,
  // deliverer name
  //
}

export interface myRequestAtPickup extends HasLastUpdateTime {
  requestId: string,
  foodStation: string,
  orderNumber: string,
  created: Date,
  status: RequestStatus,
  // deliverer name
  // deliverer cell #
}

export interface myRequestAtDropoff extends HasLastUpdateTime {
  requestId: string,
  foodStation: string,
  orderNumber: string,
  created: Date,
  status: RequestStatus,
  // deliverer name
  // deliverer cell #
}

export interface myRequestAtAcknowledge extends HasLastUpdateTime {
  requestId: string,
  foodStation: string,
  orderNumber: string,
  created: Date,
  status: RequestStatus,

}

export interface myRequestAtFail extends HasLastUpdateTime {
  requestId: string,
  foodStation: string,
  orderNumber: string,
  created: Date,
  status: RequestStatus,

}

// no myDeliveryAtSubmit, as you can't deliver before accepting delivery.

export interface myDeliveryAtFoundVolunteer extends HasLastUpdateTime {
  requestId: string,
  fullName: string,
  foodStation: string,
  orderNumber: string,
  created: Date,
  status: RequestStatus,
  requesterCellPhone: string,
  hasAllergy: boolean,
  allergies?: string
}

export interface myDeliveryAtPickup extends HasLastUpdateTime {
  requestId: string,
  created: Date,
  status: RequestStatus,
  // delivery info
  // requester cell #
}

export interface myDeliveryAtDropoff extends HasLastUpdateTime {
  requestId: string,
  created: Date,
  status: RequestStatus,
  // requester cell #
}

export interface myDeliveryAtAcknowledge extends HasLastUpdateTime {
  requestId: string,
  created: Date,
  status: RequestStatus,
  // just time
}

export interface myDeliveryAtFail extends HasLastUpdateTime {
  requestId: string,
  created: Date,
  status: RequestStatus,
  // just time
}

export type myRequest = myRequestAtSubmit
                        | myRequestAtFoundVolunteer
                        | myRequestAtPickup
                        | myRequestAtDropoff
                        | myRequestAtAcknowledge
                        | myRequestAtFail
export type myDelivery = myDeliveryAtFoundVolunteer
                         | myDeliveryAtPickup
                         | myDeliveryAtDropoff
                         | myDeliveryAtAcknowledge
                         | myDeliveryAtFail
export type historyEntry = myRequest | myDelivery

export interface tempMyRequest {
  request: DBRequest,
  deliverer?: DBAccount
}

export interface tempMyDelivery {
  request: DBRequest,
  sender?: DBAccount
}

export type tempHistoryEntry = tempMyRequest | tempMyDelivery
// sender: string,
// senderInfo: PublicSenderInfo,
// foodStation: string,
// orderNumber: string,
// deliverer?: string,
// timePickup?: Date,
// timeDropoff?: Date,
// timeFinalized?: Date
// schemaVersion: string,
// foodStation: string,
