'use strict';

let buttonStart = document.getElementById('start');
let buttonCancel = document.getElementById('cancel');
let depositCheck = document.getElementById('deposit-check');

let income = document.querySelector('.income');
let expenses = document.querySelector('.expenses');

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
let placeholderNameElems = document.querySelectorAll('input[placeholder="Наименование"]');
let placeholderSummElems = document.querySelectorAll('input[placeholder="Сумма"]');

let buttonIncomeAdd = document.getElementsByTagName('button')[0];
let buttonExpensesAdd = document.getElementsByTagName('button')[1];

let budgetDayValue = document.getElementsByClassName('result-total')[1];
let expensesMonthValue = document.getElementsByClassName('result-total')[2];
let additionalIncomeValue = document.getElementsByClassName('result-total')[3];
let additionalExpensesValue = document.getElementsByClassName('result-total')[4];
let incomePeriodValue = document.getElementsByClassName('result-total')[5];
let targetMonthValue = document.getElementsByClassName('result-total')[6];


const AppData = function() {

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

};

AppData.prototype.isNumber = function ( num ){
    return !isNaN(parseFloat(num)) && isFinite(num);
};
AppData.prototype.changeDisabled = function( elem ) {
    if ( elem.disabled === true ) {
        elem.style.opacity = '';
        elem.style.cursor = '';
    } else if ( elem.disabled === false ){
        elem.style.opacity = 0.7;
        elem.style.cursor = 'default';
    }

    elem.disabled = !elem.disabled;
};
AppData.prototype.changeDisplayNone = function( elem ) {
    if ( !elem.style.display ) {
        elem.style.display = 'none';
    } else {
        elem.style.display = '';
    }
};
AppData.prototype.addEventName = function( elem ) {
    const _this = this;
    elem.addEventListener('keypress', function(event) {
        let regexp = /[а-яё\s]/i;
        if ( _this.isNumber(event.key) || !regexp.test(event.key) ) {
            event.preventDefault();
        }
    });
};
AppData.prototype.addEventNum = function( elem ) {
    const _this = this;
    elem.addEventListener('keypress', function(event) {
        if (!_this.isNumber(event.key)) {
            event.preventDefault();
        }
    });
};



AppData.prototype.start = function() {

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

};
AppData.prototype.reset = function() {
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
    this.changeDisabled( buttonStart );
};
AppData.prototype.addIncomeBlock = function() {
    const _this = this;
    
    let cloneIncomeItem = incomeItems[0].cloneNode(true);
    
    cloneIncomeItem.childNodes.forEach( function(item, i) {
        if ( item.tagName ) {
            item.value = '';

            if ( i === 1) {
                _this.addEventName( item );
            } else {
                _this.addEventNum( item );
            }
        }
    } );

    income.insertBefore( cloneIncomeItem, buttonIncomeAdd );

    
    incomeItems = document.querySelectorAll('.income-items');
    
    if (incomeItems.length === 3) {
        buttonIncomeAdd.style.display = 'none';
    }
};
AppData.prototype.addExpensesBlock = function() {
    const _this = this;
    
    let cloneExpensesItem = expensesItems[0].cloneNode( true );

    cloneExpensesItem.childNodes.forEach( function( item, i ) {
        if ( item.tagName ) {
            item.value = '';

            if ( i === 1) {
                _this.addEventName( item );
            } else {
                _this.addEventNum( item );
            }
        }
    } );

    expenses.insertBefore(cloneExpensesItem, buttonExpensesAdd);

    
    expensesItems = document.querySelectorAll('.expenses-items');
    
    if (expensesItems.length === 3) {
        buttonExpensesAdd.style.display = 'none';
    }
};
AppData.prototype.removeIncomeBlock = function() {
    incomeItems = document.querySelectorAll('.income-items');

    if (incomeItems.length < 2) {
        return;
    } else {
        for (let i = 1; i < incomeItems.length; i++) {
            if (incomeItems[i]) {
                incomeItems[i].parentNode.removeChild(incomeItems[i]);
            }
        }

        buttonIncomeAdd.style.display = 'block';
    }

};
AppData.prototype.removeExpensesBlock = function() {
    expensesItems = document.querySelectorAll('.expenses-items');

    if (expensesItems.length > 1) {

        for (let i = 1; i < expensesItems.length; i++) {
            if (expensesItems[i]) {
                expensesItems[i].parentNode.removeChild(expensesItems[i]);
            }
        }

        buttonExpensesAdd.style.display = 'block';

    }
    
};
AppData.prototype.getMoneyBudget = function() {
    this.budget = +salaryAmount.value;
};
AppData.prototype.getIncome = function() {
    let _this = this;
    incomeItems.forEach(function(item) {
        let incomeTitle = item.querySelector('.income-title').value;
        let incomeAmount = item.querySelector('.income-amount').value;
        let contains = false;

        Object.keys(_this.income).forEach( function(item) {
            if ( item === incomeTitle ) {
                contains = true;
            }
        });

        if (incomeTitle !== '' && incomeAmount !== '' && !contains) {
            _this.income[incomeTitle] = incomeAmount;
        }
    });

    for (let item in this.income) {
        this.additionalIncome += +this.income[item];
    }
};
AppData.prototype.getExpenses = function() {
    let _this = this;
    expensesItems.forEach( function( item ) {
        let expensesTitle = item.querySelector('.expenses-title').value;
        let expensesAmount = item.querySelector('.expenses-amount').value;

        if (expensesTitle !== '' && expensesAmount !== '') {
            _this.expenses[expensesTitle] = expensesAmount;
        }
    });
};
AppData.prototype.getAddIncome = function() {
    let _this = this;
    additionalIncomeItems.forEach(function(item) {
        let incomeValue = item.value.trim();

        if (incomeValue !== '') {
            _this.addIncome.push(incomeValue);
        }

    });
        
};
AppData.prototype.getAddExpenses = function() {
    let _this = this;
    let items = additionalExpensesItem.value.split(',');

    items.forEach( function( item ) {
        item = item.trim();

        if (item !== '') {
            _this.addExpenses.push(item);
        }

    });
        
};
AppData.prototype.getDepositChecked = function() {
    this.deposit = depositCheck.checked;
};
AppData.prototype.getExpensesMonth = function() {
    let sum = 0;

    for (const item in this.expenses) {
        sum += +this.expenses[item];
    }

    this.expensesMonth = sum;
};
AppData.prototype.getBudget = function() {
    let budgetMonth = this.budget + this.additionalIncome - this.expensesMonth;
    let budgetDay = Math.floor(budgetMonth / 30);

    this.budgetMonth = budgetMonth;
    this.budgetDay = budgetDay;
};
AppData.prototype.getTargetMonth = function() {
    if (this.budgetMonth <= 0) {
        targetMonthValue.value = 'Цель не будет достигнута';
    } else {
        targetMonthValue.value = Math.ceil(targetAmount.value / this.budgetMonth);
    }
};
// AppData.prototype.getStatusIncome = function() {
//     if ( this.budgetDay > 1200 ) {
//         console.log('У Вас высокий уровень дохода');
//     } else if ( this.budgetDay > 600 && this.budgetDay <= 1200 ) {
//         console.log('У Вас средний уровень дохода');
//     } else if ( this.budgetDay > 0 && this.budgetDay <= 600 ) {
//         console.log('К сожалению, у вас уровень дохода ниже среднего');
//     } else {
//         console.log('Что то пошло не так');
//     }
// };
// AppData.prototype.getInfoDeposit = function() {
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
// };
AppData.prototype.calcSavedMoney = function() {
    return this.budgetMonth * periodSelect.value;
};
AppData.prototype.clearMoneyBudget = function() {
    salaryAmount.value = '';
    this.budget = +salaryAmount.value;
};
AppData.prototype.clearIncomeItems = function() {
    incomeItems.forEach( function( item ) {
        item.querySelector('.income-title').value = '';
        item.querySelector('.income-amount').value = '';
    } );
};
AppData.prototype.clearExpensesItems = function() {
    expensesItems.forEach( function( item ) {
        item.querySelector('.expenses-title').value = '';
        item.querySelector('.expenses-amount').value = '';
    } );
};
AppData.prototype.clearAdditionalIncomeItems = function() {
    additionalIncomeItems.forEach(function(item) {
        item.value = '';
    });
};
AppData.prototype.clearAdditionalExpensesItem = function() {
    additionalExpensesItem.value = '';
};
AppData.prototype.clearTargetAmount = function() {
    targetAmount.value = '';
};
AppData.prototype.clearTargetMonthValue = function() {
    targetMonthValue.value = '';
};
AppData.prototype.clearPeriodSelect = function() {
    periodSelect.value = 1;
    periodAmount.textContent = periodSelect.value;
};
AppData.prototype.changeButtonStart = function() {
    if ( !buttonStart.style.display ) {
        buttonStart.style.display = 'none';
        buttonCancel.style.display = 'block';
    } else if ( buttonCancel.style.display === 'block' ) {
        buttonCancel.style.display = 'none';
        buttonStart.style.display = '';
    }
};
AppData.prototype.changeDisabledElements = function() {
    const _this = this;

    this.changeDisabled( salaryAmount );
    this.changeDisabled( additionalExpensesItem );
    this.changeDisabled( targetAmount ); 
    this.changeDisabled( depositCheck );
    
    incomeItems.forEach( function( item ) {
        item.childNodes.forEach( function( item ) {
            if ( typeof( item.value) === 'string' ) { 
                _this.changeDisabled( item );
            }
        } );
    } );

    expensesItems.forEach( function( item ) {
        item.childNodes.forEach( function( item ) {
             if ( typeof( item.value) === 'string' ) { 
                _this.changeDisabled( item );
            }
        } );
    } );

    additionalIncomeItems.forEach( function( item ) {
        _this.changeDisabled( item );
    } );

    if (incomeItems.length !== 3) {
        this.changeDisplayNone( buttonIncomeAdd );
    }
    if (expensesItems.length !== 3) {
        this.changeDisplayNone( buttonExpensesAdd );
    }
};
AppData.prototype.showResults = function() {
    let _this = this;
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    incomePeriodValue.value = this.calcSavedMoney();

    periodSelect.addEventListener('input', function() {
        incomePeriodValue.value = _this.calcSavedMoney();
    });
};
AppData.prototype.eventListeners = function() {
    let _this = this;

    buttonExpensesAdd.addEventListener('click', function() {
        placeholderNameElems = document.querySelectorAll('input[placeholder="Наименование"]');
        placeholderSummElems = document.querySelectorAll('input[placeholder="Сумма"]');
        _this.addExpensesBlock();
    });
    buttonIncomeAdd.addEventListener('click', function() {
        placeholderNameElems = document.querySelectorAll('input[placeholder="Наименование"]');
        placeholderSummElems = document.querySelectorAll('input[placeholder="Сумма"]');
        _this.addIncomeBlock();
    });
    
    periodSelect.addEventListener('input', function() {
        periodAmount.textContent = periodSelect.value;
    });
    
    salaryAmount.addEventListener('input', function() {
        if ( salaryAmount.value && buttonStart.disabled === true ) {
            _this.changeDisabled( buttonStart );
        } else if ( !salaryAmount.value ) {
            _this.changeDisabled( buttonStart );
        }
    });
    
    placeholderNameElems.forEach(function(item) {
        _this.addEventName( item );
    });
    
    placeholderSummElems.forEach(function(item) {
        _this.addEventNum( item );
    });
    
    this.changeDisabled( buttonStart );
    buttonStart.addEventListener('click', _this.start.bind( _this ));
    buttonCancel.addEventListener('click', _this.reset.bind ( _this ));

};


const appData = new AppData();
appData.eventListeners();