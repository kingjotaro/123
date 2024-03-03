import { nanoid } from "nanoid";
import { Edge } from "reactflow";



type PrefilledEdgeFields = "id" | "type" | "markerEnd";
export type EditableEdge = Omit<Edge, PrefilledEdgeFields>;

export type PrefilledNodeDataFields = "width" | "height";

export function generateUniqueNodeId() {
  const arbitraryButShortIdLength = 10;
  return nanoid(arbitraryButShortIdLength);
}



