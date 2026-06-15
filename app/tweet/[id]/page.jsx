// app/tweet/[id]/page.js
// 📌 Fetches and displays details for a single tweet

async function getTweet(id) {
  const res = await fetch(`https://dummyjson.com/posts/${id}`);
  return res.json();
}

export default async function TweetDetail({ params }) {
  const { id } = params;
  const tweetResp = await getTweet(id);
  const tweet =
    tweetResp?.post ??
    (Array.isArray(tweetResp?.posts) ? tweetResp.posts[0] : tweetResp);

  if (!tweet) {
    return (
      <main>
        <h1>Tweet not found</h1>
        <a href="/" style={{ color: "blue", textDecoration: "underline" }}>
          ← Back to Feed
        </a>
      </main>
    );
  }

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
      {tags && <p>Tags: {tags}</p>}
      <a href="/" style={{ color: "blue", textDecoration: "underline" }}>
        ← Back to Feed
      </a>
    </main>
  );
}
