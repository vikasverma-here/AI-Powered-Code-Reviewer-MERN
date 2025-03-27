const express = require("express")
const router = express.Router()
const aiControllers = require("../controllers/ai.controllers")

router.post("/getReviwe",aiControllers.getReviwe)



module.exports=router