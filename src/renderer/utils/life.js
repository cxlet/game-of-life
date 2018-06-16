export function init (row, column) {
  let now = []
  for (let x = 0; x < row; x++) {
    now[x] = []
    for (let y = 0; y < column; y++) {
      now[x][y] = 0
    }
  }
  return now
}

export function random (now, percentage) {
  let row = now.length
  let column = now[0].length
  for (let x = 0; x < row; x++) {
    now[x] = []
    for (let y = 0; y < column; y++) {
      let fate = Math.random()
      now[x][y] = fate <= percentage ? 1 : 0
    }
  }
  return now
}

export function addAlive (now, alive) {
  for (let a of alive) {
    now[a.x][a.y] = 1
  }
}

export function growup (now) {
  let row = now.length
  let column = now[0].length
  let maxRow = row - 1
  let maxColumn = column - 1
  let next = []
  for (let x = 0; x < row; x++) {
    next[x] = []
    for (let y = 0; y < column; y++) {
      if (x === 0 || x === maxRow || y === 0 || y === maxColumn) {
        next[x][y] = 0
      } else {
        let fate = now[x - 1][y - 1] + now[x - 1][y] + now[x - 1][y + 1] + now[x][y - 1] + now[x][y + 1] + now[x + 1][y - 1] + now[x + 1][y] + now[x + 1][y + 1]
        if (fate === 3) {
          next[x][y] = 1
        } else if (fate === 2) {
          next[x][y] = now[x][y]
        } else {
          next[x][y] = 0
        }
      }
    }
  }
  return next
}

export function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time))
}

export function equals (set, b) {
  for (let a of set) {
    if (a.x === b.x && a.y === b.y) {
      return true
    }
  }
  return false
}
