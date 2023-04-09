import React from 'react'
import { NodeNetworkContext } from '../node_network/NodeNetworkContext';
import { Queue } from 'typescript-collections';

const Menu = () => {
  const { src, dest, adjacencyList, visited, setVisited, setBackTracked } = React.useContext(NodeNetworkContext);
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
    adjNodes = adjNodes?.sort((a, b) => b.localeCompare(a));

    for (const node of adjNodes as string[]) {
      if (!visitedLocal.has(node) && dfs(node)) {
        backtrackArr.push(srcLocal);
        return true;
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
      adjNodes = adjNodes?.sort((a, b) => b.localeCompare(a));

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

  }

  return (
    <div>
      <button onClick={() => {
        visitedLocal = new Set<string>;
        visitedArr = [];
        backtrackArr = [];
        dfs(src);
        simulate();
      }} />

      <button onClick={() => {
        visitedLocal = new Set<string>;
        visitedArr = [];
        backtrackArr = [];
        bfs();
        simulate();
      }} />

      <button onClick={() => {
        setSpeed(0)
      }} />
      <button onClick={() => {
        setSpeed(1)
      }} />
      <button onClick={() => {
        setSpeed(50)
      }} />
      <button onClick={() => {
        setSpeed(100)
      }} />
      <button onClick={() => {
        setSpeed(200)
      }} />

    </div>
  )
}


function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default Menu;
