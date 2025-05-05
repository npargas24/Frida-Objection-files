Java.perform(function () {
    var Resources = Java.use("android.content.res.Resources");

    Resources.getString.overload('int').implementation = function (id) {
        var result = this.getString(id);
        console.log("getString called with id: " + id + " => " + result);
        return result;
    };
});
