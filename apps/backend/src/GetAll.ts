import Router from "koa-router"
import Drawer from './Schema';

const router = new Router();

router.get('/getall', async (ctx) => {
    try {
        const drawerDocs = await Drawer.find(); 

        if (!drawerDocs || drawerDocs.length === 0) { 
            ctx.status = 404;
            ctx.body = { error: 'Data not found' };
            return;
        }

        
        console.log(ctx.status)
        ctx.body = drawerDocs;

        return ctx.status = 200;
    } catch (error) {
        ctx.status = 500;
        ctx.body = { error};
    }
});

export default router;
