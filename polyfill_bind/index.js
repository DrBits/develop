var bind = function(fn, context) {
  // Обрезаем ненужные аргументы (функцию и контекст)
  var bindArgs = [].slice.call(arguments, 2);
  return function() {
    // Здесь все аргументы будут необходимы
    var fnArgs = [].slice.call(arguments);
    // Собираем все
    return fn.apply(context, bindArgs.concat(fnArgs));
  };
};