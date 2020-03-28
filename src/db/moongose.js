const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useCreateIndex: true,
    useNewUrlParser: true
})

const User = mongoose.model('User',{
    name: {
        type: String
    },
    age: {
        type: Number
    },
    gender: {
        type: String
    }
})


const user = new User({
    name: 'Dima',
    age: 29,
    gender: 'male'
})

user.save().then( ()=>{
    console.log('Secces insert')
}
    
    
).catch( (error)=> {
    console.log('Error',e);
    
})
