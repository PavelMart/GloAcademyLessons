'use strict';

let buttonStart = document.getElementById('start');

let salaryAmount = document.querySelector('.salary-amount');
let incomeTitle = document.querySelector('.income-title');
let expensesTitle = document.querySelector('.expenses-title');
let additionalExpensesItem = document.querySelector('.additional_expenses-item');
let targetAmount = document.querySelector('.target-amount');
let periodSelect = document.querySelector('.period-select');
let periodAmount = document.querySelector('.period-amount');
let checkDeposit = document.querySelector('#deposit-check');
let budgetMonthValue = document.querySelector('.budget_month-value');

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

let isNumber = function (num){
    return !isNaN(parseFloat(num)) && isFinite(num);
};
let getDisabledTrue = function() {
    buttonStart.style.opacity = 0.7;
    buttonStart.style.cursor = 'default';
    buttonStart.disabled = true;
};
let getDisabledFalse = function() {
    buttonStart.style.opacity = '';
    buttonStart.style.cursor = '';
    buttonStart.disabled = false;
};

let appData = {
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    additionalIncome: 0,
    deposit: false,
    mission: 50000,
    budget: 0,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    percentDeposit: 0,
    moneyDeposit: 0,
    start: function() {

        appData.getMoneyBudget();  

        appData.getIncome();      
        appData.getExpenses();

        appData.getAddIncome();
        appData.getAddExpenses();

        appData.getInfoDeposit();
        appData.getExpensesMonth();
        appData.getBudget();
        appData.getTargetMonth();
        appData.getStatusIncome();

        appData.showResults();

        console.log(appData);

    },
    getMoneyBudget: function() {
        if (salaryAmount.value === '') {
            alert('Ошибка, поле "Месячный доход" должно быть заполнено!');
            return;
        }

        appData.budget = +salaryAmount.value;
    },
    addIncomeBlock: function() {

        let cloneIncomeItem = incomeItems[incomeItems.length-1].cloneNode(true);
        incomeItems[incomeItems.length-1].before(cloneIncomeItem);
        
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
    getIncome: function() {
        incomeItems.forEach(function(item) {
            let incomeTitle = item.querySelector('.income-title').value;
            let incomeAmount = item.querySelector('.income-amount').value;

            if (incomeTitle !== '' && incomeAmount !== '') {
                appData.income[incomeTitle] = incomeAmount;
            }
        });

        for (let item in appData.income) {
            appData.additionalIncome += +appData.income[item];
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
    getAddExpenses: function() {
        let items = additionalExpensesItem.value.split(',');

        items.forEach( function( item ) {
            item = item.trim();

            if (item !== '') {
                appData.addExpenses.push(item);
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
    showResults: function() {
        budgetMonthValue.value = appData.budgetMonth;
        budgetDayValue.value = appData.budgetDay;
        expensesMonthValue.value = appData.expensesMonth;
        additionalExpensesValue.value = appData.addExpenses.join(', ');
        additionalIncomeValue.value = appData.addIncome.join(', ');
        targetMonthValue.value = appData.getTargetMonth();
        incomePeriodValue.value = appData.calcSavedMoney();

        periodSelect.addEventListener('input', function() {
            incomePeriodValue.value = appData.calcSavedMoney();
        });
    },
    getExpensesMonth: function() {
        let sum = 0;

        for (const item in appData.expenses) {
            sum += +appData.expenses[item];
        }

        appData.expensesMonth = sum;
    },
    getBudget: function() {
        let budgetMonth = appData.budget + appData.additionalIncome - appData.expensesMonth;
        let budgetDay = Math.floor(budgetMonth / 30);

        appData.budgetMonth = budgetMonth;
        appData.budgetDay = budgetDay;
    },
    getTargetMonth: function() {
        if (appData.budgetMonth <= 0) {
            return 'Цель не будет достигнута';
        } else {
            return Math.ceil(targetAmount.value / appData.budgetMonth);
        }
    },
    getStatusIncome: function() {
        if ( appData.budgetDay > 1200 ) {
            console.log('У Вас высокий уровень дохода');
        } else if ( appData.budgetDay > 600 && appData.budgetDay <= 1200 ) {
            console.log('У Вас средний уровень дохода');
        } else if ( appData.budgetDay > 0 && appData.budgetDay <= 600 ) {
            console.log('К сожалению, у вас уровень дохода ниже среднего');
        } else {
            console.log('Что то пошло не так');
        }
    },
    getInfoDeposit: function() {
        if (appData.deposit) {
            appData.percentDeposit = prompt('Какая ставка в процентах у Вашего депозита?', '10');

            while (!isNumber(appData.percentDeposit) || appData.percentDeposit < 0) {
                appData.percentDeposit = prompt('Какая ставка в процентах у Вашего депозита?', '10');
            }

            appData.moneyDeposit = prompt('Сколько денег у Вас на депозите?', '5000');

            while (!isNumber(appData.moneyDeposit) || appData.moneyDeposit < 0) {
                appData.moneyDeposit = prompt('Сколько денег у Вас на депозите?', '5000');
            }
        }
    },
    calcSavedMoney: function() {
        return appData.budgetMonth * periodSelect.value;
    },
};
buttonExpensesAdd.addEventListener('click', appData.addExpensesBlock);
buttonIncomeAdd.addEventListener('click', appData.addIncomeBlock);

periodSelect.addEventListener('input', function() {
    periodAmount.textContent = periodSelect.value;
});

salaryAmount.addEventListener('input', function() {
    if (salaryAmount.value) {
        getDisabledFalse();
    } else {
        getDisabledTrue();
    }
});

getDisabledTrue();
buttonStart.addEventListener('click', appData.start);



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