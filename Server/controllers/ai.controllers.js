const aiServices = require('../services/ai.service')

module.exports.getReviwe=async(req,res)=>{
    const prompt = req.body

    if(!prompt.content){
        return res.status(400).send("prompt is required")
    }

const response = await aiServices(prompt.content)
res.send(response)
}