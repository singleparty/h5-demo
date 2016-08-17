define([
    'components/showcase/showcase'
], function () {
    var obj = {};
    var args = Array.prototype.slice.call(arguments, 0);
    for (var i = 0, length = args.length; i < length; i++) {
        obj[args[i]['comName']] = args[i];
    }
    return {
        comArr: args,
        comObject: obj
    };
});