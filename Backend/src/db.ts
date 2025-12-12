import mongoose, { model, Schema } from "mongoose";

mongoose
  .connect("mongodb://localhost:27017/collectIQ")
  .then(() => console.log("db connected"))
  .catch((err) => console.error("db connection error:", err));

//  User schema 
const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export const userModel = model("User", userSchema);

// Content schema
const contentSchema = new Schema(
  {
    title: { type: String, required: true },
    link: { type: String, required: true },
    details: { type: String, default: "" },
    status: {
    type: String,
    enum: ["to-learn", "in-progress", "done"],
    default: "to-learn",
  },
   // pinned or unpinne
   isPinned: { type: Boolean, default: false },
   // tag
    tags: {
      type: [String],
      default: [],
    },

    type: {
      type: String,
      required: true, // "youtube" | "twitter" | "note" | "links" | "notion"
    },

    // single user, not array
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
  
);

export const contentModel = model("Content", contentSchema);

//Link share schema
const linkShareSchema = new Schema(
  {
    hash: {
      type: String,
      required: true,
      unique: true, // each shared brain link is unique
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, // one share link per user
    },
  },
  { timestamps: true }
);

export const linkModel = model("LinkShare", linkShareSchema);
