const express = require("express")
const router = new express.Router()



// const middleware = (req, res, next) =>{
//     console.log("middleware")
//     next()
//     }

router.get("/", (req, res)=>{
    res.send("Hello from the server")
})

router.post("/register", (req, res)=>{
    console.log(req.body)
    // res.json({message: req.body})
    res.send(req.body)
})




module.exports = router