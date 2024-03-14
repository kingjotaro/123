/**
 * Checks if the provided data meets all specified conditions.
 * @param data An object containing the data to be checked.
 * @param conditions An array of objects representing conditions to be applied to the data.
 * Each condition object must have properties 'name' (name of the field), 'operator' (comparison operator), and 'value' (value to be compared).
 * @returns true if all conditions are met, otherwise false.
 * @throws Error if the input data is invalid or an invalid operator is specified.
 */
export default function ProcessingConditions(data: { [key: string]: any }, conditions: { name: string, operator: string, value: any }[]): boolean {

    if (typeof data !== 'object' || !Array.isArray(conditions)) {
        throw new Error('Invalid input data.');
    }

    let finalResult = undefined

    // Iterate over each condition in the conditions array
    conditions.forEach(condition => {
        const { name, operator, value } = condition;

        // Check if the key of the condition exists in the data object
        if (data.hasOwnProperty(name)) {
            // Convert the property value to a number, if possible
            const dataValue = parseFloat(data[name]);
            const conditionValue = parseFloat(value);

            let comparisonResult = undefined;

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
                default: comparisonResult = "Condition not satisfied"
            }

            finalResult = comparisonResult;
        }
        
        
    });

    return finalResult;
}
