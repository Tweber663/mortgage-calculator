import Setup from "./Setup.js";

interface CalcuInterface {
    repayment: number;
    monthly: number;
    totalAmount: string
    intrestOnly: string; 
    totalMonthlyAmount: string
}

class Calculator extends Setup implements CalcuInterface  {
    repayment: number;
    monthly: number; 
    totalAmount: string = '';
    intrestOnly: string = '';
    totalMonthlyAmount: string = '';
    
    constructor(container: HTMLDivElement) {
        super(container)
        if (!container.dataset.listenerAttached) {
            this.start();
            container.dataset.listenerAttached = 'true';  // Mark the listener as attached
        }
        this.repayment = 0;
        this.monthly = 0;
        this.reset(container);
    }

    start(): void {
       this.dom.form.addEventListener('submit', (e) => {
        this.submit(e);
        setTimeout(() => {
            this.calculate();
        }, 1)
       })
    }

    calculate(): void {
        const amount = this.amount as number
        this.intrestRate = ((amount / 10) * (this.intrestRate / 10));
        this.repayment = amount +  this.intrestRate;
        this.monthly = this.repayment / (this.term * 12); 
        this.totalMonthlyAmount = this.formating(this.monthly * (this.term * 12) / (this.term * 12)); 
        this.totalAmount = this.formating(this.monthly * (this.term * 12)); 
        this.intrestOnly = this.formating(this.intrestRate / (this.term * 12)); 
        this.rendering(); 
    }

    formating(amount: number): string {
    let formattedAmount = amount.toFixed(2);
    return '£' + parseFloat(formattedAmount).toLocaleString('en-GB', { minimumFractionDigits: 2 });
    }

    testing(a: number, b: number) {
        return a + b
    }
    

    rendering() {
        if (this.verified) {
             this.dom.noResulstWrapper.style.display = "none";
             this.dom.resultsWrapper.style.display = "block"
        }

        if (this.type === 'repayment') {
            this.dom.monthlyAmountwrapper.innerHTML = this.totalMonthlyAmount;
            this.dom.totalAmountwrapper.innerHTML = this.totalAmount

        } else {
            this.dom.monthlyAmountwrapper.innerHTML = this.intrestOnly; 
            this.dom.totalAmountwrapper.innerHTML = this.totalAmount
        }
    }


    reset(container: HTMLDivElement) {
        this.dom.btnReset.addEventListener('click', () => {
            this.getElements(container)
            this.dom.resultsWrapper.style.display = "none";
            this.dom.noResulstWrapper.style.display = "block";
            if (this.dom.activeLayers[0]) this.dom.activeLayers[0].classList.remove('active');
            this.amount = 0;
            this.term = 0; 
            this.intrestRate = 0;
            this.type = '';
        })
    }

}

export default Calculator