import Calculator from "./Calculator.js";

// Initialize Setup first
export const container = document.querySelector('.container') as HTMLDivElement;
// const setupInstance = new Setup(container);

// Use the instance to create a Calculator only if needed
new Calculator(container) ;

