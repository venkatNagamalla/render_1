
const express = require('express')
const app = express()

app.listen(process.env.PORT || 3000, () =>{
    console.log('LlL')
})

app.get("/", (request,response)=> {
    response.send("HJJJ")
})