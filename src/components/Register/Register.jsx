import React, { useState } from 'react'
import './Register.css'
import { Link, useNavigate } from 'react-router-dom'
import { register } from '../../api/api';
import LockIcon from '@mui/icons-material/Lock';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
export default function Register() {
    const navigate = useNavigate()
    const [message, setMessage] = useState('')
    const [input, setInput] = useState({
        username: '',
        password: '',
        userNameInGame: ''
    })
    const handleSubmit = e => {
        e.preventDefault();
        try {
            register({ ...input })
            console.log('ofc');
            navigate('/')
        } catch (err) {
            setMessage('Invalid Input')
        }


    }

    return (
        <div className="bg-image-container register">
            <div className="content">
                <div className="logo register-logo"></div>
                <form action="">
                    <div className="form-control">
                        <div className="title">
                            <PermIdentityIcon />
                            <label htmlFor="username">name</label>
                        </div>
                        <input name="userNameInGame" type="text" id="userNameInGame" onChange={e => setInput(state => ({ ...state, [e.target.name]: e.target.value }))} />
                    </div>
                    <div className="form-control">
                        <div className="title">
                            <PermIdentityIcon />
                            <label htmlFor="username">Username</label>
                        </div>
                        <input name="username" type="text" id="username" onChange={e => setInput(state => ({ ...state, [e.target.name]: e.target.value }))} />
                    </div>
                    <div className="form-control">
                        <div className="title">
                            <LockIcon />
                            <label htmlFor="username">Password</label>
                        </div>
                        <input name="password" type="password" id="password" onChange={e => setInput(state => ({ ...state, [e.target.name]: e.target.value }))} />
                    </div>
                    <button onClick={e => handleSubmit(e)}>Register</button>
                    {message}
                </form>
                <div><Link className="move-to" to="/">Login</Link></div>
            </div>

        </div>
    )
}
