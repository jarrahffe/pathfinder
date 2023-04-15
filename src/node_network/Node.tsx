import React, { Component } from 'react'
import { NodeNetworkContext } from './NodeNetworkContext'
import { useSpring, animated } from '@react-spring/web';

type Props = {
  id: string
}

const Node = (props: Props) => {
  const { src, dest, visited, backTracked, finished, mouseHeld, adjacencyList, setAdjacencyList, resetAll, resetPath } = React.useContext(NodeNetworkContext);
  if (props.id === src || props.id === dest) {
    return <div id={props.id} className={props.id === src ? 'node-src' : 'node-dest'} />;
  }
  const [seen, setSeen] = React.useState(false);
  const [isWall, setIsWall] = React.useState(false);
  const [lastClicked, setLastClicked] = React.useState(new Date().getTime());

  const [springs, api] = useSpring(() => ({
    from: { backgroundColor: 'white', transform: 'scale(100%)' },
  }));


  React.useEffect(() => {
    if (finished) {
      api.start({
        from: { backgroundColor: 'royalblue', transform: 'scale(0%)' },
        to: { backgroundColor: 'white', transform: 'scale(100%)' }
      })
      setSeen(false);
      setIsWall(false);
    }
  }, [resetAll])

  React.useEffect(() => {
    if (finished && (seen || springs.backgroundColor.get() === 'gold')) {
      api.start({
        from: { backgroundColor: 'royalblue', transform: 'scale(0%)' },
        to: { backgroundColor: 'white', transform: 'scale(100%)' }
      })
      setSeen(false);
    }
  }, [resetPath])

  React.useEffect(() => {
    if (!seen && visited.has(props.id)) {
      api.start({
        from: { backgroundColor: 'crimson', transform: 'scale(50%)' },
        to: { backgroundColor: 'blueviolet', transform: 'scale(100%)' }
      })
      setSeen(true);
    }
  }, [visited]);

  React.useEffect(() => {
    if (seen && backTracked.has(props.id)) {
      api.start({
        from: { backgroundColor: 'royalblue', transform: 'scale(50%)' },
        to: { backgroundColor: 'gold', transform: 'scale(100%)' }
      })
      setSeen(false);
    }
  }, [backTracked])

  const handleMouseDown = () => {
    const currentTime = new Date().getTime();
    if (lastClicked >= currentTime - 200) {
      return;
    }
    if (!(props.id === src && props.id === dest) && finished) {
      setLastClicked(currentTime);
      const idArray = props.id.split(":");
      const up = (parseInt(idArray[0]) - 1) + ":" + idArray[1];
      const down = (parseInt(idArray[0]) + 1) + ":" + idArray[1];
      const left = idArray[0] + ":" + (parseInt(idArray[1]) - 1);
      const right = idArray[0] + ":" + (parseInt(idArray[1]) + 1);

      const neighbourArr = [];
      neighbourArr.push(up);
      neighbourArr.push(down);
      neighbourArr.push(left);
      neighbourArr.push(right);

      const adjacencyListCopy = new Map(adjacencyList);

      if (isWall) {
        for (const neighbour of neighbourArr) {
          adjacencyListCopy.get(neighbour)?.push(props.id);
        }
      }
      else {
        for (const neighbour of neighbourArr) {
          adjacencyListCopy.set(neighbour, adjacencyListCopy.get(neighbour)?.filter((nodeId) => {
            return nodeId !== props.id;
          }) as string[])
        }
      }
      setAdjacencyList(adjacencyListCopy);

      api.start({
        from: { backgroundColor: isWall ? 'black' : 'white', transform: 'scale(50%)' },
        to: { backgroundColor: isWall ? 'white' : 'black', transform: 'scale(100%)' }
      })
      setIsWall(!isWall);
      setSeen(false);
    }
  }

  const handleMouseOver = () => {
    if (mouseHeld.current === true) {
      handleMouseDown();
    }
  }


  return (
    <animated.div
      onMouseDown={() => handleMouseDown()}
      onMouseOver={() => handleMouseOver()}
      style={{
        width: '3vh',
        height: '3vh',
        borderRadius: '5px',
        position: 'relative',
        cursor: 'pointer',
        ...springs
      }}
    >
    </animated.div>
  )

}

export default Node;
