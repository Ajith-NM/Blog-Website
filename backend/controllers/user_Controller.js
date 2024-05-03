import mongoose from "mongoose";
import { user_Model } from "../models/user_Model.js";
//import { image_Model } from "../models/image_model.js";
import multer from "multer";
export let current_User = []
//userdata saving
let newuser
let addNew_user = async (username, email, password, image, ext) => {
    let user = new user_Model({
        username: username,
        email: email,
        password: password,
        profile_img: image,
        extention: ext,
        my_Blogs: [],
        liked_Blogs: []
    })
    console.log(user);
    newuser = await user.save()

}

//signup


export const postSignup = async (req, res) => {
    let image = req.file

    let user = await user_Model.findOne({ $or: [{ username: req.body.username }, { email: req.body.email }] }).lean({}).then((data) => {
        return data
    })
    if (user == undefined) {
        await addNew_user(req.body.username, req.body.email, req.body.password, image.buffer, image.mimetype)
        let new_user = await user_Model.findById(newuser).lean({}).then((data) => {
            return data
        })
        let data = { status: "success", user: new_user.profile_img, ext: new_user.extention }
        // console.log(newuser);
        res.json(data)
    } else {
        if (user.username == req.body.username) {
            res.json({ error: "username is already taken" })
        } else {
            res.json({ error: "email is already taken" })
        }

    }
}

//login
export const postLogin = async (req, res) => {
    current_User = []
    const new_user = req.body
    let existing_user = await user_Model.findOne({ email: new_user.email }).lean({}).then((data) => {
        return data
    })
    if (existing_user == undefined) {
        res.json("invalid email")
    }
    else if (existing_user.password == new_user.password && existing_user.username == new_user.username) {
        current_User.push(existing_user._id)
        // console.log(current_User);
        res.json({ status: "success", user: existing_user })

    }
    else {
        if (existing_user.username != new_user.username) {
            res.json({ error: "invalid username" })
        } else {
            res.json({ error: "invalid password" })
        }
    }
}
export const getUser = async (req, res) => {
    
    if (current_User.length != 0) {
        let user = await user_Model.findById(current_User[0]).populate('my_Blogs').lean({}).then((data) => {
            return data
        })
        res.json(user)
    } else {
        res.json("user")
    }
}

//logout
export const getLogout = async (req, res) => {
    current_User = []
    console.log("logout");
        res.json("logout")
    
}
