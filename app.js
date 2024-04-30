
const express = require('express')
const app = express()
app.use(express.json())
const {open} = require('sqlite')
const sqlite3 = require('sqlite3')
const path = require('path')
const dbPath = path.join(__dirname,'users.db')
let db = null

const initializeDbAndServer = async() => {
    try{
        db = await open({
            filename: dbPath,
            driver: sqlite3.Database
        })
        app.listen(3000, ()=> {
            console.log('app is listening at localhost:3000')
        })
    }catch(e){
        console.log(e.message)
        process.exit(1)
    }
}


app.get("/users/",async (request,response)=> {
    const getAllUsers = `SELECT * FROM user`;
    const allUsers = await db.all(getAllUsers)
    response.send(allUsers)
})

app.get('/users/:userId',async(request,response) => {
    const {userId}  = request.params 
    const getUser = `SELECT * FROM user WHERE id=${userId}`;
    const user = await db.get(getUser)
    response.send(user)
})

initializeDbAndServer()