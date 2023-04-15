import React from 'react'
import { NodeNetworkContext } from '../node_network/NodeNetworkContext';
import { Queue } from 'typescript-collections';
import { generateAdjacencyList } from '../node_network/NodeNetwork';

const Menu = () => {
  const { src, dest, setSrc, setDest, adjacencyList, setAdjacencyList, visited, setVisited, setBackTracked, setFinished, resetAll, setResetAll, resetPath, setResetPath } = React.useContext(NodeNetworkContext);
  const [speed, setSpeed] = React.useState(1);

  let visitedLocal: Set<string>;
  let visitedArr: Array<string>;
  let backtrackArr: Array<string>;

  const dfs = (srcLocal: string) => {
    if (srcLocal === dest) {
      return true;
    }

    visitedLocal.add(srcLocal);
    visitedArr.push(srcLocal);

    let adjNodes = adjacencyList.get(srcLocal);
    /*     adjNodes = adjNodes?.sort((a, b) => b.localeCompare(a)); */

    for (const node of adjNodes as string[]) {
      if (!visitedLocal.has(node) && dfs(node)) {
        backtrackArr.push(srcLocal);
        return true;
      }
    }
  }

  const randomDfs = (srcLocal: string) => {
    if (srcLocal === dest) {
      return true;
    }

    visitedLocal.add(srcLocal);
    visitedArr.push(srcLocal);

    let adjNodes = adjacencyList.get(srcLocal);
    /*     adjNodes = adjNodes?.sort((a, b) => b.localeCompare(a)); */

    for (const node of adjNodes as string[]) {
      const chance = Math.random() * 100;
      if (chance > 50) {
        if (!visitedLocal.has(node) && dfs(node)) {
          backtrackArr.push(srcLocal);
          return true;
        }
      }
    }
  }

  const bfs = () => {
    const q = new Queue<string>;
    const backtracker = new Map<string, string>;
    q.enqueue(src);

    while (!q.isEmpty()) {
      const first: string = q.dequeue() as string;
      if (first === dest) {
        let parent = backtracker.get(first) as string;
        while (parent !== src) {
          backtrackArr.push(parent);
          parent = backtracker.get(parent) as string;
        }
        return true;
      }
      visitedArr.push(first);

      let adjNodes = adjacencyList.get(first);
      /*       adjNodes = adjNodes?.sort((a, b) => b.localeCompare(a)); */

      for (const node of adjNodes as string[]) {
        if (!visitedLocal.has(node)) {
          backtracker.set(node, first);
          visitedLocal.add(node);
          q.enqueue(node);
        }
      }
    }
  }

  async function simulate() {
    setFinished(false);
    let idfk = new Set<string>;
    for (const node of visitedArr) {
      if (speed !== 0) {
        await sleep(speed);
      }
      idfk.add(node);
      const temp = new Set<string>(idfk);
      setVisited(temp);
    }
    idfk = new Set<string>;
    for (const node of backtrackArr) {
      await sleep(1);
      idfk.add(node);
      const temp = new Set<string>(idfk);
      setBackTracked(temp);
    }
    setFinished(true);
  }

  return (
    <div>
      <button onClick={() => {
        visitedLocal = new Set<string>;
        visitedArr = [];
        backtrackArr = [];
        dfs(src);
        simulate();
      }} >
        run dfs
      </button>

      <button onClick={() => {
        visitedLocal = new Set<string>;
        visitedArr = [];
        backtrackArr = [];
        bfs();
        simulate();
      }}>
        run bfs
      </button>

      <button onClick={() => {
        setSpeed(0)
      }}>
        set speed to instant
      </button>

      <button onClick={() => {
        setSpeed(1)
      }} >
        set speed fast
      </button>

      <button onClick={() => {
        setSpeed(100)
      }} >
        set speed medium
      </button>

      <button onClick={() => {
        setResetPath(!resetPath);
      }} >
        reset path
      </button>

      <button onClick={() => {
        setResetAll(!resetAll);
        setAdjacencyList(generateAdjacencyList());
      }} >
        reset all
      </button>

      <button onClick={() => {
        setSrc("19:0");
        setDest("0:39");
        visitedLocal = new Set<string>;
        visitedArr = [];
        backtrackArr = [];
        randomDfs(src);
        simulate();
      }} >
        generate random maze
      </button>

      <button onClick={() => {
        setSrc("10:9");
        setDest("10:30");
      }} >
        reset source/dest default
      </button>

    </div>
  )
}


function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default Menu;
