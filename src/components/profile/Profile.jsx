import { LinearProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Profile.css";
import Popup from "reactjs-popup";
import EditIcon from "@mui/icons-material/Edit";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link } from "react-router-dom";
import { FileUploader } from "react-drag-drop-files";
import avatarImg from "../../resources/avatars/avatar.png";
import { updateImage, updateUsername } from "../../api/api";
import { setUser } from "../../redux/slices/userSlices";
import { useNavigate } from "react-router";
export default function Profile() {
  const [userImage, setUserImage] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector((state) => state?.user);
  const user = state?.user;
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!user) navigate("/main");
  });
  const submitImageToDB = async () => {
    const userWithImage = await updateImage(userImage, user._id);
    dispatch(setUser({ user: userWithImage }));
  };

  const handleChange = (file) => {
    setUserImage(file);
    //await axios.put(/updateuserImage)
  };
  const changeUserName = async (e) => {
    e.preventDefault();
    if (!e.target.value) return;
    try {
      const updatedUser = await updateUsername(user._id, e.target.value);
      dispatch(setUser({ user: updatedUser }));
    } catch (er) {}
  };
  return (
    <>
      <main className="profile-container">
        <Link to="/main">
          <LogoutIcon
            style={{
              transform: "rotate(180deg)",
              position: "absolute",
              top: "5%",
              left: "5%",
              fontSize: "45px",
              color: "white",
            }}
          ></LogoutIcon>
        </Link>
        <div className="card">
          <div className="left">
            <img
              src={
                user?.img ? `data:image/jpeg;base64,${user?.img}` : avatarImg
              }
              alt="user"
            />
            <div className="img-border">
              <div className="img-border"></div>
            </div>
            <Popup
              position="top center"
              open={open}
              trigger={
                <EditIcon
                  onClick={() => setOpen(!open)}
                  style={{ cursor: "pointer" }}
                ></EditIcon>
              }
            >
              <FileUploader
                handleChange={handleChange}
                name="file"
                types={["JPG", "PNG", "GIF", "JPEG", "JFIF"]}
              />
              {!userImage ? (
                <></>
              ) : (
                <button
                  style={{
                    width: "100%",
                    border: "none",
                    background: "#011240",
                    color: "white",
                    padding: ".5rem",
                  }}
                  onClick={() => submitImageToDB()}
                >
                  Done
                </button>
              )}
            </Popup>
            <div className="card-info">
              <h2>
                {user?.userNameInGame}{" "}
                <Popup
                  position="right center"
                  trigger={<EditIcon style={{ cursor: "pointer" }}></EditIcon>}
                >
                  <input
                    style={{ color: "white" }}
                    type="text"
                    className="edit-user-name"
                    onKeyDown={(e) => {
                      if (e.keyCode === 13) changeUserName(e);
                    }}
                  />
                </Popup>
              </h2>
            </div>
            <div className="card-btn">
              <div>
                <span>Wins:</span>
                <span>{user?.wins}</span>
              </div>
              <div>
                <span>Loses:</span>
                <span>{user?.lose}</span>
              </div>
            </div>
          </div>
          <div className="right">
            <div>
              <h3>Exp</h3>
              <LinearProgress
                style={{ height: "15px", borderRadius: "5px", width: "100px" }}
                variant="determinate"
                value={user?.exp || 0}
              />
            </div>
            <div>
              <h3>Level</h3>
              <p>{user?.level}</p>
            </div>
            <div>
              <h3>Points</h3>
              <p>{user?.points}</p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
