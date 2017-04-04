(function(window){
    'use strict';
    var App = window.App || {};
    var $ = window.jQuery;
    var NUM_SELECTOR='#strengthNum';
    function SliderHandler(selector){
        if(!selector) {
            throw new Error('No selector provided');
        }
        this.$sliderElement = $(selector);
        console.log(this.$sliderElement);
        this.$numElement = $(NUM_SELECTOR);
        this.changeColor(parseInt(this.$sliderElement.val()));
        if (this.$sliderElement.length === 0){
            throw new Error('Could not find element with selector: ' + selector);
        }
    }

    SliderHandler.prototype.changeColor = function (strength) {
        var textColor;
        if(strength < 34) {
            var green = 200+strength;
            textColor = 'rgb(0,' +green+ ',0)';
        }else if(strength > 33 && strength < 67) {
            var yellow = 255-strength;
            textColor = 'rgb('+yellow+','+yellow+',0)';
        }else{
            var red = 155+strength;
            textColor = 'rgb('+red+',0,0)';
        }
        console.log(textColor);
        this.$numElement.css('color',textColor);
        this.$numElement.text(strength);
    };

    SliderHandler.prototype.addSliderChange = function (){
        var slider = this;
        this.$sliderElement.on('click', function (event){
            event.preventDefault();
            //num.text($(this).val()); // this is slide
            slider.changeColor(parseInt($(this).val()));
        });

    };

    App.SliderHandler = SliderHandler;
    window.App = App;
})(window);
