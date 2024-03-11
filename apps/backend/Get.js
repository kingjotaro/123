import Router from 'koa-router';
import Drawer from './Schema.js';


const router = new Router();

router.get('/get', async (ctx) => {
    try {
        const { name } = ctx.query;

        if (!name) {
            ctx.status = 400;
            ctx.body = { error: 'Name not provided in the query' };
            return;
        }
        const drawerDoc = await Drawer.findOne({ name });

        if (!drawerDoc) {

            ctx.status = 404;
            ctx.body = { error: 'Drawer not found' };
            return;
        }

        ctx.status = 200;
        ctx.body = drawerDoc;
    } catch (error) {

        ctx.status = 500;
        ctx.body = { error: error.message };
    }
});

export default router;
