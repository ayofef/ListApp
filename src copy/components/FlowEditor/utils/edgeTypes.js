import { Edge, EdgeWithButton, EdgeWithIfElseButton } from '../components/Edge';
import { EdgeWithLabel } from '../components/Edge/EdgeWithLabel';

const edgeTypes = {
  default: Edge,
  edgeWithLabel: EdgeWithLabel,
  edgeWithButton: EdgeWithButton,
  edgeWithIfElseButton: EdgeWithIfElseButton,
};

export { edgeTypes };
