const normalCards = ['1', '3', '4', '5', '6', '7', '8', '9', 'stop', 'plus', 'taki', 'reverse', 'draw2']
const superCards = ['superTaki']
const changeColor = "changeColor"
const colors = ['red', 'blue', 'green', 'yellow']
let shuffledDeck = []

const createNormalCard = () => {
    const array = []
    for (let i = 0; i < normalCards.length; i++)
        for (let j = 0; j < colors.length; j++)
            array.push(normalCards[i] + '_' + colors[j])
    return array
}
const createSuperCard = () => {
    const array = []
    for (let j = 0; j < 2; j++)
        for (let i = 0; i < superCards.length; i++)
            array.push(superCards[i])
    return array
}
const createChangeColor = () => {
    const array = []
    for (let j = 0; j < 4; j++)
        array.push(changeColor)
    return array
}
const createDeckOfCards = () => {
    shuffledDeck = createNormalCard().concat(createNormalCard())
    shuffledDeck = shuffledDeck.concat(createSuperCard())
    shuffledDeck = shuffledDeck.concat(createChangeColor())

}

const shuffleCards = () => {

    for (var a = 0; a < shuffledDeck.length; a++) {
        var x = shuffledDeck[a];
        var y = Math.floor(Math.random() * (a + 1));
        shuffledDeck[a] = shuffledDeck[y];
        shuffledDeck[y] = x;
    }
}
createDeckOfCards()
shuffleCards()
module.exports = shuffledDeck



