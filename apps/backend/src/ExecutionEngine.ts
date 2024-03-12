import Router from "koa-router"
import { ParameterizedContext } from 'koa';
import GetCondition from './utils/GetCondition';
import TrimeConditions from './utils/TrimeConditions'; 
import ProcessingConditions from './utils/ProcessingConditions'; 

const router = new Router();

router.post('/execution/:param', async (ctx: ParameterizedContext) => {
    const param = ctx.params.param;
    const requestData: any = ctx.request.body;


    if (!param) {
        ctx.status = 400;
        ctx.body = { error: 'Missing Parameters' };
        return;
    }

    const url = `http://localhost:3000/get?name=${param}`;
    try {

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Error fetching data');
        }

        const responseData = await response.json();
        const result = ProcessingConditions(requestData, TrimeConditions(GetCondition(responseData)));
        
        ctx.status = 200;
        ctx.body = { result };
    } catch (error) {
        ctx.status = 500;
        ctx.body = { error: "error"};
    }
});

export default router;
