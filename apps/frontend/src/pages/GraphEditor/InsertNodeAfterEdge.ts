import { Edge } from "reactflow";
import { NodeName, NodeProps } from "./Nodes";
import { generateEdge } from "./GenerateEdge";
import { generateNode } from "./GenerateNode";
import { Policy } from "./Graph";

/**
 * Returns the width and height of the node based on its type.
 */


export function insertNodeAfterEdge<SelectedNodeName extends NodeName>({
    edge,
    nodeName,
    edges,
    nodes,
    condition,
  }: {
    edge: Edge;
    nodeName: SelectedNodeName;
    edges: Edge[];
    nodes: any;
    condition: Policy;
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
        let comparisonSymbol = '';
      
        switch (condition.policy) {
          case "greater":
            comparisonSymbol = '>';
            break;
          case "greaterEqual":
            comparisonSymbol = '>=';
            break;
          case "lower":
            comparisonSymbol = '<';
            break;
          case "lowerEqual":
            comparisonSymbol = '<=';
            break;
          case "Equal":
            comparisonSymbol = '==';
            break;
          default:
            comparisonSymbol = ''; 
            break;
        }
      
        const newConditionalNode = generateNode({
          nodeName: "conditional",
          data: {
            label: `${condition.name} ${comparisonSymbol} ${condition.value}`
          }
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