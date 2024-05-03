import mongoose from "mongoose";
import { blog_Model } from "../models/blog_Model.js";
import { user_Model } from "../models/user_Model.js";
import { current_User } from "./user_Controller.js";
//blog adding function
//console.log("current user in blog page", current_User);

let newly_created_blog
let addNew_Blog = async (title, img, ext, body, sub, user, type) => {
    let newBlog = new blog_Model({
        title: title,
        image: img,
        extention: ext,
        content: body,
        sub_Title: sub,
        comments: [],
        replays: [],
        writer: user,
        liked_Users: [],
        category: type
    })
    newly_created_blog = await newBlog.save()
}
//get all blogs
export const getBlogs = async (req, res) => {
    let allBlogs = await blog_Model.find().populate('writer').lean({}).then((data) => {
        return data
    })
    if (allBlogs.length == 0) {
        res.json("No Blogs")
    } else {
        for (let i = 0; i < allBlogs.length; i++) {
            allBlogs[i].comments = allBlogs[i].comments.length
            allBlogs[i].liked_Users = allBlogs[i].liked_Users.length
        }
        // console.log(allBlogs);
        res.json(allBlogs)
    }

}
//get current user blogs
export const getmyBlogs = async (req, res) => {

    if (current_User.length == 0) {
        //console.log("invalid");
        res.json("invalid user")

    } else {
        let myblogs = await user_Model.findById(current_User[0]).populate("my_Blogs").lean({}).then((data) => {
            return data
        })
        // console.log("myblogs", myblogs);

        if (myblogs.my_Blogs.length == 0) {
            res.json("No Blogs")

        } else {
            for (let i = 0; i < myblogs.my_Blogs.length; i++) {
                myblogs.my_Blogs[i].comments = myblogs.my_Blogs[i].comments.length
                myblogs.my_Blogs[i].liked_Users = myblogs.my_Blogs[i].liked_Users.length
            }
            res.json(myblogs)
        }

    }

}
//blog creation
export const postCreation = async (req, res) => {
    if (current_User.length == 0) {
        res.json("please login first")
    } else {

        let image = req.file   //(title,img,ext,body,sub,user,type)
        let new_blog = req.body
        //  console.log(new_blog);    
        await addNew_Blog(new_blog.title, image.buffer, image.mimetype, new_blog.content, new_blog.subtitle, current_User[0], new_blog.category)
        await user_Model.findByIdAndUpdate(current_User[0], { $push: { my_Blogs: newly_created_blog._id } })
        res.json("successfull")

    }
}
//fetching user requested blog
export const getblogView = async (req, res) => {
    
    const id = req.params.id
    
 let blog=await blog_Model.findById(id).populate([{
        path: "comments",
        model: "comments",
        populate: [{
            path: "replays",
            model: "replays",
            populate: {
                path: "replay_user",
                model: "users",
            }
        },
       {
            path:"comment_user",
            model:"users"
        }]
    }, {
        path: "writer",
        model:"users"
    }]).lean({}).then((data) => {
        console.log("view", data.comments);
         return data
    })

    let blog_likes=await blog_Model.findOne({_id:id,liked_Users:current_User[0]}).lean({}).then((data)=>{ 
        return data
    })
    let like
    if (blog_likes!=undefined) {
        like=true
    } else {
        like=false
    }
    
   res.json({blog:blog,status:like})
}

