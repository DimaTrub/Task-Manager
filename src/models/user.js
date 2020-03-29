const mongoose = require('mongoose')
const validator = require('validator')

const userSchema = {
    name: {
        type: String,
        required: true,
        trim: true
    },
    password:{
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value){
            const lowerCaseValue = value.toLowerCase()
            if(validator.contains( lowerCaseValue ,'password')){
                throw new Error('Password cant cotain "password"')
            }
        }
    },
    age:{
        type: Number,
        required: true
    },
    email:{
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Email is invalid")
            }
        }
    },
    gender:{
        type: String,
        required: true,
        default: 0
    }
}

const User = mongoose.model('User',userSchema)

module.exports = User