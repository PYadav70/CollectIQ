import express from "express";
import jwt from "jsonwebtoken";
import { random } from "./utils.js";
import bcrypt from "bcrypt"
import { contentModel, linkModel, userModel } from "./db.js";
import dotenv from 'dotenv';
import { userMiddleware } from "./middleware.js";
import cors from 'cors'
import { JWT_SECRET } from "./config.js";



dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000
app.use(express.json())
app.use(cors())



app.post('/api/v1/signup', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({
            msg: "missing input"
        })
    }
    try {
        const salt = await bcrypt.genSalt(5);
        const hashPassword = await bcrypt.hash(password, salt)

        await userModel.create({
            username: username,
            password: hashPassword
        })
        return res.status(200).json({
            msg: "Signed up"
        })
    } catch (error: any) {
        if (error.code === 11000) {
            // duplicate username
            return res.status(409).json({
                msg: "User already exists"
            });
        }

        // Other unknown errors
        console.error("Signup error:", error);
        return res.status(500).json({
            msg: "Something went wrong",
            error: error.message
        });
    }
})


app.post('/api/v1/signin', async (req, res) => {
    try {
        const username = req.body.username
        const password = req.body.password

        if (!username || !password) {
            return res.status(401).json({
                msg: "username and password required"
            })
        }
        const user = await userModel.findOne({
            username
        })
        if (!user) {
            return res.status(404).json({
                msg: "User not found"
            })
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password)

        if (!isPasswordCorrect) {
            return res.status(401).json({
                msg: "Invalid password"
            })
        }

        const token = jwt.sign({
            id: user._id,
            username: user.username

        },JWT_SECRET)

        return res.status(200).json({
            msg: "Login successful",
            token,
        });
    } catch (error) {
        console.log("Signin error");

        return res.status(411).json({
            msg: "Something went wrong",
            error: error
        })
    }
})

app.post('/api/v1/content', userMiddleware, async (req, res) => {
    try {
        const { title, link, type, details, tags } = req.body;

        if (!link || !type) {
            return res.status(400).json({ msg: "link and type are required" });
        }

        const content = await contentModel.create({
            title: title || "",                // keep optional for now
            link,
            type,
            details: details || "",
            // use tags from frontend if it's an array, otherwise []
            tags: Array.isArray(tags) ? tags : [],
            status: "to-learn",
            // @ts-ignore
            userId: req.userId,
        });

        return res.status(201).json({
            msg: "content added",
            content,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: "Failed to add content" });
    }
});

// fetch the data
app.get('/api/v1/content', userMiddleware, async (req, res) => {
    //@ts-ignore
    const userId = req.userId
    const content = await contentModel.find({
        userId: userId
    }).populate("userId", "username")

    res.json({
        content
    })
})

// update add status
app.patch('/api/v1/content/:id/status', userMiddleware, async (req, res) => {
    const contentId = req.params.id;
    const { status } = req.body;

    const valid = ["to-learn", "in-progress", "done"];
    if (!valid.includes(status)) {
        return res.status(400).json({ msg: "Invalid status value" });
    }

    const updated = await contentModel.findOneAndUpdate(
        //@ts-ignore
        { _id: contentId, userId: req.userId },
        { status },
        { new: true }
    );

    if (!updated) {
        return res.status(404).json({ msg: "Content not found" });
    }

    res.json({
        msg: "Status updated",
        content: updated
    });
});


// DELETE post
app.delete('/api/v1/content/:id', userMiddleware, async (req, res) => {
    // id from URL
    const contentId = req.params.id;

    try {
        const result = await contentModel.deleteOne({
            _id: contentId,
            // @ts-ignore
            userId: req.userId,
        });

        if (result.deletedCount === 0) {
            return res.status(404).json({
                msg: "Content not found or not owned by user",
            });
        }

        return res.json({
            msg: "content deleted",
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            msg: "Failed to delete content",
        });
    }
});

// updating the content
app.put('/api/v1/content/:id', userMiddleware, async (req, res) => {
    const contentId = req.params.id;
    const { title, link, type, details, tags } = req.body;

    try {
        const Update: any = {};

        if (title !== undefined) Update.title = title;
        if (link !== undefined) Update.link = link;
        if (type !== undefined) Update.type = type;
        if (details !== undefined) Update.details = details;
        if (tags !== undefined) Update.tags = tags;

        const updated = await contentModel.findByIdAndUpdate(
            //@ts-ignore
            { _id: contentId, userId: req.userId },
            Update,
            { new: true }
        );
        if (!updated) {
            return res.status(404).json({ msg: "content not found" });
        }
        res.json({ msg: "content updated", content: updated })
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "failed to update content" });
    }
})


app.post('/api/v1/brain/share', userMiddleware, async (req, res) => {
    const share = req.body.share;
    try {
        if (share) {
            //check if link already exits
            const existingLink = await linkModel.findOne({
                //@ts-ignore
                userId: req.userId
            })
            if (existingLink) {
                return res.json({
                    hash: existingLink.hash
                })
            }

            //if not exists, create one
            const hash = random(10)
            await linkModel.create({
                //@ts-ignore
                userId: req.userId,
                hash
            })

            res.json({
                msg: "Updated share link",
                hash
            })

        } else {
            await linkModel.deleteOne({
                //@ts-ignore
                userId: req.userId
            })

            res.json({
                msg: "Link removed"
            })
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: "Something went wrong" });
    }
})


app.get('/api/v1/brain/:shareLink', async (req, res) => {
    const hash = req.params.shareLink

    //find the link form hash
    const link = await linkModel.findOne({
        hash
    })

    if (!link) {
        return res.status(411).json({
            msg: "Invalid link"
        })
    }

    //Fetch content & user details
    const content = await contentModel.find({
        userId: link.userId
    })

    const user = await userModel.findOne({
        _id: link.userId
    });

    if (!user) {
        return res.status(411).json({
            msg: "User not found"
        })
    }
    //if everything is fine, send username & content
    res.json({
        username: user.username,
        content
    })
})

app.listen(PORT, () => {
    console.log(`surver is running at: ${PORT}`)
})



