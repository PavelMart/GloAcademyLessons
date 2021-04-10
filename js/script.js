'use strict';

let isNumber = function (num){
    return !isNaN(parseFloat(num)) && isFinite(num);
};
let isString = function(str, query) {
    while (!isNaN(str || str.trim() === '' || str === null) ) {
        str = prompt('Данное значение не яляется допустимым! Введите другое значение! \n' + query);
    }
    return str;
};

let money,
    start = function() {
        do {
            money = prompt('Ваш месячный доход?', '10000');
        } while (!isNumber(money) || money < 0);

    };

start();

let appData = {
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    mission: 50000,
    period: 3,
    budget: money,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    percentDeposit: 0,
    moneyDeposit: 0,
    asking: function() {

        if (confirm('Есть ли у Вас дополнительный источник заработка?')) {
            let question = 'Какой у Вас дополнительный источник заработка?';
            let itemIncome = prompt(question, 'Фриланс');
            itemIncome = isString(itemIncome, question);
            let cashIncome = prompt('Сколько Вы на этом зарабатываете?', '10000');
            while (!isNumber(cashIncome) || cashIncome < 0) {
                cashIncome = prompt('Сколько Вы на этом зарабатываете?', '10000');
            }
            appData.income[itemIncome] = +cashIncome;
        }

        let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'eda, voda');
        appData.addExpenses = addExpenses.toLowerCase().split(', ');

        for (let i = 0; i < 2; i++) {
            let question = 'Введите обязательную статью расходов';
            let expenseName = prompt(question);
            expenseName = isString(expenseName, question);
            let expenseValue = prompt('Во сколько эта статья обойдется?');
            while (!isNumber(expenseValue) || expenseValue < 0) {
                expenseValue = prompt('Во сколько эта статья обойдется?');
            }
            appData.expenses[expenseName] = +expenseValue;
        }

        appData.deposit = confirm('Есть ли у Вас депозит в банке?');
    },
    getExpensesMonth: function() {
        let sum = 0;
        for (const item in appData.expenses) {
            sum += appData.expenses[item];
        }
        appData.expensesMonth = sum;
    },
    getBudget: function() {
        let budgetMonth = appData.budget - appData.expensesMonth;
        let budgetDay = Math.floor(budgetMonth / 30);
        appData.budgetMonth = budgetMonth;
        appData.budgetDay = budgetDay;
    },
    getTargetMonth: function() {
        if (appData.budgetMonth <= 0) {
            console.log('Цель не будет достигнута');
        } else {
            let targetMonth = Math.ceil(appData.mission / appData.budgetMonth);
            console.log('Цель будет достигнута за ' + targetMonth + ' месяцев');
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
        return appData.budgetMonth * appData.period;
    },
};

appData.asking();
appData.getInfoDeposit();
appData.getExpensesMonth();
appData.getBudget();

console.log('expensesMonth: ', appData.expensesMonth);

appData.getTargetMonth();
appData.getStatusIncome();

/*for (const item in appData) {
    console.log('Свойство: ', item, ' Значение: ', appData[item]);
}*/

for (let item in appData.addExpenses) {
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

console.log(appData.addExpenses.join(', '));