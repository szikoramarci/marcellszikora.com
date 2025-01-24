
$(function(){

    $(window).on('load', function () {
        $('.page-loader').delay('500').fadeOut(1000);
    });

    $(document).ready(function() {

        $(document).on('click', '.icon-menu', function() {
            $('.responsive-sidebar-menu').addClass('active');
        });
        $(document).on('click', '.responsive-sidebar-menu .overlay', function() {
            $('.responsive-sidebar-menu').removeClass('active');
        });

        $(document).on('click', '.menu li .scroll-to', function() {
            $('.responsive-sidebar-menu').removeClass('active');
        })


        $(document).on('click', ".color-boxed a", function() {
            $(".color-boxed a").removeClass("clr-active");
            $(this).addClass("clr-active");
        });
        
        $(document).on('click', ".global-color .setting-toggle", function() {
            $(".global-color").addClass("active");
        });

        $(document).on('click', ".global-color .inner .overlay, .global-color .inner .global-color-option .close-settings", function() {
            $(".global-color").removeClass("active");
        });        
        
        lightGallery(document.getElementById('websites'), {
            licenseKey: 'FJY9Y-84WUW-UNTPU-ZTBFG',
            selector: 'a',
            speed: 500,
            plugins: [lgZoom, lgThumbnail],
            mobileSettings: { showCloseIcon: true }
        });

        lightGallery(document.getElementById('admins'), {
            licenseKey: 'FJY9Y-84WUW-UNTPU-ZTBFG',
            selector: 'a',
            speed: 500,
            plugins: [lgZoom, lgThumbnail],
            mobileSettings: { showCloseIcon: true }
        });

        lightGallery(document.getElementById('ecommerce'), {
            licenseKey: 'FJY9Y-84WUW-UNTPU-ZTBFG',
            selector: 'a',
            speed: 500,
            plugins: [lgZoom, lgThumbnail],
            mobileSettings: { showCloseIcon: true }
        });

        lightGallery(document.getElementById('portals'), {
            licenseKey: 'FJY9Y-84WUW-UNTPU-ZTBFG',
            selector: 'a',
            speed: 500,
            plugins: [lgZoom, lgThumbnail],
            mobileSettings: { showCloseIcon: true }
        });
        

    });

    $(window).scroll(function() {
            
        var windscroll = $(window).scrollTop();

        if (windscroll >= 0) {
            $('.scroll-to-page').each(function(i) {

                var wscrolldecress = windscroll + 1;                
                if ($(this).position().top <= wscrolldecress - 0) {
                    $('.scroll-nav .scroll-to.active').removeClass('active');
                    $('.scroll-nav .scroll-to').eq(i).addClass('active');
                    $('.scroll-nav-responsive a.active').removeClass('active');
                    $('.scroll-nav-responsive a').eq(i).addClass('active');
                }
            });

        } else {
            $('.scroll-nav .scroll-to.active').removeClass('active');
            $('.scroll-nav .scroll-to:first').addClass('active');
            $('.scroll-nav-responsive a.active').removeClass('active');
            $('.scroll-nav-responsive a:first').addClass('active');
        }

    }).scroll();

    if ($('.testimonial-slider').length) {
        var testimonial = $('.testimonial-slider').owlCarousel({
            items: 1,
            margin: 30,
            stagePadding: 0,
            smartSpeed: 450,
            autoHeight: true,
            loop: false,
            nav: false,
            dots: false,
            onInitialized  : counter, //When the plugin has initialized.
            onTranslated : counter //When the translation of the stage has finished.
        });

        $('.testimonial-nav .next').on('click', function() {
            testimonial.trigger('next.owl.carousel');
        })
        $('.testimonial-nav .prev').on('click', function() {
            testimonial.trigger('prev.owl.carousel', [300]);
        })


        function counter(event) {
            var element   = event.target;         // DOM element, in this example .owl-carousel
            var items     = event.item.count;     // Number of items
            var item      = event.item.index + 1;     // Position of the current item
        
        // it loop is true then reset counter from 1
        if(item > items) {
                item = item - items
        }
        $('#testimonial-slide-count').html("<span class='left'>"+item+"</span> / "+items)
        }
    }    

    window.addEventListener('scroll', {
        scroll_animations,
    });

});



function scroll_animations() {
    // var allow_on_mobile = !0;
    // if (typeof config_scroll_animation_on_mobile !== "undefined") allow_on_mobile = config_scroll_animation_on_mobile;
    // if (allow_on_mobile == !1 && is_mobile_device) return;
    var defaults = {
        duration: 1.2,
        ease: "power4.out",
        animation: "fade_from_bottom",
        once: !1,
    };
    gsap.utils.toArray(".scroll-animation").forEach(function (box) {
        var gsap_obj = {};
        var settings = {
            // ease: box.dataset.animationEase || defaults.ease,
            duration: box.dataset.animationDuration || defaults.duration,
        };
        var animations = {
            fade_from_bottom: {
                y: 180,
                opacity: 0,
            },
            fade_from_top: {
                y: -180,
                opacity: 0,
            },
            fade_from_left: {
                x: -180,
                opacity: 0,
            },
            fade_from_right: {
                x: 180,
                opacity: 0,
            },
            fade_in: {
                opacity: 0,
            },
            rotate_up: {
                y: 180,
                rotation: 10,
                opacity: 0,
            },
        };
        var scroll_trigger = {
            scrollTrigger: {
                trigger: box,
                once: defaults.once,
                start: "top bottom+=20%",
                // start: "top bottom+=5%",
                toggleActions: "play none none reverse",
                markers: !1,
            },
        };
        jQuery.extend(gsap_obj, settings);
        jQuery.extend(gsap_obj, animations[box.dataset.animation || defaults.animation]);
        jQuery.extend(gsap_obj, scroll_trigger);
        gsap.from(box, gsap_obj);
    });
}
scroll_animations();

(function ($) {
    'use strict';
    var form = $('.contact-form'),
        message = $('.messenger-box-contact__msg'),
        form_data;

    // Success function
    function done_func(response) {
        message.fadeIn().removeClass('alert-danger').addClass('alert-success');
        message.text(response);
        setTimeout(function () {
            message.fadeOut();
        }, 3000);
        form.find('input:not([type="submit"]), textarea').val('');
    }

    // fail function
    function fail_func(data) {
        message.fadeIn().removeClass('alert-success').addClass('alert-success');
        message.text(data.responseText);
        setTimeout(function () {
            message.fadeOut();
        }, 3000);
    }
    
    form.submit(function (e) {
        e.preventDefault();

        
        const message = document.getElementById('required-msg');

        const fullName = document.getElementById("full-name");
        const email = document.getElementById("email");        

        if (!fullName.value || !email.value) {
            message.classList.add('show');
            fullName.classList.add("invalid");            
            return false
        }
        message.classList.remove('show');

        const formDataArray = $(this).serializeArray(); // Form mezők tömbként
        const formDataObject = {};

        // A formDataArray-t átalakítjuk egy kulcs-érték párokat tartalmazó objektummá
        formDataArray.forEach(item => {
            formDataObject[item.name] = item.value;
        });

        // JSON konvertálás
        const jsonData = JSON.stringify(formDataObject);
        console.log(formDataObject, jsonData)

        $.ajax({
            type: 'POST',
            url: form.attr('action'),
            data: jsonData, // JSON adatok
            contentType: 'application/json', // A tartalom típusa JSON
        })
        .done(done_func)
        .fail(fail_func);
    });
    
})(jQuery);