const express = require("express");
const app = express();
const  aiROtues = require("../routes/ai.routes")
app.get("/",(req,res)=>{
    res.send("hellow world")
})

app.use(express.json())

app.use("/ai",aiROtues)

module.exports = app;