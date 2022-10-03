
function AverageIlvl  (params) {
    numberArr = document.querySelectorAll(".ilvl");

   let total = 0;
   for (let index = 0; index < numberArr.length; index++) {
    let score = numberArr[index].outerText;
    total = Number(score) + total 
   }
   let average_ilvl = Math.round(total/numberArr.length)
    
    document.getElementById("average-ilvl").innerHTML = average_ilvl;
}

AverageIlvl();