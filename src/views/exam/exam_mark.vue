<style lang="less">
    @import '../../styles/common.less';
    @import "./exam_mark.less";
</style>
<template>
    <div>
        <Card>
            <div class="head-btn">
                <Button @click="handleExport" type="primary" icon="ios-upload-outline">导出信息</Button>
                <Button type="warning" @click="handleDelSubject" icon="android-delete" :disabled="disable">删除</Button>
            </div>
            <div class="box-head">
                <div class="head-search">
                    <Row>
                        <Col span="22">
                        <Form :model="listQuery" label-position="right">
                            <Row>
                                <Col span="5">
                                <FormItem label="用户工号" :label-width="60">
                                    <Input @on-enter="fetchData" v-model="listQuery.UserID"></Input>
                                </FormItem>
                                </Col>
                                <Col span="5">
                                <FormItem label="考试名称" :label-width="70">
                                    <Input @on-enter="fetchData" v-model="listQuery.ExamName"></Input>
                                </FormItem>
                                </Col>
                                <Col span="8">
                                <FormItem label="及格状态" :label-width="90">
                                    <RadioGroup @on-change="fetchData" v-model="listQuery.IsPass">
                                        <Radio label="-1">全部</Radio>
                                        <Radio label="true">及格</Radio>
                                        <Radio label="false">未及格</Radio>
                                    </RadioGroup>
                                </FormItem>
                                </Col>
                                <Col span="2">
                                <Button type="primary" icon="ios-search" @click="fetchData">搜索</Button>
                                </Col>
                            </Row>
                        </Form>
                        </Col>
                        <Col span="2" class="ft-cs">
                        <div>
                            <Dropdown>
                                <a href="javascript:void(0)">
                                    高级搜索
                                    <Icon type="arrow-down-b"></Icon>
                                </a>
                                <DropdownMenu style="width:640px;" slot="list">
                                    <Form style="margin:20px" :model="formItem" :label-width="100">
                                        <Button type="primary" icon="ios-search" @click="fetchData">搜索</Button>
                                    </Form>
                                </DropdownMenu>
                            </Dropdown>
                            <!-- <a href="javascript:void(0)" class="fl-r margin-right-6">
                                高级搜索
                                <Icon type="arrow-down-b"></Icon>
                            </a> -->
                        </div>
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
        </Card>
    </div>
</template>
<script>
    import {
        GetList,
        DelMarkList
    } from '@/api/exam_mark';
    import util from '@/libs/util';
    import papersubject from '../examedit/components/papersubject';
    export default {
        name: 'exam_paper',
        components: {
            papersubject
        },
        data () {
            return {
                loading: true, // 表格加载状态
                tableHeight: 450, // 表格高度
                disable: true, // 禁用删除按钮
                chekcData: [], // 表格选中项
                PaperTypeList: [], // 试卷分类集合
                total: null, // 表格数据总条数
                formItem: {}, // 表单数据源
                listQuery: { // 查询条件
                    start: 0,
                    limit: 10,
                    pageindex: 1,
                    UserID: '',
                    IsPass: -1,
                    action: 'getuserexamlist',
                    ExamName: ''
                },
                columns: [{
                    type: 'selection',
                    width: 60,
                    align: 'center'
                }, {
                    title: '考试名称',
                    width: 180,
                    key: 'ExamName'
                }, {
                    title: '工号',
                    width: 65,
                    key: 'UserID'
                }, {
                    title: '姓名',
                    key: 'UserName'
                }, {
                    title: '分数',
                    width: 85,
                    sortable: true,
                    key: 'Score'
                }, {
                    title: '及格状态',
                    width: 85,
                    key: 'IsPass',
                    render: (h, params) => {
                        let sc = params.row.IsPass;
                        let v = util.getPassName(sc);
                        return v;
                    }
                }, {
                    title: '交卷时间',
                    sortable: true,
                    key: 'SubmitTime',
                    render: (h, params) => {
                        let it = params.row.SubmitTime;
                        it = it.substring(it, it.length - 3);
                        return it;
                    }
                }, {
                    title: '答卷时间',
                    sortable: true,
                    key: 'AnswerTime',
                    render: (h, params) => {
                        let it = params.row.AnswerTime;
                        it = it.substring(it, it.length - 3);
                        return it;
                    }
                }, {
                    title: '人工判分',
                    key: 'IsJudgment',
                    render: (h, params) => {
                        let sc = params.row.IsJudgment;
                        let v = util.getIsJudgmentName(sc);
                        return v;
                    }
                }, {
                    title: '系统判分',
                    key: 'JudgmentStatus',
                    render: (h, params) => {
                        let sc = params.row.JudgmentStatus;
                        let v = util.getJudgmentStatusName(sc);
                        return v;
                    }
                },
                {
                    title: '操作',
                    key: 'action',
                    width: 135,
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
                            }, '判分'),
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
                // 下拉数据源赋值
                util.GetItemList('100001', '', true).then(dt => {
                    this.PaperTypeList = dt;
                });
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
                this.$router.push({
                    name: 'mypaper',
                    query: {
                        ExamID: params.row.ExamID,
                        UserID: params.row.UserID,
                        UserName: params.row.UserName,
                        IsPass: params.row.IsPass,
                        Score: params.row.Score
                    }
                });
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
                DelMarkList(keyids).then(response => {
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
            // 创建考试
            handleCreatExam () {

            },
            // 导出信息
            handleExport () {
                this.$refs.table.exportCsv({
                    filename: '考生成绩',
                    original: false
                });
            },
            // 取消
            handlecancel () {},
            // 修改保存试卷
            handleSavePaper () {
                this.$refs.papersubject.setPaperSubject();
            }
        }
    };
</script>