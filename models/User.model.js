import mongoose from "mongoose";
import validator  from 'validator';
const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,  // Ensure email is stored in lowercase
    },
    password:{
        type:String,
        required:true,
        minlength:6,
    },
    role:{
        type:String,
        required:true,
        default:"member",
        enum:["admin","librarian","member"],
    }
},{timestamps:true});

const User = mongoose.model("User",userSchema);

export default User;
