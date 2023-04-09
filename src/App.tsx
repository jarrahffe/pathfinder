import React from 'react';
import './App.css'
import './node_network/NodeNetwork.css';
import Node from './node_network/Node';
import NodeNetwork from './node_network/NodeNetwork'
import { NodeNetworkContext } from './node_network/NodeNetworkContext';
import Algorithm from './algorithm/Algorithm';
import Menu from './menu/Menu';

function App() {
  const [src, setSrc] = React.useState("10:9");
  const [dest, setDest] = React.useState("10:30");
  const [adjacencyList, setAdjacencyList] = React.useState(new Map<string, string[]>());
  const [visited, setVisited] = React.useState(new Set<string>());
  const [backTracked, setBackTracked] = React.useState(new Set<string>());
  const contextVal = React.useMemo(() => ({ src, setSrc, dest, setDest, adjacencyList, setAdjacencyList, visited, setVisited, backTracked, setBackTracked }),
    [src, setSrc, dest, setDest, adjacencyList, setAdjacencyList, visited, setVisited, backTracked, setBackTracked])

  /*   const algorithm = new Algorithm(src, dest, adjacencyList); */

  return (
    <NodeNetworkContext.Provider value={contextVal}>
      <div>
        <div>
          <Menu />
        </div>
        <div className='node-network-container'>
          <NodeNetwork />
        </div>
      </div>
    </NodeNetworkContext.Provider>
  )
}

export default App
