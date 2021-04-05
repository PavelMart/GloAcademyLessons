'use strict';

let money = +prompt('Ваш месячный доход?');
let income = 'Investments';
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
let deposit = confirm('Есть ли у Вас депозит в банке?');
let expenses1 = prompt('Введите обязательную статью расходов');
let amount1 = +prompt('Во сколько эта статья обойдется?');
let expenses2 = prompt('Введите обязательную статью расходов');
let amount2 = +prompt('Во сколько эта статья обойдется?');
let budgetMonth = money - amount1 - amount2;
let mission = 10000000;
let period = 12;
let budgetDay = Math.floor(budgetMonth / 30);

console.log( typeof(money) );
console.log( typeof(income) );
console.log( typeof(deposit) );
console.log( addExpenses.length );
console.log( addExpenses );
console.log( addExpenses.toLowerCase().split(', ') );
console.log( 'Период равен: ' + period + ' месяцев' );
console.log( 'Цель: заработать ' + mission + ' рублей' );
console.log('Бюджет на месяц: ' + budgetMonth);
console.log( 'Цель будет достигнута за ' + Math.ceil(mission / budgetMonth) + ' месяцев' ) ;
console.log( 'Дневной бюджет: ' + budgetDay + ' рублей' );

if ( budgetDay > 1200 ) {
    console.log('У Вас высокий уровень дохода');
} else if ( budgetDay > 600 && budgetDay <= 1200 ) {
    console.log('У Вас средний уровень дохода');
} else if ( budgetDay > 0 && budgetDay <= 600 ) {
    console.log('К сожалению, у вас уровень дохода ниже среднего');
} else {
    console.log('Что то пошло не так');
}