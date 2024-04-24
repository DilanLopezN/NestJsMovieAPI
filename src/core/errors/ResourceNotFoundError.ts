export class ResourceNotFoundError extends Error {
  constructor(itemName: string) {
    super(`Resource ${itemName} not found`);
  }
}