//Delay Class => .animate__faster added
//  class="animate__animated animate__faster"
// <link rel="stylesheet" href="animate.min.css"/>
let HelperPopUp = (function() {
    let element, showing_animation_class, closing_animation_class;

    function HelperPopUp(element_id, showing_animation_class, closing_animation_class) {
        this.element = $(element_id);
        this.showing_animation_class = showing_animation_class;
        this.closing_animation_class = closing_animation_class;
        this.element.addClass("animate__animated animate__faster")
    }

    function setElementClass(add_class, remove_class){
        this.element.addClass(add_class);
        this.element.removeClass(remove_class);
    }

    HelperPopUp.prototype.Open = function() {
        try{
            setElementClass(this.showing_animation_class, this.closing_animation_class);
            this.element.show(0);
        }catch (exception){ return exception;}
    }

    HelperPopUp.prototype.Close = function() {
        try{
            setElementClass(this.closing_animation_class, this.showing_animation_class);
            this.element.delay(500).hide(0);
        }catch (exception){ return exception;}
    }

    return HelperPopUp;
})();


