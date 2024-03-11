import Router from 'koa-router';
import fetch from 'node-fetch'; 
import GetCondition from './utils/GetCondition.js'
import trimeConditions from './utils/trimeConditions.js';
import applyConditions from './utils/processingConditions.js'


const router = new Router();

router.post('/execution/:param', async (ctx) => {
    
    const param = ctx.params.param;
    const requestData = ctx.request.body; 

   
    
        if (!param) {
            ctx.status = 400;
            ctx.body = { error: 'Missing Parameters' };
            return;
        }
 
        const url = `http://localhost:3000/get?name=${param}`;
       
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error('Error on fetch data');
        }

        const responseData = await response.json(); 
        
        ctx.body = applyConditions(requestData, trimeConditions(GetCondition(responseData)));
        ctx.status = 200;
        
    }
);

export default router;
