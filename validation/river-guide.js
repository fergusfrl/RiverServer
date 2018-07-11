const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validatePostInput(data) {
    let errors = {};

    data.description = !isEmpty(data.description) ? data.description : "";

    if (Validator.isEmpty(data.description)) {
        errors.description = "Description is required";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};
