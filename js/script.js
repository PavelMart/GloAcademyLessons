'use strict';

const buttonStart = document.getElementById('start');
const buttonCancel = document.getElementById('cancel');
const depositCheck = document.getElementById('deposit-check');

const income = document.querySelector('.income');
const expenses = document.querySelector('.expenses');
const salaryAmount = document.querySelector('.salary-amount');
const additionalExpensesItem = document.querySelector('.additional_expenses-item');
const targetAmount = document.querySelector('.target-amount');
const periodSelect = document.querySelector('.period-select');
const periodAmount = document.querySelector('.period-amount');
const checkDeposit = document.querySelector('#deposit-check');
const budgetMonthValue = document.querySelector('.budget_month-value');
const depositCheckmark = document.querySelector('.deposit-checkmark');

const additionalIncomeItems = document.querySelectorAll('.additional_income-item');

const buttonIncomeAdd = document.getElementsByTagName('button')[0];
const buttonExpensesAdd = document.getElementsByTagName('button')[1];
const buttonsAdd = document.querySelectorAll('.btn_plus');

const budgetDayValue = document.getElementsByClassName('result-total')[1];
const expensesMonthValue = document.getElementsByClassName('result-total')[2];
const additionalIncomeValue = document.getElementsByClassName('result-total')[3];
const additionalExpensesValue = document.getElementsByClassName('result-total')[4];
const incomePeriodValue = document.getElementsByClassName('result-total')[5];
const targetMonthValue = document.getElementsByClassName('result-total')[6];

let incomeItems = document.querySelectorAll('.income-items');
let expensesItems = document.querySelectorAll('.expenses-items');
let placeholderNameElems = document.querySelectorAll('input[placeholder="Наименование"]');
let placeholderSummElems = document.querySelectorAll('input[placeholder="Сумма"]');

class AppData {

    constructor() {
        this.income = {};
        this.addIncome = [];
        this.expenses = {};
        this.addExpenses = [];
        this.additionalIncome = 0;
        this.deposit = false;
        this.budget = 0;
        this.budgetDay = 0;
        this.budgetMonth = 0;
        this.expensesMonth = 0;
        this.percentDeposit = 0;
        this.moneyDeposit = 0;
    }

    isNumber( num ) {

        return !isNaN( parseFloat( num ) ) && isFinite( num );

    }

    changeDisabled( elem ) {

        if ( elem.disabled === true ) {
            elem.style.opacity = '';
            elem.style.cursor = '';
        } else if ( elem.disabled === false ){
            elem.style.opacity = 0.7;
            elem.style.cursor = 'default';
        }
    
        elem.disabled = !elem.disabled;

    }

    changeDisplayNone( elem ) {

        if ( !elem.style.display ) {
            elem.style.display = 'none';
        } else {
            elem.style.display = '';
        }

    }

    addEventName( elem ) {

        elem.addEventListener('keypress', ( event ) => {
            const regexp = /[а-яё\s]/i;
            if ( this.isNumber(event.key) || !regexp.test(event.key) ) {
                event.preventDefault();
            }
        });

    }
    
    addEventNum( elem ) {

        elem.addEventListener('keypress', ( event ) => {
            if (!this.isNumber(event.key)) {
                event.preventDefault();
            }
        });

    }

    start() {
    
        this.getMoneyBudget();  
    
        this.getIncExp();

        this.getAddIncExp();
    
        this.getDepositChecked();
        this.getExpensesMonth();
        this.getBudget();
        this.getTargetMonth();
    
        this.showResults();
    
        this.changeDisabledElements();
        this.changeButtonStart();
    
    }
    
    reset() {

        this.income = {};
        this.addIncome = [];
        this.expenses = {};
        this.addExpenses = [];
        this.additionalIncome = 0;
        this.deposit = false;
        this.budget = 0;
        this.budgetDay = 0;
        this.budgetMonth = 0;
        this.expensesMonth = 0;
        this.percentDeposit = 0;
        this.moneyDeposit = 0;
    
        this.clearMoneyBudget();
        this.clearIncomeItems();
        this.clearExpensesItems();
        this.clearAdditionalIncomeItems();
        this.clearAdditionalExpensesItem();
        this.clearTargetAmount();
        this.clearPeriodSelect();
    
        this.getBudget();
    
        this.clearTargetMonthValue();

        this.removeIncExpBlock();
    
        this.showResults();
    
        this.changeDisabledElements();
        this.changeButtonStart();
        this.changeDisabled( buttonStart );

    }

    addIncExpBlock( e ) {
        
        const target = e.target;
        const parentNode = target.parentNode;
        const str = parentNode.className;
        const cloneItem = document.getElementsByClassName( `${str}-items` )[0].cloneNode(true);
        
        cloneItem.childNodes.forEach( ( item, i ) => {
            if ( item.tagName ) {
                item.value = '';
    
                if ( i === 1) {
                    this.addEventName( item );
                } else {
                    this.addEventNum( item );
                }
            }
        } );
    
        parentNode.insertBefore( cloneItem, target );
        
        incomeItems = document.querySelectorAll('.income-items');
        expensesItems = document.querySelectorAll('.expenses-items');
        
        if ( str === 'income' && incomeItems.length === 3 ) {
            target.style.display = 'none';
        } else if (  str === 'expenses' && expensesItems.length === 3 ) { 
            target.style.display = 'none';
        }

    }

    removeIncExpBlock() {

        const itemsIncExp = [incomeItems, expensesItems];

        for ( let item of itemsIncExp ) {

            const str = item[0].parentNode.className;
            
            item = document.querySelectorAll( `.${str}-items` );

            if ( item.length > 1 ) {
            
                for ( let i = 1; i < item.length; i++ ) {
                    if  (item[i] ) {
                        item[i].parentNode.removeChild( item[i] );
                    }
                }
        
                buttonsAdd.forEach( item => item.style.display = 'block');
    
            }

        }
    
    }

    getMoneyBudget() {

        this.budget = +salaryAmount.value;

    }

    getIncExp() {

        const count = ( item ) => {
            const str = item.className.split('-')[0];

            const itemTitle = item.querySelector(`.${str}-title`).value;
            const itemAmount = item.querySelector(`.${str}-amount`).value;

            let contains = false;

            Object.keys( this[str] ).forEach( ( item ) => {
                if ( item === itemTitle ) {
                    contains = true;
                }
            });

            if ( itemTitle !== '' && itemAmount !== '' && !contains ) {
                this[str][itemTitle] = itemAmount;
            }

        };

        incomeItems.forEach( count );
        expensesItems.forEach( count );

        for ( let item in this.income ) {
            this.additionalIncome += +this.income[item];
        }

    }

    getAddIncExp() {

        const additionalExpensesItems = additionalExpensesItem.value.split(',');

        const pushArray = ( item, array ) => {

            const itemValue = item.trim();
    
            if ( itemValue !== '' ) {
                this[array].push( itemValue );
            }

        };

        additionalIncomeItems.forEach( item => {
            pushArray( item.value, 'addIncome' );
        } );

        additionalExpensesItems.forEach( item => {
            pushArray( item, 'addExpenses' );
        } );

    }

    getDepositChecked() {

        this.deposit = depositCheck.checked;

    }

    getExpensesMonth() {

        let sum = 0;
    
        for (const item in this.expenses) {
            sum += +this.expenses[item];
        }
    
        this.expensesMonth = sum;

    }

    getBudget() {

        const budgetMonth = this.budget + this.additionalIncome - this.expensesMonth;
        const budgetDay = Math.floor(budgetMonth / 30);
    
        this.budgetMonth = budgetMonth;
        this.budgetDay = budgetDay;

    }

    getTargetMonth() {

        if (this.budgetMonth <= 0) {
            targetMonthValue.value = 'Цель не будет достигнута';
        } else {
            targetMonthValue.value = Math.ceil(targetAmount.value / this.budgetMonth);
        }

    }

    calcSavedMoney() {

        return this.budgetMonth * periodSelect.value;

    }

    clearMoneyBudget() {

        salaryAmount.value = '';
        this.budget = +salaryAmount.value;

    }

    clearIncomeItems() {

        incomeItems.forEach( ( item ) => {
            item.querySelector('.income-title').value = '';
            item.querySelector('.income-amount').value = '';
        } );

    }

    clearExpensesItems() {

        expensesItems.forEach( ( item ) => {
            item.querySelector('.expenses-title').value = '';
            item.querySelector('.expenses-amount').value = '';
        } );

    }

    clearAdditionalIncomeItems() {

        additionalIncomeItems.forEach( ( item ) => {
            item.value = '';
        });

    }

    clearAdditionalExpensesItem() {

        additionalExpensesItem.value = '';

    }

    clearTargetAmount() {

        targetAmount.value = '';

    }

    clearTargetMonthValue() {

        targetMonthValue.value = '';

    }

    clearPeriodSelect() {

        periodSelect.value = 1;
        periodAmount.textContent = periodSelect.value;

    }

    changeButtonStart() {
        
        if ( !buttonStart.style.display ) {
            buttonStart.style.display = 'none';
            buttonCancel.style.display = 'block';
        } else if ( buttonCancel.style.display === 'block' ) {
            buttonCancel.style.display = 'none';
            buttonStart.style.display = '';
        }

    }

    changeDisabledElements() {
    
        this.changeDisabled( salaryAmount );
        this.changeDisabled( additionalExpensesItem );
        this.changeDisabled( targetAmount ); 
        this.changeDisabled( depositCheck );
        
        incomeItems.forEach( ( item ) => {

            item.childNodes.forEach( ( item ) => {

                if ( typeof( item.value) === 'string' ) { 
                    this.changeDisabled( item );
                }

            } );

        } );
    
        expensesItems.forEach( ( item ) => {

            item.childNodes.forEach( ( item ) => {

                 if ( typeof( item.value) === 'string' ) { 
                    this.changeDisabled( item );
                }

            } );

        } );
    
        additionalIncomeItems.forEach( ( item ) => {

            this.changeDisabled( item );

        } );
    
        if (incomeItems.length !== 3) {
            this.changeDisplayNone( buttonIncomeAdd );
        }

        if (expensesItems.length !== 3) {
            this.changeDisplayNone( buttonExpensesAdd );
        }

    }

    showResults() {

        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = this.budgetDay;
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join(', ');
        additionalIncomeValue.value = this.addIncome.join(', ');
        incomePeriodValue.value = this.calcSavedMoney();
    
        periodSelect.addEventListener('input', () => {

            incomePeriodValue.value = this.calcSavedMoney();
            
        });

    }

    eventListeners() {

        buttonsAdd.forEach( ( item, i ) => {
            
            item.addEventListener( 'click', e => {

                placeholderNameElems = document.querySelectorAll('input[placeholder="Наименование"]');
                placeholderSummElems = document.querySelectorAll('input[placeholder="Сумма"]');
                this.addIncExpBlock( e );

            });

        } );
        
        periodSelect.addEventListener('input',  () => {

            periodAmount.textContent = periodSelect.value;

        });
        
        salaryAmount.addEventListener('input',  () => {

            if ( salaryAmount.value && buttonStart.disabled === true ) {
                this.changeDisabled( buttonStart );
            } else if ( !salaryAmount.value ) {
                this.changeDisabled( buttonStart );
            }

        });
        
        placeholderNameElems.forEach( ( item ) => {

            this.addEventName( item );

        });
        
        placeholderSummElems.forEach( ( item ) => {

            this.addEventNum( item );

        });
        
        this.changeDisabled( buttonStart );
        buttonStart.addEventListener('click', this.start.bind( this ));
        buttonCancel.addEventListener('click', this.reset.bind ( this ));
    
    }

}

const appData = new AppData();

appData.eventListeners();