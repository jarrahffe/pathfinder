import React from "react";

type NodeNetworkContext = {
  src: string
  setSrc: React.Dispatch<React.SetStateAction<string>>
  dest: string
  setDest: React.Dispatch<React.SetStateAction<string>>
  adjacencyList: Map<string, string[]>
  setAdjacencyList: React.Dispatch<React.SetStateAction<Map<string, string[]>>>;
  visited: Set<string>
  setVisited: React.Dispatch<React.SetStateAction<Set<string>>>
  backTracked: Set<string>
  setBackTracked: React.Dispatch<React.SetStateAction<Set<string>>>
}

export const NodeNetworkContext = React.createContext({} as NodeNetworkContext);
