export class CircularDependency extends Error {
  constructor(message: string) {
    super(message);
  }
}
