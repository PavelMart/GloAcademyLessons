'use strict';

const isNumber = function (n){
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let money;
let income = 'Investments';
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
let deposit = confirm('Есть ли у Вас депозит в банке?');
let expenses = [];
let mission = 10000000;
let period = 12;

const showTypeOf = function(value) {
    console.log(typeof value);
};

const getStatusIncome = function(budgetDay) {
    if ( budgetDay > 1200 ) {
        console.log('У Вас высокий уровень дохода');
    } else if ( budgetDay > 600 && budgetDay <= 1200 ) {
        console.log('У Вас средний уровень дохода');
    } else if ( budgetDay > 0 && budgetDay <= 600 ) {
        console.log('К сожалению, у вас уровень дохода ниже среднего');
    } else {
        console.log('Что то пошло не так');
    }
};

const start = function() {
    do {
        money = prompt('Ваш месячный доход?');
    } while (!isNumber(money));

};

start();

const getExpensesMonth = function() {
    let sum = 0;

    for (let i = 0; i < 2; i++) {
        expenses[i] = prompt('Введите обязательную статью расходов');
        let expense = prompt('Во сколько эта статья обойдется?');
        while (!isNumber(expense)) {
            expense = prompt('Это не число! Напишите сумму цифрами');
        }
        sum += +expense;
    }

    return sum;
};

let getAccumulatedMonth = function(income, expenses) {
    return income - expenses;
};

let expensesMonth = getExpensesMonth();
let accumulatedMonth = getAccumulatedMonth(money, expensesMonth);

let getTargetMonth = function(purpose, accumulatedMonth) {
    let targetMonth = Math.ceil(purpose / accumulatedMonth);
    if (targetMonth < 0) {
        return 'Цель не будет достигнута';
    } else {
        return 'Цель будет достигнута за ' + targetMonth + ' месяцев';
    }
};

let budgetDay = Math.floor(accumulatedMonth / 30);

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);
console.log( 'Список расходов: ', addExpenses.toLowerCase().split(', ') );
console.log( 'Список обязательных расходов: ', expenses );
console.log( 'Обязательные расходы: ' + expensesMonth );
console.log( getTargetMonth(mission, accumulatedMonth) );
console.log( budgetDay );
getStatusIncome(budgetDay);
