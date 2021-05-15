import React, { useContext } from "react";
import { Usercontext } from "./Usercontext";
import Posts from "./Posts";
import Addpost from "./Addpost";
import "../css/App.css";

export default function App() {
  const obj = useContext(Usercontext);
  const [user] = obj.user;

  const [SignUp] = obj.SignUp;

  return (
    <>
      <div className="app">
        {/* Post */}
        <Posts />
        {/* Add Post */}
        {!SignUp && user?.displayName ? (
          <Addpost username={user.displayName} />
        ) : (
          <h3>Login to upload</h3>
        )}
      </div>
    </>
  );
}
