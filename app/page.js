import Link from "next/link";
import TweetCard from "@/components/TweetCard";

async function getTweets() {
  const res = await fetch("https://dummyjson.com/posts");
  return res.json();
}

export default async function HomePage() {
  const tweets = await getTweets();

  return (
    <main>
      <h1>📝 Latest Tweets</h1>
      {tweets.posts.map((tweet) => (
        <Link key={tweet.id} href={`/tweet/${tweet.id}`}>
          <TweetCard tweet={tweet} />
        </Link>
      ))}
    </main>
  );
}



/* "use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    async function fetchTweets() {
      const res = await fetch("/api/tweets");
      const data = await res.json();
      setTweets(data);
    }
    fetchTweets();
  }, []);

  return (
    <div>
      <h1>Latest Tweets</h1>
      {tweets.map((tweet) => (
        <div key={tweet.id}>
          <p><strong>{tweet.user}</strong>: {tweet.content}</p>
          <small>{tweet.timestamp}</small>
        </div>
      ))}
    </div>
  );
}  */

// app/page.js
// 📌 Fetches tweets and displays them in the feed


