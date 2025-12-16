import mongoose, { model, Schema } from "mongoose";



export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("MongoDB Connection Failed", error);
    process.exit(1);
  }
};

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
  profileImage: {
  type: String,
  default: ""
}

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
      required: true,
    },

    // single user, not array
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // privacy features
    visibility:{
      type:String,
      enum:["public", "friends","private"],
      default:"public",
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
