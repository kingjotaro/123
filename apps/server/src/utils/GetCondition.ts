/**
 * Retrieves labels from nodes of type 'conditional' in the provided data object.
 * @param data The object containing nodes to search for labels.
 * @returns An array of labels found in nodes of type 'conditional'.
 * @throws Error if the provided data is not a valid object.
 */
export default function GetCondition(data: any): string[] {
    
    const foundLabels: string[] = [];

    // Check if the provided data is a valid object
    if (typeof data !== 'object' || data === null) {
        throw new Error('Invalid data.');
    }

    // Traverse through the nodes and collect labels from nodes of type 'conditional'
    if (data.nodes && data.nodes.length > 0) {
        data.nodes.forEach((node: any) => {
            if (node.type === 'conditional' && node.data && node.data.label) {
                foundLabels.push(node.data.label);
            }
        });
    }

    return foundLabels;
}
