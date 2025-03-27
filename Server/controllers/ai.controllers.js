const aiServices = require('../services/ai.service')

module.exports.getReviwe=async(req,res)=>{
    const prompt = req.body.code

    if(!prompt){
        return res.status(400).send("prompt is required")
    }

const response = await aiServices(prompt)
res.send(response)
}