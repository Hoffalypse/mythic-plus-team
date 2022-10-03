
function mScoreAverage  (params) {
    numberArr = document.querySelectorAll(".numbers");

   let total = 0;
   for (let index = 0; index < numberArr.length; index++) {
    let score = numberArr[index].outerText;
    total = Number(score) + total 
   }
   let average_m_score = total/numberArr.length
    
    document.getElementById("average-m").innerHTML = average_m_score;
}

mScoreAverage();


 


// scoreTotal.push(number)

// console.log(scoreTotal);

// number = document.getElementById("numbers").setAttribute("numbers", "value");