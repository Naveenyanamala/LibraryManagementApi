import express from 'express'
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import ConnectDB from './db/ConnectToMongodb.js';
import authRoutes from './routes/auth.routes.js';
import bookRoutes from './routes/book.routes.js';
import borrowRoutes from './routes/borrow.routes.js';
import cors from 'cors';
import refreshTokenRoutes from "./routes/refreshToken.js";

// import overdueNotificationMiddleware from './middleware/sendOverdueEmails.js';



dotenv.config();
const app = express();
// app.use(cookieParser());
app.use("/api/refreshToken", refreshTokenRoutes);
app.use(express.json());
app.use(cors());
app.use('/uploads',express.static('uploads'));
const PORT = process.env.PORT || 5000

app.get('/' ,(req,res) => {
    res.json('hello')
})


app.use('/api/users',authRoutes);
app.use('/api/book',bookRoutes);
app.use('/api/borrow',borrowRoutes);




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