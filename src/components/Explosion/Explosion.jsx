import ConfettiExplosion from '@reonomy/react-confetti-explosion'
import React from 'react'
import { useNavigate } from 'react-router'

export default function Explosion(props) {
    const navigate = useNavigate()

    const winner = window.location.search
    setTimeout(() => {
        navigate('/main')
    }, 3000)
    return (
        <> <h1 className="winner-player">{winner} Wins!!</h1><ConfettiExplosion /></>
    )
}
