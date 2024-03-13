import Router from "koa-router";
import Drawer from './Schema';
import { ParameterizedContext } from 'koa';

const router = new Router();

router.get('/get', async (ctx: ParameterizedContext) => {
    try {
        const { name } = ctx.query;

        if (!name || name === "") {
            ctx.status = 400;
            ctx.body = { error: 'Name parameter is missing in the query string' };
            return;
        }

        const drawerDoc = await Drawer.findOne({ name });

        if (!drawerDoc) {
            ctx.status = 404;
            ctx.body = { error: 'Drawer not found for the provided name' };
            return;
        }

        ctx.status = 200;
        ctx.body = drawerDoc;
    } catch (error) {
        ctx.status = 500;
        ctx.body = { error: 'Internal server error' };
    }
});

export default router;
