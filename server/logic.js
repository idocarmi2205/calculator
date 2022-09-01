
export const math = (a, b, sign) => {
    return sign === '+'
        ? a + b
        : sign === '-'
        ? a - b
        : sign === 'X'
            ? a * b
            : a / b;
}