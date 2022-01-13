import "./App.css";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainMenu from "./components/Main/MainMenu";
import Game from "./components/onlineGame/Game";
import Homepage from "./components/onlineGame/Homepage";
import Offline from "./components/offline/OfflineGame";
import Explosion from "./components/Explosion/Explosion";
import Instructions from "./components/instructions/Instructions";
import HighScore from "./components/HighScore/HighScore";
import Profile from "./components/profile/Profile";
import AddFriend from "./components/Requests/AddFriend";
function App() {
  return (
    <div className="App">
      {/* <AnimateCards></AnimateCards> */}
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register />} />

          <Route path="/" element={<Login />} />

          <Route path="/main" element={<MainMenu />} />

          <Route path="/offlinegame" element={<Offline />} />

          <Route path="/onlinegame" element={<Game />} />

          <Route path="/multiplayer" element={<Homepage />} />

          {/*
          <Route path="/friends" element={<MainFriends />} />
        */}

          <Route path="/explosion" element={<Explosion />} />

          <Route path="/instructions" element={<Instructions />} />

          <Route path="/highscore" element={<HighScore />} />

          <Route path="/profile" element={<Profile />} />

          <Route path="/requests" element={<AddFriend />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
  //TODO Countries Flag
  //TODO Animation Cards
}
export default App;
