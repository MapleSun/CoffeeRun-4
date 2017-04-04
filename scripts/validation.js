(function(window) {
    'use strict';
    var App = window.App || {};
    var $ = window.jQuery;
    var Validation = {
        isCompanyEmail: function(email) {
            return /.+@bignerdranch\.com$/.test(email);
        },
        isDecaf: function(strength, decafString) {
            var containsDecaf = /.*decaf.*/.test(decafString);
            var tooStrong = (strength > 20);
            return !(containsDecaf && tooStrong);
        },
        isExistEmail: function(email, remoteDS) {
            var promise = remoteDS.getAll() // return a deferred
            .then(function(orders) {
                var dtd = $.Deferred();
                var customerIdArray = Object.keys(orders);
                customerIdArray.forEach(function(id) {
                    if(email == orders[id].emailAddress) {
                        console.log(orders[id].emailAddress);
                        // reject change the promise states, and immediatly invoke fail function
                        dtd.reject();
                    }
                });
                // same as reject, if no record match invoke the done function in formhandler
                dtd.resolve();
                return dtd.promise();
            });

            return promise;
        }
    };

    App.Validation = Validation;
    window.App = App;
})(window);
