import *as dotenv from "dotenv"
dotenv.config()
import express  from 'express'
import  { dbConnection } from './database/connection.js'
import { Server } from 'socket.io';
import noteModel from "./database/models/note.model.js";

const app = express()
const port = 3000

dbConnection() 

app.use(express.json())
 app.get("/",(req,res)=>res.send("hello world"))

const server= app.listen(port, () => console.log(`Example app listening on port ${port}!`))

const io= new Server(server,{
    cors:"*"
})
io.on("connection",(socket )=>{
    socket.on("addNote",async(data)=>{
        console.log(data)

        await noteModel.insertMany(data)
        let allNotes=await noteModel.find({})
        socket.emit("allData",allNotes)

    })

        socket.on ("load",async()=>{
            let allNotes=await noteModel.find({})
            console.log(allNotes)

            socket.emit("allData",allNotes)
        })

        socket.on ("deleteNote",async(data)=>{
           await noteModel.findByIdAndDelete(data)
           let allNotes=await noteModel.find({})
           console.log(allNotes)

           socket.emit("allData",allNotes)     
           })

           socket.on("updateNote", async (data) => {
            const { id, name, description } = data;
        
            const updatedNote = await noteModel.findByIdAndUpdate(id, { name, description }, { new: true });
        
            const allNotes = await noteModel.find({});
            socket.emit("allData", allNotes);
        });
        

})


