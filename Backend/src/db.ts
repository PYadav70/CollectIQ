import mongoose, { model, Schema } from "mongoose";

mongoose.connect('mongodb://localhost:27017/secondBrain')
    .then(() => console.log("db connected")
    )
// user schema
    const userSchema = new Schema({
        username:{type:String,unique:true, required:true,},
        password:{type:String, required:true}

    })

    export const userModel = model("User",userSchema);

// content schema
    const ContentSchema = new Schema({
    title: String,
    link: String,
    tags: [{ type: mongoose.Types.ObjectId, ref: 'Tag' }],
    type: String,
    userId: [{ type: mongoose.Types.ObjectId, ref: 'User', required: true }],
})

export const contentModel = model("Content", ContentSchema);

// link schema
const LinkShare = new Schema({
    hash: String,
    userId: [{ type: mongoose.Types.ObjectId, ref: 'User', required: true, unique: true }],
})

export const linkModel = model("model", LinkShare)