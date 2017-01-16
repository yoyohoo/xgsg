<template>
	<div id="main" class="main">
		<div class="row list">
			<div class="col-xs-3">名称/代码</div>
			<div class="col-xs-4">发行价格(元)</div>
			<div class="col-xs-3">申购日期</div>
			<div class="col-xs-2">选项</div>
		</div>
		<div id="stock-list" class="stock-list">
		</div>
		<p id="warn" style="text-align: center;color:#C7322F;margin:.1rem 0;font-size:.12rem;"></p>
		<div class="submit">
			<button id="sub-btn" class="sub-btn">确认提交申购</button>
			<router-link class="history-link" to="/history">查看申购历史</router-link>
		</div>
	</div>
</template>