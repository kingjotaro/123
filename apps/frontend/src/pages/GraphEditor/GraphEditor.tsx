import "reactflow/dist/style.css";
import { SetStateAction, useCallback, useContext, useEffect, useRef, useState } from "react";
import ReactFlow, { Background } from "reactflow";
import { AddNodeEdge } from "./AddNodeEdge";
import { CurrentDrawer } from "./Drawers";
import { EditorProvider } from "./Editor";
import { GraphProvider, graph } from "./Graph";
import { allNodes } from "./Nodes";
import { generateEdge } from './GenerateEdge'
import { positionNodes } from "./PositionNodes";
import { generateNode } from "./GenerateNode";
import DownloadAllPolicyButton from "@src/components/DownloadAllPolicyButton";
import UploadPolicyButton from "@src/components/UploadPolicyButton";
import TestButton from "@src/components/TestButton";

const edgeTypes = {
  "add-node": AddNodeEdge,
};

/**
 * Main component for the ReactFlow sandbox.
 */
function ReactFlowSandbox() {
  const {
    nodes,
    edges,
    reactFlowInstance,
    setReactFlowInstance,
    fitZoomToGraph,
    setNodes,
    setEdges,
  } = useContext(graph);

  const [selectedObjectName, setSelectedObjectName] = useState('');
  const [centeredGraphAtStart, setCenteredGraphAtStart] = useState(false);
  const reactFlowRef = useRef<HTMLDivElement>(null);

  /**
   * Try to center the graph at the start.
   */
  const tryCenteringGraph = useCallback(() => {
    if (centeredGraphAtStart) {
      return;
    }

    fitZoomToGraph(reactFlowRef);

    const viewport = reactFlowInstance?.getViewport();
    if (viewport && viewport.x !== 0 && viewport.y !== 0) {
      return setCenteredGraphAtStart(true);
    }

    const retryTimeInMs = 50;
    setTimeout(() => tryCenteringGraph(), retryTimeInMs);
  }, [centeredGraphAtStart, fitZoomToGraph, reactFlowInstance]);

  useEffect(() => {
    tryCenteringGraph();
  }, [tryCenteringGraph]);

  useEffect(() => {
    const initialNodes = [
      generateNode({ nodeName: "start", id: "start" }),
      generateNode({ nodeName: "end" }),
    ];
    const initialEdges = [
      generateEdge({
        source: "start",
        target: initialNodes[1].id,
      }),
    ];
    const [positionedNodes, positionedEdges] = positionNodes(
      initialNodes,
      initialEdges
    );
    setNodes(positionedNodes);
    setEdges(positionedEdges);
  }, []);

  return (
    <div className="h-full flex flex-row overflow-hidden w-full relative">
      <div className="flex flex-col items-center p-2">
        <DownloadAllPolicyButton selectedObjectName={selectedObjectName} setSelectedObjectName={setSelectedObjectName}></DownloadAllPolicyButton>
        <UploadPolicyButton/>
        <TestButton selectedObjectName={selectedObjectName} setSelectedObjectName={setSelectedObjectName}></TestButton>
      </div>
      <ReactFlow
        ref={reactFlowRef}
        nodes={nodes}
        edges={edges}
        edgeTypes={edgeTypes}
        nodeTypes={allNodes}
        onInit={setReactFlowInstance}
        nodesDraggable={false}
        deleteKeyCode={null}
      >
        <Background className="bg-N-75" size={2} color="#C1C4D6" />
      </ReactFlow>
      <CurrentDrawer />
    </div>
  );
}

/**
 * Main component for the Graph Editor.
 */
export function GraphEditor() {
  return (
    <EditorProvider>
      <GraphProvider>
        <ReactFlowSandbox />
      </GraphProvider>
    </EditorProvider>
  );
}
