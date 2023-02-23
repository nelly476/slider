const contractNumberInput = document.getElementById("contractNumberInput");
const contractRangeInput = document.getElementById("contractRangeInput");
const workNumberInput = document.getElementById("workNumberInput");
const workRangeInput = document.getElementById("workRangeInput");

contractRangeInput.oninput = (e) => {
  contractNumberInput.value = e.target.value;
};

contractNumberInput.oninput = (e) => {
  contractRangeInput.value = e.target.value;
};

workRangeInput.oninput = (e) => {
  workNumberInput.value = e.target.value;
};

workNumberInput.oninput = (e) => {
  workRangeInput.value = e.target.value;
};
