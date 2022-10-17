const getPlayerName = () => {
    const NAME_INPUT = document.getElementById('name-input');

    let playerName = 'Frogger';

    if (NAME_INPUT && NAME_INPUT.value) {
        playerName = NAME_INPUT.value;
    }

    return playerName;
}

export default getPlayerName;