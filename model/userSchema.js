const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")



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
    },
    tokens: [
            {
                token: { 
                type: String,
                required: true
                }
            }
        ]
        
    

})

userSchema.pre('save', async function(next){
   
    if(this.isModified('password'))
    {
        this.password = await bcrypt.hash(this.password, 10)
        this.cnfPassword = await  bcrypt.hash(this.cnfPassword, 10)
    }
    next()
}) 

userSchema.methods.generateAuthToken = async function() {
    try{
        let tokenGenerated = jwt.sign({_id: this._id}, process.env.SECRET_KEY)
        this.tokens = this.tokens.concat({token:tokenGenerated})
        await this.save()
        return tokenGenerated
    }catch(e){
        console.log(e)
    }
}

const User = mongoose.model("registration", userSchema)

module.exports = User


