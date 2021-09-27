jQuery.validator.addMethod("usPhoneFormat", function(value, element) {
    return this.optional(element) || /[\+]\d{1}[\(]\d{3}[\)]\d{3}[\-]\d{4}/.test(value);
}, "Enter a valid phone number.");

$(window).load(function() {
    if ($(window).width() < 992) {
        $('.mobowl').addClass('owl-carousel')
        $('.mobowl').owlCarousel({
            loop: true,
            margin: 10,
            freeDrag:false,
            autoHeight: true,
            navClass: ['mob_owl_prev', 'mob_owl_next'],
            navText: ['', ''],
            nav: true,
            dots: false,
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 1
                },
                1000: {
                    items: 1
                }
            }
        });
    }
});

$(document).ready(function() {
    var mainsl = $('.mainslider');
    var overmc = $('.overowl1');
    $("input[name='phone']").inputmask("+7(999)999-9999");
    overmc.owlCarousel({
        loop: false,
        margin: 30,
        navClass: ['owl-prev1', 'owl-next1'],
        navText: ['', ''],
        nav: true,
        dots: false,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 1
            },
            1000: {
                items: 1
            }
        }
    });
    $('.owl-next1').parent().addClass('parentowl')
    mainsl.owlCarousel({
        loop: true,
        margin: 0,
        touchDrag  : false,
        mouseDrag  : false,
        navText: ['', ''],
        nav: true,
        dots: false,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 1
            },
            1000: {
                items: 1
            }
        }
    });

    $('.mainslider').each(function() {
        var slidemain = $(this);
        slidemain.on('changed.owl.carousel', function(property) {
            var current = property.item.index;
            var src = $(property.target).find(".owl-item").eq(current).find(".slide_img").css('background-image').replace(/^url\(['"](.+)['"]\)/, '$1');

            $(slidemain).find('.owl-prev').css("background-image", "url(" + src + ")");
            $(slidemain).find('.owl-next').css("background-image", "url(" + src + ")");

        });
    });
    $(".check_wrp").click(function() {
        $(this).addClass('checked')
        $(this).parent().parent().parent().find('.check_wrp').not(this).removeClass('checked');

    });
    var counter = 1;
    $(document).on("input", ".square", function() {
    this.value = this.value.replace(/\D/g,'');
});
    var punkt6;
    $(".childstep").click(function() {
        
        var punkt1;
        var punkt2;
        var punkt3;
        var punkt4;
        var punkt5;
        

        if (!$('.step' + counter + ' .check_wrp').hasClass('checked') && !$('.square').val()) {
            $('.errormes').show()
        } else {
            counter++;
            if(counter > 1) {
            $('.prevstep').addClass('shown')
        }else {
            $('.prevstep').removeClass('shown')
            $('.hidesix .nextstep').removeClass('hidedbut');
            
            }
            $('.steps .stepdiv').addClass('hided')
            $('.steps .step' + counter + '').removeClass('hided');

            if (counter == 7) {
                $('.hidesix .nextstep').addClass('hidedbut');
                $('.stepind').hide()
            }else {
                $('.hidesix .nextstep').removeClass('hidedbut');
                $('.stepind').show()
            }
            
            
            
            if (counter == 6) {
                $('.childstep').text('К результату')
            }else {
                
                $('.childstep').html('к следующему шагу <img src="img/arnext.png" alt="">')
            }
            
            $('.steps li:nth-child(' + counter + ')').addClass('active');
            $('.stepind p span').text(counter);
            $(".stepind img").attr("src", "img/st" + counter + ".png");
            $('.errormes').hide();
            punkt1 = $('.step1').find('.checked p').text();
            punkt2 = $('.step2').find('.checked p').text();
            punkt3 = $('.step3').find('.checked p').text();
            punkt4 = $('.step4').find('.checked p').text();
            punkt5 = $('.step5').find('.checked p').text();
            
            $('.chosen').val(punkt1 + ', ' + punkt2 + ', ' + punkt3 + ', ' + punkt4 + ', ' + punkt5 + ', ' + punkt6)

        }
    });
    
    
    
    
    $(".prevstep").click(function() {
        var punkt1;
        var punkt2;
        var punkt3;
        var punkt4;
        var punkt5;
        
            counter--;
        if(counter > 1) {
            $('.prevstep').addClass('shown')
        }else {
            $('.prevstep').removeClass('shown')
            $('.hidesix .nextstep').removeClass('hidedbut');
        }
            $('.steps .stepdiv').addClass('hided')
            $('.steps .step' + counter + '').removeClass('hided');

            if (counter == 7) {
                $('.hidesix .nextstep').addClass('hidedbut');
                $('.stepind').hide()
            }else {
                $('.hidesix .nextstep').removeClass('hidedbut');
                $('.stepind').show()
            }
        
            if (counter == 6) {
                $('.childstep').text('К результату')
            }else {
                $('.childstep').html('к следующему шагу <img src="img/arnext.png" alt="">')
            }
            $('.steps li:nth-child(' + counter + ')').addClass('active');
            $('.stepind p span').text(counter);
            $(".stepind img").attr("src", "img/st" + counter + ".png");
            $('.errormes').hide();
            punkt1 = $('.step1').find('.checked p').text();
            punkt2 = $('.step2').find('.checked p').text();
            punkt3 = $('.step3').find('.checked p').text();
            punkt4 = $('.step4').find('.checked p').text();
            punkt5 = $('.step5').find('.checked p').text();
            
            $('.chosen').val(punkt1 + ', ' + punkt2 + ', ' + punkt3 + ', ' + punkt4 + ', ' + punkt5 + ', ' + punkt6)

        
    });
    $('.square').change( function() {
    punkt6 = $(this).val()
});

    $(document).on('click', '.topnav a[href^="#"]', function(event) {
        event.preventDefault();

        $('html, body').animate({
            scrollTop: $($.attr(this, 'href')).offset().top
        }, 500);
    });

    $(".form1").validate({
        rules: {
            phone: {
                required: true,
                usPhoneFormat: true,
            }
        },
        submitHandler: function(form) {
            $.ajax({
                type: "POST",
                url: "mail.php",
                data: $(".form1").serialize(),
                success: function(html) {
                    $('#t').modal('toggle');
                }
            });
            return false;
        }
    });

    $(".form2").validate({
        rules: {
            phone: {
                required: true,
                usPhoneFormat: true,
            },
            mail: {
                required: true,
                email: true,
            }
        },
        submitHandler: function(form) {
            $.ajax({
                type: "POST",
                url: "mail.php",
                data: $(".form2").serialize(),
                success: function(html) {
                    $('#t').modal('toggle');
                }
            });
            return false;
        }
    });

    $(".form3").validate({
        rules: {
            phone: {
                required: true,
                usPhoneFormat: true,
            }
        },
        submitHandler: function(form) {
            $.ajax({
                type: "POST",
                url: "mail.php",
                data: $(".form3").serialize(),
                success: function(html) {
                    $('#m1').modal('toggle');
                    $('#t').modal('toggle');
                }
            });
            return false;
        }
    });
    $(".form4").validate({
        rules: {
            phone: {
                required: true,
                usPhoneFormat: true,
            }
        },
        submitHandler: function(form) {
            $.ajax({
                type: "POST",
                url: "mail.php",
                data: $(".form4").serialize(),
                success: function(html) {
                    
                    $('#t').modal('toggle');
                }
            });
            return false;
        }
    });
    



});