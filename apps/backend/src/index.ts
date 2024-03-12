import Koa from 'koa';
import mongoose from 'mongoose';
import post from './Post';
import cors from "koa2-cors";
import bodyParser from 'koa-bodyparser';
import Router from "koa-router"
import get from './Get';
import getall from './GetAll';
import execution from './ExecutionEngine';
import dotenv from 'dotenv'

dotenv.config();

async function mongo(){ await mongoose.connect(process.env.MONGO_URI || '', {})
   .catch(err => console.error('Error on MongoDB:', err));
}
mongo() 

const router = new Router();
const app = new Koa();

app.use(bodyParser({
    onerror: (err, ctx) => {
        ctx.throw('body parse error', 422);
    }
}));

app.use(
    cors({
      origin: "http://localhost:5173",
      credentials: true,
      allowMethods: ["GET", "POST", "PUT", "DELETE"], 
      allowHeaders: ["Content-Type", "Authorization"],
    })
  );

app.use(execution.routes());
app.use(getall.routes());
app.use(get.routes());
app.use(post.routes());
app.use(router.allowedMethods());

app.listen(3000, () => {
    console.log('Server on port 3000');
});


export default app;
