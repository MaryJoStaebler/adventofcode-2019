;
let fileData =""

function readFile(){
    // read text from URL location
    let request = new XMLHttpRequest();
    request.open('GET', '/day1/data.txt');
    request.send();
    request.onload = loadData
}

function loadData() {

   fileModuleMass = this.response;
   arrModules = fileModuleMass.split('\n');
   
   let modules = [];

   for(let i = 0; i<arrModules.length;i++){
       let fuelRequired = 0;
       let fuelStart = fuelCalculation(arrModules[i]);
       fuelRequired += fuelStart;
       console.log(fuelStart);
       while(fuelStart > 0)
       {
           fuelStart = fuelCalculation(fuelStart);
           if(fuelStart > 0){
            fuelRequired += fuelStart;
           }
           console.log(fuelStart);
       }
       console.log("totes:"+fuelRequired);
       modules.push({mass:arrModules[i],fuel:fuelRequired});
   }

   let totalFuel = 0;
   for(let i =0; i < modules.length; i++){
       totalFuel += modules[i].fuel;
   }
   console.log("total: "+totalFuel);
   
}

function fuelCalculation(mass){
    return Math.floor(mass/3)-2;
}

readFile();