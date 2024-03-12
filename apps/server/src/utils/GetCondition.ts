export default function GetCondition(data: any): string[] {
    // Array to store found labels
    const foundLabels: string[] = [];

    // Check if the provided data is a valid object
    if (typeof data !== 'object' || data === null) {
        throw new Error('Invalid data.');
    }

    // Traverse through the nodes and collect labels from nodes of type 'conditional'
    if (data.nodes && data.nodes.length > 0) {
        data.nodes.forEach((node: any) => {
            // Check if the node is of type 'conditional' and has a label
            if (node.type === 'conditional' && node.data && node.data.label) {
                // Push the label into the foundLabels array
                foundLabels.push(node.data.label);
            }
        });
    }

    // Return the array of found labels
    return foundLabels;
}
