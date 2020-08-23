import Ajv from 'ajv';

const registrationSchema = require('../schema/registration');

export default interface Registration {
  schemaVersion: string,
  fullName: string,
  dormAndRoom: string,
  email: string,
  password: string
  hasAllergy: boolean,
  allergies?: string
}

export function validateRegistration(json: Registration): boolean {
  const ajv = new Ajv();

  return ajv.validate(
    registrationSchema,
    json,
  )
         && json.schemaVersion.toString().trim() !== ''
         && json.fullName.toString().trim() !== ''
         && json.dormAndRoom.toString().trim() !== ''
         && json.email.toString().trim() !== ''
         && json.password.toString() !== '' && json.password.toString().length > 6;
}
