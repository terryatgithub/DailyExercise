var tmpl = {
    info:"<div class=\"goodsName\">{goodsName}</div>\n" +
         "<ul>" +
             "<li><span class='listName'>兑换所需：</span>{activityPrice}</li>"+
             "<li><span class='listName'>市场价值：</span><span class='price'>{marketPrice}元</span></li>"+
             "<li><span class='listName'>剩余数量：</span><span class='price'>{activityStock}件</span><span class='limitTimes'>每人限兑{limitTimes}件</span></li>"+
             "<li><span class='listName'>兑换时间：</span><span class='price'>{startTime} ~ {endTime}</span></li>"+
        "</ul>"+
            "<div class='exchangeRules'><div class=\"actInfoBtn\" id='exchangeRules'>\n" +
                "<div class='exchangeRulesdiv'>{exchangeRules}{commonRules}</div>" +
            "</div></div>",
    listTmpl : '<div class="listTitle"><span>{title}</span>{subTitle}</div>',
    topRecordTmpl : '<li>{0} 兑换了 {1}</li>',
    exchangeRecordHead: '<li data-id="{id}" class="myBtn {_class}">\n' +
                            '<dl class="cf">\n' +
                                '<dt><img src="{goodsImg}" /></dt>\n' +
                                '<dd>\n' +
                                    '<p class="goodsName">{goodsName}</p>\n' +
                                    '<p class="exchangeMoney">{exchangeMoney}</p>\n' +
                                '</dd>\n' +
                            '</dl>\n' +
                            '<div class="leftArrow">{status}</div>\n' +
                        '</li>',
    coinHistoryListTmpl: '' +
        '<li class="coocaa-btn-history" {leftTarget} {rightTarget}>' +
        '<div>{action}</div>' +
        '<div>{detail}</div>' +
        '<div>{dateTime}</div>' +
        '</li>'
};
var goExchangeBtn = $("#goExchangeBtn");
var goLogin = $("#goLogin");
var modePop20 = $("#modePop20");
var indexList = $("#rowsList");
var currentPage = "default";
var starSetTime;
var starSetTime1;
var ActivityId;
var goodsType;
var RecaptureUrl;
var goldRedemptionRecordId;
var receiveType;
var clickID = "";
var phone = "";
var goodsName = "";
var goPayOrderData;
var btnnum = 3;
var recordid;
var onResumePage;
var indexPage = {
    current:"1",
    flag:true
};
var myPage = {
    current:"",
    flag:true,
    pages:""
};
var televisionInfo="";
var myUserstoken = "";
var signToken = "";
var UserOpenId = "未登录";
var initSrvOnce = {
    doneWhenUnLogin: false,
    doneWhenLogin: false,
};
var _currentFocusOnHomePage = 0; //用户在首页的焦点记忆
//用户登录相关
var accountVersion = "", cAppVersion = "", tencentWay="";

//正式token:2.7c26f239210746138cff05226983171c

// 本地调试需打开此部分
televisionInfo = {"chip":"9R15","panel":"42","chipid":"RTD2995|01","model":"E710U","devid":"36c4f90d70234a8cd44f74a88acb3f78","emmcid":"11010030303847393251471309d330ff","activeid":"10687634","brand":"Skyworth","mac":"1ca7703f5869","androidsdk":17,"version":"6.00.170816"}
usersLogin("2.2b412fbd5ad74350af6904913fa1d5a2",1);//测试
myUserstoken = "2.2b412fbd5ad74350af6904913fa1d5a2";
topic.id = 93 //testonly(商品分组测试id）
ajaxLoadPage(topic.id,1,1);
$(function () {
    goExchangeBtn.unbind("itemClick").bind("itemClick",function () {
        var $this = $(this);
        var exchange_status = "0";
        if(signToken == ""){//未击登陆
            exchange_status = "1";
            console.log("未登录啊");
            obj.startLoginC();
            console.log("提示登录啊");
        }else if($this.attr("data-flag") == "1" && signToken != ""){//已登陆 去兑换
            exchange_status = "0";
            checkExchange(ActivityId);
        }else if($this.attr("data-flag") == "2" && signToken != ""){//已登陆 金币不足
            exchange_status = "2";
            // location.href = "https://webapp.skysrt.com/zy/618/index.html?id=69&shooterId=70&smarterId=71&battleOneId=72&battleTwoId=73&source=task";
        };
    });
});
function pkgButtonLog(logName,data) {
    console.log("日志项名称:"+logName+";------data数据："+data);
    //点击事件
};
//本地调试部分结束

//用户登录相关
function usersLogin(token,type) {
    //type : 1  点击登录按钮
    //type : 2  点击去兑换登录
    //type : 3  电视端返回同步登录
    //正常同步电视登录不提交大数据
    $.ajax({
        url:"/exchange-shop/users/login",
        beforeSend: function(request) {
            request.setRequestHeader("DEVICE-INFO", JSON.stringify(televisionInfo));
        },
        data:{
            tokenId:token
        },method: "POST",
        success: function (data) {
            // var result = eval('(' + data + ')');
            var result = JSON.parse(data)
            if(result.code==200){
                signToken = result.data.signToken;
                $(".noLogin").hide();
                $(".loginSuccess").show();
                if(activitySwitch != "on") {
                    $(".userInfo .goldcoin .newsIcon").html("<img src='"+result.data.avatar+"' />")
                }
                if(type != 1){
                    map = new coocaakeymap($(".coocaa_btn"), $(".scwrapper .coocaa_btn")[0], "btnFocus", function() {}, function(val) {}, function(obj) {});
                };
                if(activitySwitch == "on" && bFirstIn == "true") {
                    doInitSrvOnceOnly(true);
                }else {
                    getUserGold();
                }
            }else {
                signToken = "";
                $(".noLogin").show();
                $(".loginSuccess").hide();
                doInitSrvOnceOnly(false);
            };
            if(type == 1){
                searchf(2);
            };
        },
        error: function(){
            getTopRecord();
        },
        complete: function(){
            bindGoExchangeBtn();
        }
    });
};

function getUserGold() {
    $.ajax({
        url:"/exchange-shop/topic/getUserGold",
        method: "POST",
        success: function (result) {
            console.log('getUserGold'+result)
            // var json = eval('(' + result + ')');
            var json = JSON.parse(result);
            $(".userInfo .grade .text").text(json.data.pointsCoinsLevel.coins.toFixed(1));
            if(activitySwitch == "on") {
                $(".userInfo .goldcoin .text").text(json.data.pointsCoinsLevel.clientCoins.toFixed(1));
            }else {
                $(".userInfo .goldcoin .text").addClass("lv"+json.data.pointsCoinsLevel.level.gradeLevel);
            }
        },
        error: function(){
        }
    });
};

function returnPage() {
    clearInterval(starSetTime);
    clearInterval(starSetTime1);
    if(currentPage == "activityInfo"){//详情页
        // starSetTime = setInterval("time('1')", 1000);
        starSetTime = setInterval(time, 1000, 1);
        $("#scwrapper .line").empty();
        indexPage.flag = true;
        ajaxLoadPage(topic.id,1,1);
        currentPage = "default";
        $(".activityInf").hide();
        $(".defaultPage").show();
        $("header .top1").show();
        $("header .top2").hide();
        map = new coocaakeymap($(".coocaa_btn"), $("#scwrapper .returnFocus")[0], "btnFocus", function() {}, function(val) {}, function(obj) {});
        $("#scwrapper .returnFocus").removeClass("returnFocus");
        $("#myExchange").unbind("itemClick").bind("itemClick",myExchange1);
    }else if(currentPage == "activityInfoPop" || currentPage == "activityInfoExplain"){//详情页弹窗
        // starSetTime1 = setInterval("time('2')", 1000);
        starSetTime1 = setInterval(time, 1000, 2);
        $("#modePop20,#modePopMobile").hide();
        currentPage = "activityInfo";
        map = new coocaakeymap($(".actInfoBtn"), $(".actInfoBtn.btnFocus")[0], "btnFocus", function() {}, function(val) {}, function(obj) {});
    }else if(currentPage == "coinHistory"){//金币明细
        // starSetTime = setInterval("time('1')", 1000);
        starSetTime = setInterval(time, 1000, 1);
        currentPage = "default";
        $(".coinHistory").hide();
        $(".defaultPage").show();
        map = new coocaakeymap($(".coocaa_btn"), $(".coocaa_btn")[_currentFocusOnHomePage], "btnFocus", function() {}, function(val) {}, function(obj) {});
        $("#goCoinHistory").unbind("itemClick").bind("itemClick",pageCoinHistoryManager.goCoinHistoryFunc);
    }else if(currentPage == "exchangeRecord"){//我的兑换
        // starSetTime = setInterval("time('1')", 1000);
        starSetTime = setInterval(time, 1000, 1);
        currentPage = "default";
        $(".exchangeRecord").hide();
        $(".defaultPage").show();
        map = new coocaakeymap($(".coocaa_btn"), $(".coocaa_btn")[_currentFocusOnHomePage], "btnFocus", function() {}, function(val) {}, function(obj) {});
        $("#myExchange").unbind("itemClick").bind("itemClick",myExchange1);
    }else if(currentPage == "recordInfoPop"){//我的兑换弹窗
        currentPage = "exchangeRecord";
        $("#modePop20,#modePopMobile").hide();
        map = new coocaakeymap($(".myBtn"), $("#ex-list .returnFocus")[0], "btnFocus", function() {}, function(val) {}, function(obj) {});
        $("#ex-list .returnFocus").removeClass("returnFocus");
    };
};

$(document).keydown(function(event){
    if(event.keyCode == "27"){
        returnPage()
    }else if(event.keyCode == "38" && currentPage == "activityInfoExplain"){
        document.getElementById("exchangeRulesPop").scrollTop = $(".exchangeRulesPop").scrollTop()-$(".exchangeRulesPop").height();
    }else if(event.keyCode == "40" && currentPage == "activityInfoExplain"){
        document.getElementById("exchangeRulesPop").scrollTop = $(".exchangeRulesPop").scrollTop()+$(".exchangeRulesPop").height();
    }
});

function getTopRecord(){
    $.ajax({
        url:"/exchange-shop/topic/getTopRecord",
        method: "POST",
        data:{
            current:1,
            size:50
        },
        success: function (result) {
            // var data = eval('(' + result + ')');
            var data = JSON.parse(result)
            if(data.code == 200){
                if(data.data.notice){
                    $("#getTopRecord .newContent ul").html("<li>"+data.data.notice.noticeMessage+"</li>");
                    noticeMarquee(data.data.notice.noticeMessage);
                }else{
                    if(data.data.records.length>0){
                        var listHtml = "";
                        each (data.data.records,function (v) {
                            if(v.users != null){
                                listHtml += tmpl.topRecordTmpl.format(v.users.userName,v.goodsName);
                            };
                        });
                        $("#getTopRecord .newContent ul").empty().append(listHtml);
                        setInterval(AutoScroll,5000, "#getTopRecord .newContent","-60px");
                    };
                };
            }else {
                $("#getTopRecord").hide();
            };
        },
        error: function(){
            $("#getTopRecord").hide();
        }
    });
};

$(function(){
    searchf();

    if(activitySwitch == "on") {
        $(".defaultPage").addClass("actOngoing");
        $(".activityInf").css("background", "#1d2530");
        $(".exchangeRecord").css("background", "#1d2530");
    }
    //ajaxTvSource();
    var headHeight = $("body header").height();
    $("#scwrapper").height(1080-headHeight);
    //金币动态
    // starSetTime = setInterval("time('1')", 1000);
    starSetTime = setInterval(time, 1000, 1);
    var topicBj = {
        img : topic.topicImg?topic.topicImg : (activitySwitch == "on" ? '/static/images/618/bg.jpg' : ''),
        color:topic.colorConfigure?topic.colorConfigure : ""
    };
    $("body").css({
        "height":$(window).height(),
        "background-image":"url("+topicBj.img+")",
        "background-color":topicBj.color
    });
    $("#saveConfirmationExchange").unbind("itemClick").bind("itemClick",function(){
        saveConfirmationExchange();
    });
    //去赚金币
    $("#goCoinDetails").bind("itemClick", goCoinDetailsPage);
    //所有取消操作
    $(".cancel").unbind("itemClick").bind("itemClick",function () {
        returnPage();
    });
    //点击我的兑换
    $("#myExchange").unbind("itemClick").bind("itemClick",myExchange1);
    $("#goCoinHistory").unbind("itemClick").bind("itemClick",pageCoinHistoryManager.goCoinHistoryFunc);
    $(".noRecordBtn").bind("itemClick",function () {
        $(".exchangeRecord").hide();
        $(".defaultPage").show();
        returnPage();
        // map = new coocaakeymap($(".coocaa_btn"), $("#scwrapper .coocaa_btn")[0], "btnFocus", function() {}, function(val) {}, function(obj) {});
        $("#myExchange").unbind("itemClick").bind("itemClick",myExchange1);
    });
    // var t=setTimeout("loadImg()",2000);
    $("#upScroll").on("itemClick",function () {
        document.getElementById("goodsGalleries").scrollTop = $("#goodsGalleries").scrollTop()-$("#goodsGalleries").height();
    });

    $("#downScroll").on("itemClick",function () {
        document.getElementById("goodsGalleries").scrollTop = $("#goodsGalleries").scrollTop()+$("#goodsGalleries").height();
    });

    console.log("init activitySwitch:"+activitySwitch+",bFirstIn:"+bFirstIn)
    //活动开启时：
    if(activitySwitch == "on") {
        // $("#goActivityHome").on("itemClick", goActivityHomepage);
        if(bFirstIn == "true") {
            toast("恭喜获得150金币,快去玩游戏赢免单吧!", 5000);
        }
    }
    getTopRecord();
});
function goCoinDetailsPage() {
    // var url = 'https://beta.webapp.skysrt.com/yuanbo/memberGrowth/index.html' //测试环境
    _currentFocusOnHomePage = $(".coocaa_btn").index($(this))
    var logdata = {button_name: '金币说明'};
    pkgButtonLog("exchange_mall_home_page_buttton_onclick",JSON.stringify(logdata));
    var url = 'https://webapp.skysrt.com/cc7.0/memberGrowth/index.html'
    coocaaosapi.startNewBrowser(url, function () {
        console.log('web url ok')
    }, function () {
        console.log('web url fail')
    })
}
function goEarnCoin(e) {
    var logdata = {
        button_name: e.data.button_name
    };
    if(!e.data.from) {
        _currentFocusOnHomePage = $(".coocaa_btn").index($(this))
    }
    pkgButtonLog("exchange_mall_home_page_buttton_onclick",JSON.stringify(logdata));
    coocaaosapi.myCenter(
        function(message) {
        },
        function(error) {
        });
}
function searchf(){
    if(openpage != null){
        if(openpage == "myExchange"){
            myExchange1(1);
        }else {
            var actId = openpage.split("_")[1];
            openActPage(actId,1);
        };
    };
};

// function loadImg() {
//     $(".loadImg").each(function () {
//         $(this).attr("src",$(this).attr("data-src"));
//     });
// };

function ajaxLoadPage(topicId,current,type) {
    $.ajax({
        url:"/exchange-shop/topic/page",
        beforeSend: function(request) {
            request.setRequestHeader("DEVICE-INFO", JSON.stringify(televisionInfo));
        },
        data:{
            current:current,
            size:10,
            topicId:topicId
        },
        method: "POST",
        beforeSend: function(request) {
            $(".loader-bg").show();
        },
        complete: function () {
            $(".loader-bg").hide();
        },
        success: function (result) {
            $("#rowsList").empty();
            // var data = eval('(' + result + ')');
            var data = JSON.parse(result)
            if(data.code == 200 && data.data.page.records.length != 0){
                var page = data.data.page;
                if(current==1){
                    sourceType=data.data.sourceType;
                }
                indexPage.current = page.current;
                if(page.current == page.total){
                    indexPage.flag = false;
                };
                tabZoneManager.init()
                each(page.records,function (v,i) {
                    each(v, function(w, j) {
                        loadList(w, j);
                    })
                });
                enableHomePageClick()
                enableHomePageFocus()
                if($(".exchangeRecord").css("display") == "none" && $(".activityInf").css("display") == "none"){
                    tabZoneManager.autoFocusSpecifiedTabItem()
                    console.log('restore focus: ' + _currentFocusOnHomePage + ', total: ' + $(".coocaa_btn").length)
                    map = new coocaakeymap($(".coocaa_btn"),$(".coocaa_btn")[_currentFocusOnHomePage], "btnFocus", function() {}, function(val) {}, function(obj) {});
                    document.getElementById("scwrapper").scrollTop = offsetTop($(".coocaa_btn")[_currentFocusOnHomePage]);
                };
            };
            // $(".scwrapper .btnFocus").removeClass("thisFocus");
        },
        error: function(){
        }
    });
};
function enableHomePageFocus() {
    $("#scwrapper .coocaa_btn").unbind("itemFocus").bind("itemFocus", function(event, param1) {
        // if($(this).nextAll(".box").length <6 && indexPage.flag){
        //     $(".scwrapper .btnFocus").addClass("thisFocus");
        //     ajaxLoadPage(topic.id,indexPage.current+1,2);
        // };
        var e = $(this),
            flag = e.attr("data-flag");
        console.log('focus, flag:'+flag+', cur: ' + $(".coocaa_btn").index(e) + ', length: ' + $(".coocaa_btn").length);
        document.getElementById("scwrapper").scrollTop = offsetTop(e);
        if(flag == "tab" && !e.hasClass('tabSelected')) { //避免同一个tab反复操作
            e.parent().children().removeClass('tabSelected')
            e.addClass('tabSelected')
            tabZoneManager.changeTab(e.attr("data-tabzoneid"), e.attr("data-tabid"))
            if(param1 != 'noSetFocus') {
                map = new coocaakeymap($(".coocaa_btn"),$(".coocaa_btn")[$(".coocaa_btn").index(e)], "btnFocus", function() {}, function(val) {}, function(obj) {});
            }
            enableHomePageFocus()
            enableHomePageClick()
        }
    });
}
function enableHomePageClick() {
    $(".rowsList .line .box,.rowsList .line .activityAds").unbind("itemClick").bind("itemClick", function() {
        activityInfo($(this));
    });
}
function offsetTop(obj) {
    var top = 0;
    var el = $(obj).parents('.line,.tabZone')
    var prev = el.prevAll()
    prev.each(function(){
        top += $(this).outerHeight()
    })
    var relateTitle = el.prevUntil('.kongDiv', '.listTitle')
    var relateTab = el.prevUntil('.kongDiv', '.tabZone')
    if(!!relateTitle.length){
        top = top-relateTitle.outerHeight();
    };
    if(!!relateTab.length){
        top = top-relateTab.outerHeight();
    };
    if(top > 0 ){
        $("header .top1").hide();
        $("header .top2").show();
    }else if(top <= 0){
        $("header .top1").show();
        $("header .top2").hide();
    };
    return top;
};
var tabZoneManager = function() {
    var _tabZoneList = [],
        _specifiedTabInfo = [];
    function _generateVirtualNode(del) { //虚拟节点，存储当前tab商品用
        if (del) {
            $('#virtualTabList').remove()
        } else {
            if(!$('#virtualTabList').length) {
                $('body').append('<div style="display: none;" id="virtualTabList"></div>')
            }
        }
    }
    return {
        init: function() {
            _tabZoneList = []
            _generateVirtualNode()
        },
        addNewZone: function() {
            _tabZoneList[_tabZoneList.length] = []
        },
        getLatestZoneId: function() {
            return _tabZoneList.length - 1
        },
        getVirtualTabList: function(){
            return $('#virtualTabList')
        },
        addTabContent: function(index, node) {
            _tabZoneList[_tabZoneList.length-1][index] = node
        },
        getTabContent: function(zoneId, tabId) {
            console.log('zone: '+zoneId+',tab: '+tabId)
            return _tabZoneList[zoneId][tabId]
        },
        changeTab: function(zoneId, tabId) {
            console.log('zone: '+zoneId+',tab: '+tabId)
            $('#tabzone'+zoneId).nextUntil('.kongDiv').remove()
            $('#tabzone'+zoneId).after(this.getTabContent(zoneId, tabId))
        },
        setSpecifiedTabItem: function(tabArr) {
            if(!tabArr.length || openTab != tabArr[0].id) {
                return
            }
            _specifiedTabInfo = tabArr
            //case1: 如果是在首次进入页面时显示指定tab，则只在第一次进来时显示，后续不再
            //case2: 如果是进入页面后用户点击时的焦点记忆，则这个值为null即可。
            openTab = null;
        },
        autoFocusSpecifiedTabItem: function() { //进入首页需要自动落焦到指定tab 或 焦点记忆
            if(!_specifiedTabInfo.length) {
                return;
            }
            //step1: 显示指定tab内容，对焦点记忆来说：包括所有已选中的tab都恢复现场
            var target;
            _specifiedTabInfo.forEach(function(item){
                target = $('li.coocaa_btn[data-tabid='+item.tabId+'][data-tabzoneid='+item.tabZoneId+']')
                target.trigger('itemFocus', ['noSetFocus'])
            })
            //step2: 如果是首次进入页面，设置相应的tab焦点
            if(!_currentFocusOnHomePage) {
                _currentFocusOnHomePage = $(".coocaa_btn").index(target)
            }
            //step3: reset当前值，避免后续错用
            _specifiedTabInfo = []
        },
        printTabList: function() { //debug only
            console.group('tabList:---------')
            _tabZoneList.forEach(function(item, index) {
                console.log('== zone'+index);
                item.forEach(function(o, idx) {
                    console.log(' =tab'+idx)
                    console.log(o)
                })
            })
            console.groupEnd()
        }
    }
}();
function loadList(data, index) {
    var specialAreaType = data.specialAreaType;
    if(data.isShowTitle != 0 && index == 0){ //插入title信息
        $("#rowsList").append(tmpl.listTmpl.format({
            title:data.specialAreaName,
            subTitle:data.specialAreaBrief ? "<pre>"+data.specialAreaBrief+"</pre>" : ""
        }));
    };
    if (specialAreaType == 3) {//插入tab信息
        if (index == 0) {//插入tab zone
            tabZoneManager.addNewZone()
            $("#rowsList").append("<div class='tabZone cf' id="+("tabzone"+tabZoneManager.getLatestZoneId())+"><ul class='tabList'></ul></div>")
        }
        //插入tab项
        var tabSelected = data.specialAreaTabSelect === '1' ? 'tabSelected' : '',
            tabZoneId = tabZoneManager.getLatestZoneId(),
            tabId = data.specialAreaTabSort - 1;
        tabZoneManager.setSpecifiedTabItem([{id: data.id, tabZoneId: tabZoneId, tabId: tabId}])
        virtualTabList = tabZoneManager.getVirtualTabList(); //当前tab项的商品列表
        $("#rowsList .tabZone").last().find('.tabList').append("<li class='coocaa_btn "+ tabSelected + "'data-flag='tab' data-tabzoneid="+tabZoneId+" data-tabid="+tabId+">"+ data.specialAreaTabTitle +"</li>")
    }

    each(data.templates,function (v,i) {
        var boxi = " isTitle", content = '', curBoxIndex = 1;
        if(i != 0){
            boxi = "";
        };
        if(v.activities.length != 0 || v.activityAds.length != 0){
            var tId = data.id;
            var TitleName = data.specialAreaName;
            var tmplHtml = "";
            var boxSize = 0;
            if(specialAreaType==2){ //2是活动专区
                $("#rowsList").append("<div class='line cf' data-id='"+tId+"' data-title='"+TitleName+"'></div>");
                tmplHtml = "<div class='activityAds coocaa_btn boxAd_{boxSize} {first}' data-flag='ad'><div class='activityAdsImg'><img src='{imgUrl}' /></div></div>";
                boxSize = v.activityAds.length;
                each(v.activityAds,function (d,k) {
                    var adHtml = $(tmplHtml.format({
                        boxSize:boxSize,
                        imgUrl:d.imgUrl,
                        first:k==0?"boxFirst" : ""
                    }));
                    adHtml[0].data = d;
                    $("#rowsList .line:last-child").append(adHtml);
                    // indexList.append(adHtml);
                });
            }
            else if(specialAreaType==0){ //0是商品专区
                $("#rowsList").append("<div class='line cf' data-id='"+tId+"' data-title='"+TitleName+"'></div>");
                tmplHtml = v.templateContent;
                var boxFirs = "boxFirst";
                boxSize = 0;
                each(v.activities,function(d){
                    if(d.goodsInfo.goodsSource>0){
                        if(d.goodsInfo.goodsSource==sourceType)
                            boxSize++;
                    }else{
                        boxSize++;
                    }
                });
                if(boxSize>0){
                    curBoxIndex = 1
                    each(v.activities,function (d) {
                        if(d.goodsInfo.goodsSource==0|| d.goodsInfo.goodsSource == sourceType){
                            // var goldCondition = eval('(' + d.goldCondition + ')');
                            var goldCondition = JSON.parse(d.goldCondition);
                            var goldConditionHtml = "";
                            if(goldCondition.vip == "2"){
                                goldConditionHtml += "<span class='isVip1'>VIP会员</span>";
                            }else if(goldCondition.vip == "0"){
                                goldConditionHtml += "<span class='isVip1'>影视VIP</span>";
                            }else if(goldCondition.vip == "1"){
                                goldConditionHtml += "<span class='isVip'>教育VIP</span>";
                            };
                            if(goldCondition.grade!="-1" && goldCondition.grade!="1"){
                                goldConditionHtml += "<span class='lv'>Lv"+goldCondition.grade+"+</span>";
                            };
                            var timestamp = parseInt((new Date()).valueOf()/1000);
                            var actType;
                            var time = "";
                            if(timestamp >= d.startTime  && timestamp < d.endTime){
                                actType = d.activityStock <=0 ? "stockEnd" : "underway";
                                //活动进行中
                            }else if(timestamp < d.startTime){
                                actType = "noBeginning";
                                time = new Date(d.startTime*1000).format("MM月dd日 HH:mm");
                                //活动没开始
                            }else {
                                //活动结束
                                actType = "timeEnd";
                            };
                            var actHtml = $(tmplHtml.format({
                                rightTarget:curBoxIndex++ == boxSize ? 'rightTarget="#actId'+d.id+'"' : '',
                                did:'actId'+d.id,
                                goldCondition:goldConditionHtml,
                                boxSize:boxSize,
                                id:d.id,
                                imgUrl:d.imgUrl,
                                first:boxFirs+boxi,
                                tvImgUrl:boxSize==2 || boxSize ==4 ? d.goodsInfo.thumb[1].imgUrl : d.goodsInfo.thumb[0].imgUrl,
                                goodsName:d.goodsInfo.goodsName,
                                goldPriceHtml:d.shopPrice==0?"<em>"+d.goldPrice+"</em><span class='icon'></span>":"<em>"+d.goldPrice+"</em><span class='icon'></span><span class='plusText'>+</span><em>"+d.shopPrice+"</em><span>元</span>",
                                marketPrice:"￥"+d.goodsInfo.marketPrice,
                                activityStock:d.activityStock,
                                actType:actType,
                                time:time ? "开放兑换时间 "+time : ""
                            }));
                            $("#rowsList .line").last().append(actHtml);
                            $("#rowsList .line .box").last().attr({
                                'data-local-activityStock':d.activityStock,
                                'data-local-id':d.id,
                                'data-local-startTime':d.startTime,
                                'data-local-endTime':d.endTime
                            })
                            boxFirs = "";
                        };
                    });
                }else{
                    $("#rowsList .line:last-child").remove();
                }
            }
            else if(specialAreaType==3){ //3是商品分组专区，就是有多个tab页的
                content = "<div class='line cf' data-id='"+tId+"' data-title='"+TitleName+"'></div>"
                if(!!tabSelected) {
                    $("#rowsList").append(content);
                }
                virtualTabList.append(content);
                tmplHtml = v.templateContent;
                var boxFirs = "boxFirst";
                boxSize = 0;
                each(v.activities,function(d){
                    if(d.goodsInfo.goodsSource>0){
                        if(d.goodsInfo.goodsSource==sourceType)
                            boxSize++;
                    }else{
                        boxSize++;
                    }
                });
                if(boxSize>0){
                    curBoxIndex = 1
                    each(v.activities,function (d) {
                       if(d.goodsInfo.goodsSource==0|| d.goodsInfo.goodsSource == sourceType){
                            // var goldCondition = eval('(' + d.goldCondition + ')');
                            var goldCondition = JSON.parse(d.goldCondition);
                            var goldConditionHtml = "";
                            if(goldCondition.vip == "2"){
                                goldConditionHtml += "<span class='isVip1'>VIP会员</span>";
                            }else if(goldCondition.vip == "0"){
                                goldConditionHtml += "<span class='isVip1'>影视VIP</span>";
                            }else if(goldCondition.vip == "1"){
                                goldConditionHtml += "<span class='isVip'>教育VIP</span>";
                            };
                            if(goldCondition.grade!="-1" && goldCondition.grade!="1"){
                                goldConditionHtml += "<span class='lv'>Lv"+goldCondition.grade+"+</span>";
                            };
                            var timestamp = parseInt((new Date()).valueOf()/1000);
                            var actType;
                            var time = "";
                            if(timestamp >= d.startTime  && timestamp < d.endTime){
                                actType = d.activityStock <=0 ? "stockEnd" : "underway";
                                //活动进行中
                            }else if(timestamp < d.startTime){
                                actType = "noBeginning";
                                time = new Date(d.startTime*1000).format("MM月dd日 HH:mm");
                                //活动没开始
                            }else {
                                //活动结束
                                actType = "timeEnd";
                            };
                            var actHtml = $(tmplHtml.format({
                                rightTarget: curBoxIndex++ == boxSize ? 'rightTarget="#actId'+d.id+'"' : '',
                                did:'actId'+d.id,
                                goldCondition:goldConditionHtml,
                                boxSize:boxSize,
                                id:d.id,
                                imgUrl:d.imgUrl,
                                first:boxFirs+boxi,
                                tvImgUrl:boxSize==2 || boxSize ==4 ? d.goodsInfo.thumb[1].imgUrl : d.goodsInfo.thumb[0].imgUrl,
                                goodsName:d.goodsInfo.goodsName,
                                goldPriceHtml:d.shopPrice==0?"<em>"+d.goldPrice+"</em><span class='icon'></span>":"<em>"+d.goldPrice+"</em><span class='icon'></span><span class='plusText'>+</span><em>"+d.shopPrice+"</em><span>元</span>",
                                marketPrice:"￥"+d.goodsInfo.marketPrice,
                                activityStock:d.activityStock,
                                actType:actType,
                                time:time ? "开放兑换时间 "+time : ""
                            }));
                            var localData = {
                                'data-local-activityStock':d.activityStock,
                                'data-local-id':d.id,
                                'data-local-startTime':d.startTime,
                                'data-local-endTime':d.endTime
                            }
                            if (!!tabSelected) {
                                $("#rowsList .line").last().append(actHtml);
                                var boxLast = $("#rowsList .line .box").last()
                                boxLast.attr(localData)
                                virtualTabList.children('.line').last().append(boxLast.clone());
                            } else {
                                virtualTabList.children('.line').last().append(actHtml);
                                virtualTabList.find('.box').last().attr(localData)
                            }
                            boxFirs = "";
                       };
                    });
                }else{
                    $("#rowsList .line").last().remove();
                    virtualTabList.children('.line').last().remove();
                }
            };
        };
    });

    if (specialAreaType == 3) { //保存tab内容
        tabZoneManager.addTabContent(data.specialAreaTabSort-1, virtualTabList.html())
        virtualTabList.empty()
    }

    if(data.isShowTitle != 0){ //插入空分割行
        if (specialAreaType != 3 || !!tabSelected) {
            $("#rowsList").append('<div class="kongDiv"></div>');
        }
    };
};

// 金币快迅滚动
function AutoScroll(obj,top){
    $(obj).find("ul:first").animate({
        marginTop:top
    },500,function(){
        $(this).css({marginTop:"0px"}).find("li:first").appendTo(this);
    });
};
//通知跑马灯
function noticeMarquee(msg){
    if(activitySwitch != "on") {return;}
    if(msg.length < 18){return;}
    $("header .new ul li").wrap("<marquee></marquee>")
}

function saveUserFocus(obj) {
    _currentFocusOnHomePage = $(".coocaa_btn").index(obj) //保存用户当前焦点
    //保存当前焦点所属tab（如果有的话）
    var tab = obj.parent().prevAll('.tabZone').find('.coocaa_btn.tabSelected');
    if(!!tab.length) {
        var focusArr = [].slice.call(tab).map(function(item,index){
            return {
                id: null,
                tabZoneId: $(item).attr('data-tabzoneid'),
                tabId: $(item).attr('data-tabid')
            }
        })
        tabZoneManager.setSpecifiedTabItem(focusArr)
    }
}
function activityInfo(obj) {
    $(".rowsList .line .box").unbind("itemClick");
    var flag = $(obj).attr("data-flag");
    saveUserFocus(obj)
    console.log('save focus: ' + _currentFocusOnHomePage + ', total: ' + $(".coocaa_btn").length + ', flag: ' + flag)
    if(flag == "act"){
        openActPage(obj);
    }else if(flag == "ad"){
        var logdata = {
            home_page_id:topic.id,
            activity_name:$(obj)[0].data.title,
            activity_id:$(obj)[0].data.adId
        };
        pkgButtonLog("exchange_mall_home_page_activity_onclick",JSON.stringify(logdata));
        // var thisClick = eval('(' + $(obj)[0].data.onclick + ')');
        var thisClick = JSON.parse($(obj)[0].data.onclick);
        if(thisClick.onclickType == 1){
            coocaaosapi.startNewBrowser(thisClick.link, function () {
                console.log('web url ok')
            }, function () {
                console.log('web url fail')
            })
        }else {
            application(thisClick);
            //应用包跳转
        };
        enableHomePageClick()
    };
};

function application(data) {
    coocaaosapi.globalopen(data.byvalue,data.params["id"],
        function(message) {
        },
        function(error) {});
};


//加载详情页
function openActPage(obj,type) {
    if(type==1){$(".defaultPage").hide();};
    $.ajax({
        global: true,
        url:"/exchange-shop/activity/activityInfo",
        data:{
            activityId:type ? obj : $(obj).attr('data-local-id')
        },
        method: "POST",
        success: function (result) {
            // var data = eval('(' + result + ')');
            var data = JSON.parse(result);
            var commodity_status = "已开售";
            var account_status = "可兑换";
            if(data.code == 200){
                btnnum = 3;
                goodsName = data.data.goods.goodsName;
                if(data.data.goods.goodsType==4){
                    clickID = data.data.goods.onclick;
                };
                $("#scwrapper .btnFocus").addClass("returnFocus");
                currentPage = "activityInfo";
                ActivityId = data.data.activity.id;
                goodsType = data.data.goods.goodsType;
                receiveType = data.data.goods.receiveType;
                var activityPrice = "<span class='goldPrice'>"+data.data.activity.goldPrice+"</span><span class='icon'></span>";
                if(data.data.activity.shopPrice!=0){
                    activityPrice += "<span class='goldPrice shopPrice'>+"+data.data.activity.shopPrice+"</span><span class='goldPriceText'>元</span>"
                }
                $(".activityInf").show();
                $(".defaultPage").hide();
                $(".goodsGalleries .img").empty();
                each(data.data.goods.goodsGalleries,function (v) {
                    $(".goodsGalleries .img").append("<img src='"+v.imgUrl+"' />");
                });
                clearInterval(starSetTime);
                clearInterval(starSetTime1);
                var nowtime = (new Date()).valueOf();
                if(data.data.isBuy || data.data.isBuy == undefined){
                    //可以兑换
                    if(nowtime < data.data.activity.startTime*1000){//活动开始前
                        commodity_status = "未开始";
                        // starSetTime1 = setInterval("time('2')", 1000);
                        starSetTime1 = setInterval(time, 1000, 2);
                        goExchangeBtn.removeClass("actInfoBtn").removeClass("btnFocus").html(new Date(data.data.activity.startTime*1000).format("MM月dd日 HH:mm 开始兑换")).attr({"data-flag":0});
                        btnnum = 2;
                    }else if(nowtime >= data.data.activity.startTime*1000 && nowtime < data.data.activity.endTime*1000){//活动进行中

                        if(data.data.activity.activityStock <= 0){
                            commodity_status = "售完";
                            goExchangeBtn.removeClass("actInfoBtn").removeClass("btnFocus").html("库存已兑完").attr({"data-flag":0});
                            btnnum = 2;
                        }else {
                            if(data.data.activity.goldPrice > parseInt($(".userInfo .grade .text").eq(0).text()) && data.data.isLogin){//用户金币不足
                                account_status = "金币不足";
                                goExchangeBtn.addClass("actInfoBtn").html("还差"+(data.data.activity.goldPrice-parseInt($(".userInfo .grade .text").eq(0).text()))+"金币，去赚金币").attr({"data-flag":2});
                            }else {
                                // starSetTime1 = setInterval("time('2')", 1000);
                                starSetTime1 = setInterval(time, 1000, 2);
                                goExchangeBtn.addClass("actInfoBtn").html("立即兑换").attr({"data-flag":1});
                            }
                        }
                    }else if(nowtime >= data.data.activity.endTime*1000){//活动结束
                        commodity_status = "已结束";
                        goExchangeBtn.removeClass("actInfoBtn").removeClass("btnFocus").html("兑换已结束").attr({"data-flag":0});
                        btnnum = 2;
                    }
                }else{
                    goExchangeBtn.attr({"data-flag":0});
                    goExchangeBtn.removeClass("actInfoBtn").removeClass("btnFocus").html("你已达到最大兑换数量");
                    btnnum = 2;
                };
                goExchangeBtn[0].data = {
                    goodsName:data.data.goods.goodsName,
                    goodsId:data.data.goods.goodsId,
                    goodsType:data.data.goods.goodsType,
                    commodity_status:commodity_status,
                    starttime:data.data.activity.startTime*1000,
                    endTime:data.data.activity.endTime*1000,
                    stock:data.data.activity.activityStock,
                    isBuy:data.data.isBuy
                };
                var imgLength = $("#goodsGalleries .img img").length;
                $("#goodsGalleries .img img").each(function(i) {
                    var k = i+1;
                    $(this)[0].onload = function () {
                        if(k == imgLength){
                            if($("#goodsGalleries .img").height() <= document.body.clientHeight){
                                $(".goodsGalleries .scrollBar").hide();
                            }else {
                                $(".goodsGalleries .scrollBar").show();
                                document.getElementById("goodsGalleries").scrollTop = 0;
                                $(".scrollBar span").css({
                                    "margin-top":"15px"
                                });
                            };
                        }
                    }
                });
                $(".goodsactivityInfo .info").html(tmpl.info.format({
                    activityPrice:activityPrice,
                    goodsName:data.data.goods.goodsName,
                    goldPrice1:data.data.goods.goldPrice,
                    marketPrice:data.data.goods.marketPrice,
                    activityStock:data.data.activity.activityStock,
                    startTime:new Date(data.data.activity.startTime*1000).format("yyyy.MM.dd HH:mm"),
                    endTime:new Date(data.data.activity.endTime*1000).format("yyyy.MM.dd HH:mm"),
                    limitTimes:data.data.activity.limitTimes,
                    commonRules:data.data.goods.commonRules ? "<div class='exchangeRulesTitle'>基本说明：</div><p>"+data.data.goods.commonRules+"</p>" : "",
                    exchangeRules:data.data.goods.exchangeRules == "" ? "" : "<div class='exchangeRulesTitle'>重要说明：</div><p>"+data.data.goods.exchangeRules+"</p>"
                }));
                if($("#exchangeRules").height()+10>$(".exchangeRulesdiv").height()){
                    $("#exchangeRules").removeClass("actInfoBtn").attr("data-flag","0");
                }else {
                    $("#exchangeRules").attr("data-flag","1");
                };
                $("#exchangeRules").unbind("itemClick").bind("itemClick",function(){
                    $("#modePop20").show().attr("class","modePop2").find(".popContent1").html("<div class='exchangeRulesPop' id='exchangeRulesPop'>"+$("#exchangeRules").html()+"</div>");
                    $("#modePop20 .popBtn").hide().empty();
                    map = new coocaakeymap($("#exchangeRulesPop"), $("#exchangeRulesPop"), "btnFocus", function() {}, function(val) {}, function(obj) {});
                    currentPage = "activityInfoExplain";
                });
            };
            enableHomePageClick()
            if(goExchangeBtn.attr("data-flag")=="1"||goExchangeBtn.attr("data-flag")=="2"){
                map = new coocaakeymap($(".actInfoBtn"), $("#goExchangeBtn"), "btnFocus", function() {}, function(val) {}, function(obj) {});
            }else if(goExchangeBtn.attr("data-flag") != "1" && $("#exchangeRules").attr("data-flag") == "1"){
                map = new coocaakeymap($(".actInfoBtn"), $("#exchangeRules"), "btnFocus", function() {}, function(val) {}, function(obj) {});
            }else if(goExchangeBtn.attr("data-flag") != "1" && $("#goodsGalleries .img").height()>document.body.clientHeight){
                map = new coocaakeymap($(".actInfoBtn"), $(".actInfoBtn")[0], "btnFocus", function() {}, function(val) {}, function(obj) {});
            }else {
                map = new coocaakeymap($(".goodsGalleries"), $(".goodsGalleries")[0], "", function() {}, function(val) {}, function(obj) {});
            };

            if(type != 1){
                var logdata = {
                    home_page_id:topic.id,
                    zone_name:$(obj).parents(".line:first").attr("data-title"),
                    zone_id:$(obj).parents(".line:first").attr("data-id"),
                    commodity_name:data.data.goods.goodsName,
                    commodity_id:data.data.goods.goodsId,
                    commodity_category:data.data.goods.goodsType,
                    commodity_status:commodity_status,
                    market_price:data.data.goods.marketPrice,
                    exchage_price:data.data.activity.goldPrice+"金币+"+data.data.activity.shopPrice+"现金",
                    pay_money:data.data.activity.shopPrice == 0 ? "不需要" : "需要"
                };
                pkgButtonLog("exchange_mall_home_page_commodity_onclick",JSON.stringify(logdata));
            };


            var logdata1 = {
                page_name:"commodity_detail_page",
                commodity_name:data.data.goods.goodsName,
                commodity_id:data.data.goods.goodsId,
                commodity_category:data.data.goods.goodsType,
                commodity_status:commodity_status,
                market_price:data.data.goods.marketPrice,
                exchage_price:data.data.activity.goldPrice+"金币+"+data.data.activity.shopPrice+"现金",
                pay_money:data.data.activity.shopPrice == 0 ? "不需要" : "需要",
                account_status:account_status
            };
            pkgButtonLog("exchange_mall_web_page_show_new",JSON.stringify(logdata1));
        },
        error: function(){
            toast("服务器繁忙，请稍后重试！");
            enableHomePageClick()
        }
    });
};

//确认兑换
function saveConfirmationExchange() {
    var data = goExchangeBtn[0].data;
    var logdata = {
        button_name:"确认兑换",
        commodity_name:data.goodsName,
        commodity_id:data.goodsId,
        commodity_category:data.goodsType,
        pay_money:$(".goodsactivityInfo .shopPrice").length != 0 ? "需要" : "不需要"
    };
    pkgButtonLog("exchange_mall_comfirm_exchange_page_button_onclick",JSON.stringify(logdata));
    $.ajax({
        url:"/exchange-shop/exchange/saveConfirmationExchange",
        beforeSend: function(request) {
            $(".loader-bg").show();
            request.setRequestHeader("DEVICE-INFO", JSON.stringify(televisionInfo));
        },
        complete: function () {
            $(".loader-bg").hide();
        },
        data:{
            goldActivityId:ActivityId,
            mac:televisionInfo.mac,
            tokenId:myUserstoken
        },
        method: "POST",
        success: function (data) {
            $("#confirmPop").hide();
            // var result = eval('(' + data + ')');
            var result = JSON.parse(data);
            if(result.code == 200){
                var t=setTimeout(getUserGold,1500);
                if(result.data.payment==1){
                    recordid = result.data.id;
                    onResumePage = "gopay";
                    //调起支付
                    returnPage();
                    coocaaosapi.purchaseOrder2(
                        result.data.payParam.appcode,
                        result.data.payParam.tradeid,
                        result.data.payParam.productname,
                        result.data.payParam.specialtype,
                        parseFloat(result.data.payParam.amount)*100,
                        result.data.payParam.producttype,
                        "com.webviewsdk.action.pay",
                        "pay",
                        myUserstoken,
                        "",
                        function(success)  {
                        },
                        function(error) {
                        });
                }else {
                    if(goodsType == "1"){
                        $("#modePop20").show().attr("class","modePop2").find(".popContent1").empty().append(popTmpl.pop1.addrsCode);
                        $('.addrQrCode').empty().qrcode({
                            width:400,
                            height:400,
                            correctLevel:0,
                            text:basePath+result.data.url+"&tokenId="+signToken
                        });
                        $("#modePop20 .popBtn").hide().empty();
                        map = new coocaakeymap($(".addrQrCode"), $(".addrQrCode")[0], "btnFocus", function() {}, function(val) {}, function(obj) {});
                        var logdata1 = goExchangeBtn[0].data;
                        var logdata = {
                                page_name:"exchange_result_show_page",
                                commodity_name:logdata1.goodsName,
                                commodity_id:logdata1.goodsId,
                                commodity_category:logdata1.goodsType,
                                pay_money:"不需要",
                                information_status:"获取成功"
                            };
                        pkgButtonLog("exchange_mall_web_page_show_new",JSON.stringify(logdata));
                    }else if(goodsType == "9" || goodsType == "10"){//9：话费充值，10：流量充值
                        phone = "";
                        $("#modePop20").hide();
                        RecaptureUrl = result.data.url.split("?")[0];
                        goldRedemptionRecordId = result.data.url.split("?")[1].split("=")[1];
                        $("#modePopMobile").show().find(".showMobile").text("请输入待充值的手机号码").addClass("gray");
                        map = new coocaakeymap($(".mobBtn"), $(".mobBtn")[0], "btnFocus", function() {}, function(val) {}, function(obj) {});
                    }else {
                        RecaptureUrl = result.data.url;
                        showExchangeAchievements(2);
                    }
                }
            }else {
                toast(result.msg);
            };
        },
        error: function(){
            toast("服务器繁忙，请稍后重试！");
        }
    });
};

function showExchangeAchievements(type,typeid) {
    $.ajax({
        global: true,
        url:RecaptureUrl,
        method: "POST",
        success:function (result) {
            // var json = eval('(' + result + ')');
            var json = JSON.parse(result);
            if(type == 1){
                recordInfo(typeid,3);
            }else {
                if(json.code == 200){
                    var data = json.data.goldRedemptionRecord;
                    if(data.shippingStatus == "2"){//发放成功
                        modePop20.show().attr("class","modePop2");
                        if(goodsType == "2" || goodsType == "3"){//2：平台优惠券-影视，3：平台优惠券-教育，
                            modePop20.find(".popContent1").empty().append(popTmpl.pop1.card.format({cardIndex:goodsType== 2?6:5,goodsName:data.goodsName,cardtext:''}));
                            if(goodsType== 2){
                                formBtn(1,"去使用","",function () {jump(1,'0')});
                            }else if(goodsType== 3){
                                formBtn(1,"去使用","",function(){jump(1,'1')});
                            }else if(goodsType== 4){
                                formBtn(1,"去使用","",function () {jump(2,data.goodsInfo.onclick)});
                            };
                        }else if(goodsType == "4"){//4：平台优惠券-购物
                            modePop20.find(".popContent1").empty().append(popTmpl.pop1.card.format({cardIndex:4,goodsName:data.goodsName,cardtext:''}));
                            formBtn(1,"去使用","",function () {jump(2,data.goodsInfo.onclick)});
                            // formBtn(1,"确定 ","",returnPage);
                        }else if(goodsType == "5" || goodsType == "6" || goodsType == "12"){//5：平台会员卡-影视，6：平台会员卡-教育
                            modePop20.find(".popContent1").empty().append(popTmpl.pop1.card.format({
                                goodsName:data.goodsName,
                                cardIndex:goodsType == 5 ? 6 : (goodsType == 6 ? 5 : 12),
                                cardtext:''
                            }));
                            formBtn(1,"确定 ","",returnPage);
                        }else if(goodsType == "7"){ //7：第三方会员激活码
                            modePop20.find(".popContent1").empty().append(popTmpl.pop1.Voucher.format({
                                goodsName:goodsName,
                                code:data.coilCode
                            }));
                            formBtn(1,"确定 ","",returnPage);
                        }else if(goodsType == "8"){//8：第三方优惠券
                            if(receiveType == 1){//二维码
                                modePop20.find(".popContent1").empty().append(popTmpl.pop1.VoucherCode.format({
                                        goodsName:goodsName,
                                        desc: data.goodsInfo.onclickBrief,
                                    }));
                                $('.addrQrCode').empty().qrcode({
                                    width:400,
                                    height:400,
                                    correctLevel:0,
                                    text:data.goodsInfo.onclick
                                });
                                $("#modePop20 .popBtn").hide().empty();
                            }else if(receiveType == 3){ //图片-二维码
                                modePop20.find(".popContent1").empty().append(popTmpl.pop1.VoucherCode.format({
                                        goodsName:goodsName,
                                        desc: data.goodsInfo.onclickBrief,
                                    }));
                                $(".addrQrCode").html("<img src='"+data.goodsInfo.onclick+"' />")
                                $("#modePop20 .popBtn").hide().empty();
                            }else { //激活码
                                modePop20.find(".popContent1").empty().append(popTmpl.pop1.Voucher.format({
                                    goodsName:goodsName,
                                    code:data.coilCode
                                }));
                                formBtn(1,"确定 ","",returnPage);
                            };
                        }else if(goodsType==11){  //11津贴
                            modePop20.find(".popContent1").empty().append(popTmpl.pop1.card.format({cardIndex:4,goodsName:data.goodsName,cardtext:''}));
                            formBtn(1,"去使用","",function () {jump(2,data.goodsInfo.onclick)});
                        };

                    }else {//发放没成功重新获取
                        //重新获取
                        $("#modePop20").show().attr("class","modePop2").find(".popContent1").empty().append(popTmpl.pop1.card.format({
                            goodsName:data.goodsName,
                            cardIndex:1,
                            cardtext:goodsType == "5" || goodsType == "6" || goodsType == "12" ? "<p>网络状态不佳<br>请重新获取会员卡</p>" : "<p>网络状态不佳<br>请重新获取兑换码</p>"
                        }));
                        formBtn(1,"重新获取 ","",showExchangeAchievements);
                    };
                    var logdata1 = goExchangeBtn[0].data;
                    var logdata = {
                        page_name:"exchange_result_show_page",
                        commodity_name:logdata1.goodsName,
                        commodity_id:logdata1.goodsId,
                        commodity_category:logdata1.goodsType,
                        pay_money:"不需要",
                        information_status:data.shippingStatus != "2" ? "获取失败" : "获取成功"
                    };
                    pkgButtonLog("exchange_mall_web_page_show_new",JSON.stringify(logdata));
                }else {
                    $(".modePop").hide();
                    map = new coocaakeymap($(".actInfoBtn"), $("#goExchangeBtn"), "btnFocus", function() {}, function(val) {}, function(obj) {});
                    toast(result.msg);

                    // $("#recapture").show();
                };
            }
        },
        error:function(){
            toast("服务器繁忙，请稍后重试！");
        }
    })
};

//验证是否可兑换
function checkExchange() {
    $.ajax({
        global: true,
        url:"/exchange-shop/exchange/checkExchange",
        beforeSend: function(request) {
            request.setRequestHeader("DEVICE-INFO", JSON.stringify(televisionInfo));
        },
        data:{
            goldActivityId:ActivityId,
            tokenId:myUserstoken
        },
        method: "POST",
        success: function (data) {
            // var result = eval('(' + data + ')');
            var result = JSON.parse(data);;
            $(".modePop").hide();
            var exchange_status = 0;
            if(result.code == 200){
                currentPage = "activityInfoPop";
                var timeTxt = "4小时";
                if(goExchangeBtn[0].data.goodsType == 1)
                    timeTxt = '10分钟';
                // clearInterval(starSetTime1);
                $("#modePop20").show().attr("class","modePop1").show().find(".popContent1").html(
                    result.data.shopPrice == 0 ? "<p class='content0'>将花费"+result.data.goldPrice+"金币，确定兑换吗？</p>":
                        "<p class='content1'>将花费"+result.data.goldPrice+"金币+"+result.data.shopPrice+"元，确定兑换吗？</p><p class='content2'>确定兑换后请在"+ timeTxt +"内完成支付，否则可能会被人抢走喔</p>"
                );
                formBtn("2","确认兑换","取消",saveConfirmationExchange);
                var logpopdata = goExchangeBtn[0].data;
                var logdata = {
                    page_name:"comfirm_exchange_page",
                    commodity_name:logpopdata.goodsName,
                    commodity_id:logpopdata.goodsId,
                    commodity_category:logpopdata.goodsType,
                    pay_money:$(".goodsactivityInfo .shopPrice").length != 0 ? "需要" : "不需要"
                };
                pkgButtonLog("exchange_mall_web_page_show_new",JSON.stringify(logdata));
            }else if(result.code==20013){
                currentPage = "activityInfoPop";
                // clearInterval(starSetTime1);
                $("#modePop20").show().attr("class","modePop1").show().find(".popContent1").html("<p class='content3'>抱歉，你的金币不足，还差"+result.data+"金币才能兑换</p>");
                formBtn("1","去赚金币","",function () {
                    coocaaosapi.myCenter(
                        function(message) {
                        },
                        function(error) {
                        });
                });
                exchange_status = 5;
            }else if(result.code==20007){
                app.startLoginC();
                exchange_status = 1;
            }else{
                if(result.code==20003){
                    exchange_status = 3;
                }else if(result.code == 20009){
                    exchange_status = 2;
                }else if(result.code == 20004||result.code == 20005||result.code == 20006){
                    exchange_status = 4;
                };
                //默认提示
                toast(result.msg);
            };
            var data1 = goExchangeBtn[0].data;
            var logdata = {
                commodity_name:data1.goodsName,
                commodity_id:data1.goodsId,
                commodity_category:data1.goodsType,
                pay_money:$(".goodsactivityInfo .shopPrice").length != 0 ? "需要" : "不需要",
                button_name:goExchangeBtn.text(),
                exchange_status:exchange_status
            };
            pkgButtonLog("exchange_mall_commodity_detail_page_button_onclick",JSON.stringify(logdata));
        },
        error: function(){
            toast("服务器繁忙，请稍后重试！");
        }
    });
};

function formBtn (type,text1,text2,onclick,onclick2){
    $("#modePop20 .popBtn").show();
    if(type==1){
        $("#modePop20 .popBtn").html("<div class='modePopBtn popBtn3' id='confirm'>"+text1+"</div>");
    }else {
        $("#modePop20 .popBtn").html("<div class='modePopBtn popBtn1' id='confirm'>"+text1+"</div><div class='modePopBtn popBtn2' id='cancel'>"+text2+"</div>");
    }
    $("#confirm").unbind("itemClick").bind("itemClick",onclick);
    $("#cancel").unbind("itemClick").bind("itemClick",onclick2?onclick2:returnPage);
    if(text2=="取消"){
        var data1 = goExchangeBtn[0].data;
        $("#cancel").bind("itemClick",function () {
            var logdata = {
                button_name:"取消",
                commodity_name:data1.goodsName,
                commodity_id:data1.goodsId,
                commodity_category:data1.goodsType,
                pay_money:$(".goodsactivityInfo .shopPrice").length != 0 ? "需要" : "不需要"
            };
            pkgButtonLog("exchange_mall_comfirm_exchange_page_button_onclick",JSON.stringify(logdata));
        });
    };

    map = new coocaakeymap($(".modePopBtn"), $(".modePopBtn")[0], "btnFocus", function() {}, function(val) {}, function(obj) {});
    if(currentPage == "recordInfoPop"){
        $("#modePop20 .modePopBtn,#modePopMobile .modePopBtn1").bind("itemClick",function(){
            var data = $("#ex-list .btnFocus")[0].data;
            var logdata = {
                page_name:"my_exchange_detail_page",
                commodity_name:data.commodity_name,
                commodity_id:data.commodity_id,
                commodity_category:data.commodity_category,
                pay_money:data.pay_money == "0" ? "不需要" : "需要",
                exchage_history_status:data.exchage_history_status,
                button_name:$(this).text()
            };
            pkgButtonLog("exchange_mall_my_exchange_detail_page_button_onclick",JSON.stringify(logdata));
        })
    }
};

function toast(text,time) {
    $("#toast").show().text(text);
    setTimeout(function(){
        $("#toast").hide()
    },time ? time : 3000);
}

$("#modePopMobile .mobBtn").on("itemClick",function () {
    var $this = $(this);
    var num = $this.text();
    var text = phone;
    if(num == "删除" && text.length >= 0){
        text = text.substring(0, text.length - 1);
    }else if(num == "确定兑换"){
        savePhone(text);
        if(currentPage == "recordInfoPop"){
            var data = $("#ex-list .btnFocus")[0].data;
            var logdata = {
                page_name:"my_exchange_detail_page",
                commodity_name:data.commodity_name,
                commodity_id:data.commodity_id,
                commodity_category:data.commodity_category,
                pay_money:"不需要",
                exchage_history_status:data.exchage_history_status,
                button_name:"提交手机号码"
            };
            pkgButtonLog("exchange_mall_my_exchange_detail_page_button_onclick",JSON.stringify(logdata));
        };
        //提交后续
        return false;
    }else {
        text += num;
    };
    phone = text;
    if(text == ""){
        $("#modePopMobile .showMobile").text("请输入待充值的手机号码").addClass("gray")
    }else if(text.length <= 11){
        $("#modePopMobile .showMobile").text(text).removeClass("gray");
        if(text.length == 11){
            map = new coocaakeymap($(".mobBtn"), $(".mobBtn")[11], "btnFocus", function() {}, function(val) {}, function(obj) {});
        };
    }else{
        map = new coocaakeymap($(".mobBtn"), $(".mobBtn")[11], "btnFocus", function() {}, function(val) {}, function(obj) {});
    };
});

function savePhone() {
    var myreg = /^(((13[0-9]{1})|(14[57]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
    if(phone.length != 11){
        toast("输入手机号码必须为11位!");
    }else if(!myreg.test(phone)){
        toast("输入的手机号码有误，请重新输入!");
    }else {
        $.ajax({
            global: true,
            url:"/exchange-shop/exchange/saveExchangeEntityOrCallChargesOrFlow",
            data:{
                goldRedemptionRecordId:goldRedemptionRecordId,
                mobile:phone,
                tokenId:signToken
            },
            success:function (result) {
                // var json = eval('(' + result + ')');
                var json = JSON.parse(result);
                if($(".activityInf").css("display") == "block"){
                    var logdata1 = goExchangeBtn[0].data;
                    var logdata = {
                        page_name:"exchange_result_show_page",
                        commodity_name:logdata1.goodsName,
                        commodity_id:logdata1.goodsId,
                        commodity_category:logdata1.goodsType,
                        pay_money:"不需要",
                        information_status:json.code != 200 ? "获取失败" : "获取成功"
                    };
                    pkgButtonLog("exchange_mall_web_page_show_new",JSON.stringify(logdata));
                };
                if(json.code == 200){
                    $("#modePopMobile").hide();
                    $("#modePop20").show().attr("class","modePop1");
                    $("#modePop20 .popContent1").empty().append("<p class='content1'>恭喜你成功兑换"+goodsName+"！</p><p class='content2'>预计在15个工作日内充值到手机号"+phone+"</p> ");
                    formBtn(1,"确定 ","",returnPage);
                }else {
                    toast("电话号码提交失败，请重试！");
                };
            },
            error:function(){
                toast("服务器繁忙，请重试！");
            }
        })
    }
};
var dynamic = $("#dynamic");
function recordInfo(id,type) {
    //type
    //1、支付回来调用
    //2、我的记录调用
    //3、我的记录重新获取调用

    //exchangeStatus兑换状态  0 兑换中、1兑换成功、2兑换失败、5兑换超时
    //payStatus  支付状态  1为已支付  0为末支付
    //shippingStatus  发放状态


    $.ajax({
        global: true,
        url: "/exchange-shop/exchange/recordInfo",
        data: {
            recordId:id
        },
        success: function (result) {
            $("#ex-list .btnFocus").addClass("returnFocus");
            // var data = eval('(' + result + ')');
            var data = JSON.parse(result);
            var record = data.data.record;
            var goods = data.data.goods;
            var exchage_history_status = "交易完成";
            if(type == 3 && record.exchangeStatus == 1 && record.shippingStatus == 2){
                $("#ex-list .btnFocus").addClass("gray").find(".leftArrow").text("交易完成");
            };
            if(currentPage=="exchangeRecord" || currentPage == "recordInfoPop"){
                currentPage = "recordInfoPop";
            }else {
                var logdata1 = goExchangeBtn[0].data;
                var logdata = {
                    page_name:"exchange_result_show_page",
                    commodity_name:logdata1.goodsName,
                    commodity_id:logdata1.goodsId,
                    commodity_category:logdata1.goodsType,
                    pay_money:"需要",
                    information_status:record.shippingStatus != 2 ? "获取失败" : "获取成功"
                };
                pkgButtonLog("exchange_mall_web_page_show_new",JSON.stringify(logdata));
                currentPage = "activityInfoPop";
            };
            if((record.exchangeStatus!=5&&record.exchangeStatus!=2)||(record.exchangeStatus==5&&record.payStatus==1)) {
                $("#modePop20").show().attr("class", "modePop2").find(".popContent1").empty().append(popTmpl.pop1.popTitle.format({
                    goodsName: record.goodsName,
                    money: record.payMoney == 0 ? record.goldNumber + "金币" : record.goldNumber + "金币+" + record.payMoney + "元",
                    exchangeTime: new Date(record.exchangeTime * 1000).format("yyyy.MM.dd HH:mm")
                }));
                if(record.payStatus==0){
                    exchage_history_status = "待支付";
                    $("#modePop20 .popContent1").append(popTmpl.pop1.unpaid.format({
                        orderMoney:record.orderMoney,
                        orderTime:goods.goodsType==1?"10分钟":"4小时"
                    }));
                    goPayOrderData = data.data.ossParam;
                    formBtn(1,"继续支付","",goPayOrder);
                }else{
                    // map = new coocaakeymap($(".popBtn1"), $("#exchangeRecordBtn"), "btnFocus", function() {}, function(val) {}, function(obj) {});
                    //商品类型1：实体商品，2：平台优惠券-影视，3：平台优惠券-教育，4：平台优惠券-购物，5：平台会员卡-影视，6：平台会员卡-教育，7：第三方会员激活码，8：第三方优惠券，(receive_type=1 二维码)9：话费充值，10：流量充值
                    if(record.exchangeStatus==5){
                        $("#modePop20 .popContent1").append(popTmpl.pop1.unpaid5);
                        formBtn(1,"完成","",returnPage);
                    }else{
                        switch (true) {
                            case goods.goodsType == 1 : {//实物
                                if(record.mobile == ""){
                                    exchage_history_status = "待填写地址";
                                    //没有地址
                                    $("#modePop20 .popContent1").append(popTmpl.pop1.popAddrs.format("微信扫码填写收货地址，以完成兑换"));
                                    $('#qrCodeBox').empty().qrcode({
                                        width:250,
                                        height:250,
                                        correctLevel:0,
                                        text:basePath+data.data.url+"&tokenId="+signToken
                                    });
                                }else {
                                    if(record.shippingStatus==2){
                                        exchage_history_status = "已发货";
                                    }else {
                                        exchage_history_status = "待发货";
                                    };
                                    var $status = getStatus(record);
                                    $("#modePop20 .popContent1").append(popTmpl.pop1.popaddrs1.format({
                                        shippingStatus:$status.msg,
                                        shippingNumber:record.shippingStatus==2?record.shippingNumber:"暂无物流单号",
                                        shippingCode:record.shippingStatus==2?"【"+record.shippingCompanyName+"】":"",
                                        receiver:record.receiver,
                                        mobile:record.mobile,
                                        provinceCn:record.provinceCn,
                                        cityCn:record.cityCn,
                                        regionCn:record.regionCn,
                                        address:record.address
                                    }));

                                };
                            }; break;
                            case goods.goodsType== 2 || goods.goodsType== 3 : {//2：平台优惠券-影视，3：平台优惠券-教育，
                                if(record.shippingStatus == 2){
                                    $("#modePop20 .popContent1").append(popTmpl.pop1.card1.format({cardIndex:goods.goodsType== 2?6:5,code:""}));
                                }else {
                                    $("#modePop20 .popContent1").append(popTmpl.pop1.card2.format({cardIndex:"1",cardtext:"<p>网络状态不佳<br />请重新获取优惠券</p>"}));
                                }
                            }; break;
                            case goods.goodsType== 4 : {//4：平台优惠券-购物
                                if(record.shippingStatus == 2){
                                    $("#modePop20 .popContent1").append(popTmpl.pop1.card1.format({cardIndex:4,code:""}));
                                }else {
                                    $("#modePop20 .popContent1").append(popTmpl.pop1.card2.format({cardIndex:"1",cardtext:"<p>网络状态不佳<br />请重新获取优惠券</p>"}));
                                }
                            }; break;
                            case goods.goodsType== 5 || goods.goodsType== 6 || goods.goodsType== 12 : {//5：平台会员卡-影视，6：平台会员卡-教育 12:平台会员卡-少儿
                                if(record.shippingStatus == 2){
                                    $("#modePop20 .popContent1").append(popTmpl.pop1.card2.format({cardIndex:goods.goodsType==5?6:(goods.goodsType==6?5:12),cardtext:''}));
                                }else {
                                    $("#modePop20 .popContent1").append(popTmpl.pop1.card2.format({cardIndex:"1",cardtext:"<p>网络状态不佳<br />请重新获取会员卡</p>"}));
                                }
                            }; break;
                            case goods.goodsType== 7 : {//7：第三方会员激活码
                                if(record.shippingStatus == 2){
                                    $("#modePop20 .popContent1").append(popTmpl.pop1.card1.format({cardIndex:3,code:record.coilCode}));
                                }else {
                                    $("#modePop20 .popContent1").append(popTmpl.pop1.card2.format({cardIndex:"1",cardtext:"<p>网络状态不佳<br />请重新获取激活码</p>"}));
                                };
                            }; break;
                            case goods.goodsType== 8 && goods.receiveType == 1 : {//8：第三方优惠券//要生成二维码
                                $("#modePop20 .popContent1").append(popTmpl.pop1.popAddrs.format(goods.onclickBrief));
                                $('#qrCodeBox').empty().qrcode({
                                    width:250,
                                    height:250,
                                    correctLevel:0,
                                    text:goods.onclick
                                });
                            }; break;
                            case goods.goodsType== 8 && goods.receiveType == 2 : {//8：第三方优惠券//激活码
                                if(record.shippingStatus == 2){
                                    $("#modePop20 .popContent1").append(popTmpl.pop1.card1.format({cardIndex:3,code:record.coilCode}));
                                }else {
                                    $("#modePop20 .popContent1").append(popTmpl.pop1.card2.format({cardIndex:"1",cardtext:"<p>网络状态不佳<br />请重新获取优惠券</p>"}));
                                };
                            }; break;
                            case goods.goodsType== 8 && goods.receiveType == 3 : {//8：第三方优惠券//二维码图片
                                $("#modePop20 .popContent1").append(popTmpl.pop1.popAddrs.format(goods.onclickBrief));
                                $("#qrCodeBox").html("<img src='"+goods.onclick+"' />")
                            }; break;
                            case goods.goodsType== 9 || goods.goodsType== 10 : {
                                //9：话费充值，10：流量充值
                                // $("#modePop20 .popContent1").append(popTmpl.pop1.card1.format({cardIndex:2,code:record.mobile?record.mobile:"暂未填写手机号码"}));
                                if(record.mobile != ""){
                                    $("#modePop20 .popContent1").append(popTmpl.pop1.card1.format({cardIndex:2,code:record.mobile}));
                                }else {
                                    //填手机号码
                                    exchage_history_status = "待填写手机号码";
                                    phone = "";
                                    $("#modePop20").hide();
                                    RecaptureUrl = data.data.url.split("?")[0];
                                    goldRedemptionRecordId = data.data.url.split("?")[1].split("=")[1];
                                    $("#modePopMobile").show().find(".showMobile").text("请输入待充值的手机号码").addClass("gray");
                                    map = new coocaakeymap($(".mobBtn"), $(".mobBtn")[0], "btnFocus", function() {}, function(val) {}, function(obj) {});
                                };
                            }; break;
                            case goods.goodsType== 11 : {//4：津贴
                                if(record.shippingStatus == 2){
                                    $("#modePop20 .popContent1").append(popTmpl.pop1.card1.format({cardIndex:4,code:""}));
                                }else {
                                    $("#modePop20 .popContent1").append(popTmpl.pop1.card2.format({cardIndex:"1",cardtext:"<p>网络状态不佳<br />请重新获取优惠券</p>"}));
                                }
                            }; break;
                        };
                        //统一处理按钮
                        //electronicInv 是否有电票
                        //goodsType == 1 是否可退货退款
                        //refundStatus  售后状态  0-无售后  1-售后中  2-售后已完成
                        if(goods.goodsType==1){
                            if(record.mobile == "" || record.orderMoney==0){
                                formBtn(1,"完成","",returnPage);
                            }else {
                                if(type==1){
                                    formBtn(1,"好的","",returnPage);
                                }else {
                                    if(record.refundStatus == 0){//未售后
                                        var datac = {
                                            id:record.id,
                                            payMoney:record.payMoney,
                                            goldNumber:record.goldNumber,
                                            exchangeTime:record.exchangeTime,
                                            goodsName:goods.goodsName,
                                            sn:record.electronicInv
                                        };
                                        switch (record.shippingStatus){
                                            case 1:
                                                formBtn(1,"申请退款","",function () {
                                                    applyBackRefund(datac)
                                                });
                                                break;
                                            case 2:
                                                if(record.electronicInv != "" ){
                                                    formBtn(2,"电子发票","申请退换货",function () {
                                                        viewinvoice(datac);
                                                    },function () {
                                                        applyBackRefund(datac)
                                                    });
                                                }else{
                                                    formBtn(1,"申请退换货","",function () {
                                                        applyBackRefund(datac)
                                                    });
                                                }
                                                break;
                                        }
                                    }else if(record.refundStatus == 1){//售后中
                                        exchage_history_status = "售后中";
                                        switch(record.shippingStatus){
                                            case 1:
                                                if(record.electronicInv!=""){
                                                    formBtn(2,"电子发票","退款状态",function () {
                                                        viewinvoice(datac);
                                                    },function () {
                                                        ViewBackRefund(record.tvOrderSn);
                                                    });
                                                }else{
                                                    formBtn(1,"退款状态","",function () {
                                                        ViewBackRefund(record.tvOrderSn);
                                                    });
                                                }
                                                break;
                                            case 2:
                                                if(record.electronicInv!=""){
                                                    formBtn(2,"电子发票","退换货状态",function () {
                                                        viewinvoice(datac);
                                                    },function () {
                                                        ViewBackRefund(record.tvOrderSn);
                                                    });
                                                }else{
                                                    formBtn(1,"退换货状态","",function () {
                                                        ViewBackRefund(record.tvOrderSn);
                                                    });
                                                }
                                                break;
                                        }
                                    }else{//售后完成
                                        exchage_history_status = "售后完成";
                                        formBtn(1,"查看售后状态","",function () {
                                            ViewBackRefund(record.orderSn);
                                        });
                                    };
                                }
                            };
                        }else if(goods.goodsType==9 || goods.goodsType==10){
                            if(record.mobile != ""){
                                formBtn(1,"完成","",returnPage);
                            }
                        }else if(goods.goodsType!=1 && goods.goodsType!=9 && goods.goodsType!=10 && record.shippingStatus == 2){
                            if(goods.goodsType== 2){
                                formBtn(1,"去使用","",function () {jump(1,'0')});
                            }else if(goods.goodsType== 3){
                                formBtn(1,"去使用","",function(){jump(1,'1')});
                            }else if(goods.goodsType== 4){
                                formBtn(1,"去使用","",function () {jump(2,data.data.goods.onclick)});
                            }else if(goods.goodsType== 11){
                                formBtn(1,"去使用","",function () {jump(2,data.data.goods.onclick)});
                            }else {
                                formBtn(1,"完成","",returnPage);
                            };
                        }else if(goods.goodsType!=1 && goods.goodsType != 9 && goods.goodsType != 10  && record.shippingStatus != 2){
                            exchage_history_status = "待获取";
                            RecaptureUrl = data.data.url;
                            formBtn(1,"重新获取","",function () {
                                showExchangeAchievements(1,$("#ex-list .btnFocus").attr("data-id"));
                            });
                        };
                    }
                };
            }else if(record.exchangeStatus==5&&record.payStatus==0){
                $("#modePop20").show().attr("class", "modePop2").find(".popContent1").empty().append(popTmpl.pop1.popTitle.format({
                    goodsName: record.goodsName,
                    money: record.payMoney == 0 ? record.goldNumber + "金币" : record.goldNumber + "金币+" + record.payMoney + "元",
                    exchangeTime: new Date(record.exchangeTime * 1000).format("yyyy.MM.dd HH:mm")
                }));
                $("#modePop20 .popContent1").append(popTmpl.pop1.unpaid5);
                formBtn(1,"知道了","",returnPage);
            };
            var logdata = {
                page_name:"my_exchange_detail_page",
                commodity_name:data.data.goods.goodsName,
                commodity_id:data.data.goods.goodsId,
                commodity_category:data.data.goods.goodsType,
                pay_money:data.data.record.payMoney == "0" ? "不需要" : "需要",
                exchage_history_status:exchage_history_status
            };
            pkgButtonLog("exchange_mall_web_page_show_new",JSON.stringify(logdata));
        },
        error:function () {
            toast("服务器繁忙，请重试！");
        }
    })
};
function goPayOrder() {
    returnPage();
    coocaaosapi.purchaseOrder2(
        goPayOrderData.appcode,
        goPayOrderData.tradeid,
        goPayOrderData.productname,
        goPayOrderData.specialtype,
        parseFloat(goPayOrderData.amount)*100,
        goPayOrderData.producttype,
        "com.webviewsdk.action.pay",
        "pay",
        myUserstoken,
        "",
        function(success)  {
        },
        function(error) {
        });
}

//查看售后状态
function ViewBackRefund(sn){
    coocaaosapi.orderDetails(sn,
    function(success)  {
    },
    function(error) {
    });
};
//查看电票
function viewinvoice(d){
    currentPage = "recordInfoPop";
    $("#modePop20").show().attr("class","modePop2").find(".popContent1").empty().append(popTmpl.pop1.popTitle.format({
        goodsName:d.goodsName,
        money:d.payMoney==0?d.goldNumber+"金币":d.goldNumber+"金币+"+d.payMoney+"元",
        exchangeTime:new Date(d.exchangeTime*1000).format("yyyy.MM.dd HH:mm")
    })).append(popTmpl.pop1.popinvoice);
    $('#popinvoice').empty().qrcode({
        width:250,
        height:250,
        correctLevel:0,
        text:d.sn
    });
    formBtn(1,"知道了","",returnPage);
};
//申请售后
function applyBackRefund(d) {
    $.ajax({
        global: true,
        url: "/tvShopAPI/applyBackRefund",
        data: {
            goldRedemptionRecordId:d.id
        },
        success: function (result) {
            // var data = eval('(' + result + ')');
            var data = JSON.parse(result);
            if(data.code != 200){
                toast(data.msg);
            }else {
                currentPage = "recordInfoPop";
                $("#modePop20").show().attr("class","modePop2").find(".popContent1").empty().append(popTmpl.pop1.popTitle.format({
                    goodsName:d.goodsName,
                    money:d.payMoney==0?d.goldNumber+"金币":d.goldNumber+"金币+"+d.payMoney+"元",
                    exchangeTime:new Date(d.exchangeTime*1000).format("yyyy.MM.dd HH:mm")
                })).append(popTmpl.pop1.popAddrs.format("微信扫码填写售后信息，以完成本次售后服务"));
                $('#qrCodeBox').empty().qrcode({
                    width:250,
                    height:250,
                    correctLevel:0,
                    text:data.data
                });
                formBtn(1,"知道了","",returnPage);
            };
        },
        error: function(){}
    });
    //tvShopAPI/applyBackRefund?goldRedemptionRecordId=
}

function jump(type,id){
    if(type == 1){//启动影视中心
        coocaaosapi.productPackage(id,
            function(message) {
                returnPage();
            },
            function(error) {}
        );
    }else if(type == 2){//启动购物优惠券页面
        // var data = eval('(' + id + ')');
        var data = JSON.parse(id);
        if(data.byvalue == "coocaa.intent.action.MALL_DETAIL"){
            coocaaosapi.startAppShopDetail(data.params.id,
                function(message) {
                    returnPage();
                },
                function(error) {})
        }else if(data.byvalue == "coocaa.intent.action.MALL_LIST_ZONE"){
            coocaaosapi.startAppShopZone2(data.params.id,
                function(message) {
                    returnPage();
                },
                function(error) {}
            );
        };
    };
};
var pageCoinHistoryManager = function() {
    var _coinHistoryPage = {
        tab: '', //当前tab: 'coins' or 'points'
        current:"", //当前页面num
        flag:true, //后台是否还有数据（可以获取）
        pages:"" //总页面num
    };
    function coinHistoryResetPage() {
        $("#historyBodyList ul>li~li").remove();
        document.getElementById("historyBodyList").scrollTop = 0;
        _coinHistoryPage.flag = true;
        $("#coinHistoryPageSize").text('1/1')
    }
    function coinHistoryNoRecord(type) {
        var iconClass = 'icon-no-coins icon-no-points',
            width='73px', height='65px', tips = '您还没有金币明细', btn = '去赚金币';
        if(type == 2) {
            width = '135px';
            height = '86px';
            tips = '您还没有成长值明细';
            btn = '去赚成长值';
        }
        $('.coinHistory .noHistory .img-tips').css({'width': width, 'height': height})
        $('.coinHistory .noHistory .img-tips').removeClass(iconClass)
        $('.coinHistory .noHistory .img-tips').addClass(type == 2 ? iconClass.split(' ')[1] : iconClass.split(' ')[0])
        $('.coinHistory .noHistory .tips').text(tips)
        var param = {
            button_name: '金币明细页'+btn,
            from: 'fromCoinHistory'
        }
        $('#btnGoEarnCoin').text(btn).unbind('itemClick').bind('itemClick', param, goEarnCoin)
        $(".historyBody").hide();
        $(".coinHistory .noHistory").show();
        map = new coocaakeymap($(".coocaa-btn-history"), $(".coocaa-btn-history")[type-1], "btnFocus", function() {}, function(val) {}, function(obj) {});
    }
    function coinHistorySwitchTab(element) {
        var id = element.attr("data-id")
        console.log('coocaa-btn-history id:', id)
        if(_coinHistoryPage.tab === id) {
            return
        } else {
            _coinHistoryPage.tab = id
        }
        element.siblings('.coocaa-btn-history').removeClass('coinHistoryHeadTabSelected')
        element.addClass('coinHistoryHeadTabSelected')
        var type = 1,
            default_focus = 0,
            button_name = '金币明细Tab'
        $('.historyBodyTips').show()
        if(id === 'points') {
            type = 2;
            default_focus = 1;
            button_name = '成长值明细Tab'
            $('.historyBodyTips').hide()
        }
        coinHistoryResetPage()
        var logdata = {button_name: button_name};
        pkgButtonLog("exchange_mall_home_page_buttton_onclick",JSON.stringify(logdata));
        ajaxCoinHistory(1,10,type,default_focus,1);
    }
    function ajaxCoinHistory(page,size,type,focus,init) {
        $.ajax({
            url:"/exchange-shop/users/pointsCoinsDetail",
            data:{
                current:page,
                size:size,
                type: type
            },
            beforeSend: function(request) {
                if(init == 1) {
                    $(".loader-bg").show();
                }
            },
            complete: function () {
                if(init == 1) {
                    $(".loader-bg").hide();
                }
            },
            success:function (result) {
                var data = JSON.parse(result),
                    data_status = "有数据",
                    totalPage = Math.ceil(data.data.rowCount / size);
                if(data.code == 200 && data.data.results.length != 0){
                    _coinHistoryPage.current = data.data.start;
                    _coinHistoryPage.pages = totalPage;
                    if(_coinHistoryPage.current == _coinHistoryPage.pages){
                        _coinHistoryPage.flag = false;
                    };
                    // debugger;
                    loadCoinHistory(data.data.results, type);
                    if(init == 1){
                        $(".coinHistory .noHistory").hide();
                        $("#historyBodyList ul li:nth-child(2)").attr('upTarget', type === 1 ? '#tabCoins' : '#tabPoints')
                    };
                    $("#historyBodyList .coocaa-btn-history").unbind("itemFocus").bind("itemFocus", function(event) {
                        var index = $("#historyBodyList li.btnFocus").index();
                        var zsize = $("#historyBodyList li").length -1; //不包含标题行
                        $("#coinHistoryPageSize").text(index+"/"+$("#coinHistoryPageSize").attr("data-total"))
                        if(index > 2){
                            if(zsize-4 == index && _coinHistoryPage.flag == true){
                                ajaxCoinHistory(_coinHistoryPage.current+1,size,type,index+2/*焦点记忆时需要加上2个tab按钮*/);
                            };
                            document.getElementById("historyBodyList").scrollTop = 121*(index-2);
                        }else {
                            document.getElementById("historyBodyList").scrollTop = 0;
                        }
                    });
                    map = new coocaakeymap($(".coocaa-btn-history"), $(".coocaa-btn-history")[focus], "btnFocus", function() {}, function(val) {}, function(obj) {});
                }else {
                    if(init == 1){
                        coinHistoryNoRecord(type)
                        data_status = "无数据";
                    };
                };
                if(init == 1){
                    $("#coinHistoryPageSize").attr("data-total",data.data.rowCount);
                    $("#coinHistoryPageSize").text(totalPage == 0 ? "1/1" : 1+"/"+data.data.rowCount);
                    var logdata1 = {
                        page_name:"coin-points-history-page",
                        data_status:data_status
                    };
                    pkgButtonLog("exchange_mall_web_page_show_new",JSON.stringify(logdata1));
                };
            },
            error:function(){
                toast("服务器繁忙，请重试！");
                if(init == 1){
                    coinHistoryNoRecord(type)
                }
            }
        })
    };
    function loadCoinHistory(data, type) {
        var recordList = '';
        var bCoin = type == 1
        each (data,function (v) {
            var coins = bCoin ? v.coins : v.points;
            coins = coins.indexOf('-') == -1 ? '+'+coins : coins
            recordList += tmpl.coinHistoryListTmpl.format({
                rightTarget: bCoin ? 'rightTarget="#tabPoints"':'',
                leftTarget: bCoin ? '' : 'leftTarget="#tabCoins"',
                action: v.taskName,
                detail: coins,
                dateTime: v.createDate
            });
        });
        $("#historyBodyList ul").append(recordList);
    };

    return {
        goCoinHistoryFunc: function () {
            console.log('goCoinHistoryFunc in...')
            clearInterval(starSetTime);
            var logdata = {button_name: '金币明细'};
            pkgButtonLog("exchange_mall_home_page_buttton_onclick",JSON.stringify(logdata));
            _currentFocusOnHomePage = $(".coocaa_btn").index($(this))
            $("#goCoinHistory").unbind("itemClick");
            $(".defaultPage").hide();
            $(".coinHistory").show();
            currentPage = "coinHistory";
            map = new coocaakeymap($(".coocaa-btn-history"), $(".coocaa-btn-history")[0], "btnFocus", function() {}, function(val) {}, function(obj) {});
            $(".coinHistoryHead .coocaa-btn-history").unbind("itemFocus").bind("itemFocus",function(){
                coinHistorySwitchTab($(this))
            });
            $(".coocaa-btn-history").eq(0).trigger("itemFocus")
        }
    }
}();
function myExchange1(type){
    console.log("))))))))))))))))))))))))5555555555555555666666666666666");
    clearInterval(starSetTime);
    _currentFocusOnHomePage = $(".coocaa_btn").index($(this))
    $("#myExchange").unbind("itemClick");
    $(".defaultPage").hide();
    $(".exchangeRecord").show();
    currentPage = "exchangeRecord";
    $(".exchangeRecord .ex-list ul").empty();
    document.getElementById("ex-list").scrollTop = 0;
    myPage.flag = true;
    if(type==1){
        if(signToken != ""){
            ajaxRecord(1,10,1,0);
        };
    }else {
        var logdata = {
            button_name:"我的兑换"
        };
        pkgButtonLog("exchange_mall_home_page_buttton_onclick",JSON.stringify(logdata));
        ajaxRecord(1,10,1,0);
    };
};

// ajaxRecord(1,10,1,0);

function ajaxRecord(page,size,type,focts) {
    $.ajax({
        url:"/exchange-shop/topic/exchangeRecord",
        data:{
            current:page,
            size:size
        },
        success:function (result) {
            // var data = eval('(' + result + ')');
            var data = JSON.parse(result);
            var data_status = "有数据";
            if(data.code == 200 && data.data.records.length != 0){
                myPage.current = data.data.current;
                myPage.pages = data.data.pages;
                if(data.data.current == data.data.pages){
                    myPage.flag = false;
                };
               // debugger;
                loadRecord(data.data.records);
                if(type == 1){
                    $(".exchangeRecord .noRecord").hide();
                };
                $("#ex-list .myBtn").unbind("itemFocus").bind("itemFocus", function(event) {
                    var size = $("#ex-list li.btnFocus").index();
                    var zsize = $("#ex-list li").length;

                    $("#exchangeRecordPage").text(size+1+"/"+$("#exchangeRecordPage").attr("data-total"))
                    if(size > 2){
                        if(zsize-4 == size && myPage.flag == true){
                            ajaxRecord(myPage.current+1,10,0,size);
                        };
                        document.getElementById("ex-list").scrollTop = 140*(size-2);
                    }else {
                        document.getElementById("ex-list").scrollTop = 0;
                    }

                });
                map = new coocaakeymap($(".myBtn"), $(".myBtn")[focts], "btnFocus", function() {}, function(val) {}, function(obj) {});
                $("#ex-list .myBtn").unbind("itemClick").bind("itemClick",function(){
                    var id = $(this).attr("data-id");
                    recordInfo(id);
                });
            }else {
                if(type == 1){
                    data_status = "无数据";
                    $(".exchangeRecord .ex-list").hide();
                    $(".exchangeRecord .noRecord").show();
                    map = new coocaakeymap($(".noRecordBtn"), $(".noRecordBtn")[0], "btnFocus", function() {}, function(val) {}, function(obj) {});
                };
            };
            if(type == 1){
                $("#exchangeRecordPage").attr("data-total",data.data.total);
                $("#exchangeRecordPage").text(data.data.total == 0 ? "0/0" : 1+"/"+data.data.total);
                var logdata1 = {
                    page_name:"my_exchange_page",
                    data_status:data_status
                };
                pkgButtonLog("exchange_mall_web_page_show_new",JSON.stringify(logdata1));
            };
        },
        error:function(){
            toast("服务器繁忙，请重试！");
            if(type == 1){
                $(".exchangeRecord .ex-list").hide();
                map = new coocaakeymap($(".noRecordBtn"), $(".noRecordBtn")[0], "btnFocus", function() {}, function(val) {}, function(obj) {});
            }
        }
    })
};

function loadRecord(data) {
    each (data,function (v) {
        var $status = getStatus(v);
        var recordList = $(tmpl.exchangeRecordHead.format(extend({
            status:$status.msg,
            goodsImg:v.goodsInfo.thumb[0].imgUrl,
            exchangeMoney:v.orderMoney==0?v.goldNumber+"金币":v.goldNumber+"金币+"+v.orderMoney+"元",
            _class:$status.msg == "交易完成" || $status.msg=="已取消" || $status.msg=="售后完成" ? "gray" : "",
            _exchangeTime:new Date(v.exchangeTime*1000).format("yyyy.MM.dd HH:mm")
        },v)));
        recordList[0].data = {
            commodity_name:v.goodsName,
            commodity_id:v.goodsId,
            commodity_category:v.goodsType,
            pay_money:v.orderMoney,
            exchage_history_status:$status.msg
        };
        $(".ex-list ul").append(recordList);
    });
};

function getStatus(v){
    //统一处理按钮
    //electronicInv 是否有电票
    //goodsType == 1 是否可退货退款
    //refundStatus  售后状态  0-无售后  1-售后中  2-售后已完成

    var res = {
        msg:"交易完成",
        status:""
    };
    if (v.exchangeStatus==5){
        res.msg="已取消";
    }else if(v.payStatus==0){
        res.msg ="待支付";
    }else{
        if(v.goodsType==1){//实物
            if(v.refundStatus=="0"){
                if((v.mobile=='' || v.mobile==null) && v.shippingStatus != 2){
                    res.msg = "待填写地址";
                }else if(v.payStatus==1 && v.mobile != '' && v.shippingStatus != 2){
                    res.msg = "待发货";
                }else{
                    res.msg = "已发货";
                };
            }else if(v.refundStatus=="1"){
                res.msg = "售后中";
            }else {
                res.msg = "售后完成";
            };
        }else if(v.goodsType==9 || v.goodsType==10){//话费流量充值
            if(v.mobile == "") {
                res.msg = "待填写手机号码";
            }else if(v.shippingStatus != 2){
                res.msg = "待充值";
            }
        }else if(v.goodsType==2 || v.goodsType==3 || v.goodsType==4){//平台优惠券
            if(v.shippingStatus != 2){
                res.msg = "待获取优惠券";
            };
        }else if(v.goodsType==5 || v.goodsType==6 || v.goodsType==12){//平台会员卡
            if(v.shippingStatus != 2){
                res.msg = "待领取会员卡";
            };
        }else if(v.goodsType==7 || v.goodsType==8){//第三方
            if(v.shippingStatus != 2){
                res.msg = "待获取兑换码";
            };
        };
    };
    return res;
};


//首页、购买详情面按钮倒计时间相关
function countDown(time) {
    var hour = parseInt(time / 1000 / 60 / 60 % 24);
    var hour1 = hour < 10 ? "0"+hour : hour;
    var minute = parseInt(time / 1000 / 60 % 60);
    var minute1 = minute < 10 ? "0"+minute : minute;
    var seconds = parseInt(time / 1000 % 60);
    var seconds1 = seconds < 10 ? "0"+seconds : seconds;
    return "<p class='p2'><span>"+hour1+"</span><em>:</em><span>"+minute1+"</span><em>:</em><span>"+seconds1+"</span></p>";
};

var time = function (type) {
    var nowtime = (new Date()).valueOf();
    if(type == 1){
        $(".rowsList .line .box").each(function(){
            var $this = $(this);
            var flag = $this.attr("data-flag");
            if(flag=="act"){
                var data = {
                    id:$this.attr('data-local-id'),
                    starttime:parseInt($this.attr('data-local-startTime'))*1000,
                    endTime:parseInt($this.attr('data-local-endTime'))*1000,
                    activitystock:parseInt($this.attr('data-local-activityStock'))
                };
                switch (true) {
                    case nowtime < data.starttime : {//活动开始前
                        $this.addClass("noBeginning").removeClass("underway stockEnd hour2 timeEnd");
                    }; break;
                    case nowtime >= data.starttime && nowtime < data.endTime : {//活动进行中
                        $this.find(".ccurrency em").text($this.find(".ccurrency em").attr("data-price"));
                        if(data.activitystock <= 0){//无库存
                            $this.addClass("stockEnd").removeClass("noBeginning underway timeEnd hour2");
                        }else {
                            if(nowtime+7200000 > data.endTime){//两小时内
                                $this.addClass("hour2").removeClass("underway noBeginning stockEnd timeEnd");
                                $this.find(".time").html("<p class='p1'>距活动结束</p>"+countDown(data.endTime-nowtime));
                            }else {
                                $this.addClass("underway").removeClass("noBeginning stockEnd hour2 timeEnd");
                            }
                        }
                    }; break;
                    case nowtime >= data.endTime : {//活动结束
                        $this.find(".time").html("");
                        $this.addClass("timeEnd").removeClass("underway noBeginning stockEnd hour2")
                    }; break;
                };
            };
        });
    }else if(type == 2){
        var data = goExchangeBtn[0].data;
        switch (true){
            case nowtime < data.starttime : {//活动开始前
                goExchangeBtn.text(new Date(data.starttime).format("MM月dd日 HH:mm 开始兑换")).attr({"data-flag":0});
            }; break;
            case nowtime >= data.starttime && nowtime < data.endTime : {//活动进行中
                var spanText = $(".goodsactivityInfo .info .goldPrice1 span.text");
                spanText.text(spanText.attr("data-price")+"金币");
                if(data.stock <= 0){
                    goExchangeBtn.html("库存已兑完").attr({"data-flag":0});
                }else {
                    if(goExchangeBtn.attr("data-flag") == "0"){
                        goExchangeBtn.addClass("actInfoBtn");
                        map = new coocaakeymap($(".actInfoBtn"), $("#goExchangeBtn"), "btnFocus", function() {}, function(val) {}, function(obj) {});
                    };
                    if(parseInt($(".goodsactivityInfo .goldPrice").eq(0).text()) > parseInt($(".userInfo .grade .text").eq(0).text()) && myUserstoken != ""){//用户金币不足
                        goExchangeBtn.html("还差"+(parseInt($(".goodsactivityInfo .goldPrice").eq(0).text())-parseInt($(".userInfo .grade .text").eq(0).text()))+"金币，去赚金币").attr({"data-flag":2});
                    }else {
                        goExchangeBtn.html("立即兑换").attr({"data-flag":1});
                    }
                }
            }; break;
            case nowtime >= data.endTime : {//活动结束
                goExchangeBtn.addClass("gray").html("兑换已结束").attr({"data-flag":0});
            }; break;
        }
    }
};

/*
* 活动专区-相关代码
* */
//
// function goActivityHomepage() {
//     console.log("in goActivityHomepage...operationActivityId:"+operationActivityId);
//     okrDataCollectBigData("回游戏主页");
//     var url = 'appx://com.coocaa.appx.x618/main?activityId=' + operationActivityId;
//     coocaaosapi.startAppX2(url,"false",function(){
//         console.log('startAppX2 success....');
//     },function(){
//         console.log('startAppX2 fail....');
//     });
// }
//初始化618主活动
// bLogin：是否登录状态, 已登录状态下，初始化成功后获取金币总数
function initActivity(bLogin) {
    var url;
    if(bDebugMode == "true") {
        url = "http://beta.restful.lottery.coocaatv.com";//test
    }else {
        url = "https://restful.skysrt.com";//正式
    }
    url += "/building/v2/web/init";

    $.ajax({
        url:url,
        method: "POST",
        data: {
          id: operationActivityId,
          source:sourceType,
          MAC: televisionInfo ? televisionInfo.mac : "",
          cModel:televisionInfo ? televisionInfo.model : "",
          cChip:televisionInfo ? televisionInfo.chip : "",
          cUDID:televisionInfo ? televisionInfo.activeid : "",
          cOpenId:UserOpenId,
          cNickName:"",
        },
        success: function (result) {
            if(result.code == 50100){
                bLogin ? (initSrvOnce.doneWhenLogin = true) : (initSrvOnce.doneWhenUnLogin = true);
                bLogin && getUserGold();//已登录状态，初始化成功时获取金币总数
            }
        },
        error: function(err){
            console.log("initActivity error:"+err);
        }
    });
}
//活动期间，用户第一次进入兑换商城时，送150金币，需要调一次初始化让后台更新金币数据库。
//进入页面前，如果用户未登录时，做一次，登录后再做一次（金币数绑定到用户）；如果用户已登录，只会做一次。
//bLogin: false: 未登录  true:已登录
function doInitSrvOnceOnly(bLogin) {
    if(activitySwitch == "on" && bFirstIn == "true") {
        if(initSrvOnce.doneWhenUnLogin == false || initSrvOnce.doneWhenLogin == false){
            initActivity(bLogin);
        }
    }
}
