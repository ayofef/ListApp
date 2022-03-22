import { graphlib, layout } from 'dagre';
import { isNode } from 'react-flow-renderer';

const dagreGraph = new graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const X_OFFSET = 360;
const Y_OFFSET = 60;

const NODE_HEIGHT_OFFSET = 100;
const NODE_WIDTH_OFFSET = 250;

export const getLayoutedElements = (elements, direction = 'LR') => {
  const isHorizontal = direction === 'LR';
  dagreGraph.setGraph({ rankdir: direction });
  elements.forEach((el) => {
    if (isNode(el)) {
      dagreGraph.setNode(el.id, { width: NODE_WIDTH_OFFSET, height: NODE_HEIGHT_OFFSET });
    } else {
      dagreGraph.setEdge(el.source, el.target);
    }
  });
  layout(dagreGraph);
  return elements.map((el) => {
    if (!isNode(el)) return el;
    const nodeWithPosition = dagreGraph.node(el.id);

    return {
      ...el,
      targetPosition: isHorizontal ? 'left' : 'top',
      sourcePosition: isHorizontal ? 'right' : 'bottom',
      // unfortunately we need this little hack to pass a slightly different position
      // in order to notify react flow about the change
      position: {
        x: el?.position?.x || X_OFFSET + nodeWithPosition.x,
        y: el?.position?.y || Y_OFFSET + nodeWithPosition.y,
      },
    };
  });
};
