<style lang="less">
    @import '../../styles/common.less';
    @import "./iteminfo.less";
</style>
<style lang="less" scoped>
    .split-pane-con {
        width: 100%;
        height: 89vh;
    }

    .custom-trigger {
        position: absolute;
        width: 40px;
        height: 40px;
        box-sizing: border-box;
        top: 50%;
        transform: translate(-50%, -50%);
        background: white;
        border-radius: 50%;
        box-shadow: 2px 2px 5px 2px rgba(0, 0, 0, .1), 2px 2px 10px 2px rgba(0, 0, 0, .2) inset;
        border: 1px solid #c3c3c3;
        cursor: pointer;
    }

    .introduce-left-con h4 {
        margin-bottom: 20px;
    }

    .introduce-left-con h5 {
        margin-bottom: 10px;
        margin-left: 20px;
    }

    .split-pane-right-con {
        padding: 30px;
    }

    .split-pane-right-con p {
        font-size: 26px;
        font-weight: 700;
        color: white;
    }
</style>
<template>
    <div>
        <Card :padding="0">
            <div class="head-btn" style="margin-top:20px;margin-left:20px;margin-bottom:10px">
                <Button @click="handleAddUser" type="primary" icon="android-add">新增</Button>
                <Button type="warning" @click="handleDelSubject" icon="android-delete" :disabled="disable">删除</Button>
            </div>
            <div class="split-pane-con border-topline">
                <split-pane :style="{height: '100%'}" left :min="20" max="100px" direction="horizontal" v-model="triggerOffset">
                    <div slot="left" style=" height: 100%;">
                        <div class="box-content" style="margin:10px">
                            <div class="tab-content">
                                <Table ref="tabletype" @on-current-change="handeclickrow" size="small" :loading="loadtypeing" highlight-row border :columns="columnstype"
                                    :data="datatype" :height="tableHeight"></Table>
                            </div>
                        </div>
                    </div>
                    <div class="split-pane-right-con" slot="right" style="height: 100%;">
                        <div class="box-head">
                            <div class="head-search">
                                <Row>
                                    <Col span="22">
                                    <Form :model="listQuery" label-position="right">
                                        <Row :gutter="10">
                                            <Col span="8">
                                            <FormItem label="字典编号" :label-width="60">
                                                <Input @on-enter="fetchData" v-model="listQuery.ItemNo"></Input>
                                            </FormItem>
                                            </Col>
                                            <Col span="8">
                                            <FormItem label="字典名称" :label-width="60">
                                                <Input @on-enter="fetchData" v-model="listQuery.ItemName"></Input>
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
                            <Form :model="saveData" :label-width="80">
                                <FormItem label="用户工号：">
                                    <Input v-model="saveData.UserID" placeholder=""></Input>
                                </FormItem>
                                <FormItem label="备注：">
                                    <Input v-model="saveData.Remark" placeholder=""></Input>
                                </FormItem>
                            </Form>
                        </Modal>
                    </div>
                </split-pane>
            </div>
        </Card>

    </div>
</template>
<script>
    import {
        GetList,
        Dellist,
        GetItemType,
        SaveItemList
    } from '@/api/iteminfo';
    import splitPane from '../my-components/split-pane/split-pane/split-pane';
    import papersubject from '../examedit/components/papersubject';
    export default {
        name: 'exam_paper',
        components: {
            papersubject,
            splitPane
        },
        data () {
            return {
                EditModeloading: true,
                autMode: false,
                triggerOffset: 30,
                loading: true, // 表格加载状态
                loadtypeing: true,
                tableHeight: 450, // 表格高度
                disable: true, // 禁用删除按钮
                chekcData: [], // 表格选中项
                total: null, // 表格数据总条数
                formItem: {}, // 表单数据源
                listQuery: { // 查询条件
                    start: 0,
                    limit: 10,
                    pageindex: 1,
                    ItemType: '',
                    ItemName: '',
                    ItemNo: '',
                    action: 'getiteminfolist'
                },
                listtypeQuery: {
                    action: 'getitemtype'
                },
                saveData: {
                    action: 'save',
                    UserID: '',
                    KeyID: 0,
                    Remark: ''
                },
                columnstype: [{
                    title: '分类编号',
                    key: 'ItemTypeNo'
                }, {
                    title: '名称',
                    key: 'ItemTypeName'
                }],
                columns: [{
                    type: 'selection',
                    width: 60,
                    align: 'center'
                }, {
                    title: '字典名称',
                    key: 'ItemName'
                }, {
                    title: '字典编号',
                    key: 'ItemNo'
                }, {
                    title: '完整名称',
                    key: 'AllName'
                }, {
                    title: '备注',
                    key: 'Remark'
                }, {
                    title: '状态',
                    key: 'Status',
                    width: 65,
                    render: (h, params) => {
                        let it = params.row.Status;
                        let val = it === 0 ? '启用' : '禁用';
                        return val;
                    }
                }, {
                    title: '显示顺序',
                    key: 'Index'
                },
                {
                    title: '操作',
                    key: 'action',
                    width: 85,
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.showEdit(params);
                                    }
                                }
                            }, '编辑')
                        ]);
                    }
                }
                ],
                data: [],
                datatype: []
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
                this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 145;
                this.$nextTick(() => {});
            },
            handeclickrow (now, old) {
                console.log(now);
                this.listQuery.ItemType = now.ItemTypeNo;
                this.fetchitemData();
            },
            // 刷新数据
            fetchData () {
                try {
                    this.listQuery = this.$options.data().listQuery;
                    this.disable = true;
                    this.loading = true;
                    this.loadtypeing = true;
                    GetList(this.listQuery).then(response => {
                        this.data = response.data;
                        this.loading = false;
                        this.loadtypeing = false;
                        this.total = response.count;
                        return GetItemType(this.listtypeQuery);
                    }).then(response => {
                        this.datatype = response.data;
                    });
                    this.$refs.tabletype.clearCurrentRow();
                } catch (error) {
                    console.log(error);
                }
            },
            fetchitemData () {
                this.disable = true;
                this.loading = true;
                GetList(this.listQuery).then(response => {
                    this.data = response.data;
                    this.loading = false;
                    this.total = response.count;
                });
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
                Dellist(keyids).then(response => {
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
            // 监听选中项
            handleRowChange (option) {
                this.chekcData = option;
                if (option.length > 0) {
                    this.disable = false;
                } else {
                    this.disable = true;
                }
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
            // 修改保存试卷
            handleSave () {
                this.$Modal.confirm({
                    title: '提示',
                    content: '确定要保存吗？',
                    okText: '确定',
                    loading: true,
                    cancelText: '取消',
                    onOk: () => {
                        SaveItemList(this.saveData).then(response => {
                            this.$Modal.remove();
                            this.autMode = false;
                            this.fetchData();
                            this.handlecancel();
                            this.$Notice.success({
                                title: response.msg,
                                desc: '',
                                duration: 2
                            });
                        });
                    },
                    onCancel: () => {
                        this.EditModeloading = false;
                        this.saveData = this.$options.data().saveData;
                    }
                });
            }
        }
    };
</script>