import React from 'react'

export default function Search({ handleSearch, setInput }) {

    return (
        <div className="search-for-friends">
            <div className="search-text">
                <input type="text" onChange={e => setInput(e.target.value)} />
                <button onClick={e => handleSearch(e)}>Search</button>
            </div>


        </div>
    )
}
