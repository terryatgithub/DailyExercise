$(function(){

    if($("#goodsType").val()==1){
        $.ajax({
            global: true,
            url: "/exchange-shop/exchange/userAddressList",
            data: {
                userId:$("#usersId").val()
            },
            success: function (data) {
                var result = eval('(' + data + ')');
                if(result.code==200&&result.data.length!=0){
                    var addr = result.data[0];
                    $("#addressId").val(addr.addressId);
                    $("input[name='receiver']").val(addr.consignee);
                    $("input[name='mobile']").val(addr.mobile);
                    $("#_provinces").attr("data-id",addr.province).text(addr.provinceCn);//省
                    $("#_cities").attr("data-id",addr.city).text(addr.cityCn);//市
                    $("#_district").attr("data-id",addr.district).text(addr.districtCn);//区
                    $("#addr_address").val(addr.address);//详细地址
                };
            },
            error:function(){
            }
        });
    };

    $("#subMobile").on("click",function(){
        var mobile = $(".mobileDiv .mobile").val();
        console.log(mobile)
        if(mobile==""){
            popup("手机号码不能为空！");
            return false;
        }else if(!/^1\d{10}$/.test(mobile)) {
            popup("请填写正确的手机号码！");
            return false;
        }else {
            $.ajax("/exchange-shop/exchange/saveExchangeEntityOrCallChargesOrFlow", {
                global: true,
                data: {
                    tokenId:$("#tokenId").val(),
                    userId:$("#usersId").val(),
                    mobile: mobile,
                    goldRedemptionRecordId:$('.acids').val()
                },
                type: "POST",
                success: function (data) {
                    var result = eval('(' + data + ')');
                    if (result.code === 200) {
                        if(result.data.payment==1){
                            location.href = result.data.pay_url
                        }else {
                            $('body').empty().append('<div class="exchange-box"><div class="success"></div><p>兑换成功</p><div class="desc">感谢您的支持，我们将尽快为您发货</div></div>');
                        };
                        _czc.push(['_trackEvent','兑换手机话费、流量手机端页面填写提交成功的次数',"手机话费、流量",$('.id').val(),'0', 'body']);
                    } else if(result.code===20040){
                        console.log(result);
                        alert("订单已失效，请重新兑换");
                        _czc.push(['_trackEvent','兑换手机话费、流量手机端页面填写提交失败的次数',"手机话费、流量",$('.id').val(),'0', 'body']);
                    }else{
                        alert(result.msg);
                        _czc.push(['_trackEvent','兑换手机话费、流量手机端页面填写提交失败的次数',"手机话费、流量",$('.id').val(),'0', 'body']);
                    }
                }
            });
        };
    });

    var height = window.screen.height;
    $('body').css('height',height);
    if($('.phones').val()!=''&&$('.names').val()!=''&&$("#paystatus").val()==1){
        $('body').empty().append('<div class="exchange-box"><div class="success"></div><p>兑换成功</p><div class="desc">此商品兑换已经提交过地址，请勿重复填写</div></div>');
    };
    //弹窗
    function popup(msg){
        $(".popup").show();
        $(".popup div").text(msg);
        setTimeout(function(){
            $(".popup").hide();
        },3000);
    }


    //验证待添加的收货地址
    function checkAddr(addr) {
        var msg = null;
        switch (true) {
            case !addr.receiver: msg = "请填写收货人信息"; break;
            case absLength(addr.receiver) > 10: msg = "收货人姓名不能超过5个汉字"; break;
            case !addr.mobile: msg = "联系方式不能为空"; break;
            case !/^1\d{10}$/.test(addr.mobile): msg = "错误的联系方式"; break;
            case !addr.province: msg = "省不能为空"; break;
            case !addr.city: msg = "市不能为空"; break;
            case !addr.district: msg = "区不能为空"; break;
            case !addr.address: msg = "请填写收货详细地址"; break;
            case absLength(addr.address) > 100: msg = "收货详细地址最多50个汉字，请修改收货详细地址！"; break;
            case !/^[\u4E00-\u9FA5\s+\a-zA-Z0-9_#＃、()（）-]*$/.test(addr.address) : msg = "详细地址只能填中文、字母、空格、# - _";break;
        }
        console.log(msg);
        return msg ? popup(msg) : true;
    }

    //保存收货地址
    $(".save_addrBox").click(function () {
        var data = {
            country: "86",
            tokenId:$("#tokenId").val(),
            userId:$("#usersId").val(),
            isDefault:1,
            addressId:$("#addressId").val(),
            receiver: $("input[name='receiver']").val(),
            mobile: $("input[name='mobile']").val(),
            province: $("#_provinces").attr("data-id"),//省 id
            city: $("#_cities").attr("data-id"),//市
            district: $("#_district").attr("data-id"),//区
            provinceCn: $("#_provinces").text(),//省 名称
            cityCn: $("#_cities").text(),//市
            regionCn: $("#_district").text(),//区
            address: $("#addr_address").val().trim()//详细地址
        };
        if(location.search!=null){
            //var id = location.search.split('=')[1];
            data.goldRedemptionRecordId = $('.acids').val();
        }

        if (checkAddr(data)) {
            $.ajax("/exchange-shop/exchange/saveExchangeEntityOrCallChargesOrFlow", {
                global: true,
                data: data,
                type: "POST",
                success: function (data) {
                    var result = eval('(' + data + ')');
                    if (result.code === 200) {
                        if(result.data.payment==1){
                            location.href = result.data.pay_url
                        }else {
                            $('body').empty().append('<div class="exchange-box"><div class="success"></div><p>兑换成功</p><div class="desc">感谢您的支持，我们将尽快为您发货</div></div>');
                        };
                        _czc.push(['_trackEvent','兑换实体手机页面填写提交成功的次数',$(".detail h2").text(),$('.id').val(),'0', 'body']);
                    } else if(result.code===20040){
                        console.log(result);
                        alert("订单已失效，请重新兑换");
                        _czc.push(['_trackEvent','兑换实体手机页面填写提交失败的次数',$(".detail h2").text(),$('.id').val(),'0', 'body']);
                    }else{
                        alert(result.msg);
                        _czc.push(['_trackEvent','兑换实体手机页面填写提交失败的次数',$(".detail h2").text(),$('.id').val(),'0', 'body']);
                    }


                }
            });
        }
        return false;
    });


    //省、市、区选择
    $("#toselect-addr").on("click",mobileAddr);

    function mobileAddr(){
        $("body").append('<div id="addAddrPicker"><div class="addrPicker">'+
            '<div class="header"><strong id="confirmAddr">确认</strong></div>'+
            '<div class="addrPickerBody cf">'+
            '</div></div><div class="addrPickerBj"></div></div>');
        var addrHtml = {
            provinces : "",
            city : "",
            district : ""
        };
        each(ht_district[1], function (v) {
            addrHtml.provinces += '<li data-id="{id}">{name}</li>'.format(v);
        });
        each(ht_district[$(addrHtml.provinces).first().attr("data-id")], function (v){
            addrHtml.city += '<li data-id="{id}">{name}</li>'.format(v);
        });
        each(ht_district[$(addrHtml.city).first().attr("data-id")], function (v){
            addrHtml.district += '<li data-id="{id}">{name}</li>'.format(v);
        });
        $(".addrPickerBody").html('<div class="picker-items-col col-province" id="addr_province"><ul>'+addrHtml.provinces+'</ul></div>'+
            '<div class="picker-items-col col-city" id="addr_city"><ul>'+addrHtml.city+'</ul></div>'+
            '<div class="picker-items-col col-district" id="addr_district"><ul>'+addrHtml.district+'</ul></div><div class="current"></div>');
        $(".picker-items-col ul").each(function(){
            $(this).find("li").first().addClass("focus");
        });
        $("#confirmAddr").on("click",function(){

            $("#_provinces").attr('data-id', $("#addr_province ul .focus").attr("data-id"));
            $("#_cities").attr('data-id', $("#addr_city ul .focus").attr("data-id"));
            $("#_district").attr('data-id', $("#addr_district ul .focus").attr("data-id"));

            $("#_provinces").text($("#addr_province ul .focus").text());
            $("#_cities").text($("#addr_city ul .focus").text());
            $("#_district").text($("#addr_district ul .focus").text());

            $("#addAddrPicker").remove();
        });

        $("#addAddrPicker .addrPickerBj").on("click",function(){
            $("#addAddrPicker").remove();
        });
        $(".picker-items-col").each(function(){
            var _this = $(this);
            var start = 0,
                end = 0
            _this.on("touchstart",function(e){
                start = (e.changedTouches || e.originalEvent.changedTouches)[0].pageY;
            });
            _this.on("touchmove",function(e){
                end = (e.changedTouches || e.originalEvent.changedTouches)[0].pageY;
                var diff = end - start;
                var ul = _this.find("ul");
                var top = parseInt(ul.css('top') || 0) + diff;
                ul.css("top",top);
                start = end;
                return false;
            });
            _this.on("touchend",function(e){
                end = (e.changedTouches || e.originalEvent.changedTouches)[0].pageY;
                var diff = end - start;
                var ul = _this.find("ul");
                var ulH = ul.height();
                var liH = ul.find("li").height();
                var top = parseInt(ul.css('top') || 0) + diff;
                if(top>0){
                    top = 0;
                }else if(-top>ulH-liH){
                    top = liH-ulH
                };
                var mod = top / liH;
                var mode = Math.round(mod);
                var index = Math.abs(mode);
                top = -index*liH;
                ul.find("li").eq(index).addClass("focus").siblings().removeClass('focus');
                ul.css("top",top);
                var addrlistHtml = "";
                each(ht_district[ul.find("li").eq(index).attr("data-id")],function(v){
                    addrlistHtml += '<li data-id="{id}">{name}</li>'.format(v);
                });
                var html = $(addrlistHtml);
                html.eq(0).addClass("focus");
                ul.parent().next().find("ul").html(html);
                ul.parent().nextAll(".picker-items-col").find("ul").css("top",0);
                if(ul.parent().nextAll(".picker-items-col").length>1){
                    var district = "";
                    each(ht_district[html.eq(0).attr("data-id")],function(v){
                        district += '<li data-id="{id}">{name}</li>'.format(v);
                    });
                    $district = $(district);
                    $district.eq(0).addClass("focus");
                    $("#addr_district ul").html($district);
                };
                return false;
            });
        });
    };
});