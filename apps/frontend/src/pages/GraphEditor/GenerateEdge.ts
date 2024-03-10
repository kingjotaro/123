import { Edge, MarkerType } from "reactflow";
import { generateUniqueNodeId } from "./GenerateUniqueNodeId";

export type PrefilledEdgeFields = "id" | "type" | "markerEnd";
export type EditableEdge = Omit<Edge, PrefilledEdgeFields>;





export function generateEdge(params: EditableEdge): Edge {
    const prefilledParams = {
      id: generateUniqueNodeId(),
      type: "add-node",
      markerEnd: {
        type: MarkerType.Arrow,
        height: 30,
        width: 20,
      },
    } satisfies Record<PrefilledEdgeFields, unknown>;
  
    return {
      ...params,
      ...prefilledParams,
    };
  }