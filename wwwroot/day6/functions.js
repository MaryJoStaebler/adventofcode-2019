





function part1(){
    let theMap = document.getElementById("data");
    let arrMapLines = theMap.value.split('\n');
    startNode = undefined;
    populateMap(arrMapLines);
    calcOrbits();
    createMap();
} 
function part2(){
    let theMap = document.getElementById("data");
    let arrMapLines = theMap.value.split('\n');
    startNode = undefined;
    populateMap(arrMapLines);
    calcOrbits();
    createMap();
    let YOU = findNode(startNode,"YOU");
    if(YOU !== undefined)
    {
        console.log(YOU.path);
    }
    let SAN = findNode(startNode,"SAN");
    if(SAN !== undefined)
    {
        console.log(SAN.path);
    }
    let arrYouPath = YOU.path.split("/");
    let arrSanPath = SAN.path.split("/");
    let isSame = true;
    let curr = 0;
    do
    {
        if(curr < arrYouPath.length && curr < arrSanPath.length && arrYouPath[curr] === arrSanPath[curr])
        {
            curr++;
        } else {
            break;
        }
    } while (isSame);
    console.log("result: "+(arrYouPath.length-curr+arrSanPath.length-curr));
} 

let startNode;

function populateMap(arrLines)
{
    let i = 0;
    const totalRuns = arrLines.length*1000;
    let runs = 0;
    while(arrLines.length > 0)
    {
        runs += 1;
        if(runs >= totalRuns)
        {
            console.log("that's a long time");
            break;
        }
        if(arrLines[i].length == 0) 
        {
            arrLines.splice(i,1);
            i = 0;
            
        } else {
            let splitLine = arrLines[i].split(")");
            let center = splitLine[0];
            let orbiter = splitLine[1];
            if(startNode === undefined && center === "COM")
            {
                childNode = {name:orbiter,children:[]};
                startNode = {name:center, path: "",children:[childNode]};
                childNode.parent = startNode;
                childNode.path = startNode.path+"/"+startNode.name;

                arrLines.splice(i,1);
                i = 0;
            } else if (startNode === undefined){
                i += 1;
            } else {
                let node = findNode(startNode,center);
                if(node === null)
                {
                    i += 1;
                    if(i >= arrLines.length)
                    {
                        i =0;
                    }
                } else {
                    childNode = {name:orbiter,parent: node,children:[]};
                    childNode.path = node.path+"/"+node.name;
                    node.children.push(childNode);
    
                    arrLines.splice(i,1);
                    i = 0;
                }
            }
        }
    }

}

function findNode(node,name)
{
    if(node.name == name)
    {
        return node;
    } else {
        for(let i = 0; i < node.children.length; i++){
            let n = findNode(node.children[i],name);
            if (n !== null)
            {
                return n;
            }
        }
    }

    return null;
}

function createMap(){

    let top = document.getElementById("instructions");
    top.appendChild(writeNode(startNode));
}

function writeNode(node){
    let n = document.createElement("li");
    n.innerText = node.name+"/"+node.orbit+'/'+node.totalOrbs+'/path: '+(node.path);

    if (node.children !== undefined && node.children.length > 0)
    {
        let ul = document.createElement("ul");
        for(let i = 0; i < node.children.length; i++)
        {
            ul.appendChild(writeNode(node.children[i]));
        }
        n.appendChild(ul);
    }

    return n;
}

function calcOrbits()
{
    let orbitLevel = -1;
    let orbits = calcNodeOrbits(startNode,0,orbitLevel);
    console.log("result: "+orbits);
}

function calcNodeOrbits(node,totalOrbs,orbitLevel){

        orbitLevel +=1;
        node.orbit = orbitLevel;
        childOrbits = 0;
        for(let i = 0; i < node.children.length;i++)
        {
            childOrbits += calcNodeOrbits(node.children[i],totalOrbs,orbitLevel)
        }
        node.totalOrbs = (totalOrbs > 0 ? totalOrbs : 0)+childOrbits+(orbitLevel > 0 ? orbitLevel : 0);
        return node.totalOrbs;
}