
let viewInstructions = false;
let viewVerbose = false;
let instructions = document.getElementById("instructions");

function part1() {
    instructions.innerText = "";

    let imageData = [...document.getElementById("data").value];
    imageData = changeStringArrayToIntArray(imageData);

    let imgWidth = 25;
    let imgHeight = 6;

    let layers = [[]];
    let currLayer = 0;

    for(let i = 0; i < imageData.length; i++)
    {
        if(i == imgWidth*imgHeight*(currLayer+1))
        {
            //New Layer
            currLayer += 1;
            layers.push([]);
        }
        layers[currLayer].push(imageData[i]);
        addVerbose(imageData[i]+"->"+currLayer);
    }

    let layerMostZeros = layers[0];
    for(let l = 0; l < layers.length; l++)
    {
        if(layers[l].filter(x => x==0).length < layerMostZeros.filter(x => x==0).length){
            layerMostZeros = layers[l];
        }
    }
    console.log(layerMostZeros);
    let numOnes = layerMostZeros.filter(x => x==1).length;
    let numTwos = layerMostZeros.filter(x => x==2).length;

    viewVerbose = true;
    addVerbose("Output: "+numOnes*numTwos);
}

function part2() {
    instructions.innerText = "";
    //0 is black, 1 is white, and 2 is transparent.
    let imageData = [...document.getElementById("data").value];
    imageData = changeStringArrayToIntArray(imageData);

    let imgWidth = 25;
    let imgHeight = 6;

    let layers = [[]];
    let currLayer = 0;

    for(let i = 0; i < imageData.length; i++)
    {
        if(i == imgWidth*imgHeight*(currLayer+1))
        {
            //New Layer
            currLayer += 1;
            layers.push([]);
        }
        layers[currLayer].push(imageData[i]);
        addVerbose(imageData[i]+"->"+currLayer);
    }

    let theImage = [];

    for(let i = 0; i < imgHeight*imgWidth; i++){
        for(let l = 0; l < layers.length; l++){
            let val = layers[l][i];
            if(val == 1 || val == 0){
                theImage.push(val);
                break;
            }
        }
    }
    console.log(theImage);
    addImage(theImage);
}



function changeStringArrayToIntArray(arr)
{
    for(let i = 0; i < arr.length; i++)
    {
        arr[i] = arr[i] | 0;
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
function addImage(img){
    let ulImage = document.getElementById("theImage");
    for(let x = 0;x<img.length;x++)
    {
        let d = document.createElement("li");
        d.innerText = img[x];
        d.classList.add("color-"+img[x]);
        ulImage.appendChild(d);
    }
}