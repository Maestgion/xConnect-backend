const mongoose = require("mongoose")

mongoose.set("strictQuery", false)


const db = "mongodb+srv://7abhishek1410:I7yyKZRYblXdWR2h@cluster0.rbdq7wl.mongodb.net/userData?retryWrites=true&w=majority"

mongoose.connect(db, ()=>{
    console.log("connected")
}, (e)=>{
    console.error(e)
})