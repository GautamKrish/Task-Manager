const { TokenExpiredError } = require("jsonwebtoken");
const { calculateTip } = require("../src/math");

test("should calculate tip", () => {
    const total = calculateTip(10, .3);
    expect(total).toBe(13);
});

test("should calculate tip on default percentage", () => {
    const total = calculateTip(10);
    expect(total).toBe(12.5);
});

// test("Hello World", () => {});

// test("This test should fail", () => {
//   throw new Error("Failure");
// });
