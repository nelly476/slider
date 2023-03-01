// const size = document.getElementById("size");
// const contracts = document.getElementById("contracts");
// const result = document.getElementById("result");

// const BASE_PRICE = 20;
// const BASE_SIZE = 15;
// const BASE_CONTRACTS = 100;

// console.log({ size });

// // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#options

// const handleInputChange = () => {
//   const sizeNumber = Number(size.value);
//   const contractsNumber = Number(contracts.value);

//   const sizeIncrements = (sizeNumber - 1) / BASE_SIZE;
//   const contractsIncrements = (contractsNumber - 1) / BASE_CONTRACTS;

//   const resultPrice =
//     (1 + Math.floor(sizeIncrements) + Math.floor(contractsIncrements)) *
//     BASE_PRICE;
//   const resultPriceFormatted = new Intl.NumberFormat("en-GB", {
//     style: "currency",
//     currency: "GBP",
//     maximumFractionDigits: 0,
//   }).format(resultPrice);

// let formatter = Intl.NumberFormat("en-GB", { notation: "compact" });
// // example 1
// let million = formatter.format(100, 000, 000);
// // example 2
// let billion = formatter.format(100, 000, 000);
// // print
// console.log({
//   million,
//   billion,
//   sizeNumber: formatter.format(sizeNumber),
//   contractsNumber: formatter.format(contractsNumber),
//   resultPrice: formatter.format(resultPrice),
// });

//   console.log({ resultPrice, resultPriceFormatted });

//   result.innerText = resultPriceFormatted;
// };

// size.addEventListener("input", handleInputChange);
// contracts.addEventListener("input", handleInputChange);

// (15) / 15 = 1
// (15 - 1) / 15 = 0.XXX
