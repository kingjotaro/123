import Router from 'koa-router';
import Drawer from './schema.js'; 
const router = new Router();

router.get('/get', async (ctx) => {
    try {
        const { name } = ctx.query;

        if (!name) {
            ctx.status = 400;
            ctx.body = { error: 'Nome não fornecido na consulta' };
            return;
        }

        const drawerDoc = await Drawer.findOne({ name });

        if (!drawerDoc) {
            ctx.status = 404;
            ctx.body = { error: 'Gaveta não encontrada' };
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
