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

const allRanges = document.querySelectorAll(".range-wrap");

allRanges.forEach((wrap) => {
  const range = wrap.querySelector(".range");
  const bubble = wrap.querySelector(".bubble");

  range.addEventListener("input", () => {
    setBubble(range, bubble);
  });
  setBubble(range, bubble);
});

function setBubble(range, bubble) {
  const val = range.value;
  const min = range.min ? range.min : 0;
  const max = range.max ? range.max : 100;
  const newVal = Number(((val - min) * 100) / (max - min));
  bubble.innerHTML = val;

  bubble.style.left = `calc(${newVal}% + (${8 - newVal * 0.15}px))`;
}
