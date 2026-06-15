import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true },
        handle: { type: String, required: true, unique: true, trim: true, lowercase: true },
        avatarUrl: { type: String },
        bio: { type: String, maxlength: 160 },
    },
    { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
