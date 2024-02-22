import mongoose from "mongoose";


const borrowSchema = mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    bookLoans:{
        type:Number,
        required:true,
        default:0
    },
    
    bookCheckOut:[{
        bookTitle:{
            type:String,
            required:true,
        },
        checkoutDate: {
             type: Date,
            required: true,
        },
            dueDate: {
            type: Date,
            required: true,
        },
        returned:{
            type:Boolean,
            default:false
        }
        }
    ],
   
})


const borrowModel = mongoose.model("Borrow",borrowSchema);

export default borrowModel;