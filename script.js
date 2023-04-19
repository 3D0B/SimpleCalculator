const DISPLAY_SMAL = '.calculator__display--small';
const DISPLAY_BIG = '.calculator__display--big';

const NUMBER_CLASS_SELECTOR = '.calculator__button--is-number';
const CLEAR_CLASS_SELECTOR = '.calculator__button--is-clear';
const BACKSPACE_CLASS_SELECTOR = '.calculator__button--is-backspace';
const ADD_CLASS_SELECTOR = '.calculator__button--is-add';
const MINUS_CLASS_SELECTOR = '.calculator__button--is-minus';
const MULTIPLY_CLASS_SELECTOR = '.calculator__button--is-multiply';
const DIVIDE_CLASS_SELECTOR = '.calculator__button--is-divide';
const DOT_CLASS_SELECTOR = '.calculator__button--is-dot';
const SIGN_CHANGE_CLASS_SELECTOR = '.calculator__button--is-sign-change';
const EQUAL_CLASS_SELECTOR = '.calculator__button--is-equal';





class Calculator {

  constructor() {
    console.log('kalkulator działa');
    
    let displayValue = 0;
    let previousDisplayValue = null;
    let newValue = 0;
    this.displayValue = displayValue;
    this.previousDisplayValue = previousDisplayValue;
    this.newValue = newValue

    this.bindOfDisplay();
    this.bindOfNumbers();
    this.bindToButton();



    const calculatorOb = document.querySelector('.calculator');

    calculatorOb.addEventListener('contextmenu', function (event) {
      event.preventDefault();
    });
  }

  bindOfDisplay() {
    const displaySmall = document.querySelector(DISPLAY_SMAL);
    const displayBig = document.querySelector(DISPLAY_BIG);

    if (!displayBig || !displaySmall) {
      throw ('nie znaleziono wyswietlacza');
    }
    displayBig.textContent = this.displayValue;
    this.displayBig = displayBig;
    this.displaySmall = displaySmall;

  }
  bindOfNumbers() {
    const numbers = document.querySelectorAll(NUMBER_CLASS_SELECTOR);

    numbers.forEach(number => number.addEventListener('click', event => this.concatenateNumber(event)))
  }
  concatenateNumber(event) {
    if (this.displayBig.innerHTML.length < 16) {
      this.displayBig.innerHTML = this.displayBig.innerHTML === null || this.displayBig.innerHTML == '0' || this.wasFunctionClicked == true
        ? event.target.textContent
        : this.displayBig.innerHTML + event.target.textContent;




      this.wasFunctionClicked = false;
      this.wasClickNumber = true;
      this.displayValue = this.displayBig.innerHTML;
    }
  }
  bindToButtons(selector, callback, longPressCallback) {
    const element = document.querySelector(selector);


    if (!element) {
      // throw('nie znaleziono elementu');
      console.warn('nie znaleziono elementu: ' + selector);
      return;

    }
    else {
      console.log("element: " + selector + " -ok-  ");

    }
    element.addEventListener('click', () => callback());

    element.addEventListener('mousedown', () => {
      this.timer = setTimeout(longPressCallback, 500);
    });
    element.addEventListener('mouseup', () => {
      clearTimeout(this.timer);
    });
    element.addEventListener('touchstart', () => {
      this.timer = setTimeout(longPressCallback, 500);
    });
    element.addEventListener('touchend', () => {
      clearTimeout(this.timer);
    });
  }
  bindToButton() {
    this.bindToButtons(CLEAR_CLASS_SELECTOR, () => this.clear())
    this.bindToButtons(BACKSPACE_CLASS_SELECTOR, () => this.backspace(), () => this.backspaceLong());
    this.bindToButtons(ADD_CLASS_SELECTOR, () => this.add());
    this.bindToButtons(MINUS_CLASS_SELECTOR, () => this.subtraction());
    this.bindToButtons(MULTIPLY_CLASS_SELECTOR, () => this.multiply());
    this.bindToButtons(DIVIDE_CLASS_SELECTOR, () => this.divide());
    this.bindToButtons(EQUAL_CLASS_SELECTOR, () => this.equal());
    this.bindToButtons(SIGN_CHANGE_CLASS_SELECTOR, () => this.signChange());
    this.bindToButtons(DOT_CLASS_SELECTOR, () => this.dot(), () => this.showVersion());

  }
  showVersion() {
    this.displaySmall.innerHTML = 'Version';
    this.displayBig.innerHTML = '1.7.2';
    console.log('v1.7.2');
  }
  backspaceLong() {
    this.displayBig.innerHTML = 0;
  }
  clear() {

    this.displayValue = 0;
    this.previousDisplayValue = null;
    this.newValue = 0;
    this.displayBig.textContent = this.displayValue;
    this.displaySmall.textContent = '';
    this.previousFunction = undefined;
    this.wasFunctionClicked = false;

  }

  backspace(a) {
    this.displayBig.innerHTML = this.displayBig.innerHTML == '0' || this.displayBig.innerHTML == null || this.displayBig.innerHTML.length == 1
      ? 0
      : this.displayBig.innerHTML.slice(0, -1);

  }
  changeDisplay(value) {

    if (this.equalIsClicked) {

      this.displaySmall.innerHTML = this.previousDisplayValue + this.char + this.displayValue + ' = ';
      this.displayValue = value;
      this.displayBig.innerHTML = this.displayValue;
      this.wasEqualClicked = false;
    }
    else if (!this.wasFunctionClicked) {
      this.previousDisplayValue = this.displayBig.innerHTML;

      this.displaySmall.innerHTML = this.previousDisplayValue + this.char;
    }
    this.previousDisplayValue = this.displayBig.innerHTML

  }

  callPreviousFunctionAndAssignNew(selectedFunction) {

    if (selectedFunction != this.previousFunction && this.previousFunction) {
      this.previousFunction();
    }

    this.previousFunction = selectedFunction;
  }
  add() {
    this.callPreviousFunctionAndAssignNew(this.add);
    this.char = ' + ';
    if (!this.wasFunctionClicked || this.equalIsClicked) {
      const newValue = Number(this.previousDisplayValue) + Number(this.displayValue);
      this.changeDisplay(newValue);
      this.wasFunctionClicked = true;
    }
  }

  subtraction() {
    this.callPreviousFunctionAndAssignNew(this.subtraction);
    this.char = ' - ';
    if (!this.wasFunctionClicked || this.equalIsClicked) {
      const newValue = Number(this.previousDisplayValue) - Number(this.displayValue);
      this.changeDisplay(newValue);
      this.wasFunctionClicked = true;
    }
  }


  multiply() {
    this.callPreviousFunctionAndAssignNew(this.multiply);
    this.char = ' &times; ';
    if (!this.wasFunctionClicked || this.equalIsClicked) {
      const newValue = Number(this.previousDisplayValue) * Number(this.displayValue);
      this.changeDisplay(newValue);
      this.wasFunctionClicked = true;
    }
  }
  divide() {
    this.callPreviousFunctionAndAssignNew(this.divide);
    this.char = ' &divide; ';
    if (!this.wasFunctionClicked || this.equalIsClicked) {
      const newValue = Number(this.previousDisplayValue) / Number(this.displayValue);
      this.changeDisplay(newValue);
      this.wasFunctionClicked = true;
    }
  }
  equal() {
    this.equalIsClicked = true;
    this.previousFunction();
    this.equalIsClicked = false;
    this.wasFunctionClicked = false;
    this.previousFunction = undefined;

  }
  signChange() {

    this.displayBig.innerHTML = -this.displayBig.innerHTML;
    this.displayValue = this.displayBig.innerHTML;
  }
  dot() {
    this.displayBig.innerHTML = this.displayBig.innerHTML.includes(".")
      ? this.displayBig.innerHTML
      : this.displayBig.innerHTML + ('.');
  }


}
new Calculator();
console.log('hello');

