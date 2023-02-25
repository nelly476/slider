const allRanges = document.querySelectorAll(".range-group");

allRanges.forEach((wrap) => {
  const range = wrap.querySelector(".range");
  const bubble = wrap.querySelector(".bubble");
  const number = wrap.querySelector(".range-value");

  range.addEventListener("input", () => {
    setBubble(range, bubble);
    number.value = range.value;
    bubble.classList.remove("display-none");
  });

  number.addEventListener("input", () => {
    if (number.value.length === 0) {
      bubble.classList.add("display-none");
    } else {
      bubble.classList.remove("display-none");
      range.value = number.value;
      setBubble(range, bubble);
    }
  });

  setBubble(range, bubble);

  // Functions for progress bar to work

  range.style.setProperty("--value", range.value);
  range.style.setProperty("--min", range.min == "" ? "0" : range.min);
  range.style.setProperty("--max", range.max == "" ? "100" : range.max);
  range.addEventListener("input", () =>
    range.style.setProperty("--value", range.value)
  );

  number.style.setProperty("--value", number.value);
  number.style.setProperty("--min", number.min == "" ? "0" : number.min);
  number.style.setProperty("--max", number.max == "" ? "100" : number.max);
  number.addEventListener("input", () =>
    range.style.setProperty("--value", number.value)
  );
});

function setBubble(range, bubble) {
  const val = range.value;
  const min = range.min ? range.min : 0;
  const max = range.max ? range.max : 100;
  const newVal = Number(((val - min) * 100) / (max - min));
  bubble.innerHTML = val;

  bubble.style.left = `calc(${newVal}% + (${8 - newVal * 0.15}px))`;
}
