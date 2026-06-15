"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function TweetDetailClient() {
  const params = useParams();
  let id = params?.id;
  // Fallback: when deployed the params object can be empty for client components,
  // so parse the id from the pathname as a reliable fallback.
  if (!id && typeof window !== "undefined") {
    const parts = window.location.pathname.split("/").filter(Boolean);
    id = parts[parts.length - 1];
  }
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
        <p>Wybrany tweet nie istnieje lub wystąpił błąd podczas pobierania.</p>
        <a href="/" style={{ color: "blue", textDecoration: "underline" }}>
          ← Back to Feed
        </a>
      </main>
    );
  }

  const tweet =
    tweetResp?.post ??
    (Array.isArray(tweetResp?.posts) ? tweetResp.posts[0] : tweetResp);
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
