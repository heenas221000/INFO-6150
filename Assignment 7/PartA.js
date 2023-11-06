const emailRegex = /^[\w-]+(\.[\w-]+)*@northeastern\.edu$/;
const specialCharRegex = /[!@#\$%\^&\*\(\)_\+\-=\[\]\{\};:'",<>\./?\\|`~]/;
const digitRegex = /\d/;
    
$(document).ready(function () {
    // Validation function for all fields
    const validate = () => {
    let valid = true;
    
    // Email validation
    const email = $('#email').val();
    if (!email.match(emailRegex)) {
        $('#email-error').text("Invalid email format");
        valid = false;
    } else {
        $('#email-error').text("");
    }

    const username = $('#username').val();
    if (!username) {
        $('#username-error').text("Username is required");
        valid = false;
    } else if (username.length < 3 || username.length > 20) {
         $('#username-error').text("Username must be between 3 and 20 characters");
        valid = false;
    } else if (!/^[a-zA-Z0-9]+$/.test(username)) {
        $('#username-error').text("Username can only contain letters and numbers");
         valid = false;
    } else {
        $('#username-error').text("");
    }

    // Password validation
    const password = $('#password').val();
    if (!password) {
        $('#password-error').text("Password is required");
        valid = false;
    } else if (password.length < 6 || password.length > 20) {
        $('#password-error').text("Password must be between 6 and 20 characters");
        valid = false;
    } else if (!specialCharRegex.test(password)) {
        $('#password-error').text("Password must contain at least one special character");
        valid = false;
    } else if (/\s/.test(password)) {
        $('#password-error').text("Password must not contain whitespace");
        valid = false;
    } else if (!digitRegex.test(password)) {
        $('#password-error').text("Password must contain at least one digit");
        valid = false;
    } else {
        $('#password-error').text("");
    }

    // Confirm Password validation
    const confirmPassword = $('#confirm-password').val();
    if (!confirmPassword) {
        $('#confirm-password-error').text("Confirm Password is required");
        valid = false;
    } else if (confirmPassword !== password) {
        $('#confirm-password-error').text("Passwords do not match");
        valid = false;
    } else {
        $('#confirm-password-error').text("");
    }

    // Enable login button if all fields are valid
    if (valid) {
        $('#login-button').prop('disabled', false);
    } else {
        $('#login-button').prop('disabled', true);
    }
    };

    $('#email').on('input', validate);
    $('#username').on('input', validate);
    $('#password').on('input', validate);
    $('#confirm-password').on('input', validate);

    $('#login-button').on('click', function () {
        const username = $('#username').val();
        // Store the username in sessionStorage
        sessionStorage.setItem('username', username);
        window.location.href = "PartAcal.html";
    });
});         
