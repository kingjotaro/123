import Router from "koa-router"
import Drawer from './Schema';
import { ParameterizedContext } from 'koa';


const router = new Router();

router.get('/get', async (ctx: ParameterizedContext) => {
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

        
        ctx.body = drawerDoc;
        return ctx.status = 200;
    } catch (error) {

        ctx.status = 500;
        ctx.body = { error};
    }
});

export default router;
