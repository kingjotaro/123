import Drawer from './Schema';
import Router from "koa-router";
import { ParameterizedContext } from "koa";

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
        
        if (!ctx.request.body) {
            ctx.status = 400;
            ctx.body = { error: 'Missing request body' };
            return;
        }

        
        const { name, nodes, edges } = ctx.request.body as PostRequestBody;

      
        if (!name || !nodes || !edges) {
            ctx.status = 400;
            ctx.body = { error: 'Missing required fields in the request body' };
            return;
        }

       
        const userDoc = await Drawer.create({
            name,
            nodes,
            edges
        });

        ctx.status = 201;
        ctx.body = userDoc;
    } catch (error) {
        ctx.status = 500;
        ctx.body = { error: 'Internal server error' };
    }
});

export default router;
