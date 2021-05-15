import React, { useState, useEffect } from "react";
import Post from "./Post";
import { db } from "./Firebase";

export default function Posts() {
  const [post, setPost] = useState([]);

  useEffect(() => {
    db.collection("posts").onSnapshot((snapshot) => {
      //Every time new post is added this code will be fires...
      setPost(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          post: doc.data(),
        }))
      );
    });
    console.log(post);
  }, []);

  return (
    <>
      <div className="app__posts">
        <div className="app__postsleft">
          {post.map(({ id, post }) => {
            return (
              <Post
                key={id}
                postID={id}
                username={post.username}
                caption={post.caption}
                imageUrl={post.imageUrl}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
