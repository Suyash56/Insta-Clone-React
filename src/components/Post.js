import React, { useState, useEffect, useContext } from "react";
import { Usercontext } from "./Usercontext";
import firebase from "firebase";
import { db } from "./Firebase";
import { Avatar } from "@material-ui/core";
import "../css/Post.css";

export default function Post({ username, caption, imageUrl, postID }) {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const obj = useContext(Usercontext);
  const [user] = obj.user;
  const [SignUp] = obj.SignUp;

  useEffect(() => {
    let unsubscribe;
    if (postID) {
      unsubscribe = db
        .collection("posts")
        .doc(postID)
        .collection("comments")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()));
        });
    }
    return () => {
      unsubscribe();
    };
  }, [postID]);

  const postComments = (e) => {
    e.preventDefault();
    db.collection("posts").doc(postID).collection("comments").add({
      text: comment,
      username: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setComment("");
  };

  return (
    <div className="post">
      <div className="post__header">
        <Avatar className="post__avatar" alt="h" src="" />
        <h3>{username}</h3>
      </div>
      {/* Header -> avatar + username */}

      {/* Image */}

      <img src={imageUrl} alt="post" className="post_image" />

      {/* Username + Caption */}

      <h4 className="post__text">
        <strong>{username}</strong> {caption}
      </h4>

      {/* Comments */}

      <div className="post__comments">
        {comments.map((comment) => {
          return (
            <p>
              <b>{comment.username}</b> {comment.text}
            </p>
          );
        })}
      </div>

      {/* Comment Box */}
      {user && !SignUp && (
        <form className="post__commentBox">
          <input
            className="post__input"
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a comment ..."
          />
          <button
            className="post__button"
            type="submit"
            disabled={!comment}
            onClick={postComments}
          >
            Post
          </button>
        </form>
      )}
    </div>
  );
}
