// import React, { useRef, useState } from 'react'
// import './style.css'
// export default function FriendRow({ row, connectedUsers, setNumberOfPlayers }) {
//     const checkbox = useRef(null)
//     console.log(row);
//     const [isClicked, setClicked] = useState(false)
//     console.log(connectedUsers);
//     return (
//         <>
//             <div className="friend-row">
//                 <div className="friend-row-left">
//                     <span>   {
//                         connectedUsers?.find(user => user?.username === row?.username) ? <div className="green-dot"></div> : <div className="red-dot"></div>
//                     }
//                     </span>
//                     <span>  {row.username}</span>
//                 </div>
//                 <div className="friend-row-right">

//                     <span><input ref={checkbox} type="checkbox" name={row?.username} id="select-checkbox" onClick={(e) => {

//                         setNumberOfPlayers(!isClicked ? 1 : -1, e)
//                         setClicked(!isClicked)
//                     }} /></span>
//                     <span> <button>Create Room</button><button>Join Room</button> </span>


//                 </div>
//             </div>

//         </>

//     )
// }
