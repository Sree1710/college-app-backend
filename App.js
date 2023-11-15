const express = require('express')
const bodyParser = require('body-parser')
const Cors = require('cors')
const mongoose = require('mongoose')
const studentModel = require('./studentModel')
const examModel = require('./examModel')
const jwt = require('jsonwebtoken')
const adminModel = require('./adminModel')

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(Cors())

mongoose.connect("mongodb+srv://sreelekshmisl1710:Dharithri@cluster0.y83cozw.mongodb.net/collegeDB?retryWrites=true&w=majority", { useNewUrlParser: true })

app.post("/login", async (request, response) => {
    let data = request.body
    let getUsername = data.username
    let getPassword = data.password
    let result = await studentModel.find({ username: getUsername })
    if (result.length > 0) {
        if (result[0].password == getPassword) {
            jwt.sign({ user: getUsername, pass: getPassword }, "collegeApp", { expiresIn: "1d" },
                (error, token) => {
                    if (error) {
                        response.json({ "status": "error" })
                    } else {
                        response.json({ "status": "success", "data": result[0], "token": token })
                    }
                })
        } else {
            response.json({ "status": "Invalid Username or Password !!!" })
        }
    } else {
        response.json({ "status": "Username Does Not Exist !!!" })
    }
})

app.post("/adminlogin", async (request, response) => {
    let data = request.body
    let getUsername = data.username
    let getPassword = data.password
    let result = await adminModel.find({ username: getUsername })
    if (result.length > 0) {
        if (result[0].password == getPassword) {
            jwt.sign({ user: getUsername, pass: getPassword }, "collegeApp", { expiresIn: "1d" }, (error, token) => {
                if (error) {
                    response.json({ "status": "error" })
                } else {
                    response.json({ "status": "success", "data": result[0], "token": token })
                }
            })
        } else {
            response.json({ "status": "Invalid Username or Password !!!" })
        }
    } else {
        response.json({ "status": "Username Does Not Exist !!" })
    }
})

app.post("/admaddstud", async (request, response) => {
    let data = request.body
    let token = request.body.token
    const student = new studentModel(data)
    let result = await student.save()
    jwt.verify(token, "collegeApp", (error, decoded) => {
        if (error) {
            response.json({ "status": "Unauthorized User!!" })
        } else {
            if (result.studName != "") {
                response.json({ "status": "success", "data": result[0] })
            } else {
                response.json({ "status": "error" })
            }
        }
    })

})

app.post("/admviewstudprofile",async(request,response)=>{
    let result=await studentModel.find()
    response.json(result)

})

app.post("/admaddmark", async (request, response) => {
    let data = request.body
    let token = request.body.token
    const mark = new examModel(data)
    let result = await mark.save()
    jwt.verify(token,"collegeApp",(error,decoded)=>{
        if (error) {
            response.json({"status":"Unauthorized User!!"})
        } else {
            if (result.examName != "") {
                response.json({ "status": "success" })
            } else {
                response.json({ "status": "error" })
            }
        }
    })
    
})

app.post("/viewstudprofile", async (request, response) => {
    let data = request.body
    let token = data.token
    let result = await studentModel.find(data)
    jwt.verify(token,"collegeApp",(error,decoded)=>{
        if (decoded) {
            response.json(result)
        } else {
            response.json({"status":"Unauthorized User!!!"})
        }
    })
    
})

app.post("/viewstudmark", async (request, response) => {
    let data = request.body
    let token =data.token
    let result = await examModel.find(data)
    jwt.verify(token,"collegeApp",(error,decoded)=>{
        if (decoded) {
            response.json(result) 
        } else {
            response.json({"status":"Unauthorized User!!"})
        }
    })
    
})










app.listen(3001, () => {
    console.log("Server Running")
})