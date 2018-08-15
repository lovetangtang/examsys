<style lang="less">
    @import '../../styles/common.less';
    @import "./loginauthority.less";
</style>
<template>
    <div>
        <Card>
            <div class="head-btn">
                <Button @click="handleAddUser" type="primary" icon="android-add">新增</Button>
                <Button @click="handleExport" type="primary" icon="ios-upload-outline">导出信息</Button>
                <Button type="warning" @click="handleDelSubject" icon="android-delete" :disabled="disable">删除</Button>
            </div>
            <div class="box-head">
                <div class="head-search">
                    <Row>
                        <Col span="22">
                        <Form :model="listQuery" label-position="right">
                            <Row :gutter="10">
                                <Col span="5">
                                <FormItem label="用户工号" :label-width="60">
                                    <Input @on-enter="fetchData" v-model="listQuery.UserID"></Input>
                                </FormItem>
                                </Col>

                                <Col span="2">
                                <Button type="primary" icon="ios-search" @click="fetchData">搜索</Button>
                                </Col>
                            </Row>
                        </Form>
                        </Col>
                        <Col span="2" class="ft-cs">
                        </Col>
                    </Row>
                </div>
            </div>
            <div class="box-content">
                <div class="tab-content">
                    <Table @on-selection-change="handleRowChange" size="small" :loading="loading" highlight-row border :columns="columns" :data="data"
                        ref="table" :height="tableHeight"></Table>
                </div>
            </div>
            <div ref="bmpage" class="box-bottom">
                <div class="page">
                    <Page :total="total" placement="top" @on-change="changePage" @on-page-size-change="onpagesizechange" size="small" show-total
                        show-elevator show-sizer></Page>
                </div>
            </div>
            <Modal title="编辑" :loading="EditModeloading" @on-cancel="handlecancel" ok-text="保存" v-model="autMode" width="400" @on-ok="handleSave">
                <Form :model="saveData" :rules="rules" ref="ruleform" :label-width="100">
                    <FormItem label="用户工号：" prop="UserID">
                        <Input v-model="saveData.UserID" placeholder=""></Input>
                    </FormItem>
                    <FormItem label="备注：">
                        <Input v-model="saveData.Remark" placeholder=""></Input>
                    </FormItem>
                </Form>
            </Modal>
        </Card>
    </div>
</template>
<script>
    import {
        GetList,
        DelLoginAuthority,
        SaveLoginAuthority
    } from '@/api/loginauthority';
    import papersubject from '../examedit/components/papersubject';
    export default {
        name: 'exam_paper',
        components: {
            papersubject
        },
        data () {
            return {
                EditModeloading: true,
                autMode: false,
                loading: true, // 表格加载状态
                tableHeight: 450, // 表格高度
                disable: true, // 禁用删除按钮
                chekcData: [], // 表格选中项
                total: null, // 表格数据总条数
                formItem: {}, // 表单数据源
                listQuery: { // 查询条件
                    start: 0,
                    limit: 10,
                    pageindex: 1,
                    UserID: '',
                    action: 'getloginauthority'
                },
                rules: {
                    UserID: [{
                        required: true,
                        message: '用户工号不能为空',
                        trigger: 'blur'
                    }]
                },
                saveData: {
                    action: 'SaveLoginAuthority',
                    UserID: '',
                    KeyID: 0,
                    Remark: ''
                },
                columns: [{
                    type: 'selection',
                    width: 60,
                    align: 'center'
                }, {
                    title: '允许登录的用户工号',
                    key: 'UserID'
                }, {
                    title: '备注',
                    sortable: true,
                    key: 'Remark'
                }, {
                    title: '创建人',
                    sortable: true,
                    key: 'InsertID'
                }, {
                    title: '创建时间',
                    sortable: true,
                    width: 135,
                    key: 'InsertTime',
                    render: (h, params) => {
                        let it = params.row.InsertTime;
                        it = it.substring(it, it.length - 3);
                        return it;
                    }
                },
                {
                    title: '操作',
                    key: 'action',
                    width: 95,
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'error',
                                    size: 'small'
                                },
                                on: {
                                    click: () => {
                                        this.remove(params);
                                    }
                                }
                            }, '删除')
                        ]);
                    }
                }
                ],
                data: []
            };
        },
        // 在模板渲染成html后调用,对html操作
        mounted () {
            this.init();
            window.addEventListener('resize', this.scrollHeightResize);
            this.$nextTick(() => {

            });
        },
        // 组件销毁后调用
        destroyed () {},
        // 实时监听属性值变化，并对其进行操作
        computed: {
            avatorPath () {

            }
        },
        // 模板渲染成html前调用，初始化属性
        created () {
            this.fetchData();
        },
        // 自定义方法
        methods: {
            // 初始化内容
            init () {
                // 设置表格高度
                this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 185;
                this.$nextTick(() => {});
            },
            // 刷新数据
            fetchData () {
                try {
                    this.disable = true;
                    this.loading = true;
                    GetList(this.listQuery).then(response => {
                        this.data = response.data;
                        this.loading = false;
                        this.total = response.count;
                    });
                } catch (error) {
                    console.log(error);
                }
            },
            scrollHeightResize () {
                if (this.$refs.table && this.$refs.table.$el) {
                    this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 145;
                }
            },
            // 展开编辑窗体
            showEdit (params) {
                // var rq = {
                //     action: 'getpapersubject',
                //     KeyID: params.row.KeyID
                // };
                // GetPaperSubject(rq).then(response => {
                //     this.$router.push({
                //         name: 'paperedit',
                //         query: {
                //             type: params.row.AssemblyType,
                //             pdata: response.data,
                //             row: params.row
                //         }
                //     });
                //     // this.$refs.papersubject.setPaperSubject(params.row.AssemblyType, response.data);
                // });
            },
            // 移除数据
            remove (params) {
                this.$Modal.confirm({
                    title: '提示',
                    content: '确定要删除吗？',
                    loading: true,
                    onOk: () => {
                        this.data.splice(params.index, 1);
                        this.delSubject(params.row.KeyID);
                        this.$Modal.remove();
                    },
                    onCancel: () => {}
                });
            },
            // 删除题库的公共方法
            delSubject (keyids) {
                DelLoginAuthority(keyids).then(response => {
                    this.fetchData();
                    this.$Notice.success({
                        title: response.msg,
                        desc: '',
                        duration: 2
                    });
                });
            },
            // 页面跳转
            changePage (val) {
                this.listQuery.start = this.listQuery.limit * (val - 1);
                this.fetchData();
            },
            // 分页数量
            onpagesizechange (val) {
                if (this.listQuery.limit === val) {
                    return;
                }
                this.listQuery.limit = val;
                this.fetchData();
            },
            // 删除考试信息
            handleDelSubject () {
                this.$Modal.confirm({
                    title: '提示',
                    content: '确定要删除吗？',
                    loading: true,
                    onOk: () => {
                        let keyids = '';
                        for (let i = 0; i < this.chekcData.length; i++) {
                            keyids += this.chekcData[i].KeyID + ',';
                        }
                        keyids = keyids.substring(0, keyids.length - 1);
                        this.delSubject(keyids);
                        this.$Modal.remove();
                    }
                });
            },
            // 导出信息
            handleExport () {
                this.$Modal.info({
                    content: '正在开发...'
                });
            },
            // 新增
            handleAddUser () {
                this.autMode = true;
            },
            // 取消
            handlecancel () {
                this.saveData = this.$options.data().saveData;
            },
            // 监听选中项
            handleRowChange (option) {
                this.chekcData = option;
                if (option.length > 0) {
                    this.disable = false;
                } else {
                    this.disable = true;
                }
            },
            // 保存登录员工权限
            handleSave () {
                let _self = this;
                this.$refs.ruleform.validate((valid) => {
                    if (valid) {
                        _self.$Modal.confirm({
                            title: '提示',
                            content: '确定要保存吗？',
                            okText: '确定',
                            loading: true,
                            cancelText: '取消',
                            onOk: () => {
                                SaveLoginAuthority(_self.saveData).then(response => {
                                    _self.$Modal.remove();
                                    _self.autMode = false;
                                    _self.handlecancel();
                                    _self.$Notice.success({
                                        title: response.msg,
                                        desc: '',
                                        duration: 2
                                    });
                                    _self.fetchData();
                                });
                            },
                            onCancel: () => {
                                _self.EditModeloading = false;
                                _self.saveData = _self.$options.data().saveData;
                                _self.fetchData();
                            }
                        });
                    } else {
                        setTimeout(() => {
                            _self.EditModeloading = false;
                            _self.$nextTick(() => {
                                _self.EditModeloading = false;
                            });
                        }, 1000);
                        return false;
                    }
                });
            }
        }
    };
</script>