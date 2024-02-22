import bookModel from '../models/Book.model.js';


export const createBook = async (req,res ) => {
    try {
        const reqData= JSON.parse(req.body.body);
        
        const{title,author,ISBN,publicationDate,genre,availability,bookCount} =JSON.parse(req.body.body);
        const user=req.user;
       
        if(user.role !== 'admin' && user.role!=='librarians'){
            return res.status(403).json({message:`Unauthorized`});
        }
        
        if (!title || !author || !ISBN || !publicationDate || !genre || !availability || !bookCount) {
            return res.status(400).json({ error: "Provide all fields" });
        }

        const existingBook = await bookModel.findOne({ title });
        
        if(existingBook){

            existingBook.bookCount = (existingBook.bookCount || 0)+1;
            
            if(req.files){
                let path= ''
                req.files.forEach((files,index,arr) => {
                    path= path+ files.path + ','
                })
                path = path.subst(0,path.lastIndexOf(","))
                existingBook.coverImage =path;
            }
            
            
            await existingBook.save();
            res.status(200).json({book: existingBook});

        }else{
            let path= ''
            
            req.files.forEach((files,index,arr) => {
                path= path+ files.path + ','
            })
            
            path = path.substring(0,path.lastIndexOf(","));
            console.log(bookCount);
            const coverImage = path ;
            
            const book = await bookModel.create({ ...reqData,coverImage});
            
            res.status(201).json({book});
        }
     
    } catch (error) {
        res.status(500).json({error:`Internal server error`});
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
        const booktitle = await bookModel.findOne({title:name});
        const bookauthor = await bookModel.find({author:name});

        if(!booktitle  && ! bookauthor){
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
       
        if (user.role !== 'admin' && user.role !== 'librarian') {
            return res.status(403).json({ message: 'Unauthorized' });
        }
        
        
        const updatedBook = await bookModel.findByIdAndUpdate({_id:id}, req.body, { new: true });

        if (!updatedBook) {
            return res.status(404).json({ error: 'Book not found' });
        }

        res.status(200).json({ updatedBook });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};


export const deleteBook = async (req, res) => {
    try {
        const { id } = req.params;
        const user = req.user;
        
        if (user.role !== 'admin' && user.role !== 'librarian') {
            return res.status(403).json({ message: 'Unauthorized' });
        }
        
        const deletedBook = await bookModel.findOneAndDelete({_id:id});
        
        if (!deletedBook) {
            return res.status(404).json({ error: 'Book not found' });
        }

        res.status(204).json({message:`book deleted`});
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};