
export const validateName =async (title, ISBN,author,bookCount,genre) => {
    const titleRegex = /^[A-Za-z]+$/; // This regex allows only alphabets
        
    if (!title || !titleRegex.test(title)) {
        return res.status(400).json({ error: true, message: "Invalid name format" });
    }

    const numberISBN = /^[0-9]+$/; // This regex allows only numbers

    if (!ISBN || !numberISBN.test(ISBN)) {
        return res.status(400).json({ error: true, message: "Invalid name format" });
    }

    if (!bookCount || !numberISBN.test(bookCount)) {
        return res.status(400).json({ error: true, message: "Invalid name format" });
    }

    const nameRegex = /^[A-Za-z]+$/; // This regex allows only alphabets
        
    if (!author || !nameRegex.test(author)) {
        return res.status(400).json({ error: true, message: "Invalid name format" });
    }
        
    if (!genre || !nameRegex.test(genre)) {
        return res.status(400).json({ error: true, message: "Invalid name format" });
    }

    
}