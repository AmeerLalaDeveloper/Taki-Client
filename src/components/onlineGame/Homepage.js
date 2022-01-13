import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router';
import LogoutIcon from '@mui/icons-material/Logout';
import './Game.css'
function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
const Homepage = () => {
    const [roomCode, setRoomCode] = useState('')
    const navigate = useNavigate()
    useEffect(() => {
        if (!localStorage.getItem('token'))
            navigate('/login')
        // eslint-disable-next-line
    }, [])

    return (
        <div className='Homepage'>
            <Link to='/main'><LogoutIcon style={{ fontSize: '45px', position: "absolute", top: "5%", left: "5%" }}></LogoutIcon></Link>
            <div className='homepage-menu'>
                {/* <img src={require('../assets/logo.png').default} width='200px' /> */}
                <div className='homepage-form'>
                    <div className='homepage-join'>
                        <input type='text' placeholder='Game Code' onChange={(event) => setRoomCode(event.target.value)} />
                        <Link to={`/onlinegame?roomCode=${roomCode}`}><button className="game-button green">JOIN GAME</button></Link>
                    </div>
                    <h1>OR</h1>
                    <div className='homepage-create'>
                        <Link to={`/onlinegame?roomCode=${makeid(5)}`}><button className="game-button orange">CREATE GAME</button></Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Homepage
