import Drawer from './Schema';
import Router from "koa-router"
import { ParameterizedContext } from "koa";

const router = new Router()

router.post('/post', async (ctx: ParameterizedContext) => {
     
    try {
        const { name, nodes, edges } = ctx.request.body as { name: string; nodes: any[]; edges: any[] };
    
        const userDoc = await Drawer.create({
            name,
            nodes,
            edges
        });

       
        ctx.status = 201;
        ctx.body = userDoc;
    } catch (error) {
        ctx.status = 500;
        ctx.body = { error};
    }
});

export default router;
