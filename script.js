startGame(8,8,15);

function startGame(width, height, bombs_count){
    const field = document.querySelector('.field');
    const cellsCount = width * height;
    field.innerHTML = '<button></button>'.repeat(cellsCount);
    const cells = [...field.children];

    const bombs = [...Array(cellsCount).keys()]
    .sort(() => Math.random() - 0.5)
    .slice(0, bombs_count);

    field.addEventListener('click', (event) => {
        if (event.target.tagName !== 'BUTTON') {
            return;
        }
        
        const index = cells.indexOf(event.target);
        const row = Math.floor(index / width);
        const column = index % width;
        event.target.innerHTML = isBomb(row, column) ? 'X' : ' ';
    });
}

function isBomb(row, column){
    const index = row * width + column;
    return bombs.includes(index);
}