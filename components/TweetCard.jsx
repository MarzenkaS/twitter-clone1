// components/TweetCard.js
// 📌 Displays a single tweet with likes, hashtags, and user info

export default function TweetCard({ tweet }) {
  const likes = tweet?.reactions?.likes ?? tweet?.likes ?? 0;
  const dislikes = tweet?.reactions?.dislikes ?? tweet?.dislikes ?? 0;
  const tags = Array.isArray(tweet?.tags) ? tweet.tags.join(", ") : "";

  return (
    <div className="tweet-card">
      <h3 className="tweet-title">{tweet?.title ?? "(no title)"}</h3>
      <p className="tweet-body">{tweet?.body}</p>
      <p className="tweet-meta">
        👍 {likes} | 👎 {dislikes}
      </p>
      {tags && <p className="tweet-tags">Tags: {tags}</p>}
    </div>
  );
}
