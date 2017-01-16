export default {

	init() {
		var Time = {
				Year: '',
				Month: '',
				Date: '',
				Hours: '',
				Minutes: ''
			},
			param = '';


		var counter = 0;
		// 每页展示7个
		var num = 7;
		var pageStart = 0,
			pageEnd = 0;
		var nowTime = '';

		$('body').on('touchmove', function() {});

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
		$('.history-time').html(nowTime);
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

			}
		};
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
                            <button id="understand">我知道了</button>\
                        </div>\
                    </div>\
                </div>';
			$('body').append(html);
			$('#understand').on('click', function() {
				$('.pop-mask').hide();
				$('.dropload-down').hide();
			})
			$('.pop-up').addClass('show');
			$('.pop-mask').show();
		}

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

		// dropload
		$('#main').dropload({
			scrollArea: window,
			domDown: {
				domClass: 'dropload-down',
				domRefresh: '<div class="dropload-refresh">↑上拉加载更多！</div>',
				domLoad: '<div class="loading"><span></span>加载中...</div>',
				domNoData: '<div class="noData">没有更多内容了！</div>'
			},
			loadDownFn: function(me) {
				var obj = {};
				obj.param = param;
				obj.pageIndex = 1;
				obj.pageSize = 1000;
				$.ajax({
					type: 'POST',
					url: 'http://wxtest.hx168.com.cn/hxkf/api/v1.0/ns/orderhisquery',
					data: obj,
					dataType: 'json',
					success: function(data) {
						if (data.results.length > 0) {
							var result = '';
							counter++;
							pageEnd = num * counter;
							pageStart = pageEnd - num;
							for (var i = pageStart; i < pageEnd; i++) {
								var timeStr = data.results[i].subdate.slice(5, 7) + "月" + data.results[i].subdate.slice(8, 10) + "日";
								result += '<div class="row history-item-content"><div class="col-xs-4"><span>' + data.results[i].stkname + '</span><br><span>' + data.results[i].stkcode + '</span></div><div class="col-xs-4 prize v-middle">' + data.results[i].orderprice + '</div><div class="col-xs-4"><span class="date v-middle">' + timeStr + '</span><br></div></div>';
								if ((i + 1) >= data.results.length) {
									// 锁定
									me.lock();
									// 无数据
									me.noData();
									break;
								}
							}
							// 为了测试，延迟1秒加载
							setTimeout(function() {
								$('.history-item').append(result);
								// 每次数据加载完，必须重置
								me.resetload();
							}, 2000);
						} else {
							setTimeout(function() {
								popMask('没有申购内容');
							}, 2000);

						}
					},
					error: function(xhr, type) {
						me.resetload();
					}
				});
			},
			threshold: 50
		});
		$('#understand').bind('click', function() {
			$('.pop-mask').remove();
		})
	}

}