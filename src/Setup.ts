import Calculator from "./Calculator.js"

interface domInterface {
    container: HTMLDivElement,
    form: HTMLFormElement,
    button: HTMLButtonElement,
    errMsgInput1: HTMLDivElement,
    errMsgInput2: HTMLDivElement,
    errMsgInput3: HTMLDivElement,
    errMsgRadio: HTMLDivElement,
    resultsWrapper: HTMLDivElement, 
    noResulstWrapper: HTMLDivElement, 
    totalAmountwrapper: HTMLDivElement, 
    monthlyAmountwrapper: HTMLDivElement,
    activeLayers:  NodeListOf<HTMLDivElement>, 
    btnReset: HTMLButtonElement, 
    [x: string] : HTMLElement |  NodeListOf<HTMLDivElement>,
}

class Setup {
    protected dom = {} as domInterface; 
    protected amount: null | number = 0;
    protected term: number = 0;
    protected intrestRate: number = 0;
    protected type: string = '';
    protected verified: boolean = false;

    constructor(container: HTMLDivElement) {
        this.getElements(container); 
        this.radioSetup();
    }

    public getElements(container: HTMLDivElement): void {
        this.dom = {
            container,
            form: container.querySelector('.form') as HTMLFormElement,
            button: container.querySelector('.sub') as HTMLButtonElement,
            mortgageAmountWrap: container.querySelector('.text-input-1') as HTMLInputElement,
            mortgageTermWrap: container.querySelector('.text-input-2') as HTMLDivElement, 
            interestRateWrap: container.querySelector('.text-input-3') as HTMLDivElement, 
            mortgageTypeWrap: container.querySelector('.container-radio') as HTMLDivElement, 
            radiosLayers: container.querySelectorAll('.layer') as NodeListOf<HTMLDivElement>, 
            activeLayers: container.querySelectorAll('.active') as NodeListOf<HTMLDivElement>, 
            errMsgInput1: container.querySelector('.errMsg1') as HTMLDivElement,
            errMsgInput2: container.querySelector('.errMsg2') as HTMLDivElement,
            errMsgInput3: container.querySelector('.errMsg3') as HTMLDivElement, 
            errMsgRadio: container.querySelector('.errMsg4') as HTMLDivElement, 
            errMsgInputAll: container.querySelectorAll('.errMsg1, .errMsg2, .errMsg3') as NodeListOf<HTMLDivElement>,
            errMsgAll: container.querySelectorAll('.errMsg1, .errMsg2, .errMsg3, .errMsg4') as NodeListOf<HTMLDivElement>,
            monthlyAmountwrapper: container.querySelector('#amount') as HTMLHeadingElement, 
            totalAmountwrapper: container.querySelector('#totalAmount') as HTMLHeadingElement,
            resultsWrapper: container.querySelector('.results-wrapper') as HTMLDivElement, 
            noResulstWrapper: container.querySelector('.no-results-wrapper') as HTMLDivElement, 
            btnReset: container.querySelector('[type="reset"]') as HTMLButtonElement
        }
    }
    radioSetup(): void{
        Array.from(this.dom.radiosLayers as NodeListOf<HTMLDivElement>).forEach((layer) => {
            layer.addEventListener('click', (e) => {
                Array.from(this.dom.radiosLayers as NodeListOf<HTMLDivElement>).forEach((b) => {
                    const parent = b.parentElement as HTMLDivElement;
                    parent.classList.remove('active')
                })
                const target = e.target as HTMLDivElement; 
                const parent = target.parentElement as HTMLDivElement
                parent.classList.add('active');
        });
      }
    )
 }

   submit(e: Event): void {
        e.preventDefault();
    
        this.clearErrors(); 
        const target = e.target as HTMLFormElement;
    
        console.log(target)
        const inputElement_1 = target.mortgageInput.value as HTMLInputElement;
        this.amount = Number(inputElement_1);
        console.log(target.mortgageInput.value);
        
        const inputElement_2 = target.termInput.value as HTMLInputElement;
        this.term = Number(inputElement_2);

        const inputElement_3 = target.interestInput.value as HTMLInputElement;
        this.intrestRate = Number(inputElement_3); 

        const inputElement_4 = target[4] as HTMLInputElement; 
        const inputElement_5 = target[5] as HTMLInputElement; 

        if (inputElement_4.checked === true) this.type = "repayment"
        if (inputElement_5.checked === true) this.type = "intrest";
        this.verified = this.verify()

        if (this.verified) {
            console.log('submited:)');
            new Calculator(this.dom.container)
        } else {
            console.log('Not submitted:(')
        }
    }

    clearErrors(): void {
        Array.from(this.dom.errMsgAll as NodeListOf<HTMLDivElement>).forEach((errMsgInput) => {
            errMsgInput.innerHTML = '' ;
        }) 
    }

    verify(): boolean {
       let noErrors = true; 
        //Error msg to 'all' inputs if all inputs are empty
        if (this.amount as number <= 0 && this.term <= 0 && this.intrestRate <= 0 && this.type === '') {
            Array.from(this.dom.errMsgAll as NodeListOf<HTMLDivElement>).forEach((errMsgInput) => {
                errMsgInput.innerHTML = '<p> This field is required </p>' 
            })
            noErrors = false; 
        }
        //Error msg to all text inputs if all detect a 'string'
        if (isNaN(this.amount as number) && isNaN(this.term) && isNaN(this.intrestRate)) {
            Array.from(this.dom.errMsgInputAll as NodeListOf<HTMLDivElement>).forEach((errMsgInput) => {
                errMsgInput.innerHTML = '<p> Only numbers are allowed </p>' 
            })
            noErrors = false; 
        }

        //Err msg to individual inputs if no value is detected
        if (this.amount as number <= 0) {
            this.dom.errMsgInput1.innerHTML = '<p> This field is required </p>';
            noErrors = false; 
         } 
         if (this.term <= 0) {
            this.dom.errMsgInput2.innerHTML = '<p> This field is required </p>';
            noErrors = false; 
         } 
         if (this.intrestRate <= 0) {
            this.dom.errMsgInput3.innerHTML = '<p> This field is required </p>';
            noErrors = false; 
         } 
         if (this.type === '') {
            this.dom.errMsgRadio.innerHTML = '<p> This field is required </p>';
            noErrors = false; 
         } 

         //Err msg if any individual inputs detects a string
         if(isNaN(this.amount as number)){
            this.dom.errMsgInput1.innerHTML = '<p> Only numbers are allowed </p>'
            noErrors = false;
         }
         if(isNaN(this.term as number)){
            this.dom.errMsgInput2.innerHTML = '<p> Only numbers are allowed </p>'
            noErrors = false;
         }
         if(isNaN(this.intrestRate as number)){
            this.dom.errMsgInput3.innerHTML = '<p> Only numbers are allowed </p>'
            noErrors = false;
         }

        return noErrors;
    }
}

export default Setup