
const codeRange = "245182-790572";//"245182-790572"
let arrCode = codeRange.split("-");

//Code has digit that is duplicate and adjacent
//number increment
let fromNum = arrCode[0] | 0;
let toNum = arrCode[1] | 0;
console.log(fromNum+'->'+toNum);

function goal1() {
    let count = 0;
    for(let i = fromNum | 0; i < toNum+1;i++)
    {
        let theCode = i.toString().padStart(6,'0');
        //console.log(theCode);
        let badFlag = false;
        let hasDups = false;
        for(let j = 0;j < 5;j++){
            let num1 = theCode[j] | 0;
            let num2 = theCode[j+1] | 0;
            if(num1 > num2)
            {
                badFlag = true;
                break;
            } else if (num1 == num2)
            {
                hasDups = true;
            }
        }
        if(!badFlag && hasDups) {
            count++;
        }
    }
    
    console.log("The Answer Is: "+count);
    
}


function goal2() {
    let count = 0;
    for(let i = fromNum | 0; i < toNum+1;i++)
    {
        let theCode = i.toString().padStart(6,'0');
        //console.log(theCode);
        let badFlag = false;
        let countDups = 1;
        let hasDups = false;
        for(let j = 0;j < 5;j++){
            let num1 = theCode[j] | 0;
            let num2 = theCode[j+1] | 0;
            let num3 = theCode[j+2] | 0;
           
            if(num1 > num2){
                badFlag = true;
                break;
            } else if (num1 == num2){
                countDups +=1;
            } else if (num1 !== num2) {
                if (countDups == 2){
                    hasDups = true;
                }
                countDups = 1;
            }
             
        }
        if(!badFlag && (hasDups || countDups == 2)) {
            count++;
        }
    }
    
    console.log("The Answer Is: "+count);
    
}
goal1();
goal2();