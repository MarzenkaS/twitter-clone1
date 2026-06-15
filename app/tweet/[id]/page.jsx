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

  const likes = tweet.reactions?.likes ?? tweet.likes ?? 0;
  const dislikes = tweet.reactions?.dislikes ?? tweet.dislikes ?? 0;
  const tags = Array.isArray(tweet.tags)
    ? tweet.tags.join(", ")
    : Array.isArray(tweet.tagList)
      ? tweet.tagList.join(", ")
      : "";

  const title =
    tweet.title ?? tweet.name ?? tweet.heading ?? tweet.subject ?? "";
  const body =
    tweet.body ?? tweet.content ?? tweet.text ?? tweet.description ?? "";

  return (
    <main>
      <h1>{title || "(no title)"}</h1>
      {body ? <p>{body}</p> : null}
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
