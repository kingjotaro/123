import { Node } from "reactflow";
import { generateUniqueNodeId } from "./generateUniqueNodeId";
import { NodeData, NodeName } from "./Nodes";
import { getNodeDimensions } from "./getNodeDimensions";

export type PrefilledNodeDataFields = "width" | "height";


/**
 * Generates an edge with pre-filled properties such id, type, and the
 * properties passed.
 * @param params Editable parameters of the edge, including data.
 * @returns Edge
 */



export function generateNode<SelectedNodeName extends NodeName>({
    nodeName,
    data,
    id,
  }: {
    nodeName: SelectedNodeName;
    data?: Partial<Omit<NodeData<SelectedNodeName>, PrefilledNodeDataFields>>;
    id?: SelectedNodeName extends "start" ? string : never;
  }): Node<NodeData<SelectedNodeName>> {
    const willBePositionedLater = { x: 0, y: 0 };
  
    return {
      id: id ?? generateUniqueNodeId(),
      type: nodeName,
      position: willBePositionedLater,
      data: {
        ...data,
        ...getNodeDimensions(nodeName),
      },
    };
  }