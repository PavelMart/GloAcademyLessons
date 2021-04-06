'use strict';

let money = +prompt('Ваш месячный доход?');
let income = 'Investments';
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
let deposit = confirm('Есть ли у Вас депозит в банке?');
let expenses1 = prompt('Введите обязательную статью расходов');
let amount1 = +prompt('Во сколько эта статья обойдется?');
let expenses2 = prompt('Введите обязательную статью расходов');
let amount2 = +prompt('Во сколько эта статья обойдется?');
let mission = 10000000;
let period = 12;

let showTypeOf = function(value) {
    console.log(typeof value);
};

let getStatusIncome = function(budgetDay) {
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

let getExpensesMonth = function(expense1, expense2) {
    return expense1 + expense2;
};
let getAccumulatedMonth = function(income, expenses) {
    return income - expenses;
};

let accumulatedMonth = getAccumulatedMonth(money, getExpensesMonth(amount1, amount2));

let getTargetMonth = function(purpose, accumulatedMonth) {
    return Math.ceil(purpose / accumulatedMonth);
};

let budgetDay = Math.floor(accumulatedMonth / 30);

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);
console.log( getExpensesMonth(amount1, amount2) );
console.log( addExpenses.toLowerCase().split(', ') );
console.log( getTargetMonth(mission, accumulatedMonth) );
console.log( budgetDay );
getStatusIncome(budgetDay);
