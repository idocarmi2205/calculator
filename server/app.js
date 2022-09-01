import express from 'express';
import bodyParser from 'body-parser'
import cors from 'cors'
import {math} from "./logic.js";

const jsonParser = bodyParser.json()
const app = express();

const corsOptions = {
    origin: '*',
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
}
app.use(cors(corsOptions))

app.post('/equals',jsonParser, (req, res) => {
    console.log(req.body);
    let ans=math(parseInt(req.body.num1),parseInt(req.body.num2),req.body.op)
    res.setHeader('access-control-request-headers','content-type')
    res.setHeader('Content-Type', 'application/json');
    res.send({ans:ans})
})
app.listen(8080, () => {
    console.log('listening on port 8080')
})