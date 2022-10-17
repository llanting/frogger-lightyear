let newChar;

const animateTitle = () => {
    let titleInterval;
    // TODO: refactor
    // titleInterval = setInterval(() => {
    //     let i = 0;
    //     i++;
    //     changeTitle(0);
    //     document.querySelector('.one').innerHTML = newChar;
    //     setTimeout(() => {
    //         changeTitle(1)
    //         document.querySelector('.two').innerHTML = newChar;
    //     }, 500);
    //     setTimeout(() => {
    //         changeTitle(2)
    //         document.querySelector('.three').innerHTML = newChar;
    //     }, 1000);
    //     setTimeout(() => {
    //         changeTitle(3)
    //         document.querySelector('.four').innerHTML = newChar;
    //     }, 1500);
    //     setTimeout(() => {
    //         changeTitle(4)
    //         document.querySelector('.five').innerHTML = newChar;
    //     }, 2000);
    //     setTimeout(() => {
    //         changeTitle(5)
    //         document.querySelector('.six').innerHTML = newChar;
    //     }, 2500);
    //     setTimeout(() => {
    //         changeTitle(6)
    //         document.querySelector('.seven').innerHTML = newChar;
    //     }, 3000);
    //     if (i == 1) {
    //         clearInterval(titleInterval);
    //     }
    // }, 700)
};

const changeTitle = (index) => {
    if (document.querySelector('.display-4')) {
        let titleStr = document.querySelector('.display-4').innerText;
        let titleArr = titleStr.split(' ');
        titleArr[index] = `<img src="./images/rsz_1frogger.png">`;
        newChar = titleArr[index].toString();
    }
};

export default animateTitle;