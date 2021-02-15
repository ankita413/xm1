import mongoose from "mongoose";

const DBconnection = async () => {
  try {
  
    if (process.env.NODE_ENV !== "production") {
      process.env.MONGO_URL =  process.env.MONGO_URL;
      
    }
    
    const connect = await mongoose.connect(process.env.NODE_ENV, {
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