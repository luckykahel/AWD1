const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");
const passwordInput = document.querySelector(".sign-up-form input[type='password']");
const passwordRequirements = document.querySelector(".password-requirements");

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function passwordsMatch(password, confirmPassword) {
    return password === confirmPassword;
}

function isValidPassword(password) {
    const lengthRegex = /.{8,}/;
    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;
    const specialCharRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
    const numberRegex = /[0-9]/;
    const repeatingCharsRegex = /(.)\1\1/;

    return (
        lengthRegex.test(password) &&
        uppercaseRegex.test(password) &&
        lowercaseRegex.test(password) &&
        specialCharRegex.test(password) &&
        numberRegex.test(password) &&
        !repeatingCharsRegex.test(password)
    );
}

function generatePlayerID() {
    let playerID = '';
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            playerID += Math.floor(Math.random() * 10);
        }
        if (i < 3) {
            playerID += ' ';
        }
    }
    return playerID;
}

function setGeneratedPlayerID() {
    const playerIDInput = document.querySelector(".sign-up-form input[type='text']");
    const generatedPlayerID = generatePlayerID();
    playerIDInput.value = generatedPlayerID;
}

passwordInput.addEventListener("focus", () => {
    passwordRequirements.style.display = "block";
});

passwordInput.addEventListener("blur", () => {
    passwordRequirements.style.display = "none";
});

sign_up_btn.addEventListener("click", () => {
    container.classList.add("sign-up-mode");
    setGeneratedPlayerID();
});

sign_in_btn.addEventListener("click", () => {
    container.classList.remove("sign-up-mode");
});

function isValidUsername(username) {
  return username.trim().length > 0;
}

// Event listener for sign-up form submission
document.querySelector(".sign-up-form").addEventListener("submit", function(event) {
    const usernameInput = document.querySelector(".sign-up-form input[type='text']");
    const emailInput = document.querySelector(".sign-up-form input[type='email']");
    const passwordInput = document.querySelector(".sign-up-form input[type='password']");
    const confirmPasswordInput = document.querySelector(".sign-up-form input[type='password']");
    const playerIDInput = document.querySelector(".sign-up-form input[type='text']");

    event.preventDefault();

    if (!isValidUsername(usernameInput.value)) {
      alert("Please enter a valid username.");
      return;
    }

    if (!isValidEmail(emailInput.value)) {
        alert("Please enter a valid email address.");
        return;
    }

    if (!passwordsMatch(passwordInput.value, confirmPasswordInput.value)) {
        alert("Password and Confirm Password must match.");
        return;
    }

    if (!isValidPassword(passwordInput.value)) {
        let message = "Password must meet the following requirements:\n";
        if (passwordInput.value.length < 8) {
            message += "- Be at least 8 characters long\n";
        }
        if (!/[A-Z]/.test(passwordInput.value)) {
            message += "- Contain at least one uppercase letter\n";
        }
        if (!/[a-z]/.test(passwordInput.value)) {
            message += "- Contain at least one lowercase letter\n";
        }
        if (!/[0-9]/.test(passwordInput.value)) {
            message += "- Contain at least one number\n";
        }
        if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(passwordInput.value)) {
            message += "- Contain at least one special character\n";
        }
        if (/(.)\1\1/.test(passwordInput.value)) {
            message += "- No repeating letters next to each other\n";
        }
        alert(message);
        return;
    }

    sessionStorage.setItem("username", usernameInput.value);
    sessionStorage.setItem("password", passwordInput.value);
    sessionStorage.setItem("playerID", playerIDInput.value);

    alert("Account Creation Successful. Kindly check your email to verify your account.");

    usernameInput.value = "";
    passwordInput.value = "";
    confirmPasswordInput.value = "";
    playerIDInput.value = "";
});

document.querySelector(".sign-in-form").addEventListener("submit", function(event) {
    const usernameInput = document.querySelector(".sign-in-form input[type='text']");
    const playerIDInput = document.querySelector("sign-in-form input[type='text]");
    const passwordInput = document.querySelector(".sign-in-form input[type='password']");

    event.preventDefault();

    const storedUsername = sessionStorage.getItem("username");
    const storedPlayerID = sessionStorage.getItem("playerID");
    const storedPassword = sessionStorage.getItem("password");

    if (usernameInput.value === storedUsername || playerIDInput.value == storedPlayerID.value && passwordInput.value === storedPassword) {
        alert("Login Successful!");
    } else {
        alert("Invalid email or password. Please try again.");
    }

    emailInput.value = "";
    playerIDInput.value = ""
    passwordInput.value = "";
});
