const validatePostInput = require("../../validation/river-guide");

// description validation
test("Required description error is thrown", () => {
    const output = validatePostInput({});
    expect(output.errors.description).toBe("Description is required");
    expect(output.isValid).toBe(false);
});

// successful form
test("does not have any validation errors", () => {
    expect(
        validatePostInput({
            description: "not empty"
        }).isValid
    ).toBe(true);
});
