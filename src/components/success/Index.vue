<template>
	<div>
    	<v-loading></v-loading>
		<div id="container" class="container">
			<header id="header" class="header">
				<div>
					<b class="logo"></b>
					<b class="department">北京营业部</b>
				</div>
				<!-- time -->
				<div class="time">
				</div>
				<!-- zjzh-->
				<div class="zjzh">
					资金账号：<span id="khzzh"></span>
				</div>
			</header>
			<div class="main">
				<div class="success">
					<img id="suceess-img" :src="suc_icon">
					恭喜你，提交成功！
				</div>
				<div class="row success-list">
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
				<!-- 申购成功列表-->
				<div class="success-list-body" id="success-list-body">
					
				</div>
			</div>
        	<v-footer></v-footer>
		</div>
	</div>
</template>
<script>
    import VLoading from '../common/Loading'
    import VFooter from './Footer'
    import Mutions from '../../store/success/mutations.js'

    export default {
    	data() {
    			return {
    				suc_icon: require('assets/img/icon_2')
    			}
    		},
            components: {
                VLoading,
                VFooter
            },
    		mounted() {
    			Mutions.init();
    		},
    		methods: {}
    }
</script>