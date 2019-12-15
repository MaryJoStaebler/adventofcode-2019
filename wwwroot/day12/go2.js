
 
//var contents = '<x=-8, y=-10, z=0><x=5, y=5, z=10><x=2, y=-7, z=3><x=9, y=-8, z=-3>';
//var contents = '<x=-1, y=0, z=2><x=2, y=-10, z=-7><x=4, y=-8, z=8><x=3, y=5, z=-1>'
var contents = '<x=-16, y=15, z=-9><x=-14, y=5, z=4><x=2, y=0, z=6><x=-3, y=18, z=9>'

function changePositionValue(val1, val2){
    return (val2 > val1) ? 1 : ((val2 < val1) ? -1 : 0);
}

class Dimensions {
    constructor(x,y,z) {
        this.x=x | 0,
        this.y=y | 0,
        this.z=z | 0
    }
}
class Moon {
    constructor(x,y,z) {
        this.position = new Dimensions(x,y,z);
        this.velocity = new Dimensions();
    }
}

function loadData() {

    let coords = contents.split('><');

    for (let index = 0; index < coords.length; index++) {
        const regExCoords = /x=(\-?\d+), y=(\-?\d+), z=(\-?\d+)/i;
        let xyz = coords[index].match(regExCoords);
        let moon = new Moon(xyz[1],xyz[2],xyz[3]);
        theMoons.push(moon);
    };
}


let theMoons ;

function applyGravityX() {

    for(let a = 0; a < theMoons.length; a++)
    {
        let g= 0;
        let aMoon = theMoons[a];
        for (let b = 0; b < theMoons.length; b++) {
            const otherMoon = theMoons[b];
            g += changePositionValue(aMoon.position.x,otherMoon.position.x);
        }
        aMoon.velocity.x += g;
    }
}
function applyVelocityX(initialValue) {

    let step = '';
    for(let a = 0; a < theMoons.length; a++)
    {
        let aMoon = theMoons[a];
        if(!initialValue) aMoon.position.x += aMoon.velocity.x;
        step += aMoon.position.x+'|';
    }

    return step;
}
function applyGravityY() {

    for(let a = 0; a < theMoons.length; a++)
    {
        let g= 0;
        let aMoon = theMoons[a];
        for (let b = 0; b < theMoons.length; b++) {
            const otherMoon = theMoons[b];
            g += changePositionValue(aMoon.position.y,otherMoon.position.y);
        }
        aMoon.velocity.y += g;
    }
}
function applyVelocityY(initialValue) {

    let step = '';
    for(let a = 0; a < theMoons.length; a++)
    {
        let aMoon = theMoons[a];
        if(!initialValue) aMoon.position.y += aMoon.velocity.y;
        step += aMoon.position.y+'|';
    }

    return step;
}
function applyGravityZ() {

    for(let a = 0; a < theMoons.length; a++)
    {
        let g= 0;
        let aMoon = theMoons[a];
        for (let b = 0; b < theMoons.length; b++) {
            const otherMoon = theMoons[b];
            g += changePositionValue(aMoon.position.z,otherMoon.position.z);
        }
        aMoon.velocity.z += g;
    }
}
function applyVelocityZ(initialValue) {

    let step = '';
    for(let a = 0; a < theMoons.length; a++)
    {
        let aMoon = theMoons[a];
        if(!initialValue) aMoon.position.z += aMoon.velocity.z;
        step += aMoon.position.z+'|';
    }

    return step;
}

function run(axis,firstvalue){
    let heap=1;
    let go =true;
    do {
        if(axis == 'x') {
            applyGravityX();
            step = applyVelocityX(false);
        } else if(axis == 'y') {
            applyGravityY();
            step = applyVelocityY(false);
        } else if(axis == 'z') {
            applyGravityZ();
            step = applyVelocityZ(false);
        }
        heap += 1;
        if(step === firstvalue)
        {
            console.log("found",axis,heap);
            break;
        }
    }while (go);
    return heap;
}

const gcd = (a, b) => a ? gcd(b % a, a) : b;
const lcm = (a, b) => a * b / gcd(a, b);

function part2() {

    theMoons = [];
    loadData();
    let first ={
        x: applyVelocityX(true),
        y: applyVelocityY(true),
        z: applyVelocityZ(true)
    }
    
    console.log([
        run('x',first.x),
        run('y',first.y),
        run('z',first.z),
    ].reduce(lcm, 1))
}

console.time();
part2();
console.timeEnd();