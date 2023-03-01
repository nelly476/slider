const allRanges = document.querySelectorAll(".range-group");

allRanges.forEach((wrap) => {
  const range = wrap.querySelector(".range");
  const bubble = wrap.querySelector(".bubble");
  const number = wrap.querySelector(".range-value");

  range.addEventListener("input", () => {
    setBubble(range, bubble);
    number.value = range.value;
    bubble.classList.remove("display-none");
    modifyPrice();
  });

  number.addEventListener("input", () => {
    if (number.value.length === 0) {
      bubble.classList.add("display-none");
    } else {
      bubble.classList.remove("display-none");
      setBubble(number, bubble);
      range.value = number.value;
      modifyPrice();
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
  let formatter = Intl.NumberFormat("en-GB", { notation: "compact" });

  let newVal;
  if (Number(val) > Number(max)) {
    newVal = Number(((max - min) * 100) / (max - min));
  } else {
    newVal = Number(((val - min) * 100) / (max - min));
  }

  bubble.innerText = formatter.format(val);

  bubble.style.left = `calc(${newVal}% + (${8 - newVal * 0.15}px))`;
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
