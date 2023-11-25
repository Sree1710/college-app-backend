const mongoose = require('mongoose')
const examModel=mongoose.model("exams",mongoose.Schema(
    {
        stud_id:{type:String,required:true},
        examName:String,
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