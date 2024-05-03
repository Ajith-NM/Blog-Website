import mongoose from "mongoose";
const image_Scheme=new mongoose.Schema({
image:{type:Buffer},
extention:{type:String},
title:{type:String},
content:{type:String},
finding:{type:String}
})
export const image_Model=mongoose.model("homeimages",image_Scheme)