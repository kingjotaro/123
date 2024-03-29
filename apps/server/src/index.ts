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

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB database
async function connectToMongoDB() {
    await mongoose.connect(process.env.MONGO_URI || '', {})
        .catch(err => console.error('Error connecting to MongoDB:', err));
}
connectToMongoDB();

// Create a new instance of Koa Router and Koa application
const router = new Router();
const app = new Koa();

// Use bodyParser middleware for parsing request bodies
app.use(bodyParser({
    onerror: (err, ctx) => {
        ctx.throw('body parse error', 422);
    }
}));

// Enable CORS for the frontend application
app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
        allowMethods: ["GET", "POST", "PUT", "DELETE"],
        allowHeaders: ["Content-Type", "Authorization"],
    })
);

// Mount routes from different modules
app.use(execution.routes());
app.use(getall.routes());
app.use(get.routes());
app.use(post.routes());
app.use(router.allowedMethods());

// Start the server only if not in test environment
if (process.env.NODE_ENV !== "test") {
    app.listen(3000, () => {
        console.log("App listening on port 3000");
    });
}

export default app;
