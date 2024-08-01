// Calculator.test.ts
import '@testing-library/jest-dom/extend-expect';
import { render, screen, fireEvent } from '@testing-library/react';
import Setup from './src/Setup'; // Adjust the import path
import Calculator from './src/Calculator'; // Adjust the import path

// Helper function to set up the DOM environment
function setupDOM() {
  document.body.innerHTML = `
    <div class="container">
      <form class="form">
        <input class="text-input-1" name="mortgageInput" value="100000" />
        <input class="text-input-2" name="termInput" value="20" />
        <input class="text-input-3" name="interestInput" value="5" />
        <input type="radio" name="type" value="repayment" checked />
        <input type="radio" name="type" value="interest" />
        <button class="sub" type="submit">Submit</button>
        <button type="reset">Reset</button>
      </form>
      <div class="results-wrapper" style="display: none;">
        <h1 id="amount"></h1>
        <h1 id="totalAmount"></h1>
      </div>
      <div class="no-results-wrapper" style="display: block;"></div>
    </div>
  `;
}

test('should fill the form and submit, then validate the calculated values', async () => {
  setupDOM();

  // Create an instance of Setup
  const container = document.querySelector('.container') as HTMLDivElement;
  new Setup(container);

  // Create an instance of Calculator
  new Calculator(container);

  // Trigger form submission
  const submitButton = screen.getByText('Submit');
  fireEvent.click(submitButton);

  // Wait for the results to be displayed
  await screen.findByText(/£/);

  // Validate the results
  const totalAmountElement = screen.getByTestId('totalAmount');
  const monthlyAmountElement = screen.getByTestId('amount');

  expect(totalAmountElement).toBe('£275,000.00') // Adjust this based on expected value
  expect(monthlyAmountElement).toBe('£654.76') // Adjust this based on expected value
});