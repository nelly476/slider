const allRanges = document.querySelectorAll(".range-group");

allRanges.forEach((wrap) => {
  const range = wrap.querySelector(".range");
  const bubble = wrap.querySelector(".bubble");
  const number = wrap.querySelector(".range-value");

  range.addEventListener("input", () => {
    setBubble(range, bubble);
    number.value = range.value;
    modifyPrice();
  });

  // Using focusout for price change
  number.addEventListener("focusout", () => {
    if (number.value.length > 0) {
      range.value = number.value;
      setBubble(range, bubble);
      modifyPrice();
    }

    if (number.value <= 0 || number.value == isNaN()) {
      number.value = 1;
      setBubble(number, bubble);
      range.value = number.value;
    }
    if (number.classList.contains("contracts") && number.value > 500) {
      number.value = 500;
    } else if (number.classList.contains("catalogues") && number.value > 3000) {
      number.value = 3000;
    }
  });

  // Allowing users to click enter to update prices
  number.addEventListener("keypress", (e) => {
    if (e.key !== 'Enter') return;

    if (number.value.length > 0) {
      range.value = number.value;
      setBubble(range, bubble);
      modifyPrice();
    }

    if (number.value <= 0 || number.value == isNaN()) {
      number.value = 1;
      setBubble(number, bubble);
      range.value = number.value;
    }
    if (number.classList.contains("contracts") && number.value > 500) {
      number.value = 500;
    } else if (number.classList.contains("catalogues") && number.value > 3000) {
      number.value = 3000;
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
  number.addEventListener("focusout", (e) =>
    range.style.setProperty("--value", Math.max(number.value, Number(e.target.min)))
  );
  number.addEventListener("keypress", (e) => e.key === 'Enter' && 
    range.style.setProperty("--value", Math.max(number.value, Number(e.target.min)))
  );
});

function setBubble(range, bubble) {
  const val = range.value;
  const min = range.min ? range.min : 0;
  const max = range.max ? range.max : 100;
  const SLIDER_THUMB_WIDTH = 12;              // Width of the thumb
  let formatter = Intl.NumberFormat("en-GB", { notation: "compact" });

  let newVal;
  if (Number(val) > Number(max)) {
    newVal = Number(((max - min) * 100) / (max - min));
  } else {
    newVal = Number(((val - min) * 100) / (max - min));
  }

  bubble.innerText = formatter.format(val);

  // Left offset for the bubble, when at 0%
  const offset = `${SLIDER_THUMB_WIDTH / 2}px`;

  // Calculating inner width (track) in percents
  const innerWidth = `100% - ${SLIDER_THUMB_WIDTH}px`;

  bubble.style.left = `calc(${offset} + ((${innerWidth}) * ${newVal / 100}))`;
}

function modifyPrice() {
  const contracts = document.getElementById("contractNumberInput");
  const catalogues = document.getElementById("CatalogueNumberInput");
  const finalPrice = document.getElementById("finalPrice");

  const BASE_PRICE = 20;
  const BASE_CONTRACTS = 15;
  const BASE_CATALOGUES = 100;

  const contractsNumber = Number(contracts.value);
  const cataloguesNumber = Number(catalogues.value);

  const contractsIncrements = (contractsNumber - 1) / BASE_CONTRACTS;
  const cataloguesIncrements = (cataloguesNumber - 1) / BASE_CATALOGUES;

  const resultPrice =
    (1 + Math.floor(cataloguesIncrements) + Math.floor(contractsIncrements)) *
    BASE_PRICE;

  const resultPriceFormatted = new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0,
  }).format(resultPrice);

  finalPrice.innerText = resultPrice > 20 ? resultPriceFormatted : "£20";
}
