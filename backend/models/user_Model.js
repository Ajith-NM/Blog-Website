import mongoose, { Schema } from "mongoose";
const user_Schema=new mongoose.Schema({
    username:{type:String},
    email:{type:String},
    password:{type:String},
    profile_img:{type:Buffer},
    extention:{type:String},
    my_Blogs:[{type:Schema.Types.ObjectId,ref:"blogs"}],
    liked_Blogs:[{type:Schema.Types.ObjectId,ref:"blogs"}]

})
export const user_Model=mongoose.model("users",user_Schema)