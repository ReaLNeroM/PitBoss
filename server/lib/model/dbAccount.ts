export default interface DBAccount {
  schemaVersion: string,
  userId: string,
  fullName: string,
  dormAndRoom: string,
  email: string,
  // TODO(maksimovski): Add phone number.
  hashedPassword: string
  hasAllergy: boolean,
  allergies?: string
}
