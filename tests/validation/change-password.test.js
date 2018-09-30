const validateChangePasswordInput = require("../../src/validation/change-password");

// email validation
test("Invalid email error is thrown", () => {
    const output = validateChangePasswordInput({ email: "invalid" });
    expect(output.errors.email).toBe("Email is invalid");
    expect(output.isValid).toBe(false);
});

test("Required email error is thrown", () => {
    const output = validateChangePasswordInput({});
    expect(output.errors.email).toBe("Email field is required");
    expect(output.isValid).toBe(false);
});

// old password validation
test("Required password error is thrown", () => {
    const output = validateChangePasswordInput({});
    expect(output.errors.password).toBe("Password field is required");
    expect(output.isValid).toBe(false);
});

// new password validation
test("Required update password error is thrown", () => {
    const output = validateChangePasswordInput({});
    expect(output.errors.newPassword).toBe(
        "Updated password field is required"
    );
    expect(output.isValid).toBe(false);
});

test("Update password error is thrown if too short", () => {
    const output = validateChangePasswordInput({ newPassword: "12345" });
    expect(output.errors.newPassword).toBe(
        "Password must be at least 6 characters"
    );
    expect(output.isValid).toBe(false);
});

test("Update password error is thrown if too long", () => {
    const output = validateChangePasswordInput({
        newPassword: "01234567890123456789012345678901"
    }); // 31 characters long
    expect(output.errors.newPassword).toBe(
        "Password must be at least 6 characters" // misleading error message
    );
    expect(output.isValid).toBe(false);
});

// confirm new password validation
test("Required confirm update password error is thrown", () => {
    const output = validateChangePasswordInput({});
    expect(output.errors.newPassword2).toBe(
        "Confirm updated password field is required"
    );
    expect(output.isValid).toBe(false);
});

test("Non matching update passwords error is thrown", () => {
    const output = validateChangePasswordInput({
        newPassword: "123456",
        newPassword2: "654321"
    });
    expect(output.errors.newPassword2).toBe("Passwords must match");
    expect(output.isValid).toBe(false);
});

// successful form
test("does not have any validation errors", () => {
    const output = validateChangePasswordInput({
        email: "test@test.test",
        password: "old-password",
        newPassword: "new-password",
        newPassword2: "new-password"
    });
    expect(output.isValid).toBe(true);
});
