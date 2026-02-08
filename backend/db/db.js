import mongoose from 'mongoose';

const connectToDb = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDb Connected Successfully");   
    }catch(err){
        console.error("MongoDb Connection Error! ",err.message);
        process.exit(1)
        
    }
};


export default connectToDb;