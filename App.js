const express = require('express')
const bodyParser = require('body-parser')
const Cors = require('cors')
const mongoose = require('mongoose')
const studentModel = require('./studentModel')

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(Cors())

mongoose.connect("mongodb+srv://sreelekshmisl1710:Dharithri@cluster0.y83cozw.mongodb.net/collegeDB?retryWrites=true&w=majority", { useNewUrlParser: true })

app.post("/admaddstud", async (request, response) => {
    let data = request.body
    const student = new studentModel(data)
    let result=await student.save()
    if (result.studName!="") {
        response.json({"status":"success"})
    } else {
        response.json({"status":"error"})
    }
})



















app.listen(3001, () => {
    console.log("Server Running")
})