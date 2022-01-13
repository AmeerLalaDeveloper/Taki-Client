const axios = require("axios");
require("dotenv").config();
//Temp
const URL = "http://localhost:4001";
export const userAlreadyLoggedIn = async ({ username, password }) => {
  try {
    const res = await axios.post(`${URL}/getUser`, { username });
    console.log(res.data.status);
    return res.data.status;
  } catch (err) {
    return false;
  }
};
export const updateUsername = async (id, value) => {
  console.log(id, value);
  try {
    const res = await axios.put(`${URL}/updateUsername/${id}`, {
      userNameInGame: value,
    });
    return res.data;
  } catch (err) {}
};
export const register = async ({ username, password, userNameInGame }) => {
  try {
    if (!username) return "Invalid Username";
    if (!password) return "Invalid Password";

    const res = await axios.post(`${URL}/register`, {
      username: username,
      password: password,
      userNameInGame: userNameInGame,
    });
    return res.data;
  } catch (err) {
    return err;
  }
};

export const login = async ({ username, password }) => {
  try {
    if (!username) return "Invalid Username";
    if (!password) return "Invalid Password";

    //process.env.REACT_APP_PORT

    const res = await axios.post(`${URL}/login`, {
      username: username,
      password: password,
    });
    localStorage.setItem("token", res.data.token);
    console.log(res);
    return res.data;
  } catch (err) {
    return err;
  }
};

export const logout = async () => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.put(
      `${URL}/logout`,
      { status: false },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(res.data);
    return res.data;
  } catch (err) {
    return err;
  }
};

export const getUser = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.get(`${URL}/getuser/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
export const updateWinner = async (player, win) => {
  try {
    const res = await axios.put(`${URL}/updateWinnerStats`, {
      player: player,
      win: win,
    });
    return res.data;
  } catch (err) {
    return err;
  }
};

export const getUsers = async () => {
  try {
    const res = await axios.get(`${URL}/getusers`);
    return res.data;
  } catch (err) {
    return err;
  }
};

export const updateUserRequests = async (id, requests) => {
  try {
    const res = await axios.put(`${URL}/updateUserRequests/${id}`, {
      requests: requests,
    });
    return res.data;
  } catch (err) {
    return err;
  }
};

export const updateUserFriends = async (id, friends) => {
  try {
    const res = await axios.put(`${URL}/updateUserFriends/${id}`, {
      friends: friends,
    });
    return res.data;
  } catch (err) {
    return err;
  }
};

export const updateImage = async (file, id) => {
  try {
    const fd = new FormData();
    fd.append("img", file);
    const response = await axios.put(`${URL}/updateUserImage/${id}`, fd, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (err) {
    return err;
  }
};
