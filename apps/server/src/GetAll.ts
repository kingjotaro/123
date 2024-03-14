import Router from "koa-router";
import Drawer from './Schema';

// Create a new instance of Koa Router
const router = new Router();

// Endpoint to handle GET requests to retrieve all drawer documents
router.get('/getall', async (ctx) => {
    try {
        // Retrieve all drawer documents from the database
        const drawerDocs = await Drawer.find();

        // Check if no documents are found in the database
        if (!drawerDocs || drawerDocs.length === 0) {
            ctx.status = 404;
            ctx.body = { error: 'No data found in the database' };
            return;
        }

        // Respond with status 200 and the retrieved drawer documents
        ctx.status = 200;
        ctx.body = drawerDocs;
    } catch (error) {
        // Handle internal server error
        ctx.status = 500;
        ctx.body = { error: 'Internal server error' };
    }
});

export default router;
