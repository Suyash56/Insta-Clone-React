import React, { useRef, useState, useContext } from "react";
import { Usercontext } from "./Usercontext";
import { auth } from "./Firebase";
import PublishRoundedIcon from "@material-ui/icons/PublishRounded";
import "../css/Account.css";
import { Button } from "@material-ui/core";

function Account() {
  const inputFile = useRef(null);
  const obj = useContext(Usercontext);
  const [user, setUser] = obj.user;
  console.log(user);
  const [image, setImage] = useState(null);

  const handleImageFile = (e) => {
    if (e.target.files[0]) {
      //Get the first file if user select multiple files
      setImage(e.target.files[0]);
    }
  };

  const updateUserInfo = () => {
    auth.user.updateProfile({
      photoURL: image,
    });
  };

  return (
    <div className="app__account">
      <div className="app_account_user">
        <div
          className="user_pic"
          onClick={() => {
            inputFile.current.click();
          }}
        >
          {auth.photoURL == null ? (
            <img src="http://s3.amazonaws.com/37assets/svn/765-default-avatar.png" />
          ) : (
            <img src={auth.photoURL} />
          )}
          <div className="uploadicon">
            <PublishRoundedIcon
              style={{
                fontSize: "4rem",
                position: "absolute",
                left: "23.3%",
                top: "60%",
              }}
            />
          </div>
        </div>
        <input
          type="file"
          id="uploadfile"
          ref={inputFile}
          onChange={handleImageFile}
        />
      </div>
      <div className="acount_divider"></div>
      <Button onClick={updateUserInfo}>Update</Button>
    </div>
  );
}

export default Account;
