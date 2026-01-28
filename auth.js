// LOGIN
document.querySelector("#loginPage button").onclick = () => {
  const email = document.querySelector("#loginPage input[type='email']").value;
  const password = document.querySelector("#loginPage input[type='password']").value;

  auth.signInWithEmailAndPassword(email, password)
    .then(() => showDashboard())
    .catch(err => alert(err.message));
};

// SIGNUP
document.querySelector("#signupPage button").onclick = () => {
  const email = document.querySelector("#signupPage input[type='email']").value;
  const password = document.querySelector("#signupPage input[type='password']").value;

  auth.createUserWithEmailAndPassword(email, password)
    .then(() => showDashboard())
    .catch(err => alert(err.message));
};

// LOGOUT
document.querySelector(".logout").onclick = () => {
  auth.signOut().then(() => showLogin());
};

// AUTO LOGIN
auth.onAuthStateChanged(user => {
  if (user) showDashboard();
  else showLogin();
});
