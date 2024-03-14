import Router from "koa-router";
import Drawer from './Schema';
import { ParameterizedContext } from 'koa';

// Create a new instance of Koa Router
const router = new Router();

// Endpoint to handle GET requests for retrieving a drawer document by name
router.get('/get', async (ctx: ParameterizedContext) => {
    try {
        // Extract the 'name' parameter from the query string
        const { name } = ctx.query;

        // Check if the 'name' parameter is missing or empty
        if (!name || name === "") {
            ctx.status = 400;
            ctx.body = { error: 'Name parameter is missing in the query string' };
            return;
        }

        // Find a drawer document by the provided name
        const drawerDoc = await Drawer.findOne({ name });

        // If no drawer document is found, return a 404 error
        if (!drawerDoc) {
            ctx.status = 404;
            ctx.body = { error: 'Drawer not found for the provided name' };
            return;
        }

        // Respond with status 200 and the retrieved drawer document
        ctx.status = 200;
        ctx.body = drawerDoc;
    } catch (error) {
        // Handle internal server error
        ctx.status = 500;
        ctx.body = { error: 'Internal server error' };
    }
});

export default router;
