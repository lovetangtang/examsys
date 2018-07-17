<style lang="less">
    @import '../../styles/common.less';
    @import "./test.less";
</style>
<template>
    <div>
    </div>
</template>
<script>
    import countdown from './countdown.vue';
    export default {
        name: 'exam',
        components: {
            countdown
        },
        data () {
            return {
                a: 0
            };
        },
        mounted () {
            this.init();
            this.$nextTick(() => {

            });
        },
        destroyed () {
        },
        computed: {
            avatorPath () {
    
            }
        },
        methods: {
            init () {
                this.$nextTick(() => {
    
                });
            }
        }
    };
</script>