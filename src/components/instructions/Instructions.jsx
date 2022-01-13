import React from 'react'
import './instructions.css'
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router';

export default function Instructions() {
    const navigate = useNavigate()
    return (
        <div className="instructions">
            <LogoutIcon style={{
                position: "absolute",
                top: "2.5%", left: "2.5%",
                fontSize: "45px"
                , color: "white",
                transform: "rotate(180deg)"
            }} onClick={() => navigate('/main')} />
            <h1><div className="logo"></div></h1>
            <div className="content">
                <div className="header"><div className="age"><img src="https://static.wixstatic.com/media/fdef56_92eaeefb2d554409a15dd862f95c1d26~mv2.png/v1/fill/w_68,h_68,al_c,q_95/fdef56_92eaeefb2d554409a15dd862f95c1d26~mv2.webp" alt="" /> <p>6+</p></div><div className="amount"><img src="https://static.wixstatic.com/media/fdef56_f06e6903de9947ba85e6f9f720643d8d~mv2.png/v1/fill/w_68,h_68,al_c,q_95/fdef56_f06e6903de9947ba85e6f9f720643d8d~mv2.webp" alt="" /><p>33</p> </div><div className="timer"><img src="https://static.wixstatic.com/media/fdef56_277aeceeb09d4e52a7f572c5d0de6c9f~mv2.png/v1/fill/w_68,h_68,al_c,q_95/fdef56_277aeceeb09d4e52a7f572c5d0de6c9f~mv2.webp" alt="" /><p>20 min</p></div></div>
                <div className="paragraph">
                    <h3>FOR</h3>
                    <p>2 - 10 players, Age: 6 - Adult</p>
                </div>
                <div className="paragraph">
                    <h3>GAME CONTENTS
                    </h3>
                    <p>116 Cards (2 identical sets of 58)<br />
                        Card distribution:<br />

                        All Numbers (2 of each color)<br />

                        Stop/ Plus/ TAKI/ Change Direction (2 of each color)<br />

                        Super-TAKI/ King/ +3 Breaker/ +3 (2 of each)<br />

                        Change Color (4)</p>
                </div>
                <div className="paragraph">
                    <h3>GAMEPLAY</h3>
                    <p>Each player must follow the top card of the Discard Pile with a card of the same color or figure. Action Cards can change the direction of play, skip a player's turn, force other players to draw cards, change the color or allow a player to discard more than one card.</p>
                </div>
                <div className="paragraph">
                    <h3>THE OBJECT OF THE GAME
                    </h3>
                    <p>To get rid of all the cards in your hand</p>
                </div>
                <div className="paragraph">
                    <h3>HOW TO PLAY THE GAME</h3>
                    <p>Shuffle all the cards and deal 8 cards to each player. Put the remainder of the deck in the center. This is the Draw Pile. Turn over the top card of the Draw Pile and place it face-up next to the Draw Pile, to form the Discard Pile. The top card of the Discard Pile is called the Leading Card.

                        The youngest player goes first. Each player, in turn (going clockwise), plays a card (or cards) by placing it over the leading card, in one of the following ways:



                        By matching its color

                        By matching its number or figure

                        By playing a valid Action Card (see Action Cards below)



                        A player who cannot play any of his cards must draw a card from the Draw Pile and may only use it on the next round.

                        A player who is left with a single card in his hand must announce: “Last card!”. If he fails to do so before the next player makes his move, he must draw 4 cards from the Draw Pile. The game ends when a player discards his last card.</p>
                </div>
            </div >
        </div >
    )
}
