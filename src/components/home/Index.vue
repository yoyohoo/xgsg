<template>
<div>
    <v-loading></v-loading>
    <div id="container" class="index container">
        <v-header></v-header>
        <v-container></v-container>
        <v-footer></v-footer>
    </div>
</div>
</template>
<script>
    import VLoading from '../common/Loading'
    import VContainer from './Container'
    import VHeader from './Header'
    import VFooter from './Footer'
    import Mutions from '../../store/home/mutations.js'

    export default {
        data() {
                return {
                    route: 'home'
                }
            },
            components: {
                VLoading,
                VContainer,
                VHeader,
                VFooter
            },
            refresh() {},
            mounted() {
                Mutions.init();
                Mutions.initTouch();
            },
            destroyed() {}
    }

</script>