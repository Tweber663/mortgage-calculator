import Setup from "./Setup.js";
class Calculator extends Setup {
    repayment;
    monthly;
    totalAmount = '';
    intrestOnly = '';
    totalMonthlyAmount = '';
    constructor(container) {
        super(container);
        if (!container.dataset.listenerAttached) {
            this.start();
            container.dataset.listenerAttached = 'true'; // Mark the listener as attached
        }
        this.repayment = 0;
        this.monthly = 0;
        this.reset(container);
    }
    start() {
        this.dom.form.addEventListener('submit', (e) => {
            this.submit(e);
            setTimeout(() => {
                this.calculate();
            }, 1);
        });
    }
    calculate() {
        const amount = this.amount;
        this.intrestRate = ((amount / 10) * (this.intrestRate / 10));
        this.repayment = amount + this.intrestRate;
        this.monthly = this.repayment / (this.term * 12);
        this.totalMonthlyAmount = this.formating(this.monthly * (this.term * 12) / (this.term * 12));
        this.totalAmount = this.formating(this.monthly * (this.term * 12));
        this.intrestOnly = this.formating(this.intrestRate / (this.term * 12));
        this.rendering();
    }
    formating(amount) {
        let formattedAmount = amount.toFixed(2);
        return '£' + parseFloat(formattedAmount).toLocaleString('en-GB', { minimumFractionDigits: 2 });
    }
    testing(a, b) {
        return a + b;
    }
    rendering() {
        if (this.verified) {
            this.dom.noResulstWrapper.style.display = "none";
            this.dom.resultsWrapper.style.display = "block";
        }
        if (this.type === 'repayment') {
            this.dom.monthlyAmountwrapper.innerHTML = this.totalMonthlyAmount;
            this.dom.totalAmountwrapper.innerHTML = this.totalAmount;
        }
        else {
            this.dom.monthlyAmountwrapper.innerHTML = this.intrestOnly;
            this.dom.totalAmountwrapper.innerHTML = this.totalAmount;
        }
    }
    reset(container) {
        this.dom.btnReset.addEventListener('click', () => {
            this.getElements(container);
            this.dom.resultsWrapper.style.display = "none";
            this.dom.noResulstWrapper.style.display = "block";
            this.dom.activeLayers[0].classList.remove('active');
            this.amount = 0;
            this.term = 0;
            this.intrestRate = 0;
            this.type = '';
        });
    }
}
export default Calculator;
//# sourceMappingURL=Calculator.js.map