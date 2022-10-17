const animateTitle = () => {
    let titleInterval;

    titleInterval = setInterval(() => {
        // TODO: this seems weird
        let index = 0;
        index++;

        let timeOut = 0;

        if (document.querySelector('.animate-0')) {
            for (let i = 0; i < 7; i++) {

                setTimeout(() => {
                    document.querySelector(`.animate-${i}`).innerHTML = changeTitle(i);
                }, timeOut);

                timeOut += 500;
            }

            if (index == 1) {
                clearInterval(titleInterval);
            }
        }
    }, 700)
};

const changeTitle = (index) => {
    const ANIMATE_TITLE = document.getElementById('animate-title');
    const titleStr = ANIMATE_TITLE.innerText;
    let titleArr = titleStr.split(' ');
    titleArr[index] = `<img src="./images/rsz_1frogger.png">`;
    return titleArr[index].toString();
};

export default animateTitle;