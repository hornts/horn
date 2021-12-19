import { Node } from '../../../lib/di/dependency-graph/node';
import { Injectable } from '../../../lib/di/injectable';

describe('DependencyGraph:Node', () => {
  it('should create node', () => {
    class Service {}

    const service = new Injectable(Service);

    const node = new Node(service);

    expect(node).toBeInstanceOf(Node);
    expect(node.getData()).toBe(service);
  });
});
