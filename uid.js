define(function () {

    return function (prefix) {
        var id = Math.floor((Math.random() * 9999) + 1) + "-" + Math.floor((Math.random() * 9999) + 1) + "-" + Math.floor((Math.random() * 9999) + 1);
        return prefix ? prefix + "-" + id : id;
    }

});