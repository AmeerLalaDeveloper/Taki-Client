import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from 'react-router-dom';
import { getUsers } from '../../api/api';
import './style.css'
import Search from './Search';
import SearchResult from './SearchResult';



export default function Requests({ connectedUsers }) {
    //common element in two arrays

    const state = useSelector(state => state?.user)
    const friends = state?.user?.friends
    const [users, setUsers] = useState([])
    const user = state.user
    const [input, setInput] = useState('')

    useEffect(() => {
        const run = async () => {
            const res = await getUsers()
            setUsers(res)
        }
        run()
    }, [friends])


    const handleSearch = e => {
        console.log(input);
        console.log(user);
    }
    return (
        <div className="requests-container">
            <Link to="/main"><LogoutIcon style={{
                transform: "rotate(180deg)",
                position: "absolute",
                top: "5%", left: "5%",
                fontSize: "45px"
                , color: "white"
            }
            }></LogoutIcon></Link>
            <Search handleSearch={handleSearch} setInput={setInput} />
            <SearchResult searchedPeople={users}></SearchResult>
        </div>
    )
}
