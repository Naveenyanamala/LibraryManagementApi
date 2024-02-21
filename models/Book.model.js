
import mongoose  from "mongoose";

const bookSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    authors:{
        type:String,
        required:true
    },
    ISBN:{
        type:String,
        required:true
    },
    publicationDate:{
        type:Date,
        required:true
    },
    genre:{
        type:String,
        required:true,
    },
    coverImageUrl:{
        type:String,
        default:"",
    },
    availability:{
        type:String,
        required:true,
        enum:["Yes" , "No"]

    }
},{timestamps:true});

const  bookModel = mongoose.model("bookModel",bookSchema);

export default bookModel;