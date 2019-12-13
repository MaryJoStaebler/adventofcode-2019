
let viewInstructions = false;
let viewVerbose = false;
let instructions = document.getElementById("instructions");

function addInstructions(text)
{
    if(viewInstructions){
        addVerbose(text);
    }
}
function addVerbose(text){
    if (viewVerbose)
    {
        let d = document.createElement("li");
        d.innerText = text;
        instructions.appendChild(d);
    }
}


function findMatchingAngles(arr,angle)
{
    for(let i = 0; i < arr.length; i++)
    {
        if(arr[i].angle == angle)
        {
            return true;
        }
    }

    return false;

}


function part1() {
    instructions.innerText = "";

    let theMaps = document.getElementById("data").value.split('\n');
    let astroids = [];

    for(let row = 0; row < theMaps.length; row++) {

        for(let column = 0; column < theMaps[row].length; column++)
        {
            if(theMaps[row][column] === "#")
            {
                astroids.push({x:column,y:row,others:[],sees:0});
            }
        }
    }

    //Record the Angle of an astroid to another astroid into a set/array

    let highestNumAstroidz = astroids[0];
    for(let a = 0; a < astroids.length; a++){

        let a1 = astroids[a];
        for(let b = 0; b < astroids.length; b++){
            if(a === b) continue;
            let a2 = astroids[b];
            let angle = parseFloat((Math.atan2(a2.y - a1.y, a2.x - a1.x)*180/Math.PI).toFixed(2));
            if(angle < 0)
            {
                angle +=360;
            }
            let distance = parseFloat((Math.sqrt(Math.pow(a2.y-a1.y,2)+Math.pow(a2.x-a1.x,2))).toFixed(2));
            //count how many A1 can see of astroids > finding max number
            if(!findMatchingAngles(a1.others,angle))
            {
                a1.sees +=1;
            }
            a1.others.push({angle:angle,distance:distance,point: a2});
        }
        if(a1.sees > highestNumAstroidz.sees)
        {
            highestNumAstroidz = a1;
        }

    }

    //Sort the array based off of angle and then distance

    highestNumAstroidz.others.sort(compareAstroidAnglesAndDistance);


    console.log("Part 1 Answer: "+highestNumAstroidz.x+","+highestNumAstroidz.y+" with "+highestNumAstroidz.sees);

    console.log(highestNumAstroidz.others);

    let cursororororr = 0;
    let recentAngle;
    let countRemoved = 1;
    let thisIsThe200thAndroid;
    let exitStrategy = 0;
    let starterAngle = 270;
    for(let m = 0; m < highestNumAstroidz.others.length; m++){
        if(highestNumAstroidz.others[m].angle >= 270){
            cursororororr = m;
            break;
        }
    }
    do {

        console.log(highestNumAstroidz.others[cursororororr].angle+"/"+cursororororr);
        if(recentAngle !== undefined && recentAngle === highestNumAstroidz.others[cursororororr].angle) {
           // console.log("skip");
            cursororororr +=1;
        } else {
           // console.log("remove");
            recentAngle = highestNumAstroidz.others[cursororororr].angle;
            highestNumAstroidz.others.splice(cursororororr,1);
            countRemoved += 1;
            if(countRemoved === 200){
                thisIsThe200thAndroid =highestNumAstroidz.others[cursororororr];
                break;
            }
        }
        if(cursororororr >= highestNumAstroidz.others.length){
            cursororororr = 0;
           // console.log("reset");
        }
        exitStrategy += 1;

    } while (highestNumAstroidz.others.length > 0 && exitStrategy < 1000);


    //loop through and find the 200th astroid destory
    console.log("Part 2: "+thisIsThe200thAndroid.point.x+","+thisIsThe200thAndroid.point.y+"="+(thisIsThe200thAndroid.point.x*100+thisIsThe200thAndroid.point.y));

    console.log(thisIsThe200thAndroid);


    viewVerbose = true;
    addVerbose("Done");
}

function compareAstroidAnglesAndDistance(a, b) {
   // let aValue = (a.angle+"").padStart(6,"0")+","+(a.distance+"").padStart(6,"0");
   // let bValue = (b.angle+"").padStart(6,"0")+","+(b.distance+"").padStart(6,"0");
    if (a.angle < b.angle) {
      return -1;
    }
    if (a.angle > b.angle) {
      return 1;
    }
    if(a.angle === b.angle && a.distance < b.distance) {
       return -1;
    }
    if(a.angle === b.angle && a.distance > b.distance) {
       return 1;
    }
    // a must be equal to b
    return 0;
  }