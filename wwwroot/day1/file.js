
function whatsTheFuel(loadDataFn){
    // read text from URL location
    let request = new XMLHttpRequest();
    request.open('GET', '/day1/data.txt');
    request.send();
    request.onload = loadDataFn
}

function calcFuelForModules() {

   fileModuleMass = this.response;
   arrModules = fileModuleMass.split('\n');
   
   let modules = [];

   for(let i = 0; i<arrModules.length;i++){
       let fuelRequired = fuelCalculation(arrModules[i]);
       modules.push({mass:arrModules[i],fuel:fuelRequired});
   }

   let totalFuel = 0;
   for(let i =0; i < modules.length; i++){
       totalFuel += modules[i].fuel;
   }
   document.getElementById("GoalFuel1").innerHTML="Goal 1 total: "+totalFuel;
   
}

function calcFuelForModulesAdjusted() {

    fileModuleMass = this.response;
    arrModules = fileModuleMass.split('\n');
    
    let modules = [];
 
    for(let i = 0; i<arrModules.length;i++){
        let fuelRequired = 0;
        let fuelStart = fuelCalculation(arrModules[i]);
        fuelRequired += fuelStart;
        while(fuelStart > 0)
        {
            fuelStart = fuelCalculation(fuelStart);
            if(fuelStart > 0){
             fuelRequired += fuelStart;
            }
        }
        modules.push({mass:arrModules[i],fuel:fuelRequired});
    }
 
    let totalFuel = 0;
    for(let i =0; i < modules.length; i++){
        totalFuel += modules[i].fuel;
    }
    document.getElementById("GoalFuel2").innerHTML="Goal 2 total: "+totalFuel;
    
 }

function fuelCalculation(mass){
    return Math.floor(mass/3)-2;
}

whatsTheFuel(calcFuelForModules);
whatsTheFuel(calcFuelForModulesAdjusted);