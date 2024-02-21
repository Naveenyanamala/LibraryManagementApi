import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
        minlength:6,
    },
    role:{
        type:String,
        required:true,
        enum:["admin","librarian","student"],
    }
},{timestamps:true});

const User = mongoose.model("User",userSchema);

export default User;
