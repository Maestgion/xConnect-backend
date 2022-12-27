const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcryptjs")

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

userSchema.pre('save', async function(next){
    console.log("hi")
    if(this.isModified('password'))
    {
        this.password = await bcrypt.hash(this.password, 10)
        this.cnfPassword = await  bcrypt.hash(this.cnfPassword, 10)
    }
    next()
})

const User = mongoose.model("registration", userSchema)

module.exports = User


