import mongoose, { Schema } from "mongoose";
const blog_Schema=new mongoose.Schema({
    title:{type:String},
    image:{type:Buffer},
    extention:{type:String},
    content:{type:String},
    sub_Title:{type:String},
    date:{type:Date,default:Date.now},
    comments:[{type:Schema.Types.ObjectId,ref:"comments"}],
    writer:{type:Schema.Types.ObjectId,ref:"users"},
    liked_Users:[{type:Schema.Types.ObjectId,ref:"users"}],
    category:{type:String}
})
export const blog_Model=mongoose.model("blogs",blog_Schema)