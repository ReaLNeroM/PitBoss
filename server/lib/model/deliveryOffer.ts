import Ajv from 'ajv';

const deliveryOfferSchema = require('../schema/deliveryOffer');

export default interface DeliveryOffer {
  requestId: string
}

export function validateDeliveryOffer(json: DeliveryOffer): boolean {
  const ajv = new Ajv();

  return ajv.validate(
    deliveryOfferSchema,
    json,
  )
         && json.requestId.toString().trim() !== '';
}
