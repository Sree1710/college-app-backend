const express = require('express')
const bodyParser = require('body-parser')
const Cors = require('cors')
const mongoose = require('mongoose')
const studentModel = require('./studentModel')
const examModel = require('./examModel')

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(Cors())

mongoose.connect("mongodb+srv://sreelekshmisl1710:Dharithri@cluster0.y83cozw.mongodb.net/collegeDB?retryWrites=true&w=majority", { useNewUrlParser: true })

app.post("/login",async(request,response)=>{
   let data=request.body
   let getUsername=data.username
   let getPassword=data.password
   let result=await studentModel.find({username:getUsername})
   if (result.length>0) {
      if (result[0].password==getPassword) {
        response.json({"status":"success","data":result[0]})
      } else {
        response.json({"status":"Invalid Username or Password !!!"})
      }
   } else {
       response.json({"status":"Username Does Not Exist !!!"})
   }
})


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

app.post("/admaddmark",async(request,response)=>{
    let data=request.body
    const mark= new examModel(data)
    let result= await mark.save()
    if (result.examName!="") {
        response.json({"status":"success"})
    } else {
        response.json({"status":"error"})
    }
})

app.post("/viewstudprofile",async(request,response)=>{
    let data=request.body
    let result=await studentModel.find(data)
    response.json(result)
})

app.post("/viewstudmark",async(request,response)=>{
    let data=request.body
    let result=await examModel.find(data)
    response.json(result)
})










app.listen(3001, () => {
    console.log("Server Running")
})