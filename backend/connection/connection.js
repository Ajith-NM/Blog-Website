import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()
export const Mongo_DB=()=>{
    mongoose.connect(process.env.CONNECTION_STRING,{dbName:"Blogs"}).then((data)=>{
        if(data)
        console.log("db connected successfully");
    }).catch((err)=>{
        console.log(err);
    })
}