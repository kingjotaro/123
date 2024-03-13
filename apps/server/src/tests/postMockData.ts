function randomNumber() {
    const random = Math.floor(Math.random() * (999 - 100 + 1)) + 100;
    return random.toString();
}

const label = "teste > " + randomNumber();

export const PostMockData = {
    name: "teste",
    nodes: [
        {
            id: "start",
            type: "start",
            position: { x: 0, y: 0 },
            data: { width: 80, height: 80 }
        },
        {
            id: "Ee7-",
            type: "end",
            position: { x: 70, y: 370 },
            data: { width: 80, height: 80 }
        },
        {
            id: "hQNd",
            type: "end",
            position: { x: -70, y: 370 },
            data: { width: 80, height: 80 }
        },
        {
            id: "MY3v",
            type: "conditional",
            position: { x: -40, y: 140 },
            data: { label: label, width: 160, height: 100 }
        }
    ],
    edges: [
        {
            source: "start",
            target: "MY3v",
            id: "DZwC",
            type: "add-node",
            markerEnd: { type: "arrow", height: 30, width: 20 }
        },
        {
            source: "MY3v",
            target: "hQNd",
            label: "True",
            id: "ST-e",
            type: "add-node",
            markerEnd: { type: "arrow", height: 30, width: 20 }
        },
        {
            source: "MY3v",
            target: "Ee7-",
            label: "False",
            id: "7vl_",
            type: "add-node",
            markerEnd: { type: "arrow", height: 30, width: 20 }
        }
    ]
};
