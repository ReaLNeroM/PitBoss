export default interface DBAccount {
  schemaVersion: string,
  userId: string,
  fullName: string,
  dormAndRoom: string,
  email: string,
  hashedPassword: string
  hasAllergy: boolean,
  allergies?: string
}
