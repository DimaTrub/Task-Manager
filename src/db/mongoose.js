const mongoose = require('mongoose')
const validator = require('validator')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useCreateIndex: true,
    useNewUrlParser: true
})



//Schems///---->
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

const taskSchema = {
    description: {
        type: String,
        trim: true,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    }
}

//Models ---->
const User = mongoose.model('User',userSchema)
const Task = mongoose.model('Task',taskSchema)



// const task = new Task({
//     description: '            Walk Teo',



// })

// task.save().then(()=>{
//     console.log(task);
// }).catch((error)=>{
//     console.log(error);
    
// })








// const user1 = new User({
//     name: 'Dima' ,
//     password: 'dimaPaSSworD',
//     age: 29,
//     email: 'Dimatrub90@gmail.com' ,
//     gender:'male'
// })

// user1.save().then(()=>{
//     console.log(user1);
    
// }).catch((Error)=>{
//     console.log(Error);
    
// })
