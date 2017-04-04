(function(window) {
    'use strict';
    var App = window.App || {};
    var $ = window.jQuery;
    var NUM_SELECTOR = '#strengthNum';
    var SLIDER_SELECTOR = '#strength';

    function FormHandler(selector) {
        if (!selector) {
            throw new Error('No selector provided');
        }
        this.$formElement = $(selector);
        this.$sliderElement = $(SLIDER_SELECTOR);
        this.$numElement = $(NUM_SELECTOR);
        this.achievement = ['a@b.com'];
        if (this.$formElement.length === 0) {
            throw new Error('Could not find element with selector: ' + selector);
        }
    }

    FormHandler.prototype.addSubmitHandler = function(fn) {
        var form = this;
        console.log('Setting submit handler for form');
        // hide achievement option
        $('.achievementOpt').hide();
        //console.log("Setting up handler for submit");
        //console.log('this', this);
        //console.log('this.$formElement', this.$formElement);
        this.$formElement.on('submit', function (event) {
            event.preventDefault();
            console.log('I am in the submit handler');
            //console.log(event.isDefaultPrevented());
            //console.log(event.isDefaultPrevented());
            var data = {};
            $(this).serializeArray().forEach(function(item) {
                data[item.name] = item.value;
                data['id'] = data['emailAddress'];
                console.log(item.name + ' is ' + item.value);
                // check the order info, make sure does this order match achievement
                if (form.achievement.indexOf(data['emailAddress']) == -1) {
                    if (data['size'] == 'Coffee-zilla' && data['strength'] == '100') {
                        $('#achieveModal').modal('show');
                        form.achievement.push(data['emailAddress']);
                    }
                }
            });
            console.log(data);
            fn(data)
            .then(function (){
                this.reset();
                this.elements[0].focus();
            }.bind(this));
            form.changeColor(parseInt($(form.$sliderElement).val()));
        });
    };


    FormHandler.prototype.addInputHandler = function(fn, fn2) {
        console.log('Setting input handler for form');
        this.$formElement.on('input', '[name="emailAddress"]', function(event) {
            event.preventDefault();
            event.stopPropagation();
            var emailAddress = event.target.value;
            var message = '';
            var SERVER_URL = 'http://localhost:3002/coffeeorders';
            var remoteDS = new App.RemoteDataStore(SERVER_URL);

            if(fn(emailAddress)){
                $.when(fn2(emailAddress, remoteDS))
                .done(function(){
                    event.target.setCustomValidity('');
                })
                .fail(function(){
                    message = emailAddress + ' is already registed';
                    event.target.setCustomValidity(message);
                });
            }else{
                message = emailAddress + ' is not an authorized email address!';
                event.target.setCustomValidity(message);
            }



        });

        //  validation for remoteDS


        /*
        // This is the validation for decaf.
        this.$formElement.on('input', '[name="strength"], [name="coffee"]', function(event) {
            event.preventDefault();
            var $coffeeSelector = $('[name="coffee"]');
            var $strengthSelector = $('[name="strength"]');
            var coffee = $coffeeSelector.val();
            var strength = $strengthSelector.val();
            strength = parseInt(strength);

            var message = '';
            if (fn2(strength, coffee)) {
                event.target.setCustomValidity('');
            } else {

                if (event.target === $strengthSelector.get(0)) {
                    coffee = $coffeeSelector.val();
                    strength = $strengthSelector.val();
                    message = coffee + ' cannot have caffeine rating of ' + strength;
                    event.preventDefault();
                    //console.log($coffeeSelector.get(0));
                    $coffeeSelector.get(0).setCustomValidity('');
                    $strengthSelector.get(0).setCustomValidity(message);
                } else if (event.target === $coffeeSelector.get(0)) {
                    event.preventDefault();
                    coffee = $coffeeSelector.val();
                    strength = $strengthSelector.val();
                    message = coffee + ' cannot have caffeine rating of ' + strength;
                    $coffeeSelector.get(0).setCustomValidity(message);
                    $strengthSelector.get(0).setCustomValidity('');
                }
            }
        });
        */
    };

/*
    FormHandler.prototype.addDecafInputHandler = function(fn) {
        console.log('Setting coffee input handler for form');
        //this.$formElement.on('input', function(event) {
        this.$formElement.on('input', '[name="coffee"], [name="strength"]', function(event) {
            event.preventDefault();
            var $coffeeSelector = $('[name="coffee"]');
            var $strengthSelector = $('[name="strength"]');
            var coffee = $coffeeSelector.val();
            var strength = $strengthSelector.val();
            strength = parseInt(strength);

            var message = '';
            if (fn(strength, coffee)) {
                event.target.setCustomValidity('');
            } else {
                message = coffee + ' cannot have caffeine rating of ' + strength;
                if (event.target === $strengthSelector.get(0)) {
                    //console.log($coffeeSelector.get(0));
                    $coffeeSelector.get(0).setCustomValidity('');
                    $strengthSelector.get(0).setCustomValidity(message);
                } else if (event.target === $coffeeSelector.get(0)) {

                    $coffeeSelector.get(0).setCustomValidity(message);
                    $strengthSelector.get(0).setCustomValidity('');
                }
            }
        });
    }; // end addCoffeeInputHandler(fn)
    */


    FormHandler.prototype.changeColor = function(strength) {
        var textColor;
        if (strength < 34) {
            var green = 200 + strength;
            textColor = 'rgb(0,' + green + ',0)';
        } else if (strength > 33 && strength < 67) {
            var yellow = 255 - strength;
            textColor = 'rgb(' + yellow + ',' + yellow + ',0)';
        } else {
            var red = 155 + strength;
            textColor = 'rgb(' + red + ',0,0)';
        }
        console.log(textColor);
        this.$numElement.css('color', textColor);
        this.$numElement.text(strength);
    };

    FormHandler.prototype.addSliderHandler = function() {
        //var form = this;
        var slider = this.$sliderElement;
        this.changeColor(parseInt(slider.val()));
        slider.on('click', function(event) {
            event.preventDefault();
            this.changeColor(parseInt(slider.val()));
        }.bind(this));

    };

    FormHandler.prototype.emailInput = function() {
        //var form = this;
        var emailInput = $('#emailInput');
        emailInput.on('focusout', function(event) {
            event.preventDefault();
            if (this.achievement.indexOf(emailInput.val()) != -1) {
                $('.achievementOpt').show();
            } else {
                $('.achievementOpt').hide();
            }
        }.bind(this));
        // the bind change the this(emailInput) in the function to another this(form)

    };



    App.FormHandler = FormHandler;
    window.App = App;
})(window);
