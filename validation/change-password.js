const Validator = require("validator"),
    isEmpty = require("./is-empty");

module.exports = function validateChangePasswordInput(data) {
    let errors = {};

    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.newPassword = !isEmpty(data.newPassword) ? data.newPassword : "";
    data.newPassword2 = !isEmpty(data.newPassword2) ? data.newPassword2 : "";

    if (!Validator.isEmail(data.email)) {
        errors.email = "Email is invalid";
    }

    if (Validator.isEmpty(data.email)) {
        errors.email = "Email field is required";
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = "Password field is required";
    }

    if (!Validator.isLength(data.newPassword, { min: 6, max: 30 })) {
        errors.newPassword = "Password must be at least 6 characters";
    }

    if (Validator.isEmpty(data.newPassword)) {
        errors.newPassword = "Updated password field is required";
    }

    if (Validator.isEmpty(data.newPassword2)) {
        errors.newPassword2 = "Confirm updated password field is required";
    }

    if (!Validator.equals(data.newPassword, data.newPassword2)) {
        errors.newPassword2 = "Passwords must match";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};
