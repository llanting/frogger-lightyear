const buildPage = (html) => {
    let div = document.createElement('div');
    div.innerHTML = html;
    return div.children[0];
}

export default buildPage;
