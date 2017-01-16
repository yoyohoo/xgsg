export default {

	init() {
		var nowTime = '',
			param = '',
			khzzh = '';
		/**
		 *
		 * 时间对象
		 *
		 */
		var Time = {
			Year: '',
			Month: '',
			Date: '',
			Hours: '',
			Minutes: ''
		};

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

		window.onload = initPage();

		function initPage() {
			window.ontouchmove = stopDefaultAction;
			var $body = $('body')
			$body.css({
				'overflow': 'hidden'
					// 'position':'fixed'
			});
			var $Loading = $("#pageLoading");
			if ($Loading != null) {
				setTimeout(function() {
					$Loading.fadeOut('10');
					window.ontouchmove = null;
					$body.css({
						'overflow': 'auto',
						'position': 'static'
					});
				}, 1000)
				setTimeout(function() {
					$('#suceess-img').addClass('suceess-img')
				}, 1020);
			}
		};
		/**
		 *
		 * 自定义滚动条
		 *
		 **/
		$('#success-list-body').niceScroll({
			cursorcolor: "#C7322F", //#CC0071 光标颜色
			cursoropacitymax: 1, //改变不透明度非常光标处于活动状态（scrollabar“可见”状态），范围从1到0
			touchbehavior: false, //使光标拖动滚动像在台式电脑触摸设备
			cursorwidth: "3px", //像素光标的宽度
			cursorborder: "0", //     游标边框css定义
			cursorborderradius: "5px", //以像素为光标边界半径
			autohidemode: false, //是否隐藏滚动条
			scrollspeed: 60,
			mousescrollstep: 1,
			nativeparentscrolling: true
		});

		/**
		 *
		 * 截取openid
		 *
		 **/
		function getQueryStringRegExp(name, type) {
			var reg = new RegExp("(^|\\?|&)" + name + "=([^&]*)(\\s|&|$)", "i");
			if (reg.test(location.href)) {
				if (type == param) {
					param = unescape(RegExp.$2.replace(/\+/g, " "));
					return param;
				} else if (type == khzzh) {
					khzzh = unescape(RegExp.$2.replace(/\+/g, " "));
					return khzzh;
				}
			}
		};
		getQueryStringRegExp('param', param);
		getQueryStringRegExp('khzzh', khzzh);
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

		function loginFuc() {
			var obj = {};
			var html = '';
			obj.pageIndex = 1;
			obj.pageSize = 1000;
			obj.param = param;
			$.ajax({
				type: 'POST',
				url: 'http://wxtest.hx168.com.cn/hxkf/api/v1.0/ns/orderquery',
				data: obj,
				dataType: 'json',
				success: function(results) {
					var lists = results.results;
					console.log(lists.length);
					$('#khzzh').text(khzzh);
					if (results.error == false && lists.length != 0) {
						$.each(lists, function(index, value) {
							var timeStr = lists[index].subdate.slice(5, 7) + "月" + lists[index].subdate.slice(8, 10) + "日";
							html += '<div class="row success-items">\
                                        <div class="col-xs-4">\
                                            <span>' + lists[index].stkname + '</span><br><span>' + lists[index].stkcode + '</span>\
                                        </div>\
                                        <div class="col-xs-4 v-middle prize">\
                                            <span>' + lists[index].orderprice + '</span>\
                                        </div>\
                                        <div class="col-xs-4 v-middle">\
                                            <span>' + timeStr + '</span>\
                                        </div>\
                                    </div>';
						})
						$('#success-list-body').append(html);
					} else {
						$('.main').append('<p style="text-align:center;font-size:.15rem;background:#EEEEF0;">' + results.message + '</p>');
					}
				}

			}).fail(function(e) {
				console.error("网络连接失败，请重试", "error");
			});
		};
		loginFuc();
		$('#back-home').bind('click', function() {
			window.history.go(-1);
		});
	}


}