import { Edge } from "reactflow";
import { NodeName, NodeProps } from "./Nodes";
import { generateEdge } from "./generateEdge";
import { generateNode } from "./generateNode";


/**
 * Returns the width and height of the node based on its type.
 */


export function insertNodeAfterEdge<SelectedNodeName extends NodeName>({
    edge,
    nodeName,
    edges,
    nodes,
    x,
  }: {
    edge: Edge;
    nodeName: SelectedNodeName;
    edges: Edge[];
    nodes: any;
    x: string;
  }): { addedNode: NodeProps<SelectedNodeName>; nodes: any; edges: Edge[] } {
    let addedNode = {};
    let returnNodes = null;
    let returnEdges = null;
  
    switch (nodeName) {
      // End nodes can't be added by Users, so they are never placed between two
      // nodes, they're always at the end. Their edge is always a new edge.
      case "end": {
        const newEndNode = generateNode({
          nodeName: "end",
        });
        const newEdge = generateEdge({
          source: edge.source,
          target: newEndNode.id,
        });
  
        addedNode = newEndNode;
        returnNodes = [...nodes, newEndNode];
        returnEdges = [...edges, newEdge];
        break;
      }
      case "conditional": {
        const newConditionalNode = generateNode({
          nodeName: "conditional",
          data: {
            label: `${x}`,
          },
        });
  
        const newEndNodes = {
          branch: generateNode({ nodeName: "end" }),
        };
  
        const newEdges = [
          generateEdge({
            source: newConditionalNode.id,
            target: newEndNodes.branch.id,
            label: "True",
          }),
          generateEdge({
            source: newConditionalNode.id,
            target: edge.target,
            label: "False",
          }),
        ];
  
        const updatedExistingEdges = edges.map((e) => {
          if (e.id === edge.id) {
            return { ...e, target: newConditionalNode.id };
          }
          return e;
        });
  
        const newNodes = [newEndNodes.branch, newConditionalNode];
        addedNode = newConditionalNode;
        returnNodes = [...nodes, ...newNodes];
        returnEdges = [...updatedExistingEdges, ...newEdges];
        break;
      }
    }
  
    return {
      addedNode: addedNode as NodeProps<SelectedNodeName>,
      nodes: returnNodes as Node[],
      edges: returnEdges as Edge[],
    };
  }