
cordova.define("coocaa-plugin-coocaaosapi.coocaaosapi", function(require, exports, module) {

    var argscheck = require('cordova/argscheck'),
    channel = require('cordova/channel'),
    exec = require('cordova/exec'),
    cordova = require('cordova'),
    startapp = require('com.lampa.startapp.startapp'),
    brocaster = require('cordova-plugin-broadcaster.broadcaster');

    channel.createSticky('onCoocaaOsInitReady');
    channel.waitForInitialization('onCoocaaOsInitReady');

     //   console.log(JSON.stringify(config));
    function CoocaaOSApi(){
        console.log("------------>CoocaaOSApi()");
        startapp.check("com.tianci.user", function(message) { /* success */
            console.log("账户应用版本：" + JSON.stringify(message));
            accountVersion = message.versionCode;
        }, function(message) {});
        startapp.check("com.tianci.movieplatform", function(message) { /* success */
            console.log("影视应用版本：" + JSON.stringify(message));
            cAppVersion = message.versionCode;
        }, function(message) {});

        var thiz = this;
        channel.onCordovaReady.subscribe(function(){
            console.log("------------>CoocaaOSApi() channel.onCordovaReady.subscribe");
            thiz.waitForCoocaaOSInitReady(function(message){
                console.log('success CoocaaOSInitReady ' +message);
                channel.onCoocaaOsInitReady.fire();
            },function(message){
                console.log('error : ' + message);
            });
        });
    }

   CoocaaOSApi.prototype.waitForCoocaaOSInitReady = function(success,error){
        console.log("------------>waitForCoocaaOSInitReady()");
        argscheck.checkArgs('ff','CoocaaOSApi.waitForCoocaaOSInitReady',arguments);
        exec(success,error,'CoocaaOSApi','waitForOSReady',[]);
   }

/*************************************内置应用相关*************************************************/
/*
* 启动本地媒体
*/
    CoocaaOSApi.prototype.startLocalMedia = function(success,error){
        argscheck.checkArgs('ff','CoocaaOSApi.startLocalMedia',arguments);
        startapp.check("com.tianci.localmedia", function(message) { /* success */
           startapp.start([["com.tianci.localmedia", "com.tianci.localmedia.MainActivity"]], success,error);
        },
        error);
    }

/*
*启动电视设置
*/
     CoocaaOSApi.prototype.startTVSetting = function(success,error){
        argscheck.checkArgs('ff','CoocaaOSApi.startTVSetting',arguments);
        startapp.check("com.tianci.setting", function(message) { /* success */
            startapp.start([["com.tianci.setting", "com.tianci.setting.TianciSetting"]], success,error);
        },
        error);
     }

/*
*启动信号源
*/
     CoocaaOSApi.prototype.startSourceList = function(success,error){
         argscheck.checkArgs('ff','CoocaaOSApi.startSourceList',arguments);
         exec(success,error,'CoocaaOSApi','launchSourceList',[]);
      }

/*
*启动二维码
*/
    CoocaaOSApi.prototype.startQRCode = function(success,error){
        argscheck.checkArgs('ff','CoocaaOSApi.startTVSetting',arguments);
         startapp.check("com.tianci.qrcode", function(message) {
         startapp.start([["com.tianci.qrcode", "com.tianci.qrcode.SkyQrcode"]], success,error);},
          error);
      }

/*
*启动影视历史
*/
     CoocaaOSApi.prototype.startMovieHistory = function(success,error){
            argscheck.checkArgs('ff','CoocaaOSApi.startMovieHistory',arguments);
             startapp.start([["action", "coocaa.intent.movie.history"]], success,error);
     }

/*
*启动我的游戏
*/
      CoocaaOSApi.prototype.startMyGames = function(success,error){
            argscheck.checkArgs('ff','CoocaaOSApi.startMyGames',arguments);
             startapp.start([["action", "coocaa.intent.action.GAME_CENTER_MYGAME"]], success,error);
      }

/*
* 启动我的应用
* mode: child / 其他，代表启动的是哪个模式下的程序
*/
      CoocaaOSApi.prototype.startMyApps = function(mode,success,error){
            argscheck.checkArgs('sff','CoocaaOSApi.startMyApps',arguments);
            if(mode=='child')
            {
                startapp.start([["action", "coocaa.intent.action.MYAPP_CHILD_MODEL"]], success,error);
            }
            else
            {
                startapp.start([["action", "coocaa.intent.action.APP_STORE_MYAPPS"]], success,error);
            }
      }

/*
*启动用户设置
*/
      CoocaaOSApi.prototype.startUserSetting = function(success,error){
            argscheck.checkArgs('ff','CoocaaOSApi.startUserSetting',arguments);
             startapp.start([["action", "android.settings.ADD_ACCOUNT_SETTINGS"]], success,error);
      }

/*
*启动用户设置，登录成功就消失
*/
    CoocaaOSApi.prototype.startUserSettingAndFinish = function(success,error){
        argscheck.checkArgs('ff','CoocaaOSApi.startUserSettingAndFinish',arguments);
        startapp.start([["action", "android.settings.ADD_ACCOUNT_SETTINGS"],[{'needFinish':true}]], success,error);
     //开机引导时多2个参数startapp.start([["action", "android.settings.ADD_ACCOUNT_SETTINGS"],[{'needFinish':true},{'layoutType':"LOGIN_MOBILE"},{'fromGuide':true}]], success,error);
    };
//包名类名方式启动
    CoocaaOSApi.prototype.startUserSettingAndFinish2 = function(success,error){
        argscheck.checkArgs('ff','CoocaaOSApi.startUserSettingAndFinish',arguments);
        startapp.check("com.tianci.user", function(message) { /* success */
            startapp.start([["com.tianci.user", "com.tianci.webview.AccountWebActivity"],[{'needFinish':true}]], success,error);
        },error);
    }
/*
*启动网络设置
*/
      CoocaaOSApi.prototype.startNetSetting = function(success,error){
            argscheck.checkArgs('ff','CoocaaOSApi.startNetSetting',arguments);
             startapp.start([["action", "android.settings.NETWORK_OPERATOR_SETTINGS"]], success,error);
      }

/*
*启动蓝牙设置
*/
      CoocaaOSApi.prototype.startBlueToothSetting = function(success,error){
            argscheck.checkArgs('ff','CoocaaOSApi.startBlueToothSetting',arguments);
             startapp.start([["action", "android.settings.BLUETOOTH_SETTINGS"]], success,error);
      }

/*
*启动消息盒子
*/
      CoocaaOSApi.prototype.startMessageBox = function(success,error){
            argscheck.checkArgs('ff','CoocaaOSApi.startMessageBox',arguments);
            startapp.start([["action", "com.coocaa.action.MESSAGEBOX"]], success,error);
      }

/*
* 启动升级界面
*/
     CoocaaOSApi.prototype.startSystemUpgrade = function(success,error){
          argscheck.checkArgs('ff','CoocaaOSApi.startSystemUpgrade',arguments);
          startapp.start([["action", "android.settings.SYSTEM_UPGRADE"]], success,error);
      }

/*
* 获取用户access_token
*/
    CoocaaOSApi.prototype.getUserAccessToken = function(success,error){
        argscheck.checkArgs('ff','CoocaaOSApi.getUserAccessToken',arguments);
        exec(success,error,'CoocaaOSApi','getUserAccessToken',[]);
    }
/*******************************************影视相关***********************************************/

    function MovieItem(){
        var thiz = this;
    }

/*
* 启动影视列表页
*/
  CoocaaOSApi.prototype.startMovieList = function(listid,success,error){
           argscheck.checkArgs('sff','CoocaaOSApi.startMovieList',arguments);
           startapp.start([["action", "coocaa.intent.movie.list"],[{'id':listid}]], success,error);
      }
/*
* 启动影视详情页
*/
CoocaaOSApi.prototype.startMovieDetail = function(detailid,success,error){
    argscheck.checkArgs('sff','CoocaaOSApi.startMovieDetail',arguments);
	startapp.start([["action", "coocaa.intent.movie.detailinfo"],[{'id':detailid}]], success,error);
}

/*
*启动影视专题页
*/
    CoocaaOSApi.prototype.startMovieTopic = function(topicid,success,error){
        argscheck.checkArgs('sff','CoocaaOSApi.startMovieTopic',arguments);
        startapp.start([["action", "coocaa.intent.movie.special"],[{'id':topicid}]], success,error);
    };

/*
*启动影视、教育产品包
*/
    CoocaaOSApi.prototype.productPackage = function(type,success,error){
        argscheck.checkArgs('sff','CoocaaOSApi.productPackage',arguments);
        startapp.start([["action", "coocaa.intent.vip.center"],[{'business_type':type}]], success,error);
    };
/*
*启动影视会员中心
*/
CoocaaOSApi.prototype.startMovieMemberCenter = function(urltype,success,error){
    argscheck.checkArgs('sff','CoocaaOSApi.startMovieMemberCenter',arguments);
    startapp.start([["action", "coocaa.intent.vip.center"],[{'url_type':urltype}]], success,error);
};
/*启动影视会员中心2级页面*/
CoocaaOSApi.prototype.startMovieMemberCenter2 = function(source_id,success,error){
    argscheck.checkArgs('sff','CoocaaOSApi.startMovieMemberCenter2',arguments);
    startapp.start([["action", "coocaa.intent.vip.center.second"],[{'source_id':source_id}]], success,error);
};
/*
*启动影视中心
*/
CoocaaOSApi.prototype.startMovieHome = function(success,error){
    argscheck.checkArgs('ff','CoocaaOSApi.startMovieHome',arguments);
    startapp.start([["action", "coocaa.intent.movie.home"]], success,error);
};

/*
*  启动播放器
*  最小集合
*  needparse: 需要传递'true'|'false'，默认传递false
*/
   CoocaaOSApi.prototype.playOnlineMovie = function(url,name,needparse,success,error){
        argscheck.checkArgs('sssff','CoocaaOSApi.playOnlineMovier',arguments);
        exec(success,error,'CoocaaOSApi','startOnLinePlayer',[{'url':url},{'name':name},{'needparse':needparse}]);
   }

/*******************************************应用相关***********************************************/

/*
*启动应用商城
*/
    CoocaaOSApi.prototype.startAppStore = function(success,error){
        argscheck.checkArgs('ff','CoocaaOSApi.startAppStore',arguments);
        startapp.start([["action", "coocaa.intent.action.APP_STORE_HOME"]], success,error);
    }

  /*
  *启动应用商城榜单页
  */
     CoocaaOSApi.prototype.startAppStoreBD = function(rankid,success,error){
           argscheck.checkArgs('nff','CoocaaOSApi.startAppStoreBD',arguments);
           startapp.start([["action", "coocaa.intent.action.APP_STORE_RANKING"],[{'rankId':rankid }]], success,error);
       }

/*
*启动应用商城分类页
*/
    CoocaaOSApi.prototype.startAppStoreSort = function(sortid,success,error){
        argscheck.checkArgs('sff','CoocaaOSApi.startAppStoreSort',arguments);
        startapp.start([["action", "coocaa.intent.action.APP_STORE_SORT"],[{'sortid':sortid}]], success,error);
    }

/*
*启动应用商城列表页
*/
    CoocaaOSApi.prototype.startAppStoreList = function(listid,success,error){
        argscheck.checkArgs('sff','CoocaaOSApi.startAppStoreList',arguments);
        startapp.start([["action", "coocaa.intent.action.APP_STORE_LIST"],[{'listId':listid}]], success,error);
    }

/*
*启动应用商城详情页
*可以传递pkg或者id
*/
    CoocaaOSApi.prototype.startAppStoreDetail = function(idorpgk,success,error){
        argscheck.checkArgs('sff','CoocaaOSApi.startAppStoreDetail',arguments);
        startapp.start([["action", "coocaa.intent.action.APP_STORE_DETAIL"],[{'id':idorpgk}]], success,error);
    }

/*
*启动应用商城专题页
*/
    CoocaaOSApi.prototype.startAppStoreZone = function(zoneid,success,error){
        argscheck.checkArgs('sff','CoocaaOSApi.startAppStoreZone',arguments);
        startapp.start([["action", "coocaa.intent.action.ZONEPAGE"],[{'id':zoneid}]], success,error);
    }

/*
*启动应用商城优惠券页面
*/
    CoocaaOSApi.prototype.startAppStoreCoupuns = function(pageid,success,error){
        argscheck.checkArgs('sff','CoocaaOSApi.startAppStoreCoupuns',arguments);
        startapp.start([["action", "coocaa.intent.action.MALL_MYPREFER"],[{'id':pageid}]], success,error);
    }

/**
     * 启动应用程序，如果程序存在直接启动，否则就创建应用下载任务
     * @param url 下载地址
     * @param md5 md5校验值，如果不存在则传空字符串 ''
     * @param title 下载的任务名字
     * @param packageName 应用包名
     * @param appID 应用的appID，由应用圈的后台接口给出
     * @param iconUrl 应用iconURL
     *
     * @return (success)
        function (message){
            console.log("taskid " + message.tasid); //任务id
            console.log("status " + message.status); //任务状态
                   public static final int STATUS_ON_DEFAULT = 0;
                   public static final int STATUS_TO_START = 1;
                   public static final int STATUS_TO_START_NOW = 2;
                   public static final int STATUS_TO_REMOVE = 3;
                   public static final int STATUS_TO_PAUSE = 4;
                   public static final int STATUS_ON_DOWNLOADING = 5;
                   public static final int STATUS_ON_PAUSED = 6;
                   public static final int STATUS_ON_STOPPED = 7;
                   public static final int STATUS_ON_COMPLETE = 8;
                   public static final int STATUS_ON_REMOVED = 9;
                   public static final int STATUS_ON_STARTING = 10;
            console.log("name " + message.name); //名称
             console.log("url " + message.url); //下载地址
              console.log("progress " + message.progress); //进度
               console.log("createtime " + message.createtime); //创建时间
               console.log("code " + message.code); //额外code
                console.log("extra " + message.extra); //额外附带信息
        }
     */
    CoocaaOSApi.prototype.startOrCreateDownloadTask = function(downloadurl,md5, title,packageName,appID,iconUrl,success,error){
        argscheck.checkArgs('ssssssff','CoocaaOSApi.startOrCreateDownloadTask',arguments);
          	startapp.check(packageName,function(checksuccess){
            	startapp.start(packageName,success,error);
          	},function(checkerror){
                console.log(checkerror);
                exec(success,error,'CoocaaOSApi','createDownloadTask',[{'url':downloadurl},{'md5':md5},{'title':title},{'pkg':packageName},{'appid':appID},{'icon':iconUrl}]);
          	}
        );
    }

/*
* 恢复下载接口
* 传递taskid。
*
*/
    CoocaaOSApi.prototype.resumeDownloadTask = function(taskid,success,error){
        argscheck.checkArgs('sff','CoocaaOSApi.resumeDownloadTask',arguments);
        exec(success,error,'CoocaaOSApi','resumeDownloadTask',[{'taskid':taskid}]);
    }

/*
* 暂停下载接口
* 传递taskid。
*
*/
    CoocaaOSApi.prototype.pauseDownloadTask = function(taskid,success,error){
        argscheck.checkArgs('sff','CoocaaOSApi.pauseDownloadTask',arguments);
        exec(success,error,'CoocaaOSApi','pauseDownloadTask',[{'taskid':taskid}]);
    }

/*
* 继续下载接口
* 传递taskid。
*/
    CoocaaOSApi.prototype.deleteDownloadTask = function(taskid,success,error){
         argscheck.checkArgs('sff','CoocaaOSApi.deleteDownloadTask',arguments);
        exec(success,error,'CoocaaOSApi','deleteDownloadTask',[{'taskid':taskid}]);
    }

/*******************************************游戏相关***********************************************/
/*
* 启动酷游吧
*/
 CoocaaOSApi.prototype.startGameCenter = function(success,error){
        argscheck.checkArgs('ff','CoocaaOSApi.startGameCenter',arguments);
        startapp.start([["action", "coocaa.intent.action.GAME_CENTER_HOME"]], success,error);
    }

/*
*启动酷游吧游戏详情页
*可以传递pkg或者id
*/
    CoocaaOSApi.prototype.startGameCenterDetail = function(idorpgk,success,error){
        argscheck.checkArgs('sff','CoocaaOSApi.startGameCenterDetail',arguments);
        startapp.start([["action", "coocaa.intent.action.GAME_CENTER_DETAIL"],[{'id':idorpgk}]], success,error);
    }

/*
*启动酷游吧游戏列表页
*/
    CoocaaOSApi.prototype.startGameCenterList = function(id,title,success,error){
        argscheck.checkArgs('ssff','CoocaaOSApi.startGameCenterList',arguments);
        startapp.start([["action", "coocaa.intent.action.GAME_CENTER_LIST"],[{'id':id,'title':title}]], success,error);
    }

/*
*启动酷游吧游戏专题页
*/
    CoocaaOSApi.prototype.startGameCenterZone = function(id,success,error){
        argscheck.checkArgs('sff','CoocaaOSApi.startGameZone',arguments);
        startapp.start([["action", "coocaa.intent.action.GAME_CENTER_ZONE"],[{'id':id}]], success,error);
    }

/*
*启动军火库
*/
    CoocaaOSApi.prototype.startGameArsenal = function(success,error){
            argscheck.checkArgs('ff','CoocaaOSApi.startGameArsenal',arguments);
            startapp.start([["action", "coocaa.intent.action.GAME_CENTER_ARSENAL"]], success,error);
        }

/*******************************************系统相关***********************************************/
/*
* 判断当前是否有用户登录，只针对酷开账号，如果要判断第三方账号，还需要自行获取用户信息，判断第三方账号是否为空
/*function (message){
                console.log("haslogin " + message.haslogin);
            }
   return:
   true: 已经登录
   false: 未登录
*/
CoocaaOSApi.prototype.hasCoocaaUserLogin = function(success,error){
        argscheck.checkArgs('ff','CoocaaOSApi.hasCoocaaUserLogin',arguments);
        exec(success,error,'CoocaaOSApi','hasCoocaaUserLogin',[]);
   }

/*
* 直接启动到第三方QQ登录界面
*/
CoocaaOSApi.prototype.startThirdQQAccount = function(success,error){
        argscheck.checkArgs('ff','CoocaaOSApi.startThirdQQAccount',arguments);
        exec(success,error,'CoocaaOSApi','startQQAccount',[]);
   }

//包名类名方式启动【账户版本4.3以上，酷开版本5.5以下】
CoocaaOSApi.prototype.startWeixinOrQQ2 = function(type, success, error) {
    argscheck.checkArgs('sff', 'CoocaaOSApi.startWeixinOrQQ', arguments);
    startapp.check("com.tianci.user", function(message) { /* success */
        startapp.start([
            ["com.tianci.user", "com.tianci.webview.AccountWebActivity"],
            [{ 'needFinish': true }, { 'type': type }]
        ], success, error);
    }, error);
}
/*
* 获取当前用户信息
* 主要的信息是open_id
*
/*function (message){
                console.log("address " + message.address);
                console.log("avatar " + message.avatar);
                console.log("avatars " + message.avatars);
                console.log("birthday " + message.birthday);
                console.log("city " + message.city);
                console.log("corp " + message.corp);
                console.log("district " + message.district);
                console.log("education_grade " + message.education_grade);
                console.log("email " + message.email);
                console.log("gender " + message.gender);
                console.log("idcard " + message.idcard);
                console.log("line " + message.line);
                console.log("mobile " + message.mobile);
                console.log("nick_name " + message.nick_name);
                console.log("occupation " + message.occupation);
                console.log("open_id " + message.open_id);
                console.log("oss_id " + message.oss_id);
                console.log("postcode " + message.postcode);
                console.log("province " + message.province);
                console.log("qq " + message.qq);
                console.log("region " + message.region);
                console.log("region_id " + message.region_id);
                console.log("revenue " + message.revenue);
                 console.log("score " + message.score);
                 console.log("sky_id " + message.sky_id);
                 console.log("skype " + message.skype);
                 console.log("slogan " + message.slogan);
                 console.log("tel1 " + message.tel1);
                 console.log("tel2 " + message.tel2);
                 console.log("visit_num " + message.visit_num);
                 console.log("wechat " + message.wechat);
                 console.log("weibo " + message.weibo);
                 console.log("balance " + message.balance);
                 console.log("third_account " + message.third_account);
                 console.log("external_info " + message.external_info);
            }
*/
CoocaaOSApi.prototype.getUserInfo = function(success,error){
        argscheck.checkArgs('ff','CoocaaOSApi.getUserInfo',arguments);
        exec(success,error,'CoocaaOSApi','getUserInfo',[]);
   }

/*
* 获取当前设备信息
* message {"pennel","version","model","chipid","mac","chip","androidsdk","devid","activeid"}
/*function (message){
                console.log("panel " + message.panel);
                console.log("version " + message.version);
                console.log("model " + message.model);
                 console.log("chip " + message.chip);
                  console.log("mac " + message.mac);
                  console.log("chipid " + message.chipid);
                  console.log("androidsdk " + message.androidsdk);
                   console.log("devid " + message.devid);
                    console.log("activeid " + message.activeid);
            }
   return:
   panel:屏幕尺寸
   version:酷开TV系统版本号
   model: 机型。
   chip: 机芯。
   mac:设备mac(有线)
   chipid:机芯id
   androidsdk:android版本号
   devid:设备唯一id
   activeid:设备激活id/联网之后由后台分配
*/
CoocaaOSApi.prototype.getDeviceInfo = function(success,error){
    argscheck.checkArgs('ff','CoocaaOSApi.getDeviceInfo',arguments);
    exec(success,error,'CoocaaOSApi','getDeviceInfo',[]);
}

/*
* 判断网络是否连接
/*function (message){
                console.log("isnetworking " + message.isnetworking);
            }
   return:
   true: 联网
   false:未联网
*/
CoocaaOSApi.prototype.isNetConnected = function(success,error){
    argscheck.checkArgs('ff','CoocaaOSApi.isNetConnected',arguments);
            exec(success,error,'CoocaaOSApi','isNetConnected',[]);
}

/*
* 获取当前网络类型
/*function (message){
                console.log("nettype " + message.nettype);
            }
   return:
     ETHERNET：有线网络
     WIFI：wifi网络
     PPPOE：以太网络，小区网络
     UNKNOW：未知
*/
CoocaaOSApi.prototype.getNetType = function(success,error){
    argscheck.checkArgs('ff','CoocaaOSApi.getNetType',arguments);
    exec(success,error,'CoocaaOSApi','getNetType',[]);
}

/*
* 获取当前网络ip地址的信息
/*function (message){
                console.log("dns0 " + message.dns0);
                console.log("dns1 " + message.dns0);
                console.log("gateway " + message.dns0);
                console.log("ip " + message.dns0);
                console.log("mac " + message.dns0);
                console.log("netmask " + message.dns0);
            }
return:
  ip:ip地址
  gateway:默认网关
  netmask:子网掩码
  dns0:主dns
  dns1:备用dns
  mac:mac地址
*/
CoocaaOSApi.prototype.getIpInfo= function(success,error){
    argscheck.checkArgs('ff','CoocaaOSApi.getIpAddress',arguments);
    exec(success,error,'CoocaaOSApi','getIpInfo',[]);
}

/*
* 获取当前城市，设备所在地址
* 获取到的message.contury,message.city,...
* 可以根据当前ip调用其他接口获取当前电视的城市位置，精准到城市是可以的
/*function (message){
                console.log("location " + message.location);
            }
return:
  location:位置信息，可能为两级或三级地址信息，比如："广东省,深圳市,"。
*/
CoocaaOSApi.prototype.getDeviceLocation = function(success,error){
    argscheck.checkArgs('ff','CoocaaOSApi.getDeviceLocation',arguments);
    exec(success,error,'CoocaaOSApi','getDeviceLocation',[]);
}

/*
* 增加网络广播事件监听
/* function( message ) {
        {"nettype":"ethnet|wifi","netevent":"changged event"}
        }

        ethnet: /**
                        * Description: 网络已连接成功
                       EVENT_ETH_CONNECT_SUCCEEDED,
                       /**
                        * Description: 网络连接失败
                       EVENT_ETH_CONNECT_FAILD,
                       /**
                        * Description: 网线已插上
                       EVENT_ETH_CABLE_CONNECTED,
                       /**
                        * Description: 网线已断开
                       EVENT_ETH_CABLE_DISCONNECTED,
                       /**
                        * Description: 未知
                       EVENT_ETH_UNKNOW,
                       /**
                        * Description: 连接初始化失败
                       EVENT_ETH_CONNECT_INIT_FAIL,
                       /**
                        * Description: 由于网线未连接导致连接失败
                       EVENT_ETH_CONNECT_FAILD_BY_CABLE_NOT_CONNECT,
                       /**
                        * Description: 连接以太网超时
                       EVENT_ETH_CONNECT_FAILD_BY_TIMEOUT

       wifi:
         /**
                 * Description: 网络已连接成功
                EVENT_WIFI_CONNECT_SUCCEEDED,
                /**
                 * Description: 网络连接中
                EVENT_WIFI_CONNECT_CONNECTING,
                /**
                 * Description: 无线已断开
                EVENT_WIFI_CONNECT_DISCONNECTED,
                /**
                 * Description: 无线断开中
                EVENT_WIFI_CONNECT_DISCONNECTING,
                /**
                 * Description: 无线连接失败
                EVENT_WIFI_CONNECT_FAILD,
                /**
                 * Description: 未知状态
                EVENT_WIFI_CONNECT_UNKNOW,
                /**
                 * @Description : WIFI强度变化
                EVENT_WIFI_RSSI_CHANGED,
                /**
                 * @Description : WIFI请求搜索出现失败
                EVENT_WIFI_SCAN_FAIL
*/
CoocaaOSApi.prototype.addNetChangedListener = function(listener)
{
    argscheck.checkArgs('f','CoocaaOSApi.addNetChangedListener',arguments);
    brocaster.addEventListener( "NET_CHANGGED", listener);
}

/*
* 添加外部磁盘拔插广播
/* function( message ) {
        {"usbmount":"false","mountpath":"file:///mnt/usb/sda1"}
        console.log( "USB_CHANGGED received! ismount: " + message.usbmount  );
        console.log( "USB_CHANGGED received! mountpath: " + message.mountpath  );
    }
*/
CoocaaOSApi.prototype.addUSBChangedListener = function(listener)
{
    argscheck.checkArgs('f','CoocaaOSApi.addUSBChangedListener',arguments);
    brocaster.addEventListener( "USB_CHANGGED",listener);
}

/*
* 添加应用下载的广播监听
/*  @return (success)
               function (message){
                   console.log("taskid " + message.tasid); //任务id
                   console.log("status " + message.status); //任务状态
                          public static final int STATUS_ON_DEFAULT = 0;
                          public static final int STATUS_TO_START = 1;
                          public static final int STATUS_TO_START_NOW = 2;
                          public static final int STATUS_TO_REMOVE = 3;
                          public static final int STATUS_TO_PAUSE = 4;
                          public static final int STATUS_ON_DOWNLOADING = 5;
                          public static final int STATUS_ON_PAUSED = 6;
                          public static final int STATUS_ON_STOPPED = 7;
                          public static final int STATUS_ON_COMPLETE = 8;
                          public static final int STATUS_ON_REMOVED = 9;
                          public static final int STATUS_ON_STARTING = 10;
                   console.log("name " + message.name); //名称
                    console.log("url " + message.url); //下载地址
                     console.log("progress " + message.progress); //进度
                      console.log("createtime " + message.createtime); //创建时间
                      console.log("code " + message.code); //额外code
                       console.log("extra " + message.extra); //额外附带信息
               }
*/
CoocaaOSApi.prototype.addAppTaskListener = function(listener)
{
    argscheck.checkArgs('f','CoocaaOSApi.addAppTaskListener',arguments);
    brocaster.addEventListener( "APP_TASK_CALLBACK",listener);
}

/*
* 添加用户切换变化广播。
*  {'userchangged':'true'}
          console.log( "USER_CHANGGED received!" + message.userchangged  );
*/
CoocaaOSApi.prototype.addUserChanggedListener = function(listener)
{
    argscheck.checkArgs('f','CoocaaOSApi.addUserChanggedListener',arguments);
    brocaster.addEventListener( "USER_CHANGGED",listener);
}


/*
* 添加用户支付广播
* callback listener =
*  {'presultstatus':123,'ptradeid':'xxx','presultmsg':'xxxxx','ppurchWay','xxxxxxxxx'}
   console.log( "PURCHASE_CALLBACK received! resultstatus = " + message.presultstatus  );
   console.log( "PURCHASE_CALLBACK received! tradeid = " + message.ptradeid  );
   console.log( "PURCHASE_CALLBACK received! resultmsg = " + message.presultmsg  );
   console.log( "PURCHASE_CALLBACK received! purchWay = " + message.ppurchWay  );
*/
CoocaaOSApi.prototype.addPurchaseOrderListener = function(listener)
{
    argscheck.checkArgs('f','CoocaaOSApi.addPurchaseOrderListener',arguments);
    brocaster.addEventListener( "PURCHASE_CALLBACK",listener);
}

/*
* 用户付费行为
* appcode//商户编号ID,由酷开发布给第三方
* tradeid//订单编号ID
* productname//商品名称，例如“影视包年”
*productsubname//实体商品简介
* producttype//商品类型，在“实体”和“虚拟”中选择,实体订单必须走账号支付
*specialtype//必填，通知支付结果给第三方开发者服务器URL，必须以http://开头，目前支持80端口 ，参数内容为，json格式字符串 例如：{"notify_url":"http://tv.coocaa.com/notify_url.html"}
*amount//商品价格，以“元”为单位
*count//实体商品个数（虚拟无需设置）
*imgurl//实体商品图片地址（虚拟无需设置）
*spec//实体商品规格（虚拟无需设置）
ex:
 var math =  Math.random() * 9000000 + 1000000;
* coocaaosapi.purchaseOrder('1001',math+'','包月','product detail','虚拟',{'notify_url':'http://42.121.113.121:8090/aqiyiOrder/viewMain.html'},0.01,0,'','',f,f);
*/
CoocaaOSApi.prototype.purchaseOrder = function(appcode,tradeid,productname,productsubname,producttype,specialtype,amount,count,imgurl,spec,success,error){
    argscheck.checkArgs('sssssonnssff','CoocaaOSApi.purchaseOrder',arguments);
    exec(success,error,'CoocaaOSApi','purchaseOrder',[{'appcode':appcode},{'tradeid':tradeid},{'productname':productname},{'productsubname':productsubname},{'producttype':producttype},{'specialtype':specialtype},{'amount':amount},{'count':count},{'imgurl':imgurl},{'spec':spec}]);
}

/*******************************************cordova 2.0新增***********************************************/
//启动集成到webSDK内部的支付页面----------即2.2.3（含）"versionCode">=2020003以上使用
CoocaaOSApi.prototype.purchaseOrder2 = function(appcode,Tradeid,ProductName,SpecialType,amount,ProductType,payAction,cmd,token,tel,success,error){
    argscheck.checkArgs('ssssnsssssff','CoocaaOSApi.purchaseOrder',arguments);
    console.log("start@@@@@@@@@@@@@@@@@@")
    exec(success,error,'CoocaaOSApi','purchaseOrder',[{'appcode':appcode},{'Tradeid':Tradeid},{'ProductName':ProductName},{'SpecialType':SpecialType},{'amount':amount},{'ProductType':ProductType},{'payAction':payAction},{'cmd':cmd},{'token':token},{'tel':tel}]);
}

//启动影视支付（用于自动续费）
CoocaaOSApi.prototype.startMoviePay = function(success,error){
    argscheck.checkArgs('ff','CoocaaOSApi.startMoviePay',arguments);
    startapp.start([["action", "coocaa.intent.movie.pay"],[{"cmd":"login"}]], success,error);
}


/*获取影视app版本*/
CoocaaOSApi.prototype.getMoviePlatformInfo = function(success,error){
    console.log("lxw "+ "getMoviePlatformInfo in coocaaosapi.js");
    argscheck.checkArgs('ff','CoocaaOSApi.getMoviePlatformInfo',arguments);
    exec(success,error,'CoocaaOSApi','getMoviePlatformInfo',[]);
}
/*获取主题信息*/
CoocaaOSApi.prototype.getCurTheme = function(success,error){
    console.log("lxw "+ "getCurTheme in coocaaosapi.js");
    argscheck.checkArgs('ff','CoocaaOSApi.getCurTheme',arguments);
    exec(success,error,'CoocaaOSApi','getCurTheme',[]);
}
/*获取web框架信息*/
CoocaaOSApi.prototype.getWebViewSDKInfo = function(success,error){
    console.log("lxw "+ "getWebViewSDKInfo in coocaaosapi.js");
    argscheck.checkArgs('ff','CoocaaOSApi.getWebViewSDKInfo',arguments);
    exec(success,error,'CoocaaOSApi','getWebViewSDKInfo',[]);
}
/*获取应用圈信息*/
CoocaaOSApi.prototype.getAppStoreInfo = function(success,error){
    console.log("lxw "+ "getAppStoreInfo in coocaaosapi.js");
    argscheck.checkArgs('ff','CoocaaOSApi.getAppStoreInfo',arguments);
    exec(success,error,'CoocaaOSApi','getAppStoreInfo',[]);
}
/*设置焦点位置*/
CoocaaOSApi.prototype.setFocusPosition = function(focuspositioninfo,success,error){
    console.log("lxw in coocaaOsApi"+focuspositioninfo);
    argscheck.checkArgs('sff','CoocaaOSApi.setFocusPosition',arguments);
    exec(success,error,'CoocaaOSApi','setFocusPosition',[{'focusposition':focuspositioninfo}]);
}
/*web页面消息上传*/
CoocaaOSApi.prototype.notifyJSMessage = function(mywebinfo,success,error){
    console.log("lxw in coocaaOsApi "+mywebinfo);
    argscheck.checkArgs('sff','CoocaaOSApi.notifyJSMessage',arguments);
    exec(success,error,'CoocaaOSApi','notifyJSMessage',[{'webInfo':mywebinfo}]);
}

/*日志消息上传*/
//页面启动eventId = page_onResume              map:{"title":""}
//页面退出eventId = page_onPause               map:{"title":""}两者title必须保持一致，不可缺省

CoocaaOSApi.prototype.notifyJSLogInfo = function(eventId,ddata,success,error){
    argscheck.checkArgs('ssff','CoocaaOSApi.notifyJSLogInfo',arguments);
    exec(success,error,'CoocaaOSApi','notifyJSLogInfo',[{'eventId':eventId},{'params':ddata}]);
};
CoocaaOSApi.prototype.notifyJSLogResumeInfo = function(eventId,ddata,success,error){
    argscheck.checkArgs('ssff','CoocaaOSApi.notifyJSLogResumeInfo',arguments);
    exec(success,error,'CoocaaOSApi','notifyJSLogInfoExtra',[{'eventId':eventId},{'params':ddata},{'type':'resume'}]);
};
CoocaaOSApi.prototype.notifyJSLogPauseInfo = function(eventId,success,error){
    argscheck.checkArgs('sff','CoocaaOSApi.notifyJSLogPauseInfo',arguments);
    exec(success,error,'CoocaaOSApi','notifyJSLogInfoExtra',[{'eventId':eventId},{'params':'{}'},{'type':'pause'}]);
};

//启动酷开商城首页
CoocaaOSApi.prototype.startAppShop = function(success,error){
    argscheck.checkArgs('ff','CoocaaOSApi.startAppShop',arguments);
    startapp.start([["action", "coocaa.intent.action.MALL_HOME"]], success,error);
}

//启动酷开商城列表页
CoocaaOSApi.prototype.startAppShopList = function(id,title,success,error){
    argscheck.checkArgs('ssff','CoocaaOSApi.startAppShopList',arguments);
    startapp.start([["action", "coocaa.intent.action.MALL_LIST"],[{"id":id},{"title":title}]], success,error);
}

//启动购物图文详情页
CoocaaOSApi.prototype.startAppShopDetail = function(id,success,error){
    argscheck.checkArgs('sff','CoocaaOSApi.startAppShopDetail',arguments);
    startapp.start([["action", "coocaa.intent.action.MALL_DETAIL"],[{"id":id}]], success,error);
}

//启动酷开商城专题页
CoocaaOSApi.prototype.startAppShopZone = function(id,success,error){
    argscheck.checkArgs('sff','CoocaaOSApi.startAppShopZone',arguments);
    startapp.start([["action", "coocaa.intent.action.MALL_ZONE"],[{"id":id}]], success,error);
};
CoocaaOSApi.prototype.startAppShopZone2 = function(id,success,error){
    argscheck.checkArgs('sff','CoocaaOSApi.startAppShopZone2',arguments);
    startapp.start([["action", "coocaa.intent.action.MALL_LIST_ZONE"],[{"pageId":id}]], success,error);
};
//启动酷开商城专题列表页
CoocaaOSApi.prototype.startAppShopZoneList = function(success,error){
    argscheck.checkArgs('ff','CoocaaOSApi.startAppShopZoneList',arguments);
    startapp.start([["action", "coocaa.intent.action.MALL_ZONE_LIST"]], success,error);
}

//启动酷开商城视频详情页
CoocaaOSApi.prototype.startAppShopVideo = function(id,url,name,success,error){
    argscheck.checkArgs('sssff','CoocaaOSApi.startAppShopVideo',arguments);
    startapp.start([["action", "coocaa.intent.action.MALL_VIDEO"],[{"id":id},{"url":url},{"name":name}]], success,error);
};

//启动酷开商城订单详情
CoocaaOSApi.prototype.orderDetails = function(id,success,error){
    argscheck.checkArgs('sff','CoocaaOSApi.orderDetails',arguments);
    startapp.start([["action", "coocaa.intent.action.MALL_ORDERMGR_DETAIL"],[{"ordersn":id}]], success,error);
};

//启动购物酷开商城活动列表页
CoocaaOSApi.prototype.startAppShopBUYING = function(id,success,error){
    argscheck.checkArgs('sff','CoocaaOSApi.startAppShopBUYING',arguments);
    startapp.start([["action", "coocaa.intent.action.MALL_BUYING"],[{"id":id}]], success,error);
}
//启动影视内部webview
CoocaaOSApi.prototype.startMovieWebview = function(url,success,error){
    argscheck.checkArgs('sff','CoocaaOSApi.startMovieWebview',arguments);
    startapp.start([["action", "coocaa.intent.movie.webview"],[{"url":url}]], success,error);
}

//启动影视内部web页面
CoocaaOSApi.prototype.startMovieWebviewInsert = function(url,success,error){
    argscheck.checkArgs('sff','CoocaaOSApi.startMovieWebviewInsert',arguments);
    startapp.start([["action", "coocaa.intent.movie.webview"],[{"url":url}]], success,error);
}

//启动影视一级页面
CoocaaOSApi.prototype.startMovieWebviewOnePage = function(url,success,error){
    argscheck.checkArgs('sff','CoocaaOSApi.startMovieWebviewOnePage',arguments);
    startapp.start([["action", "coocaa.intent.vip.center"],[{"url":url}]], success,error);
}

//启动影视二级页面
CoocaaOSApi.prototype.startMovieWebviewTwoPage = function(url,success,error){
    argscheck.checkArgs('sff','CoocaaOSApi.startMovieWebviewTwoPage',arguments);
    startapp.start([["action", "coocaa.intent.vip.center.second"],[{"url":url}]], success,error);
}
/*
* 主页专题页
*/
CoocaaOSApi.prototype.startMovieSomePage = function(detailid,success,error){
    argscheck.checkArgs('sff','CoocaaOSApi.startMovieSomePage',arguments);
	startapp.start([["action", "coocaa.intent.action.HOME_SPECIAL_TOPIC"],[{"id":id}]], success,error);
};


//通用启动，后续更多需要修改，暂时只支持后台单参数配制value为id
CoocaaOSApi.prototype.globalopen = function(byvalue,id,success,error){
    argscheck.checkArgs('ssff','CoocaaOSApi.globalopen',arguments);
    startapp.start([["action", byvalue],[{id:id}]],success,error);
};

//启动会员任务中心
CoocaaOSApi.prototype.myCenter = function(success,error){
    argscheck.checkArgs('ff','CoocaaOSApi.myCenter',arguments);
    startapp.start([["action", "coocaa.intent.action.my_center.activity.task"]],success,error);
};

/*
 * 启动安卓小程序
 */
CoocaaOSApi.prototype.startAppX2 = function(uri, preload, success, error) {
    argscheck.checkArgs('ssff', 'CoocaaOSApi.startAppX', arguments);
    if (preload == "true") {
        startapp.startservice(["appx.intent.service.launcher.Start", "com.coocaa.app_browser",[uri, {'pre_load': true}]], success, error);}
    else {
        startapp.startservice(["appx.intent.service.launcher.Start", "com.coocaa.app_browser",[uri, {'pre_load': false}]], success, error);
    }
};

//启动CIBN聚体育
CoocaaOSApi.prototype.startCIBN = function(third_pid,from_internal,success,error){
    argscheck.checkArgs('ssff','CoocaaOSApi.startCIBN',arguments);
    startapp.check("com.pptv.tvsports",function(checksuccess){
        console.log("checksuccess = " + checksuccess);
        startapp.start([["action", "android.intent.action.VIEW","com.pptv.tvsports"," ","pptv_tvsports://tvsports_vip_duration?third_pid=5&from_internal=1"]], success,error);
    },function(checkerror){
        console.log("checkerror = " + checkerror);
        startapp.start([["action", "android.intent.action.VIEW","com.pptv.tvsports"," ","pptv_tvsports://tvsports_vip_duration?third_pid=5&from_internal=1"]], success,error);
    }
	);
}
//启动web url
CoocaaOSApi.prototype.startNewBrowser = function(url, success, error) {
    argscheck.checkArgs('sff', 'CoocaaOSApi.startNewBrowser', arguments);
    startapp.start([
        ["action", "coocaa.intent.action.browser", "com.coocaa.app_browser"],
        [{ "url": url }]
    ], success, error);
}
//获取属性
CoocaaOSApi.prototype.getPropertiesValue = function(data,success,error){
    argscheck.checkArgs('sff','CoocaaOSApi.getPropertiesValue',arguments);
    exec(success,error,'CoocaaOSApi','getPropertiesValue',[{'propertiesKey':data}]);
}
   module.exports = new CoocaaOSApi();
});
