var board = {w: 30, h: 30} // поле (размер)
var speeds = [800, 750, 700, 650, 600, 550, 500, 450, 400, 350, 300, 250] // скорости
var snake = {
    size: 4, // длина
    blocks: [[0,0], [1,0], [2,0], [3,0]], // секции змея
    dir: "E", //Направление восток
    speed: 11, 
    create() {
        this.blocks.forEach(block => set(block[0], block[1], 'snake'))
    },
    move() {
        var head = this.blocks[this.blocks.length-1]
        switch (this.dir) {
            case 'N':
                head = [head[0], head[1]-1]
                break
            case 'E':
                head = [head[0]+1, head[1]]
                break
            case 'S':
                head = [head[0], head[1]+1]
                break
            case 'W':
                head = [head[0]-1, head[1]]
                break
        }
        
        if (head[0] != board.food[0] && head[1] != board.food[1]) var ate = true

        if (head[0]<0 || head[0]>=board.w || head[1]<0 || head[1]>=board.h || 
            this.blocks.some(block => head[0]==block[0] && head[1]==block[1])) {
            tbl.style.boxShadow = "0 0 6px 1px red"// рамочка тень
            clearInterval(tick)
            return
        }
        this.blocks.push(head)
        set(head[0], head[1], 'snake')
        
        if (!ate) {
            var free = this.blocks.shift()
            set(free[0], free[1]) // передаем X и Y
        }
        else food()

        snake.turned = false
    }
}

function set(x, y, type='') {// Функция принимает две координаты, третий параметр - это класс назначеной ячейки
    tbl.rows[y].cells[x].className = type
}

document.body.onkeydown = event => {
    if (snake.turned) return
    var dir = snake.dir
    switch (event.key) {
        case "ArrowUp":
            if (snake.dir != 'S') snake.dir = "N"
            break
        case "ArrowRight":
            if (snake.dir != 'W') snake.dir = "E"
            break
        case "ArrowDown":
            if (snake.dir != 'N') snake.dir = "S"
            break
        case "ArrowLeft":
            if (snake.dir != 'E') snake.dir = "W"
            break
    }
    if (dir != snake.dir) snake.turned = true 
}

snake.create()
food()
var tick = setInterval(() => snake.move(), speeds[snake.speed])

function rnd(max) {
    return Math.floor(Math.random()*max)
}

function food() {
    do {
        var x = rnd(board.w)
        var y = rnd(board.h)
    }
    while (snake.blocks.some(block => x==block[0] && y==block[1])) 
    set(x, y, 'food')
    board.food = [x, y]
}
