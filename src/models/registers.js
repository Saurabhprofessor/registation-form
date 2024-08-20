const mongoose=require("mongoose");
const connect=mongoose.connect("mongodb://localhost:27017/youtubeRegistration")

const employeeSchema= new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    confirmpassword:{
        type:String,
        required:true
    }
})

const Register=  mongoose.model("Register",employeeSchema);
 module.exports=Register;