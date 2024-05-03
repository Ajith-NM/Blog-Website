import mongoose from "mongoose";
import { user_Model } from "../models/user_Model.js";
import { blog_Model } from "../models/blog_Model.js";
import { comment_Model } from "../models/comment_Model.js";
import { replay_Model } from "../models/replay_Model.js";
import { current_User } from "./user_Controller.js";
// functions for adding comments and replays
//comments
let New_Comment
let addComments = async (cmnt, user) => {
    let newComment = new comment_Model({
        comment: cmnt,
        comment_user: user,
        replays: [],
    })
    New_Comment = await newComment.save()
}
//replays
let New_Replay
let addReplays = async (replay, user) => {
    let newReplay = new replay_Model({
        replay: replay,
        replay_user: user,
    })
    New_Replay = await newReplay.save()
}
//add comment
let blogid
export const postComment = async (req, res) => {
    if (current_User.length != 0) {
        const comment = req.body
        blogid = req.params.id
        console.log("comment", comment.Comment);
        console.log("id", blogid);
        await addComments(comment.Comment, current_User[0])
        await blog_Model.findByIdAndUpdate(blogid, { $push: { comments: New_Comment._id } })
        res.json("comment added")
    }
    else {
        res.json("please login first")
    }
}
//add replay
export const postReplay = async (req, res) => {
    if (current_User.length != 0) {
        const replay = req.body
        const cid = req.params.id
        console.log("commentreplay", replay.Replay);
        console.log("id", cid);
        await addReplays(replay.Replay, current_User[0])
        await comment_Model.findByIdAndUpdate(cid, { $push: { replays: New_Replay._id } })
        res.json("replay added")
    }
    else {
        res.json("please login first")
    }
}
//add like
export const postLike = async (req, res) => {
    if (current_User.length != 0) {
        const id = req.params.id
        let blog_likes = await blog_Model.findOne({ _id: id, liked_Users: current_User[0] }).lean({}).then((data) => {

            return data
        })
        if (blog_likes != undefined) {
            await blog_Model.findByIdAndUpdate(id, { $pull: { liked_Users: current_User[0] } })
            console.log("removed");
        } else {
            await blog_Model.findByIdAndUpdate(id, { $push: { liked_Users: current_User[0] } })
            console.log("added");
        }
        res.json("like added")
    }
    else {
        res.json("please login first")
    }
}
export const getdeleteComment = async (req, res) => {
    if (current_User.length != 0) {
        const id1 = req.params.bid
        const id2 = req.params.cid
        console.log(id1, id2);
        let blog = await blog_Model.findOne({ _id: id1, writer: current_User[0] }).lean({}).then((data) => {
            return data
        })
        if (blog != undefined) {
            await blog_Model.findByIdAndUpdate(id1, { $pull: { comments: id2 } })
            let comment = await comment_Model.findById(id2).lean({}).then((data) => {
                return data
            })
            comment.replays.forEach(async (id) => {
                await replay_Model.findByIdAndDelete(id)
            })
            await comment_Model.findByIdAndDelete(id2)
        } else {
            let comment = await comment_Model.findOne({ _id: id2, comment_user: current_User[0] }).lean({}).then((data) => {
                return data
            })
            if (comment != undefined) {
                await blog_Model.findByIdAndUpdate(id1, { $pull: { comments: id2 } })
                let comment = await comment_Model.findById(id2).lean({}).then((data) => {
                    return data
                })
                comment.replays.forEach(async (id) => {
                    await replay_Model.findByIdAndDelete(id)
                })
                await comment_Model.findByIdAndDelete(id2)
            }
        }
        res.json("comment deleted")
    }
    else {
        res.json("please login first")
    }
}
export const getdeleteReplay = async (req, res) => {
    if (current_User.length != 0) {
        const id1 = req.params.cid
        const id2 = req.params.rid
        console.log(id1, id2);
        let comment = await comment_Model.findOne({ _id: id1, comment_user: current_User[0] }).lean({}).then((data) => {
            return data
        })
        if (comment != undefined) {
            await comment_Model.findByIdAndUpdate(id1, { $pull: { replays: id2 } })
            await replay_Model.findByIdAndDelete(id2)
        } else {
            let replay = await replay_Model.findOne({ _id: id2, replay_user: current_User[0] }).lean({}).then((data) => {
                return data
            })
            if (replay != undefined) {
                await comment_Model.findByIdAndUpdate(id1, { $pull: { replays: id2 } })
                await replay_Model.findByIdAndDelete(id2)
            }
        }
        res.json("replay deleted")
    }
    else {
        res.json("please login first")

    }
}