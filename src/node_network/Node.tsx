import React, { Component } from 'react'
import { NodeNetworkContext } from './NodeNetworkContext'
import { useSpring, animated } from '@react-spring/web';

type Props = {
  id: string
}

const Node = (props: Props) => {
  const { src, dest, visited, backTracked } = React.useContext(NodeNetworkContext);
  if (props.id === src || props.id === dest) {
    return <div id={props.id} className={props.id === src ? 'node-src' : 'node-dest'} />;
  }
  const [seen, setSeen] = React.useState(false);

  const [springs, api] = useSpring(() => ({
    from: { backgroundColor: 'white', transform: 'scale(100%)' },
  }));


  /* React.useEffect(() => {
    if ()
  }, [finished]) */

  React.useEffect(() => {
    if (!seen && visited.has(props.id)) {
      api.start({
        from: { backgroundColor: 'crimson', transform: 'scale(50%)' },
        to: { backgroundColor: 'violet', transform: 'scale(100%)' }
      })
      setSeen(true);
    }
  }, [visited]);

  React.useEffect(() => {
    if (seen && backTracked.has(props.id)) {
      api.start({
        from: { backgroundColor: 'yellow', transform: 'scale(50%)' },
        to: { backgroundColor: 'gold', transform: 'scale(100%)' }
      })
      setSeen(false);
    }
  }, [backTracked])

  return (
    <animated.div
      style={{
        width: '3vh',
        height: '3vh',
        borderRadius: '5px',
        position: 'relative',
        ...springs
      }}
    >
    </animated.div>
  )

}

export default Node;
