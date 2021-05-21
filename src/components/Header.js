import React, { useState, useEffect, useContext } from "react";
import { Usercontext } from "./Usercontext";
import { auth } from "./Firebase";
import Avatar from "./Avatar";
import { Button, Input } from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import { useToasts } from "react-toast-notifications";
import "../css/App.css";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function Header() {
  const { addToast } = useToasts();

  const [open, setOpen] = useState(false);
  const [openSignin, setOpenSignin] = useState(false);
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);

  const [username, setUsername] = useState("");
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");

  const obj = useContext(Usercontext);
  const [user, setUser] = obj.user;

  const [SignUp, setSignUp] = obj.SignUp;
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        //User has logged in ...
        setUser(authUser);
        console.log(user);
      } else {
        // User has logged out ...
        setUser(null);
      }
    });
    return () => {
      //perform some cleanup action
      unsubscribe();
    };
  }, [user, username]);

  const handleClose = () => {
    setOpen(false);
  };

  const signUp = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        authUser.user.updateProfile({
          displayName: username,
        });
        addToast("Sign Up successfully", {
          appearance: "success",
          autoDismiss: true,
        });
        setUsername("");
        setemail("");
        setPassword("");
        setOpen(false);
        setSignUp(true);
      })
      .catch((err) => {
        addToast(err.message, {
          appearance: "warning",
          autoDismiss: true,
        });
      });
  };

  const signIn = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        addToast("Sign In successfully", {
          appearance: "success",
          autoDismiss: true,
        });
        setSignUp(false);
        setemail("");
        setPassword("");
        setOpenSignin(false);
      })
      .catch((err) => {
        addToast(err.message, {
          appearance: "warning",
          autoDismiss: true,
        });
      });
  };

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <div style={modalStyle} className={classes.paper}>
          <form className="app__signup">
            <center>
              <img
                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                alt="Inastagram Logo"
                className="app__headerImage"
              />
            </center>
            <Input
              type="text"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            ></Input>
            <Input
              type="text"
              placeholder="email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
            ></Input>
            <Input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Input>
            <Button type="submit" onClick={signUp}>
              Submit
            </Button>
          </form>
        </div>
      </Modal>

      <Modal open={openSignin} onClose={() => setOpenSignin(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form className="app__signup">
            <center>
              <img
                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                alt="Inastagram Logo"
                className="app__headerImage"
              />
            </center>
            <Input
              type="text"
              placeholder="email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
            ></Input>
            <Input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Input>
            <Button type="submit" onClick={signIn}>
              Submit
            </Button>
          </form>
        </div>
      </Modal>

      <div className="app__header">
        <img
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt="Inastagram Logo"
          className="app__headerImage"
        />
        {!SignUp && user ? (
          // <Button onClick={() => auth.signOut()}>Logout</Button>
          <Avatar />
        ) : (
          <div className="app__loginContainer">
            <Button onClick={() => setOpenSignin(true)}>Sign In</Button>
            <Button onClick={() => setOpen(true)}>Sign Up</Button>
          </div>
        )}
      </div>
    </>
  );
}
