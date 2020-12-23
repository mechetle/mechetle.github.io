// todo: iradicate jquery:
        // when document ready execute:
        $(document).ready(function () {
            $('.navigation .grid-container').attr("style", "opacity: 1");
            console.log('prepared dropdown nav thingo');
            $('header .text-wrapper').attr("style", "opacity: 1");
            $('.navbar-dropdown-wrap').hide();
            $('.nav-megaDropdown-bg').attr("style", "display: block");
        });        

        function focusOnNavHead() {
            $('.nav-header-main .navigation-button-wrap').attr("style", "box-shadow: none");
            $('.nav-header-main .logo-space img').attr("style", "transform: translateY(-3px) scale(0.5);");
            $('header').attr("style", "outline: rgba(11,35,61,0.025) 62px solid; outline-offset: -60px;");
            $('#header-wrapper').attr("style", "transform: scale(0.8); opacity: 0.2;");
            $('.border-top-naturalize, .border-bottom-naturalize').attr("style", "background:rgba(11,35,61,0.025)");
            $('#swave-wrapper').attr("style", "opacity: 0.10;filter: grayscale(90%) blur(25px); transform:scale(0.85);");
        }
        function focusOffNavHead() {
            $('.nav-header-main .navigation-button-wrap').removeAttr("style");
            $('.nav-header-main .logo-space img').removeAttr("style");
            $('header').removeAttr("style");
            $('.border-top-naturalize, .border-bottom-naturalize').removeAttr("style"); //these need to be readjusted
            $('#header-wrapper').removeAttr("style");
            $('#swave-wrapper').attr("style", "opacity: 1;filter: grayscale(0%) blur(0); transform:scale(1)");
        }
        var mobileRes = window.matchMedia("(max-width: 39.9375em)");
        const viewportHeight = window.innerHeight;

        $('.nav-megaDropdown-bg').parent().hover( // gets parent of .nav-megaDropdown-bg, this causes problems because it makes the parent big.
            function (e) {
                //console.log('Hovered');
                $('.navbar-dropdown-wrap').show(0, function () {
                    $(this).addClass("nav-drop-hover");
                    $('.nav-megaDropdown-bg').attr("style", "display: block");
                    if (mobileRes.matches) {
                        // window width is mobile
                    } else {
                        // window width is not mobile
                        focusOnNavHead();
                    }

                });


                $(this).addClass("nav-drop-hover-wrapper"); //for link underline

            }, // over

            function (e) {
                $('.nav-megaDropdown-bg').parent().removeClass("nav-drop-hover-wrapper"); //for link underline
                $('.navbar-dropdown-wrap').removeClass("nav-drop-hover").toggleClass("transition-begone");
                if (mobileRes.matches) {
                    // window width is mobile
                } else {
                    // window width is not mobile
                    focusOffNavHead();
                }

                $(".transition-begone").on("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd",
                    function (e) {
                        //$(this).fadeOut(200);
                        //$(this).off(e);
                    });
            } // out


        );
        
        let hmbgrStat = 0;
        $(".nav-hamburger").click(function () {
            $(".nav-primary").toggleClass("active");
            $("html").toggleClass("noScroll");
            hmbgrStat ^= 1; //toggle value
            hmbgrStat == 0 ? focusOffNavHead() :
                focusOnNavHead(); // if hamburger menu status is 0 then do those functions lol.
        });

        // animations //
        // text logo nav
        var textLogo = anime.timeline({
            easing: "spring(0.7, 100, 10, 0)",
            duration: 400,
            delay: anime.stagger(30),
            loop: false,
            autoplay: false,
        });
        textLogo
            .add({
                targets: '.logo-text .letter',
                opacity: 1,
                translateY: [-200, 0],
                translateZ: 0
            })

        let ta = 0,
            tah = 0;

        //// text logo header in
        var textLogoHeader = anime.timeline({
            easing: "spring(0.7, 100, 10, 4)",
            duration: 400,
            delay: anime.stagger(50),
            loop: false,
            autoplay: false,
        });

        $(document).ready(function () {
            textLogoHeader
                .add({
                    targets: '.header-letter',
                    opacity: 1,
                    translateY: [-viewportHeight , 0],  // make -1000 to the height of the window - done
                })
        });


        function animationToggleNavText() {
            if (ta == 0) {
                textLogo.play();
                ta = 1;
            }
        };

        function animationToggleHeadText() {
            if (0 == tah) {
                textLogoHeader.play();
                tah = 1;
            }
        };
        //// navigation bar switching
        $(window).scroll(function () {
            var scroll = $(this).scrollTop();

            if (scroll >= $('section, #main').offset().top) {
                $('.nav-primary').removeClass("nav-header-main");
                $('.nav-primary > .grid-container ').removeClass("fluid");

                animationToggleNavText();
                tah = 0;

            } else {
                $('.nav-primary').addClass("nav-header-main");
                $('.nav-primary > .grid-container ').addClass("fluid");
                ta = 0;
                // console.log("test" + scroll);

                if (scroll > 100) {
                    // console.log("scroll higher than 400");
                    animationToggleHeadText();
                }
            }
        });
