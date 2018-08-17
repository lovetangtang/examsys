<style lang="less">
    @import './own-space.less';
</style>

<template>
    <div>
        <Card>
            <p slot="title">
                <Icon type="person"></Icon>
                个人信息
            </p>
            <div>
                <Form ref="userForm" :model="userForm" :label-width="100" label-position="right">
                    <FormItem label="用户工号：">
                        <span>{{ userForm.UserID }}</span>
                    </FormItem>
                    <FormItem label="用户名称：">
                        <span>{{ userForm.UserName }}</span>
                    </FormItem>
                    <FormItem label="公司代码：">
                        <span>{{ userForm.ComID }}</span>
                    </FormItem>
                    <FormItem label="公司名称：">
                        <span>{{ userForm.ComName }}</span>
                    </FormItem>
                    <FormItem label="部门代码：">
                        <span>{{ userForm.DeptCode }}</span>
                    </FormItem>
                    <FormItem label="部门名称：">
                        <span>{{ userForm.DeptName }}</span>
                    </FormItem>

                </Form>
            </div>
        </Card>
    </div>
</template>

<script>
    import Cookies from 'js-cookie';
    export default {
        name: 'ownspace_index',
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
                let UserInfo = Cookies.get('UserInfo');
                let userjson = {};
                let arryval = UserInfo.split('&');
                for (let i = 0; i < arryval.length; i++) {
                    let arrykv = arryval[i].split('=');
                    userjson[arrykv[0]] = arrykv[1];
                }
                this.userForm = userjson;
            }
        },
        mounted () {
            this.init();
        }
    };
</script>