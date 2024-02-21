import bookModel from '../models/Book.model.js';


export const createBook = async (req,res ) => {
    try {
        
        const{title,authors,ISBN,publicationDate,genre,coverImageUrl,availability} =req.body;
        const user=req.user;
        console.log(req.user);
        if(user.role !== 'admin' || user.role!=='librarians'){
            return res.status(403).json({message:`Unauthorized`});
        }
        
        if(!title || !authors || !ISBN || !publicationDate|| !genre|| !coverImageUrl || !availability ){
            res.status(400).json({error:`provide all fields`});
        }
        const book = await bookModel.create(req.body);
        res.status(201).json({book});
    } catch (error) {
        res.status(500).json({error:`Internal server error`});
    }
}