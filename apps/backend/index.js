import Koa from 'koa';
import mongoose from 'mongoose';
import post from './post.js'
import cors from "koa2-cors";
import bodyParser from 'koa-bodyparser';
import Router from 'koa-router';

mongoose.connect('mongodb+srv://rafaelleet:a9n7w9d4@vum-c0.enxoa6a.mongodb.net/?retryWrites=true&w=majority&appName=Vum-c0/', {

})
    .then(() => console.log('MongoDB Conected'))
    .catch(err => console.error('Error on MongoDB:', err));

const router = new Router();
const app = new Koa();


app.use(bodyParser());


app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

app.use(post.routes());
app.use(router.allowedMethods());

app.listen(3000, () => {
    console.log('Server on port 3000');
});

