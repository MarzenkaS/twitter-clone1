import { connectDB } from "@/app/lib/mongoose";

export default async function Page() {
  await connectDB();

  return (
    <div>
      Tweet page
    </div>
  );
}