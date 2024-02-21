import mongoose from "mongoose";

const bookLoanSchema = mongoose.Schema({
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
});

const borrowSchema = mongoose.Schema({
    userName:{
        type:String,
        required:true,
    },
    email:{
        type:email,
        required:true,
    },
    bookLoans:{
        type:Number,
        required:true,
        default:0
    },
    bookCheckOut:[bookLoanSchema],
   
})


const Borrow = mongoose.model("Borrow",borrowSchema);

export default Borrow;