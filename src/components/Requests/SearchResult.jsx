import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import SearchResultRow from './SearchResultRow';
import shortid from 'shortid'
export default function SearchResult({ searchedPeople }) {
    return (
        <TableContainer component={Paper} sx={{ width: "55%", height: "70%", maxHeight: "600px", background: "linear-gradient(45deg,#00296B,#0068AE);" }} >

            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell style={{ color: "white" }}>Name</TableCell>
                        <TableCell style={{ color: "white" }} align="right">Add</TableCell>

                    </TableRow>
                </TableHead>
                <TableBody>
                    {searchedPeople?.map(person => {
                        return <SearchResultRow key={shortid.generate()} row={person}></SearchResultRow>
                    })}
                </TableBody>
            </Table>
        </TableContainer >
    )
}
