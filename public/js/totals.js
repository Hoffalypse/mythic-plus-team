function mScoreAverage(params) {
  numberArr = document.querySelectorAll('.numbers');
  let total = 0;
  for (let index = 0; index < numberArr.length; index++) {
    let score = numberArr[index].outerText;
    total = Number(score) + total;
  }
  let average_m_score = Math.round(total / numberArr.length);

  document.getElementById('average-m').innerHTML = average_m_score;
}

mScoreAverage();
