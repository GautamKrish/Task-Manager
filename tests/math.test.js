const { TokenExpiredError } = require("jsonwebtoken");
const { calculateTip, celsiusToFahrenheit, fahrenheitToCelsius, add } = require("../src/math");

test("should calculate tip", () => {
    const total = calculateTip(10, .3);
    expect(total).toBe(13);
});

test("should calculate tip on default percentage", () => {
    const total = calculateTip(10);
    expect(total).toBe(12.5);
});

test('convert 0 C to  32 F', () => {
    const fahrenheit = celsiusToFahrenheit(0);
    expect(fahrenheit).toBe(32);
});

test('convert 32 F to 0 C', () => {
    const celsius = fahrenheitToCelsius(32);
    expect(celsius).toBe(0);
})
// test("Hello World", () => {});

// test("This test should fail", () => {
//   throw new Error("Failure");
// });

test('testing asynchronous add code', (done) => {
    add(4, 5).then((sum) => {
        expect(sum).toBe(9);
        done();
    })
})

test('testing asynchronous add code async/await', async () => {
    const sum = await add(4, 5);
    expect(sum).toBe(9);
})
