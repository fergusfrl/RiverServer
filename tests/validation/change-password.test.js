const validateChangePasswordInput = require("../../validation/change-password");

// email validation
test("Invalid email error is thrown", () => {
    expect(
        validateChangePasswordInput({
            email: "invalid"
        }).errors.email
    ).toBe("Email is invalid");
});

test("Required email error is thrown", () => {
    expect(validateChangePasswordInput({}).errors.email).toBe(
        "Email field is required"
    );
});

// old password validation
test("Required password error is thrown", () => {
    expect(validateChangePasswordInput({}).errors.password).toBe(
        "Password field is required"
    );
});

// new password validation
test("Required update password error is thrown", () => {
    expect(validateChangePasswordInput({}).errors.newPassword).toBe(
        "Updated password field is required"
    );
});

test("Update password error is thrown if too short", () => {
    expect(
        validateChangePasswordInput({
            newPassword: "12345"
        }).errors.newPassword
    ).toBe("Password must be at least 3 characters");
});

test("Update password error is thrown if too long", () => {
    expect(
        validateChangePasswordInput({
            newPassword: "01234567890123456789012345678901" // 31 characters long
        }).errors.newPassword
    ).toBe(
        "Password must be at least 6 characters" // misleading error message
    );
});

// confirm new password validation
test("Required confirm update password error is thrown", () => {
    expect(validateChangePasswordInput({}).errors.newPassword2).toBe(
        "Confirm updated password field is required"
    );
});

test("Non matching update passwords error is thrown", () => {
    expect(
        validateChangePasswordInput({
            newPassword: "123456",
            newPassword2: "654321"
        }).errors.newPassword2
    ).toBe("Passwords must match");
});
