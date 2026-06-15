import Link from "next/link";
import TweetCard from "@/components/TweetCard";

async function getTweets() {
  const res = await fetch("https://dummyjson.com/posts");
  return res.json();
}

export default async function TweetPage() {
  const tweets = await getTweets();

  return (
    <main>
      <h1>📝 Tweets</h1>
      {tweets.posts.map((tweet) => (
        <Link key={tweet.id} href={`/tweet/${tweet.id}`}>
          <TweetCard tweet={tweet} />
        </Link>
      ))}
    </main>
  );
}
