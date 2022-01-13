import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from 'react-router-dom';
import './style.css'
const URL = 'http://localhost:4001'
// const URL = 'https://taki-server.netlify.app'

export default function HighScore() {
    const [users, setUsers] = useState([])
    useEffect(() => {
        //get all users
        (async function () {
            const res = await axios.get(URL + '/users');
            setUsers(res.data)
        })()
    }, [])

    return (
        <div style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }} className="highscore">
            <TableContainer component={Paper} sx={{
                width: "75%", background: "linear-gradient(45deg,#00296B,#0068AE);", color: "white"
            }} >
                <Link to="/main">   <LogoutIcon style={{
                    transform: "rotate(180deg)",
                    position: "absolute",
                    top: "5%", left: "5%",
                    fontSize: "45px"
                    , color: "white"
                }
                } ></LogoutIcon></Link>
                <Table sx={{ minWidth: 650, maxWidth: "1100px", color: "white" }} aria-label="simple table">
                    <TableHead>
                        <TableRow >
                            <TableCell style={{ color: "white" }}>Rank</TableCell>
                            <TableCell style={{ color: "white" }} align="right">Name</TableCell>
                            <TableCell style={{ color: "white" }} align="right">Wins</TableCell>
                            <TableCell style={{ color: "white" }} align="right">Lose</TableCell>
                            <TableCell style={{ color: "white" }} align="right">Level</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users?.sort((a, b) => a.wins > b.wins)?.map((row, idx) => (
                            <TableRow style={{ color: "white" }}
                                key={row.username}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell style={{ color: "white" }} component="th" scope="row">
                                    {(idx <= 2) ? <i class="fa fa-trophy" aria-hidden="true"></i> : idx + 1}
                                </TableCell>
                                <TableCell style={{ color: "white" }} align="right">{row.username}</TableCell>
                                <TableCell style={{ color: "white" }} align="right">{row.wins}</TableCell>
                                <TableCell style={{ color: "white" }} align="right">{row.lose}</TableCell>
                                <TableCell style={{ color: "white" }} align="right">{row.level}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer >
        </div >
    )
}
