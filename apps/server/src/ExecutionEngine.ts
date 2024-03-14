import Router from "koa-router";
import { ParameterizedContext } from 'koa';
import GetCondition from './utils/GetCondition';
import TrimeConditions from './utils/TrimeConditions'; 
import ProcessingConditions from './utils/ProcessingConditions'; 

// Create a new instance of Koa Router
const router = new Router();

// Endpoint to handle POST requests for executing conditions based on a parameter
router.post('/execution/:param', async (ctx: ParameterizedContext) => {
    // Extract the 'param' parameter from the request
    const param = ctx.params.param;

    // Extract the request body
    const requestData: any = ctx.request.body;

    // Check if 'param' parameter is missing
    if (!param) {
        ctx.status = 400;
        ctx.body = { error: 'Missing Parameters' };
        return;
    }

    // Construct the URL to fetch data based on the parameter
    const url = `http://localhost:3000/get?name=${param}`;

    try {
        // Fetch data from the specified URL
        const response = await fetch(url);

        // Check if the response is successful
        if (!response.ok) {
            ctx.body = { error: `Failed to fetch data from ${url}. Status: ${response.status}` }; 
            return; 
        }

        // Parse the JSON response
        const responseData = await response.json();

        // Check if the response data is valid
        if (!responseData) {
            throw new Error(`Failed to parse JSON response from ${url}`);
        }

        // Process conditions based on the fetched data
        const result = ProcessingConditions(requestData, TrimeConditions(GetCondition(responseData)));
        
        // Respond with the processed result
        ctx.status = 200;
        ctx.body =  result;
        
    } catch (error) {
        // Handle internal server error
        ctx.status = 500;
        ctx.body = { error: error.message };
    }
});

export default router;
