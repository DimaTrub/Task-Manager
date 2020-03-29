const express = require('express')



const port = process.env.port || 3000
const app = express()



app.listen(port, ()=>{
    console.log('The server is up on port', port);
})