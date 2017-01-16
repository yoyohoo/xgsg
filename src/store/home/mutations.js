export default {

    init() {

            var listLen = 0,
                nowTime = '', //当前时间
                errCouts = 0, //错误次数
                state = false, //需要输入验证码的状态
                stockArray = [], //股票代码
                randCode = '',
                param = '', //openid
                khzzh = '', //客户代码
                Permissions = false, //验权状态
                /**
                 *
                 * 时间对象
                 *
                 **/
                Time = {
                    Year: '',
                    Month: '',
                    Date: '',
                    Hours: '',
                    Minutes: ''
                },

                encryptKey = "9d1f9019b1ba46efa343b55f64f6dcc90932fe50c0b0c2df047ebe321f2fe7c4a34bc42a890712aa0018501f32068c6c404a4fe8e4379670170ca0fae1e7e6b103eda2d3733787c1ef2447a28b813e3c0dfb86f85f72759a9e7201c68910eb585eb887123e07918ffdd4981cc5661331a2be61b498803f551f7989a8ec22cbb3";

            Time.Year = new Date().getFullYear();
            Time.Month = new Date().getMonth() + 1;
            Time.Date = new Date().getDate();
            Time.Hours = new Date().getHours();
            if (Time.Hours < 10) {
                Time.Hours = '0' + Time.Hours;
            }
            Time.Minutes = new Date().getMinutes();
            if (Time.Minutes < 10) {
                Time.Minutes = '0' + Time.Minutes;
            }
            nowTime = Time.Year + '年' + Time.Month + '月' + Time.Date + '日  ' + Time.Hours + ':' + Time.Minutes;
            $('.time').html(nowTime);
            /*阻止默认行为*/
            function stopDefaultAction(e) {
                if (e && e.preventDefault) {
                    e.preventDefault();
                } else {
                    window.event.returnValue = false;
                }
            }

            // window.onload = initPage();

            (function initPage() {
                window.ontouchmove = stopDefaultAction;
                var $body = $('body')
                $body.css({
                    'overflow': 'hidden',
                    'position': 'fixed'
                });
                var $Loading = $("#pageLoading");
                if ($Loading != null) {
                    setTimeout(function() {
                        $Loading.fadeOut('10');

                        $body.css({
                            'overflow': 'auto',
                            'position': 'static'
                        });
                        loadding(true);
                        loginFuc();
                    }, 1000)

                }
            })();
            /**
             *
             * 自定义滚动条
             *
             **/
            $('#stock-list').niceScroll({
                cursorcolor: "#C7322F", //#CC0071 光标颜色
                cursoropacitymax: 1, //改变不透明度非常光标处于活动状态（scrollabar“可见”状态），范围从1到0
                touchbehavior: false, //使光标拖动滚动像在台式电脑触摸设备
                cursorwidth: "3px", //像素光标的宽度
                cursorborder: "0", //游标边框css定义
                cursorborderradius: "5px", //以像素为光标边界半径
                autohidemode: false, //是否隐藏滚动条
                // smoothscroll: true,
                scrollspeed: 60,
                mousescrollstep: 1,
                nativeparentscrolling: true,
            });

            /**
             *
             * 截取openid
             *
             **/
            function getQueryStringRegExp(name) {
                var reg = new RegExp("(^|\\?|&)" + name + "=([^&]*)(\\s|&|$)", "i");

                if (reg.test(location.href)) {
                    param = unescape(RegExp.$2.replace(/\+/g, " "));
                }
            };
            getQueryStringRegExp('param');

            function checkedValues() {
                var checkbox = document.getElementsByName('stock');
                for (var i = 0; i < checkbox.length; i++) {
                    if (checkbox[i].checked == true) {
                        stockArray.push(checkbox[i].value);
                    }
                }
                return stockArray;
            }
            /**
             *
             * 时间排序
             *
             **/
            function evlabc(arry) { //排序大小
                var i = 0,
                    j = 0,
                    t = 0;
                var len = arry.length
                for (i = 0; i < len; i++) {
                    for (j = 0; j < len; j++) {
                        if (Date.parse(arry[i].issuedate.replace(/-/g, "/")) < Date.parse(arry[j].issuedate.replace(/-/g, "/"))) {
                            t = arry[i];
                            arry[i] = arry[j];
                            arry[j] = t;
                        }
                    }
                }
                return arry;
            }
            /**
             *
             *   请求参数设置
             *
             **/
            (function() {
                $.ajaxSetup({
                    timeout: 30000,
                    dataType: "json",
                    cache: false
                });
            })();

            /**
             *
             *获取当前新股信息
             *
             **/
            function loginFuc() {

                var obj = {};
                obj.param = param;
                obj.pageIndex = 1;
                obj.pageSize = 1000;
                var html = '';
                $.ajax({
                    type: 'GET',
                    url: 'http://wxtest.hx168.com.cn/hxkf/api/v1.0/ns/stockquery',
                    data: obj,
                    dataType: 'json',
                    success: function(results) {
                        if (results.error == false && results.results.length != 0) {

                            setTimeout(function() {
                                loadding(false)
                            }, 1000)
                            var lists = results.results;
                            var pattern = /^300+/;
                            $('#extraInfo').text(results.extraInfo.custid);
                            khzzh = results.extraInfo.custid;
                            checkRequest(khzzh);
                            evlabc(lists);
                            $.each(lists, function(index, value) {

                                var timeStr = lists[index].issuedate.slice(5, 7) + "月" + lists[index].issuedate.slice(8, 10) + "日";
                                html += '<div class="row stock-items">\
                                        <div class="col-xs-3">\
                                            <span>' + lists[index].stkname + '</span><br>\
                                            <span>' + lists[index].stkcode + '</span>\
                                        </div>\
                                        <div class="col-xs-4 v-middle prize">\
                                            <span>' + lists[index].fixprice + '</span>\
                                        </div>\
                                        <div class="col-xs-3 v-middle">\
                                            <span>' + timeStr + '</span>\
                                        </div>\
                                        <div class="col-xs-2 v-middle" data-stkcode=' + lists[index].stkcode + '><input class="checkbox" type="checkbox" value=' + lists[index].stkcode + ' name="stock" checked="checked"/></div></div>';
                            })
                            $('#stock-list').append(html);
                        } else {
                            loadding(false);
                            $('#extraInfo').text(results.extraInfo.custid);
                            $('#stock-list').append('<p style="text-align:center;padding:.8rem 0;">' + results.message + '</p>').css({
                                'background': '#EEEEF0'
                            });

                        }
                    }
                }).fail(function(e) {
                    console.error("网络连接失败，请重试", "error");
                });
            };

            /**
             *
             *  调用登录接口请求
             *
             **/
            function submitLogin() {
                $('#yzm,#ipt').blur();
                loadding(true);
                var password = $('#ipt').val();
                var RSAEncrypt = function(str) {
                    if (typeof RSAUtil == 'undefined') return str;
                    var exponent = "10001";
                    var key = RSAUtil.getKeyPair(exponent, '', encryptKey);
                    str = RSAUtil.encryptedString(key, str);
                    return str;
                };
                password = RSAEncrypt(password);
                errCouts++;
                var loginFuc = function() {
                    var obj = {};

                    obj.param = param;
                    // obj.param='oWqSxv2QzAVD3cz8_hVT8FhqnhqE';//测试
                    obj.pw = password;
                    obj.stocks = stockArray.join(',');
                    $.ajax({
                        type: 'post',
                        url: 'http://wxtest.hx168.com.cn/hxkf/api/v1.0/ns/sub',
                        data: obj,
                        dataType: 'json',
                        success: function(results) {
                            if (results.error == false) {
                                loadding(false);
                                var li = $('ul li');
                                $('#ipt').val('');
                                for (var i = 0, numLen = li.length; i < numLen; i++) {
                                    $(li[i]).text('');
                                }
                                window.location = 'success/success.html?param=' + param + '&khzzh=' + khzzh;

                            } else if (results.error == true) {
                                loadding(false);
                                var pattern1 = /\(([1-9a-zA-Z\W]+)\)/;
                                var pattern2 = /[\u2E80-\u9FFF]+/;
                                stockArray = [];
                                if (errCouts >= 3) {
                                    state = true;
                                    getTicketImg();
                                    $('#verify').show().css({
                                        'width': '2.12rem',
                                        'margin': 'auto'
                                    });
                                }
                                if (pattern1.exec(results.message)) {
                                    $('#errMsg').text('密码不匹配' + pattern1.exec(results.message)[0]).addClass('text-danger');
                                    return;
                                } else if (pattern2.exec(results.message)) {
                                    $('#errMsg').text(pattern2.exec(results.message)[0]).addClass('text-danger');
                                    return;
                                }
                            }
                        }
                    }).fail(function(e) {
                        console.error("网络连接失败，请重试", "error");
                    });
                };
                loginFuc();
            };

            /**
             *
             * 验证码请求
             *
             **/
            function getTicketImg() {
                $.ajax({
                    type: 'get',
                    url: 'http://wxtest.hx168.com.cn/hxkf/api/v1.0/stream/randimg?randKey=19870627&width=96&height=32',
                    dataType: 'json',
                    success: function(msg) {
                        $('#tiketImg').attr("src", "data:image/png;base64," + msg.firstData.img);
                        randCode = msg.results[0].randCode;
                    }
                }).fail(function(e) {
                    console.error("网络连接失败，请重试", "error");
                })
            };
            /**
             *
             *  登录回调
             *
             **/
            function loginCallBack(results) {
                if (results.error == false && results.rscode == "0") {
                    var login_results = results.results[0];
                    var loginname = login_results.khzzh;
                    $.setSessionStorage("loginname", '');
                    $.setSessionStorage("name", login_results.name);
                    $.setSessionStorage("clientrisklevel", login_results.clientrisklevel);
                    $.setSessionStorage("clientinfo", $.jsonToStr(login_results));
                }
            }

            /**
             *
             * 检测密码输入
             *
             **/

            $("body").delegate("#ipt", "input propertychange", function() {
                var numLen = 6;
                var pw = $('#ipt').val();
                var list = $('li');
                if (pw.length == '6') {
                    submit();

                } else {
                    $('#errMsg').text('');
                }
                for (var i = 0; i < numLen; i++) {
                    if (pw[i]) {
                        $(list[i]).text('•');
                    } else {
                        $(list[i]).text('');
                    }
                }

            });

            function submit() {

                checkedValues();
                if (state == true) {
                    $("body").delegate("#yzm", "input propertychange", function() {
                        var pw = $('#yzm').val();
                        $('#errMsg').text('');
                        if (pw.length == '4' && pw == randCode) {
                            loadding(true);
                            submitLogin();

                        } else if (pw.length == '4' && pw != randCode) {
                            $('#errMsg').text('验证码错误').addClass('text-danger');
                        }
                    });

                } else {
                    submitLogin();
                }
            }

            /**
             *
             * 验证创业板权限
             *
             **/
            function checkRequest(khzzh) {
                checkedValues();
                var pattern = /^300+/;

                // loadding(true);
                var obj = {};
                obj.custid = khzzh;
                obj.khzh = khzzh;
                obj.orgid = khzzh.substr(0, 4);
                if (Permissions == false) {
                    $.ajax({
                        type: 'POST',
                        url: 'http://wxtest.hx168.com.cn/hxkf/api/v1.0/ns/gemauth',
                        data: obj,
                        dataType: 'json',
                        success: function(results) {
                            if (results.message == "您暂未开通创业板!" && results.error == false) {
                                Permissions = true;

                                $('.box-mask').fadeOut(200);
                                var li = $('ul li');
                                $('#ipt').val('');
                                for (var i = 0, numLen = li.length; i < numLen; i++) {
                                    $(li[i]).text('');
                                }
                                var stockInput = $("input[name=stock]");
                                $.each(stockInput, function(index, value) {
                                    if (pattern.test($(this).val())) {
                                        $(this).removeAttr('checked').attr('disabled', 'disabled');
                                        $(this).parent().parent().append('<p class="text-center" style="color:#C7322F;font-size:.1rem;padding-bottom:.05rem;">您未开通创业板权限,请选择其他新股。</p>');

                                    }

                                })
                                loadding(false);
                                stockArray = [];
                            } else {
                                loadding(false);
                            }
                        }
                    }).fail(function(e) {
                        console.error("网络连接失败，请重试", "error");
                    });
                } else {
                    var li = $('ul li');
                    $('#ipt').val('');
                    for (var i = 0, numLen = li.length; i < numLen; i++) {
                        $(li[i]).text('');
                    }
                    loadding(false);
                    window.location = 'success/success.html?param=' + param + '&khzzh=' + khzzh;
                }

            }
            /**
             *
             * 遮罩层
             *
             **/
            function popMask(str) {
                var html = '<div class="pop-mask">\
                    <div class="pop-up text-center" style="border-radius:1rem;height:auto;">\
                        <p class="pop-head">温馨提示</p>\
                        <p class="pop-content">' + str + '</p>\
                        <div class="understand">\
                            <button id="understand" >我知道了</button>\
                        </div>\
                    </div>\
                </div>';
                $('body').append(html);
                $('.pop-up').addClass('show');
                $('.pop-mask').show();
            }
            /**
             *
             *   loadding
             *
             **/

            function loadding(showFlag) {
                if (showFlag) {
                    var html = '<div class="loadingBox">\
                  <div class="loadContainer">\
                    <div class="sk-circle">\
                      <div class="sk-circle1 sk-child"></div>\
                      <div class="sk-circle2 sk-child"></div>\
                      <div class="sk-circle3 sk-child"></div>\
                      <div class="sk-circle4 sk-child"></div>\
                      <div class="sk-circle5 sk-child"></div>\
                      <div class="sk-circle6 sk-child"></div>\
                      <div class="sk-circle7 sk-child"></div>\
                      <div class="sk-circle8 sk-child"></div>\
                      <div class="sk-circle9 sk-child"></div>\
                      <div class="sk-circle10 sk-child"></div>\
                      <div class="sk-circle11 sk-child"></div>\
                      <div class="sk-circle12 sk-child"></div>\
                  </div>\
                </div></div>';
                    $('body').append(html);
                    window.ontouchmove = stopDefaultAction;
                } else {
                    window.ontouchmove = null;
                    $('.loadingBox').remove();
                }
            }

            //    弹出提示框
            $('#sub-btn').bind('click', function() {
                // loadding(true);
                $('#ipt').attr('autofocus', 'autofocus');
                var stockLen = $("input[name=stock]").length;
                if ($("input[name=stock]").is(':checked')) {
                    $('.box-mask').show();
                    $('.box').addClass('show');
                    var $body = $('body');
                    $body.css({
                        'height': '100%',
                        'width': '100%',
                        'overflow': 'hidden',
                        'position': 'fixed'
                    });
                    // break;
                } else {
                    popMask('请选择你需要申购的新股');
                }
            });

            $('#history-btn').bind('click', function() {
                window.location = "history/history.html?param=" + param;
            })
            $('body').delegate('#understand', 'click', function() {
                $('.pop-mask').fadeOut(100).remove();

            })

            $('.closedown').bind('click', function() {
                $('#ipt').removeAttr('autofocus');
                $('.box').removeClass('show').addClass('hide');
                stockArray = [];
                errCouts = 0;
                // state=false;
                $('.box-mask').fadeOut(200);
                var $body = $('body');
                $body.css({
                    'overflow': 'auto',
                    'position': 'static'
                });
                var li = $('ul li');
                for (var i = 0, numLen = li.length; i < numLen; i++) {
                    $(li[i]).text('');
                }
                $('#ipt').val('');
                $('#checkBtn').attr('disabled', 'disabled');
                $('#errMsg').text('');
                // 
                // location.reload();
            });

            $('.box').delegate('#yzm', 'focus', function() {
                $('#errMsg').text('');
            });

            // $('body').delegate('#checkBtn','click',function(){
            //      $('#ipt').blur();
            //         checkedValues();
            //         if(state==true){
            //                 if($('#yzm').val()==randCode){
            //                      console.log('ok');
            //                      submitLogin();
            //                 }else if($('#yzm').val()!==randCode){
            //                     $('#errMsg').text('验证码错误').addClass('text-danger'); 
            //                 }
            //         }else{
            //             submitLogin();
            //         }
            // });

            $('#retry').bind('click', function() {
                $(this).parent().parent().parent().hide();
                $('.box').show();
                $('li').html('');
                $('#ipt').val('');
            });

            $('#cancel').bind('click', function() {
                $('.pop-mask').hide();
            });

            $('body').delegate('#tiketImg', 'click', function() {
                getTicketImg();
            });

            $('#risk-info').bind('click', function() {
                $('body').append('<div class="agreement-body" id="wrapper" style="-webkit-overflow-scrolling: touch;overflow:auto;"><div class="swiper-wrapper" id="slide"><div class="swiper-slide" ></div></div></div>');
                $('.swiper-slide').load('xieyi.html');
            })
        },
        initTouch() {
            document.body.addEventListener('touchstart', function() {});
            (function(doc, win) {
                var docEl = doc.documentElement,
                    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
                    recalc = function() {
                        var clientWidth = docEl.clientWidth;
                        if (!clientWidth) return;
                        if (clientWidth >= 740) {
                            clientWidth = 740;
                            docEl.style.fontSize = (100 * (clientWidth / 320) - 10) + 'px';
                        }
                        if (clientWidth <= 320) {
                            clientWidth = 320;
                            docEl.style.fontSize = 100 * (clientWidth / 320) + 'px';
                        }

                    };
                if (!doc.addEventListener) return;
                win.addEventListener(resizeEvt, recalc, false);
                doc.addEventListener('DOMContentLoaded', recalc, false);
            })(document, window);
        }

}