export class UserAlreadyExitsError extends Error {
  constructor(itemName: string) {
    super(`User : ${itemName} already exists`);
  }
}