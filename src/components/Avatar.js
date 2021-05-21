import React, { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "./Firebase";
import "../css/Avatar.css";

function Avatar() {
  const [click, setClick] = useState(false);

  const handleClick = () => {
    setClick(!click);
  };

  return (
    <div onClick={handleClick}>
      <div class="avatar-dropdown-menu">
        <div class="avatar-image"></div>
        <div
          class={
            !click
              ? "avatar-dropdown-menu-items"
              : "open-avatar-dropdown-menu-items"
          }
        >
          <ul>
            <li>
              <Link to="/myaccount">MY ACCOUNT</Link>
            </li>
            <li>
              <a onClick={() => auth.signOut()}>LOG OUT</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Avatar;
