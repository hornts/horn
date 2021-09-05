import { Node } from '../../../lib/di/dependency-graph/node';

describe('DependencyGraph:Node', () => {
  it('should create node', () => {
    const node = new Node(1);

    expect(node).toBeInstanceOf(Node);
    expect(node.getData()).toBe(1);
  });
});
