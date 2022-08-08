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
        open(row, column);
    });

    function getCount(row, column){
        let count = 0;
        for (let x = -1; x <= 1; x++){
            for (let y = -1; y <= 1; y++) {
                if (isBomb(row + y, column + x)){
                    count++;
                }       
            }         
        }
        return count;
    }
    
    function open(row, column) {
        const index = row * width + column;
        const cell = cells[index];
        cell.innerHTML = isBomb(row, column) ? 'X' : getCount(row, column);
        cell.disabled = true;
    }

    function isBomb(row, column){
        const index = row * width + column;
        return bombs.includes(index);
    }
}