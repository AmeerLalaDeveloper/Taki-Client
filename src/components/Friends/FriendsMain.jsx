// import React, { useEffect, useState } from 'react'
// import socket from '../../socketExport/exportSocket'
// import Friends from './Friends';
// import './style.css'
// import { Link } from 'react-router-dom';
// import LogoutIcon from '@mui/icons-material/Logout';

// export default function MainFriends() {
//     // const [connectedUsers, setConnectedUsers] = useState([])

//     useEffect(() => {


//         socket.on('friendRequest', payload => {
//             console.log(payload);
//         })
//         return () => { socket.removeListener('friendRequest') }
//     }, []) // eslint-disable-next-line


//     useEffect(() => {
//         socket.on('users', (users) => {
//             console.log(users);
//         })
//         return () => {
//             socket.removeListener('users')
//         }
//     }, [])

//     return (
//         <div style={{ height: "100vh", width: "100vw", display: "flex", justifyContent: "space-around", alignItems: "center", flexDirection: "column", }}>
//             <Link to="/main"><LogoutIcon style={{
//                 transform: "rotate(180deg)",
//                 position: "absolute",
//                 top: "5%", left: "5%",
//                 fontSize: "45px"
//                 , color: "white"
//             }
//             }></LogoutIcon></Link>


//             <Friends ></Friends>
//         </div >
//     )
// }
