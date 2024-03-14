/**
 * Parses an array of strings representing conditions and extracts the name, operator, and value components.
 * @param stringArray An array of strings representing conditions in the format "name operator value".
 * @returns An array of objects containing the parsed conditions, with properties 'name', 'operator', and 'value'.
 * @throws Error if the provided argument is not an array or if any condition is in an invalid format.
 */
export default function TrimeConditions(stringArray: string[]): { name: string, operator: string, value: string }[] {
    const results: { name: string, operator: string, value: string }[] = [];

    if (!Array.isArray(stringArray)) {
        throw new Error('The provided argument is not an array.');
    }

    stringArray.forEach(condition => {
        // Use a regular expression to separate the string into name, operator, and value
        const matches = condition.match(/([a-zA-Z\s]+)\s*(<=|>=|==|<|>)\s*(\d+)/);

        // Check if the matches array has the expected length (3 groups + 1 for the whole match)
        if (matches && matches.length === 4) {
            const name = matches[1].trim();
            const operator = matches[2].trim();
            const value = matches[3].trim();

            // Log the parsed components
            console.log('Condition name:', name);
            console.log('Operator:', operator);
            console.log('Value:', value);

            // Store the parsed components in an object and add it to the results array
            results.push({ name, operator, value });
        } else {
            // Log an error message if the condition is in an invalid format
            console.error(`Invalid condition: ${condition}`);
        }
    });

    // Return the array of parsed conditions
    return results;
}
