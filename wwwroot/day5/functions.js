const prog = [3,225,1,225,6,6,1100,1,238,225,104,0,2,218,57,224,101,-3828,224,224,4,224,102,8,223,223,1001,224,2,224,1,223,224,223,1102,26,25,224,1001,224,-650,224,4,224,1002,223,8,223,101,7,224,224,1,223,224,223,1102,44,37,225,1102,51,26,225,1102,70,94,225,1002,188,7,224,1001,224,-70,224,4,224,1002,223,8,223,1001,224,1,224,1,223,224,223,1101,86,70,225,1101,80,25,224,101,-105,224,224,4,224,102,8,223,223,101,1,224,224,1,224,223,223,101,6,91,224,1001,224,-92,224,4,224,102,8,223,223,101,6,224,224,1,224,223,223,1102,61,60,225,1001,139,81,224,101,-142,224,224,4,224,102,8,223,223,101,1,224,224,1,223,224,223,102,40,65,224,1001,224,-2800,224,4,224,1002,223,8,223,1001,224,3,224,1,224,223,223,1102,72,10,225,1101,71,21,225,1,62,192,224,1001,224,-47,224,4,224,1002,223,8,223,101,7,224,224,1,224,223,223,1101,76,87,225,4,223,99,0,0,0,677,0,0,0,0,0,0,0,0,0,0,0,1105,0,99999,1105,227,247,1105,1,99999,1005,227,99999,1005,0,256,1105,1,99999,1106,227,99999,1106,0,265,1105,1,99999,1006,0,99999,1006,227,274,1105,1,99999,1105,1,280,1105,1,99999,1,225,225,225,1101,294,0,0,105,1,0,1105,1,99999,1106,0,300,1105,1,99999,1,225,225,225,1101,314,0,0,106,0,0,1105,1,99999,108,226,677,224,102,2,223,223,1005,224,329,1001,223,1,223,1107,677,226,224,102,2,223,223,1006,224,344,1001,223,1,223,7,226,677,224,1002,223,2,223,1005,224,359,101,1,223,223,1007,226,226,224,102,2,223,223,1005,224,374,101,1,223,223,108,677,677,224,102,2,223,223,1006,224,389,1001,223,1,223,107,677,226,224,102,2,223,223,1006,224,404,101,1,223,223,1108,677,226,224,102,2,223,223,1006,224,419,1001,223,1,223,1107,677,677,224,1002,223,2,223,1006,224,434,101,1,223,223,1007,677,677,224,102,2,223,223,1006,224,449,1001,223,1,223,1108,226,677,224,1002,223,2,223,1006,224,464,101,1,223,223,7,677,226,224,102,2,223,223,1006,224,479,101,1,223,223,1008,226,226,224,102,2,223,223,1006,224,494,101,1,223,223,1008,226,677,224,1002,223,2,223,1005,224,509,1001,223,1,223,1007,677,226,224,102,2,223,223,1005,224,524,1001,223,1,223,8,226,226,224,102,2,223,223,1006,224,539,101,1,223,223,1108,226,226,224,1002,223,2,223,1006,224,554,101,1,223,223,107,226,226,224,1002,223,2,223,1005,224,569,1001,223,1,223,7,226,226,224,102,2,223,223,1005,224,584,101,1,223,223,1008,677,677,224,1002,223,2,223,1006,224,599,1001,223,1,223,8,226,677,224,1002,223,2,223,1006,224,614,1001,223,1,223,108,226,226,224,1002,223,2,223,1006,224,629,101,1,223,223,107,677,677,224,102,2,223,223,1005,224,644,1001,223,1,223,8,677,226,224,1002,223,2,223,1005,224,659,1001,223,1,223,1107,226,677,224,102,2,223,223,1005,224,674,1001,223,1,223,4,223,99,226];
const finalResult = 19690720;

let arrProgram = prog.slice(0);
let instructions = document.getElementById("instructions");

function addInstructions(text)
{
    let d = document.createElement("li");
    d.innerText = text;
    instructions.appendChild(d);
}

function add(val1,val2,replaceIndex){
    addInstructions("Add: "+val1+"+"+val2+"="+(val1+val2)+"->"+replaceIndex);
    arrProgram[replaceIndex] = val1+val2;
}
function multiple(val1,val2,replaceIndex){
    addInstructions("Multiple: "+val1+"*"+val2+"="+(val1*val2)+"->"+replaceIndex);
    arrProgram[replaceIndex] = val1*val2;
}
function getInput(val1){
    let replaceVal = prompt("Give me!","");
    arrProgram[val1] = replaceVal | 0;
    addInstructions("Get Value: "+(replaceVal | 0));
}
function giveOutput(val1){
    console.log(val1);
    addInstructions("Write: "+val1);
}
function compareLess(val1,val2,replaceIndex)
{
    addInstructions("Less: "+val1+"<"+val2+"->"+replaceIndex);
    if(val1 < val2)
    {
        arrProgram[replaceIndex] = 1;
    } else {
        arrProgram[replaceIndex] = 0;
    }
}
function compareEqual(val1,val2,replaceIndex)
{
    addInstructions("Equals?: "+val1+"=="+val2+"->"+replaceIndex);
    if(val1 == val2)
    {
        arrProgram[replaceIndex] = 1;
    } else {
        arrProgram[replaceIndex] = 0;
    }
    
}

function intCode(noun, verb){

    arrProgram = prog.slice(0);
   // arrProgram[1] = noun;
    //arrProgram[2] = verb;

    let cursor = 0;
    debugger;
    while(cursor < arrProgram.length){
        let commandValue = arrProgram[cursor];
        let theCommand = 0;
        let paramMode1 = 0;
        let paramMode2 = 0;
        let paramMode3 = 0;
        let decodeCommand;
        if(commandValue > 99)
        {
            decodeCommand = commandValue.toString().padStart(5,"0");
            theCommand = decodeCommand.substring(3,5) | 0;
            paramMode1 = decodeCommand.substring(2,3) | 0;
            paramMode2 = decodeCommand.substring(1,2) | 0;
            paramMode3 = decodeCommand.substring(0,1) | 0;


        } else {
            theCommand = commandValue;
        }
       // console.log(commandValue+"/"+arrProgram[cursor+1]+"/"+arrProgram[cursor+2]+"/"+arrProgram[cursor+3]);
        //If True, then use value at spot (immediate mode), else use position mode and look up value
        let val1 = paramMode1 ? arrProgram[cursor+1] : arrProgram[arrProgram[cursor+1]];
        let val2 = paramMode2 ? arrProgram[cursor+2] : arrProgram[arrProgram[cursor+2]];
        //let val3 = paramMode3 ? arrProgram[cursor+3] : arrProgram[cursor+3];
        switch(theCommand)
        {
            case 1:
                add(val1,val2,arrProgram[cursor+3]);
                cursor += 4;
                break;
            case 2:
                multiple(val1,val2,arrProgram[cursor+3]);
                cursor += 4;
                break;
            case 3:
                getInput(arrProgram[cursor+1]);
                cursor += 2;
                break;
            case 4:
                giveOutput(val1);
                cursor += 2;
                break;
            case 5:
                if(val1 != 0)
                {
                    addInstructions("Cursor is "+val2);
                    cursor = val2;
                } else {
                    cursor += 3;
                }
                break;
            case 6:
                if(val1 == 0)
                {
                    addInstructions("Cursor is "+val2);
                    cursor = val2;
                } else {
                    cursor += 3;
                }
                break;
            case 7:
                compareLess(val1,val2,arrProgram[cursor+3]);
                cursor += 4;
                break;
            case 8:
                compareEqual(val1,val2,arrProgram[cursor+3]);
                cursor += 4;
                break;
            case 99:
                cursor = arrProgram.length;
                break;
            default:
                cursor = arrProgram.length;
                console.log("uh:"+theCommand);
                console.log(arrProgram);
                break;
        }
    }

    return;
}

function findResult(result){
    for(let noun = 0; noun < 100; noun++){
        for(let verb = 0; verb < 100; verb++){
            let x = intCode(noun,verb);
            if(x === result){
                return {noun:noun,verb:verb};
            }
        }
    }
    return {noun:-1,verb:-1};
}


    intCode();