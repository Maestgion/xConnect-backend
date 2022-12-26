const mongoose = require("mongoose")
const validator = require("validator")

const userSchema = new mongoose.Schema({
     name: {
        type: String,
        required: true
     },
     email:{
        type: String, 
        required: true,
        validate(value)
        {
            if(!validator.isEmail(value))
            {
             throw new Error("Invalid Email")
            }
        } 
     },
     phone:{
        type: Number,
        required: true
    },
    passion: {
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    cnfPassword:{ 
        type: String,
        required: true
    }
})


const User = mongoose.model("registration", userSchema)

module.exports = User