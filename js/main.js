// lazyload
var _extends = Object.assign || function(e) { for (var t = 1; t < arguments.length; t++) { var n = arguments[t]; for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]) } return e },
    _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) { return typeof e } : function(e) { return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e };
! function(e, t) { "object" === ("undefined" == typeof exports ? "undefined" : _typeof(exports)) && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : e.LazyLoad = t() }(this, function() { "use strict"; var e = { elements_selector: "img", container: document, threshold: 300, data_src: "src", data_srcset: "srcset", class_loading: "loading", class_loaded: "loaded", class_error: "error", callback_load: null, callback_error: null, callback_set: null, callback_enter: null },
        t = function(e, t) { return e.getAttribute("data-" + t) },
        n = function(e, t, n) { return e.setAttribute("data-" + t, n) },
        r = function(e) { return e.filter(function(e) { return !t(e, "was-processed") }) },
        s = function(e, t) { var n, r = new e(t); try { n = new CustomEvent("LazyLoad::Initialized", { detail: { instance: r } }) } catch (e) {
                (n = document.createEvent("CustomEvent")).initCustomEvent("LazyLoad::Initialized", !1, !1, { instance: r }) } window.dispatchEvent(n) },
        o = function(e, n) { var r = n.data_srcset,
                s = e.parentNode; if ("PICTURE" === s.tagName)
                for (var o, a = 0; o = s.children[a]; a += 1)
                    if ("SOURCE" === o.tagName) { var i = t(o, r);
                        i && o.setAttribute("srcset", i) } },
        a = function(e, n) { var r = n.data_src,
                s = n.data_srcset,
                a = e.tagName,
                i = t(e, r); if ("IMG" === a) { o(e, n); var c = t(e, s); return c && e.setAttribute("srcset", c), void(i && e.setAttribute("src", i)) } "IFRAME" !== a ? i && (e.style.backgroundImage = 'url("' + i + '")') : i && e.setAttribute("src", i) },
        i = "classList" in document.createElement("p"),
        c = function(e, t) { i ? e.classList.add(t) : e.className += (e.className ? " " : "") + t },
        l = function(e, t) { i ? e.classList.remove(t) : e.className = e.className.replace(new RegExp("(^|\\s+)" + t + "(\\s+|jQuery)"), " ").replace(/^\s+/, "").replace(/\s+jQuery/, "") },
        u = function(e, t) { e && e(t) },
        d = function(e, t, n) { e.removeEventListener("load", t), e.removeEventListener("error", n) },
        f = function(e, t) { var n = function n(s) { _(s, !0, t), d(e, n, r) },
                r = function r(s) { _(s, !1, t), d(e, n, r) };
            e.addEventListener("load", n), e.addEventListener("error", r) },
        _ = function(e, t, n) { var r = e.target;
            l(r, n.class_loading), c(r, t ? n.class_loaded : n.class_error), u(t ? n.callback_load : n.callback_error, r) },
        v = function(e, t) { u(t.callback_enter, e), ["IMG", "IFRAME"].indexOf(e.tagName) > -1 && (f(e, t), c(e, t.class_loading)), a(e, t), n(e, "was-processed", !0), u(t.callback_set, e) },
        m = function(t, n) { this._settings = _extends({}, e, t), this._setObserver(), this.update(n) };
    m.prototype = { _setObserver: function() { var e = this; if ("IntersectionObserver" in window) { var t = this._settings;
                this._observer = new IntersectionObserver(function(n) { n.forEach(function(n) { if (n.isIntersecting || n.intersectionRatio > 0) { var r = n.target;
                            v(r, t), e._observer.unobserve(r) } }), e._elements = r(e._elements) }, { root: t.container === document ? null : t.container, rootMargin: t.threshold + "px" }) } }, update: function(e) { var t = this,
                n = this._settings,
                s = e || n.container.querySelectorAll(n.elements_selector);
            this._elements = r(Array.prototype.slice.call(s)), this._observer ? this._elements.forEach(function(e) { t._observer.observe(e) }) : (this._elements.forEach(function(e) { v(e, n) }), this._elements = r(this._elements)) }, destroy: function() { var e = this;
            this._observer && (r(this._elements).forEach(function(t) { e._observer.unobserve(t) }), this._observer = null), this._elements = null, this._settings = null } }; var b = window.lazyLoadOptions; return b && function(e, t) { if (t.length)
            for (var n, r = 0; n = t[r]; r += 1) s(e, n);
        else s(e, t) }(m, b), m });

var lazy = new LazyLoad({
    elements_selector: ".lazyload"
});

var lazy = new LazyLoad({
    threshold: 0,
    elements_selector: ".lazy-banner"
});

function toReal(value, str_cifrao) {
    return str_cifrao + ' ' + value.formatMoney(2, ',', '.');
}

 Number.prototype.formatMoney = function(precision = 2, decimal = '.', thousands = ',', withCurrency = false) {

    const placeholderRegex = /{{\s*(\w+)\s*}}/;
    const format           = 'R$ {{amount}}';

    let number = this.toFixed(precision);

    let parts         = number.split('.');
    let dollarsAmount = parts[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, `$1${thousands}`);
    let centsAmount   = parts[1] ? decimal + parts[1] : '';
    let value         = dollarsAmount + centsAmount;

    return (withCurrency) ? format.replace(placeholderRegex, value) : value;

};

var theme = {

    header: function() {
        jQuery('.footer .title').on('click', function() {
            jQuery(this).toggleClass('active');
        });

        jQuery('.bar-top .rastreio span').on('click', function() {
            jQuery(this).next().toggleClass('active');
        });

        jQuery('.rastreie input').on('keyup', function() {
            var text = jQuery(this).parent().attr('data-action').replace('{query}', jQuery(this).val());
            jQuery(this).parent().attr('action', text);
        });

        jQuery(document).on('click', function(event) {
            if (!jQuery(event.target).closest(".rastreio").length) {
                jQuery(".rastreio .modal-white").removeClass('active');
            }
        });

        jQuery('.list-nav > li .sub').on('click', function(e) {
            e.preventDefault();

            var a = jQuery(this);
            a.toggleClass('active');
            a.next().toggleClass('active');

        });

        jQuery('.header .menu').on('click', function() {
            jQuery('.nav-mobile').addClass('active');
        });

        jQuery('.sidebar-category .sub-filter').on('click', function(e) {
            jQuery(this).toggleClass('active');
        });

        jQuery('.sidebar-category li.sub .sub-filter').on('click', function(e) {
            e.preventDefault();
        });

        jQuery('.video-button').on('click', function() {
            jQuery('.video-modal').addClass('active').find('[data-src]').attr('data-src', jQuery(this).data('url'));
            var video = new LazyLoad({
                elements_selector: ".iframe-lazy",
            });
        });

        jQuery('.video-modal .shadow, .video-modal .close-icon').on('click', function() {
            setTimeout(function() {
                jQuery('.video-modal .video iframe').removeAttr('src').removeClass('loaded').removeAttr('data-was-processed');
            }, 300)

        });

        this.sidebar();

        var fixed = true;

        if (!jQuery('.header .menu').is(':visible')) {
            this.scrollHeader();
            fixed = false;
        }

        jQuery(window).on('resize', function() {
            if ((!jQuery('.header .menu').is(':visible')) && fixed) {
                fixed = false;
                theme.scrollHeader();
            }
        });

    },

    scrollHeader: function() {
        var didScroll;
        var lastScrollTop = 36;
        var delta = 5;
        var navbarHeight = jQuery('.header').outerHeight();
        var wrapper = jQuery(".wrapper");

        (jQuery(window).scrollTop() > 36) ? wrapper.addClass("fixed"): wrapper.removeClass("fixed");

        jQuery(window).on('scroll', function() {
            (jQuery(window).scrollTop() > 36) ? wrapper.addClass("fixed"): wrapper.removeClass("fixed");

            didScroll = true;

        });

        setInterval(function() {
            if (didScroll) {
                hasScrolled();
                didScroll = false;
            }
        }, 250);

        function hasScrolled() {
            var st = jQuery(this).scrollTop();

            if (Math.abs(lastScrollTop - st) <= delta)
                return;

            if (st > lastScrollTop && st > navbarHeight) {
                wrapper.removeClass('show-nav')
            } else {
                if (st + jQuery(window).height() < jQuery(document).height()) {
                    wrapper.addClass('show-nav')
                }
            }

            lastScrollTop = st;
        }

    },

    sidebar: function() {
        if (!jQuery('.hide-menu').is(':visible')) {
            jQuery('.shadow-cart').before(jQuery('.box-fixed').parent().contents());
        }

        jQuery('.button-filter').on('click', function() {
            jQuery('.box-fixed').addClass('active');
        });

        jQuery('.filter__title').on('click', function() {
            jQuery(this).toggleClass('active');
        });

        jQuery('.filter__input').on('click', function() {
            setTimeout(function() {
                jQuery('.smart-filter').trigger('submit');
            }, 50)
        });
    },

    resets: function() {
        // busca avancada
        jQuery('.page-search #Vitrine input[type="image"]').after('<button type="submit" class="botao-commerce">BUSCAR</button>')
        jQuery('.page-search #Vitrine input[type="image"]').remove();
        jQuery('.advancedSearchFormBTimg').addClass('botao-commerce');

        // trocar senha
        jQuery('.page-central_senha input[type="image"]').after('<button type="submit" class="botao-commerce">CONTINUAR</button>').remove();

        // panel
        jQuery('.col-panel table, .page-extra .page-content table,.page-extras .page-content table, .board_htm table').wrap('<div class="table-overflow"></div>');
        jQuery('.caixa-cadastro #email_cadastro').attr('placeholder', 'Seu e-mail');

        // contact
        jQuery('.page-contact form input[type="image"]').after('<div class="flex justify-end"><button type="submit" class="botao-commerce">ENVIAR</button></div>').remove();

        jQuery('.txt-forma-pagamento').each(function() {
            jQuery(this).text(jQuery(this).text().replace(' - Yapay', ''));
        });

        jQuery('#imagem[src*="filtrar.gif"]').after('<button type="submit" class="botao-commerce">Filtrar</button>');
        jQuery('#imagem[src*="filtrar.gif"]').remove();

        jQuery('input[src*="gerarordem.png"]').after('<button type="submit" class="botao-commerce">Gerar ordem de devolu&ccedil;&atilde;o</button>');
        jQuery('input[src*="gerarordem.png"]').remove();
    },

    icPrev: '<div class="arrow prev"><svg class="icon" viewBox="0 0 451.847 451.847">\
        <path d="M97.141,225.92c0-8.095,3.091-16.192,9.259-22.366L300.689,9.27c12.359-12.359,32.397-12.359,44.751,0   c12.354,12.354,12.354,32.388,0,44.748L173.525,225.92l171.903,171.909c12.354,12.354,12.354,32.391,0,44.744   c-12.354,12.365-32.386,12.365-44.745,0l-194.29-194.281C100.226,242.115,97.141,234.018,97.141,225.92z"></path>\
    </svg></div>',

    icNext: '<div class="arrow next"><svg class="icon"  viewBox="0 0 451.846 451.847">\
        <path d="M345.441,248.292L151.154,442.573c-12.359,12.365-32.397,12.365-44.75,0c-12.354-12.354-12.354-32.391,0-44.744   L278.318,225.92L106.409,54.017c-12.354-12.359-12.354-32.394,0-44.748c12.354-12.359,32.391-12.359,44.75,0l194.287,194.284   c6.177,6.18,9.262,14.271,9.262,22.366C354.708,234.018,351.617,242.115,345.441,248.292z"></path>\
    </svg></div>',

    bannerFull: function() {
        if (jQuery('.banner-full .swiper-container').length) {
            var config = jQuery('.banner-full').data('config');

            var total = jQuery('.banner-full .swiper-slide').length;

            var paginate = total > 1 ? {
                clickable: true,
                el: '.banner-full .swiper-pagination'
            } : false;

            var swiper = new Swiper('.banner-full .swiper-container', {
                preloadImages: false,
                effect: config.fade ? 'fade' : 'slide',
                autoplay: {
                    delay: config.time,
                    disableOnInteraction: false
                },
                lazy: {
                    loadPrevNext: true,
                },
                pagination: paginate,
                loop: (total > 1)
            });

            if (config.stop) {

                jQuery(".banner-full .swiper-container").on('mouseenter', function(){
                    this.swiper.autoplay.stop();
                });

                jQuery(".banner-full .swiper-container").on('mouseleave', function(){
                    this.swiper.autoplay.start();
                });
            }

        }

        var swiperBanner = new Swiper('.banner .swiper-container', {
            preloadImages: false,
            effect: 'fade',
            autoplay: {
                delay: 4000,
                disableOnInteraction: false
            },
            loop: true,
            lazy: {
                loadPrevNext: true,
            }
        });

    },

    bannerInfo: function() {
        if (jQuery('.banner-info').length) {

            var swiperinfo = new Swiper('.banner-info .swiper-container', {
                preloadImages: false,
                lazy: {
                    loadPrevNext: true,
                },
                navigation: {
                    nextEl: '.next',
                    prevEl: '.prev',
                },
                loop: true
            });

        }
    },

    slideProduct: function() {

        if (jQuery('.showcase').length) {
            jQuery('.showcase').on('hover', '.product', function() {
                jQuery('.showcase').removeClass('zindex');
                jQuery(this).parents('.showcase').addClass('zindex');
            });
            jQuery('.showcase').on('mouseleave', '.product', function() {
                jQuery('.showcase').removeClass('zindex');
                jQuery(this).parents('.showcase').removeClass('zindex');
            });
        }

        if (jQuery('.product .second').length) {

            if (jQuery('.showcase').length) {
                jQuery('body').on('mouseenter', '.product', function() {
                    var img = jQuery(this).find('.second-image');
                    if (!img.hasClass('load')) {
                        img.attr('src', img.data('src')).addClass('load');
                    }
                });
            } else {

                jQuery('.product').on('mouseenter', function() {
                    var img = jQuery(this).find('.second-image');

                    if (!img.hasClass('load')) {
                        img.attr('src', img.data('src')).addClass('load');
                    }
                });

            }

        }

        var listSlide = new LazyLoad({
            elements_selector: '.list-slide',
            threshold: 0,
            callback_enter: function(element) {

                let items        = jQuery(element).find('.item').length;
                let columnsCount = jQuery(element).data('product-columns') || 2;

                let swiperList = new Swiper(element.querySelector('.swiper-container'), {
                    slidesPerView: 4,
                    lazy: {
                        loadPrevNext: false,
                    },
                    navigation: {
                        nextEl: element.querySelector('.next'),
                        prevEl: element.querySelector('.prev'),
                    },
                    loop: items > 4,
                    breakpoints: {
                        1024: {
                            slidesPerView: 3,
                            loop: items > 3,
                            spaceBetween: 0,
                        },
                        768: {
                            slidesPerView: 2,
                            loop: items > 2,
                        },
                        520: {
                            slidesPerView: columnsCount,
                            loop: items > 1,
                        }
                    }
                });
            }
        });

        var listCat = new LazyLoad({
            elements_selector: '.bg-cat',
            threshold: 300,
            callback_enter: function(element) {
                jQuery(element).addClass('show-bg');
                var items = jQuery('.bg-cat .swiper-slide').length % 4;

                jQuery('.bg-cat .swiper-slide:empty').remove();

                var swiperList = new Swiper(element.querySelector('.swiper-container'), {
                    slidesPerView: 1,
                    lazy: {
                        loadPrevNext: false,
                    },
                    navigation: {
                        nextEl: '.bg-cat .next',
                        prevEl: '.bg-cat .prev',
                    },
                    loop: !items,
                    breakpoints: {
                        1024: {
                            slidesPerView: 1,
                            loop: items > 1
                        }
                    }
                });
            }
        });

        setTimeout(function() {
            var select = '.section-brands';
            var brand = new LazyLoad({
                elements_selector: select,
                threshold: 0,
                callback_enter: function() {
                    var swiper = new Swiper('.slide-brand', {
                        preloadImages: false,
                        slidesPerView: 5,
                        spaceBetween: 0,
                        lazy: true,
                        navigation: {
                            nextEl: '.slide-brand .next',
                            prevEl: '.slide-brand .prev',
                        },
                        breakpoints: {
                            1024: {
                                slidesPerView: 4
                            },
                            768: {
                                slidesPerView: 3
                            },
                            640: {
                                slidesPerView: 2,
                            },
                            320: {
                                slidesPerView: 1,
                            }
                        }
                    });
                }
            });

        }, 50)

        jQuery('#form-comments #bt-submit-comments').before('<button class="botao-commerce">Enviar</button>').remove();
    },

    image: function(value, element) {
        typeof element == 'object' ? element = jQuery(element) : '';
        var result = ((element.height() - element.width()) / element.width()) * 100;
        (result > value) ? element.addClass('vertical'): element.addClass('horizontal');
    },

    getAjax: function(method, url, data, response) {
        jQuery.ajax({
            method: method,
            url: url,
            data: data,
            success: function(value) {
                response(value);
            }
        });
    },

    shipping: function() {
        jQuery('.crazy_cep').mask('00000-000');

        var quantidade = 1;

        jQuery('.new-frete').on('submit', function(e) {
            e.preventDefault();

            if (jQuery('#quant:visible').is(':visible')) {
                quantidade = jQuery('#quant:visible').val();
            }

            var url2 = jQuery('#shippingSimulatorButton').attr('data-url');

            var cep = jQuery(this).find('input').val().split('-');
            var variant = jQuery('#product-container').find('#selectedVariant').val() ? jQuery('#product-container').find('#selectedVariant').val() : 0;

            url2 = url2.replace('cep1=%s', 'cep1=' + cep[0])
                .replace('cep2=%s', 'cep2=' + cep[1])
                .replace('acao=%s', 'acao=' + variant)
                .replace('dade=%s', 'dade=' + quantidade);

            if (jQuery('#selectedVariant').val() !== '') {
                jQuery('.box-frete .result').html('<div class="load-css"><div class="icon"></div></div>');
                theme.getAjax('get', url2, {}, function(response) {
                    jQuery('.box-frete .result').html(response);

                    jQuery('.box-frete .result').find('table:first').remove();
                    jQuery('.box-frete .result').find('img').parent().remove();

                    jQuery('.box-frete .result').find('th:last').text('Prazo:');

                    jQuery('.box-frete .result').find('th[colspan="2"]').removeAttr('colspan');
                    jQuery('.box-frete .result').find('[width]').removeAttr('width');

                    if (jQuery('.box-frete .result').find('tr').length == 1) {
                        jQuery('.box-frete .result').find('tr').after('<tr><td colspan="3">Não foi encontrado formas de envio para o CEP</td></tr>');
                        jQuery('.box-frete .result').find('tr:first').remove();
                    }
                });
            } else {
                jQuery('.box-frete .result').html('Escolha uma varia&ccedil;&atilde;o');
            }

        });
    },

    startZoom: function() {

        let galleryThumbs = new Swiper('.nav-images .list', {
            direction: "vertical",
            slidesPerView: 5,
            navigation: {
                nextEl: '.nav-images .controls .next',
                prevEl: '.nav-images .controls .prev',
            },
            watchSlidesProgress: true,
            watchSlidesVisibility: true,
            preloadImages: false,
            lazy: {
                loadPrevNext: true,
            },
        });

        let gallery = new Swiper('.image-show .list', {
            slidesPerView : 1,
            lazy :{
                loadPrevNext: true,
            },
            pagination: {
                el                : '.image-show .dots',
                bulletClass       : 'dot',
                bulletActiveClass : 'dot-active'
            },
            thumbs :{
                swiper: galleryThumbs
            },
            on: {
                init: function () {

                    if(this.slides.length === 1){
                        this.unsetGrabCursor();
                        this.allowTouchMove = false;
                    }

                    let wrapper = jQuery('.image-show .list .box-img[data-index="1"] .zoom');

                    if(!wrapper.find('img').first().next().length){
                        wrapper.zoom({
                            touch : false,
                            url   : wrapper.find('img').attr('src')
                        });
                    }

                },
                slideChange: function () {

                    let index = this.activeIndex + 1;
                    let wrapper = jQuery(`.image-show .list .box-img[data-index="${index}"] .zoom`);

                    if(!wrapper.find('img').first().next().length){
                        wrapper.zoom({
                            touch : false,
                            url   : wrapper.find('img').attr('src')
                        });
                    }

                }
            }
        });

    },

    removeZoom: function(images) {

        let productName = jQuery('.relative-area .product-name').text();
        let htmlThumbs  = ``;
        let htmlImages  = ``;

        jQuery.each(images, function (index, item){

            let slideIndex = index + 1;

            htmlImages += `
                <div class="item swiper-slide">
                    <div class="box-img index-list ${ slideIndex === 1 ? 'active' : '' }" data-index="${slideIndex}">
                        <div class="zoom">
                            <img class="swiper-lazy" data-src="${item.https}" alt="${productName}" />
                        </div>
                    </div>
                </div>
            `;

            htmlThumbs +=`
                <div class="item swiper-slide">
                    <div class="box-img index-list ${ slideIndex === 1 ? 'active' : '' }" data-index="${slideIndex}">                        
                        <img class="swiper-lazy" data-src="${item.thumbs[90].https}" alt="${productName} - Image thumb ${slideIndex}" />
                    </div>
                </div>
            `;

        });


        if(jQuery('.nav-images .list').get(0).swiper){
            jQuery('.nav-images .list').get(0).swiper.destroy();
            jQuery('.nav-images .list').removeClass('swiper-container-thumbs');
        }

        if(jQuery('.image-show .list').get(0).swiper){
            jQuery('.image-show .list').get(0).swiper.destroy();
        }

        jQuery('.nav-images .list .item, .image-show .list .swiper-wrapper .item').remove();

        jQuery('.nav-images .list .swiper-wrapper').html(htmlThumbs);
        jQuery('.image-show .list .swiper-wrapper').html(htmlImages);

        theme.startZoom();

    },

    tabs: function() {
        jQuery('[data-id*="AbaPersonalizada"]').each(function() {
            var el = jQuery(this).data('id');
            jQuery(el).removeAttr('style').appendTo(jQuery(this));
        });

        jQuery('.section-box.comments').appendTo('.comments-modal .append');

        jQuery('.list-star.cursor').on('click', function() {
            jQuery('.comments-modal').addClass('active');
        });

        jQuery('.ranking .rating').each(function() {
            var av = Number(jQuery(this).attr('class').replace(/[^0-9]/g, ''));

            for (i = 1; i <= 5; i++) {
                if (i <= av) {
                    jQuery(this).append('<div class="icon active"></div>');
                } else {
                    jQuery(this).append('<div class="icon"></div>');
                }

            }
        });

        if(jQuery('#downloads').length){
            jQuery.get(jQuery('#downloads').data('url'), function(response){
                jQuery('#downloads').html(response);
            });
        }
        
    },

    productVariant: function() {
        this.tabs();

        jQuery('.compreJunto form .fotosCompreJunto').append('<div class="plus color to">=</div>');


        jQuery('.box-variants').on('click', '.lista_cor_variacao li[data-id]', function() {
            var url = "/web_api/variants/" + jQuery(this).data('id');

            theme.getAjax('get', url, {}, function(response) {
                var images = response.Variant.VariantImage;

                if (images.length) {
                    theme.removeZoom(images);
                }
            });
        });

        jQuery('.box-variants').on('click', '.lista-radios-input', function() {
            var url = "/web_api/variants/" + jQuery(this).find('input').val();

            theme.getAjax('get', url, {}, function(response) {
                var images = response.Variant.VariantImage;

                if (images.length) {
                    theme.removeZoom(images);
                }
            });
        });

        jQuery('.box-variants').on('change', 'select', function() {
            var url = "/web_api/variants/" + jQuery(this).val();
            theme.getAjax('get', url, {}, function(response) {
                var images = response.Variant.VariantImage;

                if (images.length) {
                    theme.removeZoom(images);
                }
            });
        });

        jQuery('.produto img').each(function() {
            jQuery(this).attr('src', jQuery(this).attr('src').replace('/90_', '/'));

            var href = '';
            if (jQuery(this).parent().attr('href') !== '') {
                href = 'href="' + jQuery(this).parent().attr('href') + '"';
            }

            jQuery(this).parents('span').after('<a ' + href + ' class="product-name">' + jQuery(this).attr('alt') + '</a>');
        });

        jQuery('.page-product').on('click', '#detalhes_formas', function() {
            var productId = jQuery('#form_comprar').data('id');
            var price = jQuery('#preco_atual').val();

            var link = '/mvc/store/product/payment_options_details?loja=' + theme.storeId() + '&IdProd=' + productId + '&preco=' + price;
            jQuery('.payment-modal').addClass('active');

            jQuery('.payment-modal .append').html('<div class="load-css"><div class="icon"></div></div>');

            theme.getAjax('get', link, {}, function(response) {
                jQuery('.payment-modal .append').html(response).find('.tablePage').wrap('<div class="overflow-payment"></div>');
            });

        });

        jQuery('#form_comprar').on('submit', function() {

            if (!jQuery('.labelMultiVariacao').length) {

                if (jQuery('#selectedVariant').length && !jQuery('#selectedVariant').val()) {
                    jQuery("#span_erro_carrinho").css("display", "block");
                    return false;
                }
            }

            jQuery('#loading-product-container').show();

            jQuery('body').removeClass('modal-open').removeAttr('style');
            jQuery('body').find('.modal-backdrop').remove();
            var interval = setInterval(function() {
                jQuery('body').find('.modal-backdrop').remove();
                if (jQuery('.cart-preview-loading-modal').hasClass('tray-hide')) {
                    cart.showCart();
                    jQuery('#loading-product-container').hide();
                    jQuery('body').find('.botao-continuar-comprando .botao-commerce-img').trigger('click');
                    clearInterval(interval);
                }
            }, 50);
        });

        jQuery('.compreJunto form').on('submit.botao-compre-junto', function() {

            var form = jQuery(this);

            if (!form.find('.blocoAlerta').is(':visible')) {
                jQuery('#loading-product-comprejunto').show();
                jQuery('body').removeClass('modal-open').removeAttr('style');
                jQuery('body').find('.modal-backdrop').remove();

                var interval = setInterval(function() {
                    if (jQuery('.cart-preview-loading-modal').hasClass('tray-hide')) {
                        cart.showCart();
                        jQuery('#loading-product-comprejunto').hide();
                        jQuery('body').find('.botao-continuar-comprando .botao-commerce-img').trigger('click');
                        clearInterval(interval);
                    }
                }, 50);
            }
        });

    },

    forVisited: function(list) {

        var template = '<div class="product">\
            <div class="image">\
                <a href="{link}" class="space-image {size}">\
                    <img class="swiper-lazy transform" src="{image}">\
                </a>\
            </div>\
            <a href="{link}" class="info-product">\
                <div class="product-name">{name}</div>\
                <div class="down-line">{boxPrice}</div>\
            </a>\
        </div>';

        var priceBefore = '<div class="price-before"><span class="line-price">{price}</span></div>';

        var boxPrice = '<div class="box-price">\
            <div class="price">\
                <div class="product-price">\
                    {before}\
                    <span class="price-off">{price}</span>\
                </div>\
            </div>\
            <div class="product-payment">{payment}</div>\
        </div>';


        var listNode = jQuery('.visited-section .list-append');

        var itemsList = '';

        list.forEach(function(v) {
            var product = v.Product;

            var imageSize = '';

            var selectImage = jQuery('.product-related .space-image:first');
            if (selectImage.length) {
                imageSize = selectImage.attr('class').split(' ');
                imageSize = imageSize.length > 1 ? imageSize[1] == 'second' ? '' : imageSize[1] : '';
            }

            var item = template.replace(/{link}/g, product.url.https)
                .replace(/{image}/g, product.ProductImage[0].thumbs[180].https)
                .replace(/{name}/g, product.name)
                .replace(/{size}/g, imageSize)

            var priceProtion = Number(product.promotional_price);

            if (product.available && Number(product.price)) {
                item = item.replace('{boxPrice}', boxPrice
                        .replace('{before}', priceProtion ? priceBefore.replace('{price}', toReal(Number(product.price), 'R$')) : '')
                        .replace('{price}', priceProtion ? toReal(priceProtion, 'R$') : toReal(Number(product.price), 'R$')))
                    .replace('{payment}', product.payment_option_html);
            } else {
                item = item.replace('{boxPrice}', product.available ? '<p>Sob Consulta</p>' : '<p>Indispon&iacute;vel</p>');
            }

            itemsList += '<div class="item swiper-slide">' + item + '</div>';

        });

        var result = '<div class="swiper-container"><div class="swiper-wrapper list-product">' + itemsList + '</div></div>';


        listNode.append(result);

        var listSlide = new LazyLoad({
            elements_selector: '.list-append .swiper-container',
            callback_enter: function(element) {

                var items = jQuery(element).find('.item').length;

                var swiperList = new Swiper(element, {
                    slidesPerView: 4,
                    lazy: {
                        loadPrevNext: false,
                    },
                    navigation: {
                        nextEl: '.visited-section .next',
                        prevEl: '.visited-section .prev',
                    },
                    loop: items > 4,
                    breakpoints: {
                        1024: {
                            slidesPerView: 3,
                            loop: items > 3,
                            spaceBetween: 0,
                        },
                        640: {
                            slidesPerView: 2,
                            loop: items > 2,
                        },
                        320: {
                            slidesPerView: 1,
                            loop: items > 1,
                        }
                    }
                });
            }
        });

    },

    productVisited: function() {
        var url = "/web_api/products/" + jQuery('#form_comprar').data('id');
        var visited = localStorage.getItem('visited');

        var list = [];

        if (visited) {
            list = JSON.parse(visited).reverse();
        }

        list.length ? theme.forVisited(list) : jQuery('.visited-section').remove();

        if (list.length == 10) {
            list.pop();

            list.reverse();
        }

        theme.getAjax('GET', url, {}, function(response) {

            var valid = true;

            list.forEach(function(val) {

                if (val.Product.id == response.Product.id) {
                    valid = false;
                }
            });

            if (valid) {
                list.push(response);

                var result = JSON.stringify(list);

                localStorage.setItem('visited', result);
            }

        });

    },

    storeId: function() {
        return jQuery('html').attr('data-store');
    },

    present: function() {
        jQuery('#form_presentes input[type="image"]').prev().html('<div class="botao-commerce">Continuar Comprando</div>');
        jQuery('#form_presentes input[type="image"]').wrap('<div class="relative-button"></div>').after('<button class="botao-commerce">Avan&ccedil;ar</button>').remove();
    },

    slideCatalog: function() {
        jQuery('.slide-catalog').each(function(){
            let carousel = this;
            new Swiper(carousel, {
                preloadImages : false,
                loop          : true,
                effect        : 'slide',
                autoplay :{
                    delay: 5000,
                    disableOnInteraction : false
                },
                lazy :{
                    loadPrevNext: true,
                }
            });
        });
    },

    newsletter: function() {
        //var checkCookie = getCookie('modal-news');
        var checkCookie = Cookies.get('modal-news'); 

        var modal = jQuery('.email-modal');

        if (modal.hasClass('exit-window') && !checkCookie) {
            jQuery('html').on('mouseleave', function() {
                if (!modal.hasClass('loaded')) {
                    jQuery('.modal-box .image img').attr('src', jQuery('.modal-box .image img').attr('data-src'));
                    setInterval(function() {
                        modal.addClass('active');
                        //setCookie('modal-news', 'true', 5);
                        Cookies.set('modal-news', 'true', { expires: 5 });
                    }, 200);
                }
            });
        }

        if (modal.hasClass('last-time') && !checkCookie) {
            setInterval(function() {
                modal.addClass('active');
                //setCookie('modal-news', 'true', 5);
                Cookies.set('modal-news', 'true', { expires: 5 });
                jQuery('.modal-box .image img').attr('src', jQuery('.modal-box .image img').attr('data-src'));
            }, 20000);
        }
        if (modal.hasClass('init-start') && !checkCookie) {
            modal.addClass('active');
            //setCookie('modal-news', 'true', 5);
            Cookies.set('modal-news', 'true', { expires: 5 });
            jQuery('.modal-box .image img').attr('src', jQuery('.modal-box .image img').attr('data-src'));
        }

        jQuery('.email-modal .close-icon,.email-modal .shadow').on('click', function(){
            //setCookie('modal-news', 'true', 5);
            Cookies.set('modal-news', 'true', { expires: 5 });
            modal.addClass('loaded');
        });

    },
    organizeNewsletterPage: function() {

        if(jQuery('.page-newsletter .formulario-newsletter').length){

            let placeholder = jQuery('<div/>').html('Digite o c&oacute;digo ao lado').text();

            jQuery('.page-newsletter .formulario-newsletter .box-captcha-newsletter input').attr('placeholder', placeholder);
            jQuery('.formulario-newsletter .newsletterBTimg').html('Confirmar').removeClass().addClass('botao-commerce');

        } else {

            jQuery('.page-newsletter .page-content').addClass('success-message-newsletter');
            jQuery('.page-newsletter .page-content.success-message-newsletter .board p:first-child a').addClass('botao-commerce').html('Voltar para p&aacute;gina inicial');

        }

        setTimeout(function () {
            jQuery('.page-newsletter .page-content').addClass('show');
        }, 200);

    },

    breadcrumb: function() {
        if (!jQuery('.breadcrumb').length && !jQuery('.page-home').length) {

            var titleForBreadcrumb = document.title.split(' - ')[0];

            if (jQuery('html').hasClass('page-cadastro_bloqueado')) {
                titleForBreadcrumb = 'Confirmação de cadastro';
            } else {
                //"Corta" a string sem cortar a palavra para um máximo de 60 caracteres.
                titleForBreadcrumb = titleForBreadcrumb.replace(/^(.{60}[^\s]*).*/, "$1");
            }

            jQuery('.page-content > .container').prepend('\
            <div class="breadcrumb flex f-wrap">\
                <span class="breadcrumb-item flex align-center">\
                    <a href="/" class="t-color">Home</a>\
                </span>\
                <span class="breadcrumb-item flex align-center">\
                    <a href="' + window.location.href + '" class="t-color">' + titleForBreadcrumb + '</a>\
                </span>\
            </div>\
            ')
        }
    },
    organizeStoreReviewsPage: function() {

        jQuery('.page-content .container').append('<div class="botao-commerce depoimento-event">Deixe seu depoimento</div>');
        jQuery('#depoimento #aviso_depoimento').after('<button type="button" class="botao-commerce send-store-review">Enviar</button>');

        jQuery('.page-content h2:first').appendTo('.depoimentos-modal .append');
        jQuery('#depoimento').appendTo('.depoimentos-modal .append');

        jQuery('#comentario_cliente').remove();
        jQuery('.depoimentos-modal .append #depoimento a').remove();

        jQuery('.botao-commerce.depoimento-event').on('click', function() {
            jQuery('.depoimentos-modal').addClass('active');
        });

    },

    validateStoreReviewForm: function() {

        jQuery('.depoimentos-modal #depoimento').validate({
            rules: {
                nome_depoimento: {
                    required: true
                },
                email_depoimento: {
                    required: true,
                    email: true
                },
                msg_depoimento: {
                    required: true
                },
                input_captcha: {
                    required: true
                }
            },
            messages: {
                nome_depoimento: {
                    required: "Por favor, informe seu nome completo",
                },
                email_depoimento: {
                    required: "Por favor, informe seu e-mail",
                    email: "Por favor, preencha com um e-mail válido",
                },
                msg_depoimento: {
                    required: "Por favor, escreva uma mensagem no seu depoimento",
                },
                input_captcha: {
                    required: "Por favor, preencha com o código da imagem de verificação"
                }
            },
            errorElement: 'span',
            errorClass: 'error-block',
            errorPlacement: function(error, element) {

                if (element.prop('type') === 'radio') {
                    error.insertAfter(element.parent('.nota_dep'));
                } else if (element.is('textarea')) {
                    error.insertAfter(element.parent().find('h5'));
                } else {
                    error.insertAfter(element);
                }
            }
        });

        jQuery('.depoimentos-modal #depoimento .send-store-review').on('click', function() {

            let form = jQuery('.depoimentos-modal #depoimento');
            let button = jQuery(this);

            if(form.valid()){
                button.html('Enviando...').attr('disabled', true);
                enviaDepoimentoLoja();
            }
            
        });

        /* Create observer to detect Tray return */                
        let target = jQuery('#aviso_depoimento').get(0);
        let config = { attributes: true };

        let observerReviewMessage = new MutationObserver(function(mutationsList, observer){
            jQuery('.depoimentos-modal #depoimento .send-store-review').html('Enviar').removeAttr('disabled');
        });

        observerReviewMessage.observe(target, config);

    },
    loadThemeVersion: function(){
        if (!window.jsonVersion) return;

        const themeVersion = Cookies.get('theme-version');
    
        if(themeVersion){
            jQuery('html').attr('data-theme-version', themeVersion);
            return;
        }
    
        jQuery.getJSON(window.jsonVersion, function(data){
            Cookies.set('theme-version', data.version, { expires: 7 });
            jQuery('html').attr('data-theme-version', data.version);
        });
    }
}

var cart = {

    customerId: null,

    loadCustomerId: function(){
        if(!cart.customerId){
            const customerInfo = dataLayer.find(element => ('customerId' in element));
            cart.customerId = customerInfo ? customerInfo.customerId : null;
        }        
    },

    session: function() {
        return jQuery("html").attr("data-session");
    },

    idStore: function() {
        return jQuery("html").attr("data-store");
    },

    removeProduct: function (element){
        var id = parseInt(jQuery(element).attr('data-id'));
        var variant = '/' + jQuery(element).attr('data-variant');
        var together = jQuery(element).attr('data-together') !== '' ? '/' + jQuery(element).attr('data-together') : '';
        var addText = jQuery(element).attr('data-add') == "" ? '' : jQuery(element).attr('data-add');
                
        jQuery.ajax({
            method: "DELETE",
            url: "/web_api/carts/" + cart.session() + "/" + id + variant + together + "?" + jQuery.param({ "additional_information": addText })
        }).done(function(response) {
            cart.listProduct();
        }).fail(function(error) {
            cart.listProduct();
        });
    },

    listProduct: function() {
        jQuery.ajax({
            method: 'GET',
            url: '/checkout/cart/api?session_id=' + cart.session() + '&store_id=' + cart.idStore() + '&nocache=0.' + new Date().getTime(),
            success: function(r) {
                var forList = r.data.cart.products;
                var addList = [];

                forList.forEach(function(list) {
                    addList.push({
                        "Cart": {
                            "email": "",
                            "variants_kit": list.variants_kit || "",
                            "additional_info_kit": list.additional_info_kit || "",
                            "price_itens_kit": list.price_itens_kit || "",
                            "product_id": list.id,
                            "product_name": list.name,
                            "quantity": list.quantity,
                            "price": list.price,
                            "variant_id": list.variant_id || "0",
                            "additional_information": list.additional_information,
                            "product_url": list.url,
                            "bought_together_id": list.bought_together_id || "",
                            "product_image": list.images // alter images template
                        }
                    })
                });

                cart.forProduct(addList);
            },
            error: function() {
                cart.forProduct([]);
            }
        });

        var windowWidth = window.innerWidth;
        if (windowWidth < 425){
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    },

    number: function(number) {
        jQuery('.cart-header .number').text(number);
    },

    total: function(price) {
        jQuery('.cart-sidebar .total .value').text(toReal(parseFloat(price), 'R$'));
    },

    forProduct: function(listProducts) {
        var listDom = jQuery('.cart-sidebar .content-cart .list');
        listDom.find('*').remove();
        listDom.parent().removeClass('empty');

        var button = jQuery('.botao-commerce.buy');

        var https = button.attr('href')

        var checkout = https + '/checkout?session_id=' + cart.session() + '&store_id=' + cart.idStore();
        button.attr('href', checkout);
        var qnt = 0;
        var total = 0.0;

        var listId = [];
        if (listProducts.length) {

            listProducts.forEach(function(product) {
                product = product.Cart;

                var addMsg = product.additional_information;
                prices = product;
                // product.productImage.thumbs[90].https;
                listDom.append(cart.templateProduct(product.product_id, product.variant_id, product.product_name, product.product_image.medium, product.quantity, product.price, product.price, product.product_url.https, addMsg, product.additional_info_kit, product.bought_together_id));
                qnt += parseInt(product.quantity);

                total += (parseFloat(product.price) * parseInt(product.quantity));

                listId.push(parseInt(product.product_id));

            });
            cart.number(qnt);
            cart.total(total);

        } else {
            listDom.append('<div class="error"><div clas="text">Carrinho Vazio</div></div>');
            listDom.parent().addClass('empty');
            cart.number(0);

            jQuery('body').find('.add-cart .buy-product').each(function() {
                if (jQuery(this).hasClass('active')) jQuery(this).removeClass('active').find('.text').text('Comprar');
            });

        }

    },

    startCart: function() {
        jQuery('.cart-header .area').on('click', function() {
            if (jQuery(this).parent().hasClass('active')) {
                jQuery('.cart-header').removeClass('active');
            } else {
                cart.showCart();
            }

        });

        jQuery('.shadow-cart, .shadow-cart-header, .box-prev, .close-nav,.box-fixed .close-box,.close-modal,.close-icon,.modal-theme .shadow').on('click', function(e) {
            jQuery('.cart-sidebar, .nav-mobile,.box-fixed,.modal-theme,.cart-header').removeClass('active');
        });

        this.initAdd()

        // add product variant
        jQuery('.product-submit').on('submit', function(e) {
            e.preventDefault();
            var variant = jQuery(this).find('.select').val();
            var quantity = jQuery(this).find('.quantity').val();
            var product_id = jQuery(this).find('.quantity').attr('data-id');
            if (variant) cart.addVariantComplete(variant, quantity, product_id);
        });

        jQuery('.remove-items').on('click', function() {
            cart.removeCart();
        });

    },

    showCart: function() {
        cart.listProduct();
        jQuery('.modal-theme').removeClass('active');
        jQuery('.cart-header').addClass('active');
    },

    templateProduct: function(id, variant, name, image, qnt, price, dataPrice, url, addMsg, infoKit, together) {

        var template = '\
            <div class="item">\
                <div class="box-cart flex align-center">\
                    <div class="box-image">\
                        <a href="{url}" class="image">\
                            <img src="{image}" alt="{name}">\
                        </a>\
                    </div>\
                    <div class="info-product">\
                        <div class="line-top flex justify-between">\
                            <a href="{url}" class="name t-color">{name}</a>\
                            <div class="remove" data-id="{id}" data-together="{together}" data-variant="{variant}" data-add="{addMsg}" onclick="cart.removeProduct(this)">\
                                <span class="ic-trash"></span>\
                            </div>\
                        </div>\
                        <div class="line-down">\
                            <div class="qnt">Quantidade: {length}</div>\
                            <div class="price" data-price="{dataPrice}">{price}</div>\
                        </div>\
                    </div>\
                </div>\
            </div>\
        ';

        price = toReal(parseFloat(price), 'R$');

        template = template.replace(/{url}/g, url);
        template = template.replace(/{image}/g, image);
        template = template.replace(/{name}/g, name);
        template = template.replace(/{id}/g, id);
        template = template.replace(/{variant}/g, variant);
        template = template.replace(/{length}/g, qnt);
        template = template.replace(/{addMsg}/g, addMsg);
        template = template.replace(/{together}/g, together);
        template = template.replace(/{dataPrice}/g, dataPrice);
        template = template.replace(/{price}/g, price);

        return template;

    },

    addVariantComplete: function(variant, quantity, productId) {

        cart.loadCustomerId();

        const data = {
            Cart: {
                session_id : cart.session(),
                product_id : productId,
                variant_id : variant ? variant : 0,
                quantity   : quantity
            }
        };

        if(cart.customerId){
            data.Cart.customer_id = cart.customerId;
        }

        jQuery.ajax({
            method: 'post',
            url: '/web_api/cart/',
            dataType: 'json',
            data: data,        
            success: function( response, textStatus, jqXHR ) {
                cart.showCart();
            },  
            error: function( jqXHR, status, errorThrown ){
                window.location.href = jQuery('.modal-product').find('.name a').attr('href');
            }   
        });

        /*var customerId = dataLayer[0].customerId ? dataLayer[0].customerId : 0;
        jQuery.ajax({
            method: "POST",
            url: "/web_api/cart/",
            contentType: "application/json; charset=utf-8",
            data: '{"Cart":{"session_id":"' + cart.session() + '","product_id":"' + productId + '","quantity":"' + quantity + '","variant_id":"' + variant + '", "customer_id": "1"}}',
            success:function(response, textStatus, jqXHR) {
                cart.showCart();
            },
            error: function(jqXHR, status, errorThrown) {
                window.location.href = jQuery('.modal-product').find('.name a').attr('href');
            }
        });*/

    },

    filterVariant: function(variants, selects) {
        var i = 0;
        var select = selects.eq(0).val();
        if (!!select) {
            var select2 = selects.eq(1).val();
            while (i < variants.length) {
                if (variants[i].option == select && variants[i].option2 == select2) {
                    return variants[i];
                }
                i++;
            }
        }
        return 500;
    },
    stockAlert: function(e) {
        var variant = cart.filterVariant(jQuery(e).data('variants'), jQuery(e).find('select'));
        var quant = Number(e.find('input[type="number"]').val());

        e.find('input[type="number"]').attr('max', variant.stock).attr('data-variant', variant.id);

        var numberFormat = new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' });
        var price = numberFormat.format(variant.price.price);
        var payment = variant.price.payment;

        e.closest('.product').find('.info-product .down-line .box-price').html('<div class="price-off new-price">' + price + '</div><div class="product-payment">' + payment + '</div>');

        if(Number(variant.stock) <= 0) {
            jQuery(e).addClass('dont-stock');
        } else{
            jQuery(e).removeClass('dont-stock');
        }

    },
    initAdd: function() {

        jQuery('body').on('change', '.add-cart input', function() {
            var total = Number(jQuery(this).val());
            jQuery(this).val(total > 0 ? total : 1);
        });

        jQuery('body').on('change', '.list-variants select', function() {

            if (jQuery(this).hasClass('first')) {
                if (jQuery(this).parents('.list-variants').find('.second').val() || !jQuery(this).parents('.list-variants').find('.second').length) {
                    cart.stockAlert(jQuery(this).parents('.list-variants'));
                }
            } else {
                if (jQuery(this).parents('.list-variants').find('.first').val()) {
                    cart.stockAlert(jQuery(this).parents('.list-variants'));
                }
            }

        });

        jQuery('body').on('submit', '.list-variants', function(e) {
            e.preventDefault();

            if (jQuery(this).hasClass('dont-stock')) return false;
            var id = jQuery(this).data('id');
            var quant = jQuery(this).find('input').val();
            var href = jQuery(this).parents('.product').find('> a').attr('href');
            var variant = jQuery(this).data('variants').length ? jQuery(this).find('input').attr('data-variant') : 0;
            var validaApi = jQuery(this).data('api-cart');
            cart.addToCart(id, quant, variant, href, validaApi);
        });

    },
    submitAdd: function() {
        jQuery('.add-cart-modal form').on('submit', function(e) {
            e.preventDefault();
            var productId = jQuery(this).find('#product_modal').val();
            var quant = jQuery(this).find('#quant_modal').val();
            var variant = jQuery(this).find('#variant_modal');

            if (variant.hasClass('required')) {
                jQuery('#alert-modal-add').removeClass('tray-hide')
                return;
            }

            jQuery('.action-add .add-cart').attr('disabled');

            cart.addVariantComplete(variant.val(), quant, productId);

        });
    },

    addToCart: function(productId, quantity, variant, href, valApi) {
        if (valApi == 1){
            cart.loadCustomerId();

            const data = {
                Cart: {
                    session_id : cart.session(),
                    product_id : productId,
                    variant_id : variant ? variant : 0,
                    quantity   : quantity
                }
            };
    
            if(cart.customerId){
                data .Cart.customer_id = cart.customerId;
            }
    
            jQuery.ajax({
                method: 'post',
                url: '/web_api/cart/',
                dataType: 'json',
                data: data,
                success: function() {
                    cart.showCart();
                },
                error: function( ){
                    window.location.href = href;
                }    
            });
    
    
        } else {
            const storeId = jQuery('html').data('store');
            const callback = encodeURIComponent(`/loja/carrinho.php?loja=${storeId}&acao=incluir&IdProd=${productId}&variacao=${  variant ? variant : 0 }`);
    
            jQuery.ajax({
                method: 'post',
                url: `/mvc/store/element/snippets/cart_preview/?loja=${storeId}&callback=${callback}`,    
                data: {
                    quant: quantity
                },
                success: function() {
                    cart.showCart();
                },
                error: function( ){
                    window.location.href = href;
                }    
            });
        }
    },

    ajaxGet: function(url, result) {
        jQuery.ajax({
            method: "GET",
            url: url,
            success: function(response) {
                result(response);
            },
            error: function(jqXHR, status, errorThrown) {
                result({ error: true });
            },
        });
    },

}

jQuery(function(){

    theme.header();
    theme.resets();
    theme.newsletter();
    theme.slideProduct();
    theme.breadcrumb();
    theme.bannerFull();
    theme.bannerInfo();
    theme.slideCatalog();
    theme.loadThemeVersion();
    cart.startCart();
    cart.submitAdd();

    if (jQuery('html').hasClass('page-newsletter')){
        theme.organizeNewsletterPage();
    }

    if (jQuery('.page-contact').length) {
        document.title = 'Fale conosco';

        jQuery('.page-contact .page-content > .container').prepend('<h1>Fale conosco</h1><div class="cols"><div class="box-form"><div class="board"><p class="description">Listamos as formas de contato dispon&iacute;veis em nossa loja, estamos ansiosos em lhe atender da melhor maneira poss&iacute;vel.</p></div></div><div class="info-form"></div></div>');

        jQuery(jQuery('.page-content .container3').eq(1)).appendTo('.info-form');
        jQuery(jQuery('.page-content .container3 .container2 .container2').eq(0)).appendTo('.box-form');

        jQuery('.page-contact .page-content').addClass('active');

        jQuery('.map-iframe').appendTo(jQuery('.info-form'));

    }

    if(jQuery('html').hasClass('page-product')) {
        theme.productVisited();
        theme.shipping();
        theme.startZoom();
        theme.productVariant();
    }

    if(jQuery('html').hasClass('page-depoimentos')){
        theme.organizeStoreReviewsPage();
        theme.validateStoreReviewForm();
    }

    if(jQuery('html').hasClass('page-finalizar_presentes')){
        theme.present();
    }


    jQuery('.noticias li').wrapInner('<div class="box-noticia"></div>');
    jQuery('.box-noticia').append('<span class="button-link">Leia mais</span>');

    jQuery('.page-next a').append(theme.icNext);
    jQuery('.page-prev a').prepend(theme.icPrev);

    // slide index
    if (!jQuery('.section-avaliacoes .dep_lista').length) {
        jQuery('.section-avaliacoes').remove();
    } else {
        var quant = jQuery('.dep_item').length;
        jQuery('.dep_item').addClass('swiper-slide');

        jQuery('.section-avaliacoes .dep_lista').addClass('swiper-wrapper').wrap('<div class="swiper-container"></div>');

        jQuery('.section-avaliacoes .relative').append('<div class="prev arrow-icon"></div><div class="next arrow-icon"></div>');

        var swiper = new Swiper('.section-avaliacoes .swiper-container', {
            slidesPerView: 3,
            // init: false,
            lazy: {
                loadPrevNext: true,
            },
            navigation: {
                nextEl: '.section-avaliacoes .next',
                prevEl: '.section-avaliacoes .prev'
            },
            loop: true,
            breakpoints: {
                850: {
                    slidesPerView: 2,
                },
                640: {
                    slidesPerView: 2
                },
                420: {
                    loop: false,
                    slidesPerView: 1,
                }
            }
        });
    }

    jQuery('.section-avaliacoes .dep_dados').wrap('<a href="/depoimentos-de-clientes"></a>');
    jQuery('.dep_lista li:hidden').remove();

    jQuery('.page-product .increment-page .low').on('click', function() {
        var input = jQuery('.page-product').find('#quantidade #quant');
        input.val(parseInt(input.val()) == 1 ? 1 : parseInt(input.val()) - 1);
    });

    jQuery('.page-product .increment-page .add').on('click', function() {
        var input = jQuery('.page-product').find('#quantidade #quant');
        input.val(parseInt(input.val()) + 1);
    });

    jQuery('.add-cart-modal .increment-page .low').on('click', function() {
        var input = jQuery('.page-product').find('#quantidade #quant');
        input.val(parseInt(input.val()) == 1 ? 1 : parseInt(input.val()) - 1);
    });

    jQuery('.add-cart-modal .increment-page .add').on('click', function() {
        var input = jQuery('.box-add-cart .quant input');
        input.val(parseInt(input.val()) + 1);
    });

    if(jQuery(".section-notices").length && jQuery("html").is(".page-home")){
        setTimeout(function() {
            let script = document.createElement('script');
            script.src = jQuery(".section-notices").attr("data-news");
            script.async = true;
            jQuery("body").append(script);
        }, 750);
    }

    jQuery("#form-comments .botao-commerce").on("click", function(e){
        if(!jQuery("#form-comments .stars .starn.star-on").length) {
            var textError = 'Avaliação do produto obrigatória, dê sua avaliação por favor';
            jQuery("#div_erro .blocoAlerta").text(textError).show(); 
            setTimeout(() => {
                jQuery("#div_erro .blocoAlerta").hide(); 
            }, 5000);
        }
    });
    
});


function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
