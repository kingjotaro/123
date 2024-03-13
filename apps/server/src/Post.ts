import Drawer from './Schema';
import Router from "koa-router";
import { ParameterizedContext } from "koa";
import isEmpty from './utils/isEmpty';

const router = new Router();


interface NodeData {
    id: string;
    type: string;
    position: {
        x: number;
        y: number;
    };
    data: {
        width: number;
        height: number;
    };
}

interface EdgeData {
    source: string;
    target: string;
    label?: string;
    id: string;
    type: string;
    markerEnd: {
        type: string;
        height: number;
        width: number;
    };
}

interface PostRequestBody {
    name: string;
    nodes: NodeData[];
    edges: EdgeData[];
}



router.post('/post', async (ctx: ParameterizedContext) => {
    try {
        
        if (isEmpty(ctx.request.body)) {
            
            ctx.status = 400;
            ctx.body = { error: 'Missing request body' };
            return;
        }

        const { name, nodes, edges } = ctx.request.body as PostRequestBody;

        if (!name || !nodes || !edges) {
            console.log(ctx.request.body)
            ctx.status = 400;
            ctx.body = { error: 'Missing required fields in the request body' };
            return;
        }


        let existingDrawer = await Drawer.findOne({ name });

        if (existingDrawer) {

            let existingDrawer = await Drawer.findOneAndUpdate(
                { name },
                { $set: { nodes, edges } },
                { new: true }
            );

            ctx.status = 200;
            ctx.body = existingDrawer;
            return;
        }


        const newDrawer = await Drawer.create({
            name,
            nodes,
            edges
        });

        ctx.status = 201;
        ctx.body = newDrawer;

    } catch (error) {
        ctx.status = 500; 
        ctx.body = { error: 'Internal server error' };
    }
});

export default router;