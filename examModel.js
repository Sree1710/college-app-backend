const mongoose = require('mongoose')
const examModel=mongoose.model("exams",mongoose.Schema(
    {
        studId:String,
        examName:{type:String,required:true},
        examSubOne:String,
        examMarkOne:String,
        examSubTwo:String,
        examMarkTwo:String,
        examSubThree:String,
        examMarkThree:String,
        examSubFour:String,
        examMarkFour:String
    }
))
module.exports=examModel