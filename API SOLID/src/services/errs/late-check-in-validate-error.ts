export class LateCheckInValidateError extends Error {
  constructor() {
    super('Check In can only be validated 20 minutes of its creation.')
  }
}
