export default function applyConditions(data, conditions) {
    // Check if the object and the conditions array are valid
    if (typeof data !== 'object' || !Array.isArray(conditions)) {
        throw new Error('Invalid input data.');
    }

    let finalResult = true; // Start as true, if at least one condition is missing, it will remain true

    // Iterate over each condition in the conditions array
    conditions.forEach(condition => {
        const { name, operator, value } = condition;

        // Check if the key of the condition exists in the data object
        if (data.hasOwnProperty(name)) {
            // Convert the property value to a number, if possible
            const dataValue = parseFloat(data[name]);
            const conditionValue = parseFloat(value);

            let comparisonResult = false;

            // Perform the comparison based on the operator
            switch (operator) {
                case '>':
                    comparisonResult = dataValue > conditionValue;
                    break;
                case '>=':
                    comparisonResult = dataValue >= conditionValue;
                    break;
                case '<':
                    comparisonResult = dataValue < conditionValue;
                    break;
                case '<=':
                    comparisonResult = dataValue <= conditionValue;
                    break;
                case '==':
                    comparisonResult = dataValue === conditionValue;
                    break;
                default:
                    throw new Error('Invalid operator.');
            }

            // Update the final result based on the current comparison
            finalResult = finalResult && comparisonResult;
        }
    });

    return finalResult;
}
