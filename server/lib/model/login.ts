import Ajv from 'ajv';

const loginSchema = require('../schema/login');

export default interface Login {
  email: string,
  password: string
}

export function validateLogin(json: Login): boolean {
  const ajv = new Ajv();

  return ajv.validate(
    loginSchema,
    json,
  ) && json.email.toString().trim() !== ''
         && json.password.toString() !== '' && json.password.toString().length > 6;
}
