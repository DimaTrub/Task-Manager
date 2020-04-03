const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
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
        unique: true,
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
})
//cant use here ES6 syntax because arrow function donr binf thus object.
userSchema.pre('save',async function (next) {
  
    //this obj equal to user
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 8)        
    }
    next()
})


userSchema.statics.findByCredentials = async (email, password) => {

    const user = await User.findOne( {email} )
    if(!user){
        throw new Error("Unable to login")
    }
    const isMatch = await bcrypt.compare(password, user.password )
    if(!isMatch){
        throw new Error("Unable to login")
    }
    return user

}

const User = mongoose.model('User',userSchema)

module.exports = User