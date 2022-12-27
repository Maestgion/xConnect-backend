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

router.post("/register", async (req, res)=>{
    // res.json({message: req.body})
    const {name, email, phone, passion, password, cnfPassword} = req.body;
    
    if(!name || !email || !phone || !passion || !password || !cnfPassword)
    {
        res.status(422).json({error: "Please fill the data properly"})
    }
    

    // User.findOne({email:email}).then((userExists)=>{
    //     if(userExists)
    //     {
    //         res.status(422).json({error: "User already exists"})
    //     }
    //     else
    //     {
    //         const user = new User({name, email, phone, passion, password, cnfPassword})

    //     user.save().then(()=>{
    //         res.status(201).json({message: "user registered successfully"})
    //     }).catch((e)=>{
    //         res.status(500).json({error: "server error, failed to register"})
    //     })
    //     }
    // }).catch((e)=>{
    //     console.log(e)
    // })


   try
   {
    const userExists = await User.findOne({email: email})

    if(userExists)
    {
        res.status(422).json({error: "user already exists"})
    }
    else
    {
        const newUser = new User({name, email, phone, passion, password, cnfPassword})

        try
        {
            const createUser = await newUser.save()
            res.status(201).json({message:"user registered successfully"})
            console.log(createUser)
        }catch(e){
            res.status(500).json({error: "sever error, user not registered"})
        }   
    }
   }catch(e) {
        console.log(e)
   }

    
})




module.exports = router