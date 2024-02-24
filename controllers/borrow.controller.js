import bookModel from '../models/Book.model.js';
import borrowModel from '../models/BorrowRecord.model.js';




export const checkOut = async(req,res) => {
    try {
        
        const {title,checkoutDate,dueDate,username,email} =req.body;

        const nameRegex = /^[A-Za-z]+$/; // This regex allows only alphabets
            
        if (!username || !nameRegex.test(username)) {
            return res.status(400).json({ error: true, message: "Invalid username format" });
        }

        const titleRegex = /^[A-Za-z0-9]+$/; // This regex allows only alphabets
        
        if (!title || !titleRegex.test(title)) {
            return res.status(400).json({ error: true, message: "Invalid title format" });
        }
        

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: `Invalid email format` });
        }

        const dateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;


        if (!checkoutDate || !dateRegex.test(checkoutDate)) {
            return res.status(400).json({ error: true, message: "Invalid checkoutdate format" });
        }

        if (!dueDate || !dateRegex.test(dueDate)) {
            return res.status(400).json({ error: true, message: "Invalid dueDate format" });
        }

        const user= await borrowModel.findOne({email});
        
        
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
        
                
                user.bookCheckOut.push({
                    bookTitle: title,
                    checkoutDate,
                    dueDate,
                    returned: false
                });
        
                user.bookLoans += 1;
        
                await user.save();
                await book.save();
                return res.status(200).json({ user });
            }
        }else {

            book.bookCount-=1;
            book.availability = book.bookCount ===0?false:true;
    
            
            

            const user = await borrowModel.create({email,username});

            user.bookCheckOut.push({
                bookTitle: title,
                checkoutDate,
                dueDate,
                returned: false
            });
    
            user.bookLoans += 1;
    
            await user.save();
            await book.save();
            return res.status(200).json({ user });
        }
    } catch (error) {
        res.status(500).json({ error:`Internal server error` });
    }
}

export const bookReturn = async (req,res) =>{
    try {
        const title =req.params.book;
        const {email,username} =req.body;

       
        
        
        const titleRegex = /^[A-Za-z0-9]+$/; // This regex allows only alphabets
            
        if (!title || !titleRegex.test(title)) {
            return res.status(400).json({ error: true, message: "Invalid username format" });
        }


        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: `Invalid email format` });
        }

        const user= await borrowModel.findOne({ email});

        const nameRegex = /^[A-Za-z]+$/; // This regex allows only alphabets
            
        if (!username || !nameRegex.test(username)) {
            return res.status(400).json({ error: true, message: "Invalid username format" });
        }
        if(!user){
            return res.status(404).json({ error: 'User not found or no books to return' });
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