import { Node } from '../components/Node';
import { StartTestNode } from '../components/Node/StartTestNode';
import { CompletedTestNode } from '../components/Node/CompletedTestNode';
import { UserDecisionNode } from '../components/Node/UserDecisionNode';

const NODE_TYPE = {
  basic: 'basic',
  startTest: 'startTest',
  completedTest: 'completedTest',
  userDecision: 'userDecision',
};

const NODE_TYPE_ID = {
  testNode: 'test-node',
  decisionNode: 'decision-node',
  completedNode: 'completed-node',
};

const EDGE_TYPE_ID = {
  testEdge: 'test-edge',
  completedEdge: 'completed-edge',
};

const nodeTypes = {
  basic: Node,
  startTest: StartTestNode,
  completedTest: CompletedTestNode,
  userDecision: UserDecisionNode,
};

export { NODE_TYPE, NODE_TYPE_ID, EDGE_TYPE_ID, nodeTypes };
