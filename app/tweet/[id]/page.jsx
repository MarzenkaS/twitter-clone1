// app/tweet/[id]/page.js
// 📌 Fetches and displays details for a single tweet

async function getTweet(id) {
  const res = await fetch(`https://dummyjson.com/posts/${id}`);
  return res.json();
}

export default async function TweetDetail({ params }) {
  const { id } = params;
  const tweet = await getTweet(id);

  const likes = tweet.reactions?.likes ?? 0;
  const dislikes = tweet.reactions?.dislikes ?? 0;
  const tags = Array.isArray(tweet.tags) ? tweet.tags.join(", ") : "";

  return (
    <main>
      <h1>{tweet.title}</h1>
      <p>{tweet.body}</p>
      <p>
        👍 {likes} | 👎 {dislikes}
      </p>
      <p>Tags: {tags}</p>
      <a href="/" style={{ color: "blue", textDecoration: "underline" }}>
        ← Back to Feed
      </a>
    </main>
  );
}
