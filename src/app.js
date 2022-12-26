const express = require("express")
const dotenv = require("dotenv")
require("../db/conn")
dotenv.config({ path: "./config/config.env"})
const app = express()
const PORT = process.env.PORT 
const router = require("../router/route")
const User = require("../model/userSchema")

app.use(express.json())
app.use(router)





app.listen(PORT, ()=>{
console.log(`listening to the PORT ${PORT}`)
})