import Ajv from 'ajv';

const requestSchema = require('../schema/request');

export interface Request {
  schemaVersion: string,
  foodStation: string,
  orderNumber: string
}

export function validateRequest(json: Request): boolean {
  const ajv = new Ajv();

  return ajv.validate(
    requestSchema,
    json,
  )
         && json.schemaVersion.toString().trim() !== ''
         && json.foodStation.toString().trim() !== ''
         && json.orderNumber.toString().trim() !== '';
}

export default Request;
