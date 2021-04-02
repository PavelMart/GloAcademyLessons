let money = 30000;
let income = 'Investments';
let addExpenses = 'Food, Utility bills, Internet, Shopping, Gym';
let deposit = true;
let mission = 10000000;
let period = 12;
let budgetDay = money / 30;

console.log( typeof(money) );
console.log( typeof(income) );
console.log( typeof(deposit) );
console.log(addExpenses.length);
console.log( 'Период равен: ' + period + ' месяцев', 'Цель: заработать ' + mission + ' рублей');
console.log( addExpenses.toLowerCase().split(', ') );
console.log( 'Дневной бюджет: ' + budgetDay + ' рублей' );