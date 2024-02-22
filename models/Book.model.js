
import mongoose  from "mongoose";

const bookSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    ISBN:{
        type:String,
        required:true
    },
    publicationDate:{
        type:String,
        required:true
    },
    genre:{
        type:String,
        required:true,
    },
    coverImageUrl: {
        type:String,
        required:true,  
      },
    availability:{
        type:Boolean,
        default:false
    },
    bookCount:{
        type:Number,
        required:true,
    }
},{timestamps:true});

const  bookModel = mongoose.model("bookModel",bookSchema);

export default bookModel;