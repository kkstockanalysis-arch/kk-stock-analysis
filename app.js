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

function showDashboard() {
  document.getElementById("loginPage").style.display = "none";
  document.getElementById("signupPage").style.display = "none";
  document.getElementById("dashboardPage").style.display = "block";
  clearMessage();

  loadStockPrice(); // 👈 ADD THIS LINE
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







