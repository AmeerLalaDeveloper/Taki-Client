// import React, { useState } from 'react'
// import { useSelector } from 'react-redux'
// import FriendRow from './FriendRow';
// export default function Friends({ connectedUsers }) {
//     console.log(connectedUsers);
//     const state = useSelector(state => state?.user)
//     const user = state?.user
//     // const friends = state?.user?.friends
//     const [numberOfSelectedPlayers, setNumberOfSelectedPlayers] = useState(0)
//     const [selectedPlayers, setSelectedPlayers] = useState([])
//     const friends = [{ _id: "1", username: "saleh" }, { _id: "2", username: "yousef" }, { _id: "3", username: "mahdi" }]
//     const setNumberOfPlayers = (number, e) => {
//         if (numberOfSelectedPlayers >= 3 && number === 1) {
//             setNumberOfSelectedPlayers(3)
//             setSelectedPlayers(...selectedPlayers.slice(0, 3))
//         }
//         else if (numberOfSelectedPlayers >= 3 && number === -1) {
//             setNumberOfSelectedPlayers(prev => prev + number)
//             setSelectedPlayers([...selectedPlayers, selectedPlayers.splice(e.target.name, 1)])

//         }
//         else {
//             console.log('ssss');
//             setSelectedPlayers([...selectedPlayers, e.target.name])
//             setNumberOfSelectedPlayers(prev => prev + number)
//         }

//         console.log(number);
//     }
//     const inviteFriends = (e) => {

//     }
//     return (

//         <>
//             <div className="friends-container">
//                 <div className="friends-header">
//                     <h2>Invite Friends To Play</h2>
//                     <span>Selected : {numberOfSelectedPlayers}/3</span>
//                 </div>
//                 <div className="friends-list">
//                     {friends?.map((row, idx) => {
//                         if (row?.username !== user?.username) {
//                             return <FriendRow numberOfSelectedPlayers={numberOfSelectedPlayers} setNumberOfPlayers={setNumberOfPlayers} connectedUsers={connectedUsers} key={row._id + idx
//                             } row={row} ></FriendRow>
//                         }
//                         return <></>
//                     }
//                     )}
//                 </div>
//                 <div className="friends-footer">
//                     <button onClick={(e) => inviteFriends(e)}>Invite</button>
//                 </div>

//             </div>
//         </>

//     )
// }
