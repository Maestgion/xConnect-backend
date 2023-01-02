const express = require("express")
const router = new express.Router()
const bcrypt = require("bcryptjs")
const User = require("../model/userSchema")
const authenticate = require("../middleware/authenticate")


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
        return res.status(422).json({error: "user already exists"})
    }
    else if(password!=cnfPassword)
    {
        return res.status(422).json({error: "Please type the same password"})
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

router.post("/login", async (req, res)=>{

    const {email, password} = req.body

    if(!email || !password)
    {
        res.status(400).json({error: "These fields can't be empty"})
        console.log("get out")
    }

   try
   {
    const userExists = await User.findOne({email:email})

    if(userExists)
    {
        const passwordMatch = await bcrypt.compare(password, userExists.password)
        if(passwordMatch) 
        {   
             const token = await userExists.generateAuthToken()
            console.log(token)
            res.cookie("jwtoken", token, {
                expires: new Date(Date.now() +  2592000000),
                httpOnly:true
                // expires in 30 days
            })
            
            res.status(201).json({message: "login successful"})
            console.log(userExists)
           
        } 
        else{
            res.status(400).json({error: "invalid credentials"})
        }

     
    }
    else{
        res.status(400).json({error:"account not found"})
    }
   }catch(e){
        console.log(e);
   }
})

router.get("/about", authenticate, (req, res)=>{
        res.send(req.rootUser)
        console.log(req.rootUser)
})

router.get("/getdata", authenticate, (req, res)=>{
    res.send(req.rootUser)
})

router.post("/contact", authenticate, async (req, res)=>{

    try
    {
        const {name, email, phone, message} = req.body;
        
        if(!name || !phone || !email ||!message)
        {
            res.status(422).send("These fields can't be empty")
        }

        const userExists = await User.findOne({_id:req.userID})

        if(userExists)
        {
            const userMessage = await userExists.addMessage(name, email, phone, message)
            console.log(userMessage)

            await userExists.save()

            res.status(201).json({message:"message received"})
        }
    } catch(e)
    {
        console.log(e);
    }


} )

router.get("/logout", authenticate, (req,res)=>{
    res.clearCookie("jwtoken", {path:"/"}).status(200).json({message:"User logged out successfully"})
    console.log("logged out");

})






module.exports = router