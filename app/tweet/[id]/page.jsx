"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function TweetDetailClient() {
  const params = useParams();
  const id = params?.id;
  const [tweetResp, setTweetResp] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetch(`https://dummyjson.com/posts/${id}`)
      .then((res) => res.json())
      .then((data) => setTweetResp(data))
      .catch(() => setTweetResp({ error: true }))
      .finally(() => setLoading(false));
  }, [id]);

  if (!id) {
    return (
      <main>
        <h1>Invalid ID</h1>
        <a href="/" style={{ color: "blue", textDecoration: "underline" }}>
          ← Back to Feed
        </a>
      </main>
    );
  }

  if (loading || !tweetResp) {
    return (
      <main>
        <h1>Loading…</h1>
      </main>
    );
  }

  if (tweetResp.error || tweetResp.message) {
    return (
      <main>
        <h1>Tweet not found</h1>
        <pre style={{ whiteSpace: "pre-wrap" }}>{JSON.stringify(tweetResp, null, 2)}</pre>
        <a href="/" style={{ color: "blue", textDecoration: "underline" }}>
          ← Back to Feed
        </a>
      </main>
    );
  }

  const tweet = tweetResp?.post ?? (Array.isArray(tweetResp?.posts) ? tweetResp.posts[0] : tweetResp);
  const likes = tweet.reactions?.likes ?? tweet.likes ?? 0;
  const dislikes = tweet.reactions?.dislikes ?? tweet.dislikes ?? 0;
  const tags = Array.isArray(tweet.tags) ? tweet.tags.join(", ") : "";

  return (
    <main>
      <h1>{tweet.title ?? "(no title)"}</h1>
      {tweet.body && <p>{tweet.body}</p>}
      <p>
        👍 {likes} | 👎 {dislikes}
      </p>
      {tags && <p>Tags: {tags}</p>}
      <a href="/" style={{ color: "blue", textDecoration: "underline" }}>
        ← Back to Feed
      </a>
    </main>
  );
}
