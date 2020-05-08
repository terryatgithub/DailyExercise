/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.addEventListener('backbutton', this.onBackButton, false);
        document.addEventListener('backbuttondown', this.onBackButtonDown, false);
        document.addEventListener('resume', this.onResume, false);
        document.addEventListener('pause', this.onPause, false);
    },
    // deviceready Event Handler
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        console.log("onDeviceReady----------------->----------------->----------------->----------------->----------------->----------------->----------------->----------------->");
        app.receivedEvent('deviceready');
        app.triggleButton();
    },
    onBackButton:function() {
        console.log("onBackButton----------------->----------------->----------------->----------------->----------------->----------------->");
    },
    onBackButtonDown:function() {
        console.log("onBackButtonDown----------------->----------------->----------------->----------------->----------------->----------------->");
        navigator.app.exitApp();
    },
    onResume:function() {
        console.log("onResume----------------->----------------->----------------->----------------->----------------->----------------->");
        document.getElementById('div').innerText = "";
        coocaaosapi.hasCoocaaUserLogin(
            function(message) {
                console.log("haslogin " + message.haslogin);
                document.getElementById('div').innerText += "登录消失后获取用户是否登录"+JSON.stringify(message)+"-------";
            },
            function(error) {
                document.getElementById("div").innerText += "获取用户登录情况失败1-------";
            }
        );
        //获取用户token
        coocaaosapi.getUserAccessToken(
            function(message) {
                console.log("usertoken " + message.accesstoken);
                document.getElementById('div').innerText += "登录消失后获取用户token为："+JSON.stringify(message);
            },
            function(error) {
                document.getElementById("div").innerText += "获取用户token失败-------";
                console.log(error);
            }
        );

    },
    onPause:function() {
        console.log("onPause----------------->----------------->----------------->----------------->----------------->----------------->");
    },
    // Update DOM on a Received Event
    /*
    * fis tools use relative path to general file's hash.
    * so ,the abs path of this file is /js/index.js,if in this file to get the right png hash,and the png file are in img folder,
    * in this file must use __uri(../img/xxx.png) to general the right hash png.
    * but this file path can not be cast to html file,because the html file maybe in a root.
    * please use the functions below to transfrmer the uri.
    *
    * function canonical_uri(src, base_path)
      	{
      		var root_page = /^[^?#]*\//.exec(location.href)[0],
      		root_domain = /^\w+\:\/\/\/?[^\/]+/.exec(root_page)[0],
      		absolute_regex = /^\w+\:\/\//;
      		// is `src` is protocol-relative (begins with // or ///), prepend protocol
      		if (/^\/\/\/?/.test(src))
      		{
      		src = location.protocol + src;
      		}
          // is `src` page-relative? (not an absolute URL, and not a domain-relative path, beginning with /)
      		else if (!absolute_regex.test(src) && src.charAt(0) != "/")
      		{
      			// prepend `base_path`, if any
      			src = (base_path || "") + src;
      		}
          // make sure to return `src` as absolute
      		return absolute_regex.test(src) ? src : ((src.charAt(0) == "/" ? root_domain : root_page) + src);
      	}

      	function rel_html_imgpath(iconurl)
      	{
      		return canonical_uri(iconurl.replace(/.*\/([^\/]+\/[^\/]+)$/, '$1')));
      	}

    */
    receivedEvent: function(id) {

        /*receivedElement.setAttribute('style', 'display:block;');*/

        console.log('Received Event: ' + id+"----------------->----------------->----------------->----------------->----------------->");
    },
    triggleButton:function(){
        console.log("----------------->----------------->----------------->----------------->----------------->----------------->----------------->")
        cordova.require("coocaa-plugin-coocaaosapi.coocaaosapi");

        //获取设备信息
        coocaaosapi.getDeviceInfo(
            function(message) {
                console.log("panel " + message.panel);
                console.log("version " + message.version);
                console.log("model " + message.model);
                console.log("chip " + message.chip);
                console.log("mac " + message.mac);
                console.log("chipid " + message.chipid);
                console.log("androidsdk " + message.androidsdk);
                console.log("devid " + message.devid);
                console.log("activeid " + message.activeid);
                document.getElementById('tvInfo').innerHTML = JSON.stringify(message);
            },
            function(error) {
                console.log(error);
                document.getElementById('tvInfo').innerHTML = "获取设备信息出错";
            }
        );

        document.getElementById("startusersetting").addEventListener("click", function (){
            coocaaosapi.startUserSettingAndFinish(
                function(message) {
                    console.log(message)
                },function(error) {
                    console.log(error);
                }
            );
        },false);

        // document.getElementById("startusersetting").addEventListener("click", function (){
        //     coocaaosapi.startUserSettingAndFinish(
        //         function(message) {
        //             console.log(message);
        //         },function(error) {
        //             console.log(error);
        //         }
        //     );
        // },false);

        //  document.getElementById("startUser").addEventListener("click", function (){
        //      coocaaosapi.startUserSettingAndFinish(function(message) {console.log(message); },function(error) { console.log(error);});
        // },false);


        //用户是否登录
        coocaaosapi.hasCoocaaUserLogin(
            function(message) {
                console.log("haslogin " + message.haslogin);
                document.getElementById('div').innerText += "用户登录信息"+JSON.stringify(message)+"-------";
            },
            function(error) {
                document.getElementById("div").innerText += "获取用户登录情况失败-------";
            }
        );
        //获取用户token
        coocaaosapi.getUserAccessToken(
            function(message) {
                console.log("usertoken " + message.accesstoken);
                document.getElementById('div').innerText += "用户token为："+JSON.stringify(message);
            },
            function(error) {
                document.getElementById("div").innerText += "获取用户token失败-------";
                console.log(error);
            }
        );




    }
};

app.initialize();