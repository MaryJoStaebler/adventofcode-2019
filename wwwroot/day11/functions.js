
let viewInstructions = false;
let viewVerbose = true;
let instructions = document.getElementById("instructions");
let arrProgram;
let inputProgram;
let outputValue1, outputValue2;
let isPaused = true;

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
    arrProgram[val1] = inputProgram;
    addInstructions("Get Value: "+(inputProgram));
}
function giveOutput(val1){
    addInstructions("Write: "+val1);
    return val1;
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
let done = false;
function intCode(){

   // addVerbose("enter");
    let intExit = 0;
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
                if(!isPaused)
                {
                    isPaused = true;
                    break;
                } else {
                    isPause = false;
                }
                getInput((paramMode1 == 2 ? arrProgram[cursor+1]+basePosition: arrProgram[cursor+1]));
                cursor += 2;
                break;
            case 4:
                let val = giveOutput(val1);
                switch(intExit){
                    case 0:
                        outputValue1 = val;
                        break;
                    case 1:
                        outputValue2 = val;
                        break;
                }
                cursor += 2;
                intExit += 1;
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
    } while (!done && intExit < 2);

   // addVerbose("exit");
    return;
}

let rover = {
    angle:0,
    x:0,
    y:0,
    go:0
};

function part1() {
    instructions.innerText = "";

    arrProgram = changeStringArrayToIntArray(document.getElementById("data").value.split(","));
    //intCode();

    let spacePanels = {};

    let maxX = 0;
    let minX = 0;
    let maxY = 0;
    let minY = 0;

    do {

        let panelName = "x"+rover.x+"y"+rover.y;
        let currentPanel;
        if(!spacePanels.hasOwnProperty(panelName))
        {
            //addVerbose("Add Panel: "+panelName);
            spacePanels[panelName] = {};
            spacePanels[panelName].x = rover.x;
            spacePanels[panelName].y = rover.y;
            spacePanels[panelName].color = (!rover.go ? 1: 0);
            rover.go = true;
            spacePanels[panelName].angle = 0;
        } 
        currentPanel = spacePanels[panelName];

        inputProgram = currentPanel.color;
        intCode();
        currentPanel.color = outputValue1;

        switch (outputValue2)
        {
            case 0:
                rover.angle -= 90;
                break;
            case 1:
                rover.angle += 90;
                break;
        } 
        if(rover.angle >= 360)
        {
            rover.angle = 0;
        } else if (rover.angle <= -90)
        {
            rover.angle = 270;
        }

        switch(rover.angle)
        {
            case 0:
                rover.y += 1;
                break;
            case 90:
                rover.x += 1;
                break;
            case 180:
                rover.y -= 1;
                break;
            case 270:
                rover.x -= 1;
                break;
        }
        minX = (minX > rover.x) ? rover.x : minX;
        minY = (minY > rover.y) ? rover.y : minY;
        maxX = (maxX < rover.x) ? rover.x : maxX;
        maxY = (maxY < rover.y) ? rover.y : maxY;

    } while (!done );


    // Visualize!
    let lengthX = Math.abs(minX)+Math.abs(maxX);
    let lengthY = Math.abs(minY)+Math.abs(maxY);
    console.log("width:"+lengthX);
    console.log(minX+"/"+maxX);
    console.log(minY+"/"+maxY);

    let ulImage = document.getElementById("theImage");

    for(let y = minY; y <= maxY; y++)
    {
        for(let x = minX;x <=maxX; x++)
        {
            let d = document.createElement("li");
            let i = ((y-minY)*lengthX+(x-minX)+y-minY);
            d.classList.add("x"+x+"y"+y+"i"+i);
            ulImage.appendChild(d);
        }
    }

    for(let theName in spacePanels)
    {
        let x = spacePanels[theName].x; //offset = 
        let y = spacePanels[theName].y; //column = y*w+x
        let w = lengthX;
        let liIndex = ((y-minY)*w)+(x-minX+y-minY);
        let li = ulImage.children[liIndex];
        li.classList.add("color-"+spacePanels[theName].color);
        li.innerText = theName;
    }

    viewVerbose = true;
    addVerbose("Panels Painted: "+Object.getOwnPropertyNames(spacePanels).length);
   // console.log(spacePanels);
}