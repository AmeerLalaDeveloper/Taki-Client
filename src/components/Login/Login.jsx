import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { login } from "../../api/api";
import { setUser } from "../../redux/slices/userSlices";
import { setToken } from "../../redux/slices/tokenSlices";
import LockIcon from "@mui/icons-material/Lock";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    username: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const displayMessage = (msg = "") => {
    setMessage(msg);
    setTimeout(() => {
      setMessage("");
    }, 1500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(input);
      const currentUser = response.user;
      const token = response.token;
      dispatch(setToken({ token: token }));

      if (!currentUser) throw new Error("No user");
      dispatch(setUser({ user: currentUser }));

      // navigate('/shuffle_animation')
      navigate("/main");
    } catch (err) {
      displayMessage(err.toString() || "Username / Password Invalid");
    }
  };
  return (
    <div className="bg-image-container">
      <div className="bg-image-container register">
        <div className="content">
          <div className="logo register-logo"></div>
          <form action="">
            <div className="form-control">
              <div className="title">
                <PermIdentityIcon />
                <label htmlFor="username">Username</label>
              </div>
              <input
                name="username"
                type="text"
                id="username"
                onChange={(e) =>
                  setInput((state) => ({
                    ...state,
                    [e.target.name]: e.target.value,
                  }))
                }
              />
            </div>
            <div className="form-control">
              <div className="title">
                <LockIcon />
                <label htmlFor="username">Password</label>
              </div>
              <input
                name="password"
                type="password"
                id="password"
                onChange={(e) =>
                  setInput((state) => ({
                    ...state,
                    [e.target.name]: e.target.value,
                  }))
                }
              />
            </div>
            <button onClick={(e) => handleSubmit(e)}>Login</button>
            {message ? <p>{message}</p> : null}
          </form>
          <div>
            <Link className="move-to" to="/register">
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
