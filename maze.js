const maze=[
  ['#','#','#','#','#','#','#','#','#'],
  ['#','+','+','+','#','+','+','+','#'],
  ['#','+','#','+','#','+','#','+','#'],
  ['+','+','#','+','0','+','#','+','#'],
  ['#','#','#','+','#','#','#','#','#'],
  ['#','#','+','+','#','#','#','#','#'],
  ['#','#','+','#','#','#','#','#','#'],
  ['#','#','#','#','#','#','#','#','#'],
]

//find start
const startX = maze.find(i=> i.includes('0')).indexOf('0');
const startY = maze.findIndex(i=>i.includes('0'))
const start ={x: startX, y: startY }

//find end
const finish = () =>{
  if (maze[0].includes('+'))
  {
    return {x: maze[0].indexOf('+'), y: 0}
  }
  if (maze[maze.length-1].includes('+')){
    return {x: maze[maze.length-1].indexOf('+'), y: maze.length-1}
  }
  if (maze.find(i=> i[0] ==='+')){
    return { x: 0, y: maze.findIndex(i=> i[0] ==='+')}
  }
    
  if (maze.find(i=> i[i.length-1]==='+')){
    return {x: maze[0].length-1, y: maze.findIndex(i=> i[i.length-1] ==='+')}
  }
  return null;
}

let dirArr=[]; //array with direction

function checkPath(start, end){
  maze[start.y][start.x] = 5; //visited
  
  let siblings=getValidSib(start)
  
   if (siblings.length > 0) {
    for (let i = 0; i < siblings.length; i++) {
      const current = siblings[i];

      const isSolved = current.x === end.x && current.y === end.y;
      const notVisited = maze[current.y][current.x] !== 5;
      
      if (isSolved || (notVisited && checkPath(current, end))) { 
        dirArr.push(current.direction)
        return dirArr;
      }
    }
  }
  return false;
  
}


function getValidSib(cord){
  let {x, y}=cord;
  let cords=[];
  
  if (maze[y - 1] !== undefined) {
    cords.push({ x: x, y: y - 1, val: maze[y - 1][x], direction: 'bottom' });
  }
  if (maze[y + 1] !== undefined) {
    cords.push({ x: x, y: y + 1, val: maze[y + 1][x], direction: 'top' });
  }
  if (maze[y][x - 1] !== undefined) {
    cords.push({ x: x - 1, y: y, val: maze[y][x - 1], direction: 'left' });
  }
  if (maze[y][x + 1] !== undefined) {
    cords.push({ x: x + 1, y: y, val: maze[y][x + 1], direction: 'right' });
  }
  
  const filtCords = cords.filter(crd =>crd.val === "+");  
   return filtCords;
}

const end = finish(); 
console.log(checkPath(start, end));
// ['left', 'top','top','left','left','bottom','bottom','left']`