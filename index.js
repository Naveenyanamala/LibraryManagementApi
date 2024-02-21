import express from 'express'
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import ConnectDB from './db/ConnectToMongodb.js';
import authRoutes from './routes/auth.routes.js';
import bookRoutes from './routes/book.routes.js';
import cors from 'cors';

dotenv.config();
const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(cors());
app.use('/uploads',express.static('uploads'));
const PORT = process.env.PORT || 5000

app.get('/' ,(req,res) => {
    res.json('hello')
})


app.use('/api/auth',authRoutes);
app.use('/api/book',bookRoutes);




const start = async () => {
    try {
        ConnectDB();
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        })
    } catch (error) {
        console.log(error.message);
    }
}

start();