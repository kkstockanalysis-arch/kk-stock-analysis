const DEFAULT_STOCK = "RELIANCE.NS";

async function loadStockPrice(symbol = DEFAULT_STOCK) {
  const url = `https://query2.finance.yahoo.com/v7/finance/quote?symbols=${symbol}`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    const stock = data.quoteResponse.result[0];

    document.querySelector("#stockPage p:nth-of-type(1)").innerText =
      "Stock Name: " + stock.symbol;

    document.querySelector("#stockPage p:nth-of-type(2)").innerText =
      "Live Price: " + stock.regularMarketPrice;

  } catch (err) {
    console.error(err);
  }
}
