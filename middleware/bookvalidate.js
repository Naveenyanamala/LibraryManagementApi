
export const validateName =async (title, ISBN,author,bookCount,genre,publicationDate) => {
    const titleRegex = /^[A-Za-z]+$/; // This regex allows only alphabets
        
    if (!title || !titleRegex.test(title)) {
        return res.status(400).json({ error: true, message: "Invalid name format" });
    }

    const numberISBN = /^[0-9]+$/; // This regex allows only numbers

    if (!ISBN || !numberISBN.test(ISBN)) {
        return ({ error: true, message: "Invalid ISBN format" });
    }
    
    if (!publicationDate || !numberISBN.test(publicationDate)) {
        return ({ error: true, message: "Invalid dare format" });
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


    
};