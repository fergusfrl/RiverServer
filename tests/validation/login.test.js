const validateLoginInput = require("../../src/validation/login");

// email validation
test("Invalid email error is thrown", () => {
    const output = validateLoginInput({ email: "invalid" });
    expect(output.errors.email).toBe("Email is invalid");
    expect(output.isValid).toBe(false);
});

test("Required email error is thrown", () => {
    const output = validateLoginInput({});
    expect(output.errors.email).toBe("Email field is required");
    expect(output.isValid).toBe(false);
});

// password validation
test("Required password error is thrown", () => {
    const output = validateLoginInput({});
    expect(output.errors.password).toBe("Password field is required");
    expect(output.isValid).toBe(false);
});

// successful form
test("does not have any validation errors", () => {
    expect(
        validateLoginInput({
            email: "test@test.test",
            password: "123456"
        }).isValid
    ).toBe(true);
});
