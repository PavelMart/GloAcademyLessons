'use strict';

const isNumber = function (n){
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let money,
    start = function() {
        do {
            money = prompt('Ваш месячный доход?');
        } while (!isNumber(money));

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
    asking: function() {
        let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
        appData.addExpenses = addExpenses.toLowerCase().split(', ');
        appData.deposit = confirm('Есть ли у Вас депозит в банке?');

        for (let i = 0; i < 2; i++) {
            let expenseName = prompt('Введите обязательную статью расходов');
            let expenseValue = prompt('Во сколько эта статья обойдется?');
            while (!isNumber(expenseValue)) {
                expenseValue = prompt('Во сколько эта статья обойдется?');
            }
            appData.expenses[expenseName] = +expenseValue;
        }
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
};

appData.asking();
appData.getExpensesMonth();
appData.getBudget();

console.log('expensesMonth: ', appData.expensesMonth);

appData.getTargetMonth();
appData.getStatusIncome();

for (const item in appData) {
    console.log('Свойство: ', item, ' Значение: ', appData[item]);
}