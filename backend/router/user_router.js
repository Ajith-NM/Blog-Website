import  express from "express";
const user_router=express.Router()
import multer from "multer";
const storage=multer.memoryStorage()
const upload=multer({storage:storage})
import { postSignup,postLogin,getUser,getLogout } from "../controllers/user_Controller.js";
import { getBlogs,getmyBlogs,postCreation,getblogView } from "../controllers/blog_Controller.js";
import { postComment,postReplay,postLike,getdeleteComment,getdeleteReplay } from "../controllers/comment_Controller.js";
//user signup &login
user_router.post("/login",postLogin)
user_router.post("/signup",upload.single("pf"),postSignup)
user_router.get("/user",getUser)
user_router.get("/logout",getLogout)
//user accessing blogs
user_router.get("/blogs",getBlogs)
user_router.get("/myblogs",getmyBlogs)
user_router.post("/creation",upload.single("blg"),postCreation)
user_router.get("/view/:id",getblogView)
//user comments replays likes
user_router.post("/comment/:id",postComment)
user_router.post("/replay/:id",postReplay)
user_router.post("/like/:id",postLike)
user_router.get("/deletecmnt/:bid/:cid",getdeleteComment)
user_router.get("/deleterply/:cid/:rid",getdeleteReplay)
export default user_router