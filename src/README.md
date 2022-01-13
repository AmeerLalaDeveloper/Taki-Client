<h1 align="center">TAKI ONLINE</h1>
<h2 align="center">Two players online game of TAKI</h2>
<h3 align="center">my heroku</h3>

<img src="./resources/cards/TAKI_LOGO.png" alt="TAKI Logo" width="33%" align="center" />

## 🤔 What is TAKI?

TAKI is the classic and beloved card game that’s easy to pick up and impossible to put down! Players take turns matching a card in their hand with the current card shown on top of the deck either by color or number. Special action cards deliver game-changing moments as they each perform a function to help you defeat your opponents. These include stop, reverses,plus, draw twos, color-changing , colored TAKI.

## ⚠️ Game Rules

Read the complete rules of TAKI [here](https://www.takigame.com/taki-game-rules).

## ❓ About the Game

This two-player online version of the game was built with [React](https://reactjs.org/), [Socket.IO](https://socket.io/), [Express](https://expressjs.com/) and [Node](https://nodejs.org/en/). It currently supports two-players in each game. It also has text chat functionality to communicate with your opponent!

[How I Made This Game](https://www.youtube.com/watch?v=FBAJdbpFnjs)

## 🧐 How to Play?

1. Once you're on the homepage of the game, you can either choose to play Online game or Offline with 2 bots (algorithem that i built).

2. That's it! Enjoy the game and remember, no toxicity!

## 🎮 Screenshots
<img src="screenshots/Screenshot-1.png" alt="Screenshot 1" width="75%" align="center" />
<img src="screenshots/Screenshot-2.png" alt="Screenshot 2" width="75%" align="center" />
<img src="screenshots/Screenshot-3.png" alt="Screenshot 3" width="75%" align="center" />

## 🏁 Getting Started (to run game locally)

Follow the steps below, after cloning the repository:

### 🖐 Requirements

**For Installing:**

- Node

**For Running:**

- Change socket.IO endpoint on client side. To do this, go to `client/src/components/Game.js` and change line #26 from `const ENDPOINT = 'https://taki-ameer-server.herokuapp.com'` to `const ENDPOINT = 'http://localhost:4001'`

### ⏳ Installation

- At the root of the project directory, use npm to install the server-side dependencies

```bash
npm install
```

This command installs all the server-side dependencies needed for the game to run locally.

- Use npm to run server

```bash
npm start
```

This command gets the server running on localhost port 4001.

- In a separate terminal, navigate into the client folder and use npm to install the client-side dependencies

```bash
cd client
npm install
```

This command installs all the client-side dependencies needed for the game to run locally.

- Finally, use npm to run client

```bash
npm start
```

This command gets the client running on localhost port 3000.

Head over to http://localhost:3000/ and enjoy the game! 🎉


## 🤝 Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are greatly appreciated. The **Issues** tab is a good place to begin!

1. Fork the project repo
2. Clone the forked repo on your machine
3. Create your feature branch (`git checkout -b feature/AmazingFeature`)
4. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
5. Push to the branch on your forked repo (`git push origin feature/AmazingFeature`)
6. Open a pull request


## ❤️ Acknowledgements

<!--  -->