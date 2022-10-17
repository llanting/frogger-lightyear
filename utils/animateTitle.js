const animateTitle = (type) => {
    let titleInterval;

    if (type === 'clear') {
        clearInterval(titleInterval);
        return;
    }

    titleInterval = setInterval(() => {
        let timeOut = 0;

        if (document.querySelector('.animate-0')) {
            for (let i = 0; i < 7; i++) {

                setTimeout(() => {
                    document.querySelector(`.animate-${i}`).innerHTML = changeTitle(i);
                }, timeOut);

                timeOut += 500;
            }
        }
    }, 700)
};

const changeTitle = (index) => {
    const ANIMATE_TITLE = document.getElementById('animate-title');
    if (ANIMATE_TITLE) {
        const titleStr = ANIMATE_TITLE.innerText;
        let titleArr = titleStr.split(' ');
        titleArr[index] = `<img src="./images/rsz_1frogger.png">`;
        return titleArr[index].toString();
    }
};

export default animateTitle;