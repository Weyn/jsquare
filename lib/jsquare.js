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
            pages = new Array(),
            container = $(container),
            actions = $(document),
            grid = 4,
            margin = 25,
            squareSize = 200,
            current = 0,
            containerWidth = 1000,
            framesCounter = 0,
            mouseX = 0,
            mouseY = 0,
            animatonSpeed = 10;


        actions.init = function()
        {
            this.build();
            this.printPage(0);
            //setTimeout(function(){actions.printPage(1)}, 3000);

            $('.jSquare_prev').click(function(){actions.printPrevPage()});
            $('.jSquare_next').click(function(){actions.printNextPage()});
        }

        actions.build = function()
        {
            container.hide();
            container.after('<div class="jSquare"></div>');
            container.after('<input type="button" class="jSquare_next" value=">> Next "/>');
            container.after('<input type="button" class="jSquare_prev" value="Prev <<"/>');

            var p = 0;
            var matrix = grid * grid;
            for(var i = 0; i < images.length; i++){
                if(i!=0 && i % matrix == 0){
                    p++;
                }
                if(pages[p] == null){
                    pages[p] = new Array();
                }
                images[i].setAttribute('style', 'left: -1000px; top: -1000px;');
                pages[p][i%matrix] = images[i];
            }
        }

        actions.printPage = function(pageNr)
        {
            current = pageNr;
            //actions.reverse();
            var length = pages[pageNr].length,
                level = -1;

            var content = '';
            for(var n = 0; n < length; n++){
                content += pages[pageNr][n].outerHTML;
                console.log(pages[pageNr][n].outerHTML);
            }
            $('.jSquare').html(content);
            actions.animate();
        }

        actions.printPrevPage = function(pageNr)
        {
            if(current != 0){
                this.printPage(current-1);
            }
        }

        actions.printNextPage = function(pageNr)
        {
            if(current != pages.length - 1){
                this.printPage(current+1);
            }
        }

        actions.animate = function()
        {
            var level = -1,
                i = 0;
            $(".jSquare img").each(function() {
                if(i % grid == 0){
                    level++;
                }
                $(this).animate({
                    'left' : (i % 4) * (squareSize + margin),
                    'top' : level * (squareSize + margin)
                }, {duration: 100 * (i + 1), queue: true});

                i++;
            });
        }
        actions.reverse = function()
        {
            var i = 1;
            $(".jSquare img").each(function() {
                $(this).hide();
//                $(this).animate({
//                    'left' : '-=1000',
//                    'top' : '-=1000'
//                }, {duration: 100 * i, queue: true});
                //i++;
            });
        }

        // TODO::refactor margins to positions.
        actions.update = function()
        {
            var ratio = 50 / 1920;
            var centerX = 1847 / 2;
            var centerY = 490 / 2;

            var mT = (centerY - mouseY) * 0.1 + margin;
            var mR = (centerX - mouseX) * 0.1 + margin;
            var mB = (centerY - mouseY) * 0.1 + margin;
            var mL = (centerX - mouseX) * 0.1 + margin;

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