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
      {Array.isArray(tweets?.posts)
        ? tweets.posts.map((tweet) => {
            const id = tweet?.id ?? tweet?.postId ?? tweet?.userId;
            if (!id) {
              return <TweetCard key={Math.random()} tweet={tweet} />;
            }
            return (
              <Link key={id} href={`/tweet/${String(id)}`}>
                <TweetCard tweet={tweet} />
              </Link>
            );
          })
        : null}
    </main>
  );
}
