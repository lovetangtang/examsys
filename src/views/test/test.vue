<style lang="less">
    @import './test.less';
</style>
<template>
     <Button type="primary">测试</Button>
</template>
<script>
    export default {
        name: 'test',
        data () {
            return {
                userForm: {
                    name: '',
                    cellphone: '',
                    company: '',
                    department: ''
                }
            };
        },
        methods: {
            init () {
    
            }
        },
        mounted () {
            this.init();
        }
    };
</script>