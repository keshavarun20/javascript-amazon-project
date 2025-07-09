import { formatCurrency } from "../scripts/utils/money.js";

if (formatCurrency(2000.5) === "20.01") {
  console.log("Passed");
} else console.log("Failed");

if (formatCurrency(2000.4) === "20.00") {
  console.log("Passed");
} else console.log("Failed");