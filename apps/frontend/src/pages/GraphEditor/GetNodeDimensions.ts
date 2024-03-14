import { NodeName } from "./Nodes";

export function getNodeDimensions(nodeName: NodeName) {
    // Make node dimensions a multiple of this size in order to make nodes align
    // with the grid and thus make debugging easier.
    const gridUnitSize = 20;
  
    switch (nodeName) {
      case "conditional":
        return {
          width: 8 * gridUnitSize,
          height: 5 * gridUnitSize,
        };
      default:
        return {
          width: 4 * gridUnitSize,
          height: 4 * gridUnitSize,
        };
    }
  }