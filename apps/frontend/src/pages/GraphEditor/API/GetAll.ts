/**
 * Function to fetch data from a server with retries.
 * @returns Promise that resolves to the fetched data or null if all retries fail.
 */
export default async function getAll() {
    const url = "http://localhost:3000/getall";
    const maxRetries = 2; // Maximum number of retry attempts
    const delayBetweenRetries = 500; // Delay in milliseconds between retry attempts

    // Loop through the retry attempts
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            // Attempt to fetch data from the server
            const response = await fetch(url);

            // Check if the response is not ok
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }

            // Parse the response as JSON
            const data = await response.json();

            // Return the fetched data
            return data;
        } catch (error) {
            // Log the error for the current attempt
            console.error(`Attempt ${attempt} failed:`, error);
          
            // Check if this is the last attempt
            if (attempt === maxRetries) {
                console.error(`Maximum number of retries (${maxRetries}) reached.`);
                return null; // Return null if all retry attempts fail
            }
           
            // Delay before the next retry attempt
            await new Promise(resolve => setTimeout(resolve, delayBetweenRetries));
        }
    }
}
