interface NodeData {
    id: string;
    type: string;
    position: {
        x: number;
        y: number;
    };
    data: {
        width: number;
        height: number;
    };
}

interface EdgeData {
    source: string;
    target: string;
    label?: string;
    id: string;
    type: string;
    markerEnd: {
        type: string;
        height: number;
        width: number;
    };
}

export default interface PostRequestBody {
    name: string;
    nodes: NodeData[];
    edges: EdgeData[];
}