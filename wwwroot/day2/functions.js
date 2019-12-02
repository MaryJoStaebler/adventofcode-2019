const prog = [1,12,2,3,1,1,2,3,1,3,4,3,1,5,0,3,2,13,1,19,1,19,10,23,1,23,13,27,1,6,27,31,1,9,31,35,2,10,35,39,1,39,6,43,1,6,43,47,2,13,47,51,1,51,6,55,2,6,55,59,2,59,6,63,2,63,13,67,1,5,67,71,2,9,71,75,1,5,75,79,1,5,79,83,1,83,6,87,1,87,6,91,1,91,5,95,2,10,95,99,1,5,99,103,1,10,103,107,1,107,9,111,2,111,10,115,1,115,9,119,1,13,119,123,1,123,9,127,1,5,127,131,2,13,131,135,1,9,135,139,1,2,139,143,1,13,143,0,99,2,0,14,0];
const finalResult = 19690720;

let arrProgram = prog.slice(0);


function updateElement(i,val,elem){
    let d = (elem ? elem : document.getElementById(`a${i}`));
    if(d !== null){
        d.innerHTML = val;
        if(val === 99){
            d.classList.add("end-prog");
        } else {
            d.classList.remove("end-prog");
        }
    }
}

function add(val1,val2,replaceIndex){
    //console.log("add");
    //console.log(val1+"/"+val2+"/"+replaceIndex+"|"+arrProgram[val1]+"+"+arrProgram[val2]+"="+(arrProgram[val1]+arrProgram[val2]));
    arrProgram[replaceIndex] = arrProgram[val1]+arrProgram[val2];
    //updateElement(replaceIndex,arrProgram[replaceIndex]);
}
function multiple(val1,val2,replaceIndex){
    //console.log("multiple");
    //console.log(val1+"/"+val2+"/"+replaceIndex+"|"+arrProgram[val1]+"*"+arrProgram[val2]+"="+(arrProgram[val1]*arrProgram[val2]));
    arrProgram[replaceIndex] = arrProgram[val1]*arrProgram[val2];
    //updateElement(replaceIndex,arrProgram[replaceIndex]);
}


function intCode(noun, verb){

    arrProgram = prog.slice(0);
    arrProgram[1] = noun;
    arrProgram[2] = verb;

    // for(let i = 0;i<arrProgram.length;i++){
    //     let d = document.createElement("div");
    //     d.id = `a${i}`;
    //     updateElement(i,arrProgram[i],d);
    //     document.body.appendChild(d);
    // }

    let cursor = 0;
    while(cursor <arrProgram.length){
        let commandValue = arrProgram[cursor];
        //console.log(commandValue+"/"+arrProgram[cursor+1]+"/"+arrProgram[cursor+2]+"/"+arrProgram[cursor+3]);
        switch(commandValue)
        {
            case 1:
                add(arrProgram[cursor+1],arrProgram[cursor+2],arrProgram[cursor+3]);
                break;
            case 2:
                multiple(arrProgram[cursor+1],arrProgram[cursor+2],arrProgram[cursor+3]);
                break;
            case 99:
                cursor = arrProgram.length;
                break;
        }
        cursor += 4;
    }

    return arrProgram[0];
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

function day2Goal1() {
    let result = intCode(12,2);
    let d = document.createElement("div");
    d.classList.add("end-prog");
    d.innerText = `Day 2 Goal 1 Result: ${result}`;
    document.body.appendChild(d);
}
day2Goal1();


function day2Goal2() {
    let d = document.createElement("div");
    d.classList.add("end-prog");
    let result = findResult(finalResult);
    d.innerText = `Day 2 Goal 1 Result: ${(result.noun*100+result.verb)}`;
    document.body.appendChild(d);
}
day2Goal2();