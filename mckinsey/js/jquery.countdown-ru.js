/* http://keith-wood.name/countdown.html
 * Russian initialisation for the jQuery countdown extension
 * Written by Sergey K. (xslade{at}gmail.com) June 2010. */
(function($) {
	'use strict';
	$.countdown.regionalOptions.ru = {
		labels: ['Лет','Месяцев','Недель','дней  /','часов  /','минут - до начала погружения','Секунд'],
		labels1: ['Год','Месяц','Неделя','день  /','час  /','минута - до начала погружения','Секунда'],
		labels2: ['Года','Месяца','Недели','дня  /','часа  /','минуты - до начала погружения','Секунды'],
		compactLabels: ['л','м','н','д'],
		compactLabels1: ['г','м','н','д'],
		whichLabels: function(amount) {
			var units = amount % 10;
			var tens = Math.floor((amount % 100) / 10);
			return (amount === 1 ? 1 : (units >= 2 && units <= 4 && tens !== 1 ? 2 :
				(units === 1 && tens !== 1 ? 1 : 0)));
		},
		digits: ['0','1','2','3','4','5','6','7','8','9'],
		timeSeparator: ':',
		isRTL: false
	};
	$.countdown.setDefaults($.countdown.regionalOptions.ru);
})(jQuery);