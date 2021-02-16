import mongoose from "mongoose";

const DBconnection = async () => {
  try {
  
    if (process.env.NODE_ENV !== "production") {
      process.env.NODE_ENV =  process.env.MONGO_URL;
      
    }
    
    const connect = await mongoose.connect('mongodb+srv://ankita:ankita@cluster0.nksef.mongodb.net/<dbname>?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    console.log(`MongoDB Connected: ${connect.connection.host}`);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default DBconnection;