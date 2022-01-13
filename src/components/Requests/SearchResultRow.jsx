import { TableCell, TableRow } from '@mui/material'
import React from 'react'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useSelector } from 'react-redux';


function findCommonElements(arr, findItem) {
    return arr.some(item => item._id === findItem._id)
}


export default function SearchResultRow({ row }) {
    const state = useSelector(state => state?.user)
    const user = state?.user
    const friends = user?.friends

    return (<>
        {!findCommonElements(friends, row) ?
            <TableRow
                key={row.username}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell style={{ color: "white" }} component="th" scope="row">
                    {row.username}
                </TableCell>
                <TableCell style={{ color: "white" }} align="right"><CheckCircleIcon style={{
                    cursor: "pointer"
                }} ></CheckCircleIcon></TableCell>
            </TableRow > :
            null
        }
    </>
    )
}
