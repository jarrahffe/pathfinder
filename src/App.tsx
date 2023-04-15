import React from 'react';
import './App.css'
import './node_network/NodeNetwork.css';
import Node from './node_network/Node';
import NodeNetwork from './node_network/NodeNetwork'
import { NodeNetworkContext } from './node_network/NodeNetworkContext';
import Menu from './menu/Menu';


function App() {
  const [src, setSrc] = React.useState("10:9");
  const [dest, setDest] = React.useState("10:30");
  const [adjacencyList, setAdjacencyList] = React.useState(new Map<string, string[]>());
  const [visited, setVisited] = React.useState(new Set<string>());
  const [backTracked, setBackTracked] = React.useState(new Set<string>());
  const [finished, setFinished] = React.useState(true);
  const mouseHeld = React.useRef(false);
  const [resetAll, setResetAll] = React.useState(false);
  const [resetPath, setResetPath] = React.useState(false);
  const contextVal = React.useMemo(() => ({ src, setSrc, dest, setDest, adjacencyList, setAdjacencyList, visited, setVisited, backTracked, setBackTracked, finished, setFinished, mouseHeld, resetAll, setResetAll, resetPath, setResetPath }),
    [src, setSrc, dest, setDest, adjacencyList, setAdjacencyList, visited, setVisited, backTracked, setBackTracked, finished, setFinished, mouseHeld, resetAll, resetPath])

  React.useEffect(() => {
    /* const handler = () => {
      setMouseHeld(true);
      setTimeout(() => {
        if (mouseHeldRef.current === true) {
          setMouseHeld(true);
          console.log("mouse held")
        }
      }, 100);
    } */
    window.addEventListener('mousedown', () => {
      mouseHeld.current = true;
      console.log("held")
    })
  }, [])

  React.useEffect(() => {
    window.addEventListener('mouseup', () => {
      mouseHeld.current = false;
      console.log("mouse not held")
    });
  }, [])

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
