<template>
	<div>
    	<v-loading></v-loading>
		<div id="container" class="container">
			<header id="header" class="header history-head">
				<div>
					<b class="logo"></b>
					<b class="department">北京营业部</b>
				</div>
			</header>
			<div id="main" class="main history-main-content">
				<div id="history-time" class="history-content">
					<img :src="his_icon">
					<span class="history-time"></span>
				</div>
				<div class="row history-list">
					<div class="col-xs-4">
						名称/代码
					</div>
					<div class="col-xs-4">
						发行价格(元)
					</div>
					<div class="col-xs-4">
						申购日期
					</div>
				</div>
				<div id="history-item" class="history-item">
				</div>
			</div>
		</div>
	</div>
</template>
<script>
    import VLoading from '../common/Loading'
    import Mutions from '../../store/history/mutations.js'

    export default {
    	data() {
    			return {
    				his_icon: require('assets/img/icon_2')
    			}
    		},
    		components: {
    			VLoading
    		},
    		mounted() {
    			Mutions.init();
    		},
    		methods: {}
    }
</script>