/**
 * Represents dependency graph node.
 */
export class Node<T> {
  constructor(private readonly data: T) {}

  public getData(): T {
    return this.data;
  }
}
