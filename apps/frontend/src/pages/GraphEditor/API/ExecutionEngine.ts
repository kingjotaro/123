/**
 * Function to execute an engine with provided data.
 * @param name The name of the engine.
 * @param data The data to be provided to the engine.
 * @returns A promise that resolves to a string representation of the decision made by the engine.
 */
export default async function ExecutionEngine(name: string, data: { [key: string]: string; }) {
  const url = "http://localhost:3000/execution/" + name;

  try {
      const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
      };

      const response = await fetch(url, requestOptions);

      if (!response.ok) {
          throw new Error('Error');
      }

      const responseData = await response.json();

      // Check if responseData exists and has a 'decision' property
      if (responseData && responseData.decision !== undefined) {
          const decisionString = responseData.decision.toString();
          return decisionString;
      }

      return "";
  } catch (error) {
      throw new Error('Error:' + error);
  }
}
