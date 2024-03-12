import Router from "koa-router";
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
            throw new Error(`Failed to fetch data from ${url}. Status: ${response.status}`);
        }

        const responseData = await response.json();

        if (!responseData) {
            throw new Error(`Failed to parse JSON response from ${url}`);
        }

        const result = ProcessingConditions(requestData, TrimeConditions(GetCondition(responseData)));
        
        ctx.status = 200;
        ctx.body = { result };
        
    } catch (error) {
        ctx.status = 500;
        ctx.body = { error: error.message };
    }
});

export default router;
