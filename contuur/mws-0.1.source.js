(function($) {
    $.fn.initializeMDSSlides = function(oParameters) {
        var oSettings = $.extend({
            fSlideOnResize : function(nTop){},
            fSlideOnSlide : function(nTop){},
            fSlideOnShow : function(nTop){},
            fSlideOnHide : function(nTop){},
            sSlideSelector       : ".one_slide",
        }, oParameters);

        function slideIsVisible(jqSlide){
            var nOverallTop = $(document).scrollTop();
            var nOverallBottom = nOverallTop + $(window).height();
            var nSlideOffset = jqSlide.offset();
            var nSlideTop = nSlideOffset.top;
            var nTopToPassToHandlers = nSlideTop - $(document).scrollTop();
            var nSlideBottom = nSlideTop + jqSlide.height();
            var bSlideIsVisible = (((nSlideTop >= nOverallTop) && (nSlideTop <= nOverallBottom)) ||
                          ((nSlideBottom >=nOverallTop) && (nSlideBottom <=nOverallBottom)) ||
                          ((nSlideTop <= nOverallTop) && (nSlideBottom >= nOverallBottom)));
            if(bSlideIsVisible){
                if(!(jqSlide.hasClass("visible"))){
                    jqSlide.addClass("visible");
                    if(typeof(oSettings.fSlideOnShow) === "function"){
                        oSettings.fSlideOnShow.apply(jqSlide[0], [nTopToPassToHandlers]);
                    }
                    else if(typeof(oSettings.fSlideOnShow[jqSlide.attr("id")]) === "function"){
                        oSettings.fSlideOnShow[jqSlide.attr("id")].apply(jqSlide[0], [nTopToPassToHandlers]);
                    }
                }
            }
            else{
                if(jqSlide.hasClass("visible")){
                    jqSlide.removeClass("visible");
                    if(typeof(oSettings.fSlideOnHide) === "function"){
                        oSettings.fSlideOnHide.apply(jqSlide[0], [nTopToPassToHandlers]);
                    }
                    else if(typeof(oSettings.fSlideOnHide[jqSlide.attr("id")]) === "function"){
                         oSettings.fSlideOnHide[jqSlide.attr("id")].apply(jqSlide[0], [nTopToPassToHandlers]);
                    }
                }
            }
            return bSlideIsVisible;
        }

        function calculateSlideTopPosition(jqSlide){
            return jqSlide.offset().top - $(document).scrollTop();
        }
        
        //Теперь у нас этот элемент - коллекция слайдов.
        return this.each(function(nNumber, eElement){
            (function(){
                var jqSlideContainer = $(eElement);

                var jqSlides = jqSlideContainer.find(oSettings.sSlideSelector);

                jqSlides.each(function(nNumber, eElement){
                    var bIsVisible = slideIsVisible($(eElement));
                    $(document).scroll(function(){
                    	var jqThis = $(eElement);
                        if(slideIsVisible(jqThis) && ((typeof(oSettings.fSlideOnSlide) === "function") ||
                            (typeof(oSettings.fSlideOnSlide[jqThis.attr("id")]) === "function"))){
                            var nCalculatedTopPercentage = calculateSlideTopPosition(jqThis);
                            if(typeof(oSettings.fSlideOnSlide) === "function"){
                                oSettings.fSlideOnSlide.apply(jqThis[0], [nCalculatedTopPercentage])
                            }
                            else{
                                oSettings.fSlideOnSlide[jqThis.attr("id")].apply(jqThis[0], [nCalculatedTopPercentage]);
                            }
                        }
                    });

                    $(window).resize(function(){
                        var jqThis = $(eElement);
                        var nCalculatedTopPercentage = calculateSlideTopPosition(jqThis);
                        if(slideIsVisible(jqThis)){
                            if(typeof(oSettings.fSlideOnResize === "function")){
                                oSettings.fSlideOnResize.apply(jqThis[0], [nCalculatedTopPercentage]);
                            }
                            else if(typeof(oSettings.fSlideInResize[jqThis.attr("id")])){
                                oSettings.fSlideOnResize[jqThis.attr("id")].apply(jqThis[0], [nCalculatedTopPercentage]);
                            }
                        }
                    });
                });
            })();
        });
    };
 }(jQuery));