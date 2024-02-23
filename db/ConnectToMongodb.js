import mongoose from "mongoose";


const ConnectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URL);
        console.log(`Connected to MongoDB`);
    } catch (error) {
        console.log(`cont login`);
        console.log({error:`Can't connect to mongodb`});
        if (error instanceof mongoose.Error.MongooseServerSelectionError) {
            // Handle MongooseServerSelectionError
            console.error('Server Selection Error:', error.reason);
        }
    }
}

export default ConnectDB;