let candleSeries = null;
let chart = null;


auth.onAuthStateChanged(user => {
  if (user) {
    showDashboard();
  } else {
    showLogin();
  }
  document.body.style.visibility = "visible";
});


function showSignup() {
  document.getElementById("loginPage").style.display = "none";
  document.getElementById("signupPage").style.display = "block";
  clearMessage();
}

function showLogin() {
  document.getElementById("signupPage").style.display = "none";
  document.getElementById("loginPage").style.display = "block";
  clearMessage();
}

let priceInterval = null;

function showDashboard() {
  document.getElementById("loginPage").style.display = "none";
  document.getElementById("signupPage").style.display = "none";
  document.getElementById("dashboardPage").style.display = "block";
  clearMessage();

  loadStockPrice(); // first load
  loadCandleData();

  // 🔁 auto refresh every 60 seconds
  if (priceInterval) {
    clearInterval(priceInterval);
  }

  priceInterval = setInterval(() => {
    loadStockPrice();
  }, 60000); // 60 seconds
}

function drawCandleChart(candles) {
  if (!chart) {
    chart = LightweightCharts.createChart(
      document.getElementById("candleChart"),
      {
        width: document.getElementById("candleChart").clientWidth,
        height: 300,
        layout: {
          background: { color: "#ffffff" },
          textColor: "#000"
        },
        grid: {
          vertLines: { color: "#eee" },
          horzLines: { color: "#eee" }
        },
        timeScale: {
          timeVisible: true,
          secondsVisible: false
        }
      }
    );

    candleSeries = chart.addCandlestickSeries();
  }

  candleSeries.setData(candles);
}


function signup() {
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;

  auth.createUserWithEmailAndPassword(email, password)
    .then(() => {
      showDashboard();
    })
    .catch(error => {
      showMessage(error.message, "red");
    });
}

function login() {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      showDashboard();
    })
    .catch(error => {
      showMessage(error.message, "red");
    });
}

function logout() {
  auth.signOut().then(() => {
    showLogin();
  });
}

//function logout() {
//  if (priceInterval) {
//    clearInterval(priceInterval);
//  }
//
//  auth.signOut().then(() => {
// showLogin();
 // });
// }


function showMessage(text, color) {
  const messages = document.querySelectorAll("#message");
  messages.forEach(m => {
    m.style.color = color;
    m.innerText = text;
  });
}

function clearMessage() {
  document.querySelectorAll("#message").forEach(m => m.innerText = "");
}

const STOCK_SYMBOL = "IBM"; // change later or from Firebase
const API_KEY = "AF0LTS0R7PH4GH7Z";

function loadStockPrice() {
  const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${STOCK_SYMBOL}&apikey=${API_KEY}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const price = data["Global Quote"]["05. price"];
      document.getElementById("stockName").innerText = STOCK_SYMBOL;
      document.getElementById("stockPrice").innerText = price;
    })
    .catch(error => {
      document.getElementById("stockPrice").innerText = "Error";
      console.error(error);
    });
}

function loadCandleData() {
  const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${STOCK_SYMBOL}&interval=5min&apikey=${API_KEY}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const candles = data["Time Series (5min)"];

      if (!candles) {
        console.log("Candle data not available");
        return;
      }

      // Convert object to array
      const candleArray = Object.keys(candles).map(time => {
        return {
        time: time,
        open: parseFloat(candles[time]["1. open"]),
        high: parseFloat(candles[time]["2. high"]),
        low: parseFloat(candles[time]["3. low"]),
        close: parseFloat(candles[time]["4. close"])
        };
        }).reverse(); // oldest → newest

      drawCandleChart(candleArray);

      console.log("Candles:", candleArray);

      // 🔴 FUTURE: your candle logic will go here
      // checkCandleAlert(candleArray);

    })
    .catch(error => {
      console.error("Candle error:", error);
    });
}

function addStock() {
  const symbol = document.getElementById("newStockSymbol").value;
  document.getElementById("adminMessage").innerText =
    "Stock added (logic coming next): " + symbol;
}





