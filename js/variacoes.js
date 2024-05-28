(function($){

    $(document).ready(function () {

        $('.variacao-btn-scroll').click(function(event) {
            event.preventDefault();
            $('html, body').animate({
                scrollTop: $(".lista-variacoes-cor").offset().top - 220
            });
        })

        var categorias_string= $("#multipla-variacao").html();
        var categorias = categorias_string.trim().split(/\s*;\s*/);
        var categoria_id = $("#variacao-category-id").val();

        // console.log('categoria', categoria_id)
        $('.labelMultiVariacao').hide();
        if(categorias.indexOf(categoria_id) > -1){
            $(".onVar").hide();

            
            $('.inputQuantVariacao').before("<button class='variacao-btn rem-quant'>-</button");
            $('.inputQuantVariacao').after("<button class='variacao-btn add-quant'>+</button");
            $('.inputQuantVariacao').attr('readonly', true)
            $('.inputQuantVariacao').val(0);

            $('.labelMultiVariacao').each(function() {
                // console.log($(this))
                var imagePath = null;
                // console.log($(this).find('img'))

                if ($(this).find('img').length > 0) {
                    // console.log($(this).find('img').attr("src").split("/"))
                    var baseUrl = $(this).find('img').attr("src").split("/");
                    if (baseUrl[baseUrl.length-1].substring(0,2) == 50){
                        var variantId = $(this).find("input").val();
                        var that = $(this);
                        $.ajax({
                            method: "GET",
                            url: "/web_api/variants/" + variantId
                        }).done(function( response, textStatus, jqXHR ) {
                            // console.log("image", response.Variant.VariantImage[0].https);
                            imagePath = response.Variant.VariantImage[0].https;
                            adicionarConteudo(that, imagePath)
                            
                        }).fail(function( jqXHR, status, errorThrown ){
                            var response = $.parseJSON( jqXHR.responseText );
                            console.log(response);
                        });
                    } else {
                        var imageName = "/180" + baseUrl.pop().substring(2)
                        imagePath = baseUrl.join("/") + imageName;
                        adicionarConteudo($(this), imagePath)
                    }
                } else {
                    adicionarConteudo($(this), imagePath)
                }

            })

        } else {
            // $(".variacao-cor").remove();
            // $(".variacao-outra").show();
            $(".labelQuantVariacao").hide();
            $('.labelMultiVariacao').each(function() {

                var nomeInteiro = $(this).text().split("-");
                var nome = $(this).text().split("-")[0].trim();

                if (nomeInteiro.length > 1) {
                    for (let index = 1; index < (nomeInteiro.length); index++) {
                        if (index < (nomeInteiro.length-1)){
                            nome = nome + " - " + $(this).text().split("-")[index].replace(/\s/g, '');
                        } else {
                            nome = nome + " - <strong>" + $(this).text().split("-")[index].replace(/\s/g, '') + "</strong>";
                        }
                    }
                }

                $(this).after("<div class='variacaoSimples'><span class='variacao-nome'>" +
                nome + "</span></div>")

                // $(this).parent().css({'border':'none', 'height':'auto', 'margin': '0 4px 0 0', 'width':'auto'});
                $(this).parent().parent().css('justify-content', 'normal')

            })
        }

        function adicionarConteudo(that, imagePath) {
            var addImg = (imagePath == null) ? '<div style="height:180px"></div>' : ("<img class='variacao-img' src='" + imagePath +  "'>");
            // console.log($(this).text())
            var stringInteira = that.text().split("-");
            var nome = that.text().split("-")[0].trim();
            var quant = that.parent().find(".labelQuantVariacao").find(".label-quant-var").find("span").html().split("/")[1].trim()
            if (stringInteira.length > 2) {
                for (let index = 1; index < (stringInteira.length-1); index++) {
                    nome = nome + " - " + that.text().split("-")[index].replace(/\s/g, '');
                }
                var preco = that.text().split("-")[stringInteira.length-1].replace(/\s/g, '');
            } else {
                var preco = that.text().split("-")[1].replace(/\s/g, '');
            }

            that.after("<div class='variacaoDetalhes'>" + addImg + "<span class='variacao-nome'>" + nome + 
            "</span><span class='variacao-preco'>" + preco + " /unidade</span><span class='quant-var' style='display: none'>" + quant + "</span></div>")

            if (that.parent().attr('class').split("sem_estoque").length > 1) {
                var img = that.parent().find('.variacao-img');
                if (img.length > 0){
                    img.css({"-webkit-filter" : "blur(2px)", "filter" : "blur(2px)"})
                }
                that.parent().append("<span class='sem-estoque-txt'>Sem Estoque<span>");
                that.parent().find(".labelQuantVariacao").hide()
            }
        }

        $('.variacaoSimples').click(function() {
            var selected = $(".var-selected");
            var variacaoId = $(this).parent().attr('class').split("variacao-")[1].split(" ")[0]
            $(this).attr('varId', variacaoId);

            $.ajax({
                method: "GET",
                url: "/web_api/variants/" + variacaoId
            }).done(function( response, textStatus, jqXHR ) {
                imagePath = response.Variant.VariantImage[0].https;
                $('.box-gallery .image-show img').attr('src', imagePath)
                
            }).fail(function( jqXHR, status, errorThrown ){
                var response = $.parseJSON( jqXHR.responseText );
                console.log(response);
            });

            var selectedId = null;

            if (!$(this).parent().hasClass('sem_estoque')) {
                if (selected.length > 0){
                    selectedId = selected.attr('varId');
                    $('#var' + selectedId).prop("checked", false)
                    selected.removeClass('var-selected');
                }
    
                if (variacaoId != selectedId){
                    $('#var' + variacaoId).prop("checked", true)
                    $(this).addClass('var-selected')
                    $('#quant').attr('name', 'variacoes[' + variacaoId + '][quant]')
                }
            }
        })

        $('.add-quant').click(function(event) {
            event.preventDefault();
        
            let variacao = $(this).parent().parent().attr('class').split("variacao-")[1].split(" ")[0];
            var input = $('[name="variacoes[' + variacao + '][quant]"]');

            var maxQuant = parseInt($(this).parent().parent().find(".quant-var").html());
            
            // console.log(maxQuant)

            if (parseInt(input.val()) < maxQuant){
                input.val(parseInt(input.val())+1)
                $('#var' + variacao).attr("checked", true)
                $('.variacao-' + variacao).css("border", '2px solid #027C36')
            }
        })

        $('.rem-quant').click(function(event) {
            event.preventDefault();
            let variacao = $(this).parent().parent().attr('class').split("variacao-")[1].split(" ")[0];
            var input = $('[name="variacoes[' + variacao + '][quant]"]');
            
            if (parseInt(input.val()) > 0) {
                input.val(parseInt(input.val())-1)
            }
            
            if (parseInt(input.val()) < 1) {
                $('#var' + variacao).prop("checked", false)
                $('.variacao-' + variacao).css("border", '1px solid #e7e3e3')
            }
        })
    });

    $(window).load(function() {
        $('#menuVars').css("visibility", 'visible');
    })

})(jQuery);