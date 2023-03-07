const allRanges = document.querySelectorAll(".range-group");

allRanges.forEach((wrap) => {
  const range = wrap.querySelector(".range");
  const bubble = wrap.querySelector(".bubble");
  const number = wrap.querySelector(".range-value");
  const step = Number(range.step);

  let numberChangeTimeout = null;
  const TIMEOUT_TIME = 200; // in milliseconds
  const EXTENDED_TIMEOUT_TIME = 2000; // in milliseconds

  const handleNumberChange = () => {
    const value = Number(number.value || number.min);
    if (isNaN(value)) value = number.min;

    const roundedNumber = Math.ceil(value / step) * step;

    number.value = Math.max(number.min, Math.min(number.max, roundedNumber));
    range.value = number.value;
    range.style.setProperty("--value", number.value);

    setBubble(range, bubble);
    modifyPrice();
  };

  range.addEventListener("input", () => {
    setBubble(range, bubble);
    number.value = range.value;
    modifyPrice();
  });

  number.addEventListener("input", () => {
    clearTimeout(numberChangeTimeout);

    numberChangeTimeout = setTimeout(
      handleNumberChange,
      Number(number.value) <=
        Math.max(Number(number.min), Number(number.step || 1))
        ? EXTENDED_TIMEOUT_TIME
        : TIMEOUT_TIME
    );
  });

  number.addEventListener("keypress", (e) => {
    clearTimeout(numberChangeTimeout);

    if (e.key === "Enter")
      // Bypass waiting time on enter key press
      return handleNumberChange();

    numberChangeTimeout = setTimeout(
      handleNumberChange,
      Number(number.value) <=
        Math.max(Number(number.min), Number(number.step || 1))
        ? EXTENDED_TIMEOUT_TIME
        : TIMEOUT_TIME
    );
  });

  setBubble(range, bubble);

  // Functions for progress bar to work

  range.style.setProperty("--value", range.value);
  range.style.setProperty("--min", range.min == "" ? "0" : range.min);
  range.style.setProperty("--max", range.max == "" ? "100" : range.max);
  range.addEventListener("input", () =>
    range.style.setProperty("--value", range.value)
  );

  number.style.setProperty("--value", Math.round(number.value / step) * step);
  number.style.setProperty("--min", number.min == "" ? "0" : number.min);
  number.style.setProperty("--max", number.max == "" ? "100" : number.max);
});

function setBubble(range, bubble) {
  const val = range.value;
  const min = range.min ? range.min : 0;
  const max = range.max ? range.max : 100;
  const SLIDER_THUMB_WIDTH = 12; // Width of the thumb
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
  const BASE_CATALOGUES = 300;

  const contractsNumber = Number(contracts.value);
  const cataloguesNumber = Number(catalogues.value);

  const contractsIncrements = (contractsNumber - 1) / BASE_CONTRACTS;
  const cataloguesIncrements = (cataloguesNumber - 1) / BASE_CATALOGUES;

  const priceIncrement =
    contractsIncrements > cataloguesIncrements
      ? contractsIncrements
      : cataloguesIncrements;

  const resultPrice = (1 + Math.floor(priceIncrement)) * BASE_PRICE;

  const resultPriceFormatted = new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0,
  }).format(resultPrice);

  finalPrice.innerText = resultPrice > 20 ? resultPriceFormatted : "£20";
}
