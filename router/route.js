const express = require("express")
const router = new express.Router()

const User = require("../model/userSchema")


// const middleware = (req, res, next) =>{
//     console.log("middleware")
//     next()
//     }

router.get("/", (req, res)=>{
    res.send("Hello from the server")
})

router.post("/register", (req, res)=>{
    // res.json({message: req.body})
    const {name, email, phone, passion, password, cnfPassword} = req.body;
    console.log(email)
    if(!name || !email || !phone || !passion || !password || !cnfPassword)
    {
        res.status(422).json({error: "Please fill the data properly"})
    }
    // res.send(req.body)

    User.findOne({email:email}).then((userExists)=>{
        if(userExists)
        {
            res.status(422).json({error: "User already exists"})
        }

        const user = new User({name, email, phone, passion, password, cnfPassword})

        user.save().then(()=>{
            res.status(201).json({message: "user registered successfully"}).catch((e)=>{
                res.status(500).json({error: "server error, failed to registor"})
            })
        })

    }).catch((e)=>{
        console.log(e)
    })

    
})




module.exports = router