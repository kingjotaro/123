import Router from "koa-router";
import Drawer from './Schema';

const router = new Router();

router.get('/getall', async (ctx) => {
    try {
        const drawerDocs = await Drawer.find(); 

        if (!drawerDocs || drawerDocs.length === 0) { 
            ctx.status = 404;
            ctx.body = { error: 'No data found in the database' };
            return;
        }

        ctx.status = 200;
        ctx.body = drawerDocs;
    } catch (error) {
        ctx.status = 500;
        ctx.body = { error: 'Internal server error' };
    }
});

export default router;
