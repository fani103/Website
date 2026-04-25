// Flip form toggle
const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
    container.classList.add("right-panel-active");
});
signInButton.addEventListener('click', () => {
    container.classList.remove("right-panel-active");
});

// Password toggle functionality
const toggleSignUp = document.getElementById('toggleSignUp');
const signupPassword = document.getElementById('signupPassword');
toggleSignUp.addEventListener('click', () => {
    signupPassword.type = signupPassword.type === 'password' ? 'text' : 'password';
});

const toggleSignIn = document.getElementById('toggleSignIn');
const signinPassword = document.getElementById('signinPassword');
toggleSignIn.addEventListener('click', () => {
    signinPassword.type = signinPassword.type === 'password' ? 'text' : 'password';
});