const validateRegisterInput = require("../../src/validation/register");

// name validation
test("Name length error is thrown when name is too short", () => {
    const output = validateRegisterInput({ name: "1" });
    expect(output.errors.name).toBe("Name must be between 2 and 30 characters");
    expect(output.isValid).toBe(false);
});

test("Name length error is thrown when name is too long", () => {
    const output = validateRegisterInput({
        name: "1234567890123456789012345678901"
    }); // name is 31 characters
    expect(output.errors.name).toBe("Name must be between 2 and 30 characters");
    expect(output.isValid).toBe(false);
});

// email validation
test("Invalid email error is thrown", () => {
    const output = validateRegisterInput({ email: "invalid" });
    expect(output.errors.email).toBe("Email is invalid");
    expect(output.isValid).toBe(false);
});

test("Required email error is thrown", () => {
    const output = validateRegisterInput({});
    expect(output.errors.email).toBe("Email field is required");
    expect(output.isValid).toBe(false);
});

// password validation
test("Required password error is thrown", () => {
    const output = validateRegisterInput({});
    expect(output.errors.password).toBe("Password field is required");
    expect(output.isValid).toBe(false);
});

test("Invalid password error is thrown when password is too short", () => {
    const output = validateRegisterInput({ password: "12345" });
    expect(output.errors.password).toBe(
        "Password must be at least 6 characters"
    );
    expect(output.isValid).toBe(false);
});

test("Invalid password error is thrown when password is too long", () => {
    const output = validateRegisterInput({
        password: "1234567890123456789012345678901"
    }); // password is 31 characters long
    expect(output.errors.password).toBe(
        "Password must be at least 6 characters"
    );
    expect(output.isValid).toBe(false); // misleading error message
});

// confirm password validation
test("Required confirm password error is thrown", () => {
    const output = validateRegisterInput({});
    expect(output.errors.password2).toBe("Confirm password field is required");
    expect(output.isValid).toBe(false);
});

test("Password does not match error is thrown", () => {
    const output = validateRegisterInput({
        password: "123456",
        password2: "654321"
    });
    expect(output.errors.password2).toBe("Passwords must match");
    expect(output.isValid).toBe(false);
});

// successful form
test("does not have any validation errors", () => {
    expect(
        validateRegisterInput({
            name: "test",
            email: "test@test.test",
            password: "123456",
            password2: "123456"
        }).isValid
    ).toBe(true);
});
