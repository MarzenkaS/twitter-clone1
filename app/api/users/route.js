import { connectDB } from "@/app/lib/mongoose";
import User from "@/app/lib/models/User";

export async function GET() {
    await connectDB();
    const users = await User.find().sort({ name: 1}).lean();
    return Response.json(users);
}

export async function POST(request) {
    await connectDB();
    const { name, handle, avatarUrl, bio } = await request.json();
    if (!name || !handle) {
        return Response.json({ error: "Name and handle are required" }, { status: 400 });
}

const user = await User.findOneAndUpdate(
    { handle: handle.toLowerCase().trim() },
    { name, handle: handle.toLowerCase().trim(), avatarUrl: avatarUrl || `https://via.placeholder.com/150`, bio: bio || "" },
    { upsert: true, new: true, setDefaultsOnInsert: true }
);

return Response.json(user, { status: 201 });
}