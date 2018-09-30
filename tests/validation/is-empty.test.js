const isEmpty = require("../../validation/is-empty");

// resolves to true
test("empty string resolves to true", () => {
    expect(isEmpty("")).toBe(true);
});

test("string with only whitespace resolves to true", () => {
    expect(isEmpty("         ")).toBe(true);
});

test("undefined resolves to true", () => {
    expect(isEmpty(undefined)).toBe(true);
});

test("null resolves to true", () => {
    expect(isEmpty(null)).toBe(true);
});

test("empty array resolves to true", () => {
    expect(isEmpty([])).toBe(true);
});

test("empty object resolves to true", () => {
    expect(isEmpty({})).toBe(true);
});

// resolves to false
test("populated string resolves to false", () => {
    expect(isEmpty("test")).toBe(false);
});

test("integers resolves to false", () => {
    expect(isEmpty(123)).toBe(false);
});

test("floats resolves to false", () => {
    expect(isEmpty(1.23)).toBe(false);
});
