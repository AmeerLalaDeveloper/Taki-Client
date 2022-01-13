import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { logout } from "../../api/api";
import { Link } from "react-router-dom";
import "./style.css";
import socket from "../../socketExport/exportSocket";
import { useSelector } from "react-redux";
import avatarImg from "../../resources/avatars/avatar.png";
export default function MainMenu() {
  const navigate = useNavigate();
  const state = useSelector((state) => state?.user);
  const user = state.user;
  useEffect(() => {}, []);

  useEffect(() => {
    // socket.on('getAllConnectedUsers', connectedUsers => {
    //     console.log('main mneu', connectedUsers.length);
    //     setConnectedUsers([...connectedUsers])
    // })
  }, []);
  // if (!localStorage.getItem('token'))
  //     navigate('/login')
  return (
    <>
      <div className="main-menu-container">
        <header className="header">
          <div className="name">
            <div>
              <span>{user?.userNameInGame}</span>
            </div>
            <img
              src={
                user?.img ? `data:image /jpeg;base64,${user?.img}` : avatarImg
              }
              alt=""
            />
          </div>
          <div className="level">
            <div className="progress" style={{ width: `${user?.exp}%` }}></div>{" "}
            <i className="fas fa-star">
              <span>{user?.level}</span>
            </i>
          </div>
          <div className="logo"></div>
        </header>

        <div className="menu-cards-container">
          <Link className="menu-card card-1" to="/offlinegame">
            <div className="logo"></div>
            <h3>Offline</h3>
          </Link>
          <Link to="/onlinegame" className="menu-card card-2">
            {" "}
            <div className="logo"></div>
            <h3>MultiPlayer</h3>
          </Link>

          <Link to="/friends" className="menu-card card-3">
            {" "}
            <div className="logo"></div>
            <h3>With Friends</h3>
          </Link>
        </div>
        <div className="menu-options-container">
          <Link to="/highscore" className="menu-option">
            <i className="fa fa-trophy" aria-hidden="true"></i>
          </Link>
          <Link to="/profile" className="menu-option">
            <i className="fas fa-user"></i>
          </Link>
          <Link to="/instructions" className="menu-option">
            <i className="fas fa-question"></i>
          </Link>
          <Link to="/requests" className="menu-option">
            <i className="fas fa-user-plus"></i>
          </Link>
          <Link
            to="/"
            className="menu-option"
            onClick={async () => {
              //remove user from socket
              socket.emit("removeFriend", { user: user });
              socket.emit("offline", user);
              // socket.off()
              await logout();
              navigate("/");
            }}
          >
            {" "}
            <i className="fa fa-sign-out" aria-hidden="true"></i>
          </Link>
        </div>
      </div>
    </>
  );
}
