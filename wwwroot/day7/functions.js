
function part1Test() {
    instructions.innerText = "";
    let ampInput = document.getElementById("amp-input").value.split(",");
    ampOutput = 0;
    for(let i = 0; i < ampInput.length;i++)
    { 
        let progData = document.getElementById("data").value;
        ampOutput = intCode(progData,ampInput[i] | 0,ampOutput);
    }
    viewVerbose = true;
    addVerbose("Output: "+ampOutput);
}
function part1() {
    instructions.innerText = "";
    let biggestOutput = 0;
    for(let j = 0;j < 44445; j++)
    {
        let ampInput = j.toString().padStart(5,'0');
        let reValidInput = /^[0-4]*[0-4]*[0-4]*[0-4]*[0-4]$/;
        let bUniqueInputs = true;
        for(let x = 0; x < ampInput.length; x++)
        {  
            if(ampInput.split(ampInput[x]).length > 2){
                bUniqueInputs = false;
            }
        }
        if(reValidInput.test(j) && bUniqueInputs)
        {
            ampOutput = 0;
            for(let i = 0; i < ampInput.length;i++)
            { 
                let progData = document.getElementById("data").value;
                ampOutput = intCode(progData,ampInput[i] | 0,ampOutput);
            }
            addVerbose("Output: "+ampInput+"->"+ampOutput);
            if(biggestOutput < ampOutput){
                biggestOutput = ampOutput;
            }
        }
    }
    viewVerbose = true;
    addVerbose("Biggest Output: "+biggestOutput);
}

let arrAmps = [];
function part2() {
    instructions.innerText = "";
    let biggestOutput = 0;

    
    for(let j = 56789;j < 99999; j++)
    {
        let ampPhaseSettings = j.toString().padStart(5,'0');
        let reValidPhaseSettings = /^[5-9]*[5-9]*[5-9]*[5-9]*[5-9]$/;
        let bUniqueSettings = true;
        arrAmps = [];
        for(let x = 0; x < ampPhaseSettings.length; x++)
        {  
            if(ampPhaseSettings.split(ampPhaseSettings[x]).length > 2){
                bUniqueSettings = false;
                break;
            }
            let amp = {
                cursor: 0,
                prog: document.getElementById("data").value.split(","),
                done: false,
                pause: false,
                useSetting: true,
                inputSetting:ampPhaseSettings[x] | 0
            };
            arrAmps.push(amp);
        }
        if(reValidPhaseSettings.test(j) && bUniqueSettings)
        {
            ampOutput = 0;
            do {
                for(let i = 0; i < ampPhaseSettings.length;i++)
                { 
                    if(!arrAmps[i].useSetting)
                    {
                        arrAmps[i].inputSetting = ampOutput;
                    }
                    intCode2(i);
                    ampOutput = arrAmps[i].output;
                }
            } while (!arrAmps[4].done)
            addVerbose("Output: "+ampPhaseSettings+"->"+ampOutput);
            if(biggestOutput < ampOutput){
                biggestOutput = ampOutput;
            }
        }
    }
    viewVerbose = true;
    addVerbose("Biggest Output: "+biggestOutput);
}

let arrProgram;
let viewInstructions = false;
let viewVerbose = true;
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
function add(val1,val2){
    addInstructions("Add: "+val1+"+"+val2+"="+(val1+val2));
    return val1+val2;
}
function multiple(val1,val2){
    addInstructions("Multiple: "+val1+"*"+val2+"="+(val1*val2));
    return val1*val2;
}
function getInput(inputVal){
    addInstructions("Get Value: "+(inputVal | 0));
    return inputVal;
}
function giveOutput(val1){
    addInstructions("Write: "+val1);
    return val1;
}
function compareLess(val1,val2)
{
    addInstructions("Less: "+val1+"<"+val2);
    if(val1 < val2)
    {
        return 1;
    } else {
        return 0;
    }
}
function compareEqual(val1,val2)
{
    addInstructions("Equals?: "+val1+"=="+val2);
    if(val1 == val2)
    {
        return 1;
    } else {
        return 0;
    }
    
}

function intCode2(a){

    let bExit = false;
    do{
        let commandValue = arrAmps[a].prog[arrAmps[a].cursor] | 0;
        let theCommand = 0;
        let paramMode1 = 0;
        let paramMode2 = 0;
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
        //If True, then use value at spot (immediate mode), else use position mode and look up value
        let val1 = paramMode1 ? arrAmps[a].prog[arrAmps[a].cursor+1] | 0 : arrAmps[a].prog[arrAmps[a].prog[arrAmps[a].cursor+1] | 0] | 0;
        let val2 = paramMode2 ? arrAmps[a].prog[arrAmps[a].cursor+2] | 0 : arrAmps[a].prog[arrAmps[a].prog[arrAmps[a].cursor+2] | 0] | 0;
        switch(theCommand)
        {
            case 1:
                arrAmps[a].prog[arrAmps[a].prog[arrAmps[a].cursor+3] | 0] = add(val1,val2);
                arrAmps[a].cursor += 4;
                break;
            case 2:
                arrAmps[a].prog[arrAmps[a].prog[arrAmps[a].cursor+3] | 0] = multiple(val1,val2);
                arrAmps[a].cursor += 4;
                break;
            case 3:
                if(!arrAmps[a].useSetting && !arrAmps[a].pause) {
                    arrAmps[a].pause = true;
                    break;
                } else {
                    arrAmps[a].useSetting = false;
                    arrAmps[a].pause = false;
                }
                arrAmps[a].prog[arrAmps[a].prog[arrAmps[a].cursor+1] | 0] = getInput(arrAmps[a].inputSetting);
                arrAmps[a].cursor += 2;
                break;
            case 4:
                arrAmps[a].output = giveOutput(val1);
                arrAmps[a].cursor += 2;
                bExit = true;
                break;
            case 5:
                if(val1 != 0)
                {
                    addInstructions("code 5: "+val1+"!=0 ,Cursor is "+val2);
                    arrAmps[a].cursor = val2;
                } else {
                    addInstructions("code 5: "+val1+"!=0 ,No Skip");
                    arrAmps[a].cursor += 3;
                }
                break;
            case 6:
                if(val1 == 0)
                {
                    addInstructions("code 6: "+val1+"==0 ,Cursor is "+val2);
                    arrAmps[a].cursor = val2;
                } else {
                    addInstructions("code 6: "+val1+"==0 ,No Skip");
                    arrAmps[a].cursor += 3;
                }
                break;
            case 7:
                arrAmps[a].prog[arrAmps[a].prog[arrAmps[a].cursor+3] | 0] = compareLess(val1,val2);
                arrAmps[a].cursor += 4;
                break;
            case 8:
                arrAmps[a].prog[arrAmps[a].prog[arrAmps[a].cursor+3] | 0] = compareEqual(val1,val2);
                arrAmps[a].cursor += 4;
                break;
            case 99:
                //arrAmps[a].cursor = arrAmps[a].prog.length;
                arrAmps[a].done = true;
                break;
            default:
                arrAmps[a].cursor = arrAmps[a].prog.length;
                console.log("uh:"+theCommand);
                arrAmps[a].done = true;
                break;
        }
    }while(!arrAmps[a].done && !arrAmps[a].pause && !bExit)

    return;
}



function intCode(prog, ampInput,ampOutput){

    arrProgram = prog.split(",");

    let cursor = 0;
    let returnVal;
    let bInputUsed = false;
    while(cursor < arrProgram.length){
        let commandValue = arrProgram[cursor] | 0;
        let theCommand = 0;
        let paramMode1 = 0;
        let paramMode2 = 0;
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
        //If True, then use value at spot (immediate mode), else use position mode and look up value
        let val1 = paramMode1 ? arrProgram[cursor+1] | 0 : arrProgram[arrProgram[cursor+1]] | 0;
        let val2 = paramMode2 ? arrProgram[cursor+2] | 0 : arrProgram[arrProgram[cursor+2]] | 0;
        //let val3 = paramMode3 ? arrProgram[cursor+3] : arrProgram[cursor+3];
        switch(theCommand)
        {
            case 1:
                add(val1,val2,arrProgram[cursor+3] | 0);
                cursor += 4;
                break;
            case 2:
                multiple(val1,val2,arrProgram[cursor+3] | 0);
                cursor += 4;
                break;
            case 3:
                getInput(arrProgram[cursor+1] | 0,bInputUsed ? ampOutput : ampInput);
                bInputUsed = true;
                cursor += 2;
                break;
            case 4:
                returnVal = giveOutput(val1);
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
                compareLess(val1,val2,arrProgram[cursor+3] | 0);
                cursor += 4;
                break;
            case 8:
                compareEqual(val1,val2,arrProgram[cursor+3] | 0);
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

    return returnVal;
}


