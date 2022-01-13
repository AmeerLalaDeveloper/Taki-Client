export const checkGameOver = (arr) => {
    return arr.length === 1
}

export const checkWinner = (arr, player) => {
    return arr.length === 1 ? player : ''
}