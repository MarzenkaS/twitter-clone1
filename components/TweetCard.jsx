// components/TweetCard.js
// 📌 Displays a single tweet with likes, hashtags, and user info

export default function TweetCard({ tweet }) {
  return (
    <div style={{ border: "1px solid #ddd", padding: "10px", margin: "10px" }}>
      <h3>{tweet.title}</h3>
      <p>{tweet.body}</p>
      <p>
        👍 {tweet.reactions.likes} | 👎 {tweet.reactions.dislikes}
      </p>
      <p>Tags: {tweet.tags.join(", ")}</p>
    </div>
  );
}
