import React, { useEffect, useState } from 'react'
import shortid from 'shortid'
// import { getUser } from '../../api/api'
import { Link } from 'react-router-dom'
import './Game.css'
import { useDispatch, useSelector } from 'react-redux'
import { updateWinner } from '../../api/api'
import LogoutIcon from '@mui/icons-material/Logout';
import axios from 'axios'
import { setUser } from '../../redux/slices/userSlices'
import ConfettiExplosion from '@reonomy/react-confetti-explosion'
import avatarImg from '../../resources/avatars/avatar.png'
import { useNavigate } from 'react-router'
import Timer from '../Timer/Timer'
import gameOverSound from '../../assets/sounds/game-over-sound.mp3'
import useSound from 'use-sound'
import skipSound from '../../assets/sounds/skip-sound.mp3'
import firstCardOnTable from '../../logic/firstCardOnTable'
import socket from '../../socketExport/exportSocket'
// const ENDPOINT = 'https://taki-socket.netlify.app'
// const ENDPOINT = 'http://localhost:5000'
// const URL = 'https://taki-server.netlify.app'
const URL = ' http://localhost:4001'

const Game = () => {
    const numberOfPlayers = 2;
    const dispatch = useDispatch()
    const navigate = useNavigate()
    // eslint-disable-next-line
    const [room, setRoom] = useState(1)
    const [roomFull, setRoomFull] = useState(false)
    const [users, setUsers] = useState([])
    const [currentUser, setCurrentUser] = useState('')
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])
    const state = useSelector(state => state?.user)
    const user = state.user
    const [playSkipSound] = useSound(skipSound)
    const [gameOver, setGameOver] = useState(false)
    const [winner, setWinner] = useState('')
    const [turn, setTurn] = useState(users[0]?.name)
    const [player1Deck, setPlayer1Deck] = useState([])
    const [player2Deck, setPlayer2Deck] = useState([])
    const [currentColor, setCurrentColor] = useState('')
    const [currentNumber, setCurrentNumber] = useState('')
    const [playedCardsPile, setPlayedCardsPile] = useState([])
    const [drawCardPile, setDrawCardPile] = useState([])
    const [changeColor, setChangeColor] = useState(false)
    const [choosenTaki, setChoosenTaki] = useState(false)
    const [isChatBoxHidden, setChatBoxHidden] = useState(true)
    // const [shuffle, setShuffle] = useState(true)
    const [playGameOverSound] = useSound(gameOverSound)
    useEffect(() => {
        if (!user)
            navigate('/main')
    })

    useEffect(() => {
        if (user != null)
            socket.emit('join', { room: room, user: user, numberOfPlayers }, (error) => {
                if (error)
                    setRoomFull(true)
            })

        // cleanup on component unmount
        return function cleanup() {
            socket.disconnect()
        }
        // eslint-disable-next-line
    }, [])



    //runs once on component mount
    useEffect(() => {
        //shuffle PACK_OF_CARDS array
        const [shuffledCards, startingCardIndex] = firstCardOnTable()
        //extract first 7 elements to player1Deck
        const player1Deck = shuffledCards.splice(0, 7)
        //extract first 7 elements to player2Deck
        const player2Deck = shuffledCards.splice(0, 7)
        //extract the card from that startingCardIndex into the playedCardsPile
        const playedCardsPile = shuffledCards.splice(startingCardIndex, 1)

        //store all remaining cards into drawCardPile
        const drawCardPile = shuffledCards

        //send initial state to server
        socket.emit('initGameState', {
            gameOver: false,
            turn: users[0]?.name,
            player1Deck: [...player1Deck],
            player2Deck: [...player2Deck],
            currentColor: playedCardsPile[0]?.split('_')[1],
            currentNumber: playedCardsPile[0]?.split('_')[0],
            playedCardsPile: [...playedCardsPile],
            drawCardPile: [...drawCardPile]
        })
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        socket.on('initGameState', ({ gameOver, turn, player1Deck, player2Deck, currentColor, currentNumber, playedCardsPile, drawCardPile }) => {
            setGameOver(gameOver)
            setTurn(turn)
            setPlayer1Deck(player1Deck)
            setPlayer2Deck(player2Deck)
            setCurrentColor(currentColor)
            setCurrentNumber(currentNumber)
            setPlayedCardsPile(playedCardsPile)
            setDrawCardPile(drawCardPile)
        })

        socket.on('updateGameState', ({ gameOver, winner, turn, player1Deck, player2Deck, currentColor, currentNumber, playedCardsPile, drawCardPile }) => {
            gameOver && setGameOver(gameOver)
            winner && setWinner(winner)
            turn && setTurn(turn)
            player1Deck && setPlayer1Deck(player1Deck)
            player2Deck && setPlayer2Deck(player2Deck)
            currentColor && setCurrentColor(currentColor)
            currentNumber && setCurrentNumber(currentNumber)
            playedCardsPile && setPlayedCardsPile(playedCardsPile)
            drawCardPile && setDrawCardPile(drawCardPile)
        })

        socket.on("roomData", ({ users }) => {

            setUsers(users)
        })
        socket.on('currentUserData', ({ name }) => {

            setCurrentUser(name)
        })
        socket.on('message', message => {
            setMessages(messages => {
                return [...messages, message]
            }
            )
            const chatBody = document.querySelector('.chat-body')
            chatBody.scrollTop = chatBody.scrollHeight
        })
        return function cleanup() {
            try {

                //shut down connnection instance
                socket.disconnect()
            }
            catch (err) {
                // navigate('/login')
            }
        }
        // eslint-disable-next-line
    }, [])



    //util functions
    const toggleChatBox = () => {
        const chatBody = document.querySelector('.chat-body')
        if (isChatBoxHidden) {
            chatBody.style.display = 'block'
            setChatBoxHidden(false)
        }
        else {
            chatBody.style.display = 'none'
            setChatBoxHidden(true)
        }
    }

    const sendMessage = (event) => {
        event.preventDefault()
        if (message) {
            socket.emit('sendMessage', { message: message }, () => {
                setMessage('')
            })
        }
    }
    const checkGameOver = (arr) => {
        return arr.length === 0
    }

    const checkWinner = (arr, player) => {
        if (arr.length === 1) {
            //add money - add xp - level if needed
            updateWinner(player, true).then(res => dispatch(setUser({ user: res })))
            if (player === users[0].name) {
                axios.put(`${URL}/updateLoseStats/${users[1]?._id}`, { lose: users[1].lose + 1 }).then(res => {
                })
            }

            else {
                axios.put(`${URL}/updateLoseStats/${users[0]?._id}`, { lose: users[0].lose + 1 }).then(res => {
                })
            }
        }
        return arr.length === 1 ? player : ''
    }

    //driver functions
    const onCardPlayedHandler = (played_card) => {
        console.log(currentColor, currentNumber, played_card);
        //extract player who played the card

        const cardPlayedBy = turn
        switch (played_card) {
            //if card played was a number card
            case '1_yellow': case '3_yellow': case '4_yellow': case '5_yellow': case '6_yellow': case '7_yellow': case '8_yellow': case '9_yellow': case '1_red': case '3_red': case '4_red': case '5_red': case '6_red': case '7_red': case '8_red': case '9_red': case '1_blue': case '3_blue': case '4_blue': case '5_blue': case '6_blue': case '7_blue': case '8_blue': case '9_blue': case '1_green': case '3_green': case '4_green': case '5_green': case '6_green': case '7_green': case '8_green': case '9_green': {
                //extract number and color of played card
                const numberOfPlayedCard = played_card.split('_')[0]
                const colorOfPlayedCard = played_card.split('_')[1]
                //check for color match
                if (currentColor === colorOfPlayedCard || currentNumber === numberOfPlayedCard) {
                    //check who played the card and return new state accordingly
                    if (cardPlayedBy === users[0]?.name) {
                        //remove the played card from player1's deck and add it to playedCardsPile (immutably)
                        //then update turn, currentColor and currentNumber
                        const removeIndex = player1Deck.indexOf(played_card)
                        socket.emit('updateGameState', {
                            gameOver: checkGameOver(drawCardPile),
                            winner: checkWinner(player1Deck, users[0]?.name),
                            turn: users[1]?.name,
                            playedCardsPile: [...playedCardsPile.slice(0, playedCardsPile.length), played_card, ...playedCardsPile.slice(playedCardsPile.length)],
                            player1Deck: [...player1Deck.slice(0, removeIndex), ...player1Deck.slice(removeIndex + 1)],
                            currentColor: colorOfPlayedCard,
                            currentNumber: numberOfPlayedCard
                        })
                        // }
                    }
                    else {
                        //remove the played card from player2's deck and add it to playedCardsPile (immutably)
                        //then update turn, currentColor and currentNumber
                        const removeIndex = player2Deck.indexOf(played_card)
                        //send new state to server
                        socket.emit('updateGameState', {
                            gameOver: checkGameOver(drawCardPile),
                            winner: checkWinner(player2Deck, users[1].name),
                            turn: users[0]?.name,
                            playedCardsPile: [...playedCardsPile.slice(0, playedCardsPile.length), played_card, ...playedCardsPile.slice(playedCardsPile.length)],
                            player2Deck: [...player2Deck.slice(0, removeIndex), ...player2Deck.slice(removeIndex + 1)],
                            currentColor: colorOfPlayedCard,
                            currentNumber: numberOfPlayedCard
                        })
                    }
                    // }
                }

                //if no color or number match, invalid move - do not update state

                break;
            }
            //if card played was a skip card
            case 'reverse_yellow': case 'reverse_blue': case 'reverse_red': case 'reverse_green': case 'stop_green': case 'stop_red': case 'stop_blue': case 'stop_yellow': case 'plus_green': case 'plus_red': case 'plus_yellow': case 'plus_blue': case 'taki_red': case 'taki_yellow': case 'taki_green': case 'taki_blue': {
                //extract color of played skip card
                const colorOfPlayedCard = played_card.split('_')[1]
                const numberOfPlayedCard = played_card.split('_')[0]
                //check for color match
                if (currentColor === colorOfPlayedCard || currentNumber === numberOfPlayedCard) {
                    playSkipSound()

                    //check who played the card and return new state accordingly
                    if (cardPlayedBy === users[0]?.name) {
                        //remove the played card from player1's deck and add it to playedCardsPile (immutably)
                        //then update currentColor and currentNumber
                        const removeIndex = player1Deck.indexOf(played_card)

                        //send new state to server
                        socket.emit('updateGameState', {
                            gameOver: checkGameOver(drawCardPile),
                            winner: checkWinner(player1Deck, users[0]?.name),
                            playedCardsPile: [...playedCardsPile.slice(0, playedCardsPile.length), played_card, ...playedCardsPile.slice(playedCardsPile.length)],
                            player1Deck: [...player1Deck.slice(0, removeIndex), ...player1Deck.slice(removeIndex + 1)],
                            currentColor: colorOfPlayedCard,
                            currentNumber: numberOfPlayedCard
                        })
                    }

                    else {
                        //remove the played card from player2's deck and add it to playedCardsPile (immutably)
                        //then update currentColor and currentNumber
                        const removeIndex = player2Deck.indexOf(played_card)
                        //if two cards remaining check if player pressed UNO button
                        //if not pressed add 2 cards as penalty

                        //send new state to server
                        socket.emit('updateGameState', {
                            gameOver: checkGameOver(drawCardPile),
                            winner: checkWinner(player2Deck, users[1]?.name),
                            playedCardsPile: [...playedCardsPile.slice(0, playedCardsPile.length), played_card, ...playedCardsPile.slice(playedCardsPile.length)],
                            player2Deck: [...player2Deck.slice(0, removeIndex), ...player2Deck.slice(removeIndex + 1)],
                            currentColor: colorOfPlayedCard,
                            currentNumber: numberOfPlayedCard
                        })

                    }
                }


                break;
            }
            //if card played was a draw 2 card
            case 'draw2_yellow': case 'draw2_red': case 'draw2_green': case 'draw2_blue': {
                //extract color of played skip card
                const colorOfPlayedCard = played_card.split('_')[1]
                const numberOfPlayedCard = played_card.split('_')[0]
                //check for color match
                if (currentColor === colorOfPlayedCard || currentNumber === numberOfPlayedCard) {
                    //check who played the card and return new state accordingly
                    if (cardPlayedBy === users[0]?.name) {
                        //remove the played card from player1's deck and add it to playedCardsPile (immutably)
                        //remove 2 new cards from drawCardPile and add them to player2's deck (immutably)
                        //then update currentColor and currentNumber - turn will remain same
                        const removeIndex = player1Deck.indexOf(played_card)
                        //make a copy of drawCardPile array
                        const copiedDrawCardPileArray = [...drawCardPile]
                        //pull out last two elements from it
                        const drawCard1 = copiedDrawCardPileArray.pop()
                        const drawCard2 = copiedDrawCardPileArray.pop()

                        //send new state to server
                        socket.emit('updateGameState', {
                            gameOver: checkGameOver(drawCardPile),
                            winner: checkWinner(player1Deck, users[0]?.name),
                            turn: users[1].name,
                            playedCardsPile: [...playedCardsPile.slice(0, playedCardsPile.length), played_card, ...playedCardsPile.slice(playedCardsPile.length)],
                            player1Deck: [...player1Deck.slice(0, removeIndex), ...player1Deck.slice(removeIndex + 1)],
                            player2Deck: [...player2Deck.slice(0, player2Deck.length), drawCard1, drawCard2, ...player2Deck.slice(player2Deck.length)],
                            currentColor: colorOfPlayedCard,
                            currentNumber: numberOfPlayedCard,
                            drawCardPile: [...copiedDrawCardPileArray]
                        })

                    }
                    else {
                        //remove the played card from player2's deck and add it to playedCardsPile (immutably)
                        //remove 2 new cards from drawCardPile and add them to player1's deck (immutably)
                        //then update currentColor and currentNumber - turn will remain same
                        const removeIndex = player2Deck.indexOf(played_card)
                        //make a copy of drawCardPile array
                        const copiedDrawCardPileArray = [...drawCardPile]
                        //pull out last two elements from it
                        const drawCard1 = copiedDrawCardPileArray.pop()
                        const drawCard2 = copiedDrawCardPileArray.pop()

                        //send new state to server
                        socket.emit('updateGameState', {
                            gameOver: checkGameOver(drawCardPile),
                            winner: checkWinner(player2Deck, users[1]?.name),
                            turn: users[0]?.name,
                            playedCardsPile: [...playedCardsPile.slice(0, playedCardsPile.length), played_card, ...playedCardsPile.slice(playedCardsPile.length)],
                            player2Deck: [...player2Deck.slice(0, removeIndex), ...player2Deck.slice(removeIndex + 1)],
                            player1Deck: [...player1Deck.slice(0, player1Deck.length), drawCard1, drawCard2, ...player1Deck.slice(player1Deck.length)],
                            currentColor: colorOfPlayedCard,
                            currentNumber: numberOfPlayedCard,
                            drawCardPile: [...copiedDrawCardPileArray]
                        })

                    }
                }

                break;
            }
            //if card played was a wild card
            case 'changeColor': {
                //check who played the card and return new state accordingly
                if (cardPlayedBy === users[0]?.name)
                    setChangeColor(!changeColor)
                else
                    setChangeColor(!changeColor)
                break;
            }

            case 'superTaki': {
                //check who played the card and return new state accordingly
                if (cardPlayedBy === users[0]?.name)
                    setChoosenTaki(!choosenTaki)

                else
                    setChoosenTaki(!choosenTaki)
                break;

            } default: return
        }
    }
    const onCardDrawnHandler = () => {
        //extract player who drew the card
        const cardDrawnBy = turn

        //check who drew the card and return new state accordingly
        if (cardDrawnBy === users[0]?.name) {
            console.log(cardDrawnBy);
            //remove 1 new card from drawCardPile and add it to player1's deck (immutably)
            //make a copy of drawCardPile array
            const copiedDrawCardPileArray = [...drawCardPile]
            //pull out last element from it
            const drawCard = copiedDrawCardPileArray.pop()
            //extract number and color of drawn card
            // const colorOfPlayedCard = played_card.split('_')[1]
            socket.emit('updateGameState', {
                gameOver: checkGameOver(drawCardPile),
                turn: users[1]?.name
                ,
                player1Deck: [...player1Deck.slice(0, player1Deck.length), drawCard, ...player1Deck.slice(player1Deck.length)],
                drawCardPile: [...copiedDrawCardPileArray]
            })
        }


        else {
            //make a copy of drawCardPile array
            const copiedDrawCardPileArray = [...drawCardPile]
            //pull out last element from it
            const drawCard = copiedDrawCardPileArray.pop()
            //extract number and color of drawn card
            // const colorOfPlayedCard = played_card.split('_')[1]
            socket.emit('updateGameState', {
                gameOver: checkGameOver(drawCardPile),
                turn: users[0]?.name,
                player2Deck: [...player2Deck.slice(0, player2Deck.length), drawCard, ...player2Deck.slice(player2Deck.length)],
                drawCardPile: [...copiedDrawCardPileArray]
            })
        }
    }

    const setPickedColor = e => {
        const removeIndex = player1Deck.indexOf('changeColor')
        //then update turn, currentColor and currentNumber

        //send new state to server
        socket.emit('updateGameState', {
            gameOver: checkGameOver(drawCardPile),
            winner: checkWinner(player1Deck, users[0]?.name),
            turn: users[1].name,
            playedCardsPile: [...playedCardsPile.slice(0, playedCardsPile.length), `change_${e.target.name}`, ...playedCardsPile.slice(playedCardsPile.length)],
            player1Deck: [...player1Deck.slice(0, removeIndex), ...player1Deck.slice(removeIndex + 1)],
            currentColor: e.target.name,

        })
        setChangeColor(!changeColor)
    }
    const setPickeColorPlayer2 = (e) => {
        const removeIndex = player2Deck.indexOf('changeColor')
        //then update turn, currentColor and currentNumber

        //send new state to server
        socket.emit('updateGameState', {
            gameOver: checkGameOver(drawCardPile),
            winner: checkWinner(player2Deck, users[1].name),
            turn: users[0].name,
            playedCardsPile: [...playedCardsPile.slice(0, playedCardsPile.length), `change_${e.target.name}`, ...playedCardsPile.slice(playedCardsPile.length)],
            player2Deck: [...player2Deck.slice(0, removeIndex), ...player2Deck.slice(removeIndex + 1)],
            currentColor: e.target.name,
        })
        setChangeColor(!changeColor)

    }
    const setPickedTaki = e => {
        const removeIndex = player1Deck.indexOf('superTaki')
        //then update turn, currentColor and currentNumber

        //send new state to server
        socket.emit('updateGameState', {
            gameOver: checkGameOver(drawCardPile),
            winner: checkWinner(player1Deck, users[0]?.name),
            playedCardsPile: [...playedCardsPile.slice(0, playedCardsPile.length), `taki_${e.target.name}`, ...playedCardsPile.slice(playedCardsPile.length)],
            player1Deck: [...player1Deck.slice(0, removeIndex), ...player1Deck.slice(removeIndex + 1)],
            currentColor: e.target.name,

        })
        setChoosenTaki(!choosenTaki)
    }

    const setPickedTakiPlayer2 = e => {
        const removeIndex = player2Deck.indexOf('superTaki')
        //then update turn, currentColor and currentNumber
        //send new state to server
        socket.emit('updateGameState', {
            gameOver: checkGameOver(drawCardPile),
            winner: checkWinner(player2Deck, users[1].name),
            playedCardsPile: [...playedCardsPile.slice(0, playedCardsPile.length), `taki_${e.target.name}`, ...playedCardsPile.slice(playedCardsPile.length)],
            player2Deck: [...player2Deck.slice(0, removeIndex), ...player2Deck.slice(removeIndex + 1)],
            currentColor: e.target.name,
        })
        setChoosenTaki(!choosenTaki)
    }

    return (

        <div className={`Game online backgroundColorR backgroundColor${currentColor}`}>


            {gameOver ? <>< h1 style={{ color: "white" }}>GAME OVER NO WINNER</h1>{playGameOverSound()}</> :
                (!roomFull) ? <>
                    {/* PLAYER LEFT MESSAGES */}
                    {users.length === 1 && currentUser === user?.userNameInGame && <h1 className='topInfoText'>Waiting for Player 2 to join the game.</h1>}
                    {users.length === 2 && <>
                        {winner ? <div className="winner-container">{winner !== '' && <><h1>GAME OVER</h1><h2>{winner} wins!</h2><ConfettiExplosion /></>}</div> :

                            <div>
                                <Timer setGameOver={setGameOver}></Timer>

                                {/* PLAYER 1 VIEW */}

                                {currentUser === users[0]?.name && <>

                                    <div className='player2Deck' style={turn === users[0].name ? { pointerEvents: 'none' } : null}>
                                        <div className="player">
                                            <div className="player-image"><img src={users[1].img ? `data:image/jpeg;base64,${users[1].img}` : avatarImg} alt={users[1].img} /></div>
                                            <h3 className='playerDeckText'> {users[1].name}</h3>
                                            <span className="player-level">Level : {users[1].level}</span>
                                        </div>
                                        {console.log(player2Deck.length)}
                                        <div className="player2-cards" style={{
                                            gridTemplateColumns: `repeat(${Math.floor(player2Deck.length / 2 + 2)},1fr)`
                                        }} >
                                            {
                                                player2Deck.map((item, i) => (
                                                    <img
                                                        key={shortid.generate()}
                                                        className='Card'
                                                        onClick={() => onCardPlayedHandler(item)}
                                                        src={require(`../../resources/cards/card_back.png`).default}
                                                        alt="card"
                                                    />
                                                ))
                                            }
                                        </div>




                                    </div>
                                    {changeColor || choosenTaki ? <div className="colors">
                                        <img name="red" src={require(`../../resources/cards/change_red.png`).default} onClick={(e) => changeColor ? setPickedColor(e) : setPickedTaki(e)} alt="change_red" />
                                        <img name="blue" src={require(`../../resources/cards/change_blue.png`).default} onClick={(e) => changeColor ? setPickedColor(e) : setPickedTaki(e)} alt="change_blue" />
                                        <img name="green" src={require(`../../resources/cards/change_green.png`).default} onClick={(e) => changeColor ? setPickedColor(e) : setPickedTaki(e)} alt="change_green" />
                                        <img name="yellow" src={require(`../../resources/cards/change_yellow.png`).default} onClick={(e) => changeColor ? setPickedColor(e) : setPickedTaki(e)} alt="change_yellow" />



                                    </div> :
                                        <div className='middleInfo' style={turn === users[1].name ? { pointerEvents: 'none' } : null}>
                                            {console.log(turn)}
                                            <button className='draw-button' onClick={e => onCardDrawnHandler()}>DRAW CARD</button>
                                            {playedCardsPile && playedCardsPile.length > 0 &&
                                                <img
                                                    className='pile-Card'
                                                    src={require(`../../resources/cards/${playedCardsPile[playedCardsPile.length - 1]}.png`).default}
                                                    alt="Card"
                                                />}

                                        </div>
                                    }
                                    <div className='player1Deck' style={turn === users[0]?.name ? null : { pointerEvents: 'none' }}>

                                        <div className="player">
                                            <div className="player-image"><img src={users[0].img ? `data:image/jpeg;base64,${users[0].img}` : avatarImg} alt={users[0].img} /></div>
                                            <h3 className='playerDeckText'> {users[0].name}</h3>
                                            <span className="player-level">Level : {users[0].level}</span>
                                        </div>
                                        <div className="player1-cards" style={{ gridTemplateColumns: `repeat(${Math.floor(player2Deck.length / 2 + 2)},1fr)` }}>
                                            {player1Deck.map((item, i) => (
                                                <img
                                                    key={shortid.generate()}
                                                    className='Card'
                                                    onClick={() => onCardPlayedHandler(item)}
                                                    src={require(`../../resources/cards/${item}.png`).default}
                                                    alt="Card"
                                                />
                                            ))}
                                        </div>
                                    </div>
                                    <div className="chatBoxWrapper">
                                        <div className="chat-box chat-box-player1">
                                            <div className="chat-head">
                                                <h2>Chat Box</h2>
                                                {!isChatBoxHidden ?
                                                    <span onClick={toggleChatBox} className="material-icons">keyboard_arrow_down</span> :
                                                    <span onClick={toggleChatBox} className="material-icons">keyboard_arrow_up</span>}
                                            </div>
                                            <div className="chat-body">
                                                <div className="msg-insert">
                                                    {messages.map(msg => {
                                                        if (msg.user === users[1].name)
                                                            return <div
                                                                key={shortid.generate()} className="msg-receive">{msg.text}</div>
                                                        if (msg.user === users[0]?.name)
                                                            return <div
                                                                key={shortid.generate()} className="msg-send">{msg.text}</div>
                                                        return <></>
                                                    })}
                                                </div>
                                                <div className="chat-text">
                                                    <input type='text' placeholder='Type a message...' value={message} onChange={event => setMessage(event.target.value)} onKeyPress={event => event.key === 'Enter' && sendMessage(event)} />
                                                </div>
                                            </div>
                                        </div>
                                    </div> </>}

                                {/* PLAYER 2 VIEW */}
                                {currentUser === users[1].name && <>

                                    <div className='player1Deck' style={turn === users[0]?.name ? null : { pointerEvents: 'none' }}>
                                        <div className="player">
                                            <div className="player-image"><img src={users[0].img ? `data:image/jpeg;base64,${users[0].img}` : avatarImg} alt={users[0].img} /></div>
                                            <h3 className='playerDeckText'> {users[0].name}</h3>
                                            <span className="player-level">Level : {users[0].level}</span>
                                        </div>

                                        <div className="player1-cards" style={{
                                            gridTemplateColumns: `repeat(${Math.floor(player2Deck.length / 2 + 2)},1fr)`
                                        }} >
                                            {
                                                player1Deck.map((item, i) => (
                                                    <img
                                                        key={shortid.generate()}
                                                        className='Card'
                                                        onClick={() => onCardPlayedHandler(item)}
                                                        src={require(`../../resources/cards/card_back.png`).default}
                                                        alt="Card"
                                                    />
                                                ))
                                            }
                                        </div>

                                    </div>
                                    {changeColor || choosenTaki ? <div className="colors">
                                        <img name="red" src={require(`../../resources/cards/change_red.png`).default} onClick={(e) => changeColor ? setPickeColorPlayer2(e) : setPickedTakiPlayer2(e)} alt="change_red" />
                                        <img name="blue" src={require(`../../resources/cards/change_blue.png`).default} onClick={(e) => changeColor ? setPickeColorPlayer2(e) : setPickedTakiPlayer2(e)} alt="change_blue" />
                                        <img name="green" src={require(`../../resources/cards/change_green.png`).default} onClick={(e) => changeColor ? setPickeColorPlayer2(e) : setPickedTakiPlayer2(e)} alt="change_green" />
                                        <img name="yellow" src={require(`../../resources/cards/change_yellow.png`).default} onClick={(e) => changeColor ? setPickeColorPlayer2(e) : setPickedTakiPlayer2(e)} alt="change_yellow" />



                                    </div> :
                                        <div className='middleInfo' style={turn === users[0]?.name ? { pointerEvents: 'none' } : null}>
                                            <button className='draw-button' onClick={e => onCardDrawnHandler()}>DRAW CARD</button>
                                            {playedCardsPile && playedCardsPile.length > 0 &&
                                                <img
                                                    className='pile-Card'
                                                    src={require(`../../resources/cards/${playedCardsPile[playedCardsPile.length - 1]}.png`).default}
                                                    alt="card"
                                                />}

                                        </div>
                                    }
                                    <br />
                                    <div className='player2Deck' style={turn === users[0].name ? { pointerEvents: 'none' } : null}>
                                        <div className="player">
                                            <div className="player-image"><img src={users[1].img ? `data:image/jpeg;base64,${users[1].img}` : avatarImg} alt={users[1].img} /></div>
                                            <h3 className='playerDeckText'> {users[1].name}</h3>
                                            <span className="player-level">Level : {users[1].level}</span>
                                        </div>
                                        <div className="player2-cards" style={{ gridTemplateColumns: `repeat(${Math.floor(player2Deck.length / 2 + 2)},1fr)` }}>
                                            {player2Deck?.map((item, i) => (
                                                <img
                                                    key={shortid.generate()}
                                                    className='Card'
                                                    onClick={() => onCardPlayedHandler(item)}
                                                    src={require(`../../resources/cards/${item}.png`).default}
                                                    alt="Card"
                                                />
                                            ))}
                                        </div>
                                    </div>

                                    <div className="chatBoxWrapper">
                                        <div className="chat-box chat-box-player2">
                                            <div className="chat-head">
                                                <h2>Chat Box</h2>
                                                {!isChatBoxHidden ?
                                                    <span onClick={toggleChatBox} className="material-icons">keyboard_arrow_down</span> :
                                                    <span onClick={toggleChatBox} className="material-icons">keyboard_arrow_up</span>}
                                            </div>
                                            <div className="chat-body">
                                                <div className="msg-insert">
                                                    {messages.map(msg => {
                                                        if (msg.user === users[0].name)
                                                            return <div
                                                                key={shortid.generate()} className="msg-receive">{msg.text}</div>
                                                        if (msg.user === users[1].name)
                                                            return <div
                                                                key={shortid.generate()} className="msg-send">{msg.text}</div>
                                                        return <></>
                                                    })}
                                                </div>
                                                <div className="chat-text">
                                                    <input type='text' placeholder='Type a message...' value={message} onChange={event => setMessage(event.target.value)} onKeyPress={event => event.key === 'Enter' && sendMessage(event)} />
                                                </div>
                                            </div>
                                        </div>
                                    </div> </>}
                            </div>}
                    </>}
                </> : <h1>Room full</h1>
            }
            <Link to='/main'><LogoutIcon style={{
                transform: "rotate(180deg)", position: "absolute", top: "5%", left: "5%", fontSize: "45px", color: "white"
            }} onClick={() => socket.disconnect()}></LogoutIcon></Link>
            {/* <button onClick={() => socket.emit('randomRoom')}>Random Room</button> */}

        </div >
    )
}

export default Game