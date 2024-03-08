import Router from 'koa-router';
import Drawer from './schema.js';

const router = new Router();

router.get('/getall', async (ctx) => {
    try {
        const drawerDocs = await Drawer.find(); 

        if (!drawerDocs || drawerDocs.length === 0) { 
            ctx.status = 404;
            ctx.body = { error: 'No data' };
            return;
        }

        ctx.status = 200;
        ctx.body = drawerDocs;
    } catch (error) {
        ctx.status = 500;
        ctx.body = { error: error.message };
    }
});

export default router;
