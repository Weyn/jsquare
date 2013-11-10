/**
 * Author: Maciek Węgrecki
 * Mail: maciek.wegrecki@gmail.com
 * Date: 11/8/13
 * Time: 8:56 PM
 */

//TODO::optimize

$(function ($, window, document, undefined) {
    'use strict';

    // TODO::handle settings param and rename antions.
    var jSquare = function(container, settings) {
        var images = $(container + ' li img'),
            container = $(container),
            actions = $(document),
            current = 0,
            containerWidth = 1000,
            framesCounter = 0,
            mouseX = 0,
            mouseY = 0,
            animatonSpeed = 10;


        actions.init = function()
        {
            this.build();
            this.print();
        }

        actions.build = function()
        {
            container.hide();
            container.after('<div class="jSquare"></div>');
        }

        //TODO::refactor to grid base on absolute positions
        actions.print = function()
        {
            var content = '';
            for (var i = 0; i < images.length; i++) {
                var square = images[i];
                square.setAttribute('width', 200);
                square.setAttribute('height', 200);
                content += square.outerHTML;
            }
            $('.jSquare').html(content);
        }

        // TODO::refactor margins to positions.
        actions.update = function()
        {
            var ratio = 50 / 1920;
            var centerX = 1847 / 2;
            var centerY = 490 / 2;

            var mT = (centerY - mouseY) * 0.02 + 20;
            var mR = (centerX - mouseX) * 0.02 + 20;
            var mB = (centerY - mouseY) * 0.02 + 20;
            var mL = (centerX - mouseX) * 0.02 + 20;

            console.log(mT+"||"+mR+"||"+mB+"||"+mL);

            $(".jSquare img").each(function() {

                $(this).css({
                    'marginTop': mT,
                    'marginRight': mR,
                    'marginBottom': mB,
                    'marginLeft': mL
                });
////                *-
////                --
//                if(mouseX < centerX && mouseY < centerY){
//                }
////                -*
////                --
//                if(mouseX >= centerX && mouseY < centerY){
//                }
////                --
////                *-
//                if(mouseX < centerX && mouseY > centerY){
//                }
////                --
////                -*
//                if(mouseX >= centerX && mouseY > centerY){
//                }

            });
        }

//        //FOR DIV
//        function fixPageXY(e) {
//            if (e.pageX == null && e.clientX != null ) {
//                var html = document.documentElement
//                var body = document.body
//
//                e.pageX = e.clientX + (html.scrollLeft || body && body.scrollLeft || 0)
//                e.pageX -= html.clientLeft || 0
//
//                e.pageY = e.clientY + (html.scrollTop || body && body.scrollTop || 0)
//                e.pageY -= html.clientTop || 0
//            }
//        }


        window.onmousemove = handleMouseMove;
        function handleMouseMove(event) {
            event = event || window.event;

            mouseX = event.clientX;
            mouseY = event.clientY;
            if(framesCounter % 10 == 0){
                actions.update();
                framesCounter = 0;
            }
            framesCounter++;
//            console.log(mouseX + '||' + mouseY);
        }

        actions.init();
    }

    $.fn.jSquare = function () {
        var params =Array.prototype.slice.call(arguments, 0);
        jSquare(params[0], params[1]);
    }

}(jQuery, this, this.document));