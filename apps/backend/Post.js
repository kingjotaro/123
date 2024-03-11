import Router from 'koa-router';
import Drawer from './Schema.js';

const router = new Router();

router.post('/post', async (ctx) => {
    try {
        const {name, nodes, edges } = ctx.request.body;

      
        const userDoc = await Drawer.create({
            name,
            nodes,
            edges
        });

       
        ctx.status = 201;
        ctx.body = userDoc;
    } catch (error) {
        ctx.status = 500;
        ctx.body = { error: error.message };
    }
});

export default router;
