
 
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
        this.name = 'Who Knows';
        this.id = -1;
        this.position = new Dimensions(x,y,z);
        this.velocity = new Dimensions();
    }
    applyGravity(moons){
        let x=0,y=0,z=0;
        for (let index = 0; index < moons.length; index++) {
            const otherMoon = moons[index];
            x += changePositionValue(this.position.x,otherMoon.position.x);
            y += changePositionValue(this.position.y,otherMoon.position.y);
            z += changePositionValue(this.position.z,otherMoon.position.z);
        }
        this.velocity.x += x;
        this.velocity.y += y;
        this.velocity.z += z;
    }
    applyVelocity(){
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        this.position.z += this.velocity.z;
    }
    getKineticEnergy(){
        return Math.abs(this.velocity.x)+Math.abs(this.velocity.y)+Math.abs(this.velocity.z);
    }
    getPotentialEnergy(){
        return Math.abs(this.position.x)+Math.abs(this.position.y)+Math.abs(this.position.z);
    }
    getEnergy(){
        return this.getKineticEnergy() * this.getPotentialEnergy();
    }
}

function loadData() {

    let coords = contents.split('><');

    for (let index = 0; index < coords.length; index++) {
        const regExCoords = /x=(\-?\d+), y=(\-?\d+), z=(\-?\d+)/i;
        const element = coords[index];
        let xyz = element.match(regExCoords);
        let moon = new Moon(xyz[1],xyz[2],xyz[3]);
        switch(index)
        {
            case 0:
                moon.name = 'Io';
                break;
            case 1:
                moon.name = 'Europa';
                break;
            case 2:
                moon.name = 'Ganymede';
                break;
            case 3:
                moon.name = 'Callisto';
                break;
        }
        moon.id = index;
        theMoons.push(moon);
    };
}


let theMoons ;
function part1() {

    theMoons = [];
    loadData();

    for (let index = 0; index < 1000; index++) {
        for(let a = 0; a < theMoons.length; a++)
        {
            theMoons[a].applyGravity(theMoons);
        }
        for(let a = 0; a < theMoons.length; a++)
        {
            theMoons[a].applyVelocity();
        }
    }
    let totalE = 0;
    for(let a = 0; a < theMoons.length; a++){
        totalE += theMoons[a].getEnergy();
    }
    console.log(totalE);
}

part1();


console.time();
part1();
console.timeEnd();