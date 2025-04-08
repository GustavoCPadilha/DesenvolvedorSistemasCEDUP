import express from 'express';

const app = express();
const users = [];

app.use(express.json());

app.post("/usuarios",(req,res)=>{
    users.push(req.body);
    res.send("Pudim");
});

app.get("/usuarios",(req,res)=>{
    res.json(users);
});

app.listen(3000);
