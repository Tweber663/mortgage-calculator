import Calculator from "./Calculator.js";
class Setup {
    dom = {};
    amount = 0;
    term = 0;
    intrestRate = 0;
    type = '';
    verified = false;
    constructor(container) {
        this.getElements(container);
        this.radioSetup();
    }
    getElements(container) {
        this.dom = {
            container,
            form: container.querySelector('.form'),
            button: container.querySelector('.sub'),
            mortgageAmountWrap: container.querySelector('.text-input-1'),
            mortgageTermWrap: container.querySelector('.text-input-2'),
            interestRateWrap: container.querySelector('.text-input-3'),
            mortgageTypeWrap: container.querySelector('.container-radio'),
            radiosLayers: container.querySelectorAll('.layer'),
            activeLayers: container.querySelectorAll('.active'),
            errMsgInput1: container.querySelector('.errMsg1'),
            errMsgInput2: container.querySelector('.errMsg2'),
            errMsgInput3: container.querySelector('.errMsg3'),
            errMsgRadio: container.querySelector('.errMsg4'),
            errMsgInputAll: container.querySelectorAll('.errMsg1, .errMsg2, .errMsg3'),
            errMsgAll: container.querySelectorAll('.errMsg1, .errMsg2, .errMsg3, .errMsg4'),
            monthlyAmountwrapper: container.querySelector('#amount'),
            totalAmountwrapper: container.querySelector('#totalAmount'),
            resultsWrapper: container.querySelector('.results-wrapper'),
            noResulstWrapper: container.querySelector('.no-results-wrapper'),
            btnReset: container.querySelector('[type="reset"]')
        };
    }
    radioSetup() {
        Array.from(this.dom.radiosLayers).forEach((layer) => {
            layer.addEventListener('click', (e) => {
                Array.from(this.dom.radiosLayers).forEach((b) => {
                    const parent = b.parentElement;
                    parent.classList.remove('active');
                });
                const target = e.target;
                const parent = target.parentElement;
                parent.classList.add('active');
            });
        });
    }
    submit(e) {
        e.preventDefault();
        this.clearErrors();
        const target = e.target;
        const inputElement_1 = target.mortgageInput.value;
        this.amount = Number(inputElement_1);
        const inputElement_2 = target.termInput.value;
        this.term = Number(inputElement_2);
        const inputElement_3 = target.interestInput.value;
        this.intrestRate = Number(inputElement_3);
        const inputElement_4 = target[4];
        const inputElement_5 = target[5];
        if (inputElement_4.checked === true)
            this.type = "repayment";
        if (inputElement_5.checked === true)
            this.type = "intrest";
        this.verified = this.verify();
        if (this.verified) {
            console.log('submitted:)');
            new Calculator(this.dom.container);
        }
        else {
            console.log('Not submitted:(');
        }
    }
    clearErrors() {
        Array.from(this.dom.errMsgAll).forEach((errMsgInput) => {
            errMsgInput.innerHTML = '';
        });
    }
    verify() {
        let noErrors = true;
        //Error msg to 'all' inputs if all inputs are empty
        if (this.amount <= 0 && this.term <= 0 && this.intrestRate <= 0 && this.type === '') {
            Array.from(this.dom.errMsgAll).forEach((errMsgInput) => {
                errMsgInput.innerHTML = '<p> This field is required </p>';
            });
            noErrors = false;
        }
        //Error msg to all text inputs if all detect a 'string'
        if (isNaN(this.amount) && isNaN(this.term) && isNaN(this.intrestRate)) {
            Array.from(this.dom.errMsgInputAll).forEach((errMsgInput) => {
                errMsgInput.innerHTML = '<p> Only numbers are allowed </p>';
            });
            noErrors = false;
        }
        //Err msg to individual inputs if no value is detected
        if (this.amount <= 0) {
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
        if (isNaN(this.amount)) {
            this.dom.errMsgInput1.innerHTML = '<p> Only numbers are allowed </p>';
            noErrors = false;
        }
        if (isNaN(this.term)) {
            this.dom.errMsgInput2.innerHTML = '<p> Only numbers are allowed </p>';
            noErrors = false;
        }
        if (isNaN(this.intrestRate)) {
            this.dom.errMsgInput3.innerHTML = '<p> Only numbers are allowed </p>';
            noErrors = false;
        }
        return noErrors;
    }
}
export default Setup;
//# sourceMappingURL=Setup.js.map