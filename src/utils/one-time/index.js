'use strict';

module.exports = function one(fn) {
    var called = 0, value;

    function onetime() {
        if (called) return value;

        called = 1;
        value = fn.apply(this, arguments);
        fn = null;

        return value;
    }

    onetime.displayName = fn.displayName || fn.name || onetime.displayName || onetime.name;
    return onetime;
};