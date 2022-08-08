startGame(8,8,1);

function startGame(width, height, bombs_count){
    const field = document.querySelector('.field');
    const cellsCount = width * height;
    field.innerHTML = '<button></button>'.repeat(cellsCount);
    const cells = [...field.children];
    let closedCount = cellsCount;

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

    function isValid(row, column) {
        return row >= 0
        && row < height
        && column >= 0
        && column < width;
    }

    function getCount(row, column) {
        let count = 0;
        for (let x = -1; x <= 1; x++) {
            for (let y = -1; y <= 1; y++) {
                if (isBomb(row + y, column + x)){
                    count++;
                }       
            }         
        }
        return count;
    }
    
    function open(row, column) {
        if(!isValid(row, column)) return;

        const index = row * width + column;
        const cell = cells[index];

        if(cell.disabled === true) return;

        cell.disabled = true;
        
        if (isBomb(row, column)) {          
            cell.innerHTML = 'X';
            alert('Вы проиграли...');
            return;
        }
        
        closedCount--;
        if (closedCount <= bombs_count) {
            alert('Вы победили!');
            return;
        }

        const count = getCount(row, column);
        if (count !== 0) {
            cell.innerHTML = count;
            return;
        }

        for (let x = -1; x <= 1; x++) {
            for (let y = -1; y <= 1; y++) {
                open(row + y, column + x);    
            }         
        }
    }

    function isBomb(row, column){
        if (!isValid(row, column)) return false;
        const index = row * width + column;
        return bombs.includes(index);
    }
}