// ===== PAGE REFERENCES =====
const loginPage = document.getElementById("loginPage");
const signupPage = document.getElementById("signupPage");
const dashboardPage = document.getElementById("dashboardPage");

// ===== SHOW FUNCTIONS =====
function showLogin() {
  loginPage.classList.remove("hidden");
  signupPage.classList.add("hidden");
  dashboardPage.classList.add("hidden");
}

function showSignup() {
  loginPage.classList.add("hidden");
  signupPage.classList.remove("hidden");
  dashboardPage.classList.add("hidden");
}

function showDashboard() {
  loginPage.classList.add("hidden");
  signupPage.classList.add("hidden");
  dashboardPage.classList.remove("hidden");
}

// ===== BUTTON ACTIONS =====

// Login button
document.querySelector("#loginPage button").onclick = () => {
  showDashboard(); // TEMP (auth will come later)
};

// Signup button
document.querySelector("#signupPage button").onclick = () => {
  showDashboard(); // TEMP
};

// Logout button
document.querySelector(".logout").onclick = () => {
  showLogin();
};

// Text links
document.querySelector("#loginPage .link").onclick = showSignup;
document.querySelector("#signupPage .link").onclick = showLogin;
