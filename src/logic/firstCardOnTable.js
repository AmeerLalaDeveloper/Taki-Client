import shuffledDeck from "../Utilities/Deck";
function firstCardOnTable() {
    const shuffledCards = shuffledDeck;
    let startingCardIndex
    while (true) {
        startingCardIndex = Math.floor(Math.random() * (shuffledDeck.length - 14))
        if (shuffledCards[startingCardIndex] === 'changeColor' || shuffledCards[startingCardIndex] === 'stop_red' || shuffledCards[startingCardIndex] === 'stop_green' ||
            shuffledCards[startingCardIndex] === 'stop_blue' || shuffledCards[startingCardIndex] === 'stop_yellow' || shuffledCards[startingCardIndex] === 'plus_yellow' ||
            shuffledCards[startingCardIndex] === 'plus_red' || shuffledCards[startingCardIndex] === 'plus_green' || shuffledCards[startingCardIndex] === 'plus_blue' ||
            shuffledCards[startingCardIndex] === 'reverse_red' || shuffledCards[startingCardIndex] === 'reverse_blue' || shuffledCards[startingCardIndex] === 'reverse_green' ||
            shuffledCards[startingCardIndex] === 'reverse_yellow' || shuffledCards[startingCardIndex] === 'taki_blue' || shuffledCards[startingCardIndex] === 'taki_red' || shuffledCards[startingCardIndex] === 'taki_yellow' || shuffledCards[startingCardIndex] === 'taki_blue' || shuffledCards[startingCardIndex] === 'draw2_red' || shuffledCards[startingCardIndex] === 'draw2_yellow' || shuffledCards[startingCardIndex] === 'draw2_green' || shuffledCards[startingCardIndex] === 'draw2_blue' || shuffledCards[startingCardIndex] === 'superTaki') {
            continue;
        }
        else
            return [shuffledCards, startingCardIndex]
    }
}
export default firstCardOnTable