const express = require("express")
require("../db/conn")
const app = express()
const port = 8000



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



app.listen(port, ()=>{
console.log(`listening to the port ${port}`)
})