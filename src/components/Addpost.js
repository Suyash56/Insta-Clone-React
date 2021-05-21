import React, { useState } from "react";
import { Button } from "@material-ui/core";
import { db, storage } from "./Firebase";
import { useToasts } from "react-toast-notifications";
import firebase from "firebase";
import "../css/Addpost.css";

function Addpost({ username }) {
  const { addToast } = useToasts();

  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      //Get the first file if user select multiple files
      setImage(e.target.files[0]);
    }
  };
  const handleUpload = () => {
    const uploadImage = storage.ref(`images/${image.name}`).put(image);
    uploadImage.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        //Error message
        console.log(error);
        alert(error.message);
      },
      () => {
        //Complete function
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            db.collection("posts").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              caption: caption,
              imageUrl: url,
              username: username,
            });
            addToast("Post is added successfully", {
              appearance: "success",
              autoDismiss: true,
            });
            setProgress(0);
            setCaption("");
            setImage(null);
          });
      }
    );
  };
  return (
    <div className="app__addpost">
      {/* Progress bar */}
      <progress
        className="imageUpload__progress"
        value={progress}
        max="100"
      ></progress>
      {/* Take Caption from user */}
      <input
        type="text"
        placeholder="Enter a caption..."
        onChange={(e) => setCaption(e.target.value)}
        value={caption}
      />
      {/* Take image file from user*/}
      <input type="file" onChange={handleChange} />
      <Button onClick={handleUpload}>Upload</Button>
    </div>
  );
}

export default Addpost;
