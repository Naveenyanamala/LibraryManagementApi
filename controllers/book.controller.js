import bookModel from '../models/Book.model.js';



export const createBook = async (req,res ) => {
    try {
        
        const reqData= JSON.parse(req.body.body);
        
        const{title,author,ISBN,publicationDate,genre,availability,bookCount} =reqData;

        const user=req.user;

        const titleRegex = /^[A-Za-z]+$/; // This regex allows only alphabets
        
        if (!title || !titleRegex.test(title)) {
            return res.status(400).json({ error: true, message: "Invalid name format" });
        }

        const numberISBN = /^[0-9]+$/; // This regex allows only numbers

        if (!ISBN || !numberISBN.test(ISBN)) {
            return res.status(400).json({ error: true, message: "Invalid ISBN format" });
        }

        if (!bookCount || !numberISBN.test(bookCount)) {
            return res.status(400).json({ error: true, message: "Invalid nambookCounte format" });
        }

        const nameRegex = /^[A-Za-z]+$/; // This regex allows only alphabets
            
        if (!author || !nameRegex.test(author)) {
            return res.status(400).json({ error: true, message: "Invalid author format" });
        }
            
        if (!genre || !nameRegex.test(genre)) {
            return res.status(400).json({ error: true, message: "Invalid genre format" });
        }

        if(user.role !== 'admin' && user.role!=='librarians'){
            return res.status(403).json({message:`Unauthorized`});
        }
        
        
        const dateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;


        if (!publicationDate || !dateRegex.test(publicationDate)) {
            return res.status(400).json({ error: true, message: "Invalid date format" });
        }

        if (typeof availability !== 'boolean') {
            return res.status(400).json({ error: true, message: "Invalid availability format" });
        }

        
        const existingBook = await bookModel.findOne({ title });
        
        if(existingBook){

            existingBook.bookCount = (existingBook.bookCount || 0)+1;
           
            if (req.file) {
                 const coverImageUrl = "http://localhost:5000/" + req.file.path;
                 book = await bookModel.create({ ...reqData, coverImageUrl: coverImageUrl });
                 return res.status(200).json({book});
             }
            await existingBook.save();
            return res.status(200).json({book: existingBook});

        }
            
        let book;

    
      
        if (req.file) {
            const coverImageUrl = "http://localhost:5000/" + req.file.path;
            book = await bookModel.create({ ...reqData, coverImageUrl: coverImageUrl });
            return res.status(200).json({book});
        }
        else {
            book = await bookModel.create({ ...reqData });
            return res.status(200).json({book});
        }
            
     
    } catch (error) {
        return res.status(500).json({error:`Internal server error`});
    }
};


export const getAllBooks = async (req, res) => {
    try {
        const books = await bookModel.find();
    
        if (books.length > 0) {
            res.status(200).json({ books });
        } else {
            res.status(404).json({ message: 'No books found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};


export const getBook = async (req, res) => {
    try {
        const name =req.params.books;

        const titleRegex = /^[A-Za-z0-9]+$/; // This regex allows only alphabets
        
        if (!name || !titleRegex.test(name)) {
            return res.status(400).json({ error: true, message: "Invalid  format" });
        }

        const booktitle = await bookModel.findOne({title:name});
        const bookauthor = await bookModel.find({author:name});

        if(!booktitle  || ! bookauthor){
            return res.status(404).json({ error: 'No books found' });
        }

        
        if(booktitle){
            res.status(200).json({ booktitle });
        }else{
            res.status(200).json({ bookauthor });
        }
      
        
    } catch (error) {
        console.error("Error fetching books:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


export const updateBook = async (req, res) => {
    try {
        const { id } = req.params;
        const user = req.user;
        const objectIdRegex = /^[a-zA-Z0-9]{24}$/;

        if (!objectIdRegex.test(id)) {
            return res.status(400).json({ error: true, message: "Invalid ID format" });
        }


        const reqData= JSON.parse(req.body.body);

        
        const{title,author,ISBN,publicationDate,genre,availability,bookCount} =reqData;

     

        const titleRegex = /^[A-Za-z]+$/; // This regex allows only alphabets
        
        if (!title || !titleRegex.test(title)) {
            return res.status(400).json({ error: true, message: "Invalid name format" });
        }

        const numberISBN = /^[0-9]+$/; // This regex allows only numbers

        if (!ISBN || !numberISBN.test(ISBN)) {
            return res.status(400).json({ error: true, message: "Invalid ISBN format" });
        }

        const dateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;


        if (!publicationDate || !dateRegex.test(publicationDate)) {
            return res.status(400).json({ error: true, message: "Invalid date format" });
        }

        if (!bookCount || !numberISBN.test(bookCount)) {
            return res.status(400).json({ error: true, message: "Invalid nambookCounte format" });
        }

        const nameRegex = /^[A-Za-z]+$/; // This regex allows only alphabets
            
        if (!author || !nameRegex.test(author)) {
            return res.status(400).json({ error: true, message: "Invalid author format" });
        }
            
        if (!genre || !nameRegex.test(genre)) {
            return res.status(400).json({ error: true, message: "Invalid genre format" });
        }

        if (typeof availability !== 'boolean') {
            return res.status(400).json({ error: true, message: "Invalid availability format" });
        }
        

        if (user.role !== 'admin' && user.role !== 'librarian') {
            return res.status(403).json({ message: 'Unauthorized' });
        }
        
        if(req.file){
            const prefix="http://localhost:5000/" 
            const data = ({...reqData,coverImageUrl:prefix+req.file.path});
            
            const updatedBook = await bookModel.findByIdAndUpdate({_id:id}, data, { new: true });
            if (!updatedBook) {
                return res.status(404).json({ error: 'Book not found' });
            }
            return res.status(200).json({ updatedBook });
            
        }
        const data = ({...reqData,coverImageUrl:""});
        const updatedBook = await bookModel.findByIdAndUpdate({_id:id}, data, { new: true });
        

    
        if (!updatedBook) {
            return res.status(404).json({ error: 'Book not found' });
        }
        
        return res.status(200).json({ updatedBook });

        
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};


export const deleteBook = async (req, res) => {
    try {
        const { id } = req.params;
        const user = req.user;
        
        const objectIdRegex = /^[a-zA-Z0-9]{24}$/;

        if (!objectIdRegex.test(id)) {
            return res.status(400).json({ error: true, message: "Invalid ID format" });
        }
        
        
        
        const deletedBook = await bookModel.findOneAndDelete({_id:id});
        
        if (!deletedBook) {
            return res.status(404).json({ error: 'Book not found' });
        }

        return res.status(204).json({message:`book deleted`});
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};