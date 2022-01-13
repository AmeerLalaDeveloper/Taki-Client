import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import useSound from 'use-sound'
import './offline.css'
import ConfettiExplosion from '@reonomy/react-confetti-explosion'
import music from '../../mp3/music.mp3'
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import MusicOffIcon from '@mui/icons-material/MusicOff';
import LogoutIcon from '@mui/icons-material/Logout';
import Timer from '../Timer/Timer'
import gameOverSound from '../../assets/sounds/game-over-sound.mp3'
import skipSound from '../../assets/sounds/skip-sound.mp3'
import getFirstCardOnTable from '../../logic/firstCardOnTable'
import { checkWinner, checkGameOver } from '../../Utilities/Helper'

export default function Offline() {

    const [play, { stop }] = useSound(music, { volume: 0.03 })
    const [isMusicPlayed, setMusicPlayed] = useState(true)
    const [gameOver, setGameOver] = useState(false)
    const [keepPlaying, setKeepPlaying] = useState(false)
    const [winner, setWinner] = useState('')
    const [currentTurn, setCurrentTurn] = useState('player')
    const [nextTurn, setNextTurn] = useState('bot1')
    const [prevTurn, setPrevTurn] = useState('bot2')
    const [currentColor, setCurrentColor] = useState('')
    const [currentNumber, setCurrentNumber] = useState('')
    const [playedCardsPile, setPlayedCardsPile] = useState([])
    const [playerDeck, setPlayerDeck] = useState([])
    const [bot1Deck, setBot1Deck] = useState([])
    const [bot2Deck, setBot2Deck] = useState([])
    const [drawCardPile, setDrawCardPile] = useState([])
    const [changeColor, setChangeColor] = useState(false)
    const [choosenTaki, setChoosenTaki] = useState(false)
    const [playGameOverSound] = useSound(gameOverSound)
    const [playSkipSound] = useSound(skipSound)


    //Decide Player Turn
    useEffect(() => {
        if (currentTurn === 'bot1' && !winner)
            bot1Play()
        if (currentTurn === 'bot2' && !winner)
            bot2Play()

        // eslint-disable-next-line
    }, [currentTurn, keepPlaying])

    useEffect(() => {
        const [shuffledCards, startingCardIndex] = getFirstCardOnTable()
        // Player Deck
        const playerDeck = shuffledCards.splice(0, 7)
        //Bot 1 Deck
        const bot1Deck = shuffledCards.splice(0, 7)
        //Bot 2 Deck
        const bot2Deck = shuffledCards.splice(0, 7)
        //extract the card from that startingCardIndex into the playedCardsPile
        const playedCardsPile = shuffledCards.splice(startingCardIndex, 1)
        //store all remaining cards into drawCardPile
        const drawCardPile = shuffledCards
        setPlayedCardsPile([...playedCardsPile])
        setPlayerDeck([...playerDeck])
        setDrawCardPile([...drawCardPile])
        setBot1Deck([...bot1Deck])
        setBot2Deck([...bot2Deck])
        setCurrentColor(playedCardsPile[0]?.split('_')[1])
        setCurrentNumber(playedCardsPile[0]?.split('_')[0])
        // eslint-disable-next-line
    }, [])

    //Bots
    const bot1Play = () => {
        for (let i = 0; i < bot1Deck.length; i++) {
            const card = bot1Deck[i]
            if (card === '1_yellow' || card === '3_yellow' || card === '4_yellow' || card === '5_yellow' || card === '6_yellow' || card === '7_yellow' || card === '8_yellow' || card === '9_yellow' || card === '1_red' || card === '3_red' || card === '4_red' || card === '5_red' || card === '6_red' || card === '7_red' || card === '8_red' || card === '9_red' || card === '1_blue' || card === '3_blue' || card === '4_blue' || card === '5_blue' || card === '6_blue' || card === '7_blue' || card === '8_blue' || card === '9_blue' || card === '1_green' || card === '3_green' || card === '4_green' || card === '5_green' || card === '6_green' || card === '7_green' || card === '8_green' || card === '9_green') {
                const numberOfPlayedCard = card.split('_')[0]
                const colorOfPlayedCard = card.split('_')[1]
                if (currentColor === colorOfPlayedCard || currentNumber === numberOfPlayedCard) {
                    const removeIndex = bot1Deck.indexOf(card)
                    setGameOver(checkGameOver(drawCardPile))
                    setWinner(checkWinner(bot1Deck, 'BOT1'))
                    setPlayedCardsPile([...playedCardsPile.slice(0, playedCardsPile.length), card, ...playedCardsPile.slice(playedCardsPile.length)])
                    setBot1Deck([...bot1Deck.slice(0, removeIndex), ...bot1Deck.slice(removeIndex + 1)])
                    setCurrentColor(colorOfPlayedCard)
                    setCurrentNumber(numberOfPlayedCard)
                    setPrevTurn(currentTurn)
                    setCurrentTurn(nextTurn)
                    setNextTurn(prevTurn)
                    break;
                }
            }
            if (card === 'reverse_red' || card === 'reverse_yellow' || card === 'reverse_blue' || card === 'reverse_green') {
                const numberOfPlayedCard = card.split('_')[0]
                const colorOfPlayedCard = card.split('_')[1]
                if (currentColor === colorOfPlayedCard || currentNumber === numberOfPlayedCard) {
                    const removeIndex = bot1Deck.indexOf(card)
                    setGameOver(checkGameOver(drawCardPile))
                    setWinner(checkWinner(bot1Deck, 'BOT1'))
                    setPlayedCardsPile([...playedCardsPile.slice(0, playedCardsPile.length), card, ...playedCardsPile.slice(playedCardsPile.length)])
                    setBot1Deck([...bot1Deck.slice(0, removeIndex), ...bot1Deck.slice(removeIndex + 1)])
                    setCurrentColor(colorOfPlayedCard)
                    setCurrentNumber(numberOfPlayedCard)
                    setPrevTurn(currentTurn)
                    setCurrentTurn(prevTurn)
                    setNextTurn(nextTurn)
                    break;
                }
            }
            if (card === 'plus_yellow' || card === 'plus_green' || card === 'plus_red' || card === 'plus_blue' || card === 'taki_yellow' || card === 'taki_green' || card === 'taki_red' || card === 'taki_blue') {
                const numberOfPlayedCard = card.split('_')[0]
                const colorOfPlayedCard = card.split('_')[1]
                if (currentColor === colorOfPlayedCard || currentNumber === numberOfPlayedCard) {
                    const removeIndex = bot1Deck.indexOf(card)
                    setGameOver(checkGameOver(drawCardPile))
                    setWinner(checkWinner(bot1Deck, 'BOT1'))
                    setPlayedCardsPile([...playedCardsPile.slice(0, playedCardsPile.length), card, ...playedCardsPile.slice(playedCardsPile.length)])
                    setBot1Deck([...bot1Deck.slice(0, removeIndex), ...bot1Deck.slice(removeIndex + 1)])
                    setCurrentColor(colorOfPlayedCard)
                    setCurrentNumber(numberOfPlayedCard)
                    setKeepPlaying(!keepPlaying)
                    break;
                }
            }
            if (card === 'stop_yellow' || card === 'stop_red' || card === 'stop_blue' || card === 'stop_green') {
                const numberOfPlayedCard = card.split('_')[0]
                const colorOfPlayedCard = card.split('_')[1]
                if (currentColor === colorOfPlayedCard || currentNumber === numberOfPlayedCard) {
                    const removeIndex = bot1Deck.indexOf(card)
                    setGameOver(checkGameOver(drawCardPile))
                    setWinner(checkWinner(bot1Deck, 'BOT1'))
                    setPlayedCardsPile([...playedCardsPile.slice(0, playedCardsPile.length), card, ...playedCardsPile.slice(playedCardsPile.length)])
                    setBot1Deck([...bot1Deck.slice(0, removeIndex), ...bot1Deck.slice(removeIndex + 1)])
                    setCurrentColor(colorOfPlayedCard)
                    setCurrentNumber(numberOfPlayedCard)
                    setCurrentTurn(prevTurn)
                    setNextTurn(currentTurn)
                    setPrevTurn(nextTurn)
                    break;
                }
            }
            if (card === 'draw2_yellow' || card === 'draw2_red' || card === 'draw2_green' || card === 'draw2_blue') {
                const numberOfPlayedCard = card.split('_')[0]
                const colorOfPlayedCard = card.split('_')[1]
                if (currentColor === colorOfPlayedCard || currentNumber === numberOfPlayedCard) {
                    const removeIndex = bot1Deck.indexOf(card)
                    setGameOver(checkGameOver(drawCardPile))
                    setWinner(checkWinner(bot1Deck, 'BOT1'))
                    setPlayedCardsPile([...playedCardsPile.slice(0, playedCardsPile.length), card, ...playedCardsPile.slice(playedCardsPile.length)])
                    setBot1Deck([...bot1Deck.slice(0, removeIndex), ...bot1Deck.slice(removeIndex + 1)])
                    setCurrentColor(colorOfPlayedCard)
                    setCurrentNumber(numberOfPlayedCard)
                    let temp = [...drawCardPile]
                    let drawCard1 = temp.pop()
                    let drawCard2 = temp.pop();
                    if (nextTurn === 'player') {
                        setPlayerDeck([
                            ...playerDeck.slice(0, playerDeck.length),
                            drawCard1,
                            drawCard2,
                            ...playerDeck.slice(playerDeck.length)
                        ])
                    }
                    else {
                        setBot2Deck([
                            ...bot2Deck.slice(0, bot2Deck.length),
                            drawCard1,
                            drawCard2,
                            ...bot2Deck.slice(bot2Deck.length)
                        ])
                    }
                    setDrawCardPile([...temp])
                    setCurrentTurn(nextTurn)
                    setNextTurn(prevTurn)
                    setPrevTurn(currentTurn)
                    break;

                }
            }
            if (i === bot1Deck.length - 1) {
                let temp = [...drawCardPile]
                let drawCard = temp.pop();
                setBot1Deck([
                    ...bot1Deck,
                    drawCard
                ])
                setDrawCardPile([...temp])
                setCurrentTurn(nextTurn)
                setNextTurn(prevTurn)
                setPrevTurn(currentTurn)
                break;
            }
        }
    }

    const bot2Play = () => {
        for (let i = 0; i < bot2Deck.length; i++) {
            const card = bot2Deck[i]
            // console.log('BOT 2 Card ', card, "Index is ", i);
            if (card === '1_yellow' || card === '3_yellow' || card === '4_yellow' || card === '5_yellow' || card === '6_yellow' || card === '7_yellow' || card === '8_yellow' || card === '9_yellow' || card === '1_red' || card === '3_red' || card === '4_red' || card === '5_red' || card === '6_red' || card === '7_red' || card === '8_red' || card === '9_red' || card === '1_blue' || card === '3_blue' || card === '4_blue' || card === '5_blue' || card === '6_blue' || card === '7_blue' || card === '8_blue' || card === '9_blue' || card === '1_green' || card === '3_green' || card === '4_green' || card === '5_green' || card === '6_green' || card === '7_green' || card === '8_green' || card === '9_green') {
                const numberOfPlayedCard = card.split('_')[0]
                const colorOfPlayedCard = card.split('_')[1]
                if (currentColor === colorOfPlayedCard || currentNumber === numberOfPlayedCard) {
                    const removeIndex = bot2Deck.indexOf(card)
                    setGameOver(checkGameOver(drawCardPile))
                    setWinner(checkWinner(bot2Deck, 'BOT2'))
                    setPlayedCardsPile([...playedCardsPile.slice(0, playedCardsPile.length), card, ...playedCardsPile.slice(playedCardsPile.length)])
                    setBot2Deck([...bot2Deck.slice(0, removeIndex), ...bot2Deck.slice(removeIndex + 1)])
                    setCurrentColor(colorOfPlayedCard)
                    setCurrentNumber(numberOfPlayedCard)
                    setCurrentTurn(nextTurn)
                    setNextTurn(prevTurn)
                    setPrevTurn(currentTurn)
                    break;
                }
            }

            if (card === 'reverse_red' || card === 'reverse_yellow' || card === 'reverse_blue' || card === 'reverse_green') {
                const numberOfPlayedCard = card.split('_')[0]
                const colorOfPlayedCard = card.split('_')[1]
                if (currentColor === colorOfPlayedCard || currentNumber === numberOfPlayedCard) {
                    const removeIndex = bot2Deck.indexOf(card)
                    setGameOver(checkGameOver(drawCardPile))
                    setWinner(checkWinner(bot2Deck, 'Bot2'))
                    setPlayedCardsPile([...playedCardsPile.slice(0, playedCardsPile.length), card, ...playedCardsPile.slice(playedCardsPile.length)])
                    setBot2Deck([...bot2Deck.slice(0, removeIndex), ...bot2Deck.slice(removeIndex + 1)])
                    setCurrentColor(colorOfPlayedCard)
                    setCurrentNumber(numberOfPlayedCard)
                    setCurrentTurn(prevTurn)
                    setNextTurn(nextTurn)
                    setPrevTurn(currentTurn)
                    break;
                }
            }

            if (card === 'plus_yellow' || card === 'plus_green' || card === 'plus_red' || card === 'plus_blue' || card === 'taki_yellow' || card === 'taki_green' || card === 'taki_red' || card === 'taki_blue') {
                const numberOfPlayedCard = card.split('_')[0]
                const colorOfPlayedCard = card.split('_')[1]
                if (currentColor === colorOfPlayedCard || currentNumber === numberOfPlayedCard) {
                    const removeIndex = bot2Deck.indexOf(card)
                    setGameOver(checkGameOver(drawCardPile))
                    setWinner(checkWinner(bot2Deck, 'Bot2'))
                    setPlayedCardsPile([...playedCardsPile.slice(0, playedCardsPile.length), card, ...playedCardsPile.slice(playedCardsPile.length)])
                    setBot2Deck([...bot2Deck.slice(0, removeIndex), ...bot2Deck.slice(removeIndex + 1)])
                    setCurrentColor(colorOfPlayedCard)
                    setCurrentNumber(numberOfPlayedCard)
                    setKeepPlaying(!keepPlaying)
                    break;
                }
            }
            if (card === 'stop_yellow' || card === 'stop_red' || card === 'stop_blue' || card === 'stop_green') {
                const numberOfPlayedCard = card.split('_')[0]
                const colorOfPlayedCard = card.split('_')[1]
                if (currentColor === colorOfPlayedCard || currentNumber === numberOfPlayedCard) {
                    const removeIndex = bot2Deck.indexOf(card)
                    setGameOver(checkGameOver(drawCardPile))
                    setWinner(checkWinner(bot2Deck, 'Bot2'))
                    setPlayedCardsPile([...playedCardsPile.slice(0, playedCardsPile.length), card, ...playedCardsPile.slice(playedCardsPile.length)])
                    setBot2Deck([...bot2Deck.slice(0, removeIndex), ...bot2Deck.slice(removeIndex + 1)])
                    setCurrentColor(colorOfPlayedCard)
                    setCurrentNumber(numberOfPlayedCard)
                    setCurrentTurn(prevTurn)
                    setNextTurn(currentTurn)
                    setPrevTurn(nextTurn)
                    break;

                }
            }
            if (card === 'draw2_yellow' || card === 'draw2_red' || card === 'draw2_green' || card === 'draw2_blue') {
                const numberOfPlayedCard = card.split('_')[0]
                const colorOfPlayedCard = card.split('_')[1]
                if (currentColor === colorOfPlayedCard || currentNumber === numberOfPlayedCard) {
                    const removeIndex = bot2Deck.indexOf(card)
                    setGameOver(checkGameOver(drawCardPile))
                    setWinner(checkWinner(bot2Deck, 'Bot2'))
                    setPlayedCardsPile([...playedCardsPile.slice(0, playedCardsPile.length), card, ...playedCardsPile.slice(playedCardsPile.length)])
                    setBot2Deck([...bot2Deck.slice(0, removeIndex), ...bot2Deck.slice(removeIndex + 1)])
                    setCurrentColor(colorOfPlayedCard)
                    setCurrentNumber(numberOfPlayedCard)
                    let temp = [...drawCardPile]
                    let drawCard1 = temp.pop()
                    let drawCard2 = temp.pop();
                    if (nextTurn === 'player') {
                        setPlayerDeck([
                            ...playerDeck.slice(0, playerDeck.length),
                            drawCard1,
                            drawCard2,
                            ...playerDeck.slice(playerDeck.length)
                        ])
                    }
                    else {
                        setBot1Deck([
                            ...bot1Deck.slice(0, bot1Deck.length),
                            drawCard1,
                            drawCard2,
                            ...bot1Deck.slice(bot1Deck.length)
                        ])
                    }
                    setDrawCardPile([...temp])
                    setCurrentTurn(nextTurn)
                    setNextTurn(prevTurn)
                    setPrevTurn(currentTurn)
                    break;
                }
            }
            if (i === bot2Deck.length - 1) {
                let temp = [...drawCardPile]
                let drawCard = temp.pop();
                setBot2Deck([
                    ...bot2Deck.slice(0, bot2Deck.length),
                    drawCard,
                    ...bot2Deck.slice(bot2Deck.length)
                ])
                setDrawCardPile([...temp])
                setCurrentTurn(nextTurn)
                setNextTurn(prevTurn)
                setPrevTurn(currentTurn)
                break;
            }
        }
    }

    const onCardPlayedHandler = (card) => {
        switch (card) {
            case '1_yellow': case '3_yellow': case '4_yellow': case '5_yellow': case '6_yellow': case '7_yellow': case '8_yellow': case '9_yellow': case '1_red': case '3_red': case '4_red': case '5_red': case '6_red': case '7_red': case '8_red': case '9_red': case '1_blue': case '3_blue': case '4_blue': case '5_blue': case '6_blue': case '7_blue': case '8_blue': case '9_blue': case '1_green': case '3_green': case '4_green': case '5_green': case '6_green': case '7_green': case '8_green': case '9_green': {
                const numberOfPlayedCard = card.split('_')[0]
                const colorOfPlayedCard = card.split('_')[1]
                if (currentColor === colorOfPlayedCard || currentNumber === numberOfPlayedCard) {
                    const removeIndex = playerDeck.indexOf(card)
                    setGameOver(checkGameOver(drawCardPile))
                    setWinner(checkWinner(playerDeck, 'You'))
                    setPlayedCardsPile([...playedCardsPile.slice(0, playedCardsPile.length), card, ...playedCardsPile.slice(playedCardsPile.length)])
                    setPlayerDeck([...playerDeck.slice(0, removeIndex), ...playerDeck.slice(removeIndex + 1)])
                    setCurrentColor(colorOfPlayedCard)
                    setCurrentNumber(numberOfPlayedCard)
                    setCurrentTurn(nextTurn)
                    setNextTurn(prevTurn)
                    setPrevTurn(currentTurn)
                }
            } break;
            case 'reverse_yellow': case 'reverse_red': case 'reverse_blue': case 'reverse_green': {
                const numberOfPlayedCard = card.split('_')[0]
                const colorOfPlayedCard = card.split('_')[1]
                if (currentColor === colorOfPlayedCard || currentNumber === numberOfPlayedCard) {
                    const removeIndex = playerDeck.indexOf(card)
                    setGameOver(checkGameOver(drawCardPile))
                    setWinner(checkWinner(playerDeck, 'You'))
                    setPlayedCardsPile([...playedCardsPile.slice(0, playedCardsPile.length), card, ...playedCardsPile.slice(playedCardsPile.length)])
                    setPlayerDeck([...playerDeck.slice(0, removeIndex), ...playerDeck.slice(removeIndex + 1)])
                    setCurrentColor(colorOfPlayedCard)
                    setCurrentNumber(numberOfPlayedCard)
                    setCurrentTurn(prevTurn)
                    setNextTurn(nextTurn)
                    setPrevTurn(currentTurn)
                }
            }
                break;
            case 'plus_yellow': case 'plus_red': case 'plus_blue': case 'plus_green': case 'taki_yellow': case 'taki_red': case 'taki_blue': case 'taki_green': {
                const numberOfPlayedCard = card.split('_')[0]
                const colorOfPlayedCard = card.split('_')[1]
                if (currentColor === colorOfPlayedCard || currentNumber === numberOfPlayedCard) {
                    const removeIndex = playerDeck.indexOf(card)
                    setGameOver(checkGameOver(drawCardPile))
                    setWinner(checkWinner(playerDeck, 'You'))
                    setPlayedCardsPile([...playedCardsPile.slice(0, playedCardsPile.length), card, ...playedCardsPile.slice(playedCardsPile.length)])
                    setPlayerDeck([...playerDeck.slice(0, removeIndex), ...playerDeck.slice(removeIndex + 1)])
                    setCurrentColor(colorOfPlayedCard)
                    setCurrentNumber(numberOfPlayedCard)
                }
            } break;
            case 'stop_yellow': case 'stop_red': case 'stop_blue': case 'stop_green': {
                const numberOfPlayedCard = card.split('_')[0]
                const colorOfPlayedCard = card.split('_')[1]
                if (currentColor === colorOfPlayedCard || currentNumber === numberOfPlayedCard) {
                    playSkipSound()
                    const removeIndex = playerDeck.indexOf(card)
                    setGameOver(checkGameOver(drawCardPile))
                    setWinner(checkWinner(playerDeck, 'You'))
                    setPlayedCardsPile([...playedCardsPile.slice(0, playedCardsPile.length), card, ...playedCardsPile.slice(playedCardsPile.length)])
                    setPlayerDeck([...playerDeck.slice(0, removeIndex), ...playerDeck.slice(removeIndex + 1)])
                    setCurrentColor(colorOfPlayedCard)
                    setCurrentNumber(numberOfPlayedCard)
                    setCurrentTurn(prevTurn)
                    setNextTurn(currentTurn)
                    setPrevTurn(nextTurn)

                }
            } break;
            case 'draw2_yellow': case 'draw2_red': case 'draw2_green': case 'draw2_blue': {
                const numberOfPlayedCard = card.split('_')[0]
                const colorOfPlayedCard = card.split('_')[1]
                if (currentColor === colorOfPlayedCard || currentNumber === numberOfPlayedCard) {
                    const removeIndex = playerDeck.indexOf(card)
                    setGameOver(checkGameOver(playerDeck))
                    setWinner(checkWinner(playerDeck, 'You'))
                    setPlayedCardsPile([...playedCardsPile.slice(0, playedCardsPile.length), card, ...playedCardsPile.slice(playedCardsPile.length)])
                    setPlayerDeck([...playerDeck.slice(0, removeIndex), ...playerDeck.slice(removeIndex + 1)])
                    setCurrentColor(colorOfPlayedCard)
                    setCurrentNumber(numberOfPlayedCard)
                    let temp = [...drawCardPile]
                    let drawCard1 = temp.pop()
                    let drawCard2 = temp.pop();
                    if (nextTurn === 'bot1') {
                        setBot1Deck([
                            ...bot1Deck.slice(0, bot1Deck.length),
                            drawCard1,
                            drawCard2,
                            ...bot1Deck.slice(bot1Deck.length)
                        ])
                    }
                    else {
                        setBot2Deck([
                            ...bot2Deck.slice(0, bot2Deck.length),
                            drawCard1,
                            drawCard2,
                            ...bot2Deck.slice(bot2Deck.length)
                        ])

                    }
                    setDrawCardPile([...temp])
                    setCurrentTurn(nextTurn)
                    setNextTurn(prevTurn)
                    setPrevTurn(currentTurn)


                }

            } break;
            case "superTaki": {
                const removeIndex = playerDeck.indexOf(card)
                setPlayerDeck([...playerDeck.slice(0, removeIndex), ...playerDeck.slice(removeIndex + 1)])
                setChoosenTaki(!choosenTaki)
                setWinner(checkWinner(playerDeck, 'You'))

                break;
            }
            case "changeColor": {
                const removeIndex = playerDeck.indexOf(card)
                setPlayerDeck([...playerDeck.slice(0, removeIndex), ...playerDeck.slice(removeIndex + 1)])
                setChangeColor(!changeColor)
                setWinner(checkWinner(playerDeck, 'You'))
                break;

            }
            default: return;
        }
    }
    const onCardDrawnHandler = () => {

        //extract player who drew the card
        const cardDrawnBy = currentTurn
        //check who drew the card and return new state accordingly
        if (cardDrawnBy === 'player') {
            //remove 1 new card from drawCardPile and add it to player1's deck (immutably)
            //make a copy of drawCardPile array
            const copiedDrawCardPileArray = [...drawCardPile]
            //pull out last element from it
            const drawCard = copiedDrawCardPileArray.pop()
            //extract number and color of drawn card
            // const colorOfPlayedCard = played_card.split('_')[1]
            setPrevTurn(currentTurn)
            setCurrentTurn(nextTurn)
            setNextTurn(prevTurn)
            setPlayerDeck([...playerDeck.slice(0, playerDeck.length), drawCard, ...playerDeck.slice(playerDeck.length)])
            setDrawCardPile([...copiedDrawCardPileArray])
        }
        else if (cardDrawnBy === 'bot1') {
            //make a copy of drawCardPile array
            const copiedDrawCardPileArray = [...drawCardPile]
            //pull out last element from it
            const drawCard = copiedDrawCardPileArray.pop()
            //extract number and color of drawn card
            // const colorOfPlayedCard = played_card.split('_')[1]
            setPrevTurn(currentTurn)
            setCurrentTurn(nextTurn)
            setNextTurn(prevTurn)
            setPlayerDeck([...bot1Deck.slice(0, bot1Deck.length), drawCard, ...bot1Deck.slice(bot1Deck.length)])
            setDrawCardPile([...copiedDrawCardPileArray])
        }
        else {
            //make a copy of drawCardPile array
            const copiedDrawCardPileArray = [...drawCardPile]
            //pull out last element from it
            const drawCard = copiedDrawCardPileArray.pop()
            //extract number and color of drawn card
            // const colorOfPlayedCard = played_card.split('_')[1]
            setPrevTurn(currentTurn)
            setCurrentTurn(nextTurn)
            setNextTurn(prevTurn)
            setPlayerDeck([...bot2Deck.slice(0, bot2Deck.length), drawCard, ...bot2Deck.slice(bot2Deck.length)])
            setDrawCardPile([...copiedDrawCardPileArray])
        }
    }
    const handleMusic = () => {
        if (!isMusicPlayed) {
            stop()
            setMusicPlayed(true)
        }
        else {

            play()
            setMusicPlayed(false)
        }
    }

    const setPickedColor = (e) => {
        setCurrentColor(e.target.name)
        setPlayedCardsPile([...playedCardsPile.slice(0, playedCardsPile.length), `change_${e.target.name}`, ...playedCardsPile.slice(playedCardsPile.length)])
        setPrevTurn(currentTurn)
        setCurrentTurn(nextTurn)
        setNextTurn(prevTurn)
        setChangeColor(!changeColor)

    }
    const setPickedTaki = (e) => {
        console.log(e.target);
        setCurrentColor(e.target.name)
        setPlayedCardsPile([...playedCardsPile.slice(0, playedCardsPile.length), `taki_${e.target.name}`, ...playedCardsPile.slice(playedCardsPile.length)])
        setChoosenTaki(!choosenTaki)
    }

    return (

        < div className="offline-game" >
            <Link to='/main'><LogoutIcon style={{
                position: "absolute", top: "5%", left: "5%", fontSize: "45px",
                transform: "rotate(180deg)"
            }} onClick={e => stop()}></LogoutIcon></Link>
            {gameOver ? <h1 className="playerTurn">Game Over No Winner{playGameOverSound()}</h1> :

                winner === '' && !gameOver ? <div className="container">
                    <h1 className="playerTurn">Player is :{currentTurn}</h1>
                    <Timer setGameOver={setGameOver}></Timer>
                    <div className="first-half">
                        <div className="bot1Deck" style={{ pointerEvents: 'none', gridTemplateColumns: `repeat(${Math.floor(bot1Deck.length / 2 + 1)},1fr)` }}>
                            {bot1Deck?.map((item, i) => (
                                <img

                                    key={i}
                                    className='Card'
                                    onClick={() => onCardPlayedHandler(item)}
                                    src={require(`../../resources/cards/card_back.png`).default}
                                    alt="card"
                                />
                            ))}
                        </div>
                        {!changeColor && !choosenTaki ?
                            <div className='middleInfo'>
                                <button className='game-button draw-button' style={{ pointerEvents: currentTurn !== 'player' ? 'none' : '' }} onClick={onCardDrawnHandler}>DRAW CARD</button>
                                {playedCardsPile && playedCardsPile.length > 0 &&
                                    <img
                                        className='pileCard'
                                        src={require(`../../resources/cards/${playedCardsPile[playedCardsPile.length - 1]}.png`).default}
                                        alt="cardPile"
                                    />}

                            </div>
                            : <div className="colors">
                                <img name="red" src={require(`../../resources/cards/change_red.png`).default} onClick={(e) => changeColor ? setPickedColor(e) : setPickedTaki(e)} alt="change red" />
                                <img name="blue" src={require(`../../resources/cards/change_blue.png`).default} onClick={(e) => changeColor ? setPickedColor(e) : setPickedTaki(e)} alt="change blue" />
                                <img name="green" src={require(`../../resources/cards/change_green.png`).default} onClick={(e) => changeColor ? setPickedColor(e) : setPickedTaki(e)} alt="change green" />
                                <img name="yellow" src={require(`../../resources/cards/change_yellow.png`).default} onClick={(e) => changeColor ? setPickedColor(e) : setPickedTaki(e)} alt="change yellow" />
                            </div>}
                        <div className="bot2Deck" style={{ pointerEvents: 'none', gridTemplateColumns: `repeat(${Math.floor(bot2Deck.length / 2 + 1)},1fr)` }}>
                            {bot2Deck?.map((item, i) => (
                                <img
                                    key={i}
                                    className='Card'
                                    onClick={() => onCardPlayedHandler(item)}
                                    src={item && require(`../../resources/cards/card_back.png`).default}
                                    alt={item}
                                />
                            ))}
                        </div>
                    </div>
                    {console.log(playerDeck.length)}
                    <div className="second-half">
                        <div className="playerDeck" style={{ gridTemplateColumns: `repeat(${Math.floor(playerDeck.length / 2 + 1)},1fr)`, pointerEvents: `${currentTurn !== 'player' ? 'none' : ""}` }}>

                            {playerDeck?.map((item, i) => (
                                <img
                                    key={i}
                                    className={`Card`}
                                    onClick={() => onCardPlayedHandler(item)}
                                    src={require(`../../resources/cards/${item}.png`).default}
                                    alt="card"
                                />
                            ))}
                        </div>

                    </div>
                    <button className="music" onClick={handleMusic}>
                        {
                            isMusicPlayed ?
                                <MusicOffIcon onClick={e => handleMusic()} sx={{ color: 'white', fontSize: "35px", width: "100%", height: "100%" }}> </MusicOffIcon>
                                :
                                <MusicNoteIcon onClick={e => handleMusic()} sx={{ color: 'white', fontSize: "35px", width: "100%", height: "100%" }}> </MusicNoteIcon>
                        }
                    </button>
                </div> : <> <h1 className="winner-player">{winner} Won!!</h1><ConfettiExplosion /></>
            }
        </div >
    )

}