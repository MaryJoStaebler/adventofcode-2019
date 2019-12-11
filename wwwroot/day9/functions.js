
let viewInstructions = false;
let viewVerbose = true;
let instructions = document.getElementById("instructions");
let arrProgram;

function changeStringArrayToIntArray(arr)
{
    for(let i = 0; i < arr.length; i++)
    {
        arr[i] = parseInt(arr[i]);
    }

    return arr;
}

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
    arrProgram[val1] = replaceVal;
    addInstructions("Get Value: "+(replaceVal));
}
function giveOutput(val1){
    console.log(val1);
    addVerbose("Write: "+val1);
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

function getValue(cursor,basePosition,paramMode,paramIndex){
    let theValue;
    switch(paramMode)
    {
        case 2:
            theValue = arrProgram[basePosition+arrProgram[cursor+paramIndex]];
            break;
        case 1:
            theValue = arrProgram[cursor+paramIndex];
            break;
        default:
            theValue =  arrProgram[arrProgram[cursor+paramIndex]];
            break;
    }
    return (theValue === undefined ? 0 : theValue);
}

let cursor = 0;
let basePosition = 0;
function intCode(){

    //debugger;
    let done = false;
    do {
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
        let val1 = getValue(cursor,basePosition,paramMode1,1);//paramMode1 ? arrProgram[cursor+1] : arrProgram[arrProgram[cursor+1]];
        let val2 = getValue(cursor,basePosition,paramMode2,2);//paramMode2 ? arrProgram[cursor+2] : arrProgram[arrProgram[cursor+2]];
        let val3 = paramMode3 == 2 ? basePosition+arrProgram[cursor+3] : arrProgram[cursor+3];
        switch(theCommand)
        {
            case 1:
                add(val1,val2,val3);
                cursor += 4;
                break;
            case 2:
                multiple(val1,val2,val3);
                cursor += 4;
                break;
            case 3:
                getInput((paramMode1 == 2 ? arrProgram[cursor+1]+basePosition: arrProgram[cursor+1]));
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
                compareLess(val1,val2,val3);
                cursor += 4;
                break;
            case 8:
                compareEqual(val1,val2,val3);
                cursor += 4;
                break;
            case 9:
                addInstructions("Base Moved is "+val1);
                basePosition += val1;
                cursor += 2;
                break;
            case 99:
                done = true;
                break;
            default:
                console.log("uh:"+theCommand);
                console.log(arrProgram);
                done = true;
                break;
        }
    } while (!done);

    return;
}



function part1() {
    instructions.innerText = "";

    arrProgram = changeStringArrayToIntArray(document.getElementById("data").value.split(","));
    intCode();
    viewVerbose = true;
    addVerbose("Output: ");
}