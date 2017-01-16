/**
 * 服务类
 */
define("project/scripts/service/dataEnginer",function(require, exports, module) {

//数据处理
 //通用加载处理
  (function() {
    $.ajaxSetup({
      timeout: 10000,
      dataType: "json",
      cache: false
    });
  })();

	var ajaxRequest = function(url, data, type) {

		if (!url) {
			console.log("data url can not be empty!");
			return;
		}
		var deferred = $.ajax({
			type: type || 'POST',
			url: url,
			data: data
		}).fail(function(e) {
			console.error("网络连接失败，请重试", "error");
			//throw e;
		});

		return deferred;
	};

	var dataEnginer = {
		"ajaxRequest" : ajaxRequest
	};

	// 暴露对外的接口
	module.exports = dataEnginer;
});
