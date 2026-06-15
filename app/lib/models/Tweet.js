import mongoose from "mongoose";

const TweetSchema = new mongoose.Schema(
    {
        author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        content: { type: String, required: true, maxlength: 280 },
        date: { type: Date, default: Date.now },
        comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
        upvotes: { type: Number, default: 0 },
        downvotes: { type: Number, default: 0 },
        likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
        dislikedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    },
    { timestamps: true }
);
    
const Tweet = mongoose.models.Tweet || mongoose.model("Tweet", TweetSchema);

export default Tweet;
