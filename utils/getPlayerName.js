const getPlayerName = () => {
    let playerName = 'Frogger';

    console.log(document.querySelector('input').value)
    if (document.querySelector('input') && document.querySelector('input').value) {
        playerName = document.querySelector('input').value;
    }

    return playerName;
}

export default getPlayerName;