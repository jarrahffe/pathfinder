import React from 'react'
import Node from './Node';
import { NodeNetworkContext } from './NodeNetworkContext';

const NodeNetwork = () => {
  const { setAdjacencyList } = React.useContext(NodeNetworkContext);
  const nodes: JSX.Element[] = [];

  const rows = 20;
  const cols = 40;

  for (let i = 0; i < rows; ++i) {
    for (let j = 0; j < cols; ++j) {
      const newNode = `${i}:${j}`;
      nodes.push(<Node id={newNode} key={newNode} />);
    }
  }

  React.useEffect(() => {
    const adjacencyList = new Map<string, string[]>;
    for (let i = 0; i < rows; ++i) {
      for (let j = 0; j < cols; ++j) {
        const newNode = `${i}:${j}`, up = `${i - 1}:${j}`, down = `${i + 1}:${j}`,
          left = `${i}:${j - 1}`, right = `${i}:${j + 1}`;

        // top left corner
        if (i === 0 && j === 0) {
          adjacencyList.has(down) ? adjacencyList.get(down)?.push(newNode) : adjacencyList.set(down, [newNode]);
          adjacencyList.has(right) ? adjacencyList.get(right)?.push(newNode) : adjacencyList.set(right, [newNode]);
        }
        // top right corner
        else if (i === 0 && j === cols - 1) {
          adjacencyList.has(left) ? adjacencyList.get(left)?.push(newNode) : adjacencyList.set(left, [newNode]);
          adjacencyList.has(down) ? adjacencyList.get(down)?.push(newNode) : adjacencyList.set(down, [newNode]);
        }
        // bottom left corner
        else if (i === rows - 1 && j === 0) {
          adjacencyList.has(up) ? adjacencyList.get(up)?.push(newNode) : adjacencyList.set(up, [newNode]);
          adjacencyList.has(right) ? adjacencyList.get(right)?.push(newNode) : adjacencyList.set(right, [newNode]);
        }
        // bottom right corner
        else if (i === rows - 1 && j === cols - 1) {
          adjacencyList.has(up) ? adjacencyList.get(up)?.push(newNode) : adjacencyList.set(up, [newNode]);
          adjacencyList.has(left) ? adjacencyList.get(left)?.push(newNode) : adjacencyList.set(left, [newNode]);
        }
        // top edge
        else if (i === 0) {
          adjacencyList.has(left) ? adjacencyList.get(left)?.push(newNode) : adjacencyList.set(left, [newNode]);
          adjacencyList.has(down) ? adjacencyList.get(down)?.push(newNode) : adjacencyList.set(down, [newNode]);
          adjacencyList.has(right) ? adjacencyList.get(right)?.push(newNode) : adjacencyList.set(right, [newNode]);
        }
        // left edge
        else if (j === 0) {
          adjacencyList.has(up) ? adjacencyList.get(up)?.push(newNode) : adjacencyList.set(up, [newNode]);
          adjacencyList.has(down) ? adjacencyList.get(down)?.push(newNode) : adjacencyList.set(down, [newNode]);
          adjacencyList.has(right) ? adjacencyList.get(right)?.push(newNode) : adjacencyList.set(right, [newNode]);
        }
        // bottom edge 
        else if (i === rows - 1) {
          adjacencyList.has(up) ? adjacencyList.get(up)?.push(newNode) : adjacencyList.set(up, [newNode]);
          adjacencyList.has(left) ? adjacencyList.get(left)?.push(newNode) : adjacencyList.set(left, [newNode]);
          adjacencyList.has(right) ? adjacencyList.get(right)?.push(newNode) : adjacencyList.set(right, [newNode]);
        }
        // right edge 
        else if (j === cols - 1) {
          adjacencyList.has(up) ? adjacencyList.get(up)?.push(newNode) : adjacencyList.set(up, [newNode]);
          adjacencyList.has(left) ? adjacencyList.get(left)?.push(newNode) : adjacencyList.set(left, [newNode]);
          adjacencyList.has(down) ? adjacencyList.get(down)?.push(newNode) : adjacencyList.set(down, [newNode]);
        }
        // anything else 
        else {
          adjacencyList.has(down) ? adjacencyList.get(down)?.push(newNode) : adjacencyList.set(down, [newNode]);
          adjacencyList.has(left) ? adjacencyList.get(left)?.push(newNode) : adjacencyList.set(left, [newNode]);
          adjacencyList.has(up) ? adjacencyList.get(up)?.push(newNode) : adjacencyList.set(up, [newNode]);
          adjacencyList.has(right) ? adjacencyList.get(right)?.push(newNode) : adjacencyList.set(right, [newNode]);
        }
      }
    }
    setAdjacencyList(adjacencyList);
  }, []);

  return (
    <div className='node-network'>
      {nodes}
    </div>
  )
}
export default NodeNetwork;
