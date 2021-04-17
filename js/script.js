'use strict';

let buttonStart = document.getElementById('start');
let buttonCancel = document.getElementById('cancel');
let depositCheck = document.getElementById('deposit-check');

let income = document.querySelector('.income');

let salaryAmount = document.querySelector('.salary-amount');
let incomeTitle = document.querySelector('.income-title');
let expensesTitle = document.querySelector('.expenses-title');
let additionalExpensesItem = document.querySelector('.additional_expenses-item');
let targetAmount = document.querySelector('.target-amount');
let periodSelect = document.querySelector('.period-select');
let periodAmount = document.querySelector('.period-amount');
let checkDeposit = document.querySelector('#deposit-check');
let budgetMonthValue = document.querySelector('.budget_month-value');
let depositCheckmark = document.querySelector('.deposit-checkmark');

let incomeItems = document.querySelectorAll('.income-items');
let expensesItems = document.querySelectorAll('.expenses-items');
let additionalIncomeItems = document.querySelectorAll('.additional_income-item');

let buttonIncomeAdd = document.getElementsByTagName('button')[0];
let buttonExpensesAdd = document.getElementsByTagName('button')[1];

let budgetDayValue = document.getElementsByClassName('result-total')[1];
let expensesMonthValue = document.getElementsByClassName('result-total')[2];
let additionalIncomeValue = document.getElementsByClassName('result-total')[3];
let additionalExpensesValue = document.getElementsByClassName('result-total')[4];
let incomePeriodValue = document.getElementsByClassName('result-total')[5];
let targetMonthValue = document.getElementsByClassName('result-total')[6];

let isNumber = function ( num ){
    return !isNaN(parseFloat(num)) && isFinite(num);
};

let changeDisabled = function( elem ) {
    if ( elem.disabled === true ) {
        elem.style.opacity = '';
        elem.style.cursor = '';
    } else if ( elem.disabled === false ){
        elem.style.opacity = 0.7;
        elem.style.cursor = 'default';
    }

    elem.disabled = !elem.disabled;
};

let changeDisplayNone = function( elem ) {
    if ( !elem.style.display ) {
        elem.style.display = 'none';
    } else {
        elem.style.display = '';
    }
};

let appData = {
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    additionalIncome: 0,
    deposit: false,
    budget: 0,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    percentDeposit: 0,
    moneyDeposit: 0,
    start: function() {

        this.getMoneyBudget();  

        this.getIncome();      
        this.getExpenses();

        this.getAddIncome();
        this.getAddExpenses();

        //this.getInfoDeposit();
        this.getDepositChecked();
        this.getExpensesMonth();
        this.getBudget();
        this.getTargetMonth();
        //this.getStatusIncome();

        this.showResults();

        this.changeDisabledElements();
        this.changeButtonStart();

    },
    reset: function() {
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

        this.removeIncomeBlock();
        this.removeExpensesBlock();

        this.showResults();

        this.changeDisabledElements();
        this.changeButtonStart();
        changeDisabled( buttonStart );
    },
    addIncomeBlock: function() {
        
        let cloneIncomeItem = incomeItems[0].cloneNode(true);
        income.insertBefore(cloneIncomeItem, buttonIncomeAdd);
        
        incomeItems = document.querySelectorAll('.income-items');
        
        if (incomeItems.length === 3) {
            buttonIncomeAdd.style.display = 'none';
        }
    },
    addExpensesBlock: function() {
        
        let cloneExpensesItem = expensesItems[expensesItems.length-1].cloneNode(true);
        expensesItems[expensesItems.length-1].before(cloneExpensesItem);
        
        expensesItems = document.querySelectorAll('.expenses-items');
        
        if (expensesItems.length === 3) {
            buttonExpensesAdd.style.display = 'none';
        }
    },
    removeIncomeBlock: function() {

        if (incomeItems.length > 1) {
            
            for (let i = 1; i < incomeItems.length; i++) {
                if (incomeItems[i]) {
                    incomeItems[i].parentNode.removeChild(incomeItems[i]);
                }
            }

            buttonIncomeAdd.style.display = 'block';

        }

    },
    removeExpensesBlock: function() {

        if (incomeItems.length > 1) {

            for (let i = 1; i < expensesItems.length; i++) {
                if (expensesItems[i]) {
                    expensesItems[i].parentNode.removeChild(expensesItems[i]);
                }
            }
    
            buttonExpensesAdd.style.display = 'block';

        }
        
    },
    getMoneyBudget: function() {
        this.budget = +salaryAmount.value;
    },
    getIncome: function() {
        incomeItems.forEach(function(item) {
            let incomeTitle = item.querySelector('.income-title').value;
            let incomeAmount = item.querySelector('.income-amount').value;
            let contains = false;

            Object.keys(appData.income).forEach( function(item) {
                if ( item === incomeTitle ) {
                    contains = true;
                }
            });

            if (incomeTitle !== '' && incomeAmount !== '' && !contains) {
                appData.income[incomeTitle] = incomeAmount;
            }
        });

        for (let item in this.income) {
            this.additionalIncome += +this.income[item];
        }
    },
    getExpenses: function() {
        expensesItems.forEach( function( item ) {
            let expensesTitle = item.querySelector('.expenses-title').value;
            let expensesAmount = item.querySelector('.expenses-amount').value;

            if (expensesTitle !== '' && expensesAmount !== '') {
                appData.expenses[expensesTitle] = expensesAmount;
            }
        });
    },
    getAddIncome: function() {
        additionalIncomeItems.forEach(function(item) {
            let incomeValue = item.value.trim();

            if (incomeValue !== '') {
                appData.addIncome.push(incomeValue);
            }

        });
            
    },
    getAddExpenses: function() {
        let items = additionalExpensesItem.value.split(',');

        items.forEach( function( item ) {
            item = item.trim();

            if (item !== '') {
                appData.addExpenses.push(item);
            }

        });
            
    },
    getDepositChecked: function() {
        this.deposit = depositCheck.checked;
    },
    getExpensesMonth: function() {
        let sum = 0;

        for (const item in this.expenses) {
            sum += +this.expenses[item];
        }

        this.expensesMonth = sum;
    },
    getBudget: function() {
        let budgetMonth = this.budget + this.additionalIncome - this.expensesMonth;
        let budgetDay = Math.floor(budgetMonth / 30);

        this.budgetMonth = budgetMonth;
        this.budgetDay = budgetDay;
    },
    getTargetMonth: function() {
        if (this.budgetMonth <= 0) {
            targetMonthValue.value = 'Цель не будет достигнута';
        } else {
            targetMonthValue.value = Math.ceil(targetAmount.value / this.budgetMonth);
        }
    },
    // getStatusIncome: function() {
    //     if ( this.budgetDay > 1200 ) {
    //         console.log('У Вас высокий уровень дохода');
    //     } else if ( this.budgetDay > 600 && this.budgetDay <= 1200 ) {
    //         console.log('У Вас средний уровень дохода');
    //     } else if ( this.budgetDay > 0 && this.budgetDay <= 600 ) {
    //         console.log('К сожалению, у вас уровень дохода ниже среднего');
    //     } else {
    //         console.log('Что то пошло не так');
    //     }
    // },
    // getInfoDeposit: function() {
    //     if (this.deposit) {
    //         this.percentDeposit = prompt('Какая ставка в процентах у Вашего депозита?', '10');

    //         while (!isNumber(appData.percentDeposit) || appData.percentDeposit < 0) {
    //             appData.percentDeposit = prompt('Какая ставка в процентах у Вашего депозита?', '10');
    //         }

    //         appData.moneyDeposit = prompt('Сколько денег у Вас на депозите?', '5000');

    //         while (!isNumber(appData.moneyDeposit) || appData.moneyDeposit < 0) {
    //             appData.moneyDeposit = prompt('Сколько денег у Вас на депозите?', '5000');
    //         }
    //     }
    // },
    calcSavedMoney: function() {
        return this.budgetMonth * periodSelect.value;
    },
    clearMoneyBudget: function() {
        salaryAmount.value = '';
        this.budget = +salaryAmount.value;
    },
    clearIncomeItems: function() {
        incomeItems.forEach( function( item ) {
            item.querySelector('.income-title').value = '';
            item.querySelector('.income-amount').value = '';
        } );
    },
    clearExpensesItems: function() {
        expensesItems.forEach( function( item ) {
            item.querySelector('.expenses-title').value = '';
            item.querySelector('.expenses-amount').value = '';
        } );
    },
    clearAdditionalIncomeItems: function() {
        additionalIncomeItems.forEach(function(item) {
            item.value = '';
        });
    },
    clearAdditionalExpensesItem: function() {
        additionalExpensesItem.value = '';
    },
    clearTargetAmount: function() {
        targetAmount.value = '';
    },
    clearTargetMonthValue: function() {
        targetMonthValue.value = '';
    },
    clearPeriodSelect: function() {
        periodSelect.value = 1;
        periodAmount.textContent = periodSelect.value;
    },
    changeButtonStart: function() {
        if ( !buttonStart.style.display ) {
            buttonStart.style.display = 'none';
            buttonCancel.style.display = 'block';
        } else if ( buttonCancel.style.display === 'block' ) {
            buttonCancel.style.display = 'none';
            buttonStart.style.display = '';
        }
    },
    changeDisabledElements: function() {
        changeDisabled( salaryAmount );
        changeDisabled( additionalExpensesItem );
        changeDisabled( targetAmount ); 
        changeDisabled( depositCheck );
        
        incomeItems.forEach( function( item ) {
            item.childNodes.forEach( function( item ) {
                if ( typeof( item.value) === 'string' ) { 
                    changeDisabled( item );
                }
            } );
        } );

        expensesItems.forEach( function( item ) {
            item.childNodes.forEach( function( item ) {
                 if ( typeof( item.value) === 'string' ) { 
                    changeDisabled( item );
                }
            } );
        } );

        additionalIncomeItems.forEach( function( item ) {
            changeDisabled( item );
        } );

        if (incomeItems.length !== 3) {
            changeDisplayNone( buttonIncomeAdd );
        }
        if (expensesItems.length !== 3) {
            changeDisplayNone( buttonExpensesAdd );
        }
    },
    showResults: function() {
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = this.budgetDay;
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join(', ');
        additionalIncomeValue.value = this.addIncome.join(', ');
        incomePeriodValue.value = this.calcSavedMoney();

        periodSelect.addEventListener('input', function() {
            incomePeriodValue.value = appData.calcSavedMoney();
        });
    },
};
buttonExpensesAdd.addEventListener('click', appData.addExpensesBlock);
buttonIncomeAdd.addEventListener('click', appData.addIncomeBlock);

periodSelect.addEventListener('input', function() {
    periodAmount.textContent = periodSelect.value;
});

salaryAmount.addEventListener('input', function() {
    if ( salaryAmount.value && buttonStart.disabled === true ) {
        changeDisabled( buttonStart );
    } else if ( !salaryAmount.value ) {
        changeDisabled( buttonStart );
    }
});

changeDisabled( buttonStart );

buttonStart.addEventListener('click', appData.start.bind( appData ));
buttonCancel.addEventListener('click', appData.reset.bind ( appData ));



/*for (const item in appData) {
    console.log('Свойство: ', item, ' Значение: ', appData[item]);
}*/

/* for (let item in appData.addExpenses) {
    let newString = '';

    for (let i = 0; i < appData.addExpenses[item].length; i++) {
        if (i === 0) {
            newString += appData.addExpenses[item][i].toUpperCase();
        } else {
            newString += appData.addExpenses[item][i];
        }
    }

    appData.addExpenses[item] = newString;
}

console.log(appData.addExpenses.join(', ')); */

