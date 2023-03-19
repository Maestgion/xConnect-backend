const express = require("express")
const cookieParser = require('cookie-parser')
const dotenv = require("dotenv")
require("../db/conn")
const PORT = process.env.PORT 
const router = require("../router/route")
dotenv.config({ path: "./config/config.env"})
const cors = require("cors")
const app = express()

app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use(router)





app.listen(PORT, ()=>{
console.log(`listening to the PORT ${PORT}`)
})