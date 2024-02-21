import mongoose from "mongoose";


const ConnectDB = async() => {
    try {
        mongoose.connect(process.env.MONGO_DB_URL);
        console.log(`Connected to MongoDB`);
    } catch (error) {
        console.log(`cont login`)
        console.log({error:`Can't connect to mongodb`});
    }
}

export default ConnectDB;