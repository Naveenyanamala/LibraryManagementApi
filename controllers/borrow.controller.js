import bookModel from '../models/Book.model.js';
import borrowModel from '../models/BorrowRecord.model.js';



export const checkOut = async(req,res) => {
    try {
        
        const {title,checkoutDate,dueDate,username,email} =req.body;

        const user= await borrowModel.findOne({ email});

        const book = await bookModel.findOne({ title: new RegExp(`^${title}$`, 'i') });

        
        if (!book || !book.availability) {
            return res.status(400).json({ error: "Book not available for checkout" });
        }

        if(user){
            const hasBook = user.bookCheckOut.some(book => book.bookTitle === title);
            if (hasBook) {
                return res.status(400).json({ error: 'Already taken the book' });
            } else {


                book.bookCount-=1;
                book.availability = book.bookCount ===0?false:true;
        
       
                await book.save();

                
                user.bookCheckOut.push({
                    bookTitle: title,
                    checkoutDate,
                    dueDate,
                    returned: false
                });
        
                user.bookLoans += 1;
        
                await user.save();
                return res.status(200).json({ user });
            }
        }else {

            return res.status(404).json({ error: ' user not found' });
        }
    } catch (error) {
        res.status(500).json({ error:`Internal server error` });
    }
}

export const bookReturn = async (req,res) =>{
    try {
        const title =req.params.book;
        const {email} =req.body;
        const user= await borrowModel.findOne({ email});
       
        if(!user){
            return res.status(404).json({ error: 'User not found' });
        }

        const bookIndex = user.bookCheckOut.findIndex(book => book.bookTitle === title);

        const book = await bookModel.findOne({title : new RegExp(`^${title}$`, 'i')});

        if(bookIndex !== -1 && book){

            if(!book.availability){
                book.bookCount+=1;
                book.availability = true;
                
                await book.save();
            }else{
                book.bookCount+=1;
                await book.save();
            }
            
            user.bookLoans= user.bookLoans>0? user.bookLoans-1: 0;

            user.bookCheckOut.splice(bookIndex,1);
            
            

            if(user.bookCheckOut.length ===0){
                
                await user.deleteOne();
                return res.status(200).json({ message: 'User and book returned successfully' });
            }
            
            await user.save();
            return res.status(200).json({ message: 'Book returned successfully' });


        }else {

            return res.status(404).json({ error: 'Book not found for the user' });
        }

        
       
       
    } catch (error) {
        res.status(500).json({ error:`Internal server error` });
    }
}