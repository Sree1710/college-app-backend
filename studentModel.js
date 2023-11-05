const mongoose=require('mongoose')
const studentModel=mongoose.model("students",mongoose.Schema(
    {
        studName:{type:String,required:true},
        studAdmNo:String,
        studDob:String,
        studBG:String,
        studAddress:String,
        studPhoneNo:String,
        username:String,
        password:String
    }
))
module.exports=studentModel