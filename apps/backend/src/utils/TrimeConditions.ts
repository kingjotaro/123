export default function TrimeConditions(stringArray: string[]): { name: string, operator: string, value: string }[] {
    const results: { name: string, operator: string, value: string }[] = [];

    if (!Array.isArray(stringArray)) {
        throw new Error('The provided argument is not an array.');
    }

    stringArray.forEach(condition => {
        // Use a regular expression to separate the string into name, operator, and value
        const matches = condition.match(/([a-zA-Z\s]+)\s*(<=|>=|==|<|>)\s*(\d+)/);

        if (matches && matches.length === 4) {
            const name = matches[1].trim();
            const operator = matches[2].trim();
            const value = matches[3].trim();

            // Perform some operation with the data (e.g., print to console)
            console.log('Condition name:', name);
            console.log('Operator:', operator);
            console.log('Value:', value);

            // Store the results in an object
            results.push({ name, operator, value });
        } else {
            console.error(`Invalid condition: ${condition}`);
        }
    });

    return results;
}
