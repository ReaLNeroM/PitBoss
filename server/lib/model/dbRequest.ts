export default interface DBRequest {
  schemaVersion: string,
  requestId: string,
  sender: string,
  foodStation: string,
  orderNumber: string,
  created: Date,
  status: string,
  deliverer?: string
}
