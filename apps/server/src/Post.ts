import Drawer from './Schema';
import Router from "koa-router";
import { ParameterizedContext } from "koa";
import isEmpty from './utils/isEmpty';
import PostRequestBody from './typesPost';

// Create a new instance of Koa Router
const router = new Router();

// Endpoint to handle POST requests
router.post('/post', async (ctx: ParameterizedContext) => {
    try {
        // Check if the request body is empty
        if (isEmpty(ctx.request.body)) {
            ctx.status = 400;
            ctx.body = { error: 'Missing request body' };
            return;
        }

        // Destructure the request body
        const { name, nodes, edges } = ctx.request.body as PostRequestBody;

        // Check for missing required fields in the request body
        if (!name || !nodes || !edges) {
            console.log(ctx.request.body)
            ctx.status = 400;
            ctx.body = { error: 'Missing required fields in the request body' };
            return;
        }

        // Check if a drawer with the same name already exists
        let existingDrawer = await Drawer.findOne({ name });

        // If a drawer with the same name exists, update it
        if (existingDrawer) {
            existingDrawer = await Drawer.findOneAndUpdate(
                { name },
                { $set: { nodes, edges } },
                { new: true }
            );
            ctx.status = 200;
            ctx.body = existingDrawer;
            return;
        }

        // If no drawer with the same name exists, create a new one
        const newDrawer = await Drawer.create({
            name,
            nodes,
            edges
        });
        ctx.status = 201;
        ctx.body = newDrawer;

    } catch (error) {
        // Handle internal server error
        ctx.status = 500;
        ctx.body = { error: 'Internal server error' };
    }
});

export default router;
