const express = require("express")
const dotenv = require("dotenv")
require("../db/conn")
dotenv.config({ path: "./config/config.env"})
const app = express()
const PORT = process.env.PORT 



const middleware = (req, res, next) =>{
console.log("middleware")
next()
}

app.get("/", (req, res)=>{
    res.send("Hello from the server")
})
app.get("/about", middleware, (req, res)=>{
    res.send("Hello from the about")
})
app.get("/contact", (req, res)=>{
    res.send("Hello from the contact")
})
app.get("/signup", (req, res)=>{
    res.send("Hello from the registration")
})
app.get("/signin", (req, res)=>{
    res.send("Hello from the sign in")
})



app.listen(PORT, ()=>{
console.log(`listening to the PORT ${PORT}`)
})