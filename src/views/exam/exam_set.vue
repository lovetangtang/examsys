<style lang="less">
    @import '../../styles/common.less';
    @import "./subject.less";
    @import "../examedit/examcreat.less";
</style>
<template>
    <div>
        <Card>
            <div class="head-btn">
                <Button @click="handleCreatExam" type="primary" icon="android-add">创建考试</Button>
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
                                <FormItem label="考试名称" :label-width="60">
                                    <Input @on-enter="fetchData" v-model="listQuery.ExamName"></Input>
                                </FormItem>
                                </Col>
                                <Col span="8">
                                <FormItem label="试题分类" :label-width="90">
                                    <RadioGroup @on-change="fetchData" v-model="listQuery.ExamMode">
                                        <Radio label="-1">全部</Radio>
                                        <Radio label="0">模拟考试</Radio>
                                        <Radio label="1">正式考试</Radio>
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
                                        <FormItem label="启用状态">
                                            <RadioGroup @on-change="fetchData" v-model="listQuery.Status">
                                                <Radio label="-1">全部</Radio>
                                                <Radio label="0">启用</Radio>
                                                <Radio label="1">禁用</Radio>
                                            </RadioGroup>
                                        </FormItem>
                                        <FormItem label="考试分类">
                                            <Select @on-change="fetchData" v-model="listQuery.ExamType" style="width:260px">
                                                <Option v-for="item in ExamTypeList" :value="item.ItemNo" :key="item.ItemNo">{{ item.ItemName }}</Option>
                                            </Select>
                                        </FormItem>
                                        <FormItem label="考试开始时间">
                                            <DatePicker v-model="ExamBeginTime" type="daterange" placement="bottom-end" placeholder="Select date" style="width: 260px"></DatePicker>
                                        </FormItem>
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
        <Modal :loading="EditModeloading" @on-cancel="handlecancel" ok-text="保存" v-model="examMode" :styles="{top: '20px'}" width="1200"
            @on-ok="handleSaveExam">
            <examcmpts ref="examcmpts"></examcmpts>
        </Modal>
    </div>
</template>
<script>
    import {
        GetList,
        DelExamList
    } from '@/api/exam';
    import util from '@/libs/util';
    import examcmpts from '../examedit/components/examcmpts';
    export default {
        name: 'exam_set',
        components: {
            examcmpts
        },
        data () {
            return {
                loading: true, // 表格加载状态
                tableHeight: 450, // 表格高度
                examMode: false,
                disable: true, // 禁用删除按钮
                EditModeloading: true, // 编辑窗口确定按钮加载状态
                chekcData: [], // 表格选中项
                total: null, // 表格数据总条数
                formItem: {}, // 表单数据源
                ExamBeginTime: '',
                listQuery: { // 查询条件
                    start: 0,
                    limit: 10,
                    pageindex: 1,
                    ExamType: -1,
                    Status: -1,
                    ExamMode: -1,
                    action: 'getexamlist',
                    ExamBeginTime: '',
                    ExamName: ''
                },
                ExamTypeList: [],
                formSearch: {
                    input1: '',
                    input2: '',
                    input3: ''
                },
                columns: [{
                    type: 'selection',
                    width: 60,
                    align: 'center'
                }, {
                    title: '考试名称',
                    width: 105,
                    key: 'ExamName'
                },
                {
                    title: '考试分类',
                    width: 95,
                    key: 'ExamType',
                    render: (h, params) => {
                        let sc = params.row.ExamType;
                        return util.GetItemValue(this, '100004', sc); ;
                    }
                }, {
                    title: '考试模式',
                    sortable: true,
                    width: 110,
                    key: 'ExamMode',
                    render: (h, params) => {
                        let sc = params.row.ExamMode;
                        let v = util.getExamModeName(sc);
                        return v;
                    }
                }, {
                    title: '总分',
                    key: 'TotalScore'
                }, {
                    title: '考试开始时间',
                    sortable: true,
                    width: 135,
                    key: 'ExamBeginTime',
                    render: (h, params) => {
                        let it = params.row.ExamBeginTime;
                        it = it.substring(it, it.length - 3);
                        return it;
                    }
                }, {
                    title: '考试结束时间',
                    sortable: true,
                    width: 135,
                    key: 'ExamEndTime',
                    render: (h, params) => {
                        let it = params.row.ExamEndTime;
                        it = it.substring(it, it.length - 3);
                        return it;
                    }
                }, {
                    title: '创建人',
                    sortable: true,
                    key: 'InsertID'
                }, {
                    title: '创建时间',
                    sortable: true,
                    width: 135,
                    key: 'ExmInsertTime',
                    render: (h, params) => {
                        let it = params.row.InsertTime;
                        it = it.substring(it, it.length - 3);
                        return it;
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
                            }, '编辑'),
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
                util.GetItemList('100004', '', true).then(dt => {
                    this.ExamTypeList = dt;
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
                    this.listQuery.ExamBeginTime = JSON.stringify(this.ExamBeginTime);
                    if (this.ExamBeginTime.length === 0 ||
                        this.ExamBeginTime[0] === null ||
                        this.ExamBeginTime[1] === null ||
                        this.ExamBeginTime[0] === '' ||
                        this.ExamBeginTime[1] === '') {
                        this.listQuery.ExamBeginTime = '';
                    };
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
                this.examMode = true;
                let dt = {};
                dt = JSON.parse(JSON.stringify(params.row));
                this.$refs.examcmpts.setExaminfo(dt);
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
                DelExamList(keyids).then(response => {
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
                let argu = {};
                this.$router.push({
                    name: 'examcreat',
                    params: argu
                });
            },
            // 导出信息
            handleExport () {
                this.$Modal.info({
                    content: '正在开发...'
                });
            },
            // 取消
            handlecancel () {

            },
            // 保存考试信息
            handleSaveExam () {
                this.EditModeloading = true;
                this.$refs.examcmpts.handleSaveExam().then(status => {
                    if (!status) {
                        setTimeout(() => {
                            this.EditModeloading = false;
                            this.$nextTick(() => {
                                this.EditModeloading = true;
                            });
                        }, 1000);
                    } else {
                        this.EditModeloading = false;
                        this.$nextTick(() => {
                            this.EditModeloading = true;
                        });
                        this.examMode = false;
                        this.fetchData();
                    }
                });
            }
        }
    };
</script>